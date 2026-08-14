import React from 'react';
import type { Equipo } from '../types';

interface EquipoCardProps {
  equipo: Equipo;
  onNavigate: (view: string, subId?: string) => void;
}

export const EquipoCard: React.FC<EquipoCardProps> = ({ equipo, onNavigate }) => {
  const [imageError, setImageError] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const targetId = equipo.id || (equipo as any)._id;

  const handleGoToDetail = () => {
    if (targetId) {
      onNavigate('catalogo-detail', targetId);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (equipo.images && equipo.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === equipo.images!.length - 1 ? 0 : prev + 1));
      setImageError(false); // Reset error state on change
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (equipo.images && equipo.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? equipo.images!.length - 1 : prev - 1));
      setImageError(false); // Reset error state on change
    }
  };

  const renderPlaceholder = () => (
    <div className="flex flex-col items-center justify-center text-slate-300 scale-75">
      <svg className="w-12 h-12 mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin Imagen</span>
    </div>
  );

  return (
    <div 
      onClick={handleGoToDetail}
      className="bg-white p-8 rounded-3xl border border-slate-150 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-left cursor-pointer"
    >
      <div className="space-y-6">
        {/* Mockup Container / View */}
        <div className="h-44 bg-slate-50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden group-hover:bg-blue-50/30 transition-colors">
          {equipo.images && equipo.images.length > 0 && !imageError ? (
            <>
              <img 
                src={equipo.images[currentImageIndex]} 
                alt={equipo.name} 
                className="h-32 object-contain select-none transition-opacity duration-300" 
                onError={() => setImageError(true)}
              />
              
              {equipo.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/20 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/20 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                  
                  {/* Dots indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {equipo.images.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'w-4 bg-accent' : 'w-1.5 bg-slate-300'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            equipo.mockup || renderPlaceholder()
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {equipo.model}
            </span>
            <span className="text-sm font-black text-primary bg-accent/90 px-2.5 py-0.5 rounded-full">
              S/ {equipo.price}
            </span>
          </div>
          <h3 className="text-xl font-bold text-accent group-hover:text-blue-600 transition-colors">
            {equipo.name}
          </h3>
          <p className="text-slate-550 text-sm leading-relaxed line-clamp-3">
            {equipo.description}
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 mt-8">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('contacto');
          }}
          className="w-full py-3 rounded-xl text-xs font-black bg-accent text-primary hover:bg-accent/90 transition-all cursor-pointer text-center shadow-sm"
        >
          Solicitar Cotización
        </button>
      </div>
    </div>
  );
};
