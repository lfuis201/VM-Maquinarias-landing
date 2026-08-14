import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  image: { name: string; img: string } | null;
  onClose: () => void;
  onNavigateToQuote?: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none w-screen h-screen"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
      onClick={onClose}
    >
      {/* Botón flotante de cierre */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-600 text-white font-black text-xl flex items-center justify-center transition-all cursor-pointer border border-white/20 hover:scale-110 shadow-2xl"
        title="Cerrar"
      >
        ✕
      </button>

      {/* Imagen Centrada Limpia */}
      <div className="relative max-w-full max-h-full flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.img}
          alt={image.name}
          className="max-w-[92vw] max-h-[88vh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] rounded-2xl"
        />
      </div>
    </div>,
    document.body
  );
};
