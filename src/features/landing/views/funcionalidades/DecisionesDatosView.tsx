import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import decisionesImg from '../../../../assets/funcionalidades/decisiones.jpg';
import app3 from '../../../../assets/appvisuals/app3.png';

interface DecisionesDatosViewProps {
  onNavigate: (view: string) => void;
}

export const DecisionesDatosView: React.FC<DecisionesDatosViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Qué tipo de reportes estadísticos genera el sistema?',
      a: 'Sistematízate genera reportes automáticos de: ventas por día/mes/año, margen de utilidad neto, productos más vendidos, ranking de mozos/cajeros por volumen de venta, historial de mermas e inventarios críticos.',
    },
    {
      q: '¿Puedo comparar el rendimiento de este mes con el del año pasado?',
      a: 'Sí. El panel interactivo cuenta con filtros avanzados de fecha que te permiten hacer comparaciones gráficas interanuales o mensuales para analizar si tu negocio está creciendo y a qué ritmo.',
    },
    {
      q: '¿Los reportes se pueden descargar para enviárselos a mi contador?',
      a: 'Claro que sí. Todos los reportes estadísticos y las listas de comprobantes (ventas y gastos) se pueden exportar a formato Excel (CSV) o PDF con un solo clic, listos para tu declaración contable.',
    },
    {
      q: '¿El sistema calcula automáticamente el IGV y los impuestos?',
      a: 'Sí. Cada venta procesada desglosa automáticamente el IGV (18%) o ISC si corresponde, facilitando los cálculos de impuestos de forma transparente y legal.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#10094d] to-[#0a0f24] text-white py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-secondary text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Estadísticas & Business Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Decisiones inteligentes <br />
              <span className="text-primary font-bold">con datos reales</span>
            </h1>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
              Olvídate de las suposiciones. Visualiza el crecimiento de tu negocio a través de reportes y gráficas automáticas e identifica las oportunidades de ganancia reales.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer text-slate-950 font-bold"
                onClick={() => onNavigate('contacto')}
              >
                Probar Reportes Gratis
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24]">
              <img
                src={decisionesImg}
                alt="Decisiones Inteligentes"
                className="w-full h-auto object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full">
            Analítica de Negocio
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
            Descubre los números de tu crecimiento
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Monitorea el progreso de tus ingresos, márgenes y rendimiento del personal de manera visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Gráficos Interactivos</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Visualiza tendencias de ventas semanales o mensuales con curvas de crecimiento claras y fáciles de interpretar.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Margen Neto Real</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Calcula tus utilidades reales restando automáticamente el costo de tu mercadería y gastos operativos a las ventas brutas.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 113.536 0V21h2v-5.464" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Desempeño de Personal</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Conoce quién es tu cajero o mozo más eficiente, analizando los montos y cantidades de órdenes procesadas por cada usuario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Block */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-slate-50/50 rounded-[40px] my-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="rounded-[32px] overflow-hidden border-4 border-slate-200 bg-white shadow-xl h-[340px] md:h-[400px] flex items-center justify-center p-6 lg:order-last">
            <img 
              src={app3} 
              alt="Administración Móvil de Reportes" 
              className="max-h-full object-contain" 
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-primary-dark bg-primary/10 px-3.5 py-1.5 rounded-full">
              Visibilidad de negocio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
              Toma de decisiones en base a información real
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Consigue el control total del rendimiento de tu negocio. A través de tableros móviles y de escritorio, analiza qué días de la semana tienes mayor concurrencia y adapta tus compras, promociones y personal de manera óptima.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Análisis de flujo de clientes y ventas pico</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Control de mermas e inventarios críticos integrado</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Historial de movimientos contables exportable</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-100 text-left space-y-12">
        <h2 className="text-3xl font-black text-accent text-center">
          Preguntas Frecuentes sobre Reportes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 px-6 flex justify-between items-center font-bold text-slate-900 text-sm md:text-base hover:bg-slate-50 text-left transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className={`text-xl transform transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-primary-dark' : 'text-slate-400'}`}>
                  ▼
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFaq === idx ? 'max-h-[300px] border-t border-slate-100 p-6' : 'max-h-0'
                }`}
              >
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto space-y-6 border-t border-slate-100">
        <h2 className="text-3xl sm:text-4xl font-black text-accent leading-tight">
          ¿Quieres ver los números reales del crecimiento de tu negocio?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Digitaliza tus ventas hoy y accede a tus tableros financieros al instante.
        </p>
        <div className="pt-4 flex justify-center">
          <button
            className="inline-flex items-center justify-center font-black rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer bg-accent text-primary hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus:ring-accent px-7 py-3.5 text-lg"
            onClick={() => onNavigate('contacto')}
          >
            Conversar con un Experto
          </button>
        </div>
      </section>
    </div>
  );
};
