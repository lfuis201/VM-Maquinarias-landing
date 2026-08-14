import React from 'react';
import { Button, TextField, Label, Input, TextArea } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';

interface NosotrosFormEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const NosotrosFormEditor: React.FC<NosotrosFormEditorProps> = ({ config, onChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Intro Section */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Sección Presentación (Nosotros)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={config.introBadge || ''}
            onChange={(val) => onChange('introBadge', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Etiqueta superior (badge)</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
          <TextField
            value={config.introTitle || ''}
            onChange={(val) => onChange('introTitle', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Título Principal</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
        </div>

        <TextField
          value={config.introDescription || ''}
          onChange={(val) => onChange('introDescription', val)}
          className="space-y-1.5 flex flex-col w-full"
        >
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Descripción Quiénes Somos</Label>
          <TextArea rows={3} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[90px]" />
        </TextField>
      </div>

      {/* Misión, Visión, Valores */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Misión, Visión y Valores</h3>
        
        <div className="space-y-6">
          {/* Misión */}
          <div className="space-y-3">
            <TextField value={config.misionTitle || ''} onChange={(val) => onChange('misionTitle', val)} className="flex flex-col space-y-1">
              <Label className="text-xs font-bold text-slate-700 uppercase">Título Misión</Label>
              <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none" />
            </TextField>
            <TextField value={config.misionDesc || ''} onChange={(val) => onChange('misionDesc', val)} className="flex flex-col space-y-1">
              <Label className="text-xs font-bold text-slate-700 uppercase">Descripción Misión</Label>
              <TextArea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none resize-y min-h-[60px]" />
            </TextField>
          </div>

          {/* Visión */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <TextField value={config.visionTitle || ''} onChange={(val) => onChange('visionTitle', val)} className="flex flex-col space-y-1">
              <Label className="text-xs font-bold text-slate-700 uppercase">Título Visión</Label>
              <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none" />
            </TextField>
            <TextField value={config.visionDesc || ''} onChange={(val) => onChange('visionDesc', val)} className="flex flex-col space-y-1">
              <Label className="text-xs font-bold text-slate-700 uppercase">Descripción Visión</Label>
              <TextArea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none resize-y min-h-[60px]" />
            </TextField>
          </div>

          {/* Valores */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <TextField value={config.valoresTitle || ''} onChange={(val) => onChange('valoresTitle', val)} className="flex flex-col space-y-1">
              <Label className="text-xs font-bold text-slate-700 uppercase">Título Valores</Label>
              <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none" />
            </TextField>
            <TextField value={config.valoresDesc || ''} onChange={(val) => onChange('valoresDesc', val)} className="flex flex-col space-y-1">
              <Label className="text-xs font-bold text-slate-700 uppercase">Descripción Valores</Label>
              <TextArea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none resize-y min-h-[60px]" />
            </TextField>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-slate-900/10 cursor-pointer hover:scale-[1.01] transition-transform flex items-center gap-2"
      >
        {isLoading ? (
          'Guardando...'
        ) : (
          <>
            <FloppyDisk className="w-5 h-5" />
            <span>Guardar Cambios Nosotros</span>
          </>
        )}
      </Button>
    </form>
  );
};
