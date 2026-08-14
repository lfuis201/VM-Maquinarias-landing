import React, { useState } from 'react';

interface FactoryViewProps {
  onNavigate?: (view: string) => void;
}

export const FactoryView: React.FC<FactoryViewProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'sistema',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.description) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectType: 'sistema',
        description: '',
      });
    }, 3000);
  };

  const specialties = [
    {
      title: 'Desarrollo Web & Móvil',
      description: 'Plataformas web corporativas, portales de clientes y aplicaciones móviles (iOS y Android) fluidas, rápidas y orientadas a la experiencia del usuario.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Integraciones SUNAT & API',
      description: 'Conectamos sistemas heredados (legacy), tiendas virtuales (WooCommerce, Shopify) o sistemas propios a la facturación electrónica homologada por SUNAT.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'ERP & CRM a Medida',
      description: 'Automatiza el inventario multi-almacén, comisiones complejas de vendedores, cuentas por cobrar, y reportes financieros personalizados según tus reglas.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      )
    },
    {
      title: 'Optimización de Procesos',
      description: 'Diseñamos scripts de carga masiva de datos, flujos de conciliación bancaria automática y herramientas de sincronización para eliminar el trabajo manual.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Reunión & Descubrimiento',
      description: 'Entendemos a fondo tu negocio, desafíos actuales y levantamos los requerimientos técnicos y funcionales del proyecto.'
    },
    {
      step: '02',
      title: 'Diseño UX/UI & Prototipado',
      description: 'Diseñamos pantallas y flujos interactivos para que experimentes la usabilidad del sistema antes de escribir la primera línea de código.'
    },
    {
      step: '03',
      title: 'Desarrollo Ágil Sprints',
      description: 'Construimos el software utilizando metodologías ágiles, entregándote avances funcionales cada dos semanas para tu feedback constante.'
    },
    {
      step: '04',
      title: 'Pruebas & Lanzamiento',
      description: 'Realizamos rigurosas pruebas de seguridad y estrés (QA) antes de desplegar tu solución en la nube con soporte dedicado de post-lanzamiento.'
    }
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,255,102,0.15),rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/25">
              Software Factory de Alto Nivel
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Desarrollamos el Software que tu empresa necesita
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Diseño, desarrollo e integración de sistemas a medida bajo estándares corporativos. Adaptamos la tecnología a tus procesos para maximizar tu eficiencia operativa y ventas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#cotizar"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-slate-950 font-bold rounded-xl text-center text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-primary/20 active:scale-95"
              >
                Cotizar Proyecto a Medida
              </a>
              <a
                href="https://wa.me/51913129204?text=Hola,%20quisiera%20recibir%20informacion%20de%20Sistematizate"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold rounded-xl text-center text-sm transition-all duration-200 cursor-pointer active:scale-95 border-0 inline-flex items-center justify-center"
              >
                Hablar con un Asesor
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            {/* Visual tech factory card illustration */}
            <div className="bg-slate-850 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">factory-deploy.sh</span>
              </div>
              <div className="space-y-4 font-mono text-xs text-slate-300">
                <p className="text-primary">$ npm install --global sistematizate-factory</p>
                <p className="text-slate-400">✓ analyzing system requirements...</p>
                <p className="text-slate-400">✓ generating responsive UI architectures...</p>
                <p className="text-slate-400">✓ setting up database migrations...</p>
                <p className="text-blue-400">✓ integrating SUNAT REST API authorization...</p>
                <p className="text-slate-400">✓ launching scalable cloud instances (AWS)...</p>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    <span className="text-[10px] text-slate-400">Estado de Producción</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-slate-950 px-2 py-0.5 rounded">ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties / Capabilities */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-primary px-3.5 py-1.5 rounded-full">
            Especialistas en Tecnología
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-accent tracking-tight">
            Nuestros Servicios de Fábrica de Software
          </h2>
          <p className="text-slate-505 text-base md:text-lg">
            Cubrimos todo el ciclo de vida del desarrollo para asegurar que obtengas una solución confiable, moderna y escalable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {specialties.map((specialty, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-150 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-6 text-left group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary-dark flex-shrink-0 group-hover:bg-primary group-hover:text-slate-950 transition-colors duration-300">
                {specialty.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-accent">{specialty.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{specialty.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodologia" className="py-24 px-6 bg-slate-900 text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3.5 py-1.5 rounded-full">
              Proceso Garantizado
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              ¿Cómo construimos tu proyecto?
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Seguimos un marco metodológico ágil estructurado que asegura calidad, cumplimiento de fechas y transparencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
            {steps.map((step, idx) => (
              <div key={idx} className="space-y-4 relative">
                <div className="text-5xl font-black text-primary font-mono leading-none">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Contact Form Section */}
      <section id="cotizar" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto items-start">
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-primary px-3.5 py-1.5 rounded-full">
              Hablemos de tu idea
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Completa el formulario describiendo brevemente la idea o necesidad técnica de tu empresa. Uno de nuestros consultores de arquitectura de software se pondrá en contacto contigo en menos de 24 horas para agendar una sesión técnica de descubrimiento.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark font-black">✓</span>
                <span className="text-sm font-bold text-slate-700">Acuerdos de Confidencialidad (NDA)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark font-black">✓</span>
                <span className="text-sm font-bold text-slate-700">Cotizaciones detalladas sin compromiso</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark font-black">✓</span>
                <span className="text-sm font-bold text-slate-700">Soporte post-venta por contrato</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-150 shadow-lg text-left">
            {submitted ? (
              <div className="text-center py-16 space-y-4 animate-view">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary-dark text-2xl font-black mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-950">¡Solicitud Recibida!</h3>
                <p className="text-slate-505 max-w-sm mx-auto text-sm">
                  Gracias por escribirnos. Nuestro arquitecto de soluciones revisará tu solicitud y se comunicará contigo vía telefónica o correo electrónico a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-accent mb-2">Solicitar Diagnóstico Técnico Gratis</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Empresa / Razón Social</label>
                    <input
                      type="text"
                      placeholder="Ej. Distribuidora SAC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+51 987 654 321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">¿Qué tipo de solución necesitas?</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50 cursor-pointer"
                  >
                    <option value="sistema">Sistema Corporativo a Medida</option>
                    <option value="api">Integración de Facturación SUNAT (API)</option>
                    <option value="movil">Aplicación Móvil Android/iOS</option>
                    <option value="ecommerce">Ecommerce con Control de Stock</option>
                    <option value="otro">Consultoría Técnico / Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Detalles del Proyecto *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe brevemente lo que necesitas construir o solucionar..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-slate-50/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-accent hover:bg-accent/90 text-primary font-bold rounded-xl text-center text-sm transition-all duration-200 cursor-pointer border-0 active:scale-95 shadow-md shadow-accent/20"
                >
                  Enviar Información
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
