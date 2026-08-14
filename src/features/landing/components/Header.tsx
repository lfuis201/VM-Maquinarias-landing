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

        {/* Desktop Auth & Cart Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => navigateToView('cart')}
            className="relative p-2 text-slate-300 hover:text-primary-light transition-colors cursor-pointer"
            title="Ir al Carrito"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                {totalCartItems}
              </span>
            )}
          </button>
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 pl-3.5 pr-2.5 py-1.5 rounded-full shadow-sm transition-all cursor-pointer outline-none"
              >
                <div className="flex flex-col items-end select-none">
                  <span className="text-[11px] font-black text-slate-100 leading-tight">
                    {user?.firstName || 'Cliente'}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold leading-none mt-0.5">
                    {user?.role === 'ADMIN' ? 'Administrador' : 'Cliente'}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-primary text-slate-950 flex items-center justify-center font-black text-[10px] select-none shadow-sm">
                  {(user?.firstName?.[0] || 'C') + (user?.lastName?.[0] || '')}
                </div>
                <svg className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  {/* Overlay to close the dropdown */}
                  <div className="fixed inset-0 z-50 cursor-default" onClick={() => setDropdownOpen(false)}></div>
                  
                  {/* Dropdown Card */}
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl py-2 z-55 animate-fade-in text-left">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs font-black text-white leading-none">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold truncate mt-1">
                        {user?.email}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigateToView('cliente-perfil');
                      }}
                      className="w-full px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-all text-left cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </button>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigateToView('cliente-pedidos');
                      }}
                      className="w-full px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-all text-left cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Mis Pedidos
                    </button>

                    {user?.role === 'ADMIN' && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigateToView('dashboard');
                        }}
                        className="w-full px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-all text-left cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Panel de Control
                      </button>
                    )}

                    <div className="h-px bg-slate-800 my-1"></div>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        queryClient.clear();
                        navigateToView('home');
                      }}
                      className="w-full px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-950/40 flex items-center gap-2 transition-all text-left cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigateToView('cliente-auth')}
                className="text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer px-1"
              >
                Iniciar Sesión
              </button>
              <Button
                variant="primary"
                size="sm"
                className="shadow-md shadow-primary/20 cursor-pointer font-bold"
                onClick={() => navigateToView('planes')}
              >
                Cotizar
              </Button>
            </>
          )}
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
            {isAuthenticated ? (
              <>
                <div 
                  className="flex items-center gap-3 px-2 py-1 cursor-pointer hover:bg-slate-900 rounded-xl"
                  onClick={() => navigateToView('cliente-perfil')}
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-slate-950 flex items-center justify-center font-black text-sm select-none">
                    {(user?.firstName?.[0] || 'C') + (user?.lastName?.[0] || '')}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white leading-none">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">{user?.email}</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full font-bold cursor-pointer bg-slate-900 border-slate-700 text-slate-200"
                  onClick={() => navigateToView('cliente-pedidos')}
                >
                  Mis Pedidos
                </Button>
                {user?.role === 'ADMIN' && (
                  <Button
                    variant="primary"
                    className="w-full font-bold cursor-pointer"
                    onClick={() => navigateToView('dashboard')}
                  >
                    Panel de Administración
                  </Button>
                )}
                <Button
                  variant="secondary"
                  className="w-full font-bold text-red-400 hover:bg-red-950/40 border-red-900 cursor-pointer"
                  onClick={() => {
                    logout();
                    queryClient.clear();
                    navigateToView('home');
                  }}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="w-full font-bold cursor-pointer bg-slate-900 border-slate-700 text-slate-200"
                  onClick={() => navigateToView('cliente-auth')}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="primary"
                  className="w-full font-bold text-white cursor-pointer"
                  onClick={() => navigateToView('planes')}
                >
                  Cotizar
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
