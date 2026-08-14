import React, { useState } from 'react';
import { Button, TextField, Label, Input, toast } from '@heroui/react';
// Usaremos la nueva imagen generada para los clientes
import bgImg from '../../../../assets/cliente_auth_bg.png'; 
import { AuthService } from '../../../../shared/services/auth/authService';
import { useAuthStore } from '../../../dashboard/stores/authStore';
import { useQueryClient } from '@tanstack/react-query';

interface CustomerAuthViewProps {
  onNavigate: (view: string, subId?: string) => void;
}

export const CustomerAuthView: React.FC<CustomerAuthViewProps> = ({ onNavigate }) => {
  const queryClient = useQueryClient();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    // 1. Cargar el script de Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const google = (window as any).google;
      if (google) {
        // Obtenemos el CLIENT_ID de las variables de entorno, o usamos uno dummy
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1029384756-dummyclientid.apps.googleusercontent.com';
        
        google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            setIsLoading(true);
            setError(null);
            try {
              // Enviamos el token de Google al Backend
              const res = await AuthService.googleLogin(response.credential);
              const token = res.token || res.backendToken || res.data?.backendToken || res.data?.token || (res as any).backendToken;
              const user = res.user || res.data?.user || (res as any).user;
              
              if (token && user) {
                useAuthStore.getState().setAuth(token, user);
                queryClient.clear();
                toast.success('¡Sesión iniciada con Google!');
                onNavigate('catalogo');
              } else {
                setError('No se pudo autenticar con Google. Inténtalo de nuevo.');
                toast.danger('No se pudo autenticar con Google. Inténtalo de nuevo.');
              }
            } catch (err: any) {
              console.error('Google auth error:', err);
              const msg = err.response?.data?.message || err.message || 'Error al conectar con el servidor para autenticación de Google.';
              let formattedMsg = Array.isArray(msg) ? msg.join(', ') : msg;
              if (formattedMsg.toLowerCase().includes('already registered') || formattedMsg.toLowerCase().includes('already exists') || formattedMsg.toLowerCase().includes('ya existe')) {
                formattedMsg = 'El correo electrónico ya está registrado. Por favor, inicia sesión.';
              }
              setError(formattedMsg);
              toast.danger(formattedMsg);
            } finally {
              setIsLoading(false);
            }
          },
        });

        // Renderizar el botón oficial de Google en el div asignado
        google.accounts.id.renderButton(
          document.getElementById('google-signin-btn'),
          {
            theme: 'outline',
            size: 'large',
            width: 320,
            text: isLogin ? 'signin_with' : 'signup_with',
            shape: 'rectangular'
          }
        );

        // Activa el prompt flotante en la esquina superior derecha (Google One Tap)
        google.accounts.id.prompt();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // LOGIN FLOW
        const response = await AuthService.login(email, password);
        const token = response.token || response.data?.token || response.data?.backendToken || (response as any).backendToken;
        if (token) {
          const user = response.user || response.data?.user || (response as any).user || {
            firstName: 'Cliente',
            lastName: 'Sistematízate',
            email,
            role: 'USER'
          };
          useAuthStore.getState().setAuth(token, user);
          queryClient.clear();
          toast.success('¡Sesión iniciada correctamente!');
          onNavigate('catalogo');
        } else {
          setError('Error al iniciar sesión: no se recibió token.');
          toast.danger('Error al iniciar sesión: no se recibió token.');
        }
      } else {
        // REGISTER FLOW
        const response = await AuthService.register({
          email,
          password,
          firstName: name,
          lastName,
          phone,
        });
        const token = response.token || response.data?.token || response.backendToken || response.data?.backendToken;
        if (token) {
          const user = response.user || response.data?.user || {
            firstName: name,
            lastName,
            email,
            phone,
            role: 'USER'
          };
          useAuthStore.getState().setAuth(token, user);
          queryClient.clear();
          toast.success('¡Cuenta creada exitosamente!');
          onNavigate('catalogo');
        } else {
          setError('Error al registrar usuario: no se recibió token.');
          toast.danger('Error al registrar usuario: no se recibió token.');
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      const msg = err.response?.data?.message || err.message || 'Error en el servidor al intentar autenticar.';
      let formattedMsg = Array.isArray(msg) ? msg.join(', ') : msg;
      if (formattedMsg.toLowerCase().includes('already registered') || formattedMsg.toLowerCase().includes('already exists') || formattedMsg.toLowerCase().includes('ya existe')) {
        formattedMsg = 'El correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.';
      }
      setError(formattedMsg);
      toast.danger(formattedMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row animate-view">
      {/* Left Column: Premium Full-Bleed Branding & Visuals (Hidden on small screens) */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden border-r border-slate-200">
        {/* Full cover background photo */}
        <img
          src={bgImg}
          alt="Sistematízate Cliente"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Glowing light overlay for text readability and branding */}
        <div className="absolute inset-0 bg-white/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-white/30" />

        {/* Text and Branding overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 z-10 text-slate-900">
          {/* Branding Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-black text-primary text-xl shadow-lg shadow-accent/25">
              S
            </div>
            <span className="font-extrabold text-lg uppercase tracking-widest text-slate-900">
              SISTEMATÍZATE
            </span>
          </div>

          {/* Bottom Brand Message */}
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Equipa tu negocio más rápido
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Crea tu cuenta para gestionar tus compras, guardar tus métodos de entrega favoritos y acceder a facturación automática.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Clean & Modern Form Panel (Light Theme) */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-8">
          
          <div className="space-y-3">
            {/* Small logo for mobile views */}
            <div 
              className="md:hidden w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-black text-primary text-2xl mb-4 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              S
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h2>
            <p className="text-sm text-slate-500">
              {isLogin ? 'Ingresa tus datos para continuar tu compra.' : 'Únete y agiliza tus próximas compras en Sistematízate.'}
            </p>
          </div>

          {/* Tabs para intercalar Login y Register */}
          <div className="flex border-b border-slate-200">
            <button
              className={`flex-1 pb-4 text-sm font-black transition-colors ${isLogin ? 'text-accent border-b-2 border-accent' : 'text-slate-400 hover:text-slate-600'}`}
              onClick={() => setIsLogin(true)}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 pb-4 text-sm font-black transition-colors ${!isLogin ? 'text-accent border-b-2 border-accent' : 'text-slate-400 hover:text-slate-600'}`}
              onClick={() => setIsLogin(false)}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl font-bold text-center animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <TextField value={name} onChange={setName} isRequired className="space-y-2 flex flex-col w-full">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nombre</Label>
                    <Input placeholder="Juan" className="w-full border border-slate-200 focus-within:border-slate-800 bg-slate-50 h-12 rounded-xl px-4 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all" />
                  </TextField>
                  <TextField value={lastName} onChange={setLastName} isRequired className="space-y-2 flex flex-col w-full">
                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Apellidos</Label>
                    <Input placeholder="Pérez" className="w-full border border-slate-200 focus-within:border-slate-800 bg-slate-50 h-12 rounded-xl px-4 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all" />
                  </TextField>
                </div>
                <TextField value={phone} onChange={setPhone} isRequired className="space-y-2 flex flex-col w-full">
                  <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Número de Celular</Label>
                  <Input placeholder="987654321" className="w-full border border-slate-200 focus-within:border-slate-800 bg-slate-50 h-12 rounded-xl px-4 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all" />
                </TextField>
              </>
            )}

            <TextField
              type="email"
              value={email}
              onChange={setEmail}
              isRequired
              className="space-y-2 flex flex-col w-full"
            >
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Dirección de Correo
              </Label>
              <Input
                placeholder="ejemplo@correo.com"
                className="w-full border border-slate-200 focus-within:border-slate-800 bg-slate-50 h-12 rounded-xl px-4 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
              />
            </TextField>

             <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              isRequired
              className="space-y-2 flex flex-col w-full"
            >
              <div className="flex justify-between items-end">
                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Contraseña
                </Label>
                {isLogin && (
                  <a href="#" className="text-xs font-bold text-accent hover:text-accent-light transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                )}
              </div>
              <div className="relative">
                <Input
                  placeholder="••••••••"
                  className="w-full border border-slate-200 focus-within:border-slate-800 bg-slate-50 h-12 rounded-xl pl-4 pr-12 text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </TextField>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-accent hover:bg-accent-light text-primary font-black h-12 rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                isLogin ? 'Ingresar a mi Cuenta' : 'Crear Cuenta y Continuar'
              )}
            </Button>

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-black uppercase tracking-wider">O también</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Google Sign In Button Container */}
            <div className="w-full flex justify-center">
              <div id="google-signin-btn" className="w-full max-w-[320px] min-h-[44px]"></div>
            </div>

            {/* Developer Mock Auth Bypass (Visible only in dev mode) */}
            {import.meta.env.DEV && (
              <div className="mt-3 p-3 bg-accent/5 rounded-xl border border-accent/25 flex flex-col items-center">
                <span className="text-[10px] text-accent font-black uppercase tracking-wider mb-2">
                  Bypass de Pruebas (Solo Desarrollo)
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    setIsLoading(true);
                    setError(null);
                    try {
                      const mockEmail = `cliente-${Math.floor(Math.random() * 1000)}@sistematizate.pe`;
                      const res = await AuthService.googleLogin(mockEmail);
                      const token = res.token || res.backendToken || res.data?.backendToken || res.data?.token || (res as any).backendToken;
                      const user = res.user || res.data?.user || (res as any).user;
                      if (token && user) {
                        useAuthStore.getState().setAuth(token, user);
                        queryClient.clear();
                        toast.success('¡Sesión de prueba iniciada!');
                        onNavigate('catalogo');
                      } else {
                        setError('No se pudo simular el login con Google.');
                        toast.danger('No se pudo simular el login con Google.');
                      }
                    } catch (err: any) {
                      const msg = err.response?.data?.message || 'Error al simular login.';
                      setError(msg);
                      toast.danger(msg);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  🚀 Autocrear y Entrar con Google (Mock)
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
