import React from 'react';

interface NosotrosViewProps {
  onNavigate: (view: string) => void;
}

export const NosotrosView: React.FC<NosotrosViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 md:py-24 px-6 max-w-7xl mx-auto space-y-20 text-left font-sans text-slate-800">
      {/* Intro Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3.5 py-1.5 rounded-full inline-block border border-secondary/20">
          Sobre VM Maquinarias
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-secondary leading-tight">
          Más de 20 años liderando soluciones en logística y maquinarias industriales
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          VM Maquinarias nació en el año 2000 en la Zona Industrial de Lurín. Desde nuestras primeras operaciones en Cerámica San Lorenzo, hemos mantenido un compromiso inquebrantable con la calidad, ofreciendo la mejor relación costo-beneficio en venta, alquiler, reparación y repuestos para equipos de movimiento de carga.
        </p>
      </div>

      {/* Misión, Visión, Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
        {/* Misión */}
        <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary-dark flex items-center justify-center border border-primary/20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-secondary">Nuestra Misión</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Garantizar la continuidad operativa de nuestros clientes ofreciendo montacargas, apiladores y repuestos de alta calidad con un soporte técnico inmediato, profesional y personalizado.
          </p>
        </div>

        {/* Visión */}
        <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-secondary">Nuestra Visión</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ser la empresa referente a nivel nacional en venta, alquiler y transición hacia energías limpias (Litio-ION) para maquinarias de almacén y logística pesada.
          </p>
        </div>

        {/* Valores */}
        <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary-dark flex items-center justify-center border border-primary/20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-secondary">Nuestros Valores</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Compromiso operativo, honestidad comercial, respuesta rápida ante emergencias de flota y vanguardia tecnológica en almacenamiento energético.
          </p>
        </div>
      </div>

      {/* Marcas e Historia */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden border border-slate-800 shadow-2xl">
        <div className="lg:col-span-8 space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-primary-light bg-primary/20 px-3.5 py-1.5 rounded-full inline-block border border-primary/30">
            Trayectoria y Clientes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Empresas de primer nivel confían en nosotros
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Hemos tenido la oportunidad de formar alianzas y brindar servicios de mantenimiento y alquiler a líderes industriales como Sapolio (Intradevco), Emusa, Trupal, Metrocolor, B.S.H., Rosello, entre muchas otras firmas exigentes.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('reservas')}
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-slate-950 font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer"
            >
              Reservar o Cotizar Alquiler
            </button>
            <button
              onClick={() => onNavigate('contacto')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold transition-all cursor-pointer"
            >
              Contactar Asesor
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center space-y-4 shadow-inner">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-light">Marcas Representadas</h4>
            <div className="grid grid-cols-2 gap-3 text-sm font-extrabold text-white">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">FLEXI</div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">EP EQUIPMENT</div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">TOYOTA</div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">JUNGHEINRICH</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
