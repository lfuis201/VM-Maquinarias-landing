import React from 'react';
import { Button, TextField, Label, Input, TextArea } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';

interface HomeFormEditorProps {
  config: any;
  bullets: string[];
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const HomeFormEditor: React.FC<HomeFormEditorProps> = ({
  config,
  bullets,
  onChange,
  onSubmit,
  isLoading,
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
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Hero Section Card */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Sección Hero Principal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={config.heroBadge || ''}
            onChange={(val) => onChange('heroBadge', val)}
            className="space-y-1.5 flex flex-col w-full text-left"
          >
            <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Etiqueta superior (badge)</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
          <TextField
            type="number"
            value={String(config.heroPlayRatingScore || '')}
            onChange={(val) => onChange('heroPlayRatingScore', val)}
            className="space-y-1.5 flex flex-col w-full text-left"
          >
            <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Calificación promedio</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
        </div>

        <TextField
          value={config.heroTitle || ''}
          onChange={(val) => onChange('heroTitle', val)}
          className="space-y-1.5 flex flex-col w-full text-left"
        >
          <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Título principal</Label>
          <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
        </TextField>

        <TextField
          value={config.heroSubtitle || ''}
          onChange={(val) => onChange('heroSubtitle', val)}
          className="space-y-1.5 flex flex-col w-full text-left"
        >
          <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Subtítulo</Label>
          <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
        </TextField>

        <TextField
          value={config.heroDescription || ''}
          onChange={(val) => onChange('heroDescription', val)}
          className="space-y-1.5 flex flex-col w-full text-left"
        >
          <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Descripción general</Label>
          <TextArea rows={3} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[90px]" />
        </TextField>

        <TextField
          value={bullets.join('\n')}
          onChange={(val) => onChange('heroBullets', val)}
          className="space-y-1.5 flex flex-col w-full text-left"
        >
          <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Lista de beneficios / bullets (uno por línea)</Label>
          <TextArea rows={4} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[110px]" />
        </TextField>
      </div>

      {/* Statistics Section Card */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Sección de Estadísticas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="space-y-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wide border-b border-slate-250 pb-1.5">Estadística 1</h4>
            <div className="space-y-3">
              <TextField value={String(config.stat1Value || '')} onChange={(val) => onChange('stat1Value', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Valor</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
              <TextField value={config.stat1Title || ''} onChange={(val) => onChange('stat1Title', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Título</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
              <TextField value={config.stat1Desc || ''} onChange={(val) => onChange('stat1Desc', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Descripción</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="space-y-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wide border-b border-slate-250 pb-1.5">Estadística 2</h4>
            <div className="space-y-3">
              <TextField value={String(config.stat2Value || '')} onChange={(val) => onChange('stat2Value', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Valor</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
              <TextField value={config.stat2Title || ''} onChange={(val) => onChange('stat2Title', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Título</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
              <TextField value={config.stat2Desc || ''} onChange={(val) => onChange('stat2Desc', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Descripción</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="space-y-4 bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wide border-b border-slate-250 pb-1.5">Estadística 3</h4>
            <div className="space-y-3">
              <TextField value={String(config.stat3Value || '')} onChange={(val) => onChange('stat3Value', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Valor</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
              <TextField value={config.stat3Title || ''} onChange={(val) => onChange('stat3Title', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Título</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
              <TextField value={config.stat3Desc || ''} onChange={(val) => onChange('stat3Desc', val)} className="flex flex-col space-y-1 text-left">
                <Label className="text-[9px] font-bold text-slate-500 uppercase">Descripción</Label>
                <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 text-xs outline-none" />
              </TextField>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section Card */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Sección ¿Qué puedes hacer con Sistematízate? (Características)</h3>
        
        <TextField
          value={config.featuresTitle || ''}
          onChange={(val) => onChange('featuresTitle', val)}
          className="space-y-1.5 flex flex-col w-full text-left"
        >
          <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Título de la sección</Label>
          <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
        </TextField>

        <div className="space-y-6">
          <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">Características del Producto</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentFeatures.map((feat: any, idx: number) => (
              <div key={idx} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-md">Característica {idx + 1}</span>
                  <span className="text-[10px] font-semibold text-slate-400">Tipo: {feat.view}</span>
                </div>
                <TextField
                  value={feat.title || ''}
                  onChange={(val) => handleFeatureChange(idx, 'title', val)}
                  className="space-y-1 flex flex-col w-full text-left"
                >
                  <Label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Título</Label>
                  <Input className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-xl px-3 py-2 text-slate-900 text-xs outline-none" />
                </TextField>
                <TextField
                  value={feat.description || ''}
                  onChange={(val) => handleFeatureChange(idx, 'description', val)}
                  className="space-y-1 flex flex-col w-full text-left"
                >
                  <Label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Descripción</Label>
                  <TextArea rows={2} className="w-full bg-white border border-slate-200 focus:border-slate-850 rounded-xl px-3 py-2 text-slate-900 text-xs outline-none resize-none" />
                </TextField>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section Card */}
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Sección Llamado a la Acción (CTA)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            value={config.ctaTitle || ''}
            onChange={(val) => onChange('ctaTitle', val)}
            className="space-y-1.5 flex flex-col w-full text-left"
          >
            <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Título CTA</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
          <TextField
            value={config.ctaHighlight || ''}
            onChange={(val) => onChange('ctaHighlight', val)}
            className="space-y-1.5 flex flex-col w-full text-left"
          >
            <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Palabra destacada (highlight)</Label>
            <Input className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all" />
          </TextField>
        </div>

        <TextField
          value={config.ctaDescription || ''}
          onChange={(val) => onChange('ctaDescription', val)}
          className="space-y-1.5 flex flex-col w-full text-left"
        >
          <Label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Descripción CTA</Label>
          <TextArea rows={3} className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[90px]" />
        </TextField>
      </div>

      <div className="flex justify-start">
        <Button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-slate-900/10 cursor-pointer hover:scale-[1.01] transition-transform flex items-center gap-2"
        >
          {isLoading ? (
            'Guardando...'
          ) : (
            <>
              <FloppyDisk className="w-5 h-5" />
              <span>Guardar Cambios Inicio</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
