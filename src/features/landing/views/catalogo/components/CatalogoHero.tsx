import React from 'react';
import { Button } from '../../../../../shared/components/Button';

interface CatalogoHeroProps {
  onNavigate: (view: string) => void;
}

export const CatalogoHero: React.FC<CatalogoHeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0f24] to-[#121c42] text-white py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto space-y-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-secondary text-xs font-bold tracking-wide shadow-sm mx-auto">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Hardware Homologado y Garantizado
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Catálogo de Equipos POS <br />
          <span className="text-primary font-bold">Listos para Trabajar</span>
        </h1>
        <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Equipa tu negocio con hardware industrial de alta durabilidad y rendimiento, 100% compatible con el sistema Sistematízate.
        </p>
        <div className="pt-2 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            className="shadow-lg shadow-primary/20 cursor-pointer text-slate-950 font-bold"
            onClick={() => onNavigate('contacto')}
          >
            Solicitar Cotización Completa
          </Button>
        </div>
      </div>
    </section>
  );
};
