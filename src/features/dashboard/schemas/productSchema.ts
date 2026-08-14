import * as z from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'El nombre del producto debe tener al menos 3 caracteres'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  model: z.string().min(1, 'El modelo/código es obligatorio'),
  price: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number({ required_error: 'El precio es obligatorio', invalid_type_error: 'Debe ser un número' })
      .positive('El precio debe ser un número positivo')
  ),
  priceTier1: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number().positive('El precio debe ser un número positivo').optional()
  ),
  priceTier2: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number().positive('El precio debe ser un número positivo').optional()
  ),
  priceTier3: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number().positive('El precio debe ser un número positivo').optional()
  ),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  inclusions: z.string().optional().or(z.literal('')),
});

export type ProductFormData = z.infer<typeof productSchema>;
