import React, { useState } from 'react';
import { Button } from '../../../../shared/components/Button';
import contactosImg from '../../../../assets/funcionalidades/contactos.png';
import appImg from '../../../../assets/appvisuals/app.png';

interface ContactosEmpleadosViewProps {
  onNavigate: (view: string) => void;
}

export const ContactosEmpleadosView: React.FC<ContactosEmpleadosViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Puedo registrar a mis clientes con su número de DNI o RUC directamente?',
      a: 'Sí. El sistema cuenta con consulta integrada. Al ingresar un número de DNI o RUC, jala automáticamente el nombre completo o razón social del cliente desde las fuentes oficiales, agilizando el registro y evitando errores tipográficos.',
    },
    {
      q: '¿Cómo puedo controlar las ventas al crédito o pagos pendientes?',
      a: 'Puedes activar un límite de crédito para clientes de confianza. El sistema te permite registrar ventas con método de pago "Al Crédito" y llevará un estado de cuenta detallado con las fechas de pago y abonos pendientes.',
    },
    {
      q: '¿Puedo bloquear funciones específicas para mis cajeros o mozos?',
      a: 'Sí, totalmente. El sistema permite definir roles y permisos. Puedes bloquear a tus cajeros para que no puedan anular boletas, aplicar descuentos discrecionales o modificar stocks sin la contraseña del administrador.',
    },
    {
      q: '¿Se pueden registrar las compras directamente vinculadas a un proveedor?',
      a: 'Sí. Cada vez que ingresas mercadería al almacén, seleccionas el proveedor correspondiente. Esto te ayuda a llevar un registro exacto de las cuentas por pagar a proveedores y a evaluar quién te ofrece mejores costos.',
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
              Gestión Integral de Contactos & Personal
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Organiza clientes, <br />
              <span className="text-primary font-bold">proveedores y tu personal</span>
            </h1>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
              Fideliza a tus clientes, controla las cuentas por pagar a proveedores y asigna roles y permisos avanzados a tus colaboradores de forma totalmente segura.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer text-slate-950 font-bold"
                onClick={() => onNavigate('contacto')}
              >
                Probar CRM Gratis
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24]">
              <img
                src={contactosImg}
                alt="Gestión de Contactos"
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
            Colaboración Segura
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
            Controla los accesos y las relaciones comerciales
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Registra todos los actores de tu negocio en una única base de datos segura y de fácil acceso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Fidelización de Clientes</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Registra datos de contacto, cumpleaños y estados de cuenta al crédito para ofrecer un trato personalizado y seguro.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V10a2 2 0 00-2-2h-6M21 12H13" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Proveedores & Compras</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Controla los costos de compra históricos y lleva un registro estricto de las cuentas y abonos pendientes a tus proveedores.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-8a2 2 0 012-2m-2 4a2 2 0 012 2m-2 4a2 2 0 012 2m-2 4a2 2 0 012 2m-8-4a6 6 0 1112 0v1" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-accent">Permisos de Empleados</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Define contraseñas independientes y roles claros para cajeros, administradores y personal de almacén para auditar operaciones.
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
              Control total de roles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Permisos a nivel de empleado y auditoría
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              No dejes que tu negocio funcione a ciegas. Con Sistematízate, puedes delegar con total tranquilidad. Asigna a cada uno de tus colaboradores un perfil personalizado que limite sus accesos a reportes o modificaciones críticas de almacén.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-[420px] rounded-[32px] overflow-hidden border-8 border-slate-800 bg-[#0a0f24] shadow-2xl p-2 flex items-center justify-center">
              <img 
                src={appImg} 
                alt="Pantalla de gestión de personal" 
                className="max-h-full object-contain" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-100 text-left space-y-12">
        <h2 className="text-3xl font-black text-accent text-center">
          Preguntas Frecuentes sobre Contactos y Roles
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
          ¿Listo para organizar tus contactos de forma eficiente?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Prueba Sistematízate y controla a tu personal y clientes de forma totalmente integrada y profesional.
        </p>
        <div className="pt-4 flex justify-center">
          <button
            className="inline-flex items-center justify-center font-black rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer bg-accent text-primary hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus:ring-accent px-7 py-3.5 text-lg"
            onClick={() => onNavigate('contacto')}
          >
            Comenzar Ahora Gratis
          </button>
        </div>
      </section>
    </div>
  );
};
