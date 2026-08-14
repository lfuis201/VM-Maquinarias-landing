import React, { useState } from 'react';
import { NosotrosVisualEditor } from './NosotrosVisualEditor';
import { NosotrosFormEditor } from './NosotrosFormEditor';

interface NosotrosTabProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const NosotrosTab: React.FC<NosotrosTabProps> = ({ config, onChange, onSubmit, isLoading }) => {
  const [editMode, setEditMode] = useState<'visual' | 'form'>('visual');

  if (!config) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full"></div>
          <div className="w-16 h-16 rounded-full border-4 border-violet-100 border-t-violet-600 animate-spin relative z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-violet-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Cargando Configuraciones</h3>
          <p className="text-xs text-slate-500 font-medium">Preparando el entorno de personalización...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visual Editor vs Form Toggle Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="text-left">
          <h4 className="text-sm font-bold text-slate-900">Método de Edición de Nosotros</h4>
          <p className="text-xs text-slate-500">Elige editar directamente en el diseño real o mediante campos de formulario clásicos.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setEditMode('visual')}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
              editMode === 'visual'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Editor de Diseño
          </button>
          <button
            type="button"
            onClick={() => setEditMode('form')}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
              editMode === 'form'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-650 hover:bg-slate-200/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Formulario Clásico
          </button>
        </div>
      </div>

      {editMode === 'visual' ? (
        <NosotrosVisualEditor
          config={config}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      ) : (
        <NosotrosFormEditor
          config={config}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
