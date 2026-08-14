import React, { useState } from 'react';
import { Button, TextField, Label, Input } from '@heroui/react';
import decisionesImg from '../../../assets/funcionalidades/decisiones.jpg';
import { useLogin } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';

interface LoginViewProps {
  onLoginSuccess: (token: string, user: any) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@sistematizate.pe');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginMutation.mutateAsync({ email, password });
      const token = response.token || response.data?.token || response.data?.backendToken;
      if (response && token) {
        const user = response.user || response.data?.user || {
          firstName: 'Admin',
          lastName: 'Sistematízate',
          email,
          role: 'Administrador'
        };
        useAuthStore.getState().setAuth(token, user);
        onLoginSuccess(token, user);
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      console.warn('Backend login offline or failed, checking mock credentials...', err);
    }

    // Fallback to mock credentials for offline development
    if (email === 'admin@sistematizate.pe' && password === 'Admin123!') {
      const authToken = 'mock-admin-token-12345';
      const userData = {
        firstName: 'Administrador',
        lastName: 'Sistematízate',
        email: 'admin@sistematizate.pe',
        role: 'Administrador'
      };
      
      useAuthStore.getState().setAuth(authToken, userData);
      onLoginSuccess(authToken, userData);
    } else {
      setError('Credenciales incorrectas. (Usa admin@sistematizate.pe / Admin123!)');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row animate-view">
      {/* Left Column: Premium Full-Bleed Branding & Visuals (Hidden on small screens) */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden border-r border-slate-200">
        {/* Full cover background photo of business managers collaborating */}
        <img
          src={decisionesImg}
          alt="Sistematízate Admin"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Glowing light overlay for text readability and branding */}
        <div className="absolute inset-0 bg-white/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-white/30" />

        {/* Text and Branding overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 z-10 text-slate-900">
          {/* Branding Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-slate-900/25">
              S
            </div>
            <span className="font-extrabold text-lg uppercase tracking-widest text-slate-900">
              SISTEMATÍZATE <span className="text-slate-600">ADMIN</span>
            </span>
          </div>

          {/* Bottom Brand Message */}
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Lidera tu negocio con decisiones inteligentes
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Monitorea tus ventas, personaliza la landing page y automatiza tus reportes con un sistema potente e intuitivo de facturación y gestión comercial.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Clean & Modern Form Panel (Light Theme) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3">
            {/* Small logo for mobile views */}
            <div className="md:hidden w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white text-2xl mb-4">
              S
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Iniciar Sesión
            </h2>
            <p className="text-sm text-slate-500">
              Ingresa tus credenciales administrativas para acceder a la consola.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-650 text-xs p-3.5 rounded-xl font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="ejemplo@sistematizate.pe"
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
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Contraseña
              </Label>
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
              isDisabled={isLoading || loginMutation.isPending}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl shadow-lg shadow-slate-900/10 transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              {isLoading || loginMutation.isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Ingresar al CMS'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
