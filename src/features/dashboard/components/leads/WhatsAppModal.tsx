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
import { WhatsappService } from '../../../landing/services/whatsappService';

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

interface WhatsAppModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
}

const templates = {
  welcome: 'Hola {{name}}, gracias por contactar a Sistematízate. ¿En qué podemos ayudarte hoy a digitalizar tu negocio?',
  plans: 'Hola {{name}}, te compartimos la información de nuestros planes de Sistematízate. Contamos con planes Básico, Pro y Premium para tu negocio. ¿Te gustaría agendar una demostración?',
  catalog: 'Estimado(a) {{name}}, te hacemos llegar nuestro catálogo de equipos de facturación y puntos de venta. Quedamos atentos a cualquier consulta comercial.',
  custom: '',
};

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, lead, onClose }) => {
  const [waTemplate, setWaTemplate] = useState<'welcome' | 'plans' | 'catalog' | 'custom'>('welcome');
  const [waMessage, setWaMessage] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isSendingWa, setIsSendingWa] = useState(false);

  useEffect(() => {
    if (lead) {
      if (waTemplate === 'custom') {
        // Keep current message
      } else {
        const text = templates[waTemplate].replace('{{name}}', lead.fullName);
        setWaMessage(text);
      }
    }
  }, [lead, waTemplate]);

  if (!lead) return null;

  const handleSendWaWeb = () => {
    const phone = lead.phoneNumber || lead.phone;
    if (!phone) {
      toast.danger('Este lead no cuenta con número telefónico registrado.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('51') ? cleanPhone : `51${cleanPhone}`;
    const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(waMessage)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleSendWasapisApi = async () => {
    const phone = lead.phoneNumber || lead.phone;
    if (!phone) {
      toast.danger('Este lead no cuenta con número telefónico registrado.');
      return;
    }

    setIsSendingWa(true);
    try {
      await WhatsappService.sendMessage({
        to: phone,
        message: waMessage,
        fileUrl: fileUrl.trim() || undefined,
      });
      toast.success(`¡Mensaje enviado exitosamente vía Wasapis API a ${lead.fullName}!`);
      onClose();
    } catch (err: any) {
      console.error(err);
      const errMsg = err?.response?.data?.message || err?.message || 'Error al enviar mensaje por Wasapis';
      const detailMsg = err?.response?.data?.error?.message || '';
      toast.danger(`Error: ${errMsg}. ${detailMsg}`);
    } finally {
      setIsSendingWa(false);
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
              <svg className="w-5 h-5 text-emerald-600 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm5.824-3.514c1.657.983 3.27 1.497 4.905 1.498 5.482 0 9.943-4.463 9.947-9.95.002-2.657-1.03-5.155-2.905-7.033A9.877 9.877 0 0 0 12.008 2.07c-5.467 0-9.927 4.462-9.931 9.949-.001 1.765.474 3.488 1.376 5.019L2.52 21.43l4.361-1.144zM16.985 14c-.267-.134-1.585-.783-1.83-.873-.245-.089-.422-.134-.6.134-.178.267-.689.873-.845 1.049-.155.178-.312.201-.58.067-.267-.134-1.129-.416-2.15-1.328-.795-.71-1.332-1.587-1.488-1.854-.156-.267-.016-.411.118-.544.121-.119.267-.312.4-.467.134-.156.178-.267.267-.445.089-.178.045-.334-.022-.467-.067-.133-.6-1.445-.823-1.98-.217-.52-.455-.45-.6-.458l-.512-.008c-.178 0-.467.067-.712.334-.244.267-.933.912-.933 2.224s.956 2.58 1.089 2.758c.133.178 1.881 2.872 4.557 4.025.637.275 1.134.438 1.52.56.64.204 1.222.175 1.682.107.513-.076 1.585-.648 1.808-1.272.222-.624.222-1.157.155-1.272-.067-.119-.245-.201-.512-.334z"/>
              </svg>
              Enviar Mensaje WhatsApp (Wasapis)
            </h3>
            <p className="text-xs text-slate-500">
              Usa la API de Wasapis para enviar notificaciones de WhatsApp.
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
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Teléfono</label>
                <input
                  type="text"
                  readOnly
                  value={lead.phoneNumber || lead.phone || 'Sin número'}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Plantilla</label>
              <select
                value={waTemplate}
                onChange={(e) => setWaTemplate(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-emerald-600 transition-all"
              >
                <option value="welcome">Bienvenida y Primer Contacto</option>
                <option value="plans">Información de Planes Sistematízate</option>
                <option value="catalog">Información de Catálogo y Equipos</option>
                <option value="custom">Mensaje Personalizado</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL del Archivo Adjunto (Opcional)</label>
              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                placeholder="https://tuservidor.com/pdf/documento.pdf"
              />
              <span className="text-[10px] text-slate-400 block leading-tight">
                Debe ser un archivo público accesible por Internet para ser enviado por Wasapis (ej. PDF o Imagen).
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cuerpo del Mensaje</label>
              <textarea
                rows={4}
                value={waMessage}
                onChange={(e) => {
                  setWaTemplate('custom');
                  setWaMessage(e.target.value);
                }}
                className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                placeholder="Escribe tu mensaje aquí..."
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
                onClick={handleSendWaWeb}
                className="bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer flex items-center justify-center gap-1.5"
              >
                WhatsApp Web
              </Button>

              <Button
                size="sm"
                type="button"
                disabled={isSendingWa}
                onClick={handleSendWasapisApi}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl h-10 cursor-pointer border-none flex items-center justify-center gap-1.5"
              >
                {isSendingWa ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando API...
                  </span>
                ) : (
                  'Enviar Wasapis API'
                )}
              </Button>
            </div>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </ModalBackdrop>
  );
};
