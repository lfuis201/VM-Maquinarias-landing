import React from 'react';

interface OverviewTabProps {
  user: any;
  stats: {
    totalLeads: number;
    totalClaims: number;
    activeLeads: number;
    activeClaims: number;
  };
  isLoading: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ user, stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-slate-900 border-t-transparent animate-spin"></div>
        <span className="text-xs text-slate-500 font-bold tracking-widest">Cargando resumen...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Total leads</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900">{stats.totalLeads}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Leads pendientes</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900">{stats.activeLeads}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Total reclamos</p>
            <h3 className="text-3xl font-black mt-2 text-slate-900">{stats.totalClaims}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Límite de API (rate limit)</p>
            <h3 className="text-lg font-black mt-3 text-emerald-600">60 req/min</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Status / Welcome */}
      <div className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 border border-slate-200 p-8 rounded-3xl text-left">
        <h3 className="text-2xl font-black mb-2 text-slate-900">¡Bienvenido de vuelta, {user?.firstName}!</h3>
        <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
          Desde este panel administrativo puedes actualizar el contenido de la landing page (títulos, estadísticas, CTAs) y responder a los leads/reclamaciones de forma centralizada y segura.
        </p>
      </div>
    </div>
  );
};
