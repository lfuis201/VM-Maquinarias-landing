import React, { useState } from 'react';
import { useApprovedReviewsQuery, useCreateReviewMutation } from '../../hooks/useReviews';
import {
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  toast
} from '@heroui/react';

export const HomeReviews: React.FC = () => {
  const { data: reviews, isLoading } = useApprovedReviewsQuery();
  const createReviewMutation = useCreateReviewMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to render stars
  const renderStars = (count: number) => {
    return (
      <div className="flex gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < count ? 'fill-current' : 'text-slate-200'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleOpen = () => {
    setName('');
    setRole('');
    setCompany('');
    setComment('');
    setRating(5);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.danger('Por favor, ingresa tu nombre y un comentario.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createReviewMutation.mutateAsync({
        name,
        role: role.trim() || undefined,
        company: company.trim() || undefined,
        comment,
        rating,
        isApproved: false, // Public submissions start as unapproved
      });
      toast.success('¡Comentario enviado! Será visible luego de la aprobación del administrador.');
      handleClose();
    } catch (err: any) {
      console.error(err);
      toast.danger('Ocurrió un error al enviar el comentario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16 text-center">
      <div className="max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Testimonios Reales
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Lo que dicen nuestros <span className="text-indigo-650">clientes</span>
        </h2>
        <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl mx-auto">
          Historias de éxito de emprendedores peruanos que ya digitalizaron y organizaron su negocio con nosotros.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-8 space-y-6 shadow-sm animate-pulse text-left">
              <div className="h-4 bg-slate-100 rounded-full w-24"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                <div className="h-4 bg-slate-100 rounded-full w-5/6"></div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                <div className="space-y-2 flex-grow">
                  <div className="h-4 bg-slate-100 rounded-full w-20"></div>
                  <div className="h-3 bg-slate-100 rounded-full w-32"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-5">
                {/* Rating */}
                {renderStars(review.rating)}

                {/* Comment */}
                <blockquote className="text-slate-700 text-sm md:text-base leading-relaxed font-medium italic relative">
                  <span className="text-4xl text-indigo-100 font-serif absolute -top-5 -left-2 select-none">“</span>
                  <span className="relative z-10">{review.comment}</span>
                </blockquote>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-50">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50 shadow-inner"
                    onError={(e) => {
                      // Fallback to letters on image error
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                    {getInitials(review.name)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {review.role}
                    {review.role && review.company && ' • '}
                    {review.company && <span className="text-indigo-600 font-semibold">{review.company}</span>}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl p-12 max-w-lg mx-auto text-center border border-dashed border-slate-200 space-y-4">
          <p className="text-slate-500 text-sm font-semibold">Aún no hay comentarios aprobados.</p>
        </div>
      )}

      <div className="pt-4">
        <Button
          onClick={handleOpen}
          className="bg-slate-900 hover:bg-slate-800 text-white font-black px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-slate-900/10 cursor-pointer h-12"
        >
          Escribir un comentario
        </Button>
      </div>

      {/* Write Comment Modal */}
      <ModalBackdrop
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
        className="bg-slate-900/60 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      >
        <ModalContainer>
          <ModalDialog className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col text-left animate-scale-up">
            <ModalHeader className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-1 relative">
              <h3 className="text-lg font-black text-slate-900">Cuéntanos tu experiencia</h3>
              <p className="text-xs text-slate-500">Comparte cómo Sistematízate te ha ayudado a organizar tu negocio.</p>
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors border-none outline-none"
                type="button"
              >
                ✕
              </button>
            </ModalHeader>

            <form onSubmit={handleSubmit}>
              <ModalBody className="p-6 space-y-4 text-slate-800 max-h-[70vh] overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tu Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    placeholder="Ej. Carlos Benites"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tu Cargo / Ocupación</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      placeholder="Ej. Dueño de Restaurant"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nombre de tu Empresa</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      placeholder="Ej. Benites S.A.C."
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Calificación</label>
                  <div className="flex gap-2 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl cursor-pointer focus:outline-none transform hover:scale-110 transition-transform"
                      >
                        <svg
                          className={`w-8 h-8 ${star <= rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={0}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-2">({rating} de 5 estrellas)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tu Opinión / Comentario *</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                    placeholder="Escribe tu testimonio aquí..."
                  />
                </div>
              </ModalBody>

              <ModalFooter className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
                <Button
                  size="sm"
                  type="button"
                  onClick={handleClose}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer border-none"
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-xl h-10 cursor-pointer border-none flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Testimonio'
                  )}
                </Button>
              </ModalFooter>
            </form>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </section>
  );
};
