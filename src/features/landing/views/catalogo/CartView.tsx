import React from 'react';
import { useCartStore } from '../../stores/cartStore';

interface CartViewProps {
  onNavigate: (view: string, subId?: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[70vh] pb-24 pt-12 flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Tu carrito está vacío</h2>
        <p className="text-slate-500 mb-8 max-w-sm text-center">Parece que aún no has agregado ningún producto para potenciar tu negocio.</p>
        <button
          onClick={() => onNavigate('catalogo')}
          className="bg-accent hover:bg-indigo-900 text-primary font-bold px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Explorar Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
          Tu Carrito <span className="text-slate-400 font-medium text-2xl">({items.length} productos)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lista de Productos */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-4 mb-4">
                <div className="col-span-6">Producto</div>
                <div className="col-span-3 text-center">Cantidad</div>
                <div className="col-span-2 text-right">Subtotal</div>
                <div className="col-span-1 text-center"></div>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                    {/* Producto */}
                    <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                      <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl p-2 flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-accent bg-primary/20 px-2 py-0.5 rounded tracking-wider">{item.category}</span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1 leading-tight">{item.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">S/ {item.price.toLocaleString('es-PE', { minimumFractionDigits: 2 })} c/u</p>
                      </div>
                    </div>

                    {/* Cantidad */}
                    <div className="col-span-1 md:col-span-3 flex md:justify-center items-center mt-2 md:mt-0">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-slate-200 font-bold transition-colors text-slate-600 cursor-pointer"
                        >-</button>
                        <input type="text" readOnly value={item.quantity} className="w-10 text-center text-sm font-bold bg-transparent outline-none pointer-events-none" />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-slate-200 font-bold transition-colors text-slate-600 cursor-pointer"
                        >+</button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-1 md:col-span-2 text-left md:text-right mt-1 md:mt-0">
                      <span className="text-base font-black text-slate-900">
                        S/ {(item.price * item.quantity).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Eliminar */}
                    <div className="col-span-1 flex md:justify-center absolute right-6 md:relative md:right-0">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                        title="Eliminar producto"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onNavigate('catalogo')}
              className="text-sm font-bold text-accent hover:text-indigo-800 transition-colors flex items-center gap-2 pt-2 px-2 cursor-pointer"
            >
              ← Seguir comprando en el catálogo
            </button>
          </div>

          {/* Resumen de Orden */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/50 sticky top-24">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4 mb-4">Resumen de Orden</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-900">S/ {subtotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">IGV (18%)</span>
                  <span className="font-bold text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded">Incluido</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Envío estimado</span>
                  <span className="text-xs text-slate-400 italic">Se calcula en el checkout</span>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-300 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-base font-black text-slate-900">Total</span>
                  <span className="text-3xl font-black text-accent leading-none">
                    S/ {subtotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-accent hover:bg-indigo-900 text-primary font-black h-14 rounded-xl shadow-lg shadow-accent/20 cursor-pointer flex items-center justify-center gap-2 text-base transition-all transform hover:scale-[1.02]"
              >
                Proceder al Checkout
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pagos 100% Seguros
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
