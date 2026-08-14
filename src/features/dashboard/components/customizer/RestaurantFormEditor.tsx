import React from 'react';
import { Button, TextField, Label, Input, TextArea } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';

interface RestaurantFormEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const RestaurantFormEditor: React.FC<RestaurantFormEditorProps> = ({
  config,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Hero Config */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Sección Hero - Restaurante</h3>
        
        <TextField
          value={config.heroTitle || ''}
          onChange={(val) => onChange('heroTitle', val)}
          className="space-y-1.5 flex flex-col w-full"
        >
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Título Principal</Label>
          <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
        </TextField>

        <TextField
          value={config.heroDescription || ''}
          onChange={(val) => onChange('heroDescription', val)}
          className="space-y-1.5 flex flex-col w-full"
        >
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Descripción del Servicio</Label>
          <TextArea rows={3} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[90px]" />
        </TextField>
      </div>

      {/* FAQs Config */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Preguntas Frecuentes (FAQs)</h3>
        
        <div className="space-y-6 divide-y divide-slate-100">
          {/* FAQ 1 */}
          <div className="pt-4 first:pt-0 space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Pregunta Frecuente 1</h4>
            <TextField value={config.faq1Q || ''} onChange={(val) => onChange('faq1Q', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Pregunta</Label>
              <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none" />
            </TextField>
            <TextField value={config.faq1A || ''} onChange={(val) => onChange('faq1A', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Respuesta</Label>
              <TextArea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none resize-y min-h-[60px]" />
            </TextField>
          </div>

          {/* FAQ 2 */}
          <div className="pt-6 space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Pregunta Frecuente 2</h4>
            <TextField value={config.faq2Q || ''} onChange={(val) => onChange('faq2Q', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Pregunta</Label>
              <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none" />
            </TextField>
            <TextField value={config.faq2A || ''} onChange={(val) => onChange('faq2A', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Respuesta</Label>
              <TextArea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none resize-y min-h-[60px]" />
            </TextField>
          </div>

          {/* FAQ 3 */}
          <div className="pt-6 space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Pregunta Frecuente 3</h4>
            <TextField value={config.faq3Q || ''} onChange={(val) => onChange('faq3Q', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Pregunta</Label>
              <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none" />
            </TextField>
            <TextField value={config.faq3A || ''} onChange={(val) => onChange('faq3A', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Respuesta</Label>
              <TextArea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none resize-y min-h-[60px]" />
            </TextField>
          </div>

          {/* FAQ 4 */}
          <div className="pt-6 space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wide">Pregunta Frecuente 4</h4>
            <TextField value={config.faq4Q || ''} onChange={(val) => onChange('faq4Q', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Pregunta</Label>
              <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none" />
            </TextField>
            <TextField value={config.faq4A || ''} onChange={(val) => onChange('faq4A', val)} className="flex flex-col space-y-1">
              <Label className="text-[10px] font-bold text-slate-500 uppercase">Respuesta</Label>
              <TextArea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none resize-y min-h-[60px]" />
            </TextField>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-slate-900/10 cursor-pointer hover:scale-[1.01] transition-all flex items-center gap-2"
        disabled={isLoading}
      >
        <FloppyDisk className="w-4.5 h-4.5" />
        <span>{isLoading ? 'Guardando...' : 'Guardar Cambios Restaurante'}</span>
      </Button>
    </form>
  );
};
