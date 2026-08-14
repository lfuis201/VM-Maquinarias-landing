import React from 'react';
import { FeatureCard } from './FeatureCard';

interface FeaturesSectionProps {
  config?: any;
  onNavigate: (view: string) => void;
}

const getFeatureIcon = (view: string) => {
  switch (view) {
    case 'caja':
      return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M9 11V6a1 1 0 011-1h4a1 1 0 011 1v5" />
          <path d="M7 15h10M7 18h10" />
          <circle cx="12" cy="8" r="1.5" />
        </svg>
      );
    case 'inventario':
      return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16V8z" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
      );
    case 'dispositivos':
      return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="5" width="18" height="11" rx="2" />
          <path d="M2 19h20M7 19v-3M17 19v-3" />
          <circle cx="17" cy="8" r="1.5" />
          <path d="M17 6v1M15.5 8h1M18.5 8h1" />
        </svg>
      );
    case 'decisiones':
      return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M18 20V10M12 20V4M6 20v-6M3 20h18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 6l3 3m0 0l-3 3m3-3H7" />
        </svg>
      );
    case 'contactos':
      return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case 'formaliza':
      return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2S8 7 8 12c0 2.2 1.8 4 4 4s4-1.8 4-4c0-5-4-10-4-10z" />
          <path d="M8 12c0-2 2-4 2-4s2 2 2 4M12 16v5M8 19l-2 2M16 19l2-2" />
        </svg>
      );
    default:
      return (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
  }
};

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ config, onNavigate }) => {
  const defaultFeatures = [
    {
      title: 'Controla tu flujo de caja',
      description: 'Registra ventas y gastos fácilmente y mantén tus finanzas claras todos los días',
      view: 'caja'
    },
    {
      title: 'Gestiona tu inventario',
      description: 'Conoce qué productos rotan más, evita pérdidas y pide a tiempo lo necesario',
      view: 'inventario'
    },
    {
      title: 'Accede desde cualquier dispositivo',
      description: 'Administra tu negocio desde el celular o computador, estés donde estés, sin complicaciones',
      view: 'dispositivos'
    },
    {
      title: 'Toma decisiones con datos reales',
      description: 'Revisa estadísticas claras y reportes automáticos que muestran cómo hacer crecer tu negocio',
      view: 'decisiones'
    },
    {
      title: 'Maneja tus clientes, proveedores y empleados',
      description: 'Organiza contactos, controla pagos pendientes y fortalece relaciones clave en un solo lugar',
      view: 'contactos'
    },
    {
      title: 'Formaliza tu negocio',
      description: 'Genera comprobantes fácilmente y cumple con requisitos legales para crecer con confianza y respaldo',
      view: 'formaliza'
    }
  ];

  const title = config?.featuresTitle || '¿Qué puedes hacer con Sistematízate?';
  const featuresList = Array.isArray(config?.features) ? config.features : defaultFeatures;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto text-center space-y-16 bg-slate-50/50 rounded-[40px] border border-slate-100 mt-16">
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight whitespace-pre-line">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center max-w-6xl mx-auto">
        {featuresList.map((feature: any, idx: number) => (
          <FeatureCard
            key={idx}
            title={feature.title}
            description={feature.description}
            icon={getFeatureIcon(feature.view)}
            color={idx % 2 === 0 ? 'primary' : 'accent'}
            onClick={() => onNavigate(feature.view)}
          />
        ))}
      </div>
    </section>
  );
};
