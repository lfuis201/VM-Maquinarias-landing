import * as z from 'zod';

export const leadSchema = z.object({
  fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres'),
  phone: z.string().min(7, 'El teléfono/celular debe tener al menos 7 dígitos'),
  email: z.string().email('Ingrese un correo electrónico válido'),
  businessType: z.enum(['bodega', 'restaurante', 'boutique', 'servicios', 'otros'], {
    errorMap: () => ({ message: 'Seleccione un giro de negocio válido' }),
  }),
  message: z.string().min(5, 'El mensaje o consulta debe tener al menos 5 caracteres'),
});

export type LeadFormData = z.infer<typeof leadSchema>;
