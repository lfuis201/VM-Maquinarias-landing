import React from 'react';
import { AnimatedCounter } from '../HeroVisuals';

interface HomeStatsProps {
  config: any;
}

export const HomeStats: React.FC<HomeStatsProps> = ({ config }) => {
  const renderStatValue = (val: string | number, isFloat = false) => {
    if (val === undefined || val === null) return '';
    const strVal = String(val);
    const parsed = parseFloat(strVal.replace(/[^\d.]/g, ''));
    if (!isNaN(parsed) && parsed > 0) {
      const hasPlus = strVal.startsWith('+');
      const hasStar = strVal.includes('★');
      return (
        <AnimatedCounter
          value={parsed}
          prefix={hasPlus ? '+' : ''}
          suffix={hasStar ? ' ★' : ''}
          formatter={(v) => {
            if (isFloat) return v.toFixed(1);
            return Math.floor(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          }}
        />
      );
    }
    return strVal;
  };

  return (
    <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left relative z-10">
        <div className="space-y-2 border-slate-800 md:border-r last:border-0 pr-0 md:pr-8">
          <div className="text-4xl sm:text-5xl font-black text-primary">
            {renderStatValue(config?.stat1Value !== undefined ? config.stat1Value : '+7.000.000')}
          </div>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {config?.stat1Title || 'comprobantes procesados con Sistematízate'}
          </div>
          <p className="text-xs text-slate-500">
            {config?.stat1Desc || 'Micro, pequeños y medianos comercios gestionan y automatizan sus operaciones diariamente con nosotros.'}
          </p>
        </div>

        <div className="space-y-2 border-slate-800 md:border-r last:border-0 px-0 md:px-8">
          <div className="text-4xl sm:text-5xl font-black text-white">
            {renderStatValue(config?.stat2Value !== undefined ? config.stat2Value : '+24')}
          </div>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {config?.stat2Title || 'departamentos con presencia'}
          </div>
          <p className="text-xs text-slate-500">
            {config?.stat2Desc || 'Líderes en digitalización y soluciones para el crecimiento empresarial a nivel nacional en todo el Perú.'}
          </p>
        </div>

        <div className="space-y-2 pl-0 md:pl-8">
          <div className="text-4xl sm:text-5xl font-black text-primary">
            {renderStatValue(config?.stat3Value !== undefined ? config.stat3Value : '4.8 ★', true)}
          </div>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {config?.stat3Title || 'calificación de clientes'}
          </div>
          <p className="text-xs text-slate-500">
            {config?.stat3Desc || 'Elogiado por comerciantes y dueños de negocios por ser el sistema de facturación y gestión comercial más simple.'}
          </p>
        </div>
      </div>
    </section>
  );
};
