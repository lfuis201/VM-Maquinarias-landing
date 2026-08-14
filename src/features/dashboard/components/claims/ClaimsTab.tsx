import React, { useState } from 'react';
import { ClaimDetailModal, type Claim } from './ClaimDetailModal';

interface ClaimsTabProps {
  claims: Claim[];
  isLoading: boolean;
}

export const ClaimsTab: React.FC<ClaimsTabProps> = ({ claims, isLoading }) => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-slate-900 border-t-transparent animate-spin"></div>
        <span className="text-xs text-slate-500 font-bold tracking-widest">Cargando reclamaciones...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {claims.map((claim) => {
        const isClaim = claim.type.toUpperCase() === 'CLAIM' || claim.type.toUpperCase() === 'RECLAMO';
        
        return (
          <div key={claim.id} className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900">{claim.claimNumber}</span>
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
                <p className="text-xs text-slate-500 mt-1">Registrado el {new Date(claim.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800">{claim.fullName}</p>
                <p className="text-[10px] text-slate-500">{claim.documentType}: {claim.documentNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Detalle del bien contratado</h4>
                <p className="text-slate-600"><span className="font-semibold text-slate-800">Tipo:</span> {claim.contractedType || claim.goodType}</p>
                <p className="text-slate-600"><span className="font-semibold text-slate-800">Descripción:</span> {claim.contractedDescription || claim.description}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Detalle del reclamo / queja</h4>
                <p className="text-slate-600 text-ellipsis overflow-hidden line-clamp-2"><span className="font-semibold text-slate-800">Descripción:</span> {claim.details}</p>
                <p className="text-slate-600"><span className="font-semibold text-slate-800">Pedido:</span> {claim.requestDetails || claim.request}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3 flex-wrap gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Contacto: {claim.phone || 'No registrado'} | {claim.email || 'No registrado'}
              </span>
              <button
                onClick={() => setSelectedClaim(claim)}
                className="px-3.5 py-1.5 text-xs font-bold text-indigo-650 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                Ver Detalle Completo
              </button>
            </div>
          </div>
        );
      })}

      {claims.length === 0 && (
        <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl text-center text-slate-500 font-semibold">
          No hay reclamos o quejas registradas en el libro de reclamaciones.
        </div>
      )}

      {/* Claim Detail Modal */}
      <ClaimDetailModal
        claim={selectedClaim}
        onClose={() => setSelectedClaim(null)}
      />
    </div>
  );
};
