import React from 'react';

export const TerminosView: React.FC = () => {
  return (
    <div className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-left space-y-8">
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Legal</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          Términos y Condiciones de Uso
        </h1>
        <p className="text-xs text-slate-500 font-semibold">
          Última actualización: 29 de Mayo de 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6">
        <p>
          Bienvenido a <strong>Sistematízate</strong>. Los siguientes Términos y Condiciones regulan el acceso y uso de la plataforma web y móvil para la gestión de negocios y emisión de comprobantes de pago electrónicos en el territorio de la República del Perú.
        </p>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">1. Aceptación de los Términos</h3>
          <p>
            Al registrar una cuenta en Sistematízate, declaras ser mayor de edad, contar con las facultades legales necesarias para representar a tu negocio o empresa, y aceptas en su totalidad estos Términos y Condiciones. Si no estás de acuerdo con alguna de estas disposiciones, te solicitamos no utilizar nuestros servicios.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">2. Registro de Cuenta y Responsabilidad</h3>
          <p>
            El usuario se compromete a proporcionar información veraz, completa y actualizada durante el registro. Eres el único responsable de salvaguardar la confidencialidad de tus credenciales de acceso (usuario y contraseña) y de todas las actividades realizadas en tu cuenta o subcuentas de colaboradores.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">3. Emisión Electrónica y Normativa SUNAT</h3>
          <p>
            Sistematízate actúa como un sistema facilitador de emisión e integración electrónica con la SUNAT. El usuario es el único responsable de:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Mantener su RUC activo y habido ante la SUNAT.</li>
            <li>Contar con la autorización y Clave SOL correspondientes.</li>
            <li>La veracidad de los datos fiscales, montos de venta, tasas de IGV e información de los clientes suministrada en los comprobantes.</li>
            <li>Verificar que las transacciones y comisiones calculadas en la app correspondan a su realidad comercial.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">4. Pagos, Tarifas y Planes</h3>
          <p>
            El uso de ciertas funciones (como facturación ilimitada, control multi-local o cálculo de comisiones avanzadas) está sujeto al pago de una suscripción conforme a las tarifas publicadas en nuestra sección de Planes. Las tarifas se cobran por adelantado en ciclos mensuales o anuales y no son reembolsables. Nos reservamos el derecho a modificar las tarifas previo aviso de 30 días calendario al usuario.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">5. Limitación de Responsabilidad</h3>
          <p>
            Sistematízate se esfuerza por mantener una disponibilidad continua de la plataforma. Sin embargo, no nos hacemos responsables por fallas, interrupciones o retrasos de los servicios originados por problemas de conectividad de internet del usuario, caídas de los servidores externos de la SUNAT o eventos de fuerza mayor.
          </p>
        </div>
      </div>
    </div>
  );
};
