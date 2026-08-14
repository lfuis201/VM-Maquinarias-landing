import React from 'react';
import { Button } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';
import logo from '../../../../../assets/logo.png';

interface FooterVisualEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FooterVisualEditor: React.FC<FooterVisualEditorProps> = ({
  config,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20 relative text-left">
      {/* Editor Header Instruction Banner */}
      <div className="bg-indigo-50/70 border border-indigo-150 rounded-2xl p-4 text-left flex items-start gap-3">
        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <div>
          <h5 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">Modo Constructor en Vivo (Footer)</h5>
          <p className="text-xs text-indigo-750 mt-0.5 leading-relaxed">
            ¡Los campos con borde punteado son editables! Haz clic y escribe directamente en el diseño real.
            Los cambios se aplicarán globalmente en el footer de todas las páginas de la landing.
          </p>
        </div>
      </div>

      {/* FOOTER DESIGN MOCK */}
      <div className="relative border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute top-3 left-4 bg-primary text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full z-20">
          DISEÑO REAL DEL FOOTER
        </div>

        <footer className="bg-slate-900 text-white pt-16 pb-12 px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
            
            {/* 1. Brand Description Editable */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="SISTEMATÍZATE Logo" className="w-8 h-8 object-contain rounded-lg" />
                <div className="flex flex-col">
                  <span className="font-black text-base tracking-tight text-white leading-none uppercase flex items-start">
                    SISTEMATÍZATE
                    <sup className="text-[8px] font-extrabold text-white lowercase ml-0.5 relative -top-0.5">pe</sup>
                  </span>
                  <span className="text-[7px] font-extrabold text-white tracking-wider uppercase mt-1">
                    Transformando Empresas
                  </span>
                </div>
              </div>
              
              <div className="relative group border border-dashed border-slate-700 hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 rounded-xl p-2 bg-white/5 transition-all">
                <textarea
                  value={config.description || ''}
                  onChange={(e) => onChange('description', e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-400 leading-relaxed resize-y"
                  placeholder="Descripción de la empresa en el footer..."
                />
                <div className="absolute -top-2.5 right-3 bg-primary text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  Descripción Brand
                </div>
              </div>
            </div>

            {/* 2. Mock Navigation (Read-Only Representation) */}
            <div className="space-y-3 opacity-60 select-none pointer-events-none">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Navegación</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Inicio</li>
                <li>Nosotros</li>
                <li>Sistema Restaurante</li>
                <li>Planes y precios</li>
                <li>Software Factory</li>
                <li>Blog informativo</li>
              </ul>
            </div>

            {/* 3. Contact & Office Editable */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Contacto y Oficina</h4>
              
              <div className="space-y-3 text-xs text-slate-350">
                {/* Address */}
                <div className="relative group border border-dashed border-slate-700 hover:border-primary focus-within:border-primary rounded-lg p-1.5 bg-white/5">
                  <input
                    type="text"
                    value={config.address || ''}
                    onChange={(e) => onChange('address', e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-300"
                    placeholder="Dirección comercial"
                  />
                  <div className="absolute -top-2.5 right-2 bg-primary text-slate-950 text-[8px] font-bold px-1 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Dirección
                  </div>
                </div>

                {/* Phone */}
                <div className="relative group border border-dashed border-slate-700 hover:border-primary focus-within:border-primary rounded-lg p-1.5 bg-white/5">
                  <input
                    type="text"
                    value={config.phone || ''}
                    onChange={(e) => onChange('phone', e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-300"
                    placeholder="WhatsApp o Teléfono"
                  />
                  <div className="absolute -top-2.5 right-2 bg-primary text-slate-950 text-[8px] font-bold px-1 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Teléfono / WhatsApp
                  </div>
                </div>

                {/* Ventas */}
                <div className="relative group border border-dashed border-slate-700 hover:border-primary focus-within:border-primary rounded-lg p-1.5 bg-white/5">
                  <input
                    type="text"
                    value={config.emailVentas || ''}
                    onChange={(e) => onChange('emailVentas', e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-300"
                    placeholder="Correo de Ventas"
                  />
                  <div className="absolute -top-2.5 right-2 bg-primary text-slate-950 text-[8px] font-bold px-1 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Ventas Email
                  </div>
                </div>

                {/* Soporte */}
                <div className="relative group border border-dashed border-slate-700 hover:border-primary focus-within:border-primary rounded-lg p-1.5 bg-white/5">
                  <input
                    type="text"
                    value={config.emailSoporte || ''}
                    onChange={(e) => onChange('emailSoporte', e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-300"
                    placeholder="Correo de Soporte"
                  />
                  <div className="absolute -top-2.5 right-2 bg-primary text-slate-950 text-[8px] font-bold px-1 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Soporte Email
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Mock Legal Documents (Read-Only Representation) */}
            <div className="space-y-3 opacity-60 select-none pointer-events-none">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Documentos Legales</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Política de Privacidad</li>
                <li>Términos y Condiciones</li>
                <li>Libro de Reclamaciones</li>
              </ul>
            </div>
          </div>

          {/* Social Network URLs Config (Grid Layout Mock) */}
          <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-slate-800 space-y-4">
            <h5 className="text-[10px] font-extrabold text-[#07fd02] uppercase tracking-wider">Enlaces a Redes Sociales</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="relative group border border-dashed border-slate-750 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-lg p-1.5">
                <input
                  type="text"
                  value={config.facebookUrl || ''}
                  onChange={(e) => onChange('facebookUrl', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[10px] text-slate-350"
                  placeholder="URL de Facebook"
                />
                <span className="absolute right-2 top-2 text-[9px] text-slate-500 font-bold">Facebook</span>
              </div>

              <div className="relative group border border-dashed border-slate-750 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-lg p-1.5">
                <input
                  type="text"
                  value={config.youtubeUrl || ''}
                  onChange={(e) => onChange('youtubeUrl', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[10px] text-slate-350"
                  placeholder="URL de YouTube"
                />
                <span className="absolute right-2 top-2 text-[9px] text-slate-500 font-bold">YouTube</span>
              </div>

              <div className="relative group border border-dashed border-slate-750 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-lg p-1.5">
                <input
                  type="text"
                  value={config.instagramUrl || ''}
                  onChange={(e) => onChange('instagramUrl', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[10px] text-slate-350"
                  placeholder="URL de Instagram"
                />
                <span className="absolute right-2 top-2 text-[9px] text-slate-500 font-bold">Instagram</span>
              </div>

              <div className="relative group border border-dashed border-slate-750 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-lg p-1.5">
                <input
                  type="text"
                  value={config.linkedinUrl || ''}
                  onChange={(e) => onChange('linkedinUrl', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[10px] text-slate-350"
                  placeholder="URL de LinkedIn"
                />
                <span className="absolute right-2 top-2 text-[9px] text-slate-500 font-bold">LinkedIn</span>
              </div>

              <div className="relative group border border-dashed border-slate-750 hover:border-[#07fd02] focus-within:border-[#07fd02] rounded-lg p-1.5">
                <input
                  type="text"
                  value={config.tiktokUrl || ''}
                  onChange={(e) => onChange('tiktokUrl', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-[10px] text-slate-350"
                  placeholder="URL de TikTok"
                />
                <span className="absolute right-2 top-2 text-[9px] text-slate-500 font-bold">TikTok</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Text Editable */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="relative group border border-dashed border-slate-750 hover:border-primary focus-within:border-primary rounded-lg p-1.5 bg-white/5 w-96">
              <input
                type="text"
                value={config.copyrightText || ''}
                onChange={(e) => onChange('copyrightText', e.target.value)}
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-350"
                placeholder="Texto Copyright"
              />
              <div className="absolute -top-2.5 right-2 bg-primary text-slate-950 text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Copyright Text
              </div>
            </div>
            
            <div className="flex gap-4 opacity-50 select-none pointer-events-none">
              <span>Redes Sociales &rarr;</span>
            </div>
          </div>
        </footer>
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
