import React from 'react';
import { Button } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';
import restaurantImg from '../../../../assets/restaurant/restaruant.png';

interface RestaurantVisualEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const RestaurantVisualEditor: React.FC<RestaurantVisualEditorProps> = ({
  config,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20 relative">
      {/* Editor Header Instruction Banner */}
      <div className="bg-indigo-50/70 border border-indigo-150 rounded-2xl p-4 text-left flex items-start gap-3">
        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <div>
          <h5 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">Modo Constructor en Vivo (Restaurante)</h5>
          <p className="text-xs text-indigo-750 mt-0.5 leading-relaxed">
            ¡Los elementos con borde punteado son editables! Haz clic y escribe directamente en el texto del diseño.
            Los cambios se guardarán y se verán inmediatamente en la sección de Restaurante.
          </p>
        </div>
      </div>

      {/* 1. MOCK HERO SECTION */}
      <div className="relative border border-slate-200 rounded-3xl bg-slate-50 shadow-inner overflow-hidden">
        <div className="absolute top-3 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN HERO (Diseño Real)
        </div>

        <section className="relative bg-gradient-to-b from-[#10094d] to-[#0a0f24] text-white py-16 px-6 md:px-10 lg:px-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Badge Pill Mock */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide select-none">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Sistematízate Gastronomía
                </div>
              </div>

              {/* Title Heading Editable */}
              <div className="relative group border border-dashed border-slate-650 hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-xl p-2 bg-white/5 transition-all">
                <textarea
                  value={config.heroTitle || ''}
                  onChange={(e) => onChange('heroTitle', e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] resize-none"
                  placeholder="El software que acelera tu Restaurante"
                />
                <div className="absolute -top-2.5 right-3 bg-primary text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título Hero
                </div>
              </div>

              {/* Description Paragraph Editable */}
              <div className="relative group border border-dashed border-slate-650 hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-xl p-2 bg-white/5 transition-all">
                <textarea
                  value={config.heroDescription || ''}
                  onChange={(e) => onChange('heroDescription', e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-slate-300 text-sm md:text-base leading-relaxed resize-y"
                  placeholder="Descripción del servicio para restaurantes"
                />
                <div className="absolute -top-2.5 right-3 bg-primary text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Descripción Hero
                </div>
              </div>

              {/* Action Buttons Mockup */}
              <div className="flex flex-wrap items-center gap-4 pt-2 opacity-60 pointer-events-none select-none">
                <div className="px-6 py-2.5 rounded-xl bg-primary text-slate-950 text-xs font-bold shadow-sm">Solicitar Demostración Gratis (Botón)</div>
              </div>

            </div>

            {/* Hero Right Visuals Mock */}
            <div className="lg:col-span-5 flex justify-center opacity-85 select-none pointer-events-none">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24] p-1">
                <img
                  src={restaurantImg}
                  alt="Sistematízate Gastronomía Mock"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. MOCK FAQ SECTION */}
      <div className="relative border border-slate-200 rounded-3xl bg-slate-50 shadow-inner overflow-hidden p-6 md:p-8">
        <div className="absolute top-3 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN PREGUNTAS FRECUENTES (Diseño Real)
        </div>

        <section className="pt-10 pb-6 max-w-4xl mx-auto space-y-8 text-left">
          <h2 className="text-2xl font-black text-slate-800 text-center">
            Preguntas Frecuentes sobre el Sistema
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all bg-slate-50/50">
                <input
                  type="text"
                  value={config.faq1Q || ''}
                  onChange={(e) => onChange('faq1Q', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm font-bold text-slate-900"
                  placeholder="Pregunta Frecuente 1"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Pregunta 1
                </div>
              </div>
              <div className="relative group border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all">
                <textarea
                  value={config.faq1A || ''}
                  onChange={(e) => onChange('faq1A', e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 leading-relaxed resize-y"
                  placeholder="Respuesta 1"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Respuesta 1
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all bg-slate-50/50">
                <input
                  type="text"
                  value={config.faq2Q || ''}
                  onChange={(e) => onChange('faq2Q', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm font-bold text-slate-900"
                  placeholder="Pregunta Frecuente 2"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Pregunta 2
                </div>
              </div>
              <div className="relative group border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all">
                <textarea
                  value={config.faq2A || ''}
                  onChange={(e) => onChange('faq2A', e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 leading-relaxed resize-y"
                  placeholder="Respuesta 2"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Respuesta 2
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all bg-slate-50/50">
                <input
                  type="text"
                  value={config.faq3Q || ''}
                  onChange={(e) => onChange('faq3Q', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm font-bold text-slate-900"
                  placeholder="Pregunta Frecuente 3"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Pregunta 3
                </div>
              </div>
              <div className="relative group border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all">
                <textarea
                  value={config.faq3A || ''}
                  onChange={(e) => onChange('faq3A', e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 leading-relaxed resize-y"
                  placeholder="Respuesta 3"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Respuesta 3
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all bg-slate-50/50">
                <input
                  type="text"
                  value={config.faq4Q || ''}
                  onChange={(e) => onChange('faq4Q', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm font-bold text-slate-900"
                  placeholder="Pregunta Frecuente 4"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Pregunta 4
                </div>
              </div>
              <div className="relative group border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 transition-all">
                <textarea
                  value={config.faq4A || ''}
                  onChange={(e) => onChange('faq4A', e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 leading-relaxed resize-y"
                  placeholder="Respuesta 4"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Respuesta 4
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FLOATING ACTION SAVE BAR FOR VISUAL MODE */}
      <div className="fixed bottom-6 right-8 z-30 bg-white border border-slate-200/90 shadow-xl py-3.5 px-6 rounded-2xl flex items-center gap-4 animate-bounce-short">
        <span className="text-xs font-black text-slate-700">Edición Activa en Diseño</span>
        <Button
          type="submit"
          className="bg-indigo-650 hover:bg-indigo-750 text-white font-bold px-5 h-10 rounded-xl cursor-pointer hover:scale-[1.02] transition-all text-xs flex items-center gap-1.5"
          disabled={isLoading}
        >
          {isLoading ? (
            'Guardando...'
          ) : (
            <>
              <FloppyDisk className="w-4 h-4" />
              <span>Guardar Todo</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
