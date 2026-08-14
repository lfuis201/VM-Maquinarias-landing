import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import dispositivosImg from '../../../../assets/funcionalidades/dispositivos.jpg';

interface DispositivosViewProps {
  onNavigate: (view: string) => void;
}

export const DispositivosView: React.FC<DispositivosViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Tengo que descargar un programa en mi computadora para usar el sistema?',
      a: 'No. Sistematízate es un software basado en la nube. Puedes acceder al panel de control desde cualquier navegador web (Chrome, Safari, Edge) en tu laptop o computadora de escritorio ingresando con tu usuario y contraseña.',
    },
    {
      q: '¿Hay aplicaciones móviles disponibles para celular?',
      a: 'Sí. Contamos con aplicaciones nativas para Android e iOS que puedes descargar gratis desde la Play Store o App Store. Te permiten facturar, vender, revisar stock e informes financieros en cualquier lugar.',
    },
    {
      q: '¿Qué pasa si mi negocio se queda temporalmente sin internet?',
      a: '¡No te preocupes! El punto de venta cuenta con soporte sin conexión. Puedes seguir agregando productos a la venta y emitiendo comprobantes temporales. Cuando se restablezca la señal, el sistema sincronizará los datos automáticamente con la nube.',
    },
    {
      q: '¿Cuántos dispositivos puedo conectar al mismo tiempo?',
      a: 'Depende de tu plan de suscripción, pero nuestros planes premium te permiten conectar múltiples dispositivos de forma simultánea (caja principal, tablet de inventarios, celular de administración) sin límites.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0a0f24] to-[#121c42] text-white py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-secondary text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Acceso Multiplataforma
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Tu negocio en tus manos, <br />
              <span className="text-primary font-bold">dondequiera que estés</span>
            </h1>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
              Administra tu negocio desde tu celular, tablet o computadora. Consulta reportes, audita cajas y realiza ventas sin limitaciones geográficas.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer text-slate-950 font-bold"
                onClick={() => onNavigate('contacto')}
              >
                Probar en mi Celular
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24] flex items-center justify-center p-6">
              <img
                src={dispositivosImg}
                alt="Multiplataforma"
                className="max-h-[350px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full">
            Accesibilidad
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
            Compatibilidad total sin instalaciones
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Sistematízate funciona en cualquier sistema operativo y hardware moderno con conexión a internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">App Móvil Dedicada</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                App para teléfonos Android e iOS optimizada para consumir pocos datos y emitir boletas de forma ultra rápida.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Acceso Web Completo</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Ingresa al panel de administración desde cualquier navegador web en tu laptop o computadora sin instalar nada.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Sincronización en la Nube</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Registra transacciones en tu local y revisa las ganancias en tiempo real desde tu casa o viaje con total seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Interface Gallery */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-[#0a0f24] text-white rounded-[40px] my-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="relative space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
              Plataforma En Vivo
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Visualiza en cualquier pantalla
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Diseño limpio y adaptativo. Accede al panel de control administrativo desde tu navegador de preferencia.
            </p>
          </div>

          <div className="flex flex-col justify-start max-w-5xl mx-auto py-4">
            {/* Browser Mockup */}
            <div className="w-full flex-grow flex flex-col">
              {/* Browser Header */}
              <div className="bg-slate-800 rounded-t-xl py-2 px-3.5 flex items-center gap-1.5 border border-slate-700/80 border-b-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 block" />
                <div className="h-4.5 bg-slate-900 border border-slate-700/50 rounded-md flex-grow mx-4 text-[9px] text-slate-400 flex items-center px-3.5 select-none truncate">
                  sistematizate.pe/dashboard
                </div>
              </div>
              {/* Browser Viewport */}
              <div className="w-full flex-grow bg-slate-900 border border-slate-700/80 border-t-0 rounded-b-xl overflow-hidden relative min-h-[300px] flex items-center justify-center p-2">
                <img 
                  src={dispositivosImg} 
                  alt="Panel de control administrativo" 
                  className="w-full h-auto object-contain max-h-[450px]" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-100 text-left space-y-12">
        <h2 className="text-3xl font-black text-accent text-center">
          Preguntas Frecuentes sobre Dispositivos
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
          ¿Quieres conectarte a tu negocio desde cualquier lugar?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Prueba Sistematízate en tu smartphone o laptop ahora. Configuración en solo 5 minutos.
        </p>
        <div className="pt-4 flex justify-center">
          <button
            className="inline-flex items-center justify-center font-black rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer bg-accent text-primary hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus:ring-accent px-7 py-3.5 text-lg"
            onClick={() => onNavigate('contacto')}
          >
            Empezar Demo en Celular
          </button>
        </div>
      </section>
    </div>
  );
};
