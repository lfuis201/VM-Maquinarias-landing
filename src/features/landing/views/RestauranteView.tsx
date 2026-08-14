import React, { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import restaurantImg from '../../../assets/restaurant/restaruant.png';
import pedidoImg from '../../../assets/restaurant/pedido.png';
import mesasImg from '../../../assets/restaurant/mesas.png';
import imprimirImg from '../../../assets/restaurant/imprimir.png';
import appRestaurantImg from '../../../assets/appvisuals/appRestaurant.png';
import dashboardRestaruantImg from '../../../assets/restaurant/dashboardRestaruant.png';
import { useLandingRestauranteQuery } from '../hooks/useLandingRestaurante';

interface RestauranteViewProps {
  onNavigate: (view: string) => void;
}

export const RestauranteView: React.FC<RestauranteViewProps> = ({ onNavigate }) => {
  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { data: dbConfig } = useLandingRestauranteQuery();

  const defaultConfig = {
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
  };

  const config = dbConfig || defaultConfig;

  const faqs = [
    { q: config.faq1Q, a: config.faq1A },
    { q: config.faq2Q, a: config.faq2A },
    { q: config.faq3Q, a: config.faq3A },
    { q: config.faq4Q, a: config.faq4A },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#10094d] to-[#0a0f24] text-white py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Sistematízate Gastronomía
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] whitespace-pre-line">
              {config.heroTitle}
            </h1>
            <p className="text-slate-350 text-base md:text-lg leading-relaxed max-w-xl">
              {config.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-primary/20 cursor-pointer"
                onClick={() => onNavigate('contacto')}
              >
                Solicitar Demostración Gratis
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0a0f24]">
              <img
                src={restaurantImg}
                alt="Sistematízate Gastronomía"
                className="w-full h-auto object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section -> Platform Gallery */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full">
            Plataforma
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-accent tracking-tight">
            Nuestra Plataforma en Acción
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Visualiza el flujo completo del sistema: desde la distribución de mesas hasta la toma de pedidos y facturación centralizada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2 flex items-center justify-center">
            <img
              src={mesasImg}
              alt="Mesas"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2 flex items-center justify-center">
            <img
              src={pedidoImg}
              alt="Pedido"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2 flex items-center justify-center">
            <img
              src={imprimirImg}
              alt="Imprimir"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Expanded Feature Highlight 1: Comandas Flow */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-[#10094d] bg-[#10094d]/10 px-3.5 py-1.5 rounded-full">
              Punto de Venta Integrado
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
              Flujo digital de pedidos: Mozo &rarr; Cocina &rarr; Caja
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Olvídate de las órdenes ilegibles en papel y los platos cruzados. Tus mozos registran los pedidos desde la mesa usando celulares o tablets, y la comanda se imprime automáticamente en segundos en la ticketera de la cocina o barra correspondiente.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>División de impresión por áreas (Platos calientes, bar, postres)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Modificadores de plato (ej. "sin cebolla", "término medio")</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Soporte para pantallas de cocina KDS (Kitchen Display System)</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[32px] overflow-hidden border-4 border-slate-200 bg-white shadow-xl h-[340px] md:h-[400px] flex items-center justify-center p-4">
            <img 
              src={pedidoImg} 
              alt="Flujo digital de comandas" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
      </section>

      {/* Expanded Feature Highlight 2: Mesas & Salones Layout */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-slate-50/50 rounded-[40px] my-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="rounded-[32px] overflow-hidden border-4 border-slate-200 bg-white shadow-xl h-[340px] md:h-[400px] lg:order-last flex items-center justify-center p-4">
            <img 
              src={mesasImg} 
              alt="Diseño y administración de mesas" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-primary-dark bg-primary/10 px-3.5 py-1.5 rounded-full">
              Salones Ilimitados
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
              Gestión visual de salones y distribución de mesas
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Diseña la distribución exacta de tu restaurante con nuestro editor visual interactivo. Registra múltiples áreas como Terraza, Zona VIP, Primer Piso y Barra, y realiza seguimiento del estado de cada mesa mediante códigos de colores.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Estados de mesa: Libre (gris), Ocupada (azul) y Pre-cuenta pedida (ámbar)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Unión y división de mesas de forma rápida en hora punta</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Asignación automática de mozos por zonas de servicio</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Expanded Feature Highlight 3: Recipe & Inventory control */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-[#10094d] bg-[#10094d]/10 px-3.5 py-1.5 rounded-full">
              Control Interno de Stock
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
              Control de stock automatizado mediante Recetario (Insumos)
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Evita pérdidas, desperdicios o robos hormiga en tu almacén. Vincula cada platillo a su receta correspondiente. Por ejemplo, al vender un "Lomo Saltado", el sistema descontará de manera proporcional la cantidad exacta de carne, papas, cebolla y demás insumos en tiempo real.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Cálculo preciso del costo del plato y margen de ganancia real</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Alertas de stock mínimo y compras a proveedores sugeridas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Historial de mermas e inventarios periódicos rápidos</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[32px] overflow-hidden border-4 border-slate-200 bg-white shadow-xl h-[340px] md:h-[400px]">
            <img 
              src="/recetas_inventario.jpg" 
              alt="Control de recetas e inventarios" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </div>
      </section>

      {/* Expanded Feature Highlight 4: Payments & Billing */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-slate-50/50 rounded-[40px] my-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="rounded-[32px] overflow-hidden border-4 border-slate-200 bg-white shadow-xl h-[340px] md:h-[400px] lg:order-last flex items-center justify-center p-4">
            <img 
              src={imprimirImg} 
              alt="Caja rápida y facturación electrónica" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs font-black uppercase text-primary-dark bg-primary/10 px-3.5 py-1.5 rounded-full">
              SUNAT Factura al Instante
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight leading-tight">
              Cuentas divididas, cajas rápidas y facturación electrónica
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Agiliza el cobro al final del servicio. Ofrece la opción de dividir la cuenta (por comensal, por partes iguales o por platos seleccionados). Con un solo clic, convierte la pre-cuenta en Boleta o Factura Electrónica SUNAT autorizada automáticamente.
            </p>
            <ul className="space-y-3.5 text-xs md:text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Integración con pasarelas de pago y billeteras digitales (Yape, Plin)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Control exhaustivo de apertura, cierres de caja y cuadre diario</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Reporte automático de propinas recaudadas por mozo</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* App & Software Showcase Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 bg-[#0a0f24] text-white rounded-[40px] my-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="relative space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
              Interfaces Modernas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Visualiza el Software en Acción
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Interfaces minimalistas de alto rendimiento diseñadas por profesionales de la restauración para agilizar cada toque.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
            {/* Showroom card 1: Waiter Mobile App */}
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-8 flex flex-col justify-between space-y-6 hover:border-primary/40 transition-all duration-300">
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">Móvil & Tablets</span>
                <h3 className="text-xl font-bold text-white">Aplicación de Mozos</h3>
                <p className="text-xs text-slate-400">Diseño compacto optimizado para una sola mano. Navegación por rubros y envío inmediato a comanderas.</p>
              </div>
              <div className="flex items-center justify-center flex-grow py-4 min-h-[420px]">
                {/* Smartphone Mockup */}
                <div className="relative border-slate-800 bg-slate-800 border-[8px] rounded-[36px] h-[420px] w-[210px] shadow-2xl overflow-hidden flex flex-col">
                  {/* Speaker / Notch */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-slate-800 rounded-b-xl flex items-center justify-center z-20">
                    <span className="w-12 h-1 bg-slate-700 rounded-full block -mt-1" />
                  </div>
                  {/* Screen Viewport */}
                  <div className="w-full h-full bg-slate-950 overflow-hidden rounded-[26px] relative flex items-center justify-center">
                    <img 
                      src={appRestaurantImg} 
                      alt="App de comanderas mozo" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Showroom card 2: Admin Dashboard */}
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-8 flex flex-col justify-between space-y-6 hover:border-accent/40 transition-all duration-300">
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-black tracking-widest text-accent uppercase">Web & Escritorio</span>
                <h3 className="text-xl font-bold text-white">Panel de Administración</h3>
                <p className="text-xs text-slate-400">Control total de ventas diarias, reportes financieros y estados de cuenta en tiempo real desde cualquier lugar.</p>
              </div>
              <div className="flex flex-col justify-start flex-grow min-h-[320px] py-4">
                {/* Laptop/Browser Mockup */}
                <div className="w-full flex-grow flex flex-col">
                  {/* Browser Header */}
                  <div className="bg-slate-800 rounded-t-xl py-2 px-3.5 flex items-center gap-1.5 border border-slate-700/80 border-b-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 block" />
                    <div className="h-4.5 bg-slate-900 border border-slate-700/50 rounded-md flex-grow mx-4 text-[9px] text-slate-400 flex items-center px-3.5 select-none truncate">
                      sistematizate.pe/restaurante/admin
                    </div>
                  </div>
                  {/* Browser Viewport */}
                  <div className="w-full flex-grow bg-slate-900 border border-slate-700/80 border-t-0 rounded-b-xl overflow-hidden relative min-h-[220px] flex items-center justify-center p-0.5">
                    <img 
                      src={dashboardRestaruantImg} 
                      alt="Panel de administración y estadísticas" 
                      className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-500" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-accent tracking-tight">
            Equipamiento de alta gama para tu local
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Sistematízate Gastronomía funciona en múltiples dispositivos. Vendemos y brindamos soporte para hardware homologado de marcas líderes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-2xl">🖥️</span>
              <h3 className="font-bold text-accent">Terminales POS All-in-One</h3>
              <p className="text-xs text-slate-500">Pantallas táctiles capacitivas industriales para cajas rápidas y despachos centrales.</p>
            </div>
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider mt-4">Homologado SUNAT</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-2xl">🖨️</span>
              <h3 className="font-bold text-accent">Ticketeras de Cocina 80mm</h3>
              <p className="text-xs text-slate-500">Impresoras térmicas ultra veloces con conexión Ethernet/WiFi y corte de papel automático.</p>
            </div>
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider mt-4">Conectividad de Red</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-2xl">📱</span>
              <h3 className="font-bold text-accent">Tablets para Comanderas</h3>
              <p className="text-xs text-slate-500">Dispositivos táctiles ligeros y resistentes con fundas antichoque para uso de los mozos en salón.</p>
            </div>
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider mt-4">Android & iOS</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-2xl">💵</span>
              <h3 className="font-bold text-accent">Gavetas de Dinero Eléctricas</h3>
              <p className="text-xs text-slate-500">Cajones portamonedas blindados con apertura electrónica automatizada al emitir boletas o facturas.</p>
            </div>
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider mt-4">Apertura Segura</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-100 text-left space-y-12">
        <h2 className="text-3xl font-black text-accent text-center">
          Preguntas Frecuentes sobre el Sistema
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 px-6 flex justify-between items-center font-bold text-slate-900 text-sm md:text-base hover:bg-slate-50 text-left transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className={`text-xl transform transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-primary-dark' : 'text-slate-400'}`}>
                  ▼
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFaq === idx ? 'max-h-[300px] border-t border-slate-100 p-6' : 'max-h-0'
                }`}
              >
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto space-y-6 border-t border-slate-100">
        <h2 className="text-3xl sm:text-4xl font-black text-accent leading-tight">
          ¿Listo para transformar el servicio de tu restaurante?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
          Déjanos tus datos de contacto y un asesor se comunicará contigo para presentarte la solución adaptada al tamaño de tu negocio.
        </p>
        <div className="pt-4 flex justify-center">
          <button
            className="inline-flex items-center justify-center font-black rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer bg-accent text-primary hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus:ring-accent px-7 py-3.5 text-lg"
            onClick={() => onNavigate('contacto')}
          >
            Contactar Asesor Gastronómico
          </button>
        </div>
      </section>
    </div>
  );
};
