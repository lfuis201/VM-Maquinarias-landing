import React from 'react';
import { Button } from '../../../../shared/components/Button';
import { HeroVisuals } from '../HeroVisuals';

interface HomeHeroProps {
  config: any;
  onNavigate: (view: string, subId?: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ config, onNavigate }) => {
  const heroBullets = config?.heroBullets || [
    'Somos la plataforma más fácil e intuitiva',
    'Úsalo desde el celular y computador',
    'Conoce las estadísticas de tu negocio en tiempo real',
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-6 text-left space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-secondary text-xs font-bold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            {config?.heroBadge || 'Facturación Electrónica SUNAT 100% Autorizada'}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-accent tracking-tight leading-[1.1] whitespace-pre-line">
            {config?.heroTitle || 'Sistema de Gestión\npara tu negocio'}
          </h1>

          <h2 className="text-xl md:text-2xl font-bold text-accent">
            {config?.heroSubtitle || 'Digitaliza y factura con Sistematízate'}
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-lg">
            {config?.heroDescription || 'La plataforma más fácil e intuitiva para controlar tus ventas, emitir boletas y facturas electrónicas, y supervisar tu inventario en tiempo real desde Perú.'}
          </p>

          <ul className="space-y-3.5">
            {heroBullets.map((text: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-slate-950">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-slate-700 font-medium text-sm md:text-base">{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer"
              onClick={() => onNavigate('planes')}
            >
              Prueba ahora
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-slate-350 text-slate-700 hover:bg-slate-50 cursor-pointer"
              onClick={() => onNavigate('contacto')}
            >
              Contáctanos
            </Button>
          </div>

          {/* Google Play & App Store Badge */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24">
                <path fill="currentColor" d="m3.637 3.434l8.74 8.571l-8.675 8.65a2.1 2.1 0 0 1-.326-.613a2.5 2.5 0 0 1 0-.755V4.567c-.026-.395.065-.79.26-1.133m12.506 4.833l-2.853 2.826L4.653 2.6c.28-.097.58-.124.873-.078c.46.126.899.32 1.302.573l7.816 4.325c.508.273 1.003.56 1.498.847M13.29 12.93l2.839 2.788l-2.058 1.146l-6.279 3.49c-.52.287-1.042.561-1.55.874a1.8 1.8 0 0 1-1.472.195zm7.36-.925a1.92 1.92 0 0 1-.99 1.72l-2.346 1.302l-3.087-3.022l3.1-3.074c.795.443 1.577.886 2.358 1.303a1.89 1.89 0 0 1 .964 1.771" />
              </svg>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">
                {config?.heroPlayRatingScore ? `${config.heroPlayRatingScore} de 5` : '4.8 de 5'}
              </span>
              <span className="text-xs text-slate-500">
                {config?.heroPlayRatingText || 'en Google Play y App Store'}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Right Visuals - High-Fidelity Showcase (Dashboard + Phone App) */}
        <div className="lg:col-span-6 flex justify-center">
          <HeroVisuals />
        </div>
      </div>
    </section>
  );
};
