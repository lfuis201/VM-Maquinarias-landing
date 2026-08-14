import React, { useState } from 'react';
import { toast } from '@heroui/react';

import m08 from '../../../assets/maquinarias/venta_alquiler08.png';
import m09 from '../../../assets/maquinarias/venta_alquiler09.jpg';
import m10 from '../../../assets/maquinarias/venta_alquiler10.jpg';
import m11 from '../../../assets/maquinarias/venta_alquiler11.png';
import m14 from '../../../assets/maquinarias/venta_alquiler14.png';
import m15 from '../../../assets/maquinarias/venta_alquiler15.png';

export const ReservasView: React.FC = () => {
  const [formData, setFormData] = useState({
    empresa: '',
    contacto: '',
    email: '',
    telefono: '',
    tipoMaquinaria: 'montacargas-electricos',
    duracionAlquiler: '1-mes',
    fechaInicio: '',
    capacidadCarga: '2.5-ton',
    alturaElevacion: '6-metros',
    ubicacionOperacion: '',
    comentarios: '',
  });

  const [loading, setLoading] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  const opcionesMaquinaria = [
    {
      id: 'montacargas-electricos',
      title: 'Montacargas Eléctrico',
      subtitle: 'Tecnología Litio-ION / Plomo',
      capacity: '1.5T - 5.0T',
      img: m08,
    },
    {
      id: 'montacargas-combustion',
      title: 'Montacargas a Combustión',
      subtitle: 'GLP / Diésel Heavy Duty',
      capacity: '2.5T - 7.0T',
      img: m10,
    },
    {
      id: 'apilador-retractil',
      title: 'Apilador Retráctil',
      subtitle: 'Gran Altura Mástil 12M',
      capacity: '1.4T - 2.0T',
      img: m11,
    },
    {
      id: 'montacargas-articulado',
      title: 'Montacargas Articulado FLEXI',
      subtitle: 'Pasillo Angosto 1.8M',
      capacity: '2.0T',
      img: m15,
    },
    {
      id: 'transpaleta-electrica',
      title: 'Transpaleta Eléctrica',
      subtitle: 'Carga Rápida Logística',
      capacity: '2.0T',
      img: m14,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setReservaConfirmada(true);
      toast.success('¡Reserva de maquinaria solicitada exitosamente!');
    }, 1200);
  };

  return (
    <div className="py-16 md:py-24 px-6 max-w-7xl mx-auto space-y-12 text-left font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-primary-light bg-primary/20 px-3.5 py-1.5 rounded-full inline-block border border-primary/30">
            Reserva de Alquiler de Maquinarias
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Reserva tu Montacargas o Apilador
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Asegura la operatividad de tu almacén o planta con nuestros equipos de alta disponibilidad. Selecciona las especificaciones y reserva tu fecha de inicio en minutos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Reservation Form */}
        <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
          {reservaConfirmada ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-20 h-20 bg-primary/20 text-primary-dark rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900">¡Reserva Registrada!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Hemos recibido tu solicitud de alquiler para la empresa <strong className="text-slate-900">{formData.empresa || 'registrada'}</strong>. Un especialista logístico revisará la disponibilidad y te enviará la cotización final.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-lg mx-auto text-left text-xs space-y-2">
                <p className="font-bold text-slate-800 border-b border-slate-200 pb-2">Resumen de la Solicitud:</p>
                <p><span className="text-slate-500">Equipo:</span> <strong className="text-slate-800 capitalize">{formData.tipoMaquinaria.replace('-', ' ')}</strong></p>
                <p><span className="text-slate-500">Capacidad:</span> <strong className="text-slate-800">{formData.capacidadCarga}</strong> | <span className="text-slate-500">Altura:</span> <strong className="text-slate-800">{formData.alturaElevacion}</strong></p>
                <p><span className="text-slate-500">Fecha de Inicio:</span> <strong className="text-slate-800">{formData.fechaInicio || 'A coordinar'}</strong></p>
              </div>

              <button
                onClick={() => setReservaConfirmada(false)}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Hacer otra reserva
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 flex items-center justify-between">
                <span>1. Selecciona tu Maquinaria o Equipo</span>
                <span className="text-xs text-orange-600 font-bold uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">Paso 1 de 2</span>
              </h3>

              {/* Selector Visual de Maquinarias con Fondo Blanco */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {opcionesMaquinaria.map((maq) => {
                  const isSelected = formData.tipoMaquinaria === maq.id;
                  return (
                    <div
                      key={maq.id}
                      onClick={() => setFormData({ ...formData, tipoMaquinaria: maq.id })}
                      className={`relative p-4 rounded-2xl bg-white border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md ${
                        isSelected
                          ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/10'
                          : 'border-slate-150 hover:border-slate-300'
                      }`}
                    >
                      {/* Imagen con Fondo Blanco Limpio */}
                      <div className="h-36 w-full bg-white rounded-xl flex items-center justify-center p-2 mb-3 overflow-hidden">
                        <img
                          src={maq.img}
                          alt={maq.title}
                          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-slate-900">
                            {maq.title}
                          </h4>
                          {isSelected && (
                            <span className="w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-black">
                              ✓
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-slate-500">
                          {maq.subtitle}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-black uppercase text-orange-600 bg-orange-500/10 px-2 py-0.5 rounded-md">
                          Capacidad: {maq.capacity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Especificaciones Técnicas Requeridas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tiempo de Alquiler *</label>
                  <select
                    name="duracionAlquiler"
                    value={formData.duracionAlquiler}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-white"
                  >
                    <option value="1-semana">1 Semana (Puntual)</option>
                    <option value="1-mes">1 a 3 Meses</option>
                    <option value="6-meses">6 a 12 Meses</option>
                    <option value="mas-1-ano">Más de 1 Año</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Capacidad Requerida</label>
                  <select
                    name="capacidadCarga"
                    value={formData.capacidadCarga}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-white"
                  >
                    <option value="1.5-ton">1.5 Toneladas</option>
                    <option value="2.0-ton">2.0 Toneladas</option>
                    <option value="2.5-ton">2.5 Toneladas</option>
                    <option value="3.0-ton">3.0 Toneladas</option>
                    <option value="5.0-ton">5.0 Toneladas</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Altura Mástil / Elevación</label>
                  <select
                    name="alturaElevacion"
                    value={formData.alturaElevacion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-white"
                  >
                    <option value="4.5-metros">4.5 Metros</option>
                    <option value="6-metros">6.0 Metros</option>
                    <option value="8-metros">8.0 Metros</option>
                    <option value="10-metros">10.0 Metros</option>
                    <option value="12-14-metros">12 a 14 Metros</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Fecha Tentativa de Inicio *</label>
                <input
                  type="date"
                  name="fechaInicio"
                  required
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-slate-50/50"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 pt-6 flex items-center justify-between">
                <span>2. Datos de la Empresa y Contacto</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">Paso 2 de 2</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Razón Social / Empresa *</label>
                  <input
                    type="text"
                    name="empresa"
                    required
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Ej. Logística Rápida SAC"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Persona de Contacto *</label>
                  <input
                    type="text"
                    name="contacto"
                    required
                    value={formData.contacto}
                    onChange={handleChange}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Correo Corporativo *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="carlos@empresa.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-slate-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej. 997 757 102"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ubicación de la Operación / Almacén</label>
                <input
                  type="text"
                  name="ubicacionOperacion"
                  value={formData.ubicacionOperacion}
                  onChange={handleChange}
                  placeholder="Ej. Av. Argentina, Callao / Parque Industrial Lurín"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Detalles Adicionales</label>
                <textarea
                  name="comentarios"
                  rows={3}
                  value={formData.comentarios}
                  onChange={handleChange}
                  placeholder="¿Requieres cargador rápido de Batería de Litio, operador o aditamento especial?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 text-sm bg-slate-50/50 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl text-center text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Procesando Reserva...
                  </>
                ) : (
                  'Confirmar Reserva de Equipo'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Side Info Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-xl">
            <h4 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Ventajas del Alquiler VM
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center shrink-0 border border-primary/30">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Disponibilidad Inmediata</h5>
                  <p className="text-slate-400">Flota renovada de montacargas y apiladores listos para operar.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary/20 text-secondary-light flex items-center justify-center shrink-0 border border-secondary/30">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Mantenimiento Incluido</h5>
                  <p className="text-slate-400">Soporte preventivo y correctivo con técnicos especializados.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center shrink-0 border border-primary/30">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Tecnología Litio-ION</h5>
                  <p className="text-slate-400">Mayor autonomía y ahorro en costos operativos de batería.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Atención telefónica de reservas</h4>
            <div className="space-y-2 text-xs text-slate-700 font-medium">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>C: +51 997 757 102</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>C: +51 940 065 135</span>
              </p>
              <p className="flex items-center gap-2 text-primary-dark font-bold pt-1">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Línea Directa: 902 337 601</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
