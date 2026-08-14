import React from 'react';
import { useLandingPoliticaQuery } from '../hooks/useLandingPolitica';

export const PoliticaView: React.FC = () => {
  const { data: dbConfig } = useLandingPoliticaQuery();

  const defaultConfig = {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: 30 de Mayo de 2026',
    introText: 'En <strong>Sistematízate</strong>, nos tomamos muy en serio la seguridad y confidencialidad de los datos de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos, protegemos y permitimos gestionar sus datos personales y comerciales al utilizar nuestro sitio web y nuestra aplicación móvil para Android <strong>Sistematízate Facturación</strong>, de conformidad con la <strong>Ley N° 29733 (Ley de Protección de Datos Personales de Perú)</strong>, su Reglamento, y las directrices de seguridad de la <strong>Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT)</strong> y <strong>Google Play Developer Policies</strong>.',
    sections: [
      {
        title: '1. Identidad del Responsable',
        content: 'El responsable del tratamiento de los datos es la marca comercial peruana <strong>Sistematízate</strong>. Para cualquier consulta legal o relacionada con la privacidad de sus datos, puede ponerse en contacto con nuestro Oficial de Privacidad a través del correo electrónico: <strong>sistematizateperu@gmail.com</strong>.'
      },
      {
        title: '2. Información que Recopilamos',
        content: 'Recopilamos información cuando se registra en nuestra plataforma, inicia sesión en la aplicación móvil o utiliza nuestros servicios. Esto incluye:<br/><br/><ul><li><strong>Información del Negocio:</strong> Número de RUC (Registro Único de Contribuyentes), Razón Social, Dirección Fiscal y Comercial, Usuario SOL y clave SOL (utilizados única y exclusivamente para conectarse y autenticarse ante la SUNAT para la emisión de comprobantes electrónicos).</li><li><strong>Datos de Contacto del Usuario:</strong> Nombre completo, correo electrónico, número de teléfono móvil o celular.</li><li><strong>Información Transaccional y Fiscal:</strong> Datos de sus ventas, productos, inventario, precios, facturas, boletas, notas de crédito, guías de remisión y datos de identificación de sus clientes finales (DNI, RUC o nombres).</li><li><strong>Datos del Dispositivo y Uso de la App (Android):</strong> Dirección IP, identificador único del dispositivo (Android ID), versión de sistema operativo, modelo de hardware y registros de errores/fallas para optimizar el rendimiento técnico de la app.</li></ul>'
      },
      {
        title: '3. Permisos Requeridos en la Aplicación de Android',
        content: 'Nuestra aplicación móvil para Android requiere permisos específicos en el dispositivo para brindar un correcto servicio. Estos permisos solo se solicitan y activan cuando el usuario realiza las siguientes acciones:<br/><br/><ul><li><strong>Acceso a la Cámara (CAMERA):</strong> Utilizado únicamente para permitir el escaneo de códigos de barra o códigos QR de productos y para capturar fotos de productos para el inventario de la app.</li><li><strong>Acceso al Almacenamiento (WRITE_EXTERNAL_STORAGE / READ_EXTERNAL_STORAGE):</strong> Utilizado para guardar y exportar las boletas, facturas, y reportes de ventas en formato PDF o Excel en la memoria del dispositivo, o para cargar el logotipo de su empresa desde la galería.</li><li><strong>Acceso a Internet (INTERNET):</strong> Necesario para enviar y validar la información de emisión de comprobantes en tiempo real con los servidores de SUNAT.</li><li><strong>Acceso a Bluetooth (BLUETOOTH / BLUETOOTH_ADMIN / BLUETOOTH_CONNECT):</strong> Requerido para enlazar y enviar comandos de impresión de tickets a impresoras térmicas portátiles conectadas mediante Bluetooth.</li></ul><br/><span class="text-xs text-slate-500 italic">Nota: Sistematízate no recopila información confidencial que no sea relevante para el servicio y en ningún caso recopila ni comparte información de geolocalización en tiempo real, contactos personales, ni mensajes del dispositivo.</span>'
      },
      {
        title: '4. Finalidad del Tratamiento de Datos',
        content: 'Los datos personales y comerciales recopilados se procesan estrictamente para las siguientes finalidades:<br/><br/><ul><li>Permitir la emisión y envío seguro de comprobantes electrónicos a SUNAT en cumplimiento de las directrices fiscales peruanas.</li><li>Procesar e imprimir recibos y realizar el control de inventario de su negocio en tiempo real.</li><li>Brindar soporte técnico ante problemas de sincronización, emisión de comprobantes o errores en la aplicación.</li><li>Garantizar la seguridad de la cuenta y detectar accesos no autorizados o actividades potencialmente fraudulentas.</li></ul>'
      },
      {
        title: '5. Uso Compartido de la Información',
        content: 'No vendemos, alquilamos ni comercializamos datos personales de nuestros usuarios con terceros. La información del usuario y del negocio se comparte de manera obligatoria únicamente con la <strong>Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT)</strong> y con Operadores de Servicios Electrónicos (OSE) autorizados en Perú para la respectiva homologación y validez de sus comprobantes electrónicos.'
      },
      {
        title: '6. Seguridad de la Información y Encriptación',
        content: 'Toda la información transmitida entre la aplicación móvil, el sitio web y nuestros servidores está protegida mediante encriptación SSL/TLS (HTTPS). Las contraseñas, credenciales de inicio de sesión y la clave SOL se cifran con algoritmos criptográficos robustos antes de ser almacenados en bases de datos protegidas por cortafuegos industriales y acceso restringido.'
      },
      {
        title: '7. Retención y Conservación de Datos',
        content: 'De acuerdo con el Código Tributario peruano y las directrices de la SUNAT, los comprobantes de pago electrónicos y la información comercial asociada de las ventas emitidas deben mantenerse archivados por un periodo mínimo obligatorio de <strong>cinco (5) años</strong>. Una vez transcurrido este plazo regulatorio y en ausencia de obligaciones contractuales, los datos podrán ser eliminados de forma definitiva a petición del usuario.'
      },
      {
        title: '8. Solicitud de Eliminación de Cuenta y Datos (Requisito Google Play)',
        content: 'De acuerdo con las políticas de datos de Google Play, todos nuestros usuarios tienen derecho a solicitar la eliminación completa de su cuenta y sus datos personales de forma gratuita.<br/><br/>Para iniciar este proceso, puede enviar un correo electrónico con el asunto <strong>"Solicitud de Eliminación de Cuenta y Datos"</strong> a: <strong>sistematizateperu@gmail.com</strong>, indicando su número de RUC y el correo con el que se registró.<br/><br/>Tenga en cuenta que, debido a regulaciones fiscales peruanas (SUNAT), los comprobantes electrónicos ya emitidos y validados legalmente no pueden ser borrados de los registros tributarios del Estado, pero su cuenta de acceso móvil y datos de mercadeo serán suspendidos e inactivados de inmediato.'
      },
      {
        title: '9. Derechos ARCO',
        content: 'Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO) conforme a la Ley N° 29733 enviando su requerimiento formal por correo electrónico a: <strong>sistematizateperu@gmail.com</strong>.'
      },
      {
        title: '10. Modificaciones a la Política de Privacidad',
        content: 'Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a nuevas normativas de SUNAT o actualizaciones de Google Play. Le notificaremos cualquier cambio sustancial mediante alertas en la aplicación o correo electrónico.'
      }
    ]
  };

  const config = dbConfig || defaultConfig;

  return (
    <div className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-left space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-secondary text-xs font-bold tracking-wide shadow-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Legal y Cumplimiento
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          {config.title}
        </h1>
        <p className="text-xs text-slate-500 font-semibold">
          {config.lastUpdated}
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6">
        <div dangerouslySetInnerHTML={{ __html: config.introText || '' }} />

        {config.sections && config.sections.map((section, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: section.content || '' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

