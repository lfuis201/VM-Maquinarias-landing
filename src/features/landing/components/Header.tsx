import React, { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import logo from '../../../assets/logo.png';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../../dashboard/stores/authStore';
import { useQueryClient } from '@tanstack/react-query';

export type ViewType = 'home' | 'servicios' | 'nosotros' | 'planes' | 'blog' | 'contacto' | 'reservas' | 'politica' | 'terminos' | 'factory' | 'restaurante' | 'reclamaciones' | 'caja' | 'inventario' | 'dispositivos' | 'decisiones' | 'contactos' | 'formaliza' | 'catalogo' | 'catalogo-detail' | 'dashboard' | 'login' | 'cart' | 'checkout' | 'cliente-auth' | 'cliente-perfil' | 'cliente-pedidos';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();

  const navigateToView = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-45 backdrop-blur-md bg-slate-950/90 border-b border-slate-800 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo Brand */}
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={() => navigateToView('home')}
        >
          <img src="/logo9.png" alt="Logo" className="h-12 w-auto object-contain" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-200">
          <button
            onClick={() => navigateToView('home')}
            className={`hover:text-primary-light transition-colors cursor-pointer ${currentView === 'home' ? 'text-primary-light font-extrabold' : ''}`}
          >
            Inicio
          </button>
          <button
            onClick={() => navigateToView('servicios')}
            className={`hover:text-primary-light transition-colors cursor-pointer ${currentView === 'servicios' ? 'text-primary-light font-extrabold' : ''}`}
          >
            Servicios
          </button>
          <button
            onClick={() => navigateToView('nosotros')}
            className={`hover:text-primary-light transition-colors cursor-pointer ${currentView === 'nosotros' ? 'text-primary-light font-extrabold' : ''}`}
          >
            Nosotros
          </button>
          <button
            onClick={() => navigateToView('catalogo')}
            className={`hover:text-primary-light transition-colors cursor-pointer ${(currentView === 'catalogo' || currentView === 'catalogo-detail') ? 'text-primary-light font-extrabold' : ''}`}
          >
            Equipos
          </button>
          <button
            onClick={() => navigateToView('factory')}
            className={`hover:text-primary-light transition-colors cursor-pointer ${currentView === 'factory' ? 'text-primary-light font-extrabold' : ''}`}
          >
            Batería Litio-ION
          </button>
          <button
            onClick={() => navigateToView('contacto')}
            className={`hover:text-primary-light transition-colors cursor-pointer ${currentView === 'contacto' ? 'text-primary-light font-extrabold' : ''}`}
          >
            Contacto
          </button>
          <button
            onClick={() => navigateToView('reservas')}
            className={`hover:text-primary-light transition-colors cursor-pointer ${currentView === 'reservas' ? 'text-primary-light font-extrabold' : ''}`}
          >
            Reservas
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            className="shadow-md shadow-primary/20 cursor-pointer font-bold"
            onClick={() => navigateToView('planes')}
          >
            Cotizar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-6 py-4 space-y-4 shadow-inner">
          <nav className="flex flex-col gap-3.5 text-sm font-bold text-slate-200">
            <button
              onClick={() => navigateToView('home')}
              className={`text-left hover:text-primary-light py-1.5 cursor-pointer ${currentView === 'home' ? 'text-primary-light' : ''}`}
            >
              Inicio
            </button>
            <button
              onClick={() => navigateToView('restaurante')}
              className={`text-left hover:text-primary-light py-1.5 cursor-pointer ${currentView === 'restaurante' ? 'text-primary-light' : ''}`}
            >
              Servicios
            </button>
            <button
              onClick={() => navigateToView('nosotros')}
              className={`text-left hover:text-primary-light py-1.5 cursor-pointer ${currentView === 'nosotros' ? 'text-primary-light' : ''}`}
            >
              Nosotros
            </button>
            <button
              onClick={() => navigateToView('catalogo')}
              className={`text-left hover:text-primary-light py-1.5 cursor-pointer ${(currentView === 'catalogo' || currentView === 'catalogo-detail') ? 'text-primary-light' : ''}`}
            >
              Equipos
            </button>
            <button
              onClick={() => navigateToView('factory')}
              className={`text-left hover:text-primary-light py-1.5 cursor-pointer ${currentView === 'factory' ? 'text-primary-light' : ''}`}
            >
              Batería Litio-ION
            </button>
            <button
              onClick={() => navigateToView('contacto')}
              className={`text-left hover:text-primary-light py-1.5 cursor-pointer ${currentView === 'contacto' ? 'text-primary-light' : ''}`}
            >
              Contacto
            </button>
            <button
              onClick={() => navigateToView('reservas')}
              className={`text-left hover:text-primary-light py-1.5 cursor-pointer ${currentView === 'reservas' ? 'text-primary-light' : ''}`}
            >
              Reservas
            </button>
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full font-bold text-white cursor-pointer"
              onClick={() => navigateToView('planes')}
            >
              Cotizar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
