import React from 'react';
import { Button } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';

interface NosotrosVisualEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const NosotrosVisualEditor: React.FC<NosotrosVisualEditorProps> = ({
  config,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20 relative">
      {/* Editor Header Instruction Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-bold text-indigo-900">Editor Visual — Página Nosotros</h4>
          <p className="text-xs text-indigo-600/80 mt-0.5">Haz clic en cualquier texto para editarlo directamente. Los bordes punteados indican campos editables.</p>
        </div>
      </div>

      {/* 1. INTRO / HERO SECTION */}
      <div className="relative border border-slate-200 rounded-3xl bg-white overflow-hidden shadow-xl">
        <div className="absolute top-3 left-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN PRESENTACIÓN (Diseño Real)
        </div>

        <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto space-y-6 text-left">
          {/* Badge */}
          <div className="relative group border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl p-2 bg-white/40 transition-all max-w-xs">
            <input
              type="text"
              value={config.introBadge || ''}
              onChange={(e) => onChange('introBadge', e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs font-bold uppercase tracking-widest text-emerald-700"
              placeholder="¿Quiénes Somos?"
            />
            <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Badge
            </div>
          </div>

          {/* Title */}
          <div className="relative group border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl p-3 bg-white/40 transition-all max-w-3xl">
            <textarea
              value={config.introTitle || ''}
              onChange={(e) => onChange('introTitle', e.target.value)}
              rows={2}
              className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-3xl sm:text-4xl font-black text-slate-900 leading-tight resize-none"
              placeholder="Título principal"
            />
            <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Título Principal
            </div>
          </div>

          {/* Description */}
          <div className="relative group border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl p-3 bg-white/40 transition-all max-w-3xl">
            <textarea
              value={config.introDescription || ''}
              onChange={(e) => onChange('introDescription', e.target.value)}
              rows={4}
              className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-base text-slate-500 leading-relaxed resize-none"
              placeholder="Descripción de la empresa"
            />
            <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Descripción
            </div>
          </div>
        </section>
      </div>

      {/* 2. MISIÓN / VISIÓN / VALORES GRID */}
      <div className="relative border border-slate-200 rounded-3xl bg-white overflow-hidden shadow-xl">
        <div className="absolute top-3 left-4 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          MISIÓN, VISIÓN Y VALORES (Diseño Real)
        </div>

        <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">

            {/* Misión */}
            <div className="space-y-3">
              <div className="relative group border border-dashed border-slate-200 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-100 rounded-xl p-2 bg-white/40 transition-all">
                <input
                  type="text"
                  value={config.misionTitle || ''}
                  onChange={(e) => onChange('misionTitle', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-2xl font-black text-slate-900"
                  placeholder="Nuestra Misión"
                />
                <div className="absolute -top-2.5 right-3 bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título Misión
                </div>
              </div>
              <div className="relative group border border-dashed border-slate-200 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-100 rounded-xl p-2 bg-white/40 transition-all">
                <textarea
                  value={config.misionDesc || ''}
                  onChange={(e) => onChange('misionDesc', e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm text-slate-500 leading-relaxed resize-none"
                  placeholder="Descripción de la misión"
                />
                <div className="absolute -top-2.5 right-3 bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Desc. Misión
                </div>
              </div>
            </div>

            {/* Visión */}
            <div className="space-y-3">
              <div className="relative group border border-dashed border-slate-200 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-100 rounded-xl p-2 bg-white/40 transition-all">
                <input
                  type="text"
                  value={config.visionTitle || ''}
                  onChange={(e) => onChange('visionTitle', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-2xl font-black text-slate-900"
                  placeholder="Nuestra Visión"
                />
                <div className="absolute -top-2.5 right-3 bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título Visión
                </div>
              </div>
              <div className="relative group border border-dashed border-slate-200 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-100 rounded-xl p-2 bg-white/40 transition-all">
                <textarea
                  value={config.visionDesc || ''}
                  onChange={(e) => onChange('visionDesc', e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm text-slate-500 leading-relaxed resize-none"
                  placeholder="Descripción de la visión"
                />
                <div className="absolute -top-2.5 right-3 bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Desc. Visión
                </div>
              </div>
            </div>

            {/* Valores */}
            <div className="space-y-3">
              <div className="relative group border border-dashed border-slate-200 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-100 rounded-xl p-2 bg-white/40 transition-all">
                <input
                  type="text"
                  value={config.valoresTitle || ''}
                  onChange={(e) => onChange('valoresTitle', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-2xl font-black text-slate-900"
                  placeholder="Nuestros Valores"
                />
                <div className="absolute -top-2.5 right-3 bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título Valores
                </div>
              </div>
              <div className="relative group border border-dashed border-slate-200 hover:border-violet-500 focus-within:border-violet-600 focus-within:ring-2 focus-within:ring-violet-100 rounded-xl p-2 bg-white/40 transition-all">
                <textarea
                  value={config.valoresDesc || ''}
                  onChange={(e) => onChange('valoresDesc', e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm text-slate-500 leading-relaxed resize-none"
                  placeholder="Descripción de los valores"
                />
                <div className="absolute -top-2.5 right-3 bg-violet-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Desc. Valores
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* 3. SUNAT / SEGURIDAD SECTION (Preview only — not editable) */}
      <div className="relative border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute top-3 left-4 bg-slate-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN SUNAT (Solo vista previa)
        </div>

        <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Seguridad y Cumplimiento</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Facturación electrónica 100% oficial
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Trabajamos con los estándares de encriptación más altos del sector. Cada comprobante emitido a través de nuestra plataforma cuenta con firma digital y validación oficial e inmediata por parte de la SUNAT.
            </p>
            <div className="flex gap-4">
              <span className="bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl">
                Ver Planes y Precios
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-56 h-56 rounded-2xl bg-gradient-to-tr from-emerald-500 to-slate-800 p-8 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <div className="text-center text-white space-y-2">
                <span className="text-5xl font-black">100%</span>
                <p className="text-xs font-bold uppercase tracking-widest text-white/90">Seguridad y Validez</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="sticky bottom-4 z-30 flex justify-end">
        <Button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 h-12 rounded-xl shadow-2xl shadow-slate-900/30 cursor-pointer hover:scale-[1.02] transition-all flex items-center gap-2.5 border border-slate-700"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <FloppyDisk className="w-5 h-5" />
              <span>Guardar Cambios Nosotros</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
