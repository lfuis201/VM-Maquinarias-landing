import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import inventarioImg from '../../../../assets/funcionalidades/inventario.jpg';
import app2 from '../../../../assets/appvisuals/app2.png';

interface InventarioViewProps {
  onNavigate: (view: string) => void;
}

export const InventarioView: React.FC<InventarioViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cómo funciona la alerta de stock mínimo?',
      a: 'Para cada producto, puedes configurar una cantidad mínima recomendada en stock. Cuando las existencias bajen de ese límite, el sistema te mostrará una alerta visual en el panel y te enviará un reporte diario para que realices el pedido a tiempo.',
    },
    {
      q: '¿Es compatible con el método PEPS (FIFO) de inventario?',
      a: 'Sí. El sistema lleva un registro del Kardex detallado para cada artículo, permitiendo controlar las entradas y salidas cronológicamente de forma exacta para asegurar una correcta rotación de tus existencias.',
    },
    {
      q: '¿Puedo organizar mi almacén por categorías o pasillos?',
      a: 'Por supuesto. Puedes crear categorías, subcategorías y etiquetas personalizadas para estructurar tu catálogo. Esto facilita las búsquedas de productos en caja y agiliza la toma física de inventario.',
    },
    {
      q: '¿Se pueden realizar ajustes de stock por mermas o inventario físico?',
      a: 'Sí. Contamos con un módulo de "Ajustes de Stock" donde puedes registrar salidas por roturas, robos, mermas o caducidad, así como ingresar correcciones manuales tras realizar un conteo físico de existencias.',
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
              Gestión de Stock Automatizada
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Controla tu inventario <br />
              <span className="text-primary font-bold">al milímetro</span>
            </h1>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
              Conoce en tiempo real qué productos rotan más, reduce pérdidas por merma, recibe alertas de stock crítico y reabastece tu negocio de forma inteligente.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer text-slate-950 font-bold"
                onClick={() => onNavigate('contacto')}
              >
                Probar Inventario Gratis
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24]">
              <img
                src={inventarioImg}
                alt="Gestión de Inventario"
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
            Eficiencia operativa
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
            Evita quiebres de stock y pérdidas
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Ten la información exacta de tus productos en almacén o vitrina siempre a la mano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Alertas de Stock Bajo</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                El sistema te avisa cuando un artículo está por agotarse, dándote tiempo de coordinar la reposición con tus proveedores.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Kardex de Movimientos</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Historial completo que registra quién, cuándo y por qué modificó el stock de un producto para una auditoría sin errores.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Rotación de Artículos</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Identifica qué productos se venden rápidamente (favoritos) y cuáles llevan meses en el almacén generando costo innecesario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Block */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-slate-50/50 rounded-[40px] my-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-primary-dark bg-primary/10 px-3.5 py-1.5 rounded-full">
              Sincronización total
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
              Sincronización en tiempo real con tus ventas
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Cada vez que emites una boleta de venta, una comanda de restaurante o registras una merma, el stock de tus almacenes se reduce al instante en la nube. Mantén tus tiendas físicas y almacenes centrales alineados en todo momento.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Control de existencias multi-almacén o sucursal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Compatibilidad total con lectores de códigos de barra USB o Bluetooth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Edición masiva de precios y existencias en segundos</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[32px] overflow-hidden border-4 border-slate-200 bg-white shadow-xl h-[340px] md:h-[400px] flex items-center justify-center p-6">
            <img 
              src={app2} 
              alt="Administración de Almacenes" 
              className="max-h-full object-contain" 
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-100 text-left space-y-12">
        <h2 className="text-3xl font-black text-accent text-center">
          Preguntas Frecuentes sobre el Inventario
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
          ¿Listo para automatizar el control de tu stock?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Regístrate hoy mismo y descubre la forma más sencilla de gestionar tus almacenes sin errores.
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
