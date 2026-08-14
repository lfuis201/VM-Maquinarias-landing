import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import cajaImg from '../../../../assets/funcionalidades/caja.jpg';
import app1 from '../../../../assets/appvisuals/app1.png';

interface FlujoCajaViewProps {
  onNavigate: (view: string) => void;
}

export const FlujoCajaView: React.FC<FlujoCajaViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cómo me ayuda el sistema a cuadrar mi caja al final del día?',
      a: 'Sistematízate registra de manera automática cada boleta, factura y pago (efectivo, Yape, Plin, tarjeta). Al finalizar el turno, solo debes realizar el "Cierre de Caja". El sistema comparará el monto esperado con el dinero físico reportado, identificando cualquier descuadre al instante.',
    },
    {
      q: '¿Puedo registrar gastos del negocio como compras o pago de servicios?',
      a: 'Sí. El sistema cuenta con un módulo de "Gastos e Egresos" donde puedes registrar salidas de dinero por compras a proveedores, servicios de luz/agua, alquileres o adelantos de sueldos, restándolos automáticamente del flujo de caja diario.',
    },
    {
      q: '¿Es seguro llevar mi flujo de caja en la nube?',
      a: 'Totalmente. Toda tu información financiera viaja encriptada y se almacena en servidores seguros con copias de seguridad automáticas en tiempo real. Tú decides quién de tus empleados tiene acceso a ver los reportes de caja mediante permisos avanzados de usuario.',
    },
    {
      q: '¿Puedo ver las ventas realizadas por Yape o Plin de forma separada?',
      a: 'Sí. Al registrar una venta, seleccionas el método de pago correspondiente. Los reportes detallados y el flujo de caja desglosan tus ingresos por cada billetera digital, tarjeta o efectivo, facilitando la conciliación bancaria.',
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
              Flujo de Caja en Tiempo Real
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Controla tu flujo de caja <br />
              <span className="text-primary font-bold">sin complicaciones</span>
            </h1>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
              Registra cada venta y gasto al instante. Evita descuadres, supervisa los ingresos por Yape, Plin y tarjetas, y conoce la salud financiera de tu negocio todos los días.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer text-slate-950 font-bold"
                onClick={() => onNavigate('contacto')}
              >
                Probar Gratis Ahora
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24]">
              <img
                src={cajaImg}
                alt="Flujo de Caja"
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
            Finanzas Claras
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
            Toma el control absoluto de tu dinero
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Registrar tus ingresos y egresos nunca fue tan fácil. Visualiza el balance de tu negocio con gráficos simples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Registro de Ventas y Gastos</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Añade egresos diarios de tu caja (compras menores, pagos de servicios, mermas) y contrástalos con tus ingresos automáticos.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Múltiples Métodos de Pago</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Controla cuánto dinero ingresa por efectivo, Yape, Plin y tarjetas de crédito, facilitando tu conciliación a fin de mes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Cierres de Caja Seguros</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Evita robos hormiga y pérdidas. El sistema calcula el saldo teórico de caja para compararlo con el arqueo físico al final del turno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Block */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-accent bg-accent/10 px-3.5 py-1.5 rounded-full">
              Cuadres diarios
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
              Evita descuadres con reportes automatizados
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              No esperes al final del mes para saber si ganaste o perdiste dinero. El sistema procesa cada movimiento financiero de tu negocio al segundo. Conoce tu rentabilidad neta diaria restando tus gastos de operación e insumos a tus ventas cobradas.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Historial de aperturas, retiros parciales de efectivo y cierres de turno</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Reportes de caja exportables a Excel o PDF en un clic</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Notificaciones automáticas en tu celular sobre retiros inusuales</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[32px] overflow-hidden border-4 border-slate-200 bg-white shadow-xl h-[340px] md:h-[400px] flex items-center justify-center p-6">
            <img 
              src={app1} 
              alt="Reportes de Flujo de Caja" 
              className="max-h-full object-contain" 
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-100 text-left space-y-12">
        <h2 className="text-3xl font-black text-accent text-center">
          Preguntas Frecuentes sobre el Flujo de Caja
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
          ¿Quieres llevar tus finanzas al siguiente nivel?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Comienza hoy mismo de forma gratuita y mantén tus cuentas claras y protegidas.
        </p>
        <div className="pt-4 flex justify-center">
          <button
            className="inline-flex items-center justify-center font-black rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer bg-accent text-primary hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus:ring-accent px-7 py-3.5 text-lg"
            onClick={() => onNavigate('contacto')}
          >
            Contactar un Asesor
          </button>
        </div>
      </section>
    </div>
  );
};
