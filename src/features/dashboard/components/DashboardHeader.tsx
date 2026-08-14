import React from 'react';
import type { DashboardSection } from './Sidebar';

interface DashboardHeaderProps {
  activeSection: DashboardSection;
  user: any;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeSection, user }) => {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'overview':
        return 'Resumen Ejecutivo';
      case 'home-customizer':
        return 'Personalizar Páginas';
      case 'leads':
        return 'Gestión de Leads & Contactos';
      case 'claims':
        return 'Libro de Reclamaciones';
      case 'catalog':
        return 'Catálogo de Equipos';
      case 'settings':
        return 'Mi Cuenta';
      default:
        return 'Consola';
    }
  };

  return (
    <header className="py-6 px-10 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20 shadow-xs">
      <div className="flex flex-col text-left space-y-1.5">
        <span className="text-[10px] font-black text-indigo-650 uppercase tracking-widest leading-none">
          Consola de Administración
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
          {getSectionTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>En línea</span>
        </div>

        {/* Quick divider */}
        <div className="hidden sm:block h-8 w-px bg-slate-200" />

        {/* User Profile Card */}
        {user && (
          <div className="flex items-center gap-3.5">
            <div className="text-right hidden md:block space-y-0.5">
              <p className="text-xs font-black text-slate-900 leading-tight">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-slate-450 font-bold tracking-wider leading-none">
                {user.role}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white text-sm shadow-sm select-none border border-slate-800 hover:scale-105 transition-transform duration-200">
              {user.firstName ? user.firstName[0] : 'A'}
              {user.lastName ? user.lastName[0] : 'S'}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
