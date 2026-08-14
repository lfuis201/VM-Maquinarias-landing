import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react';

interface Client {
  name: string;
  email: string;
  phone: string;
  document: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

interface ClientFormModalProps {
  client?: Client | null; // If null/undefined, it means we are in "Create Client" mode
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: {
    originalEmail?: string; // used for identifying which client to update
    name: string;
    email: string;
    phone: string;
    document: string;
  }) => void;
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({
  client,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [document, setDocument] = useState('');

  // Sync state with selected client if editing
  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone);
      setDocument(client.document);
    } else {
      // Clear fields for creation mode
      setName('');
      setEmail('');
      setPhone('');
      setDocument('');
    }
  }, [client, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      originalEmail: client?.email,
      name,
      email,
      phone,
      document,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-scale-up text-left">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-900">
            {client ? 'Editar Datos del Cliente' : 'Registrar Nuevo Cliente'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Name */}
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                Nombre Completo / Razón Social
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Juan Pérez o Distribuidora Andina S.A.C."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-xs outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Document */}
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                Documento de Identidad (RUC o DNI)
              </label>
              <input
                type="text"
                required
                maxLength={11}
                placeholder="Ej. 20556214789 o 47589632"
                value={document}
                onChange={(e) => setDocument(e.target.value.replace(/\D/g, ''))} // only digits
                className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-xs outline-none transition-all placeholder:text-slate-400 font-mono"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                Número de Celular
              </label>
              <input
                type="text"
                required
                maxLength={9}
                placeholder="Ej. 987654321"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-xs outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                Correo Electrónico
              </label>
              {client ? (
                // Read-only when editing
                <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl flex flex-col">
                  <span className="text-xs font-semibold text-slate-600 font-mono">{email}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Identificador de cuenta único</span>
                </div>
              ) : (
                // Editable when creating
                <input
                  type="email"
                  required
                  placeholder="Ej. cliente@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-xs outline-none transition-all placeholder:text-slate-400"
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
            <Button
              type="button"
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer text-xs"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl h-10 cursor-pointer text-xs"
            >
              {client ? 'Guardar Cambios' : 'Registrar Cliente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
