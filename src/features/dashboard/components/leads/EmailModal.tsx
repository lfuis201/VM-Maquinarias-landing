import React, { useState, useEffect } from 'react';
import {
  Button,
  toast,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@heroui/react';
import { useSendMailMutation } from '../../../landing/hooks/useMail';

interface Lead {
  id: string;
  fullName: string;
  companyName?: string;
  ruc?: string;
  phoneNumber?: string;
  phone?: string;
  email: string;
  message?: string;
  status: string;
}

interface EmailModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
}

const templates = {
  welcome: {
    subject: '¡Gracias por contactar a Sistematízate!',
    body: 'Hola {{name}},\n\nMuchas gracias por contactar a Sistematízate. Hemos recibido tus datos y un asesor se comunicará contigo a la brevedad para brindarte toda la información y responder a tus consultas.\n\nSaludos cordiales,\nEl equipo de Sistematízate.',
  },
  plans: {
    subject: 'Propuesta de Planes Comerciales - Sistematízate',
    body: 'Estimado(a) {{name}},\n\nEsperamos que te encuentres muy bien. Te adjuntamos la información detallada de nuestros planes de facturación electrónica y gestión de ventas.\n\nContamos con opciones diseñadas a la medida de tu negocio. Si deseas agendar una llamada de asesoría gratuita, háznoslo saber respondiendo a este mensaje.\n\nAtentamente,\nSistematízate.',
  },
  catalog: {
    subject: 'Catálogo de Equipos y Terminales POS - Sistematízate',
    body: 'Estimado(a) {{name}},\n\nTe hacemos llegar la información de nuestro catálogo digital con todos los equipos de facturación, terminales móviles e impresoras térmicas disponibles.\n\nPuedes consultar precios y especificaciones actualizados en el siguiente enlace:\nhttps://sistematizate.pe/catalogo\n\nSaludos cordiales,\nÁrea de Logística y Equipos.',
  },
  custom: {
    subject: '',
    body: '',
  },
};

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, lead, onClose }) => {
  const [emailTemplate, setEmailTemplate] = useState<'welcome' | 'plans' | 'catalog' | 'custom'>('welcome');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const sendMailMutation = useSendMailMutation();

  useEffect(() => {
    if (lead) {
      if (emailTemplate === 'custom') {
        // Keep current content
      } else {
        const selected = templates[emailTemplate];
        setSubject(selected.subject);
        setEmailBody(selected.body.replace('{{name}}', lead.fullName));
      }
    }
  }, [lead, emailTemplate]);

  if (!lead) return null;

  const handleSendMailto = () => {
    const url = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(url, '_self');
    onClose();
  };

  const handleSendServer = async () => {
    setIsSendingEmail(true);
    try {
      const result = await sendMailMutation.mutateAsync({
        to: lead.email,
        subject: subject,
        body: emailBody,
      });

      if (result.mock) {
        toast.success(`Simulación: ${result.message}`);
      } else {
        toast.success(`¡Correo enviado con éxito a ${lead.email}!`);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      const errMsg = err?.response?.data?.message || err?.message || 'Error al enviar correo';
      const detailMsg = err?.response?.data?.error || '';
      toast.danger(`Error: ${errMsg}. ${detailMsg}`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="bg-slate-900/60 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <ModalContainer>
        <ModalDialog className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col text-left animate-scale-up">
          <ModalHeader className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-1 relative">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar Correo Electrónico
            </h3>
            <p className="text-xs text-slate-500">
              Redacta un mensaje de correo electrónico para {lead.fullName}.
            </p>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors border-none outline-none"
              type="button"
            >
              ✕
            </button>
          </ModalHeader>

          <ModalBody className="p-6 space-y-4 text-slate-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Destinatario</label>
                <input
                  type="text"
                  readOnly
                  value={lead.fullName}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-600"
                />
              </div>
              <div className="space-y-1.5 col-span-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Correo</label>
                <input
                  type="text"
                  readOnly
                  value={lead.email}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Plantilla</label>
              <select
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-indigo-600 transition-all"
              >
                <option value="welcome">Agradecimiento y Bienvenida</option>
                <option value="plans">Propuesta de Planes Sistematízate</option>
                <option value="catalog">Información de Catálogo y Equipos</option>
                <option value="custom">Mensaje Personalizado</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Asunto</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => {
                  setEmailTemplate('custom');
                  setSubject(e.target.value);
                }}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                placeholder="Asunto del correo..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cuerpo del Correo</label>
              <textarea
                rows={5}
                value={emailBody}
                onChange={(e) => {
                  setEmailTemplate('custom');
                  setEmailBody(e.target.value);
                }}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                placeholder="Escribe el cuerpo del correo..."
              />
            </div>
          </ModalBody>

          <ModalFooter className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-between gap-2.5">
            <Button
              size="sm"
              type="button"
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer border-none"
            >
              Cancelar
            </Button>

            <div className="flex gap-2">
              <Button
                size="sm"
                type="button"
                onClick={handleSendMailto}
                className="bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Cliente Local
              </Button>

              <Button
                size="sm"
                type="button"
                disabled={isSendingEmail}
                onClick={handleSendServer}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl h-10 cursor-pointer border-none flex items-center justify-center gap-1.5"
              >
                {isSendingEmail ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar por Correo'
                )}
              </Button>
            </div>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </ModalBackdrop>
  );
};
