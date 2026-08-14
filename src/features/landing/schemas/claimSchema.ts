import * as z from 'zod';

export const claimSchema = z.object({
  fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres'),
  docType: z.enum(['DNI', 'RUC', 'CE', 'Pasaporte']),
  docNumber: z.string().min(5, 'El número de documento debe tener al menos 5 caracteres').max(20, 'El número de documento no puede exceder los 20 caracteres'),
  phone: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos'),
  email: z.string().email('Ingrese un correo electrónico válido'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  isMinor: z.boolean().default(false),
  guardianName: z.string().optional().or(z.literal('')),
  guardianDocType: z.enum(['DNI', 'CE', 'Pasaporte']).default('DNI'),
  guardianDocNumber: z.string().optional().or(z.literal('')),
  goodType: z.enum(['Producto', 'Servicio']),
  claimedAmount: z.string().optional().or(z.literal('')),
  description: z.string().min(5, 'Ingrese una descripción del bien o servicio'),
  claimType: z.enum(['Reclamo', 'Queja']),
  details: z.string().min(10, 'El detalle debe tener al menos 10 caracteres'),
  request: z.string().min(5, 'El pedido/solicitud debe tener al menos 5 caracteres'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Debe aceptar la declaración de veracidad para enviar.' }),
  }),
}).superRefine((data, ctx) => {
  if (data.isMinor) {
    if (!data.guardianName || data.guardianName.trim().length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El nombre del apoderado es obligatorio para menores de edad',
        path: ['guardianName'],
      });
    }
    if (!data.guardianDocNumber || data.guardianDocNumber.trim().length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El documento del apoderado es obligatorio para menores de edad',
        path: ['guardianDocNumber'],
      });
    }
  }
});

export type ClaimFormData = z.infer<typeof claimSchema>;
