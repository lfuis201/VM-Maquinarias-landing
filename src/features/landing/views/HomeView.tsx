import React, { useState } from 'react';
import marca1 from '../../../assets/marcas/marca1.png';
import marca2 from '../../../assets/marcas/marca2.png';
import marca3 from '../../../assets/marcas/marca3.png';
import marca8 from '../../../assets/marcas/marca8.png';

import g1 from '../../../assets/maquinas/gallery-1.jpg';
import g2 from '../../../assets/maquinas/gallery-2.jpg';
import g3 from '../../../assets/maquinas/gallery-3.jpg';
import g4 from '../../../assets/maquinas/gallery-4.jpg';
import g5 from '../../../assets/maquinas/gallery-5.jpg';
import g6 from '../../../assets/maquinas/gallery-6.jpg';
import g7 from '../../../assets/maquinas/gallery-7.jpg';
import g8 from '../../../assets/maquinas/gallery-8.jpg';
import g9 from '../../../assets/maquinas/gallery-9.jpg';
import g10 from '../../../assets/maquinas/gallery-10.jpg';
import g11 from '../../../assets/maquinas/gallery-11.jpg';
import g12 from '../../../assets/maquinas/gallery-12.jpg';
import roypowBattery from '../../../assets/ROYPOW-Forklift-Battery.png';
import heroVideo from '../../../assets/video.mp4';
import { ImageModal } from '../components/ImageModal';

export const HomeView: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [contactForm, setContactForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ name: string; img: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="relative bg-white text-slate-800 font-sans">
      {/* 1. HERO SECTION (COLUMNA DERECHA VACÍA Y VIDEO TOTALMENTE VISIBLE) */}
      <section className="relative min-h-[88vh] flex items-center bg-slate-950 text-white py-20 px-6 overflow-hidden">
        {/* Video de Fondo Local descargado (video.mp4) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            src={heroVideo}
            className="w-full h-full object-cover opacity-100 scale-105 filter brightness-100"
          />
          {/* Gradiante horizontal ultra ligero sólo en el lado izquierdo para el texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent z-10 pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Columna Izquierda (Texto y Botones unificados en color Naranja) */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-md">
                VM Maquinarias
              </h1>
              <p className="text-2xl sm:text-3xl font-extrabold text-orange-500">
                Venta & Alquiler de Montacargas y Apiladores
              </p>
            </div>
            
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl font-medium drop-shadow">
              Con más de 20 años de experiencia en el sector logístico y equipos WareHouse, contamos con la mejor relación de calidad/precio en la venta, alquiler y reparación de montacargas y apiladores eléctricos y a combustión, así como en repuestos y baterías de litio.
            </p>

            {/* Un solo esquema de color (Naranja) para los botones */}
            <div className="pt-2 flex flex-wrap gap-3.5 items-center">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-orange-600/30 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  Ver Catálogo
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
              <a
                href="#contacto"
                className="px-6 py-3.5 rounded-2xl bg-orange-600/90 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-0.5"
              >
                Solicitar Presupuesto
              </a>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('reservas')}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-wider border border-orange-500/50 transition-all shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                >
                  Reservar Equipo
                </button>
              )}
            </div>
          </div>

          {/* Columna Derecha COMPLETAMENTE VACÍA para apreciar todo el video */}
          <div className="hidden lg:block lg:col-span-6 pointer-events-none" />
        </div>
      </section>

      {/* 2. SERVICIOS SECTION - CON IMÁGENES REALES Y ESTILO INDUSTRIAL LIMPIO */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto space-y-14">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            SERVICIOS
          </h2>
          <p className="text-base sm:text-xl font-bold text-slate-700 leading-relaxed uppercase tracking-wide">
            CONTAMOS CON LA MEJOR RELACIÓN DE CALIDAD/PRECIO EN LA VENTA, ALQUILER Y REPARACIÓN DE MONTACARGAS Y APILADORES ELÉCTRICOS Y A COMBUSTIÓN, ASÍ COMO EN REPUESTOS Y BATERÍAS DE LITIO
          </p>
          <div className="w-24 h-1.5 bg-orange-600 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* VENTA */}
          <div className="space-y-4 text-left group">
            <div 
              onClick={() => setSelectedImage({ name: 'Servicio de Venta de Montacargas', img: g1 })}
              className="w-full h-48 overflow-hidden border border-slate-200 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow"
            >
              <img 
                src={g1} 
                alt="Venta de Montacargas" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-2">
              VENTA
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm font-medium leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Venta de montacargas a combustión y eléctricos.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Venta de montacargas articulados eléctricos.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Ventas de apilador eléctricos.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Contamos con marcas como FLEXI, EP EQUIPMENT, TOYOTA Y JUNGHEINRICH.
              </li>
            </ul>
            {onNavigate && (
              <button
                onClick={() => onNavigate('catalogo')}
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Ver Catálogo de Ventas
                <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* ALQUILER */}
          <div className="space-y-4 text-left group">
            <div 
              onClick={() => setSelectedImage({ name: 'Servicio de Alquiler de Montacargas y Apiladores', img: g3 })}
              className="w-full h-48 overflow-hidden border border-slate-200 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow"
            >
              <img 
                src={g3} 
                alt="Alquiler de Apiladores y Montacargas" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-2">
              ALQUILER
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm font-medium leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Alquiler de montacargas eléctricos y a combustión.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Alquiler de apiladores retráctil eléctricos.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Apiladores con altura de hasta 14 metros.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Montacargas con altura de hasta 12 metros.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Equipos con carga máxima de hasta 5 toneladas.
              </li>
            </ul>
          </div>

          {/* MANTENIMIENTO */}
          <div className="space-y-4 text-left group">
            <div 
              onClick={() => setSelectedImage({ name: 'Servicio de Mantenimiento Correctivo y Preventivo', img: g8 })}
              className="w-full h-48 overflow-hidden border border-slate-200 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow"
            >
              <img 
                src={g8} 
                alt="Mantenimiento de Equipos WareHouse" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-2">
              MANTENIMIENTO
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm font-medium leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Servicio de mantenimiento CORRECTIVO.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Servicio de mantenimiento PREVENTIVO 250H.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Servicio de mantenimiento PREVENTIVO 500H.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Servicio de mantenimiento PREVENTIVO 1000H.
              </li>
            </ul>
          </div>

          {/* REPUESTOS */}
          <div className="space-y-4 text-left group">
            <div 
              onClick={() => setSelectedImage({ name: 'Baterías de Litio-ION y Repuestos Originales', img: roypowBattery })}
              className="w-full h-48 overflow-hidden border border-slate-200 cursor-pointer shadow-sm group-hover:shadow-md transition-shadow bg-slate-950 p-2 flex items-center justify-center"
            >
              <img 
                src={roypowBattery} 
                alt="Repuestos y Baterías de Litio" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-2">
              REPUESTOS
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm font-medium leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Cargadores de batería y pernos.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Regenerador de baterías.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Bomba de frenos e hidráulicas.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Filtro de aire e hidráulico.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Rueda porteadora.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span> Micro switch y micro interruptor.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. HISTORIA SECTION - DISEÑO MODERNO CON CARROUSEL Y TITULARES DESTACADOS */}
      <section id="nosotros" className="py-24 px-6 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Encabezado Principal */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              HISTORIA
            </h2>
            <p className="text-xl sm:text-2xl font-extrabold text-orange-500 uppercase tracking-wide">
              26 AÑOS DE EXPERIENCIA EN EQUIPOS DE CONSTRUCCIÓN – ALMACENES E INDUSTRIALES
            </p>
            <div className="w-24 h-1.5 bg-orange-600 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Foto de Historia en la Izquierda limpia sin bordes ni superposiciones */}
            <div className="lg:col-span-6">
              <div
                onClick={() => setSelectedImage({ name: 'Historia VM Maquinarias - Operación de Apiladores y Montacargas', img: g6 })}
                className="w-full overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={g6}
                  alt="Historia VM Maquinarias"
                  className="w-full h-auto max-h-[420px] object-cover hover:scale-102 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Texto de Historia en la Derecha */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                Iniciamos nuestras operaciones en el año <strong className="text-white font-extrabold">2000</strong> en la zona sur de Lima – <strong className="text-orange-400 font-extrabold">ZONA INDUSTRIAL DE LURIN</strong>, brindando servicio correctivo y preventivo a cargadores frontales y montacargas en una empresa fabricante de mayólicas: <strong className="text-white font-bold">CERAMICA SAN LORENZO S.A.</strong>
              </p>
              
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="font-black text-white text-sm uppercase tracking-wider text-orange-500">Expansión Corporativa</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Expandiendo nuestros servicios a las empresas en Lima: <strong className="text-white">INTRADEVCO INDUSTRIAL S.A. (SAPOLIO)</strong>, <strong className="text-white">MEGAPACK GROUP S.A.</strong>, <strong className="text-white">EMUSA</strong>, <strong className="text-white">B.S.H.ELECTRODOMESTICOS S.A.C.</strong>, <strong className="text-white">DESTILERIA PERUANA</strong>, <strong className="text-white">TRUPAL S.A.</strong>, <strong className="text-white">ARIS INDUSTRIAL S.A.</strong>, <strong className="text-white">ROSSELLO AND CIA</strong>, <strong className="text-white">METROCOLOR S.A.</strong>, entre otros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EQUIPOS Y MARCAS SECTION */}
      <section id="equipos" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full inline-block border border-primary/20">
            Catálogo de Maquinarias
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-orange-600 tracking-tight">
            Equipos WareHouse
          </h2>
          <p className="text-slate-600 text-lg sm:text-2xl font-bold max-w-3xl mx-auto">
            Montacargas y apiladores retráctiles listos para salir a operar en tu almacén o centro logístico.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Apilador retráctil JUNGHEINRICH listo para salir a operar', img: g1 },
            { name: 'Montacargas articulado FLEXI listo para salir a operar', img: g2 },
            { name: 'Regenerador para baterías de plomo ácido - cargador de baterías', img: g3 },
            { name: 'Apilador retráctil en acción', img: g4 },
            { name: 'Montacargas de Litio-ION en acción', img: g5 },
            { name: 'Montacargas articulado FLEXI a espera de su uso', img: g6 },
            { name: 'Apilador retráctil junto a su cargador de batería', img: g7 },
            { name: 'Montacargas TOYOTA GLP listo para salir a operar', img: g8 },
            { name: 'Accesorios y repuestos para sus maquinarias', img: g9 },
            { name: 'Montacargas de litio', img: g10 },
            { name: 'Montacargas listo para la acción', img: g11 },
            { name: 'Montacargas con batería de Litio', img: g12 },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item)}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 hover:shadow-2xl transition-all space-y-4 group cursor-pointer"
            >
              <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-slate-900/90 text-white text-xs font-extrabold px-4 py-2 rounded-full border border-slate-700 shadow-xl flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Ver en pantalla completa
                  </span>
                </div>
                <span className="absolute top-3 right-3 bg-secondary text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                  VM Maquinarias
                </span>
              </div>
              <div className="space-y-1 text-left">
                <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-primary transition-colors">{item.name}</h4>
                <p className="text-xs text-slate-500 font-medium">Click para ampliar la imagen</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4.5. CARROUSEL DE MARCAS 100% ANCHO DE PANTALLA */}
      <section className="py-14 bg-slate-50 border-y border-slate-200 overflow-hidden w-full">
        <div className="text-center space-y-3 max-w-4xl mx-auto px-6 mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-orange-600 tracking-tight">
            Principales Marcas
          </h2>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-700 uppercase tracking-wide">
            Montacargas / Apiladores
          </p>
        </div>

        <div className="relative overflow-hidden py-4 w-full">
          <div className="animate-marquee flex items-center gap-16 sm:gap-28">
            {[marca1, marca2, marca3, marca8, marca1, marca2, marca3, marca8, marca1, marca2, marca3, marca8].map((img, idx) => (
              <div key={idx} className="shrink-0 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                <img src={img} alt={`Marca ${idx}`} className="h-20 sm:h-28 w-auto object-contain max-w-[240px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BATERÍA DE LITIO-ION SECTION - DISEÑO MODERNO CON IMAGEN DE IMPACTO Y SVG */}
      <section id="litio" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto space-y-14 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-primary-light bg-primary/20 px-4 py-2 rounded-full inline-block border border-primary/30 shadow-lg">
              Innovación Ecológica
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              BATERÍA DE <span className="text-primary-light">LITIO-ION</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Tecnología de última generación EP Equipment & VM Maquinarias para máximo rendimiento y cero emisión en tu almacén.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Lado Izquierdo: Beneficios y Puntos Clave Limpios sin Íconos Repetidos */}
            <div className="lg:col-span-6 space-y-5">
              {[
                { title: 'Montacargas VM de Litio-ION', desc: 'Rendimiento continuo sin mantenimiento de agua ni contaminación.' },
                { title: 'Transpaleta VM de Litio-ION', desc: 'Desplegada para grandes centros logísticos con operación 24/7.' },
                { title: 'MONTACARGAS VM Verde Ecológico', desc: 'Sostenibilidad, eficiencia energética y reducción del costo operativo.' },
                { title: 'Carga Rápida & Alta Autonomía', desc: 'Carga de oportunidad sin memoria de batería, listo en minutos para la acción.' },
              ].map((card, index) => (
                <div key={index} className="bg-slate-900/90 border border-slate-800/90 hover:border-primary/50 p-6 rounded-2xl transition-all shadow-xl space-y-1.5 text-left group">
                  <h4 className="font-extrabold text-white text-lg group-hover:text-primary-light transition-colors flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {card.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pl-5">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Lado Derecho: Imagen Destacada de Batería ROYPOW de Litio-ION */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl group flex flex-col items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all pointer-events-none" />
                
                <img
                  src={roypowBattery}
                  alt="Batería ROYPOW de Litio-ION para Montacargas"
                  className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500 relative z-10"
                />

                <div className="w-full mt-6 p-5 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 space-y-2 text-left shadow-2xl relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-secondary-light">ROYPOW & EP Equipment</span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-slate-950 px-2.5 py-1 rounded-full shadow-md">
                      Batería Litio-ION
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white">Batería de Litio-ION para Montacargas</h4>
                  <p className="text-xs text-slate-300">Cero mantenimiento de agua, sin efecto memoria y carga rápida de oportunidad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACTO SECTION - ULTRA MODERNO Y ELEGANTE */}
      <section id="contacto" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Información de Contacto (Tarjeta Dark Slate Industrial) */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-secondary-light bg-secondary/10 px-3.5 py-1.5 rounded-full inline-block border border-secondary/20">
                Atención Inmediata
              </span>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white">Contacto</h2>
                <h3 className="text-xl font-extrabold text-primary-light">Recibe un presupuesto sin compromiso</h3>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                Para todo tipo de consultas técnicas o comerciales, por favor llámanos directamente o déjanos un mensaje.
              </p>

              {/* Dirección */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary/20 text-secondary-light flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Oficina Principal</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Jirón Márquez de la Bula 314, Urb. Huertos de Villa<br />Chorrillos, Lima - Perú
                    </p>
                  </div>
                </div>
              </div>

              {/* Correos */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Correos Electrónicos</h4>
                <div className="space-y-2 text-xs font-medium text-slate-300">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>comercial@vmmaquinarias.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>logistica@vmmaquinarias.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>v.m.maquinarias@hotmail.com</span>
                  </div>
                </div>
              </div>

              {/* Teléfonos */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Teléfonos & Línea Directa</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-white">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <svg className="w-4 h-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>+51 997 757 102</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <svg className="w-4 h-4 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>+51 940 065 135</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>01 6365-941</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-primary/20 border border-primary/40 text-primary-light">
                    <svg className="w-4 h-4 text-primary-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Directa: 902 337 601</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario (Diseño Moderno e Industrial) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xl space-y-6 flex flex-col justify-start">
            <div className="space-y-1 text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Déjanos un mensaje</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Respondes de inmediato a tus requerimientos de alquiler o compra.</p>
            </div>
            
            {formSubmitted ? (
              <div className="p-8 bg-green-50 border border-green-200 rounded-3xl text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-green-500/30">
                  ✓
                </div>
                <h4 className="font-black text-slate-900 text-2xl">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Gracias por comunicarte con VM Maquinarias. Un asesor comercial especializado se pondrá en contacto contigo en breve.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={contactForm.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      required
                      value={contactForm.apellidos}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400"
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">Email Corporativo</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400"
                      placeholder="correo@empresa.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={contactForm.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400"
                      placeholder="999 999 999"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">Mensaje o Requerimiento</label>
                  <textarea
                    name="mensaje"
                    rows={4}
                    required
                    value={contactForm.mensaje}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-sm font-medium text-slate-900 transition-all resize-none placeholder:text-slate-400"
                    placeholder="¿En qué maquinaria (montacargas, apilador), capacidad o servicio estás interesado?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-base transition-all duration-300 shadow-xl shadow-orange-600/30 flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-0.5"
                >
                  Enviar Mensaje
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MODAL PANTALLA COMPLETA (LIGHTBOX) DEDICADO */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNavigateToQuote={() => onNavigate && onNavigate('reservas')}
      />
    </div>
  );
};
