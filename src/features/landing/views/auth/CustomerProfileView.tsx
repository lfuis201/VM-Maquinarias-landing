import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Label, Input, toast } from '@heroui/react';
import { useAuthStore } from '../../../dashboard/stores/authStore';
import { AuthService } from '../../../../shared/services/auth/authService';

const profileSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos').or(z.literal('')),
  password: z.string().optional().refine(val => !val || val.length >= 6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
  confirmPassword: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface CustomerProfileViewProps {
  onNavigate: (view: string, subId?: string) => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({ onNavigate }) => {
  const { user, token, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  // If user is not authenticated, redirect
  React.useEffect(() => {
    if (!token || !user) {
      onNavigate('cliente-auth');
    }
  }, [token, user, onNavigate]);

  const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const payload: any = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || undefined,
      };

      if (data.password) {
        payload.password = data.password;
      }

      const updatedUser = await AuthService.updateProfile(payload);
      
      if (token) {
        setAuth(token, updatedUser);
      }
      toast.success('¡Perfil actualizado con éxito!');
    } catch (err: any) {
      console.error(err);
      const backendMessage = err.response?.data?.message;
      const formattedMsg = Array.isArray(backendMessage)
        ? backendMessage.join(', ')
        : backendMessage || 'Error al actualizar el perfil. Intente de nuevo.';
      toast.danger(formattedMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const isGoogleUser = user?.lastName === 'GoogleMock' || user?.email?.includes('google') || !user?.password;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-view">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('catalogo')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold mb-6 cursor-pointer"
      >
        ← Volver al Catálogo
      </button>

      <div className="bg-white border border-slate-100 shadow-xl shadow-slate-100/50 rounded-3xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-base font-black tracking-tight uppercase">Mi Perfil</h3>
            <p className="text-[11px] text-slate-350 mt-0.5">
              Gestiona tus datos personales y credenciales de acceso.
            </p>
          </div>
          {isGoogleUser && (
            <span className="bg-sky-500/25 border border-sky-400/40 text-sky-200 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
              Google Auth
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8 text-left">
          {isGoogleUser && (
            <div className="bg-sky-50 border border-sky-200 text-sky-950 text-xs p-4 rounded-2xl mb-6 leading-relaxed">
              <p className="font-bold mb-1">💡 Cuenta vinculada a Google</p>
              Iniciaste sesión usando tu cuenta de Google. Si deseas, puedes establecer una contraseña local a la derecha. Esto te permitirá ingresar a tu cuenta de ambas formas: con Google o con tu correo y contraseña asignada.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Personal details */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-1 h-5 bg-slate-900 rounded-full"></span>
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                    Datos Personales
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField value={field.value} onChange={field.onChange} className="space-y-1.5 flex flex-col w-full">
                        <Label className="text-xs font-bold text-slate-705 uppercase tracking-wider">Nombre</Label>
                        <Input
                          placeholder="Juan"
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                            errors.firstName ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                          }`}
                        />
                        {errors.firstName && (
                          <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                            {errors.firstName.message}
                          </span>
                        )}
                      </TextField>
                    )}
                  />

                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField value={field.value} onChange={field.onChange} className="space-y-1.5 flex flex-col w-full">
                        <Label className="text-xs font-bold text-slate-705 uppercase tracking-wider">Apellidos</Label>
                        <Input
                          placeholder="Pérez"
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                            errors.lastName ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                          }`}
                        />
                        {errors.lastName && (
                          <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                            {errors.lastName.message}
                          </span>
                        )}
                      </TextField>
                    )}
                  />
                </div>

                <div className="flex flex-col w-full space-y-1.5">
                  <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Correo Electrónico</Label>
                  <Input
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-400 text-sm cursor-not-allowed outline-none"
                  />
                  <span className="text-[10px] text-slate-400 font-medium leading-none">El correo no puede modificarse.</span>
                </div>

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField value={field.value} onChange={field.onChange} className="space-y-1.5 flex flex-col w-full">
                      <Label className="text-xs font-bold text-slate-705 uppercase tracking-wider">Número de Celular</Label>
                      <Input
                        placeholder="987654321"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                          errors.phone ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                          {errors.phone.message}
                        </span>
                      )}
                    </TextField>
                  )}
                />
              </div>

              {/* Right Column: Security/Password details */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="w-1 h-5 bg-slate-900 rounded-full"></span>
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                    Seguridad y Contraseña
                  </h4>
                </div>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField type="password" value={field.value} onChange={field.onChange} className="space-y-1.5 flex flex-col w-full">
                      <Label className="text-xs font-bold text-slate-705 uppercase tracking-wider">Nueva Contraseña</Label>
                      <Input
                        placeholder="••••••••"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                          errors.password ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                        }`}
                      />
                      {errors.password && (
                        <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                          {errors.password.message}
                        </span>
                      )}
                    </TextField>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField type="password" value={field.value} onChange={field.onChange} className="space-y-1.5 flex flex-col w-full">
                      <Label className="text-xs font-bold text-slate-705 uppercase tracking-wider">Confirmar Contraseña</Label>
                      <Input
                        placeholder="••••••••"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-slate-900 text-sm outline-none transition-all ${
                          errors.confirmPassword ? 'border-rose-500 focus:border-rose-600 bg-rose-50/10' : 'border-slate-205 focus:border-slate-800'
                        }`}
                      />
                      {errors.confirmPassword && (
                        <span className="text-[11px] text-rose-600 font-bold block mt-0.5">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </TextField>
                  )}
                />
                <p className="text-[10px] text-slate-405 leading-normal">
                  Deja los campos de contraseña en blanco si no deseas cambiarla.
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <Button
                type="button"
                onPress={() => onNavigate('catalogo')}
                isDisabled={isLoading}
                className="bg-slate-100 text-slate-700 font-bold h-11 px-6 rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isDisabled={isLoading}
                className="bg-slate-900 text-white font-bold h-11 px-6 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
