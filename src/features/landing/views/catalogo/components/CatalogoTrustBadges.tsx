import React from 'react';

export const CatalogoTrustBadges: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 border-y border-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: 'Garantía Oficial',
            desc: '1 año de garantía extendida ante cualquier desperfecto de fábrica.',
            icon: (
              <svg className="w-8 h-8 text-[#10094d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )
          },
          {
            title: 'Envío Asegurado',
            desc: 'Hacemos despachos directos a domicilio y agencias en todo el Perú.',
            icon: (
              <svg className="w-8 h-8 text-[#10094d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            )
          },
          {
            title: 'Soporte de Instalación',
            desc: 'Te ayudamos paso a paso con la instalación y configuración remota inicial.',
            icon: (
              <svg className="w-8 h-8 text-[#10094d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )
          },
          {
            title: 'Homologación SUNAT',
            desc: 'Equipos 100% compatibles con la normativa fiscal de facturación electrónica.',
            icon: (
              <svg className="w-8 h-8 text-[#10094d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )
          }
        ].map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              {badge.icon}
            </div>
            <h4 className="text-lg font-bold text-accent">{badge.title}</h4>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[240px]">
              {badge.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
