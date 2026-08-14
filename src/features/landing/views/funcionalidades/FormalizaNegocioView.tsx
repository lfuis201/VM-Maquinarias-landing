import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import formalizaImg from '../../../../assets/funcionalidades/formaliza.jpg';
import app1 from '../../../../assets/appvisuals/app1.png';

interface FormalizaNegocioViewProps {
  onNavigate: (view: string) => void;
}

export const FormalizaNegocioView: React.FC<FormalizaNegocioViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cómo se conecta el sistema con la SUNAT?',
      a: 'Sistematízate es un Proveedor de Servicios Electrónicos (PSE) homologado por SUNAT. El sistema se conecta de forma segura a los servidores del ente tributario para autorizar e informar tus boletas, facturas, notas de crédito y guías de remisión de manera automática en segundos.',
    },
    {
      q: '¿Necesito un certificado digital propio para facturar?',
      a: 'No es estrictamente obligatorio si utilizas nuestra firma delegada. Sin embargo, si deseas facturar con tu propia firma de empresa, nuestro equipo técnico te ayudará a instalar tu certificado digital en tu cuenta de manera totalmente gratuita.',
    },
    {
      q: '¿Puedo personalizar el diseño de mis boletas y facturas?',
      a: 'Sí. Puedes subir el logotipo de tu empresa, cambiar los colores de los comprobantes, añadir redes sociales, números de cuenta bancaria y mensajes personalizados al pie de tus boletas impresas en formato ticket de 80mm/58mm o PDF tamaño A4.',
    },
    {
      q: '¿El sistema genera el Reporte de Ventas mensual para mi contador?',
      a: 'Sí. Sistematízate genera de forma automática el Registro de Ventas en formato Excel/CSV listo con todos los códigos requeridos por la SUNAT, facilitando el trabajo de tu contador para la declaración de impuestos.',
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
              Facturación Homologada SUNAT
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Formaliza tu negocio <br />
              <span className="text-primary font-bold">con total confianza</span>
            </h1>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
              Genera comprobantes electrónicos fácilmente y cumple con todos los requisitos legales de la SUNAT para hacer crecer tu empresa con el respaldo tributario que necesitas.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer text-slate-950 font-bold"
                onClick={() => onNavigate('contacto')}
              >
                Comenzar a Facturar
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24]">
              <img
                src={formalizaImg}
                alt="Formaliza tu Negocio"
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
            Legalidad & Crecimiento
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
            Comprobantes electrónicos oficiales al instante
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Emite tus comprobantes cumpliendo las normativas vigentes del ente tributario sin dolores de cabeza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Boletas y Facturas</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Emisión de boletas, facturas, notas de crédito y notas de débito electrónicas con envío e informe en tiempo real a SUNAT.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Reportes para Contadores</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Exporta tus registros mensuales de ventas y gastos estructurados según las normativas SUNAT, listos para tu declaración mensual.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Validez y Firma Digital</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Todos tus comprobantes cuentan con el formato XML legal firmado digitalmente y código QR para verificación inmediata en SUNAT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom / Mobile View */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-[#0a0f24] text-white rounded-[40px] my-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
              SUNAT 100% Homologado
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Facturación segura y rápida en tu celular
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Emite boletas de venta o facturas electrónicas desde cualquier lugar con tu smartphone. Nuestra app móvil ligera se comunica de manera directa con SUNAT para validar y aprobar tus comprobantes al instante.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-[420px] rounded-[32px] overflow-hidden border-8 border-slate-800 bg-[#0a0f24] shadow-2xl p-2 flex items-center justify-center">
              <img 
                src={app1} 
                alt="Pantalla de emisión de facturas" 
                className="max-h-full object-contain" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-100 text-left space-y-12">
        <h2 className="text-3xl font-black text-accent text-center">
          Preguntas Frecuentes sobre Formalización
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
          ¿Quieres formalizar la facturación de tu negocio sin dolores de cabeza?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Únete a miles de negocios peruanos que ya facturan de manera automática y legal con Sistematízate.
        </p>
        <div className="pt-4 flex justify-center">
          <button
            className="inline-flex items-center justify-center font-black rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer bg-accent text-primary hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus:ring-accent px-7 py-3.5 text-lg"
            onClick={() => onNavigate('contacto')}
          >
            Conversar con un Asesor Tributario
          </button>
        </div>
      </section>
    </div>
  );
};
