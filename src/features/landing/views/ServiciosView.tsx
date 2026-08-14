import React, { useState } from 'react';
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
import { ImageModal } from '../components/ImageModal';

interface ServiciosViewProps {
  onNavigate?: (view: string) => void;
}

export const ServiciosView: React.FC<ServiciosViewProps> = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<{ name: string; img: string } | null>(null);

  const serviciosData = [
    {
      id: 'venta',
      title: 'Venta',
      subtitle: 'Montacargas / Apiladores',
      image: g1,
      items: [
        'Venta de montacargas a combustión y eléctricos.',
        'Venta de montacargas articulados eléctricos.',
        'Ventas de apiladores eléctricos.',
        'Contamos con marcas como FLEXI, EP EQUIPMENT, TOYOTA Y JUNGHEINRICH.',
      ],
      gallery: [
        { name: 'Montacargas Eléctrico EP', img: g1 },
        { name: 'Montacargas Articulado Flexi', img: g2 },
        { name: 'Apilador Eléctrico Jungheinrich', img: g4 },
        { name: 'Montacargas a Combustión Toyota', img: g5 },
      ]
    },
    {
      id: 'alquiler',
      title: 'Alquiler',
      subtitle: 'Montacargas / Apiladores',
      image: g3,
      items: [
        'Alquiler de montacargas eléctricos y a combustión.',
        'Alquiler de apiladores retráctil eléctricos.',
        'Apiladores con altura de hasta 14 metros.',
        'Montacargas con altura de hasta 12 metros.',
        'Equipos con carga de hasta 5 toneladas.',
      ],
      gallery: [
        { name: 'Apilador Retráctil 14m', img: g3 },
        { name: 'Montacargas de Alquiler 5T', img: g6 },
        { name: 'Flota de Apiladores Logísticos', img: g7 },
        { name: 'Montacargas Eléctrico 12m', img: g10 },
      ]
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento',
      subtitle: 'Preventivo / Correctivo',
      image: g8,
      items: [
        'Servicio de mantenimiento CORRECTIVO.',
        'Servicio de mantenimiento PREVENTIVO 250H.',
        'Servicio de mantenimiento PREVENTIVO 500H.',
        'Servicio de mantenimiento PREVENTIVO 1000H.',
        'Contamos con personal altamente capacitado en el tema.',
      ],
      gallery: [
        { name: 'Mantenimiento en Planta Industrial', img: g8 },
        { name: 'Inspección Correctiva de Motor', img: g9 },
        { name: 'Mantenimiento Preventivo de Baterías', img: g11 },
        { name: 'Revisión Técnica de Sistema Hidráulico', img: g12 },
      ]
    },
    {
      id: 'repuestos',
      title: 'Repuestos',
      subtitle: 'Combustión / Eléctricos / Litio',
      image: roypowBattery,
      isBatteryImg: true,
      items: [
        'Cargadores de batería y pernos de batería.',
        'Regenerador de baterías.',
        'Bomba de frenos y bombas hidráulicas.',
        'Filtro de aire y filtro hidráulico.',
        'Rueda porteadora.',
        'Micro switch y micro interruptor.',
      ],
      gallery: [
        { name: 'Batería de Litio-ION ROYPOW', img: roypowBattery },
        { name: 'Bombas Hidráulicas y de Freno', img: g11 },
        { name: 'Filtros y Ruedas Porteadoras', img: g12 },
        { name: 'Cargadores y Componentes Eléctricos', img: g2 },
      ]
    }
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 text-left">
      {/* Header General */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-500/10 px-4 py-2 rounded-full inline-block border border-orange-500/20">
          Soluciones Industriales Integrales
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          NUESTROS SERVICIOS
        </h1>
        <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto">
          Contamos con la mejor relación de calidad/precio en la venta, alquiler y reparación de montacargas y apiladores eléctricos y a combustión, así como en repuestos y baterías de litio.
        </p>
        <div className="w-24 h-1.5 bg-orange-600 mx-auto rounded-full mt-4" />
      </div>

      {/* Grid de Servicios con Galería de Equipos */}
      <div className="space-y-20">
        {serviciosData.map((servicio, index) => (
          <div 
            key={servicio.id} 
            id={servicio.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-xl ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Información del Servicio */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-orange-600">
                  {servicio.subtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {servicio.title}
                </h2>
              </div>

              <ul className="space-y-3 text-slate-700 text-sm sm:text-base font-medium">
                {servicio.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate && onNavigate('contacto')}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-orange-600/30 cursor-pointer"
                >
                  Solicitar Cotización de {servicio.title}
                </button>
              </div>
            </div>

            {/* Galería Visual de Equipos del Servicio */}
            <div className="lg:col-span-6 space-y-4">
              <div 
                onClick={() => setSelectedImage({ name: `${servicio.title} - ${servicio.subtitle}`, img: servicio.image })}
                className={`w-full h-64 sm:h-72 overflow-hidden border border-slate-200 shadow-md cursor-pointer group rounded-2xl ${
                  servicio.isBatteryImg ? 'bg-slate-950 p-4 flex items-center justify-center' : ''
                }`}
              >
                <img 
                  src={servicio.image} 
                  alt={servicio.title} 
                  className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                    servicio.isBatteryImg ? 'object-contain' : 'object-cover'
                  }`}
                />
              </div>

              {/* Muestras Miniatura de Galería */}
              <div className="grid grid-cols-4 gap-3">
                {servicio.gallery.map((gItem, gIdx) => (
                  <div 
                    key={gIdx}
                    onClick={() => setSelectedImage(gItem)}
                    className="h-20 rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:border-orange-500 transition-all shadow-sm group"
                  >
                    <img 
                      src={gItem.img} 
                      alt={gItem.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <ImageModal 
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};
