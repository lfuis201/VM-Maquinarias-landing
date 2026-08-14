import React from 'react';
import { Button } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';
import { HeroVisuals } from '../../../landing/components/HeroVisuals';

interface HomeVisualEditorProps {
  config: any;
  bullets: string[];
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  handleBulletChange: (idx: number, value: string) => void;
  handleAddBullet: () => void;
  handleRemoveBullet: (idx: number) => void;
}

export const HomeVisualEditor: React.FC<HomeVisualEditorProps> = ({
  config,
  bullets,
  onChange,
  onSubmit,
  isLoading,
  handleBulletChange,
  handleAddBullet,
  handleRemoveBullet,
}) => {
  const defaultFeatures = [
    { title: 'Controla tu flujo de caja', description: 'Registra ventas y gastos fácilmente y mantén tus finanzas claras todos los días', view: 'caja' },
    { title: 'Gestiona tu inventario', description: 'Conoce qué productos rotan más, evita pérdidas y pide a tiempo lo necesario', view: 'inventario' },
    { title: 'Accede desde cualquier dispositivo', description: 'Administra tu negocio desde el celular o computador, estés donde estés, sin complicaciones', view: 'dispositivos' },
    { title: 'Toma decisiones con datos reales', description: 'Revisa estadísticas claras y reportes automáticos que muestran cómo hacer crecer tu negocio', view: 'decisiones' },
    { title: 'Maneja tus clientes, proveedores y empleados', description: 'Organiza contactos, controla pagos pendientes y fortalece relaciones clave en un solo lugar', view: 'contactos' },
    { title: 'Formaliza tu negocio', description: 'Genera comprobantes fácilmente y cumple con requisitos legales para crecer con confianza y respaldo', view: 'formaliza' }
  ];

  const handleFeatureChange = (idx: number, field: 'title' | 'description', val: string) => {
    const currentFeatures = Array.isArray(config.features) ? [...config.features] : [...defaultFeatures];
    if (!currentFeatures[idx]) {
      currentFeatures[idx] = { title: '', description: '', view: '' };
    }
    currentFeatures[idx] = {
      ...currentFeatures[idx],
      [field]: val
    };
    onChange('features', currentFeatures);
  };

  const currentFeatures = Array.isArray(config.features) ? config.features : defaultFeatures;

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20 relative">
      {/* Editor Header Instruction Banner */}
      <div className="bg-indigo-50/70 border border-indigo-150 rounded-2xl p-4 text-left flex items-start gap-3">
        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <div>
          <h5 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">Modo Constructor en Vivo</h5>
          <p className="text-xs text-indigo-750 mt-0.5 leading-relaxed">
            ¡Los elementos con borde punteado son editables! Haz clic y escribe directamente en el texto del diseño.
            Los cambios se reflejarán tal cual se verán en la landing page.
          </p>
        </div>
      </div>

      {/* 1. MOCK HERO SECTION */}
      <div className="relative border border-slate-200 rounded-3xl bg-slate-50 shadow-inner overflow-hidden">
        <div className="absolute top-3 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN HERO (Diseño Real)
        </div>

        <section className="relative pt-12 pb-16 px-6 md:px-10 lg:px-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 text-left space-y-6">
              
              {/* Badge pill */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07fd02] text-[#0a0f24] text-xs font-bold tracking-wide shadow-xs border border-dashed border-[#0a0f24]/30 hover:border-[#0a0f24] focus-within:border-[#0a0f24] focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <span className="w-2 h-2 rounded-full bg-[#0a0f24] animate-pulse" />
                  <input
                    type="text"
                    value={config.heroBadge || ''}
                    onChange={(e) => onChange('heroBadge', e.target.value)}
                    className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[#0a0f24] text-xs font-black w-64 placeholder-[#0a0f24]/50"
                    placeholder="Texto de la etiqueta superior"
                  />
                </div>
              </div>

              {/* Title heading */}
              <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl p-2 bg-white/40 transition-all">
                <textarea
                  value={config.heroTitle || ''}
                  onChange={(e) => onChange('heroTitle', e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-3xl sm:text-4xl md:text-5xl font-black text-[#10094d] tracking-tight leading-[1.1] resize-none"
                  placeholder="Sistema de Gestión\npara tu negocio"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título Hero
                </div>
              </div>

              {/* Subtitle heading */}
              <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl p-2 bg-white/40 transition-all">
                <input
                  type="text"
                  value={config.heroSubtitle || ''}
                  onChange={(e) => onChange('heroSubtitle', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-lg md:text-xl font-bold text-[#10094d]"
                  placeholder="Digitaliza y factura con Sistematízate"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Subtítulo Hero
                </div>
              </div>

              {/* Description Paragraph */}
              <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl p-2 bg-white/40 transition-all">
                <textarea
                  value={config.heroDescription || ''}
                  onChange={(e) => onChange('heroDescription', e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-slate-600 text-sm md:text-base leading-relaxed resize-y"
                  placeholder="Descripción del Hero"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Descripción Hero
                </div>
              </div>

              {/* Bullets List */}
              <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-white/60">
                <h5 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">Beneficios del Producto</h5>
                <ul className="space-y-3.5">
                  {bullets.map((text: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 group/bullet">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#07fd02] flex items-center justify-center text-slate-950">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div className="flex-1 flex items-center gap-2 border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-600 rounded-lg px-2 py-1 transition-all bg-white">
                        <input
                          type="text"
                          value={text}
                          onChange={(e) => handleBulletChange(idx, e.target.value)}
                          className="flex-1 bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-slate-700 font-medium text-xs md:text-sm"
                          placeholder="Escribe un beneficio o punto clave..."
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBullet(idx)}
                          className="opacity-0 group-hover/bullet:opacity-100 text-red-500 hover:text-red-750 transition-opacity p-1 cursor-pointer rounded hover:bg-red-50"
                          title="Eliminar beneficio"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 0v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-850 transition-colors mt-3 cursor-pointer bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-150 px-3.5 py-2 rounded-xl"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Añadir Beneficio
                </button>
              </div>

              {/* Buttons Mockup */}
              <div className="flex flex-wrap items-center gap-4 pt-2 opacity-60 pointer-events-none select-none">
                <div className="px-6 py-2.5 rounded-xl bg-[#07fd02] text-[#0a0f24] text-xs font-bold shadow-sm">Prueba ahora (Botón)</div>
                <div className="px-6 py-2.5 rounded-xl border border-slate-350 text-slate-700 text-xs font-bold">Contáctanos (Botón)</div>
              </div>

              {/* Rating widget */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 rounded-xl p-2 bg-white/70 shadow-xs transition-all">
                  <svg className="w-5 h-5 text-slate-500 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m3.637 3.434l8.74 8.571l-8.675 8.65a2.1 2.1 0 0 1-.326-.613a2.5 2.5 0 0 1 0-.755V4.567c-.026-.395.065-.79.26-1.133m12.506 4.833l-2.853 2.826L4.653 2.6c.28-.097.58-.124.873-.078c.46.126.899.32 1.302.573l7.816 4.325c.508.273 1.003.56 1.498.847M13.29 12.93l2.839 2.788l-2.058 1.146l-6.279 3.49c-.52.287-1.042.561-1.55.874a1.8 1.8 0 0 1-1.472.195zm7.36-.925a1.92 1.92 0 0 1-.99 1.72l-2.346 1.302l-3.087-3.022l3.1-3.074c.795.443 1.577.886 2.358 1.303a1.89 1.89 0 0 1 .964 1.771" />
                  </svg>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 rounded px-1.5 border border-slate-200">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={config.heroPlayRatingScore || ''}
                      onChange={(e) => onChange('heroPlayRatingScore', parseFloat(e.target.value) || 0)}
                      className="w-10 bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs font-black text-center text-slate-800"
                    />
                    <span className="text-[10px] text-slate-400 font-bold">/ 5</span>
                  </div>
                  <input
                    type="text"
                    value={config.heroPlayRatingText || 'en Google Play y App Store'}
                    onChange={(e) => onChange('heroPlayRatingText', e.target.value)}
                    className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 font-semibold w-40"
                    placeholder="en Google Play y App Store"
                  />
                </div>
              </div>

            </div>

            {/* Hero Right Visuals - Showcase Mockup (Scaled down for customizer) */}
            <div className="lg:col-span-6 flex justify-center scale-90 lg:scale-[0.85] origin-center opacity-90 select-none">
              <HeroVisuals />
            </div>
          </div>
        </section>
      </div>

      {/* 2. MOCK STATISTICS SECTION */}
      <div className="relative border border-slate-800 rounded-3xl bg-[#0a0f24] text-white overflow-hidden shadow-xl">
        <div className="absolute top-3 left-4 bg-[#07fd02] text-[#0a0f24] text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN ESTADÍSTICAS (Diseño Real)
        </div>

        <section className="pt-14 pb-12 px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-7xl mx-auto">
            
            {/* Stat 1 */}
            <div className="space-y-3 border-slate-800 md:border-r last:border-0 pr-0 md:pr-6">
              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all">
                <input
                  type="text"
                  value={config.stat1Value || ''}
                  onChange={(e) => onChange('stat1Value', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-3xl font-black text-[#07fd02]"
                  placeholder="+7.000.000"
                />
                <div className="absolute -top-2.5 right-3 bg-[#07fd02] text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Valor 1
                </div>
              </div>
              
              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all">
                <input
                  type="text"
                  value={config.stat1Title || ''}
                  onChange={(e) => onChange('stat1Title', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs font-bold text-slate-400 uppercase tracking-wider"
                  placeholder="comprobantes procesados"
                />
                <div className="absolute -top-2.5 right-3 bg-[#07fd02] text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título 1
                </div>
              </div>

              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all">
                <textarea
                  value={config.stat1Desc || ''}
                  onChange={(e) => onChange('stat1Desc', e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[11px] text-slate-500 leading-relaxed resize-none"
                  placeholder="Descripción de la estadística"
                />
                <div className="absolute -top-2.5 right-3 bg-[#07fd02] text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Descripción 1
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-3 border-slate-800 md:border-r last:border-0 px-0 md:px-6">
              <div className="relative group border border-dashed border-slate-700 hover:border-white focus-within:border-white rounded-xl p-2 transition-all">
                <input
                  type="text"
                  value={config.stat2Value || ''}
                  onChange={(e) => onChange('stat2Value', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-3xl font-black text-white"
                  placeholder="+24"
                />
                <div className="absolute -top-2.5 right-3 bg-white text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Valor 2
                </div>
              </div>
              
              <div className="relative group border border-dashed border-slate-700 hover:border-white focus-within:border-white rounded-xl p-2 transition-all">
                <input
                  type="text"
                  value={config.stat2Title || ''}
                  onChange={(e) => onChange('stat2Title', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs font-bold text-slate-400 uppercase tracking-wider"
                  placeholder="departamentos con presencia"
                />
                <div className="absolute -top-2.5 right-3 bg-white text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título 2
                </div>
              </div>

              <div className="relative group border border-dashed border-slate-700 hover:border-white focus-within:border-white rounded-xl p-2 transition-all">
                <textarea
                  value={config.stat2Desc || ''}
                  onChange={(e) => onChange('stat2Desc', e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[11px] text-slate-500 leading-relaxed resize-none"
                  placeholder="Descripción de la estadística"
                />
                <div className="absolute -top-2.5 right-3 bg-white text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Descripción 2
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-3 pl-0 md:pl-6">
              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all">
                <input
                  type="text"
                  value={config.stat3Value || ''}
                  onChange={(e) => onChange('stat3Value', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-3xl font-black text-[#07fd02]"
                  placeholder="4.8 ★"
                />
                <div className="absolute -top-2.5 right-3 bg-[#07fd02] text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Valor 3
                </div>
              </div>
              
              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all">
                <input
                  type="text"
                  value={config.stat3Title || ''}
                  onChange={(e) => onChange('stat3Title', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs font-bold text-slate-400 uppercase tracking-wider"
                  placeholder="calificación de clientes"
                />
                <div className="absolute -top-2.5 right-3 bg-[#07fd02] text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título 3
                </div>
              </div>

              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all">
                <textarea
                  value={config.stat3Desc || ''}
                  onChange={(e) => onChange('stat3Desc', e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[11px] text-slate-500 leading-relaxed resize-none"
                  placeholder="Descripción de la estadística"
                />
                <div className="absolute -top-2.5 right-3 bg-[#07fd02] text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Descripción 3
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* 2.5. MOCK FEATURES SECTION */}
      <div className="relative border border-slate-200 rounded-3xl bg-slate-50/50 shadow-inner overflow-hidden">
        <div className="absolute top-3 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN CARACTERÍSTICAS (Diseño Real)
        </div>

        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <div className="relative group border border-dashed border-slate-300 hover:border-indigo-500 focus-within:border-indigo-650 focus-within:ring-2 focus-within:ring-indigo-100 rounded-xl p-2 bg-white/40 transition-all">
              <input
                type="text"
                value={config.featuresTitle || ''}
                onChange={(e) => onChange('featuresTitle', e.target.value)}
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-2xl sm:text-3xl font-black text-center text-slate-900"
                placeholder="¿Qué puedes hacer con Sistematízate?"
              />
              <div className="absolute -top-2.5 right-3 bg-indigo-650 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Título Sección
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center max-w-6xl mx-auto">
            {currentFeatures.map((feat: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between items-center space-y-4 hover:shadow-md transition-shadow relative group">
                <span className="text-[10px] font-black uppercase text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-md self-start">Característica {idx + 1}</span>
                
                {/* Title */}
                <div className="relative group/title border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-650 rounded-lg p-1.5 w-full bg-white transition-all">
                  <input
                    type="text"
                    value={feat.title || ''}
                    onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-sm font-bold text-center text-slate-800"
                    placeholder="Título de la característica"
                  />
                </div>

                {/* Description */}
                <div className="relative group/desc border border-dashed border-slate-200 hover:border-indigo-500 focus-within:border-indigo-650 rounded-lg p-1.5 w-full bg-white transition-all">
                  <textarea
                    value={feat.description || ''}
                    onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                    rows={2}
                    className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 text-center leading-relaxed resize-none"
                    placeholder="Descripción de la característica"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 3. MOCK CTA SECTION */}
      <div className="relative border border-slate-200 rounded-3xl bg-[#0a0f24] text-white overflow-hidden shadow-xl">
        <div className="absolute top-3 left-4 bg-[#07fd02] text-[#0a0f24] text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          SECCIÓN CTA (Diseño Real)
        </div>

        <section className="py-16 px-6 max-w-5xl mx-auto text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            
            {/* Title and Highlight */}
            <div className="space-y-3">
              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all">
                <input
                  type="text"
                  value={config.ctaTitle || ''}
                  onChange={(e) => onChange('ctaTitle', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-2xl sm:text-3xl font-black tracking-tight text-center text-white"
                  placeholder="Sistematiza hoy tu negocio"
                />
                <div className="absolute -top-2.5 right-3 bg-indigo-650 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Título CTA
                </div>
              </div>

              <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all max-w-sm mx-auto">
                <input
                  type="text"
                  value={config.ctaHighlight || ''}
                  onChange={(e) => onChange('ctaHighlight', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xl font-bold text-center text-[#07fd02]"
                  placeholder="¡Es gratis empezar!"
                />
                <div className="absolute -top-2.5 right-3 bg-[#07fd02] text-[#0a0f24] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Texto Destacado (Verde)
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="relative group border border-dashed border-slate-700 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-xl p-2 transition-all max-w-xl mx-auto">
              <textarea
                value={config.ctaDescription || ''}
                onChange={(e) => onChange('ctaDescription', e.target.value)}
                rows={2}
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-slate-400 text-xs sm:text-sm text-center leading-relaxed resize-none"
                placeholder="Descubre la herramienta preferida por miles de negocios en Perú..."
              />
              <div className="absolute -top-2.5 right-3 bg-indigo-650 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Descripción CTA
              </div>
            </div>

            {/* Static Button Mockups */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 opacity-60 pointer-events-none select-none">
              <div className="px-5 py-2.5 rounded-lg bg-[#07fd02] text-[#0a0f24] text-xs font-bold shadow-sm">Comenzar prueba gratis</div>
              <div className="px-5 py-2.5 rounded-lg border border-[#07fd02] text-[#07fd02] text-xs font-bold">Contactar por WhatsApp</div>
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
