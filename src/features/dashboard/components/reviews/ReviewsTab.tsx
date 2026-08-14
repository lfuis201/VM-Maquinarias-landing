import React from 'react';
import { Button, toast } from '@heroui/react';
import { useAllReviewsQuery, useUpdateReviewMutation, useDeleteReviewMutation } from '../../../landing/hooks/useReviews';

export const ReviewsTab: React.FC = () => {
  const { data: reviewsData, isLoading, error } = useAllReviewsQuery();
  const updateReviewMutation = useUpdateReviewMutation();
  const deleteReviewMutation = useDeleteReviewMutation();

  const reviews = reviewsData || [];

  const handleToggleApproval = (id: string, currentApproval: boolean) => {
    updateReviewMutation.mutate(
      { id, payload: { isApproved: !currentApproval } },
      {
        onSuccess: () => {
          toast.success(
            currentApproval
              ? 'Testimonio desaprobado y ocultado de la página de inicio.'
              : 'Testimonio aprobado y publicado en la página de inicio.'
          );
        },
        onError: (err: any) => {
          console.error(err);
          toast.danger('Error al actualizar el estado de aprobación.');
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este testimonio permanentemente?')) {
      deleteReviewMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Testimonio eliminado permanentemente.');
        },
        onError: (err: any) => {
          console.error(err);
          toast.danger('Error al eliminar el testimonio.');
        },
      });
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? 'fill-current' : 'text-slate-200'}`}
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

  if (isLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-slate-900 border-t-transparent animate-spin"></div>
        <span className="text-xs text-slate-500 font-bold tracking-widest">Cargando testimonios...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3 text-red-500">
        <span className="font-bold">Error al cargar testimonios:</span>
        <span className="text-xs">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm text-left">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="p-4 text-slate-600 font-bold">Cliente</th>
              <th className="p-4 text-slate-600 font-bold">Empresa / Cargo</th>
              <th className="p-4 text-slate-600 font-bold">Calificación</th>
              <th className="p-4 text-slate-600 font-bold">Estado</th>
              <th className="p-4 text-slate-600 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex gap-3 items-start">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover mt-0.5 border border-slate-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
                        {getInitials(review.name)}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-slate-900">{review.name}</span>
                      <span className="text-[11px] text-slate-500 mt-1 italic max-w-sm block overflow-hidden text-ellipsis whitespace-pre-line leading-relaxed">
                        "{review.comment}"
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-slate-800">{review.company || 'No especificado'}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{review.role || 'No registrado'}</span>
                  </div>
                </td>
                <td className="p-4">{renderStars(review.rating)}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase border ${
                      review.isApproved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {review.isApproved ? 'Aprobado' : 'Pendiente'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      className={`font-bold text-xs cursor-pointer py-1.5 px-3 rounded-lg h-8 transition-colors flex items-center justify-center border-none shadow-sm ${
                        review.isApproved
                          ? 'bg-amber-500 hover:bg-amber-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                      onClick={() => handleToggleApproval(review.id, review.isApproved)}
                    >
                      {review.isApproved ? 'Desaprobar' : 'Aprobar'}
                    </button>
                    <button
                      className="font-bold text-xs cursor-pointer py-1.5 px-3 bg-white border border-slate-200 text-red-650 hover:bg-red-50 rounded-lg h-8 transition-all flex items-center justify-center shadow-sm"
                      onClick={() => handleDelete(review.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                  No hay testimonios registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
