import type { Equipo } from './types';
import terminalImg from '../../../../assets/equipos/terminal.png';
import impresoraImg from '../../../../assets/equipos/impresora.png';

export const catalogoData: Equipo[] = [
  {
    id: 'terminal',
    name: 'Terminal POS Todo en Uno Touch Pro',
    category: 'terminales',
    model: 'Sistematízate Touch Pro 15',
    price: 1299,
    priceTier1: 1299,
    priceTier2: 1199,
    priceTier3: 1090,
    description: 'Computadora industrial táctil de 15.6 pulgadas con procesador Intel, disco SSD y diseño de metal altamente resistente. Diseñado para un funcionamiento continuo las 24 horas.',
    specs: {
      'Tamaño de pantalla': '15.6 pulgadas',
      'Resolución': 'HD1080 (1920 * 1080)',
      'Memoria RAM': '8GB DDR4 High Speed',
      'Almacenamiento': '128GB SSD Ultrarrápido',
      'Pantalla táctil': 'Capacitiva de 10 puntos (Multi-touch)',
      'Material': 'Gabinete metálico rígido de alta durabilidad',
      'Conectividad': '6x USB, 1x HDMI, 1x VGA, 1x Ethernet LAN',
      'Uso': 'Terminal de venta comercial continuo 24/7'
    },
    features: [
      'Pantalla táctil capacitiva True-Flat de alta respuesta',
      'Procesador Intel Celeron High Speed de bajísimo consumo',
      'Estructura metálica pesada para evitar movimientos al tocar',
      'Compatible con todos los sistemas de facturación del mercado',
      'Instalación limpia sin cables expuestos'
    ],
    inclusions: 'Cable de alimentación, fuente de poder, soporte de mesa ajustable y manual de usuario en español.',
    images: [terminalImg],
    mockup: (
      <img src={terminalImg} alt="Terminal POS Touch" className="h-32 object-contain select-none" />
    )
  },
  {
    id: 'impresora',
    name: 'Impresora Térmica Homologada SUNAT 80mm',
    category: 'impresoras',
    model: 'Sistematízate Print-80',
    price: 380,
    priceTier1: 380,
    priceTier2: 350,
    priceTier3: 320,
    description: 'Impresora de tickets ultra rápida de 80mm homologada por SUNAT. Cuenta con múltiples puertos para máxima compatibilidad y cortador automático integrado.',
    specs: {
      'Ancho de impresión': '80mm (Estándar SUNAT)',
      'Velocidad de impresión': '260 mm/s Ultra Veloz',
      'Interfaz de conexión': 'USB + Ethernet (LAN) + Serial (RS232)',
      'Cortador automático': 'Garantizado para 1.5 millones de cortes',
      'Compatibilidad': 'SUNAT QR, Códigos de barra, ESC/POS',
      'Soporte de sistemas': 'Windows, Linux, Android, iOS',
      'Método de impresión': 'Térmica directa (no requiere tinta)',
      'Frecuencia': '50 - 60Hz'
    },
    features: [
      'Velocidad extrema de impresión para evitar colas de clientes',
      'Triple puerto de conexión para usar por red local o directo a PC',
      'Cortador metálico con autocorte de alta precisión',
      'Alarma de fin de papel e impresión automática de códigos QR de boletas',
      'Fácil recarga de papel en menos de 3 segundos'
    ],
    inclusions: 'Rollo de papel térmico de prueba, cable USB de datos, fuente de alimentación con cargador, y guía de controladores.',
    images: [impresoraImg],
    mockup: (
      <img src={impresoraImg} alt="Impresora Térmica" className="h-28 object-contain select-none" />
    )
  },
  {
    id: 'lector',
    name: 'Lector de Código de Barras 1D/2D Omnidireccional',
    category: 'lectores',
    model: 'Sistematízate Scan-2D',
    price: 199,
    priceTier1: 199,
    priceTier2: 180,
    priceTier3: 165,
    description: 'Lector omnidireccional USB de alta velocidad. Ideal para supermercados, farmacias y tiendas de ropa que necesitan escanear códigos en productos físicos o pantallas de celular.',
    specs: {
      'Tipo de lectura': 'Sensor CMOS de alta precisión',
      'Códigos compatibles': '1D (EAN, UPC, Code 128) y 2D (QR, PDF417)',
      'Modo de conexión': 'USB Plug & Play (sin configuración necesaria)',
      'Lectura en pantallas': 'Soportado (Celulares, tablets, laptops)',
      'Resistencia': 'Plástico ABS anti-caídas de hasta 1.5 metros',
      'Soporte/Base': 'Base metálica flexible incluida',
      'Voltaje': '5V DC',
      'Uso': 'Tiendas de retail, farmacias y bodegas'
    },
    features: [
      'Escanea códigos QR de DNI y billeteras digitales (Yape/Plin)',
      'Lectura inmediata e inteligente incluso en pantallas de baja luz',
      'Conector USB de alta velocidad chapado en cobre',
      'Base de ángulo ajustable para uso en manos libres o manual',
      'Goma antichoque en los bordes para resistir golpes diarios'
    ],
    inclusions: 'Lector de códigos de barra, cable USB de 1.8 metros, base/soporte ajustable y guía de configuración.',
    images: [],
    mockup: (
      <div className="w-20 h-24 flex flex-col items-center justify-end relative">
        <div className="w-8 h-12 bg-slate-850 rounded-t-2xl border border-slate-750 flex items-center justify-center relative">
          <div className="w-6 h-3 bg-red-500/80 rounded-sm animate-pulse" />
        </div>
        <div className="w-4 h-10 bg-slate-700 border-x border-slate-650" />
        <div className="w-12 h-2 bg-slate-800 rounded-full" />
      </div>
    )
  },
  {
    id: 'gaveta',
    name: 'Gaveta de Dinero Metálica Heavy Duty RJ11',
    category: 'lectores',
    model: 'Sistematízate Cash-41',
    price: 249,
    priceTier1: 249,
    priceTier2: 225,
    priceTier3: 200,
    description: 'Cajón monedero metálico de alta seguridad. Cuenta con apertura electrónica automatizada integrada con el sistema y compartimentos ajustables.',
    specs: {
      'Conexión': 'Puerto RJ11 (conectable a impresora de tickets)',
      'Apertura': 'Automática mediante comando de software o llave física',
      'Billetes': '5 compartimentos con pisabilletes metálicos',
      'Monedas': '8 compartimentos removibles y ajustables',
      'Ranura externa': 'Ranura frontal para guardar vouchers o cheques',
      'Material': 'Acero laminado en frío de gran grosor',
      'Seguridad': 'Chapa de 3 posiciones (bloqueo, apertura, stand-by)',
      'Ciclo de vida': 'Garantizado para más de 1 millón de aperturas'
    },
    features: [
      'Pisabilletes metálicos de alta tensión para mayor orden',
      'Ranura de almacenamiento directo sin necesidad de abrir la gaveta',
      'Chasis reforzado capaz de soportar el peso de un monitor POS encima',
      'Conexión estándar RJ11 que funciona con cualquier impresora del mercado',
      'Llaves de seguridad con diseño de cilindro antirrobo'
    ],
    inclusions: 'Juego de 2 llaves de seguridad, cable de conexión RJ11 integrado y manual de operaciones.',
    images: [],
    mockup: (
      <div className="w-28 h-12 bg-slate-800 rounded border-2 border-slate-700 flex flex-col justify-between p-1.5 shadow-lg">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-slate-900 rounded-full" />
          <div className="w-20 h-1 bg-slate-950 rounded" />
        </div>
        <div className="w-full h-4 bg-slate-900 rounded border border-slate-700 flex items-center px-2">
          <div className="w-1.5 h-1.5 bg-slate-650 rounded-full" />
        </div>
      </div>
    )
  },
  {
    id: 'kit',
    name: 'Kit Punto de Venta Completo Listo para Vender',
    category: 'kits',
    model: 'Sistematízate Kit Pyme',
    price: 1850,
    priceTier1: 1850,
    priceTier2: 1750,
    priceTier3: 1600,
    description: 'La solución definitiva para equipar tu local comercial de inmediato. Incluye terminal táctil, impresora térmica de alta velocidad, gaveta de dinero y configuración llave en mano.',
    specs: {
      'Terminal POS': 'Terminal POS Industrial Touch 15.6" Intel',
      'Impresora de tickets': 'Impresora Térmica Homologada SUNAT 80mm',
      'Cajón Monedero': 'Gaveta Metálica Heavy Duty RJ11 de 5 divisiones',
      'Software incluido': 'Sistema de Ventas Sistematízate Pre-instalado',
      'Servicio adicional': 'Configuración de RUC y SUNAT gratis por 30 días',
      'Garantía': '12 meses en hardware con cambio inmediato',
      'Conectividad del kit': 'Sincronización total mediante cables de red y USB',
      'Instalación': 'Plug & Play (conectar y listo para usar)'
    },
    features: [
      'Todo lo que necesitas para tu negocio en una sola caja',
      'Ahorra más de S/ 200 comprando los equipos en kit completo',
      'Incluye asesoría remota para registrar tus primeros comprobantes',
      'Licencia demo del software preinstalada sin costos iniciales ocultos',
      'Soporte técnico preferencial con línea directa de WhatsApp'
    ],
    inclusions: 'Terminal POS Touch, impresora de 80mm, cajón monedero, pack de 5 rollos térmicos de repuesto, manuales, y asistencia de instalación inicial remota.',
    images: [],
    mockup: (
      <div className="flex items-end gap-3 p-2 bg-slate-800/20 rounded-xl">
        <div className="w-16 h-12 bg-slate-800 rounded border border-slate-700 flex items-center justify-center shadow">
          <span className="text-[6px] text-blue-400 font-bold">POS</span>
        </div>
        <div className="w-10 h-10 bg-slate-700 rounded-md border border-slate-600 flex items-center justify-center">
          <span className="text-[6px] text-slate-300">PRINT</span>
        </div>
        <div className="w-20 h-6 bg-slate-900 rounded border border-slate-800 flex items-center justify-center">
          <span className="text-[5px] text-slate-400">GAVETA</span>
        </div>
      </div>
    )
  }
];
