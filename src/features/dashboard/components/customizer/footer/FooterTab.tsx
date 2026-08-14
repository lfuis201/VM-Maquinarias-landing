import React, { useState } from 'react';
import { FooterVisualEditor } from './FooterVisualEditor';
import { FooterFormEditor } from './FooterFormEditor';

interface FooterTabProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FooterTab: React.FC<FooterTabProps> = ({ config, onChange, onSubmit, isLoading }) => {
  const [editMode, setEditMode] = useState<'visual' | 'form'>('visual');

  if (!config) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#10094d]/10 blur-xl rounded-full"></div>
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-[#10094d] animate-spin relative z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-[#10094d] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Cargando Configuraciones</h3>
          <p className="text-xs text-slate-500 font-medium">Preparando el entorno de personalización del pie de página...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visual Editor vs Form Toggle Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="text-left">
          <h4 className="text-sm font-bold text-slate-900">Método de Edición del Footer</h4>
          <p className="text-xs text-slate-500">Edita directamente sobre el diseño en vivo o a través del formulario tradicional.</p>
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
        <FooterVisualEditor
          config={config}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      ) : (
        <FooterFormEditor
          config={config}
          onChange={onChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
