import React, { useState } from 'react';

interface HomeSolutionsProps {
  onNavigate: (view: string, subId?: string) => void;
}

export const HomeSolutions: React.FC<HomeSolutionsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'equipos' | 'rubros' | 'factory'>('rubros');

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-accent bg-primary px-3.5 py-1.5 rounded-full">
          Todo en un solo lugar
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
          Nuestros Equipos, Sistemas y Desarrollos a Medida
        </h2>
        <p className="text-slate-600 text-base md:text-lg">
          Ofrecemos hardware homologado de alta gama, software listo por rubro e integraciones personalizadas para tu empresa.
        </p>
      </div>

      {/* Tabs Control */}
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto border-b border-slate-100 pb-4">
        <button
          onClick={() => setActiveTab('rubros')}
          className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-205 cursor-pointer ${
            activeTab === 'rubros'
              ? 'bg-accent text-white shadow-sm'
              : 'text-slate-655 hover:bg-slate-100'
          }`}
        >
          Sistemas por Rubro (SUNAT)
        </button>
        <button
          onClick={() => setActiveTab('equipos')}
          className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-205 cursor-pointer ${
            activeTab === 'equipos'
              ? 'bg-accent text-white shadow-sm'
              : 'text-slate-655 hover:bg-slate-100'
          }`}
        >
          Hardware & Equipos POS
        </button>
        <button
          onClick={() => setActiveTab('factory')}
          className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-205 cursor-pointer ${
            activeTab === 'factory'
              ? 'bg-accent text-white shadow-sm'
              : 'text-slate-655 hover:bg-slate-100'
          }`}
        >
          Software Factory (A Medida)
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mt-12">
        {activeTab === 'rubros' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto animate-view">
            {/* Card 1: Restaurantes */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-accent">Restaurantes & Cafés</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Comandas táctiles, control de mesas, división de cuentas y facturación electrónica instantánea homologada por SUNAT.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-6 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('contacto')}>
                <span>Ver Demo del Sistema</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 2: Hoteles */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-accent">Hoteles & Hospedajes</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Check-in / Check-out rápido, control gráfico de habitaciones disponibles y cargos de consumos extra directo a la habitación.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-6 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('contacto')}>
                <span>Ver Demo del Sistema</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 3: Tiendas */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-accent">Tiendas & Minimarkets</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Punto de venta rápido con lector de código de barras, control de caja diario, alertas de stock mínimo y márgenes de ganancia.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-6 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('contacto')}>
                <span>Ver Demo del Sistema</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 4: Ferreterías */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-accent">Ferreterías & Almacenes</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Venta en múltiples unidades (unidad, kilo, paquete), conversión automática, control de almacenes y cotizaciones a SUNAT.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-6 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('contacto')}>
                <span>Ver Demo del Sistema</span>
                <span>→</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'equipos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-view">
            {/* Card 1: Computadoras POS */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="h-44 bg-slate-50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="w-32 h-24 bg-slate-800 rounded-lg border-2 border-slate-750 flex flex-col items-center justify-between p-2 shadow-md relative">
                    <div className="w-28 h-16 bg-slate-900 rounded border border-slate-800 flex items-center justify-center">
                      <span className="text-[10px] text-blue-500 font-mono">SISTEMATIZATE POS</span>
                    </div>
                    <div className="w-10 h-1 bg-slate-600 rounded-full" />
                    <div className="absolute -bottom-4 w-12 h-6 bg-slate-700 rounded-b-md transform -skew-x-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-accent">Terminal POS Todo en Uno Touch</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Computadora industrial táctil de 15.6 pulgadas con procesador Intel, disco SSD y diseño de metal resistente.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-8 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('catalogo-detail', 'terminal')}>
                <span>Ver ficha técnica y precios</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 2: Impresoras */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="h-44 bg-slate-50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="w-24 h-24 bg-slate-800 rounded-xl border border-slate-700 flex flex-col justify-between p-2 shadow-md relative">
                    <div className="w-full h-1 bg-slate-950 rounded-t" />
                    <div className="w-20 h-8 bg-white border border-slate-200 mx-auto rounded-t-sm flex items-center justify-center overflow-hidden">
                      <div className="w-16 h-0.5 bg-slate-400 my-1 animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="w-3 h-1.5 bg-slate-650 rounded-sm" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-accent">Impresora Térmica SUNAT 80mm</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Impresora de tickets rápida (260mm/s), con triple puerto de comunicación y cortador automático integrado.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-8 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('catalogo-detail', 'impresora')}>
                <span>Ver especificaciones técnicas</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 3: Kit POS Demo */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="h-44 bg-slate-50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="flex items-end gap-3">
                    <div className="w-16 h-12 bg-slate-850 rounded border border-slate-700 flex items-center justify-center shadow">
                      <span className="text-[6px] text-blue-400">POS</span>
                    </div>
                    <div className="w-12 h-12 bg-slate-700 rounded-md border border-slate-600 flex items-center justify-center">
                      <span className="text-[6px] text-slate-300">PRINT</span>
                    </div>
                    <div className="w-20 h-6 bg-slate-900 rounded border border-slate-800 flex items-center justify-center">
                      <span className="text-[6px] text-slate-400">GAVETA</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-accent">Kit Punto de Venta Demo de Prueba</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Prueba la experiencia de venta completa con nuestro kit demo con computadora, impresora, gaveta y sistema preinstalado.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-8 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('catalogo-detail', 'kit')}>
                <span>Ver catálogo completo de hardware</span>
                <span>→</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'factory' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-view">
            {/* Card 1: Desarrollo a medida */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-accent">Desarrollo de Software a Medida</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Construimos soluciones robustas de software factory adaptadas a tus reglas de negocio y flujos operativos específicos.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-8 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('contacto')}>
                <span>Agendar Reunión Técnica</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 2: API de Facturación */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-accent">API REST de Facturación Electrónica</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Integra tu e-commerce o ERP con SUNAT usando nuestra API REST de facturación rápida y de alta disponibilidad.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-8 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('contacto')}>
                <span>Documentación de la API</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 3: Migración & Consultoría */}
            <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-accent">Consultoría & Migración</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Migramos tus bases de datos actuales de inventario y clientes al nuevo sistema sin suspender tus ventas de caja diarias.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-55 mt-8 flex items-center justify-between text-xs font-bold text-accent cursor-pointer" onClick={() => onNavigate('contacto')}>
                <span>Conversar con un Consultor</span>
                <span>→</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
