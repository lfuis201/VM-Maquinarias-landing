import React, { useState } from 'react';
import { Button, TextField, Label, Input, TextArea, Spinner } from '@heroui/react';
import { Plus, TrashBin, Pencil } from '@gravity-ui/icons';
import { useBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } from '../../../landing/hooks/useBlogs';
import type { Blog } from '../../../landing/types/blog';

export const BlogsTab: React.FC = () => {
  const { data: blogs = [], isLoading, error: queryError } = useBlogsQuery();
  const createMutation = useCreateBlogMutation();
  const updateMutation = useUpdateBlogMutation();
  const deleteMutation = useDeleteBlogMutation();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Form Field States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  const startCreate = () => {
    setSelectedBlog(null);
    setTitle('');
    setCategory('Facturación');
    setExcerpt('');
    setContent('');
    setReadTime('5 min read');
    setImage('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80');
    
    // Set current date in Spanish format: e.g. "25 May 2026"
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const d = new Date();
    setDate(`${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`);
    setIsActive(true);
    setIsEditing(true);
  };

  const startEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setTitle(blog.title || '');
    setCategory(blog.category || '');
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setReadTime(blog.readTime || '5 min read');
    setImage(blog.image || '');
    setDate(blog.date || '');
    setIsActive(blog.isActive !== false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedBlog(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este artículo del blog?')) return;
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteMutation.mutateAsync(id);
      setSuccessMessage('Artículo eliminado con éxito.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError('Error al eliminar el artículo. Verifica la conexión con el backend.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim() || !category.trim()) {
      alert('Por favor completa todos los campos requeridos (Título, Categoría, Resumen y Contenido).');
      return;
    }

    const payload: Partial<Blog> = {
      title,
      category,
      excerpt,
      content,
      readTime,
      image,
      date,
      isActive,
    };

    try {
      if (selectedBlog) {
        await updateMutation.mutateAsync({ id: selectedBlog.id, data: payload });
        setSuccessMessage('Artículo actualizado con éxito.');
      } else {
        await createMutation.mutateAsync(payload);
        setSuccessMessage('Artículo creado con éxito.');
      }
      setTimeout(() => setSuccessMessage(null), 4000);
      setIsEditing(false);
      setSelectedBlog(null);
    } catch (err: any) {
      const backendMessage = err.response?.data?.message || err.message;
      alert(backendMessage || 'Error al guardar el artículo.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Artículos de Blog</h2>
          <p className="text-xs text-slate-500">Administra las guías, tutoriales y artículos informativos publicados en tu página.</p>
        </div>
        {!isEditing && (
          <Button
            onPress={startCreate}
            className="bg-slate-900 text-white font-bold h-10 px-4 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuevo Artículo
          </Button>
        )}
      </div>

      {successMessage && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-4 py-3 rounded-xl font-semibold animate-fade-in">
          {successMessage}
        </div>
      )}

      {(error || queryError) && (
        <div className="bg-rose-50 text-rose-800 border border-rose-200 text-xs px-4 py-3 rounded-xl font-semibold animate-fade-in">
          {error || 'Error al conectar con el servidor para obtener los artículos del blog.'}
        </div>
      )}

      {isEditing ? (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-6">
            {selectedBlog ? 'Editar Artículo de Blog' : 'Crear Nuevo Artículo de Blog'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <TextField value={title} onChange={setTitle} className="flex flex-col w-full gap-1.5">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Título del Artículo *</Label>
                  <Input
                    placeholder="Ej. Guía Definitiva: Cómo emitir Boletas y Facturas Electrónicas"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all"
                  />
                </TextField>

                <div className="grid grid-cols-2 gap-4">
                  <TextField value={category} onChange={setCategory} className="flex flex-col w-full gap-1.5">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Categoría *</Label>
                    <Input
                      placeholder="Ej. Facturación, Ventas"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all"
                    />
                  </TextField>

                  <TextField value={readTime} onChange={setReadTime} className="flex flex-col w-full gap-1.5">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tiempo de Lectura</Label>
                    <Input
                      placeholder="Ej. 6 min read"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all"
                    />
                  </TextField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <TextField value={date} onChange={setDate} className="flex flex-col w-full gap-1.5">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Fecha de Publicación</Label>
                    <Input
                      placeholder="Ej. 25 May 2026"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all"
                    />
                  </TextField>

                  <div className="flex flex-col w-full gap-1.5">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Estado de Visibilidad</Label>
                    <div className="flex items-center gap-3 pt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-semibold text-slate-700">
                          {isActive ? 'Publicado' : 'Borrador / Oculto'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <TextField value={image} onChange={setImage} className="flex flex-col w-full gap-1.5">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Imagen del Artículo (URL)</Label>
                  <Input
                    placeholder="URL de Unsplash o similar"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all"
                  />
                </TextField>

                {image && (
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={image} alt="Vista previa" className="w-full h-full object-cover animate-fade-in" />
                  </div>
                )}
              </div>

              <div className="space-y-4 flex flex-col">
                <TextField value={excerpt} onChange={setExcerpt} className="flex flex-col w-full gap-1.5">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Resumen / Excerpt *</Label>
                  <TextArea
                    rows={3}
                    placeholder="Una breve descripción introductoria que se muestra en la lista de blogs."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[80px]"
                  />
                </TextField>

                <TextField value={content} onChange={setContent} className="flex flex-col w-full flex-1 gap-1.5">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contenido Completo *</Label>
                  <TextArea
                    rows={12}
                    placeholder="Escribe el artículo aquí. Puedes usar saltos de línea para separar los párrafos..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y flex-grow min-h-[300px]"
                  />
                </TextField>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                onPress={handleCancel}
                className="bg-slate-100 text-slate-700 font-bold h-11 px-6 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isDisabled={createMutation.isPending || updateMutation.isPending}
                className="bg-indigo-600 text-white font-bold h-11 px-6 rounded-xl hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Guardando...
                  </>
                ) : (
                  'Guardar Artículo'
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm gap-3">
              <Spinner size="lg" color="indigo" />
              <p className="text-sm font-semibold text-slate-500">Cargando artículos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {blog.image && (
                      <div className="h-40 w-full overflow-hidden relative">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full shadow ${blog.isActive !== false ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                          {blog.isActive !== false ? 'Publicado' : 'Borrador'}
                        </span>
                      </div>
                    )}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        <span>{blog.category}</span>
                        <span className="text-slate-400 font-semibold">{blog.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-indigo-650 transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-4">
                    <Button
                      onPress={() => startEdit(blog)}
                      className="flex-1 bg-slate-100 text-slate-700 font-bold h-9 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Editar
                    </Button>
                    <Button
                      onPress={() => handleDelete(blog.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold h-9 w-9 min-w-9 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <TrashBin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {blogs.length === 0 && (
                <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0014.586 3H13m0 0a2 2 0 012 2v1" />
                  </svg>
                  <p className="text-slate-600 font-medium text-sm">No hay artículos registrados.</p>
                  <Button
                    onPress={startCreate}
                    className="bg-slate-900 text-white font-bold h-9 px-4 rounded-xl mt-4 cursor-pointer"
                  >
                    Crear Primer Artículo
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
