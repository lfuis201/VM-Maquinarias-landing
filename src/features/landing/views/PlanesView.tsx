import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../../shared/components/Button';
import { useLandingPlansQuery } from '../hooks/useLandingPlans';

interface PlanesViewProps {
  onNavigate: (view: string) => void;
}

export const PlanesView: React.FC<PlanesViewProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'mensual' | 'anual'>('mensual');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const plansSectionRef = useRef<HTMLDivElement>(null);

  // Auto scroll to plans on load
  useEffect(() => {
    const timer = setTimeout(() => {
      plansSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  const { data: dbPlans } = useLandingPlansQuery();

  const defaultPlans = [
    {
      name: 'Plan Gratuito',
      description: 'Ideal para probar el sistema y emitir tus primeros comprobantes.',
      priceMensual: 0, priceAnual: 0,
      features: ['Emite facturas, boletas y otros comprobantes', 'Hasta 10 documentos al mes', 'Acceso para 1 usuario', 'Impresión en A4, A5 o Ticket', 'Conectado con SUNAT y RENIEC', 'Soporte técnico básico'],
      cta: 'Comenzar Gratis', popular: false, color: 'slate',
    },
    {
      name: 'Plan Emprendedor Básico',
      description: 'Ideal para pequeños comercios y bodegas que inician su facturación electrónica.',
      priceMensual: 50, priceAnual: 550,
      features: ['Emite facturas, boletas y otros comprobantes', 'Hasta 200 documentos al mes', 'Ingresos de hasta S/20,000 por mes', 'Acceso para 1 usuario', 'Impresión en A4, A5 o Ticket', 'Personalizado con el logo de tu empresa', 'Exporta ventas en Excel y reportes', 'Conectado con SUNAT y RENIEC', 'Soporte personalizado', '*No incluye certificado digital'],
      cta: 'Comenzar Plan Básico', popular: false, color: 'slate',
    },
    {
      name: 'Plan Crecimiento Pro',
      description: 'Perfecto para negocios que requieren control de stock y almacén en tiempo real.',
      priceMensual: 75, priceAnual: 750,
      features: ['Emite facturas, boletas y otros comprobantes', 'Emisión de documentos ILIMITADA', 'Gestión de inventarios y control de stock', 'Acceso para hasta 2 usuarios', 'Impresión en A4, A5 o Ticket', 'Personalizado con el logo de tu empresa', 'Exporta ventas en Excel y reportes', 'Conectado con SUNAT y RENIEC', 'Módulo SIRE de SUNAT', 'Soporte personalizado'],
      cta: 'Iniciar Plan Pro', popular: true, color: 'primary',
    },
  ];

  const rawPlans = (dbPlans && dbPlans.length > 0) ? dbPlans.map((p: any) => ({
    ...p,
    price: { mensual: Number(p.priceMensual) || 0, anual: Number(p.priceAnual) || 0 },
  })) : defaultPlans.map(p => ({
    ...p,
    price: { mensual: p.priceMensual, anual: p.priceAnual },
  }));

  // Sort plans naturally by ascending price (Gratuito -> Básico 50 -> Pro 75)
  const plans = [...rawPlans].sort((a, b) => (a.price?.mensual ?? 0) - (b.price?.mensual ?? 0));

  // Duplicate plans list so carousel auto-slides continuously on PC as well as mobile
  const displayPlans = [...plans, ...plans];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();

    // Default to recommended plan or first plan on mobile load
    if (window.innerWidth < 768) {
      const recIndex = plans.findIndex(p => p.popular);
      setCurrentIndex(recIndex !== -1 ? recIndex : 0);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [plans.length]);

  const maxIndex = Math.max(0, displayPlans.length - itemsPerPage);
  const effectiveIndex = Math.min(currentIndex, maxIndex);

  // Autoplay carousel every 3.5 seconds on both PC and mobile unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [maxIndex, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance && effectiveIndex < maxIndex) {
      nextSlide();
    } else if (distance < -minSwipeDistance && effectiveIndex > 0) {
      prevSlide();
    }
  };

  return (
    <div className="py-6 md:py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-6 md:space-y-10 text-center">
      <div className="max-w-3xl mx-auto space-y-2.5">
        <h1 className="text-2xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
          Un plan diseñado para cada etapa de tu negocio
        </h1>
        <p className="text-slate-650 text-xs md:text-base">
          Sin contratos de permanencia ni cobros ocultos. Cambia de plan o cancela cuando quieras.
        </p>

        {/* Toggle Billing Cycle */}
        <div className="pt-2 md:pt-4 flex justify-center">
          <div className="bg-slate-100 p-1.5 rounded-full inline-flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setBillingCycle('mensual')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${billingCycle === 'mensual'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingCycle('anual')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${billingCycle === 'anual'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              Facturación Anual
              <span className="bg-white text-accent text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                Ahorra hasta 16%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Carousel */}
      <div ref={plansSectionRef} className="relative max-w-7xl mx-auto px-1 sm:px-4 md:px-12">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={effectiveIndex === 0}
          className={`absolute -left-2 sm:left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-white hover:bg-accent/90 border-2 border-primary/30 shadow-xl shadow-accent/20 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none`}
          aria-label="Anterior"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          disabled={effectiveIndex >= maxIndex}
          className={`absolute -right-2 sm:right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent text-white hover:bg-accent/90 border-2 border-primary/30 shadow-xl shadow-accent/20 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-90 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none`}
          aria-label="Siguiente"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Viewport with Touch Events & Autoplay pause */}
        <div
          className="overflow-hidden py-4 -mx-2 sm:-mx-4 touch-pan-y"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${effectiveIndex * (100 / itemsPerPage)}%)` }}
          >
            {displayPlans.map((plan, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-2 sm:px-4 flex justify-center"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div
                  className={`w-full max-w-sm sm:max-w-none bg-white rounded-3xl p-5 sm:p-8 border flex flex-col justify-between text-left relative transition-all duration-300 ${plan.popular
                      ? 'border-2 border-primary shadow-xl shadow-primary/10 lg:scale-[1.02] z-10'
                      : 'border-slate-150 hover:border-slate-300 shadow-sm'
                    }`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-primary text-slate-950 text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                      Más Recomendado
                    </span>
                  )}

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-accent">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 min-h-[32px] sm:min-h-[36px] leading-relaxed">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 py-3 sm:py-4 border-y border-slate-100">
                      <span className="text-xl sm:text-2xl font-bold text-slate-800">S/</span>
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {billingCycle === 'mensual' ? plan.price.mensual : plan.price.anual}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold ml-1">
                        {billingCycle === 'mensual' ? '/ mes' : '/ año'}
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 sm:space-y-3">
                      {plan.features.map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-650 font-medium">
                          <svg className="w-4 h-4 text-primary-dark mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 sm:pt-8">
                    <Button
                      variant={plan.popular ? 'primary' : plan.color === 'blue' ? 'secondary' : 'outline'}
                      size="lg"
                      className="w-full font-bold cursor-pointer text-sm"
                      onClick={() => onNavigate('contacto')}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="flex justify-center items-center gap-2 pt-4 sm:pt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                idx === effectiveIndex 
                  ? 'bg-primary w-8 shadow-md shadow-primary/30 ring-2 ring-primary/40' 
                  : 'bg-slate-300 w-3 hover:bg-slate-400'
              }`}
              aria-label={`Ir a slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Términos, Requisitos e Instalación */}
      <div className="pt-16 max-w-5xl mx-auto space-y-8 border-t border-slate-100">
        <h3 className="text-2xl font-bold text-accent text-center">Implementación e Instalación del Sistema</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Box 1: Plazo de Instalación */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary-dark flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-accent text-base">Plazo de Instalación</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              La instalación se realiza de forma remota en un plazo de <strong>24 a 48 horas</strong> por nuestro equipo de soporte técnico.
            </p>
          </div>

          {/* Box 2: Requisitos */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary-dark flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="font-bold text-accent text-base">Requisitos de Implementación</h4>
            <ul className="text-xs text-slate-655 space-y-1 list-disc pl-4 leading-normal">
              <li>RUC del cliente (Activo y Habido)</li>
              <li>Nombre comercial de la empresa</li>
              <li>Logo de la empresa en alta calidad</li>
              <li>Dirección comercial y teléfono de contacto</li>
            </ul>
          </div>

          {/* Box 3: Condiciones de Pago */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary-dark flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-accent text-base">Condiciones de Pago</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              El pago del servicio se realiza de manera anticipada a las cuentas bancarias autorizadas o Yape que le compartirán nuestros asesores.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ brief */}
      <div className="pt-16 max-w-4xl mx-auto space-y-8 text-left border-t border-slate-100">
        <h3 className="text-2xl font-bold text-accent text-center">Preguntas Frecuentes</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="font-bold text-accent text-sm md:text-base">¿Los comprobantes tienen validez legal ante SUNAT?</h4>
            <p className="text-xs md:text-sm text-slate-650 leading-relaxed">
              Sí, totalmente. Operamos bajo las normativas vigentes de SUNAT. Todos los comprobantes emitidos cuentan con firma digital y se envían de forma automática y oficial al organismo tributario.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-accent text-sm md:text-base">¿Puedo cambiar de plan en cualquier momento?</h4>
            <p className="text-xs md:text-sm text-slate-650 leading-relaxed">
              Por supuesto. Puedes subir o bajar de categoría según tus necesidades comerciales. Si cambias de plan a la mitad de un período de facturación, se aplicará el cargo prorrateado de forma justa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
