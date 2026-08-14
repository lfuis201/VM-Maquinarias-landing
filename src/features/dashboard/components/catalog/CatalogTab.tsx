import React, { useState } from 'react';
import { Button, Skeleton } from '@heroui/react';
import { Plus, Box } from '@gravity-ui/icons';
import type { Product } from '../../types/catalog';
import { ProductForm } from './ProductForm';
import { ProductCard } from './ProductCard';
import {
  useProductsQuery,
  useDeleteProductMutation,
} from '../../hooks/useCatalog';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex flex-col justify-between h-[300px]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-20 h-5 rounded-full" />
          <Skeleton className="w-24 h-4 rounded-md" />
        </div>
        <Skeleton className="w-3/4 h-5 rounded-md mb-2.5" />
        <Skeleton className="w-full h-4 rounded-md mb-2" />
        <Skeleton className="w-5/6 h-4 rounded-md mb-4" />
        
        <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="w-16 h-3 rounded-md" />
            <Skeleton className="w-12 h-3 rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <Skeleton className="w-1/2 h-9 rounded-xl" />
        <Skeleton className="w-1/2 h-9 rounded-xl" />
      </div>
    </div>
  );
};

export const CatalogTab: React.FC = () => {
  // React Query Hooks
  const { data: products = [], isLoading, error: queryError } = useProductsQuery();
  const deleteMutation = useDeleteProductMutation();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm('¿Está seguro de que desea eliminar este producto del catálogo?')) return;

    setError(null);
    setSuccessMessage(null);
    try {
      await deleteMutation.mutateAsync(id);
      setSuccessMessage('Producto eliminado con éxito.');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setError('Error al eliminar el producto. Verifica la conexión con el backend.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedProduct(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Catálogo de Equipos</h2>
          <p className="text-xs text-slate-500">Administra los terminales, impresoras y lectores de barras visibles en la landing page.</p>
        </div>
        {!isEditing && (
          <Button
            onPress={() => {
              setSelectedProduct(undefined);
              setIsEditing(true);
            }}
            className="bg-slate-900 text-white font-bold h-10 px-4 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Agregar Producto
          </Button>
        )}
      </div>

      {successMessage && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-4 py-3 rounded-xl">
          {successMessage}
        </div>
      )}

      {(error || queryError) && (
        <div className="bg-rose-50 text-rose-800 border border-rose-200 text-xs px-4 py-3 rounded-xl">
          {error || 'Error al conectar con el servidor para obtener los productos.'}
        </div>
      )}

      {isEditing ? (
        <ProductForm
          product={selectedProduct}
          onCancel={handleCancel}
        />
      ) : (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              
              {products.length === 0 && (
                <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Box className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 font-medium mt-2 text-sm">No hay productos registrados en el catálogo.</p>
                  <Button
                    onPress={() => setIsEditing(true)}
                    className="bg-slate-900 text-white font-bold h-9 px-4 rounded-xl mt-4"
                  >
                    Crear Primer Producto
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
