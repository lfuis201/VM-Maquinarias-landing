import React from 'react';
import { Button, TextField, Label, Input } from '@heroui/react';
import { Plus, TrashBin, ArrowUp, ArrowDown, FloppyDisk } from '@gravity-ui/icons';
import Editor from 'react-simple-wysiwyg';

interface PolicySection {
  title: string;
  content: string;
}

interface PoliticaFormEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const PoliticaFormEditor: React.FC<PoliticaFormEditorProps> = ({
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
    const updated = [...sections, { title: 'Nueva Sección', content: 'Contenido de la sección...' }];
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
    <form onSubmit={onSubmit} className="space-y-8 text-left">
      {/* Header configurations */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Cabecera de la Página</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={config.title || ''}
            onChange={(val) => onChange('title', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Título de la Página</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.lastUpdated || ''}
            onChange={(val) => onChange('lastUpdated', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Última Actualización</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
        </div>

        <div className="space-y-1.5 flex flex-col w-full">
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Texto Introductorio</Label>
          <div className="w-full bg-slate-50 border border-slate-200 focus-within:border-slate-800 rounded-xl overflow-hidden transition-all">
            <Editor
              value={config.introText || ''}
              onChange={(e) => onChange('introText', e.target.value)}
              containerProps={{ style: { minHeight: '150px', overflowY: 'auto', border: 'none' } }}
            />
          </div>
        </div>
      </div>

      {/* Sections Config */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Secciones de la Política</h3>
            <p className="text-xs text-slate-500">Agrega y personaliza el cuerpo legal del documento. Se soporta código HTML para dar formato.</p>
          </div>
          <Button
            type="button"
            onClick={addSection}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 self-end"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Sección</span>
          </Button>
        </div>

        <div className="space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4 relative group">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                <span className="text-xs font-black text-slate-400">Sección #{idx + 1}</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    onClick={() => moveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 h-8 w-8 min-w-0 bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => moveSection(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    className="p-1.5 h-8 w-8 min-w-0 bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => removeSection(idx)}
                    className="p-1.5 h-8 w-8 min-w-0 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <TrashBin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <TextField
                  value={section.title}
                  onChange={(val) => updateSectionField(idx, 'title', val)}
                  className="space-y-1.5 flex flex-col w-full"
                >
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Título de Sección</Label>
                  <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
                </TextField>

                <div className="space-y-1.5 flex flex-col w-full">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contenido de la Sección (HTML permitido)</Label>
                  <div className="w-full bg-white border border-slate-200 focus-within:border-slate-800 rounded-xl overflow-hidden transition-all">
                    <Editor
                      value={section.content}
                      onChange={(e) => updateSectionField(idx, 'content', e.target.value)}
                      containerProps={{ style: { minHeight: '200px', overflowY: 'auto', border: 'none' } }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
              <span className="text-xs text-slate-500 font-bold block mb-2">No hay secciones registradas</span>
              <Button
                type="button"
                onClick={addSection}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9 px-4 rounded-xl cursor-pointer transition-all inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Sección</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-slate-900/10 cursor-pointer hover:scale-[1.01] transition-all flex items-center gap-2"
        disabled={isLoading}
      >
        <FloppyDisk className="w-4.5 h-4.5" />
        <span>{isLoading ? 'Guardando...' : 'Guardar Cambios Política'}</span>
      </Button>
    </form>
  );
};
