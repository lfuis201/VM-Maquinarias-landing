import React, { useState } from 'react';
import { toast } from '@heroui/react';
import { useLeadsQuery, useUpdateLeadStatusMutation } from '../../../landing/hooks/useLeads';
import { WhatsAppModal } from './WhatsAppModal';
import { EmailModal } from './EmailModal';

interface Lead {
  id: string;
  fullName: string;
  companyName?: string;
  ruc?: string;
  phoneNumber?: string;
  phone?: string;
  email: string;
  message?: string;
  status: string;
}

export const LeadsTab: React.FC = () => {
  const { data: leadsData, isLoading, error } = useLeadsQuery();
  const updateLeadStatusMutation = useUpdateLeadStatusMutation();

  const leads = leadsData || [];

  // Modals visibility states
  const [selectedLeadForWa, setSelectedLeadForWa] = useState<Lead | null>(null);
  const [selectedLeadForEmail, setSelectedLeadForEmail] = useState<Lead | null>(null);

  const handleUpdateStatus = (leadId: string, newStatus: 'PENDING' | 'CONTACTED' | 'DISMISSED') => {
    updateLeadStatusMutation.mutate(
      { id: leadId, status: newStatus },
      {
        onSuccess: () => {
          toast.success('Estado del lead actualizado correctamente.');
        },
        onError: (err: any) => {
          console.error('Error updating lead status:', err);
          const errMsg = err?.response?.data?.message || err?.message || 'Error de red al actualizar el estado.';
          const formattedMsg = Array.isArray(errMsg) ? errMsg.join(', ') : errMsg;
          toast.danger(`Error: ${formattedMsg}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-slate-900 border-t-transparent animate-spin"></div>
        <span className="text-xs text-slate-500 font-bold tracking-widest">Cargando leads...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3 text-red-500">
        <span className="font-bold">Error al cargar leads:</span>
        <span className="text-xs">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="p-4 text-slate-600 font-bold">Cliente</th>
              <th className="p-4 text-slate-600 font-bold">Empresa / RUC</th>
              <th className="p-4 text-slate-600 font-bold">Teléfono / Email</th>
              <th className="p-4 text-slate-600 font-bold">Estado</th>
              <th className="p-4 text-slate-600 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{lead.fullName}</span>
                    {lead.message && (
                      <span className="text-[11px] text-slate-500 mt-1 italic max-w-xs block overflow-hidden text-ellipsis whitespace-nowrap" title={lead.message}>
                        "{lead.message}"
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-slate-800">{lead.companyName || 'No especificado'}</span>
                    {lead.ruc && (
                      <span className="text-[10px] text-slate-500 mt-0.5">RUC: {lead.ruc}</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col text-xs text-slate-600 space-y-1">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {lead.phoneNumber || lead.phone || 'No registrado'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {lead.email}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase border ${
                      lead.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : lead.status === 'CONTACTED'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {lead.status === 'PENDING' ? 'Pendiente' : lead.status === 'CONTACTED' ? 'Contactado' : 'Descartado'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      className="font-bold text-xs cursor-pointer py-1.5 px-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg h-8 transition-colors flex items-center justify-center border border-emerald-200 shadow-sm gap-1"
                      onClick={() => setSelectedLeadForWa(lead)}
                    >
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.824-3.514c1.657.983 3.27 1.497 4.905 1.498 5.482 0 9.943-4.463 9.947-9.95.002-2.657-1.03-5.155-2.905-7.033A9.877 9.877 0 0 0 12.008 2.07c-5.467 0-9.927 4.462-9.931 9.949-.001 1.765.474 3.488 1.376 5.019L2.52 21.43l4.361-1.144zM16.985 14c-.267-.134-1.585-.783-1.83-.873-.245-.089-.422-.134-.6.134-.178.267-.689.873-.845 1.049-.155.178-.312.201-.58.067-.267-.134-1.129-.416-2.15-1.328-.795-.71-1.332-1.587-1.488-1.854-.156-.267-.016-.411.118-.544.121-.119.267-.312.4-.467.134-.156.178-.267.267-.445.089-.178.045-.334-.022-.467-.067-.133-.6-1.445-.823-1.98-.217-.52-.455-.45-.6-.458l-.512-.008c-.178 0-.467.067-.712.334-.244.267-.933.912-.933 2.224s.956 2.58 1.089 2.758c.133.178 1.881 2.872 4.557 4.025.637.275 1.134.438 1.52.56.64.204 1.222.175 1.682.107.513-.076 1.585-.648 1.808-1.272.222-.624.222-1.157.155-1.272-.067-.119-.245-.201-.512-.334z"/>
                      </svg>
                      WhatsApp
                    </button>

                    <button
                      className="font-bold text-xs cursor-pointer py-1.5 px-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg h-8 transition-colors flex items-center justify-center border border-indigo-200 shadow-sm gap-1"
                      onClick={() => setSelectedLeadForEmail(lead)}
                    >
                      <svg className="w-3.5 h-3.5 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Correo
                    </button>

                    {lead.status === 'PENDING' && (
                      <button
                        className="font-bold text-xs cursor-pointer py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-8 transition-colors flex items-center justify-center border-none shadow-sm"
                        onClick={() => handleUpdateStatus(lead.id, 'CONTACTED')}
                      >
                        Contactado
                      </button>
                    )}
                    {lead.status !== 'DISMISSED' && (
                      <button
                        className="font-bold text-xs cursor-pointer py-1.5 px-3 bg-white border border-slate-200 text-red-650 hover:bg-red-50 rounded-lg h-8 transition-all flex items-center justify-center shadow-sm"
                        onClick={() => handleUpdateStatus(lead.id, 'DISMISSED')}
                      >
                        Descartar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                  No hay leads registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* WhatsApp Sender Modal */}
      <WhatsAppModal
        isOpen={!!selectedLeadForWa}
        lead={selectedLeadForWa}
        onClose={() => setSelectedLeadForWa(null)}
      />

      {/* Email Sender Modal */}
      <EmailModal
        isOpen={!!selectedLeadForEmail}
        lead={selectedLeadForEmail}
        onClose={() => setSelectedLeadForEmail(null)}
      />
    </div>
  );
};
