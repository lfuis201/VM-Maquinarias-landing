import React, { useState } from 'react';
import g1 from '../../../../assets/maquinas/gallery-1.jpg';
import g2 from '../../../../assets/maquinas/gallery-2.jpg';
import g3 from '../../../../assets/maquinas/gallery-3.jpg';
import g4 from '../../../../assets/maquinas/gallery-4.jpg';
import g5 from '../../../../assets/maquinas/gallery-5.jpg';
import g6 from '../../../../assets/maquinas/gallery-6.jpg';
import g7 from '../../../../assets/maquinas/gallery-7.jpg';
import g8 from '../../../../assets/maquinas/gallery-8.jpg';
import g9 from '../../../../assets/maquinas/gallery-9.jpg';
import g10 from '../../../../assets/maquinas/gallery-10.jpg';
import g11 from '../../../../assets/maquinas/gallery-11.jpg';
import g12 from '../../../../assets/maquinas/gallery-12.jpg';
import roypowBattery from '../../../../assets/ROYPOW-Forklift-Battery.png';
import { ImageModal } from '../../components/ImageModal';

interface CatalogoViewProps {
  onNavigate: (view: string, subId?: string) => void;
}

export const CatalogoView: React.FC<CatalogoViewProps> = ({ onNavigate }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('TODAS');
  const [selectedImage, setSelectedImage] = useState<{ name: string; img: string } | null>(null);

  const maquinariasCatalog = [
    // EP EQUIPMENT
    {
      id: 'ep-1',
      brand: 'EP EQUIPMENT',
      title: 'Montacargas EP EQUIPMENT CPD15L1 / CPD20L2 / CPD25L1 / EFL',
      model: 'CPD15L1 / CP20L1 / CPD25L1 / CPD20L2 / EFL 250-300 / CPD45',
      capacity: '2.000K / 2.500K / 3.000K / 5.000K',
      height: '4.8m',
      image: g10,
      badge: 'Tecnología Litio-ION',
      type: 'Montacargas Eléctrico'
    },
    {
      id: 'ep-2',
      brand: 'EP EQUIPMENT',
      title: 'Apilador Retráctil EP EQUIPMENT CQD16L / CQD20L',
      model: 'CQD16L / CQD20L',
      capacity: '1.600K / 2.000K',
      height: '8m / 12m',
      image: g1,
      badge: 'Gran Altura 12M',
      type: 'Apilador Retráctil'
    },
    {
      id: 'ep-3',
      brand: 'EP EQUIPMENT',
      title: 'Transpaleta Eléctrica EP EQUIPMENT RPL201',
      model: 'RPL201(H)',
      capacity: '2.000K',
      height: 'Velocidad: 6KM/h – 12KM/h',
      image: g4,
      badge: 'Carga Rápida',
      type: 'Transpaleta Eléctrica'
    },

    // MITSUBISHI
    {
      id: 'mit-1',
      brand: 'MITSUBISHI',
      title: 'Montacargas MITSUBISHI FD30N / FG25N / FGC30N',
      model: 'FD30N / FG25N / FGC30N',
      capacity: '3.000K',
      height: '4.7m',
      image: g5,
      badge: 'Combustión / Dual',
      type: 'Montacargas a Combustión'
    },

    // FLEXI
    {
      id: 'flexi-1',
      brand: 'FLEXI',
      title: 'Montacargas Articulado FLEXI G4',
      model: 'FLEXI G4',
      capacity: '2.000K',
      height: '11m',
      image: g2,
      badge: 'Pasillo Angosto',
      type: 'Montacargas Articulado'
    },
    {
      id: 'flexi-2',
      brand: 'FLEXI',
      title: 'Montacargas FLEXI 1350AC / HI-MAX G4',
      model: 'FLEXI 1350AC / HI-MAX G4',
      capacity: '2.000K',
      height: '6m',
      image: g3,
      badge: 'Articulado AC',
      type: 'Montacargas Articulado'
    },

    // CATERPILLAR
    {
      id: 'cat-1',
      brand: 'CATERPILLAR',
      title: 'Montacargas CATERPILLAR CAT 2C5000 / 2C6000',
      model: 'CAT 2C5000 / 2C6000',
      capacity: '2.500K / 3.000K',
      height: '4.8m',
      image: g6,
      badge: 'Alto Rendimiento',
      type: 'Montacargas Industrial'
    },

    // HELI
    {
      id: 'heli-1',
      brand: 'HELI',
      title: 'Montacargas Pesado HELI CPC70',
      model: 'CPC70',
      capacity: '7.000K (7 Toneladas)',
      height: '4.5m',
      image: g7,
      badge: 'Carga Pesada 7T',
      type: 'Montacargas Pesado'
    },

    // JUNGHEINRICH
    {
      id: 'jh-1',
      brand: 'JUNGHEINRICH',
      title: 'Montacargas JUNGHEINRICH EFG216 / 216K / 320 / 425K',
      model: 'EFG216 / 216K / 320 / 425K',
      capacity: '1.500K / 1.600K / 1.800K / 2.300K',
      height: '5.5m / 5m / 4.4m',
      image: g8,
      badge: 'Ingeniería Alemana',
      type: 'Montacargas Eléctrico'
    },
    {
      id: 'jh-2',
      brand: 'JUNGHEINRICH',
      title: 'Transpaleta Eléctrica JUNGHEINRICH EJE-120',
      model: 'EJE-120',
      capacity: '2.000K',
      height: '0.122m',
      image: g9,
      badge: 'Transpaleta Logística',
      type: 'Transpaleta Eléctrica'
    },
    {
      id: 'jh-3',
      brand: 'JUNGHEINRICH',
      title: 'Apilador Retráctil JUNGHEINRICH ETM-214',
      model: 'ETM-214',
      capacity: '1.400K',
      height: '7.7m',
      image: g11,
      badge: 'Retráctil Eficiente',
      type: 'Apilador Retráctil'
    },
    {
      id: 'jh-4',
      brand: 'JUNGHEINRICH',
      title: 'Apilador Retráctil JUNGHEINRICH ETV 110 / 214 / 20GN',
      model: 'ETV 110 / 214 / 20GN',
      capacity: '1.000K / 1.400K / 2.000K',
      height: '6.5m / 9m / 10m',
      image: g12,
      badge: 'Altura Mástil 10m',
      type: 'Apilador Retráctil'
    },

    // NISSAN
    {
      id: 'nis-1',
      brand: 'NISSAN',
      title: 'Montacargas NISSAN KCPH02A25PV',
      model: 'KCPH02A25PV',
      capacity: '2.500K',
      height: '5.15m',
      image: g1,
      badge: 'Fiabilidad Garantizada',
      type: 'Montacargas a Combustión'
    },

    // STILL
    {
      id: 'still-1',
      brand: 'STILL',
      title: 'Apilador Retráctil STILL ETM-214',
      model: 'ETM-214',
      capacity: '1.400KG',
      height: '8m',
      image: g3,
      badge: 'STILL Premium',
      type: 'Apilador Retráctil'
    },

    // TOYOTA
    {
      id: 'toy-1',
      brand: 'TOYOTA',
      title: 'Montacargas TOYOTA 7FGCU20 / 7FGU30 / 7FGU45 / 8FGCU30',
      model: '7FGCU20 / 7FGU30 / 7FGU45 / 8FGCU30 / 5BR13',
      capacity: '2.000K / 3.500K / 4.000K / 3.000K',
      height: '4.7m / 2.3m / 3.3m / 4.75m',
      image: g5,
      badge: 'Líder en Ventas',
      type: 'Montacargas a Combustión'
    },
    {
      id: 'toy-2',
      brand: 'TOYOTA',
      title: 'Apilador Retráctil TOYOTA 5BR13',
      model: '5BR13',
      capacity: '1.500K',
      height: '5m',
      image: g7,
      badge: 'Serie 5BR Toyota',
      type: 'Apilador Retráctil'
    }
  ];

  const brandsList = ['TODAS', 'EP EQUIPMENT', 'TOYOTA', 'JUNGHEINRICH', 'FLEXI', 'MITSUBISHI', 'CATERPILLAR', 'HELI', 'STILL', 'NISSAN'];

  const filteredEquipos = selectedBrand === 'TODAS'
    ? maquinariasCatalog
    : maquinariasCatalog.filter(item => item.brand === selectedBrand);

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-6 max-w-7xl mx-auto space-y-12 text-left">
      {/* Header del Catálogo */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-500/10 px-4 py-2 rounded-full inline-block border border-orange-500/20">
          Catálogo Oficial de Maquinarias
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          VENTA DE MONTACARGAS Y APILADORES
        </h1>
        <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl mx-auto">
          Equipos WareHouse, apiladores retráctiles y montacargas de alta capacidad listos para entrega inmediata.
        </p>
        <div className="w-24 h-1.5 bg-orange-600 mx-auto rounded-full mt-4" />
      </div>

      {/* Filtro por Marca */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-2">
        {brandsList.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer border ${
              selectedBrand === brand
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-orange-500 hover:text-orange-600'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Grid de Maquinarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEquipos.map((eq) => (
          <div
            key={eq.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Foto de la Maquinaria */}
            <div
              onClick={() => setSelectedImage({ name: eq.title, img: eq.image })}
              className="relative h-64 w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center p-2"
            >
              <img
                src={eq.image}
                alt={eq.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-orange-600 text-white font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                {eq.badge}
              </span>
              <span className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md text-slate-200 font-bold text-xs px-3 py-1 rounded-lg border border-slate-700">
                {eq.type}
              </span>
            </div>

            {/* Datos Técnicos del Equipo */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">
                  {eq.brand}
                </span>
                <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                  {eq.title}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500 font-bold">MODELO:</span>
                  <span className="text-slate-900 font-black">{eq.model}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500 font-bold">CAPACIDAD:</span>
                  <span className="text-slate-900 font-black">{eq.capacity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">ALTURA MÁXIMA:</span>
                  <span className="text-orange-600 font-black">{eq.height}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('contacto')}
                className="w-full py-3 bg-slate-900 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2 text-center"
              >
                Solicitar Cotización
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Visor de Imágenes */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default CatalogoView;
