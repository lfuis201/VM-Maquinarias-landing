import React from 'react';
import {
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@heroui/react';

export interface Claim {
  id: string;
  claimNumber: string;
  type: string; // 'CLAIM' | 'COMPLAINT' | 'RECLAMO' | 'QUEJA'
  createdAt: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  email?: string;
  phone?: string;
  address?: string;
  isMinor?: boolean;
  guardianName?: string;
  guardianDocType?: string;
  guardianDocNumber?: string;
  goodType?: string; // 'PRODUCT' | 'SERVICE' | 'Producto' | 'Servicio'
  claimedAmount?: string | number;
  description?: string; // short contracted description
  details: string; // detailed issue description
  request: string; // proposed solution
  contractedType?: string;
  contractedDescription?: string;
  requestDetails?: string;
}

interface ClaimDetailModalProps {
  claim: Claim | null;
  onClose: () => void;
}

export const ClaimDetailModal: React.FC<ClaimDetailModalProps> = ({ claim, onClose }) => {
  const isClaim = claim?.type.toUpperCase() === 'CLAIM' || claim?.type.toUpperCase() === 'RECLAMO';
  
  const getGoodTypeLabel = (goodType?: string) => {
    if (!goodType) return 'No especificado';
    const normalized = goodType.toUpperCase();
    if (normalized === 'PRODUCT' || normalized === 'PRODUCTO') return 'Producto';
    if (normalized === 'SERVICE' || normalized === 'SERVICIO') return 'Servicio';
    return goodType;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ModalBackdrop
      isOpen={!!claim}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="bg-slate-900/60 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <ModalContainer>
        <ModalDialog className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] text-left animate-scale-up">
          {claim && (
            <>
              <ModalHeader className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-1 relative">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-slate-900">Hoja de Reclamación</span>
                  <span className="font-mono text-xs text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                    {claim.claimNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase border ${
                      isClaim
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {isClaim ? 'Reclamo' : 'Queja'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal mt-1">
                  Registrado el {new Date(claim.createdAt).toLocaleString('es-PE')}
                </p>
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors border-none outline-none"
                  type="button"
                >
                  ✕
                </button>
              </ModalHeader>
              
              <ModalBody className="p-6 space-y-6 text-slate-800 overflow-y-auto flex-1">
                {/* Section 1: Customer details */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-550 uppercase tracking-wider pb-1.5 border-b border-slate-200/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    1. Identificación del Consumidor Reclamante
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Nombre Completo</span>
                      <span className="font-semibold text-slate-900">{claim.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Documento de Identidad</span>
                      <span className="font-semibold text-slate-800">
                        {claim.documentType} - {claim.documentNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Teléfono</span>
                      <span className="font-semibold text-slate-800">{claim.phone || 'No registrado'}</span>
                    </div>
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Email</span>
                      <span className="font-semibold text-slate-800">{claim.email || 'No registrado'}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Dirección de Domicilio</span>
                      <span className="font-semibold text-slate-800">{claim.address || 'No registrada'}</span>
                    </div>
                  </div>

                  {/* Guardian section if minor */}
                  {claim.isMinor && (
                    <div className="pt-2 mt-2 border-t border-slate-250/65 space-y-2">
                      <span className="text-[10px] font-bold text-red-750 bg-red-50 border border-red-150 px-2 py-0.5 rounded-md inline-block">
                        Menor de Edad
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pl-1">
                        <div>
                          <span className="text-slate-450 block text-[9px] font-bold uppercase">Representante / Apoderado</span>
                          <span className="font-semibold text-slate-900">{claim.guardianName || 'No registrado'}</span>
                        </div>
                        <div>
                          <span className="text-slate-450 block text-[9px] font-bold uppercase">Doc. Apoderado</span>
                          <span className="font-semibold text-slate-800">
                            {claim.guardianDocType || 'DNI'} - {claim.guardianDocNumber || 'No registrado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: Contracted Goods & Services */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-550 uppercase tracking-wider pb-1.5 border-b border-slate-200/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    2. Identificación del Bien o Servicio Contratado
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Tipo de Bien</span>
                      <span className="font-semibold text-slate-900">
                        {getGoodTypeLabel(claim.contractedType || claim.goodType)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Monto Reclamado</span>
                      <span className="font-semibold text-emerald-700">
                        {claim.claimedAmount ? `S/. ${Number(claim.claimedAmount).toFixed(2)}` : 'No especificado'}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-450 block text-[9px] font-bold uppercase">Descripción del Bien</span>
                      <span className="font-semibold text-slate-800">
                        {claim.contractedDescription || claim.description || 'No especificada'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Claim details */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-4">
                  <h4 className="text-xs font-extrabold text-slate-550 uppercase tracking-wider pb-1.5 border-b border-slate-200/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    3. Detalle de la Reclamación y Pedido del Consumidor
                  </h4>
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase mb-1">Detalle de la Queja / Reclamo</span>
                      <div className="bg-white border border-slate-150 p-3 rounded-xl italic text-slate-700 whitespace-pre-line leading-relaxed">
                        {claim.details}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-450 block text-[9px] font-bold uppercase mb-1">Pedido o Solicitud del Consumidor</span>
                      <div className="bg-white border border-slate-150 p-3 rounded-xl font-medium text-slate-900 whitespace-pre-line leading-relaxed">
                        {claim.requestDetails || claim.request}
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              
              <ModalFooter className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
                <Button
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-850 text-white font-bold px-4 py-2 rounded-xl h-10 cursor-pointer flex items-center gap-1.5 border-none"
                  onClick={handlePrint}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Imprimir Hoja
                </Button>
                <Button
                  size="sm"
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer border-none"
                  onClick={onClose}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalDialog>
      </ModalContainer>
    </ModalBackdrop>
  );
};
