import React from 'react';
import type { ViewType } from './Header';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-left">
        {/* Footer Brand */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img src="/logo9.png" alt="VM Maquinarias Logo" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Venta, alquiler y reparación de montacargas, apiladores eléctricos y a combustión, repuestos y baterías de Litio-ION. Más de 20 años de experiencia logrando la máxima eficiencia operativa para nuestros clientes.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary-light">Navegación</h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer transition-colors">
                Inicio
              </button>
            </li>
            <li>
              <a href="#servicios" className="hover:text-white cursor-pointer transition-colors">
                Servicios
              </a>
            </li>
            <li>
              <a href="#nosotros" className="hover:text-white cursor-pointer transition-colors">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#equipos" className="hover:text-white cursor-pointer transition-colors">
                Equipos WareHouse
              </a>
            </li>
            <li>
              <a href="#litio" className="hover:text-white cursor-pointer transition-colors">
                Baterías de Litio-ION
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-white cursor-pointer transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary-light">Oficina Principal</h4>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li>Jirón Márquez de la Bula 314, Urb. Huertos de Villa - Chorrillos</li>
            <li>Central: 01 6365-941</li>
            <li>Celular 1: +51 997 757 102</li>
            <li>Celular 2: +51 940 065 135</li>
            <li>comercial@vmmaquinarias.com</li>
          </ul>
        </div>

        {/* Marcas & Especialidades */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary-light">Marcas Principales</h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>FLEXI</li>
            <li>EP EQUIPMENT</li>
            <li>TOYOTA</li>
            <li>JUNGHEINRICH</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div>
          © 2026 VM Maquinarias. Todos los derechos reservados.
        </div>
        <div>
          Venta y Alquiler de Montacargas y Apiladores
        </div>
      </div>
    </footer>
  );
};
