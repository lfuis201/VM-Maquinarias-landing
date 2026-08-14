import React from 'react';
import { Button } from '@heroui/react';
import { FloppyDisk, Plus, ArrowUp, ArrowDown, TrashBin } from '@gravity-ui/icons';
import Editor from 'react-simple-wysiwyg';

interface PolicySection {
  title: string;
  content: string;
}

interface PoliticaVisualEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const PoliticaVisualEditor: React.FC<PoliticaVisualEditorProps> = ({
  config,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const sections: PolicySection[] = config.sections || [];

  const updateSectionField = (index: number, field: keyof PolicySection, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    onChange('sections', updated);
  };

  const addSection = () => {
    const updated = [...sections, { title: 'Nueva Sección Legal', content: 'Escribe el contenido legal de la sección aquí...' }];
    onChange('sections', updated);
  };

  const removeSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    onChange('sections', updated);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange('sections', updated);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-20 relative text-left">
      {/* Editor Header Instruction Banner */}
      <div className="bg-indigo-50/70 border border-indigo-150 rounded-2xl p-4 text-left flex items-start gap-3">
        <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <div>
          <h5 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">Modo Constructor en Vivo (Política de Privacidad)</h5>
          <p className="text-xs text-indigo-750 mt-0.5 leading-relaxed">
            Haz clic y escribe directamente en la maqueta real de la página. El diseño del texto es auto-responsivo.
            Puedes añadir nuevas secciones o reordenarlas usando los controles rápidos.
          </p>
        </div>
      </div>

      {/* POLICY LAYOUT MOCK */}
      <div className="relative border border-slate-200 bg-white rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12">
        <div className="absolute top-3 left-4 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20 shadow-xs">
          VISTA PREVIA EN VIVO
        </div>

        <div className="max-w-3xl mx-auto space-y-8 mt-4">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#07fd02]">Legal y Cumplimiento</span>
            
            {/* Title editable */}
            <div className="relative group border border-dashed border-slate-300 hover:border-indigo-600 focus-within:border-indigo-600 rounded-xl p-1 bg-slate-50/50">
              <input
                type="text"
                value={config.title || ''}
                onChange={(e) => onChange('title', e.target.value)}
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-3xl sm:text-5xl font-black text-slate-900 leading-tight"
                placeholder="Título"
              />
              <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Título Página
              </div>
            </div>

            {/* Last Updated editable */}
            <div className="relative group border border-dashed border-slate-300 hover:border-indigo-600 focus-within:border-indigo-600 rounded-lg p-1 bg-slate-50/50 w-80">
              <input
                type="text"
                value={config.lastUpdated || ''}
                onChange={(e) => onChange('lastUpdated', e.target.value)}
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 font-semibold"
                placeholder="Última actualización"
              />
              <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Actualización
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-6">
            {/* Intro text editable */}
            <div className="relative group border border-dashed border-slate-300 hover:border-indigo-600 focus-within:border-indigo-600 rounded-xl p-2 bg-slate-50/50">
              <Editor
                value={config.introText || ''}
                onChange={(e) => onChange('introText', e.target.value)}
                containerProps={{ style: { minHeight: '150px', overflowY: 'auto', border: 'none', backgroundColor: '#ffffff90', borderRadius: '0.75rem' } }}
              />
              <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Texto Introductorio (Soporta HTML)
              </div>
            </div>

            {/* Render Policy Sections */}
            <div className="space-y-8 pt-4">
              {sections.map((section, idx) => (
                <div key={idx} className="relative group border border-dashed border-slate-300 hover:border-indigo-600 focus-within:border-indigo-600 rounded-2xl p-4 bg-slate-50/30 space-y-3">
                  
                  {/* Floating Action Box for each section in live builder */}
                  <div className="absolute -top-3.5 right-4 z-20 bg-white border border-slate-200 rounded-lg p-1 flex items-center gap-1 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      onClick={() => moveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 h-6 w-6 min-w-0 bg-transparent text-slate-650 hover:bg-slate-100 rounded disabled:opacity-35 cursor-pointer flex items-center justify-center"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => moveSection(idx, 'down')}
                      disabled={idx === sections.length - 1}
                      className="p-1 h-6 w-6 min-w-0 bg-transparent text-slate-650 hover:bg-slate-100 rounded disabled:opacity-35 cursor-pointer flex items-center justify-center"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="p-1 h-6 w-6 min-w-0 bg-transparent text-red-600 hover:bg-red-50 rounded cursor-pointer flex items-center justify-center"
                    >
                      <TrashBin className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Section Title */}
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionField(idx, 'title', e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-lg font-bold text-slate-900"
                    placeholder="Título de la Sección"
                  />

                  {/* Section Content */}
                  <div className="bg-white/80 border border-slate-200 rounded-xl overflow-hidden mt-2">
                    <Editor
                      value={section.content}
                      onChange={(e) => updateSectionField(idx, 'content', e.target.value)}
                      containerProps={{ style: { minHeight: '200px', overflowY: 'auto', border: 'none' } }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add button inside live mockup */}
            <div className="flex justify-center pt-4">
              <Button
                type="button"
                onClick={addSection}
                className="bg-indigo-550 hover:bg-indigo-650 text-white font-bold text-xs h-9 px-4 rounded-xl cursor-pointer shadow-xs transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Sección Legal</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION SAVE BAR FOR VISUAL MODE */}
      <div className="fixed bottom-6 right-8 z-30 bg-white border border-slate-200/90 shadow-xl py-3.5 px-6 rounded-2xl flex items-center gap-4 animate-bounce-short">
        <span className="text-xs font-black text-slate-700">Edición Activa en Diseño</span>
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 h-10 rounded-xl cursor-pointer hover:scale-[1.02] transition-all text-xs flex items-center gap-1.5"
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
