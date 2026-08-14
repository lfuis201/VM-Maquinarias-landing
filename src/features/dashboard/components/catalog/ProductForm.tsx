import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Button, 
  TextField, 
  Label, 
  Input, 
  TextArea, 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectPopover, 
  ListBox, 
  ListBoxItem,
  toast 
} from '@heroui/react';
import { Box } from '@gravity-ui/icons';
import type { Product, ProductSpec } from '../../types/catalog';
import { useCreateProductMutation, useUpdateProductMutation } from '../../hooks/useCatalog';
import { productSchema, type ProductFormData } from '../../schemas/productSchema';

interface ProductFormProps {
  product?: Product;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onCancel,
}) => {
  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  // React Hook Form Configuration
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: 'terminales',
      model: '',
      price: undefined as any,
      priceTier1: undefined as any,
      priceTier2: undefined as any,
      priceTier3: undefined as any,
      description: '',
      inclusions: '',
    },
  });

  // Local state for specs, features, and images
  const [images, setImages] = useState<string[]>([]); // Existing image URLs
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [specs, setSpecs] = useState<ProductSpec[]>([{ key: '', value: '' }]);
  const [features, setFeatures] = useState<string[]>(['']);

  const categories = [
    { key: 'terminales', label: 'Terminales POS' },
    { key: 'impresoras', label: 'Impresoras Térmicas' },
    { key: 'lectores', label: 'Lectores de Barra/QR' },
    { key: 'otros', label: 'Otros Accesorios' }
  ];

  // Populate form values on product edit or reset
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category || 'terminales',
        model: product.model,
        price: product.price,
        priceTier1: product.priceTier1 || undefined as any,
        priceTier2: product.priceTier2 || undefined as any,
        priceTier3: product.priceTier3 || undefined as any,
        description: product.description,
        inclusions: product.inclusions || '',
      });
      
      const existingImages = product.images || [];
      setImages(existingImages);
      setImagePreviews(existingImages);
      setImageFiles([]);

      if (product.specs) {
        const specList = Object.entries(product.specs).map(([key, value]) => ({ key, value }));
        setSpecs(specList.length > 0 ? specList : [{ key: '', value: '' }]);
      } else {
        setSpecs([{ key: '', value: '' }]);
      }

      if (product.features && product.features.length > 0) {
        setFeatures(product.features);
      } else {
        setFeatures(['']);
      }
    } else {
      reset({
        name: '',
        category: 'terminales',
        model: '',
        price: undefined as any,
        priceTier1: undefined as any,
        priceTier2: undefined as any,
        priceTier3: undefined as any,
        description: '',
        inclusions: '',
      });
      setImages([]);
      setImagePreviews([]);
      setImageFiles([]);
      setSpecs([{ key: '', value: '' }]);
      setFeatures(['']);
    }
  }, [product, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Validate we don't exceed 5 images total
    const totalCurrentImages = images.length + imageFiles.length;
    if (totalCurrentImages + files.length > 5) {
      toast.danger('Puedes subir un máximo de 5 imágenes por producto.');
      return;
    }

    setImageFiles(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const onFormSubmit = async (data: ProductFormData) => {
    // Build specs record
    const specRecord: Record<string, string> = {};
    specs.forEach(s => {
      if (s.key.trim() && s.value.trim()) {
        specRecord[s.key.trim()] = s.value.trim();
      }
    });

    // Build features array
    const featureArray = features.map(f => f.trim()).filter(f => f !== '');

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('model', data.model);
    formData.append('price', data.price.toString());
    
    if (data.priceTier1 !== undefined && data.priceTier1 !== null && !isNaN(data.priceTier1)) {
      formData.append('priceTier1', data.priceTier1.toString());
    }
    if (data.priceTier2 !== undefined && data.priceTier2 !== null && !isNaN(data.priceTier2)) {
      formData.append('priceTier2', data.priceTier2.toString());
    }
    if (data.priceTier3 !== undefined && data.priceTier3 !== null && !isNaN(data.priceTier3)) {
      formData.append('priceTier3', data.priceTier3.toString());
    }
    formData.append('description', data.description);
    formData.append('specs', JSON.stringify(specRecord));
    formData.append('features', JSON.stringify(featureArray));
    
    if (data.inclusions) {
      formData.append('inclusions', data.inclusions);
    }

    // Append existing images that haven't been removed
    if (images.length === 0 && imageFiles.length === 0) {
      formData.append('images', '[]');
    } else {
      images.forEach(img => {
        formData.append('images', img);
      });
      // Append new files
      imageFiles.forEach(file => {
        formData.append('images', file);
      });
    }

    try {
      if (product && product.id) {
        await updateMutation.mutateAsync({ id: product.id, payload: formData });
        toast.success('¡Producto actualizado exitosamente!');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('¡Producto creado exitosamente!');
      }
      onCancel();
    } catch (err: any) {
      console.error('Error submitting product form:', err);
      const backendMessage = err.response?.data?.message;
      const formattedMsg = Array.isArray(backendMessage)
        ? backendMessage.join(', ')
        : backendMessage || 'Error al guardar el producto. Verifica la conexión con el backend.';
      toast.danger(formattedMsg);
    }
  };

  return (
    <div className="bg-white border border-slate-100 shadow-xl shadow-slate-100/50 rounded-3xl overflow-hidden max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 px-6 py-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
            <Box className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-black tracking-tight uppercase">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {product ? `Modificando: ${product.name}` : 'Completa los detalles para registrar un equipo en el catálogo'}
            </p>
          </div>
        </div>
        
        <button
          type="button"
          onClick={onCancel}
          className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all border border-white/5 cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8 text-left">
          
          {/* Section 1: General Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-1 h-5 bg-slate-900 rounded-full"></span>
              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                1. Información General
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    className="space-y-1.5 flex flex-col w-full"
                  >
                    <Label className="text-xs font-bold text-slate-750 uppercase tracking-wider">Nombre del Producto</Label>
                    <Input
                      placeholder="Ej. Impresora Térmica SUNAT 80mm"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                        errors.name ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                        {errors.name.message}
                      </span>
                    )}
                  </TextField>
                )}
              />

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    selectedKey={field.value}
                    onSelectionChange={(key) => field.onChange(key as string)}
                    className="space-y-1.5 flex flex-col w-full"
                  >
                    <Label className="text-xs font-bold text-slate-750 uppercase tracking-wider">Categoría</Label>
                    <SelectTrigger className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all flex items-center justify-between h-[42px] cursor-pointer ${
                      errors.category ? 'border-rose-500 focus-within:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus-within:border-slate-800'
                    }`}>
                      <SelectValue />
                      <span aria-hidden="true" className="text-slate-400 text-xs">▼</span>
                    </SelectTrigger>
                    <SelectPopover className="bg-white border border-slate-200 shadow-xl rounded-xl p-1 min-w-[200px]">
                      <ListBox className="outline-none py-1">
                        {categories.map((cat) => (
                          <ListBoxItem
                            key={cat.key}
                            id={cat.key}
                            className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer outline-none transition-colors"
                          >
                            {cat.label}
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </SelectPopover>
                    {errors.category && (
                      <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                        {errors.category.message}
                      </span>
                    )}
                  </Select>
                )}
              />

              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    className="space-y-1.5 flex flex-col w-full"
                  >
                    <Label className="text-xs font-bold text-slate-750 uppercase tracking-wider">Modelo / Código</Label>
                    <Input
                      placeholder="Ej. Sistematízate Print-80"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                        errors.model ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                      }`}
                    />
                    {errors.model && (
                      <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                        {errors.model.message}
                      </span>
                    )}
                  </TextField>
                )}
              />
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-1 h-5 bg-slate-900 rounded-full"></span>
              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                2. Estructura de Precios (S/.)
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    value={field.value !== undefined ? field.value.toString() : ''}
                    onChange={(val) => field.onChange(val === '' ? '' : parseFloat(val))}
                    className="space-y-1.5 flex flex-col w-full"
                  >
                    <Label className="text-xs font-bold text-slate-750 uppercase tracking-wider flex justify-between">
                      <span>Precio Base</span>
                      <span className="text-rose-550 font-black">*</span>
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="380.00"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                        errors.price ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                      }`}
                    />
                    {errors.price && (
                      <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                        {errors.price.message}
                      </span>
                    )}
                  </TextField>
                )}
              />

              <Controller
                name="priceTier1"
                control={control}
                render={({ field }) => (
                  <TextField
                    value={field.value !== undefined && field.value !== null ? field.value.toString() : ''}
                    onChange={(val) => field.onChange(val === '' ? '' : parseFloat(val))}
                    className="space-y-1.5 flex flex-col w-full"
                  >
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Precio Mayorista 1</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="380.00"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                        errors.priceTier1 ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                      }`}
                    />
                    {errors.priceTier1 && (
                      <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                        {errors.priceTier1.message}
                      </span>
                    )}
                  </TextField>
                )}
              />

              <Controller
                name="priceTier2"
                control={control}
                render={({ field }) => (
                  <TextField
                    value={field.value !== undefined && field.value !== null ? field.value.toString() : ''}
                    onChange={(val) => field.onChange(val === '' ? '' : parseFloat(val))}
                    className="space-y-1.5 flex flex-col w-full"
                  >
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Precio Mayorista 2</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="350.00"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                        errors.priceTier2 ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                      }`}
                    />
                    {errors.priceTier2 && (
                      <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                        {errors.priceTier2.message}
                      </span>
                    )}
                  </TextField>
                )}
              />

              <Controller
                name="priceTier3"
                control={control}
                render={({ field }) => (
                  <TextField
                    value={field.value !== undefined && field.value !== null ? field.value.toString() : ''}
                    onChange={(val) => field.onChange(val === '' ? '' : parseFloat(val))}
                    className="space-y-1.5 flex flex-col w-full"
                  >
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Precio Mayorista 3</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="320.00"
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                        errors.priceTier3 ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                      }`}
                    />
                    {errors.priceTier3 && (
                      <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                        {errors.priceTier3.message}
                      </span>
                    )}
                  </TextField>
                )}
              />
            </div>
          </div>

          {/* Section 3: Content and Gallery */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-1 h-5 bg-slate-900 rounded-full"></span>
              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                3. Contenido y Galería de Imágenes
              </h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      value={field.value}
                      onChange={field.onChange}
                      className="space-y-1.5 flex flex-col w-full"
                    >
                      <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Descripción del Producto</Label>
                      <TextArea
                        rows={3}
                        placeholder="Ingresa una descripción comercial detallada..."
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[90px] ${
                          errors.description ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                        }`}
                      />
                      {errors.description && (
                        <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                          {errors.description.message}
                        </span>
                      )}
                    </TextField>
                  )}
                />

                <Controller
                  name="inclusions"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      value={field.value}
                      onChange={field.onChange}
                      className="space-y-1.5 flex flex-col w-full"
                    >
                      <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">¿Qué incluye la caja? (Opcional)</Label>
                      <TextArea
                        rows={3}
                        placeholder="Ej. Cable USB de datos, fuente de poder, rollo térmico de prueba..."
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all resize-y min-h-[90px] ${
                          errors.inclusions ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                        }`}
                      />
                      {errors.inclusions && (
                        <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                          {errors.inclusions.message}
                        </span>
                      )}
                    </TextField>
                  )}
                />
              </div>

              {/* Image Gallery uploads */}
              <div className="space-y-1.5 flex flex-col w-full">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex justify-between">
                  <span>Galería de Imágenes (Máx. 5)</span>
                  <span className="text-slate-400 font-medium lowercase">({imagePreviews.length}/5 fotos)</span>
                </label>
                <div className="flex flex-col gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 h-full min-h-[220px] justify-between">
                  <div className="flex flex-wrap gap-2.5">
                    {imagePreviews.length > 0 ? (
                      imagePreviews.map((preview, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-white flex-shrink-0 shadow-sm group hover:scale-[1.03] transition-all">
                          <img
                            src={preview.startsWith('blob:') || preview.startsWith('http') || preview.startsWith('api/') ? (preview.startsWith('api/') ? `/${preview}` : preview) : `/${preview}`}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = [...imagePreviews];
                              newPreviews.splice(index, 1);
                              setImagePreviews(newPreviews);
                              
                              // Determine if it was an existing image or a new file
                              if (index < images.length) {
                                const newImages = [...images];
                                newImages.splice(index, 1);
                                setImages(newImages);
                              } else {
                                const fileIndex = index - images.length;
                                const newFiles = [...imageFiles];
                                newFiles.splice(fileIndex, 1);
                                setImageFiles(newFiles);
                              }
                            }}
                            className="absolute top-1 right-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 text-[10px] w-5 h-5 flex items-center justify-center cursor-pointer shadow opacity-90 group-hover:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-32 rounded-xl border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
                        <Box className="w-8 h-8 text-slate-355" />
                        <span>No hay imágenes cargadas para este producto</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-150">
                    <label className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer active:scale-95 ${imagePreviews.length >= 5 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                      + Agregar Imágenes
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        disabled={imagePreviews.length >= 5}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 text-center sm:text-left">Formatos: PNG, JPG, WEBP. Selecciona hasta 5 fotos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Specs & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Specs Builder */}
            <div className="space-y-3 bg-slate-50/50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Ficha Técnica / Specs</span>
                <Button
                  type="button"
                  onPress={handleAddSpec}
                  className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 h-8 px-3 rounded-lg text-xs font-bold shadow-sm"
                >
                  + Agregar Atributo
                </Button>
              </div>
              <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                {specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <TextField
                      value={spec.key}
                      onChange={(val) => handleSpecChange(index, 'key', val)}
                      className="w-1/2"
                    >
                      <Input
                        placeholder="Característica (ej. RAM)"
                        className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-xl px-3 py-2 text-slate-900 text-sm outline-none transition-all"
                      />
                    </TextField>
                    <TextField
                      value={spec.value}
                      onChange={(val) => handleSpecChange(index, 'value', val)}
                      className="w-1/2"
                    >
                      <Input
                        placeholder="Valor (ej. 8GB DDR4)"
                        className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-xl px-3 py-2 text-slate-900 text-sm outline-none transition-all"
                      />
                    </TextField>
                    {specs.length > 1 && (
                      <Button
                        type="button"
                        onPress={() => handleRemoveSpec(index)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 h-9 w-9 min-w-9 rounded-xl flex items-center justify-center cursor-pointer shadow-sm transition-colors"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features Builder */}
            <div className="space-y-3 bg-slate-50/50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Características Clave</span>
                <Button
                  type="button"
                  onPress={handleAddFeature}
                  className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 h-8 px-3 rounded-lg text-xs font-bold shadow-sm"
                >
                  + Agregar Beneficio
                </Button>
              </div>
              <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <TextField
                      value={feature}
                      onChange={(val) => handleFeatureChange(index, val)}
                      className="w-full"
                    >
                      <Input
                        placeholder="Ej. Pantalla capacitiva de alta respuesta táctil"
                        className="w-full bg-white border border-slate-200 focus:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 text-sm outline-none transition-all"
                      />
                    </TextField>
                    {features.length > 1 && (
                      <Button
                        type="button"
                        onPress={() => handleRemoveFeature(index)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 h-9 w-9 min-w-9 rounded-xl flex items-center justify-center cursor-pointer shadow-sm transition-colors"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-150">
            <Button
              type="button"
              onPress={onCancel}
              isDisabled={isSaving}
              className="bg-slate-100 text-slate-705 font-bold h-11 px-6 rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              isDisabled={isSaving}
              className="bg-slate-900 text-white font-bold h-11 px-6 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
            >
              {isSaving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Guardando...
                </>
              ) : (
                'Guardar Producto'
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

