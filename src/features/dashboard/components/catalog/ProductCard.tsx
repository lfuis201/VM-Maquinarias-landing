import React from 'react';
import { Button } from '@heroui/react';
import { TrashBin, Box } from '@gravity-ui/icons';
import type { Product } from '../../types/catalog';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === product.images!.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1));
    }
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          {/* Image Container with Placeholder Fallback */}
          <div className="w-full h-40 bg-slate-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center border border-slate-100 relative group">
            {product.images && product.images.length > 0 ? (
              <>
                <img
                  src={product.images[currentImageIndex].startsWith('http') ? product.images[currentImageIndex] : `/${product.images[currentImageIndex]}`}
                  alt={product.name}
                  className="object-cover w-full h-full transition-opacity duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                      {product.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-300">
                <Box className="w-10 h-10 mb-1" />
                <span className="text-[10px] font-medium uppercase tracking-wider">Sin Imagen</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {product.category}
            </span>
            <span className="text-xs text-slate-500 font-medium truncate ml-2">
              Mod: {product.model}
            </span>
          </div>
          
          <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1" title={product.name}>
            {product.name}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8" title={product.description}>
            {product.description || 'Sin descripción'}
          </p>
          
          <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-1">
            <div className="flex justify-between text-xs items-center">
              <span className="text-slate-500">Precio Base:</span>
              <span className="font-bold text-slate-800 text-sm">S/. {product.price}</span>
            </div>
            {product.priceTier2 && (
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>Mayorista 2:</span>
                <span className="font-medium">S/. {product.priceTier2}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <Button
            onPress={() => onEdit(product)}
            className="w-1/2 bg-slate-100 text-slate-800 font-bold h-9 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Editar
          </Button>
          <Button
            onPress={() => onDelete(product.id)}
            className="w-1/2 bg-rose-50 text-rose-600 font-bold h-9 rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <TrashBin className="w-4 h-4" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};
