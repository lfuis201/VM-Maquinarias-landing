import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@heroui/react';
import { Button } from '../../../shared/components/Button';
import { claimSchema, type ClaimFormData } from '../schemas/claimSchema';
import { useCreateClaimMutation } from '../hooks/useClaims';

export const ReclamacionesView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [claimNumber, setClaimNumber] = useState('');
  const createClaimMutation = useCreateClaimMutation();

  const currentDate = new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      fullName: '',
      docType: 'DNI',
      docNumber: '',
      phone: '',
      email: '',
      address: '',
      isMinor: false,
      guardianName: '',
      guardianDocType: 'DNI',
      guardianDocNumber: '',
      goodType: 'Servicio',
      claimedAmount: '',
      description: '',
      claimType: 'Reclamo',
      details: '',
      request: '',
      consent: false,
    },
  });

  const formData = watch();
  const isMinor = watch('isMinor');

  const onSubmit = async (data: ClaimFormData) => {
    // Exclude consent field to prevent NestJS forbidNonWhitelisted 400 Bad Request error
    const { consent, ...submitData } = data;
    
    createClaimMutation.mutate(submitData, {
      onSuccess: (response: any) => {
        if (response && response.data) {
          setClaimNumber(response.data.claimNumber);
        } else {
          const year = new Date().getFullYear();
          const randomNum = String(Math.floor(1000 + Math.random() * 9000));
          const prefix = data.claimType === 'Reclamo' ? 'REC' : 'QUE';
          setClaimNumber(`${prefix}-${year}-${randomNum}`);
        }
        toast.success('¡Hoja de reclamación registrada exitosamente!');
        setSubmitted(true);
      },
      onError: (err: any) => {
        console.error('Error registering claim:', err);
        const errMsg = err?.response?.data?.message || err?.message || 'Ocurrió un error al registrar su reclamación en el servidor. Por favor, intente de nuevo.';
        const formattedMsg = Array.isArray(errMsg) ? errMsg.join(', ') : errMsg;
        toast.danger(formattedMsg);
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 text-left print:py-4">
      {/* Header and INDECOPI Badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 pb-8 print:pb-4 print:border-slate-300">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold print:hidden">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Libro de Reclamaciones Virtual
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-accent tracking-tight">
            Libro de Reclamaciones
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl print:text-xs">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571), ponemos a su disposición nuestro Libro de Reclamaciones Virtual.
          </p>
        </div>

        {/* Claim Info Badge */}
        <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl w-full md:w-auto shadow-sm flex flex-col items-center md:items-end justify-center min-w-[240px] print:bg-white print:text-slate-900 print:border-slate-300 print:p-3">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold print:text-slate-500">Hoja de Reclamación</span>
          <span className="text-xl font-black text-primary print:text-slate-900">
            {submitted ? claimNumber : 'PENDIENTE'}
          </span>
          <div className="mt-2 text-xs text-slate-400 print:text-slate-600">
            <span>Fecha de Registro: <strong>{currentDate}</strong></span>
          </div>
        </div>
      </div>

      {submitted ? (
        /* Success Screen */
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100/50 space-y-8 text-center print:border-0 print:shadow-none print:p-0 animate-fade-in">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary-dark mx-auto print:hidden">
            <svg className="w-10 h-10 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-black text-accent print:text-2xl">¡Reclamación Registrada Exitosamente!</h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto print:text-xs">
              Se ha enviado una copia en formato digital (PDF) con el cargo de recepción a su correo electrónico: <strong className="text-accent">{formData.email}</strong>.
            </p>
          </div>

          {/* Printable Ticket Receipt */}
          <div className="border border-slate-200 rounded-2xl bg-slate-50 p-6 text-left space-y-4 max-w-xl mx-auto text-xs sm:text-sm print:bg-white print:border-slate-300 print:p-4">
            <h3 className="font-extrabold text-accent text-center border-b border-slate-200 pb-2 text-sm uppercase">Detalle del Registro</h3>
            <div className="grid grid-cols-2 gap-y-2">
              <span className="text-slate-500 font-medium">Nro. Registro:</span>
              <span className="font-bold text-accent text-right">{claimNumber}</span>

              <span className="text-slate-500 font-medium">Fecha de Envío:</span>
              <span className="font-bold text-slate-800 text-right">{currentDate}</span>

              <span className="text-slate-500 font-medium">Consumidor:</span>
              <span className="font-bold text-slate-850 text-right">{formData.fullName}</span>

              <span className="text-slate-500 font-medium">Documento:</span>
              <span className="font-bold text-slate-800 text-right">{formData.docType} - {formData.docNumber}</span>

              <span className="text-slate-500 font-medium">Tipo:</span>
              <span className="font-bold text-slate-800 text-right uppercase">{formData.claimType}</span>

              <span className="text-slate-500 font-medium">Bien Contratado:</span>
              <span className="font-bold text-slate-800 text-right">{formData.goodType}</span>

              {formData.claimedAmount && (
                <>
                  <span className="text-slate-500 font-medium">Monto Reclamado:</span>
                  <span className="font-bold text-slate-800 text-right">S/ {parseFloat(formData.claimedAmount).toFixed(2)}</span>
                </>
              )}
            </div>
            <div className="border-t border-slate-200 pt-3 mt-3">
              <span className="text-slate-500 font-medium block mb-1">Descripción corta de la Reclamación:</span>
              <p className="text-slate-700 italic bg-white p-3 rounded-lg border border-slate-150 print:bg-slate-50">
                "{formData.details.length > 120 ? formData.details.slice(0, 120) + '...' : formData.details}"
              </p>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed text-center pt-2">
              * Conforme al D.S. 011-2011-PCM, el proveedor cuenta con un plazo no mayor a quince (15) días hábiles improrrogables para atender y dar respuesta a su reclamación.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 print:hidden">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-slate-300 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-2"
              onClick={handlePrint}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir / Guardar PDF
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800"
              onClick={() => window.location.href = '/'}
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      ) : (
        /* Form View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Area */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-8 space-y-8 print:w-full">
            
            {/* CARD: Provider Info (Required by INDECOPI) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-sm print:bg-white print:text-slate-900 print:border-slate-300">
              <h2 className="text-lg font-black tracking-tight text-white border-b border-slate-800 pb-3 flex items-center gap-2 print:text-slate-900 print:border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
                1. Datos del Proveedor (Establecimiento Comercial)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block print:text-slate-500">Razón Social:</span>
                  <strong className="text-slate-100 print:text-slate-800">SISTEMATÍZATE PERÚ S.A.C.</strong>
                </div>
                <div>
                  <span className="text-slate-400 block print:text-slate-500">RUC:</span>
                  <strong className="text-slate-100 print:text-slate-800">20613212630</strong>
                </div>
                <div className="md:col-span-2">
                  <span className="text-slate-400 block print:text-slate-500">Domicilio Fiscal / Establecimiento:</span>
                  <strong className="text-slate-100 print:text-slate-800">MZA. A LOTE. 11 OTR. AV. MANATIALES, SAN SEBASTIÁN, CUSCO - CUSCO</strong>
                </div>
              </div>
            </div>

            {/* CARD: Consumer Info */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm print:border-slate-300">
              <h2 className="text-lg font-black tracking-tight text-accent border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
                2. Identificación del Consumidor Reclamante
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nombre Completo o Razón Social <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="Ej. Juan Carlos Pérez Rojas"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.fullName.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Tipo de Documento <span className="text-red-500">*</span></label>
                    <select
                      {...register('docType')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="DNI">DNI (Doc. Nacional de Identidad)</option>
                      <option value="RUC">RUC (Registro Único de Contribuyentes)</option>
                      <option value="CE">C.E. (Carnet de Extranjería)</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Número de Documento <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...register('docNumber')}
                      placeholder="Ej. 45892374"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                        errors.docNumber ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.docNumber && (
                      <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.docNumber.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Teléfono / Celular <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="Ej. 987654321"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.phone.message}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Correo Electrónico <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="Ej. juan.perez@correo.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Domicilio (Dirección, Distrito y Provincia) <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register('address')}
                    placeholder="Ej. Av. De La Cultura 450, San Jerónimo, Cusco"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.address.message}</span>
                  )}
                </div>

                {/* Minor representation */}
                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register('isMinor')}
                      className="w-4.5 h-4.5 rounded border-slate-300 text-accent focus:ring-primary focus:ring-offset-2 accent-primary"
                    />
                    <span className="text-xs font-bold text-slate-700">Soy menor de edad (Requiere datos del apoderado)</span>
                  </label>
                </div>

                {isMinor && (
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-view mt-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Datos del Apoderado</h3>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-650">Nombre del Padre, Madre o Tutor Legal</label>
                      <input
                        type="text"
                        {...register('guardianName')}
                        placeholder="Ej. María Elena Rojas Vilca"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.guardianName ? 'border-red-500' : 'border-slate-200'
                        }`}
                      />
                      {errors.guardianName && (
                        <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.guardianName.message}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-655 font-bold">Tipo de Documento</label>
                        <select
                          {...register('guardianDocType')}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2"
                        >
                          <option value="DNI">DNI</option>
                          <option value="CE">C.E.</option>
                          <option value="Pasaporte">Pasaporte</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-650">Número de Documento</label>
                        <input
                          type="text"
                          {...register('guardianDocNumber')}
                          placeholder="Ej. 12938475"
                          className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none ${
                            errors.guardianDocNumber ? 'border-red-500' : 'border-slate-200'
                          }`}
                        />
                        {errors.guardianDocNumber && (
                          <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.guardianDocNumber.message}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CARD: Contracted Good/Service */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm print:border-slate-300">
              <h2 className="text-lg font-black tracking-tight text-accent border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
                3. Identificación del Bien Contratado
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Tipo de Bien <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                        <input
                          type="radio"
                          value="Producto"
                          {...register('goodType')}
                          className="w-4 h-4 accent-primary"
                        />
                        Producto
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                        <input
                          type="radio"
                          value="Servicio"
                          {...register('goodType')}
                          className="w-4 h-4 accent-primary"
                        />
                        Servicio (Ej. Licencia, Soporte)
                      </label>
                    </div>
                    {errors.goodType && (
                      <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.goodType.message}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Monto del Bien o Reclamado (S/.) <span className="text-slate-400 font-normal">(Opcional)</span></label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('claimedAmount')}
                      placeholder="Ej. 149.00"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Descripción del Bien o Servicio contratado <span className="text-red-500">*</span></label>
                  <textarea
                    rows={2}
                    {...register('description')}
                    placeholder="Ej. Suscripción Plan Emprendedor de facturación electrónica o Compra de Impresora Térmica 80mm."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.description && (
                    <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.description.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* CARD: Claim / Complaint Details */}
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm print:border-slate-300">
              <h2 className="text-lg font-black tracking-tight text-accent border-b border-slate-100 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
                4. Detalle de la Reclamación y Pedido del Consumidor
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Tipo de Acción Comercial <span className="text-red-500">*</span></label>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <label className="flex items-start gap-2.5 cursor-pointer max-w-sm">
                      <input
                        type="radio"
                        value="Reclamo"
                        {...register('claimType')}
                        className="w-4 h-4 mt-0.5 accent-primary flex-shrink-0"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-slate-800">Reclamo</span>
                        <span className="text-[11px] text-slate-400 leading-normal">Discrepancia relacionada a los productos o servicios adquiridos.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer max-w-sm">
                      <input
                        type="radio"
                        value="Queja"
                        {...register('claimType')}
                        className="w-4 h-4 mt-0.5 accent-primary flex-shrink-0"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-slate-800">Queja</span>
                        <span className="text-[11px] text-slate-400 leading-normal">Malestar o descontento respecto a la atención recibida o servicio al cliente.</span>
                      </div>
                    </label>
                  </div>
                  {errors.claimType && (
                    <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.claimType.message}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Detalle del Reclamo o Queja <span className="text-red-500">*</span></label>
                  <textarea
                    rows={5}
                    {...register('details')}
                    placeholder="Detalle de forma detallada y ordenada lo ocurrido con el producto o servicio adquirido..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.details ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.details && (
                    <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.details.message}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Pedido o Solicitud del Consumidor <span className="text-red-500">*</span></label>
                  <textarea
                    rows={3}
                    {...register('request')}
                    placeholder="Indique con claridad cuál es su requerimiento, solución esperada o acción solicitada comercialmente..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.request ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.request && (
                    <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.request.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Declaration and Consent */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 print:border-slate-300">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="w-5 h-5 mt-0.5 rounded border-slate-350 text-accent focus:ring-primary focus:ring-offset-2 accent-primary flex-shrink-0"
                />
                <span className="text-xs text-slate-650 leading-relaxed text-left">
                  Declaro bajo juramento que los datos ingresados en esta hoja de reclamación son verídicos y corresponden a los hechos reales. Asimismo, autorizo a <strong>SISTEMATÍZATE PERÚ S.A.C.</strong> a utilizar mis datos personales proporcionados para la gestión de este reclamo/queja de acuerdo a las directrices de la Ley N° 29733 (Ley de Protección de Datos Personales en el Perú).
                </span>
              </label>
              {errors.consent && (
                <span className="text-[11px] text-red-500 font-bold block mt-1">{errors.consent.message}</span>
              )}
            </div>

            {/* Form actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 print:hidden">
              <button
                type="submit"
                disabled={createClaimMutation.isPending}
                className="w-full sm:w-auto px-10 py-4 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-sm transition-all duration-200 cursor-pointer border-0 active:scale-95 shadow-md shadow-accent/20 flex-grow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createClaimMutation.isPending ? 'Enviando Reclamación...' : 'Enviar Hoja de Reclamación'}
              </button>
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                onClick={() => window.history.back()}
              >
                Cancelar
              </button>
            </div>

          </form>

          {/* Legal / Info Sidebar */}
          <div className="lg:col-span-4 space-y-6 print:hidden">
            <div className="bg-secondary text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-primary/10 shadow-xl shadow-primary/5">
              <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Información Legal
              </h3>
              
              <ul className="space-y-4 text-xs text-slate-300 leading-relaxed text-left list-none pl-0">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong>Plazo de Respuesta:</strong> La respuesta a la presente reclamación le será remitida en un plazo máximo de quince (15) días hábiles improrrogables.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong>Reclamo vs Queja:</strong> Un Reclamo es la disconformidad relacionada con los productos o servicios expendidos, mientras que una Queja es el descontento por una mala atención recibida.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span><strong>Protección de Datos:</strong> Su información personal registrada se encuentra protegida bajo la Ley N° 29733 y será usada exclusivamente para responder a su solicitud.</span>
                </li>
              </ul>
            </div>

            <div className="border border-slate-150 rounded-3xl p-6 bg-slate-50 text-slate-600 text-xs text-left leading-relaxed space-y-3">
              <h4 className="font-extrabold text-accent">¿Necesitas ayuda inmediata?</h4>
              <p>
                Si tienes problemas técnicos al emitir tus facturas o deseas soporte inmediato con tu cuenta activa, te recomendamos contactar directamente a nuestra mesa de ayuda.
              </p>
              <a
                href="https://wa.me/51913129204"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 bg-primary text-slate-950 font-bold rounded-lg border border-transparent shadow-sm hover:bg-primary-dark transition-all text-xs"
              >
                Soporte por WhatsApp
              </a>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
