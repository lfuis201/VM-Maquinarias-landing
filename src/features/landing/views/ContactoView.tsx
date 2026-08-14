import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@heroui/react';
import { Button } from '../../../shared/components/Button';
import { leadSchema, type LeadFormData } from '../schemas/leadSchema';
import { useCreateLeadMutation } from '../hooks/useLeads';

export const ContactoView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const createLeadMutation = useCreateLeadMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      businessType: 'servicios',
      message: '',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      companyName: 'VM Maquinarias Contacto',
      message: data.message,
    };

    createLeadMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('¡Presupuesto solicitado exitosamente!');
        setSubmitted(true);
        reset();
      },
      onError: (err: any) => {
        console.error('Error submitting lead:', err);
        const errMsg = err?.response?.data?.message || err?.message || 'Error de red al enviar la solicitud.';
        const formattedMsg = Array.isArray(errMsg) ? errMsg.join(', ') : errMsg;
        toast.danger(`No se pudo enviar la solicitud: ${formattedMsg}`);
      },
    });
  };

  return (
    <div className="py-16 md:py-24 px-6 max-w-7xl mx-auto space-y-16 text-left">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-primary-dark bg-primary/20 px-3.5 py-1.5 rounded-full inline-block">
          Contacto VM Maquinarias
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Recibe un presupuesto personalizado
        </h1>
        <p className="text-slate-600 text-base md:text-lg">
          Para todo tipo de preguntas, comentarios e inquietudes sobre venta, alquiler o mantenimiento de montacargas y apiladores, contáctanos inmediatamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary-dark mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-slate-900">¡Solicitud Enviada con Éxito!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Gracias por contactar a VM Maquinarias. Un asesor de nuestro equipo técnico se comunicará contigo a la brevedad.
              </p>
              <Button variant="outline" className="cursor-pointer border-slate-300 text-slate-700" onClick={() => setSubmitted(false)}>
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Déjanos tu mensaje</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nombre Completo</label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="Ej. Juan Pérez"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] font-bold text-red-500 mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="Ej. 902 337 601"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-bold text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Correo Electrónico</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="comercial@empresa.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-bold text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tipo de Requerimiento</label>
                  <select
                    {...register('businessType')}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.businessType ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary'
                    }`}
                  >
                    <option value="venta">Venta de Maquinaria</option>
                    <option value="alquiler">Alquiler de Montacargas/Apilador</option>
                    <option value="mantenimiento">Mantenimiento Preventivo/Correctivo</option>
                    <option value="repuestos">Repuestos & Baterías Litio-ION</option>
                    <option value="otros">Otros Servicios</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">¿En qué maquinaria o servicio estás interesado?</label>
                <textarea
                  rows={4}
                  {...register('message')}
                  placeholder="Detalla tu requerimiento (capacidad de carga, altura, tipo de combustible o batería)..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.message ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-primary'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] font-bold text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={createLeadMutation.isPending}
                className="w-full py-4 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl text-center text-sm transition-all duration-200 cursor-pointer border-0 active:scale-95 shadow-md shadow-secondary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createLeadMutation.isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Enviando solicitud...
                  </>
                ) : (
                  'Enviar Solicitud de Presupuesto'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact info side cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white shadow-xl space-y-6">
            <h3 className="text-2xl font-black text-white">Contacto Directo</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Llámanos a nuestra central o por WhatsApp para una atención rápida con nuestros especialistas en maquinarias.
            </p>

            <a
              href="https://wa.me/51997757102?text=Hola,%20quisiera%20recibir%20un%20presupuesto%20de%20VM%20Maquinarias"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-slate-950 px-6 py-3.5 rounded-2xl font-bold shadow-md hover:bg-primary-light active:scale-95 transition-all text-sm w-full justify-center"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.11 1.002 11.99 1.002c-5.436 0-9.86 4.37-9.864 9.798-.002 1.76.478 3.48 1.395 5.02l-.95 3.473 3.576-.94z" />
              </svg>
              Chatear por WhatsApp (+51 997 757 102)
            </a>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
              <div className="space-y-2.5">
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Teléfonos de atención</p>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>C: +51 997 757 102</span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>C: +51 940 065 135</span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>T: 01 6365-941</span>
                </div>
                <div className="flex items-center gap-2 text-primary-light font-bold text-sm pt-1">
                  <svg className="w-4 h-4 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Línea Directa: 902 337 601</span>
                </div>
              </div>

              <div className="pt-3 space-y-2 border-t border-slate-800 text-slate-300 text-xs">
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Correos Electrónicos</p>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>comercial@vmmaquinarias.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>logistica@vmmaquinarias.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>v.m.maquinarias@hotmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-base">Oficina Principal</h4>
            <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
              <p>Jirón Márquez de la Bula 314</p>
              <p>Urbanización Huertos de Villa</p>
              <p className="font-bold text-slate-800">Chorrillos, Lima - Perú</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
