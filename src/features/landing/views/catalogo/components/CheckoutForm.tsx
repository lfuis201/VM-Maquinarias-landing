import React from 'react';
import type { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';

interface CheckoutFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  shippingMethod: 'agency' | 'home';
  setShippingMethod: (method: 'agency' | 'home') => void;
  paymentMethod: 'yape' | 'transfer' | 'card';
  setPaymentMethod: (method: 'yape' | 'transfer' | 'card') => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  register,
  errors,
  setValue,
  shippingMethod,
  setShippingMethod,
  paymentMethod,
  setPaymentMethod,
}) => {
  const handleShippingChange = (method: 'agency' | 'home') => {
    setShippingMethod(method);
    setValue('shippingMethod', method);
  };

  const handlePaymentChange = (method: 'yape' | 'transfer' | 'card') => {
    setPaymentMethod(method);
    setValue('paymentMethod', method);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Contacto */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center text-sm font-black">1</span>
          Información de Contacto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nombres y Apellidos</label>
            <input
              type="text"
              {...register('customerName')}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                errors.customerName ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
              }`}
              placeholder="Ej. Juan Pérez"
            />
            {errors.customerName && (
              <span className="text-[11px] text-rose-600 font-bold block">{String(errors.customerName.message)}</span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">DNI / RUC</label>
            <input
              type="text"
              {...register('customerDocument')}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                errors.customerDocument ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
              }`}
              placeholder="Para emitir boleta/factura"
            />
            {errors.customerDocument && (
              <span className="text-[11px] text-rose-600 font-bold block">{String(errors.customerDocument.message)}</span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Teléfono / WhatsApp</label>
            <input
              type="text"
              {...register('customerPhone')}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                errors.customerPhone ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
              }`}
              placeholder="999 999 999"
            />
            {errors.customerPhone && (
              <span className="text-[11px] text-rose-600 font-bold block">{String(errors.customerPhone.message)}</span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Correo Electrónico</label>
            <input
              type="email"
              {...register('customerEmail')}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                errors.customerEmail ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
              }`}
              placeholder="correo@ejemplo.com"
            />
            {errors.customerEmail && (
              <span className="text-[11px] text-rose-600 font-bold block">{String(errors.customerEmail.message)}</span>
            )}
          </div>
        </div>
      </section>

      {/* Entrega */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center text-sm font-black">2</span>
          Método de Entrega
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <button 
            type="button"
            onClick={() => handleShippingChange('agency')}
            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              shippingMethod === 'agency' ? 'border-accent bg-indigo-50/40 shadow-sm shadow-accent/10' : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <svg className="w-8 h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="font-bold text-sm text-slate-900">Retiro en Agencia</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-100/60 px-2.5 py-0.5 rounded-full">¡Gratis!</span>
          </button>

          <button 
            type="button"
            onClick={() => handleShippingChange('home')}
            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
              shippingMethod === 'home' ? 'border-accent bg-indigo-50/40 shadow-sm shadow-accent/10' : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <svg className="w-8 h-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-bold text-sm text-slate-900">Envío a Domicilio</span>
            <span className="text-xs text-slate-500 font-bold">S/ 25.00</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Departamento / Ciudad</label>
            <input
              type="text"
              {...register('departmentCity')}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                errors.departmentCity ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
              }`}
              placeholder="Ej. Lima"
            />
            {errors.departmentCity && (
              <span className="text-[11px] text-rose-600 font-bold block">{String(errors.departmentCity.message)}</span>
            )}
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Provincia</label>
            <input
              type="text"
              {...register('province')}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                errors.province ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
              }`}
              placeholder="Ej. Lima"
            />
            {errors.province && (
              <span className="text-[11px] text-rose-600 font-bold block">{String(errors.province.message)}</span>
            )}
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Distrito</label>
            <input
              type="text"
              {...register('district')}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                errors.district ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
              }`}
              placeholder="Ej. Miraflores"
            />
            {errors.district && (
              <span className="text-[11px] text-rose-600 font-bold block">{String(errors.district.message)}</span>
            )}
          </div>

          {shippingMethod === 'home' && (
            <div className="space-y-1.5 md:col-span-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Dirección Exacta</label>
              <input
                type="text"
                {...register('address')}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                  errors.address ? 'border-rose-500 focus:border-rose-600 bg-rose-55/5' : 'border-slate-205 focus:border-accent'
                }`}
                placeholder="Av. Principal 123, Dpto 402"
              />
              {errors.address && (
                <span className="text-[11px] text-rose-600 font-bold block">{String(errors.address.message)}</span>
              )}
            </div>
          )}
          
          {shippingMethod === 'agency' && (
            <div className="space-y-1.5 md:col-span-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Agencia Preferida (Opcional)</label>
              <input
                type="text"
                {...register('preferredAgency')}
                className={`w-full bg-slate-50 border border-slate-200 focus:border-accent rounded-xl px-4 py-3 text-sm outline-none transition-all`}
                placeholder="Ej. Shalom sucursal Centro"
              />
            </div>
          )}
        </div>
      </section>

      {/* Pago */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center text-sm font-black">3</span>
          Método de Pago
        </h2>
        <p className="text-xs text-slate-500 mb-6">El pago se realiza de manera 100% segura. No almacenamos tus datos bancarios.</p>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 border-2 border-accent bg-indigo-50/20 rounded-2xl">
          <div className="w-5 h-5 rounded-full border-[5px] border-accent flex-shrink-0 mt-1 md:mt-0"></div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-slate-900 text-sm">Pago Seguro con Culqi</span>
              <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[9px] font-black uppercase tracking-wider">Recomendado</span>
            </div>
            <span className="text-xs text-slate-600 mt-1 block">
              Paga al instante con tu tarjeta de **crédito o débito** (Visa, Mastercard, Amex, Diners) o mediante **Yape**.
            </span>
          </div>
          <div className="flex gap-2 items-center flex-shrink-0 flex-wrap mt-2 md:mt-0">
            <div className="px-2 py-1 bg-[#742384] text-white rounded text-[9px] font-bold">Yape</div>
            <div className="px-1.5 py-1 bg-slate-100 border border-slate-200 text-[#0039A6] rounded text-[8px] font-black italic">VISA</div>
            <div className="px-1.5 py-1 bg-slate-100 border border-slate-200 text-[#EB001B] rounded text-[8px] font-black italic">MC</div>
          </div>
        </div>
      </section>
    </div>
  );
};
