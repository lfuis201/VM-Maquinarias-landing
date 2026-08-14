import React, { useState } from 'react';

export const CatalogoFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Los equipos cuentan con garantía?',
      a: 'Sí, absolutamente. Todos nuestros equipos de hardware cuentan con 1 año de garantía contra defectos de fábrica, además de soporte técnico calificado para asistirte ante cualquier eventualidad.'
    },
    {
      q: '¿Hacen envíos a todo el Perú?',
      a: 'Sí, realizamos envíos seguros y rápidos a nivel nacional en alianza con empresas de encomienda líderes. El costo de envío varía según la provincia de destino.'
    },
    {
      q: '¿Los equipos ya vienen configurados con el sistema?',
      a: 'Sí, si adquieres un kit o una terminal junto con tu suscripción a Sistematízate, te enviamos el hardware preconfigurado para que solo tengas que enchufarlo y empezar a emitir tus comprobantes.'
    },
    {
      q: '¿Las impresoras térmicas son compatibles con SUNAT?',
      a: 'Sí, nuestras impresoras térmicas de 80mm soportan la impresión de códigos QR y códigos de barra según las normas obligatorias impuestas por SUNAT en el Perú.'
    }
  ];

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-left space-y-12">
      <h2 className="text-3xl font-black text-accent text-center">
        Preguntas Frecuentes sobre Hardware
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-5 px-6 flex justify-between items-center font-bold text-slate-900 text-sm md:text-base hover:bg-slate-50 text-left transition-colors cursor-pointer outline-none"
              >
                <span>{faq.q}</span>
                <span className={`text-xl transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`}>
                  ▼
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[300px] border-t border-slate-100 p-6' : 'max-h-0'
                }`}
              >
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
