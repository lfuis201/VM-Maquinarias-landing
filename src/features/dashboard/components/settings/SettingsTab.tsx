import React, { useState } from 'react';
import { Button, toast } from '@heroui/react';

interface SettingsTabProps {
  user: any;
  isLoading: boolean;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ user, isLoading }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gekawa_whatsapp_apikey') || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('gekawa_whatsapp_apikey', apiKey);
      toast.success('¡API Key de WhatsApp Gekawa guardada exitosamente!');
      setIsSaving(false);
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-slate-900 border-t-transparent animate-spin"></div>
        <span className="text-xs text-slate-500 font-bold tracking-widest">Cargando perfil...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-start max-w-4xl">
      {/* User Info Card */}
      <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl space-y-6">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
          Mi Perfil de Administrador
        </h3>
        <div className="flex flex-col items-center text-center space-y-3 pb-4 border-b border-slate-100">
          <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center font-black text-white text-2xl shadow-sm select-none">
            {user?.firstName ? user.firstName[0] : 'A'}
            {user?.lastName ? user.lastName[0] : 'S'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{user?.firstName} {user?.lastName}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">{user?.role}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-slate-600"><span className="font-bold text-slate-900">Email:</span> {user?.email}</p>
          <p className="text-slate-600"><span className="font-bold text-slate-900">Estado:</span> {user?.isActive ? 'Activo' : 'Inactivo'}</p>
          <p className="text-slate-600"><span className="font-bold text-slate-900">Cuenta creada:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Integration Card (WhatsApp Gekawa) */}
      <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl space-y-6">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          Integración de WhatsApp (Gekawa)
        </h3>
        
        <p className="text-xs text-slate-500 leading-relaxed">
          Configura tu API Key del servicio de Gekawa para automatizar el envío de mensajes a tus clientes y prospectos desde el panel de control.
        </p>

        <form onSubmit={handleSaveApiKey} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Gekawa API Key</label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl pl-4 pr-10 py-3 text-sm outline-none transition-all"
                placeholder="Introducir tu API Key de Gekawa..."
              />
              <span className="absolute right-3.5 top-3.5 text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m-3 4H3m2-4h6m2-3H3m2-4h6" />
                </svg>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block leading-tight">
              Puedes obtener este token de acceso desde tu panel de usuario de Gekawa.
            </span>
          </div>

          <Button
            type="submit"
            disabled={isSaving}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl transition-all shadow-md shadow-emerald-600/10 cursor-pointer flex items-center justify-center border-none"
          >
            {isSaving ? 'Guardando...' : 'Guardar API Key'}
          </Button>
        </form>
      </div>
    </div>
  );
};
