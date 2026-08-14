import React, { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel, toast } from '@heroui/react';
import { Sidebar } from '../components/Sidebar';
import type { DashboardSection } from '../components/Sidebar';
import { DashboardHeader } from '../components/DashboardHeader';
import { HomeTab } from '../components/customizer/HomeTab';
import { RestaurantTab } from '../components/customizer/RestaurantTab';
import { NosotrosTab } from '../components/customizer/NosotrosTab';
import { PlanesTab } from '../components/customizer/PlanesTab';

import { ApiService } from '../../../shared/services/apiService';
import { AuthService } from '../services/authService';
import { CatalogTab } from '../components/catalog/CatalogTab';
import { BlogsTab } from '../components/blogs/BlogsTab';
import { useAuthStore } from '../stores/authStore';
import { useUpdateLandingHomeMutation } from '../../landing/hooks/useLandingHome';
import { useUpdateLandingNosotrosMutation } from '../../landing/hooks/useLandingNosotros';
import { useUpdateLandingRestauranteMutation } from '../../landing/hooks/useLandingRestaurante';
import { useLandingFooterQuery, useUpdateLandingFooterMutation } from '../../landing/hooks/useLandingFooter';
import { FooterTab } from '../components/customizer/footer/FooterTab';
import { useLandingPoliticaQuery, useUpdateLandingPoliticaMutation } from '../../landing/hooks/useLandingPolitica';
import { PoliticaTab } from '../components/customizer/politica/PoliticaTab';
import { useLeadsQuery, useUpdateLeadStatusMutation } from '../../landing/hooks/useLeads';

// Separated Tabs/Views
import { OverviewTab } from '../components/overview/OverviewTab';
import { LeadsTab } from '../components/leads/LeadsTab';
import { ClaimsTab } from '../components/claims/ClaimsTab';
import { SettingsTab } from '../components/settings/SettingsTab';
import { ClientsTab } from '../components/clients/ClientsTab';
import { OrdersTab } from '../components/orders/OrdersTab';
import { ReviewsTab } from '../components/reviews/ReviewsTab';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

// Path mappings for sub-routing
const sectionToPath: Record<DashboardSection, string> = {
  overview: '/dashboard/resumen',
  'home-customizer': '/dashboard/personalizar',
  leads: '/dashboard/leads',
  claims: '/dashboard/reclamaciones',
  catalog: '/dashboard/catalogo',
  settings: '/dashboard/cuenta',
  blogs: '/dashboard/blogs',
  orders: '/dashboard/pedidos',
  clients: '/dashboard/clientes',
  reviews: '/dashboard/testimonios',
};

const pathToSection: Record<string, DashboardSection> = {
  '/dashboard': 'overview',
  '/dashboard/resumen': 'overview',
  '/dashboard/personalizar': 'home-customizer',
  '/dashboard/leads': 'leads',
  '/dashboard/reclamaciones': 'claims',
  '/dashboard/catalogo': 'catalog',
  '/dashboard/cuenta': 'settings',
  '/dashboard/blogs': 'blogs',
  '/dashboard/pedidos': 'orders',
  '/dashboard/clientes': 'clients',
  '/dashboard/testimonios': 'reviews',
};

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  // Authentication State from Zustand
  const token = useAuthStore((state) => state.token);
  const updateHomeMutation = useUpdateLandingHomeMutation();
  const updateNosotrosMutation = useUpdateLandingNosotrosMutation();
  const updateRestauranteMutation = useUpdateLandingRestauranteMutation();
  const updateFooterMutation = useUpdateLandingFooterMutation();
  const updatePoliticaMutation = useUpdateLandingPoliticaMutation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // React Query Hooks for Leads
  const { data: leadsData, isLoading: leadsQueryLoading, refetch: refetchLeads } = useLeadsQuery();
  const updateLeadStatusMutation = useUpdateLeadStatusMutation();

  // Dashboard Section & UI State
  const [activeSection, setActiveSection] = useState<DashboardSection>(() => {
    const path = window.location.pathname;
    return pathToSection[path] || 'overview';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data States
  const [homeConfig, setHomeConfig] = useState<any>(null);
  const [restaurantConfig, setRestaurantConfig] = useState<any>(null);
  const [nosotrosConfig, setNosotrosConfig] = useState<any>(null);
  const [footerConfig, setFooterConfig] = useState<any>(null);
  const [politicaConfig, setPoliticaConfig] = useState<any>(null);
  const [customizerTab, setCustomizerTab] = useState<string>('inicio');
  const [leads, setLeads] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalClaims: 0,
    activeLeads: 0,
    activeClaims: 0
  });

  // Action feedback
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync leadsData from React Query with local state
  useEffect(() => {
    if (leadsData) {
      setLeads(leadsData);
    }
  }, [leadsData]);

  // Fetch logged in user profile
  const fetchProfile = async (authToken: string) => {
    if (authToken === 'mock-admin-token-12345') {
      useAuthStore.setState({
        user: {
          firstName: 'Administrador',
          lastName: 'Sistematízate',
          email: 'admin@sistematizate.pe',
          role: 'Administrador'
        }
      });
      return;
    }

    try {
      const data = await AuthService.getProfile();
      const profileUser = (data as any).data || data;

      const role = profileUser?.role;
      if (role !== 'Administrador' && role !== 'ADMIN') {
        toast.danger('Acceso denegado: No tienes permisos de administrador.');
        onNavigate('home');
        return;
      }

      useAuthStore.setState({ user: profileUser });
      localStorage.setItem('adminUser', JSON.stringify(profileUser));
    } catch (e) {
      logout();
      onNavigate('login');
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      onNavigate('login');
    }
  }, [token, onNavigate]);

  useEffect(() => {
    if (user && user.role !== 'Administrador' && user.role !== 'ADMIN') {
      toast.danger('Acceso denegado: No tienes permisos de administrador.');
      onNavigate('home');
    }
  }, [user, onNavigate]);

  // Section Navigation and Routing Sync
  const handleSectionChange = (section: DashboardSection) => {
    setActiveSection(section);
    const path = sectionToPath[section];
    if (window.location.pathname !== path) {
      window.history.pushState({ view: 'dashboard', section }, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/dashboard')) {
        const section = pathToSection[path] || 'overview';
        setActiveSection(section);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Normalize route structure if at the base dashboard path
    const path = window.location.pathname;
    const currentSection = pathToSection[path] || 'overview';
    if (path === '/dashboard') {
      window.history.replaceState({ view: 'dashboard', section: currentSection }, '', '/dashboard/resumen');
    } else {
      window.history.replaceState({ view: 'dashboard', section: currentSection }, '', path);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Load section data
  useEffect(() => {
    if (token) {
      if (activeSection === 'overview') {
        fetchOverviewData();
      } else if (activeSection === 'home-customizer') {
        fetchCustomizerConfig();
      } else if (activeSection === 'leads') {
        fetchLeads();
      } else if (activeSection === 'claims') {
        fetchClaims();
      }
    }
  }, [activeSection, token]);

  const handleLogout = () => {
    logout();
  };

  // API Fetches
  const fetchOverviewData = async () => {
    setIsLoading(true);
    if (token === 'mock-admin-token-12345') {
      setStats({
        totalLeads: 3,
        totalClaims: 2,
        activeLeads: 1,
        activeClaims: 2
      });
      setIsLoading(false);
      return;
    }

    try {
      let leadsData: any = { data: [] };
      let claimsData: any = { data: [] };
      try {
        leadsData = await ApiService.get('/leads');
      } catch (e) {
        console.error(e);
      }
      try {
        claimsData = await ApiService.get('/claims');
      } catch (e) {
        console.error(e);
      }

      const totalL = leadsData.data?.length || 0;
      const totalC = claimsData.data?.length || 0;

      const activeL = leadsData.data?.filter((l: any) => l.status === 'PENDING').length || 0;
      const activeC = claimsData.data?.length || 0;

      setStats({
        totalLeads: totalL,
        totalClaims: totalC,
        activeLeads: activeL,
        activeClaims: activeC
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomizerConfig = async () => {
    setIsLoading(true);
    try {
      const configData = await ApiService.get('/landing-home');
      setHomeConfig(configData.data || configData);
    } catch (e) {
      console.warn('Backend connection offline, using customizer defaults.', e);
      if (!homeConfig) {
        setHomeConfig({
          heroBadge: 'Facturación Electrónica SUNAT 100% Autorizada',
          heroPlayRatingScore: 4.8,
          heroTitle: 'Sistema de Gestión para tu negocio',
          heroSubtitle: 'Digitaliza y factura con Sistematízate',
          heroDescription: 'La plataforma más fácil e intuitiva para controlar tus ventas, emitir boletas y facturas electrónicas, y supervisar tu inventario en tiempo real desde Perú.',
          heroBullets: [
            'Somos la plataforma más fácil e intuitiva',
            'Úsalo desde el celular y computador',
            'Conoce las estadísticas de tu negocio en tiempo real'
          ],
          stat1Value: '7M+',
          stat1Title: 'Comprobantes procesados',
          stat1Desc: 'Micro, pequeños y medianos comercios gestionan y automatizan sus operaciones diariamente con nosotros.',
          stat2Value: '24',
          stat2Title: 'Departamentos con presencia',
          stat2Desc: 'Líderes en digitalización y soluciones para el crecimiento empresarial a nivel nacional en todo el Perú.',
          stat3Value: '4.8',
          stat3Title: 'Calificación de clientes',
          stat3Desc: 'Elogiado por comerciantes y dueños de negocios por ser el sistema de facturación y gestión comercial más simple.',
          ctaTitle: 'Sistematiza hoy tu negocio ¡Es gratis empezar!',
          ctaHighlight: '¡Es gratis empezar!',
          ctaDescription: 'Descubre la herramienta preferida por miles de negocios en Perú para el control de facturas, inventario y comisiones en tiempo real.'
        });
      }
    }

    try {
      const restData = await ApiService.get('/landing-restaurante');
      setRestaurantConfig(restData.data || restData);
    } catch (e) {
      console.warn('Backend connection offline for Restaurante, using defaults.', e);
      if (!restaurantConfig) {
        setRestaurantConfig({
          heroTitle: "El software que acelera tu Restaurante",
          heroDescription: "Control digital de comandas desde tablets de mozos, pantalla KDS para cocineros, facturación SUNAT al instante y control de stock de insumos automatizado.",
          faq1Q: '¿El sistema de comandas funciona si se pierde la conexión a internet?',
          faq1A: 'Sí. El sistema local de comandas y comunicación con ticketeras de cocina corre en tu red local WiFi interna, permitiendo seguir operando, imprimiendo comandas y cobrando sin interrupciones. La sincronización a la nube se realiza automáticamente cuando vuelve la conexión.',
          faq2Q: '¿Qué impresoras térmicas de comandas son compatibles?',
          faq2A: 'Somos compatibles con el 99% de impresoras térmicas (Epson, Bixolon, Star, 3nStar, Xprinter, etc.) de conexión USB, WiFi, Ethernet o Bluetooth de 80mm y 58mm.',
          faq3Q: '¿Hay algún límite en la cantidad de mesas o mozos que puedo registrar?',
          faq3A: 'No. Nuestros planes premium de restaurante te permiten registrar salones y mesas ilimitadas, además de crear usuarios y contraseñas independientes para todos tus mozos sin cargos adicionales.',
          faq4Q: '¿Cómo funciona la descarga de inventario por recetas (insumos)?',
          faq4A: 'Configuras la receta de cada plato (por ejemplo, Lomo Saltado consume 200g de lomo fino, 150g de papa, 1 cebolla). Cada vez que el mozo registra la venta del plato, el stock de insumos se reduce automáticamente de forma proporcional en tiempo real.'
        });
      }
    }

    try {
      const nosotrosData = await ApiService.get('/landing-nosotros');
      setNosotrosConfig(nosotrosData.data || nosotrosData);
    } catch (e) {
      console.warn('Backend connection offline for Nosotros, using defaults.', e);
      if (!nosotrosConfig) {
        setNosotrosConfig({
          introBadge: "¿Quiénes Somos?",
          introTitle: "Impulsamos el crecimiento y la digitalización de los negocios en el Perú",
          introDescription: "Nacimos con un propósito claro: democratizar el acceso a herramientas de gestión digital, permitiendo que bodegas, restaurantes y emprendimientos locales controlen sus finanzas como grandes empresas de manera totalmente sencilla.",
          misionTitle: "Nuestra Misión",
          misionDesc: "Simplificar y sistematizar el control diario de ventas, inventario y comisiones para los comerciantes peruanos a través de tecnología intuitiva de primer nivel.",
          visionTitle: "Nuestra Visión",
          visionDesc: "Convertirnos en la plataforma de gestión líder para micro, pequeñas y grandes empresas en el Perú, impulsando la formalidad e inclusión financiera nacional.",
          valoresTitle: "Nuestros Valores",
          valoresDesc: "Simplicidad extrema, obsesión por la seguridad de la información, innovación continua y un profundo compromiso con la prosperidad de nuestros clientes."
        });
      }
    }

    try {
      const footerData = await ApiService.get('/landing-footer');
      setFooterConfig(footerData.data || footerData);
    } catch (e) {
      console.warn('Backend connection offline for Footer, using defaults.', e);
      if (!footerConfig) {
        setFooterConfig({
          description: 'El sistema de facturación y gestión comercial más simple y amigable de Perú. Diseñado para potenciar el crecimiento de micro y pequeñas empresas.',
          address: 'Mza. A Lote. 11, Av. Manantiales, San Sebastián - Cusco',
          phone: '+51 913 129 204',
          emailVentas: 'comercial@sistematizateperu.com',
          emailSoporte: 'sistematizateperu@gmail.com',
          facebookUrl: 'https://web.facebook.com/sistematizateperu/',
          youtubeUrl: 'https://www.youtube.com/@SISTEMATIZATE',
          instagramUrl: '',
          linkedinUrl: '',
          tiktokUrl: 'https://www.tiktok.com/@sistematiza.per',
          copyrightText: '© 2026 Sistematízate. Todos los derechos reservados.',
        });
      }
    }

    try {
      const politicaData = await ApiService.get('/landing-politica');
      setPoliticaConfig(politicaData.data || politicaData);
    } catch (e) {
      console.warn('Backend connection offline for Politica, using defaults.', e);
      if (!politicaConfig) {
        setPoliticaConfig({
          title: 'Política de Privacidad',
          lastUpdated: 'Última actualización: 30 de Mayo de 2026',
          introText: 'En <strong>Sistematízate</strong>, nos tomamos muy en serio la seguridad y confidencialidad de los datos de nuestros usuarios...',
          sections: []
        });
      }
    }

    setIsLoading(false);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      await refetchLeads();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClaims = async () => {
    setIsLoading(true);
    if (token === 'mock-admin-token-12345') {
      if (claims.length === 0) {
        setClaims([
          {
            id: 'claim-1',
            claimNumber: 'REC-2026-0001',
            type: 'RECLAMO',
            createdAt: new Date().toISOString(),
            fullName: 'Ana Torres',
            documentType: 'DNI',
            documentNumber: '44556677',
            contractedType: 'SERVICIO',
            contractedDescription: 'Plan Emprendedor Anual',
            details: 'Hubo retraso en la activación del RUC.',
            requestDetails: 'Solicito la activación inmediata o el reembolso de los días perdidos.'
          },
          {
            id: 'claim-2',
            claimNumber: 'QUE-2026-0002',
            type: 'QUEJA',
            createdAt: new Date().toISOString(),
            fullName: 'Pedro Rojas',
            documentType: 'CE',
            documentNumber: '00123456',
            contractedType: 'PRODUCTO',
            contractedDescription: 'Equipo POS Compacto',
            details: 'El cable de alimentación llegó dañado.',
            requestDetails: 'Cambio físico del cable dañado.'
          }
        ]);
      }
      setIsLoading(false);
      return;
    }

    try {
      const resData = await ApiService.get('/claims');
      setClaims(resData.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: any) => {
    if (token === 'mock-admin-token-12345') {
      setLeads(prev =>
        prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      setStats(prev => {
        const updatedLeads = leads.map(l => (l.id === leadId ? { ...l, status: newStatus } : l));
        return {
          ...prev,
          activeLeads: updatedLeads.filter(l => l.status === 'PENDING').length
        };
      });
      return;
    }

    updateLeadStatusMutation.mutate({ id: leadId, status: newStatus }, {
      onSuccess: () => {
        toast.success('Estado del lead actualizado correctamente.');
      },
      onError: (err: any) => {
        console.error('Error updating lead status:', err);
        const errMsg = err?.response?.data?.message || err?.message || 'Error de red al actualizar el estado.';
        const formattedMsg = Array.isArray(errMsg) ? errMsg.join(', ') : errMsg;
        toast.danger(`Error: ${formattedMsg}`);
      }
    });
  };

  const handleSaveHomeConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);
    setIsLoading(true);

    try {
      const bulletsArray = typeof homeConfig.heroBullets === 'string'
        ? homeConfig.heroBullets.split('\n').filter((b: string) => b.trim() !== '')
        : homeConfig.heroBullets;

      // Strip non-updatable database columns to avoid white-list validation errors (id, createdAt, updatedAt)
      const { id, createdAt, updatedAt, ...cleanConfig } = homeConfig;

      const payload = {
        ...cleanConfig,
        heroBullets: bulletsArray,
        heroPlayRatingScore: parseFloat(homeConfig.heroPlayRatingScore) || 0,
        stat1Value: parseInt(String(homeConfig.stat1Value).replace(/[^\d]/g, ''), 10) || 0,
        stat2Value: parseInt(String(homeConfig.stat2Value).replace(/[^\d]/g, ''), 10) || 0,
        stat3Value: parseFloat(String(homeConfig.stat3Value).replace(/[^0-9.]/g, '')) || 0,
      };

      await updateHomeMutation.mutateAsync(payload);
      const successMessage = 'Configuración de la página de inicio actualizada correctamente.';
      setSaveSuccess(successMessage);
      toast.success(successMessage);
      fetchCustomizerConfig();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Error de red al actualizar la configuración.';
      const formattedMsg = Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg;
      setSaveError(formattedMsg);
      toast.danger(formattedMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigFieldChange = (field: string, value: any) => {
    setHomeConfig((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveRestaurantConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);
    setIsLoading(true);

    try {
      const { id, createdAt, updatedAt, ...cleanConfig } = restaurantConfig;
      await updateRestauranteMutation.mutateAsync(cleanConfig);
      const successMessage = 'Configuración de la página Restaurante guardada correctamente.';
      setSaveSuccess(successMessage);
      toast.success(successMessage);
      fetchCustomizerConfig();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Error de red al actualizar la configuración.';
      const formattedMsg = Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg;
      setSaveError(formattedMsg);
      toast.danger(formattedMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNosotrosConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);
    setIsLoading(true);

    try {
      const { id, createdAt, updatedAt, ...cleanConfig } = nosotrosConfig;
      await updateNosotrosMutation.mutateAsync(cleanConfig);
      const successMessage = 'Configuración de la página Nosotros guardada correctamente.';
      setSaveSuccess(successMessage);
      toast.success(successMessage);
      fetchCustomizerConfig();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Error de red al actualizar la configuración.';
      const formattedMsg = Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg;
      setSaveError(formattedMsg);
      toast.danger(formattedMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestaurantFieldChange = (field: string, value: any) => {
    setRestaurantConfig((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNosotrosFieldChange = (field: string, value: any) => {
    setNosotrosConfig((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFooterFieldChange = (field: string, value: any) => {
    setFooterConfig((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePoliticaFieldChange = (field: string, value: any) => {
    setPoliticaConfig((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveFooterConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);
    setIsLoading(true);

    try {
      const { id, createdAt, updatedAt, ...cleanConfig } = footerConfig;
      await updateFooterMutation.mutateAsync(cleanConfig);
      const successMessage = 'Configuración del Footer guardada correctamente.';
      setSaveSuccess(successMessage);
      toast.success(successMessage);
      fetchCustomizerConfig();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Error de red al actualizar la configuración.';
      const formattedMsg = Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg;
      setSaveError(formattedMsg);
      toast.danger(formattedMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePoliticaConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);
    setIsLoading(true);

    try {
      const { id, createdAt, updatedAt, ...cleanConfig } = politicaConfig;
      await updatePoliticaMutation.mutateAsync(cleanConfig);
      const successMessage = 'Configuración de la Política de Privacidad guardada correctamente.';
      setSaveSuccess(successMessage);
      toast.success(successMessage);
      fetchCustomizerConfig();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Error de red al actualizar la configuración.';
      const formattedMsg = Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg;
      setSaveError(formattedMsg);
      toast.danger(formattedMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------
  // Render Login Panel (Redirected by useEffect)
  // ----------------------------------------
  if (!token) {
    return null;
  }

  // ----------------------------------------
  // Render Dashboard Layout (Premium Light Theme)
  // ----------------------------------------
  return (
    <div className="h-screen w-full flex bg-slate-50 text-slate-900 overflow-hidden animate-view">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        user={user}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 min-w-0 h-full flex flex-col bg-slate-50 overflow-y-auto">
        {/* Header */}
        <DashboardHeader activeSection={activeSection} user={user} />

        {/* Content */}
        <main className="p-8 flex-grow">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <OverviewTab user={user} stats={stats} isLoading={isLoading} />
          )}

          {/* Home Customizer Section */}
          {activeSection === 'home-customizer' && (
            <div className="w-full max-w-7xl mx-auto space-y-6 text-left">
              {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm p-4 rounded-xl font-bold animate-fade-in">
                  {saveSuccess}
                </div>
              )}
              {saveError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl font-bold animate-fade-in">
                  {saveError}
                </div>
              )}

              <Tabs aria-label="Editor de Páginas" selectedKey={customizerTab} onSelectionChange={(key) => setCustomizerTab(key as string)} className="w-full">
                <TabList className="flex gap-2 border-b border-slate-200 pb-2">
                  <Tab id="inicio" className={({ isSelected }) => `px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>Página Inicio</Tab>
                  <Tab id="restaurante" className={({ isSelected }) => `px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>Restaurante</Tab>
                  <Tab id="nosotros" className={({ isSelected }) => `px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>Nosotros</Tab>
                  <Tab id="planes" className={({ isSelected }) => `px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>Planes y Precios</Tab>
                  <Tab id="footer" className={({ isSelected }) => `px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>Footer</Tab>
                  <Tab id="politica" className={({ isSelected }) => `px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>Política de Privacidad</Tab>
                </TabList>
                <TabPanel id="inicio" className="pt-6 outline-none">
                  <HomeTab
                    config={homeConfig}
                    onChange={handleConfigFieldChange}
                    onSubmit={handleSaveHomeConfig}
                    isLoading={isLoading}
                  />
                </TabPanel>
                <TabPanel id="restaurante" className="pt-6 outline-none">
                  <RestaurantTab
                    config={restaurantConfig}
                    onChange={handleRestaurantFieldChange}
                    onSubmit={handleSaveRestaurantConfig}
                    isLoading={isLoading}
                  />
                </TabPanel>
                <TabPanel id="nosotros" className="pt-6 outline-none">
                  <NosotrosTab
                    config={nosotrosConfig}
                    onChange={handleNosotrosFieldChange}
                    onSubmit={handleSaveNosotrosConfig}
                    isLoading={isLoading}
                  />
                </TabPanel>
                <TabPanel id="planes" className="pt-6 outline-none">
                  <PlanesTab />
                </TabPanel>
                <TabPanel id="footer" className="pt-6 outline-none">
                  <FooterTab
                    config={footerConfig}
                    onChange={handleFooterFieldChange}
                    onSubmit={handleSaveFooterConfig}
                    isLoading={isLoading}
                  />
                </TabPanel>
                <TabPanel id="politica" className="pt-6 outline-none">
                  <PoliticaTab
                    config={politicaConfig}
                    onChange={handlePoliticaFieldChange}
                    onSubmit={handleSavePoliticaConfig}
                    isLoading={isLoading}
                  />
                </TabPanel>
              </Tabs>
            </div>
          )}

          {/* Leads List Section */}
          {activeSection === 'leads' && (
            <LeadsTab />
          )}

          {/* Claims List Section */}
          {activeSection === 'claims' && (
            <ClaimsTab claims={claims} isLoading={isLoading} />
          )}

          {/* Reviews List Section */}
          {activeSection === 'reviews' && (
            <ReviewsTab />
          )}

          {/* Orders Tab Section */}
          {activeSection === 'orders' && (
            <OrdersTab />
          )}

          {/* Clients Tab Section */}
          {activeSection === 'clients' && (
            <ClientsTab />
          )}

          {/* Catalog Tab Section */}
          {activeSection === 'catalog' && (
            <CatalogTab />
          )}

          {/* Blogs Tab Section */}
          {activeSection === 'blogs' && (
            <BlogsTab />
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <SettingsTab user={user} isLoading={isLoading} />
          )}
        </main>
      </div>
    </div>
  );
};
