import React from 'react';
import { Button } from '../../../../shared/components/Button';

interface HomeCTAProps {
  config?: any;
  onNavigate: (view: string, subId?: string) => void;
}

export const HomeCTA: React.FC<HomeCTAProps> = ({ config, onNavigate }) => {
  const ctaTitle = config?.ctaTitle || 'Sistematiza hoy tu negocio ¡Es gratis empezar!';
  const ctaHighlight = config?.ctaHighlight || '¡Es gratis empezar!';
  const ctaDescription = config?.ctaDescription || 'Descubre la herramienta preferida por miles de negocios en Perú para el control de facturas, inventario y comisiones en tiempo real.';

  // Highlight the text if it exists in the title
  const renderTitle = () => {
    if (ctaTitle.includes(ctaHighlight)) {
      const parts = ctaTitle.split(ctaHighlight);
      return (
        <>
          {parts[0]}
          <span className="text-primary animate-pulse">{ctaHighlight}</span>
          {parts[1]}
        </>
      );
    }
    return ctaTitle;
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-secondary border border-primary/20 text-white p-10 sm:p-20 text-center shadow-2xl shadow-primary/10">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
          {renderTitle()}
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
          {ctaDescription}
        </p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer font-bold"
            onClick={() => onNavigate('planes')}
          >
            Comenzar prueba gratis
          </Button>
          <button
            className="w-full sm:w-auto px-7 py-3.5 text-lg font-bold rounded-xl border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-95 cursor-pointer bg-transparent"
            onClick={() => onNavigate('contacto')}
          >
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};
