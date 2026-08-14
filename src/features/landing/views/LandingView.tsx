import React, { useState, useEffect } from 'react';

import { HomeView } from './HomeView';
import { NosotrosView } from './NosotrosView';
import { PlanesView } from './PlanesView';
import { BlogView } from './BlogView';
import { ContactoView } from './ContactoView';
import { ReservasView } from './ReservasView';
import { PoliticaView } from './PoliticaView';
import { TerminosView } from './TerminosView';
import { FactoryView } from './FactoryView';
import { RestauranteView } from './RestauranteView';
import { ReclamacionesView } from './ReclamacionesView';
import { ServiciosView } from './ServiciosView';
import { Header } from '../components/Header';
import type { ViewType } from '../components/Header';
import { Footer } from '../components/Footer';
import { FloatingSocials } from '../components/FloatingSocials';

// Funcionalidad Views
import { FlujoCajaView } from './funcionalidades/FlujoCajaView';
import { InventarioView } from './funcionalidades/InventarioView';
import { DispositivosView } from './funcionalidades/DispositivosView';
import { DecisionesDatosView } from './funcionalidades/DecisionesDatosView';
import { ContactosEmpleadosView } from './funcionalidades/ContactosEmpleadosView';
import { FormalizaNegocioView } from './funcionalidades/FormalizaNegocioView';
import { CatalogoView } from './catalogo/CatalogoView';
import { EquipoDetailView } from './catalogo/components/EquipoDetailView';
import { CartView } from './catalogo/CartView';
import { CheckoutView } from './catalogo/CheckoutView';
import { CustomerAuthView } from './auth/CustomerAuthView';
import { CustomerProfileView } from './auth/CustomerProfileView';
import { CustomerOrdersView } from './auth/CustomerOrdersView';
import { DashboardView } from '../../dashboard/views/DashboardView';
import { LoginView } from '../../dashboard/auth/LoginView';
import { useAuthStore } from '../../dashboard/stores/authStore';
import { AuthService } from '../../../shared/services/auth/authService';

const pathToView: Record<string, ViewType> = {
  '/': 'home',
  '/inicio': 'home',
  '/servicios': 'servicios',
  '/nosotros': 'nosotros',
  '/planes': 'planes',
  '/blog': 'blog',
  '/contacto': 'contacto',
  '/reservas': 'reservas',
  '/factory': 'factory',
  '/restaurante': 'restaurante',
  '/politica-de-privacidad': 'politica',
  '/terminos-y-condiciones': 'terminos',
  '/libro-de-reclamaciones': 'reclamaciones',
  '/flujo-de-caja': 'caja',
  '/inventario': 'inventario',
  '/dispositivos': 'dispositivos',
  '/decisiones-datos': 'decisiones',
  '/contactos-empleados': 'contactos',
  '/formalizar-negocio': 'formaliza',
  '/catalogo': 'catalogo',
  '/carrito': 'cart',
  '/checkout': 'checkout',
  '/dashboard': 'dashboard',
  '/login': 'login',
  '/mi-cuenta': 'cliente-auth',
  '/mi-perfil': 'cliente-perfil',
  '/mis-pedidos': 'cliente-pedidos',
};

const viewToPath: Record<ViewType, string> = {
  home: '/',
  servicios: '/servicios',
  nosotros: '/nosotros',
  planes: '/planes',
  blog: '/blog',
  contacto: '/contacto',
  reservas: '/reservas',
  factory: '/factory',
  restaurante: '/restaurante',
  politica: '/politica-de-privacidad',
  terminos: '/terminos-y-condiciones',
  reclamaciones: '/libro-de-reclamaciones',
  caja: '/flujo-de-caja',
  inventario: '/inventario',
  dispositivos: '/dispositivos',
  decisiones: '/decisiones-datos',
  contactos: '/contactos-empleados',
  formaliza: '/formalizar-negocio',
  catalogo: '/catalogo',
  'catalogo-detail': '/catalogo',
  cart: '/carrito',
  checkout: '/checkout',
  dashboard: '/dashboard',
  login: '/login',
  'cliente-auth': '/mi-cuenta',
  'cliente-perfil': '/mi-perfil',
  'cliente-pedidos': '/mis-pedidos',
};

export const LandingView: React.FC = () => {
  const getInitialView = (): ViewType => {
    const path = window.location.pathname;
    if (path.startsWith('/catalogo/')) {
      return 'catalogo-detail';
    }
    const target = path.startsWith('/dashboard') ? 'dashboard' : (pathToView[path] || 'home');
    
    const currentToken = localStorage.getItem('adminToken');
    const currentUserStr = localStorage.getItem('adminUser');
    let isAdmin = false;
    if (currentUserStr) {
      try {
        const parsed = JSON.parse(currentUserStr);
        isAdmin = parsed?.role === 'Administrador' || parsed?.role === 'ADMIN';
      } catch (e) {}
    }

    if (target === 'dashboard' && (!currentToken || !isAdmin)) {
      return 'login';
    }
    if (target === 'login' && currentToken && isAdmin) {
      return 'dashboard';
    }
    return target;
  };

  const [currentView, setCurrentView] = useState<ViewType>(getInitialView);
  const token = useAuthStore((state) => state.token);
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Cargar Google One Tap globalmente para la Landing Page si no está logueado
  useEffect(() => {
    const currentToken = token || localStorage.getItem('adminToken');
    if (currentToken) return;

    // No mostrar el prompt si el usuario está en el dashboard de administrador o en el login de administrador
    if (currentView === 'dashboard' || currentView === 'login') return;

    // 1. Cargar el script de Google
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const google = (window as any).google;
      if (google) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1029384756-dummyclientid.apps.googleusercontent.com';
        
        google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            try {
              const res = await AuthService.googleLogin(response.credential);
              const loginToken = res.token || res.backendToken || res.data?.backendToken || res.data?.token || (res as any).backendToken;
              const user = res.user || res.data?.user || (res as any).user;
              
              if (loginToken && user) {
                useAuthStore.getState().setAuth(loginToken, user);
              }
            } catch (err) {
              console.error('Error en One Tap auto login:', err);
            }
          },
        });

        // Activa el modal flotante de Google One Tap en la esquina superior derecha
        google.accounts.id.prompt();
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [token, currentView]);

  useEffect(() => {
    const currentToken = token || localStorage.getItem('adminToken');
    const currentUser = useAuthStore.getState().user;
    const isAdmin = currentUser?.role === 'Administrador' || currentUser?.role === 'ADMIN';

    if (!currentToken && currentView === 'dashboard') {
      navigateToView('login');
    } else if (currentToken && currentView === 'login' && isAdmin) {
      navigateToView('dashboard');
    }
  }, [token, currentView]);

  const navigateToView = (view: ViewType, subId?: string) => {
    let targetView = view;
    const currentToken = useAuthStore.getState().token || localStorage.getItem('adminToken');
    const currentUser = useAuthStore.getState().user;
    const isAdmin = currentUser?.role === 'Administrador' || currentUser?.role === 'ADMIN';

    if (view === 'dashboard') {
      if (!currentToken || !isAdmin) {
        targetView = 'login';
      }
    } else if (view === 'login' && currentToken && isAdmin) {
      targetView = 'dashboard';
    }

    setCurrentView(targetView);
    let path = viewToPath[targetView] || '/';
    if (targetView === 'catalogo-detail' && subId) {
      path = `/catalogo/${subId}`;
    }
    if (window.location.pathname !== path) {
      window.history.pushState({ view: targetView, subId }, '', path);
    }
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const currentToken = useAuthStore.getState().token || localStorage.getItem('adminToken');
      const currentUser = useAuthStore.getState().user;
      const isAdmin = currentUser?.role === 'Administrador' || currentUser?.role === 'ADMIN';

      if (event.state && event.state.view) {
        let view = event.state.view as ViewType;
        if (view === 'dashboard' && (!currentToken || !isAdmin)) {
          view = 'login';
        } else if (view === 'login' && currentToken && isAdmin) {
          view = 'dashboard';
        }
        setCurrentView(view);
      } else {
        const path = window.location.pathname;
        if (path.startsWith('/catalogo/')) {
          setCurrentView('catalogo-detail');
        } else {
          let target = path.startsWith('/dashboard') ? 'dashboard' : (pathToView[path] || 'home');
          if (target === 'dashboard' && (!currentToken || !isAdmin)) {
            target = 'login';
          } else if (target === 'login' && currentToken && isAdmin) {
            target = 'dashboard';
          }
          setCurrentView(target);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial state in history if not already set
    const path = window.location.pathname;
    let initialView = pathToView[path] || 'home';
    let subId = undefined;
    if (path.startsWith('/catalogo/')) {
      initialView = 'catalogo-detail';
      const parts = path.split('/');
      subId = parts[parts.length - 1];
    }
    
    const currentToken = useAuthStore.getState().token || localStorage.getItem('adminToken');
    const currentUser = useAuthStore.getState().user;
    const isAdmin = currentUser?.role === 'Administrador' || currentUser?.role === 'ADMIN';

    if (initialView === 'dashboard' && (!currentToken || !isAdmin)) {
      initialView = 'login';
      window.history.replaceState({ view: 'login', subId }, '', '/login');
    } else if (initialView === 'login' && currentToken && isAdmin) {
      initialView = 'dashboard';
      window.history.replaceState({ view: 'dashboard', subId }, '', '/dashboard');
    } else {
      window.history.replaceState({ view: initialView, subId }, '', path);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'servicios':
        return <ServiciosView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'nosotros':
        return <NosotrosView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'planes':
        return <PlanesView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'blog':
        return <BlogView />;
      case 'contacto':
        return <ContactoView />;
      case 'reservas':
        return <ReservasView />;
      case 'factory':
        return <FactoryView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'restaurante':
        return <RestauranteView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'politica':
        return <PoliticaView />;
      case 'terminos':
        return <TerminosView />;
      case 'reclamaciones':
        return <ReclamacionesView />;
      case 'caja':
        return <FlujoCajaView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'inventario':
        return <InventarioView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'dispositivos':
        return <DispositivosView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'decisiones':
        return <DecisionesDatosView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'contactos':
        return <ContactosEmpleadosView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'formaliza':
        return <FormalizaNegocioView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'catalogo':
        return <CatalogoView onNavigate={(view, subId) => navigateToView(view as ViewType, subId)} />;
      case 'catalogo-detail': {
        const pathParts = window.location.pathname.split('/');
        const equipoId = pathParts[pathParts.length - 1] || 'terminal';
        return <EquipoDetailView equipoId={equipoId} onNavigate={(view, subId) => navigateToView(view as ViewType, subId)} />;
      }
      case 'cart':
        return <CartView onNavigate={(view, subId) => navigateToView(view as ViewType, subId)} />;
      case 'checkout':
        return <CheckoutView onNavigate={(view, subId) => navigateToView(view as ViewType, subId)} />;
      case 'dashboard':
        return <DashboardView onNavigate={(view) => navigateToView(view as ViewType)} />;
      case 'login':
        return (
          <LoginView
            onLoginSuccess={() => {
              navigateToView('dashboard');
            }}
          />
        );
      case 'cliente-auth':
        return <CustomerAuthView onNavigate={(view, subId) => navigateToView(view as ViewType, subId)} />;
      case 'cliente-perfil':
        return <CustomerProfileView onNavigate={(view, subId) => navigateToView(view as ViewType, subId)} />;
      case 'cliente-pedidos':
        return <CustomerOrdersView onNavigate={(view, subId) => navigateToView(view as ViewType, subId)} />;
      default:
        return <HomeView onNavigate={(view) => navigateToView(view as ViewType)} />;
    }
  };

  if (currentView === 'dashboard' || currentView === 'login' || currentView === 'cliente-auth') {
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-primary selection:text-slate-950 font-sans antialiased overflow-x-hidden flex flex-col justify-between">

      <Header currentView={currentView} onNavigate={navigateToView} />

      {/* Main Content Area */}
      <main className="flex-grow animate-view" key={currentView}>
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateToView} />

      {/* Floating Buttons */}
      <FloatingSocials />
    </div>
  );
};
