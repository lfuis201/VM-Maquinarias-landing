import React, { useState, useEffect, useRef } from 'react';
import appImg from '../../../assets/appvisuals/app.png';
import appImg1 from '../../../assets/appvisuals/app1.png';
import appImg3 from '../../../assets/appvisuals/app3.png';
import dbImg1 from '../../../assets/appvisualsdashboard/dashboard1.png';
import dbImg2 from '../../../assets/appvisualsdashboard/dashboard2.png';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (val: number) => string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  formatter = (val) => Math.floor(val).toLocaleString('en-US'),
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress * (2 - progress); // easeOutQuad

      setCount(start + easedProgress * (end - start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {formatter(count)}
      {suffix}
    </span>
  );
};

export const HeroVisuals: React.FC = () => {
  const [currentAppImageIdx, setCurrentAppImageIdx] = useState(0);
  const [currentDbImageIdx, setCurrentDbImageIdx] = useState(0);

  const appImages = [
    appImg,
    appImg1,
    appImg3,
  ];

  const dbImages = [
    dbImg1,
    dbImg2,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAppImageIdx((prev) => (prev + 1) % appImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [appImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDbImageIdx((prev) => (prev + 1) % dbImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [dbImages.length]);

  return (
    <div className="relative w-full max-w-2xl min-h-[480px] flex items-center justify-start py-8">

      {/* 1. Desktop/Web Mini-Dashboard Mockup */}
      <div className="w-[85%] bg-white rounded-[32px] border border-slate-100 shadow-2xl overflow-hidden flex min-h-[440px] z-10">
        
        {/* Sidebar Panel */}
        <div className="w-14 bg-slate-50/50 border-r border-slate-100 flex flex-col items-center py-5 gap-5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#00ff66] text-slate-950 flex items-center justify-center shadow-md shadow-[#00ff66]/20 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="w-7 h-7 text-slate-400 hover:text-slate-650 flex items-center justify-center cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2M2 4h20v16H2V4z" />
            </svg>
          </div>
          <div className="w-7 h-7 text-slate-400 hover:text-slate-650 flex items-center justify-center cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="w-7 h-7 text-slate-400 hover:text-slate-650 flex items-center justify-center cursor-pointer transition-colors mt-auto">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>

        {/* Right side: Header + Carousel content */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden relative group/dashboard">
          
          {/* Header Bar at the top */}
          <div className="bg-slate-50/50 border-b border-slate-100 py-3 flex-shrink-0 flex items-center justify-center">
            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              Resumen SUNAT
            </h3>
          </div>

          {/* Carousel content below the header */}
          <div className="flex-1 w-full relative select-none">
            <div className="w-full h-full relative">
              {dbImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Dashboard Showcase ${idx}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    idx === currentDbImageIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
            </div>

            {/* Dashboard Navigation Controls (Arrows) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentDbImageIdx((prev) => (prev - 1 + dbImages.length) % dbImages.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/80 active:scale-95 text-white flex items-center justify-center text-base font-black cursor-pointer shadow transition-all opacity-0 group-hover/dashboard:opacity-100 border-0"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentDbImageIdx((prev) => (prev + 1) % dbImages.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/80 active:scale-95 text-white flex items-center justify-center text-base font-black cursor-pointer shadow transition-all opacity-0 group-hover/dashboard:opacity-100 border-0"
              aria-label="Siguiente"
            >
              ›
            </button>

            {/* Dashboard Indicators */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
              {dbImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentDbImageIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentDbImageIdx ? 'bg-[#00ff66] w-5' : 'bg-slate-350/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overlapping Interactive Phone Mockup */}
      <div className="absolute -bottom-4 right-0 w-[205px] h-[410px] bg-secondary rounded-[32px] border-[5px] border-accent shadow-2xl p-2.5 overflow-hidden flex flex-col justify-between z-20 hover:scale-[1.03] transition-transform duration-300">
        {/* Speaker / Camera Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-4.5 bg-secondary rounded-b-xl z-20 flex items-center justify-center">
          <div className="w-8 h-0.5 bg-secondary-light rounded-full" />
        </div>

        {/* Phone Content Screen */}
        <div className="flex-1 bg-white rounded-[24px] overflow-hidden relative select-none group/phone">
          <div className="w-full h-full relative">
            {appImages.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`Sistematizate App Mockup ${idx}`} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === currentAppImageIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls (Arrows) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentAppImageIdx((prev) => (prev - 1 + appImages.length) % appImages.length);
            }}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-900/60 hover:bg-slate-900/80 active:scale-95 text-white flex items-center justify-center text-sm font-black cursor-pointer shadow transition-all opacity-0 group-hover/phone:opacity-100 border-0"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentAppImageIdx((prev) => (prev + 1) % appImages.length);
            }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-900/60 hover:bg-slate-900/80 active:scale-95 text-white flex items-center justify-center text-sm font-black cursor-pointer shadow transition-all opacity-0 group-hover/phone:opacity-100 border-0"
            aria-label="Siguiente"
          >
            ›
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-20">
            {appImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentAppImageIdx(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentAppImageIdx ? 'bg-[#00ff66] w-3.5' : 'bg-slate-350/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Legacy phone mockup code saved just in case:
        <div className="flex-1 bg-slate-50 rounded-[24px] pt-6 p-3 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider leading-none">Mi Empresa</div>
                <div className="text-[11px] font-extrabold text-slate-800 leading-tight">Mi Tiendita SAC</div>
              </div>
              <div className="w-5.5 h-5.5 rounded-full bg-[#00ff66] flex items-center justify-center text-slate-950 text-[9px] font-black shadow-sm">
                MT
              </div>
            </div>
            <div className="bg-[#00ff66] rounded-xl p-3 text-slate-950 shadow-sm">
              <div className="text-[8px] text-slate-800 font-bold leading-none">Ventas de Hoy</div>
              <div className="text-lg font-black mt-0.5 leading-none">S/ 1.420,50</div>
              <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-950/10 text-[7.5px] text-slate-800 font-bold">
                <span>12 Ventas</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-950/10">SUNAT OK</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-2 bg-white border border-slate-100 rounded-lg flex flex-col items-center justify-center text-center shadow-sm cursor-pointer hover:border-emerald-300 transition-colors">
                <div className="w-6 h-6 rounded-md bg-green-50 flex items-center justify-center text-green-600 mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-[8px] font-bold text-slate-800">Nueva Venta</span>
              </div>
              <div className="p-2 bg-white border border-slate-100 rounded-lg flex flex-col items-center justify-center text-center shadow-sm cursor-pointer hover:border-blue-900 transition-colors">
                <div className="w-6 h-6 rounded-md bg-blue-50/70 flex items-center justify-center text-blue-900 mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-[8px] font-bold text-slate-800">Boleta Venta</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Últimas Ventas</div>
              {[
                { desc: 'Boleta E001-412', val: 'S/ 45.00', status: 'Enviado SUNAT', color: 'bg-[#00ff66]' },
                { desc: 'Factura F001-105', val: 'S/ 650.00', status: 'Enviado SUNAT', color: 'bg-[#00ff66]' },
                { desc: 'Boleta E001-411', val: 'S/ 120.00', status: 'Pendiente envío', color: 'bg-blue-900' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                    <div>
                      <div className="text-[9px] font-bold text-slate-800">{item.desc}</div>
                      <div className="text-[7px] text-slate-400">{item.status}</div>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-black text-slate-800">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-slate-400">
            <div className="flex flex-col items-center gap-0.5 text-primary-dark cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[7.5px] font-bold">Inicio</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-700 cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-[7.5px] font-bold">Reportes</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-700 cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="text-[7.5px] font-bold">Ajustes</span>
            </div>
          </div>
        </div>
        */}
      </div>

    </div>
  );
};
