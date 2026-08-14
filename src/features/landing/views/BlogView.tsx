import React, { useState } from 'react';
import { useBlogsQuery } from '../hooks/useBlogs';
import { Spinner } from '@heroui/react';
import type { Blog } from '../types/blog';

export const BlogView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Blog | null>(null);
  const { data: articles = [], isLoading, error } = useBlogsQuery();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Spinner size="lg" color="indigo" />
        <p className="text-sm font-semibold text-slate-500">Cargando artículos del blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 max-w-md mx-auto text-center px-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Error al cargar el blog</h3>
        <p className="text-xs text-slate-500">No pudimos conectar con el servidor para obtener los artículos. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 px-6 max-w-7xl mx-auto space-y-12 text-left">
      {selectedArticle ? (
        // Detailed Article View
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-650 hover:text-indigo-500 cursor-pointer transition-colors"
          >
            ← Volver al blog
          </button>

          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-550/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              {selectedArticle.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
              {selectedArticle.title}
            </h1>
            <div className="flex gap-4 text-xs text-slate-500 font-semibold">
              <span>{selectedArticle.date}</span>
              {selectedArticle.readTime && (
                <>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </>
              )}
            </div>
          </div>

          {selectedArticle.image && (
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-80 object-cover rounded-3xl border border-slate-100 shadow-sm"
            />
          )}

          <div className="text-slate-700 text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {selectedArticle.content}
          </div>
        </div>
      ) : (
        // Blog List View
        <>
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block">
              Nuestro Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Novedades, guías y consejos para tu negocio
            </h1>
            <p className="text-slate-600 text-base md:text-lg">
              Aprende sobre facturación electrónica, normativas de SUNAT y las mejores prácticas para administrar tu comercio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
            {articles.filter(a => a.isActive !== false).map((article) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-indigo-650 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center text-[10px] font-bold text-slate-500">
                  <span>{article.date}</span>
                  <span className="text-indigo-650 hover:underline">Leer más →</span>
                </div>
              </article>
            ))}

            {articles.filter(a => a.isActive !== false).length === 0 && (
              <div className="col-span-full text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
                <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0014.586 3H13m0 0a2 2 0 012 2v1" />
                </svg>
                <p className="text-sm font-semibold text-slate-600">No hay artículos publicados en este momento.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
