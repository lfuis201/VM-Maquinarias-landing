import React from 'react';
import { Button, TextField, Label, Input, TextArea } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';

interface FooterFormEditorProps {
  config: any;
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FooterFormEditor: React.FC<FooterFormEditorProps> = ({
  config,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Brand & Copy info */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Información de Marca</h3>
        
        <TextField
          value={config.description || ''}
          onChange={(val) => onChange('description', val)}
          className="space-y-1.5 flex flex-col w-full"
        >
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Descripción de Marca (Footer)</Label>
          <TextArea rows={3} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[90px]" />
        </TextField>

        <TextField
          value={config.copyrightText || ''}
          onChange={(val) => onChange('copyrightText', val)}
          className="space-y-1.5 flex flex-col w-full"
        >
          <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Texto de Derechos de Autor (Copyright)</Label>
          <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
        </TextField>
      </div>

      {/* Contact & Location Info */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Contacto y Oficinas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={config.address || ''}
            onChange={(val) => onChange('address', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Dirección de Oficina</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.phone || ''}
            onChange={(val) => onChange('phone', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">WhatsApp / Teléfono</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.emailVentas || ''}
            onChange={(val) => onChange('emailVentas', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Correo de Ventas</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.emailSoporte || ''}
            onChange={(val) => onChange('emailSoporte', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Correo de Soporte</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
        </div>
      </div>

      {/* Social networks info */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Redes Sociales</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={config.facebookUrl || ''}
            onChange={(val) => onChange('facebookUrl', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL de Facebook</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.youtubeUrl || ''}
            onChange={(val) => onChange('youtubeUrl', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL de YouTube</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.instagramUrl || ''}
            onChange={(val) => onChange('instagramUrl', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL de Instagram</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.linkedinUrl || ''}
            onChange={(val) => onChange('linkedinUrl', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL de LinkedIn</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>

          <TextField
            value={config.tiktokUrl || ''}
            onChange={(val) => onChange('tiktokUrl', val)}
            className="space-y-1.5 flex flex-col w-full"
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL de TikTok</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-slate-900/10 cursor-pointer hover:scale-[1.01] transition-all flex items-center gap-2"
        disabled={isLoading}
      >
        <FloppyDisk className="w-4.5 h-4.5" />
        <span>{isLoading ? 'Guardando...' : 'Guardar Cambios Footer'}</span>
      </Button>
    </form>
  );
};
