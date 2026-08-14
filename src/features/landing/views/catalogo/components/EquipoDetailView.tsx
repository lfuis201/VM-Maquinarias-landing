import React, { useState } from 'react';
import { Button, toast } from '@heroui/react';
import { useProductsQuery } from '../../../../dashboard/hooks/useCatalog';
import { useCartStore } from '../../../stores/cartStore';
import { ShoppingCart } from '@gravity-ui/icons';

interface EquipoDetailViewProps {
  equipoId: string;
  onNavigate: (view: string, subId?: string) => void;
}

export const EquipoDetailView: React.FC<EquipoDetailViewProps> = ({ equipoId, onNavigate }) => {
  const { data: apiProducts = [] } = useProductsQuery();
  const addItem = useCartStore((state) => state.addItem);
  
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [zoomState, setZoomState] = useState({ isZoomed: false, x: 50, y: 50 });

  const equipo = apiProducts.find(e => e.id === equipoId) as any;

  if (!equipo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500 bg-slate-50">
        <p className="mb-4 text-sm font-medium">Cargando producto o no encontrado...</p>
        <button onClick={() => onNavigate('catalogo')} className="text-accent hover:underline font-bold text-sm">
          ← Volver al catálogo
        </button>
      </div>
    );
  }

  // Calculate current unit price based on quantity tiers
  const getUnitPrice = () => {
    if (quantity >= 10) return equipo.priceTier3 || equipo.price * 0.9;
    if (quantity >= 5) return equipo.priceTier2 || equipo.price * 0.95;
    return equipo.priceTier1 || equipo.price;
  };

  const currentPrice = getUnitPrice();
  const totalPrice = currentPrice * quantity;

  const parsedFeatures = (() => {
    let feats = equipo.features || [];
    if (typeof feats === 'string') {
      try { feats = JSON.parse(feats); } catch { feats = []; }
    }
    if (!Array.isArray(feats)) feats = [];
    return feats;
  })();

  const parsedSpecs = (() => {
    if (!equipo.specs) return {};
    if (typeof equipo.specs === 'string') {
      try { return JSON.parse(equipo.specs); } catch { return {}; }
    }
    if (Array.isArray(equipo.specs)) {
      return equipo.specs.reduce((acc: any, curr: any) => ({...acc, [curr.key || curr.label || 'Item']: curr.value || curr.val || ''}), {});
    }
    return equipo.specs;
  })();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomState({ isZoomed: true, x, y });
  };

  const handleMouseLeave = () => {
    setZoomState({ ...zoomState, isZoomed: false });
  };

  // Handle gallery rendering
  const renderGalleryView = (index: number) => {
    const imageUrl = equipo.images?.[index];

    if (imageUrl && !imageError) {
      return (
        <div 
          className="w-full h-64 md:h-80 relative overflow-hidden cursor-crosshair flex items-center justify-center rounded-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img 
            src={imageUrl} 
            alt={`${equipo.name} vista ${index + 1}`} 
            className="w-full h-full object-contain"
            style={{
              transformOrigin: `${zoomState.x}% ${zoomState.y}%`,
              transform: zoomState.isZoomed ? 'scale(2.2)' : 'scale(1)',
              transition: zoomState.isZoomed ? 'none' : 'transform 0.3s ease-out'
            }}
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    return (
      <div className="transform scale-150 transition-all duration-300">
        {equipo.mockup || (
          <div className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col items-center justify-center shadow-inner">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-[7px] font-bold text-slate-500 uppercase mt-1">Sin Imagen</span>
          </div>
        )}
      </div>
    );
  };

  const handleAddToCartOnly = () => {
    addItem({
      id: equipo.id,
      name: equipo.name,
      category: equipo.category,
      price: currentPrice,
      quantity: quantity,
      image: thumbnails[0] !== 'placeholder' ? thumbnails[0] : 'https://cdn-icons-png.flaticon.com/512/8653/8653130.png'
    });
    toast.success(`¡${equipo.name} agregado al carrito!`);
  };

  const handleBuyNow = () => {
    addItem({
      id: equipo.id,
      name: equipo.name,
      category: equipo.category,
      price: currentPrice,
      quantity: quantity,
      image: thumbnails[0] !== 'placeholder' ? thumbnails[0] : 'https://cdn-icons-png.flaticon.com/512/8653/8653130.png'
    });
    onNavigate('checkout');
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hola Sistematízate, estoy interesado en cotizar ${quantity} unidades del equipo: ${equipo.name} (${equipo.model}). Por favor bríndame los costos de envío y facilidades de pago.`;
    const url = `https://wa.me/51900123456?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const thumbnails = equipo.images && equipo.images.length > 0 ? equipo.images : ['placeholder'];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumbs (Alibaba Style) */}
      <div className="bg-white border-b border-slate-200 py-3 px-6 text-xs text-slate-500">
        <div className="w-full px-6 md:px-12 flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors cursor-pointer">Inicio</button>
          <span>&gt;</span>
          <button onClick={() => onNavigate('catalogo')} className="hover:text-primary transition-colors cursor-pointer">Catálogo POS</button>
          <span>&gt;</span>
          <span className="text-slate-400 capitalize">{equipo.category}</span>
          <span>&gt;</span>
          <span className="text-slate-800 font-bold truncate max-w-xs md:max-w-none">{equipo.name}</span>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Left Gallery Column (4 Cols on large screens) */}
          <div className="lg:col-span-5 flex flex-col md:flex-row gap-4">
            {/* Vertical Thumbnails List */}
            <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible">
              {thumbnails.map((thumbUrl: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveThumb(idx);
                    setImageError(false); // Reset error state on change
                  }}
                  className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center p-1 bg-white flex-shrink-0 transition-all ${
                    activeThumb === idx ? 'border-accent shadow-sm' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {thumbUrl !== 'placeholder' && !imageError ? (
                    <img 
                      src={thumbUrl} 
                      alt={`Thumb ${idx}`} 
                      className="w-full h-full object-contain" 
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="scale-75">
                      {equipo.mockup || (
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Main Preview Frame */}
            <div className="flex-1 min-h-[320px] bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-center shadow-sm order-1 md:order-2 relative">
              {renderGalleryView(activeThumb)}

              {/* Angle Tag indicator */}
              {thumbnails.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-slate-900/60 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Vista {activeThumb + 1} de {thumbnails.length}
                </div>
              )}
            </div>
          </div>

          {/* 2. Middle Product Info Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-accent bg-primary/20 px-2.5 py-1 rounded-md tracking-wider">
                {equipo.model}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {equipo.name}
              </h1>
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500">
                <span className="text-amber-500 font-bold">★★★★★</span>
                <span className="font-bold text-slate-700">5.0</span>
                <span>(38 calificaciones)</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">#1 más vendido</span>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100 mt-4">
                {equipo.description}
              </p>
            </div>

            {/* Alibaba Pricing Tiers */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Precios por Mayor (FOB Cusco/Lima)</div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="text-xs text-slate-500">1 - 4 uds</div>
                  <div className="text-lg font-black text-slate-900">S/ {equipo.priceTier1}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="text-xs text-slate-500">5 - 9 uds</div>
                  <div className="text-lg font-black text-slate-900 text-accent">S/ {equipo.priceTier2}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="text-xs text-slate-500">≥ 10 uds</div>
                  <div className="text-lg font-black text-slate-900 text-emerald-600">S/ {equipo.priceTier3}</div>
                </div>
              </div>

              {/* Dynamic Interactive Calculator */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-4">
                <div className="text-xs font-bold text-slate-600">Calcular cantidad:</div>
                <div className="flex items-center border border-slate-300 bg-white rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 font-bold border-r border-slate-300 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-sm font-bold text-slate-900 outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 font-bold border-l border-slate-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-xs font-bold text-slate-500">Total estimado:</span>
                <span className="text-2xl font-black text-slate-900">
                  S/ {totalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* In a Glance Bullets */}
            {parsedFeatures.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Características Clave:</h3>
                <ul className="space-y-1 text-slate-650 text-xs md:text-sm">
                  {parsedFeatures.map((feat: string, idx: number) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Spec Table */}
            {Object.keys(parsedSpecs).length > 0 && (
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Especificaciones Principales:</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {Object.entries(parsedSpecs).map(([label, val]: [string, any], idx: number) => (
                    <div key={label} className={`grid grid-cols-2 p-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100 last:border-0`}>
                      <span className="font-bold text-slate-500">{label}</span>
                      <span className="text-slate-800 font-semibold">{val as any}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Right Sticky Checkout / Order Summary Card (3 Cols) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xl shadow-slate-200/50 text-left relative overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-[#07fd02] to-emerald-400"></div>

            <div className="space-y-5">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Resumen de Orden</span>
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </h3>

              {/* Order Items Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-start text-sm">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-700">Subtotal ({quantity} producto{quantity > 1 ? 's' : ''})</span>
                    <span className="text-[11px] text-slate-400">Precio unitario: S/ {currentPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <span className="font-bold text-slate-900">S/ {totalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">Costo de Envío</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs uppercase tracking-wider">¡Gratis!*</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">IGV (18%)</span>
                  <span className="font-bold text-slate-900">Incluido</span>
                </div>
              </div>

              {/* Total Divider */}
              <div className="border-t border-dashed border-slate-300 pt-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-wider">Total a Pagar</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-accent block leading-none">
                      S/ {totalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust & Shipping Highlights */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-3 mt-2">
                <div className="flex gap-2 items-center">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[11px] font-semibold text-slate-600 leading-tight">
                    *Envío gratis a agencia (Shalom/Olva) por compras superiores a S/ 200.
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-[11px] font-semibold text-slate-600 leading-tight">
                    Transacción 100% segura. Pagos contra entrega en ciudades seleccionadas.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Métodos de Pago Aceptados</span>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-6 px-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-center text-[10px] font-black text-[#0039A6] italic">VISA</div>
                  <div className="h-6 px-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-center text-[10px] font-black text-[#EB001B] italic">Mastercard</div>
                  <div className="h-6 px-2 bg-[#742384] text-white rounded flex items-center justify-center text-[10px] font-black">Yape</div>
                  <div className="h-6 px-2 bg-[#00DDA3] text-slate-900 rounded flex items-center justify-center text-[10px] font-black">Plin</div>
                </div>
              </div>
            </div>

            {/* Action buttons (Checkout) */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col gap-3 w-full">
                <Button
                  className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold h-12 sm:h-14 rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-2 text-sm md:text-base transition-colors"
                  onPress={handleAddToCartOnly}
                >
                  <ShoppingCart className="w-5 h-5 text-slate-600" />
                  Agregar al Carrito
                </Button>
                <Button
                  className="w-full bg-accent hover:bg-accent-light text-primary font-black h-12 sm:h-14 rounded-xl shadow-lg shadow-accent/20 cursor-pointer flex items-center justify-center gap-2 border-0 text-sm md:text-base transition-colors"
                  onPress={handleBuyNow}
                >
                  Comprar Ahora
                </Button>
              </div>

              <button
                onClick={() => onNavigate('contacto')}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold h-12 rounded-xl border border-slate-300 hover:border-slate-500 transition-all cursor-pointer text-xs md:text-sm flex items-center justify-center gap-2"
              >
                Tengo una duda con mi compra
              </button>

              <button
                onClick={() => onNavigate('catalogo')}
                className="w-full text-xs font-bold text-center text-slate-400 hover:text-accent transition-colors cursor-pointer py-2 mt-1 underline underline-offset-4"
              >
                ← Seguir viendo más equipos
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Productos Relacionados ── */}
      {(() => {
        const related = apiProducts
          .filter((p: any) => p.id !== equipo.id && p.category === equipo.category)
          .slice(0, 4);
        const others = related.length === 0
          ? apiProducts.filter((p: any) => p.id !== equipo.id).slice(0, 4)
          : [];
        const displayProducts = related.length > 0 ? related : others;

        if (displayProducts.length === 0) return null;

        return (
          <div className="w-full px-6 md:px-12 pb-16">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-slate-200" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                  {related.length > 0 ? 'Productos Relacionados' : 'También te puede interesar'}
                </h2>
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {displayProducts.map((prod: any, idx: number) => {
                const prodImages = prod.images && prod.images.length > 0 ? prod.images : [];
                const prodPrice = prod.priceTier1 || prod.price;

                return (
                  <button
                    key={prod.id}
                    onClick={() => onNavigate('equipo-detail', prod.id)}
                    className={`group relative bg-white border border-slate-200 rounded-3xl overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80 hover:border-accent/40 cursor-pointer ${
                      idx === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
                    }`}
                  >
                    {/* Top gradient accent on hover */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-emerald-400 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* Image area */}
                    <div className={`bg-slate-50 flex items-center justify-center overflow-hidden ${idx === 0 ? 'h-48 lg:h-56' : 'h-40'}`}>
                      {prodImages.length > 0 ? (
                        <img
                          src={prodImages[0]}
                          alt={prod.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            if (target.parentElement) {
                              target.parentElement.innerHTML = `<div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center"><svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></div>`;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black uppercase text-accent/80 tracking-wider">
                            {prod.model}
                          </span>
                          <h3 className={`font-black text-slate-900 leading-tight mt-0.5 group-hover:text-accent transition-colors ${idx === 0 ? 'text-base' : 'text-sm'}`}>
                            {prod.name}
                          </h3>
                        </div>
                        {/* Arrow icon */}
                        <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-primary transition-all duration-300 mt-1">
                          <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {idx === 0 && prod.description && (
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 hidden lg:block">
                          {prod.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block">Desde</span>
                          <span className="text-lg font-black text-slate-900">
                            S/ <span className="text-accent">{prodPrice}</span>
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 capitalize">
                          {prod.category}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
