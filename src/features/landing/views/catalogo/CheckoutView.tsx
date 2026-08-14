import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@heroui/react';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../../dashboard/stores/authStore';
import { CheckoutForm } from './components/CheckoutForm';
import { useCreateOrderMutation } from '../../hooks/useOrders';
import { ShieldCheck } from '@gravity-ui/icons';

const checkoutSchema = z.object({
  customerName: z.string().min(1, 'El nombre completo es requerido'),
  customerDocument: z.string().min(8, 'El documento debe tener al menos 8 caracteres (DNI) o 11 (RUC)'),
  customerPhone: z.string().min(9, 'El número de teléfono debe tener al menos 9 dígitos'),
  customerEmail: z.string().email('El correo electrónico es inválido'),
  shippingMethod: z.enum(['agency', 'home']),
  departmentCity: z.string().min(1, 'El departamento es requerido'),
  province: z.string().min(1, 'La provincia es requerida'),
  district: z.string().min(1, 'El distrito es requerido'),
  address: z.string().optional(),
  preferredAgency: z.string().optional(),
  paymentMethod: z.enum(['yape', 'transfer', 'card']),
}).refine(data => data.shippingMethod !== 'home' || (data.address && data.address.trim().length > 0), {
  message: 'La dirección exacta es requerida para envío a domicilio',
  path: ['address']
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

import { loadCulqiScript, openCulqiCheckout } from './utils/culqiConfig';

interface CheckoutViewProps {
  onNavigate: (view: string, subId?: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuthStore();
  const { items, getSubtotal, clearCart } = useCartStore();

  const [shippingMethod, setShippingMethod] = useState<'agency' | 'home'>('agency');
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'transfer' | 'card'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrderMutation = useCreateOrderMutation();

  const subtotal = getSubtotal();
  const shippingCost = shippingMethod === 'agency' ? 0 : 25;
  const total = subtotal + shippingCost;

  // Reference to store form data during Culqi payment flow
  const pendingOrderRef = useRef<CheckoutFormData | null>(null);

  // Load Culqi script dynamically
  useEffect(() => {
    loadCulqiScript().catch(err => console.error('Failed to load Culqi script:', err));
  }, []);

  // Robust listener to catch Culqi modal closing event
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Received postMessage from Culqi:', event.data);
      try {
        let isClosed = false;

        // 1. Raw string check
        if (event.data === 'checkout_cerrado') {
          isClosed = true;
        }
        // 2. Object property check
        else if (event.data && typeof event.data === 'object') {
          if (event.data.checkout_cerrado || event.data.action === 'checkout_cerrado') {
            isClosed = true;
          }
        }
        // 3. Stringified JSON or partial string check
        else if (typeof event.data === 'string') {
          if (event.data.includes('checkout_cerrado')) {
            isClosed = true;
          } else {
            try {
              const parsed = JSON.parse(event.data);
              if (parsed && (parsed.checkout_cerrado || parsed.action === 'checkout_cerrado')) {
                isClosed = true;
              }
            } catch (e) {
              // Not a valid JSON string
            }
          }
        }

        if (isClosed) {
          console.log('Detected Culqi checkout closing event. Restantiating button.');
          setIsProcessing(false);
        }
      } catch (err) {
        console.error('Error handling Culqi message event:', err);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Poll to detect if Culqi iframe is closed or removed from the DOM
  useEffect(() => {
    if (!isProcessing) return;

    // Wait a brief moment to let Culqi insert the iframe, then start checking
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const culqiIframe = document.querySelector('iframe[src*="culqi.com"]') ||
          document.querySelector('iframe[id*="culqi"]') ||
          document.getElementById('culqi_checkout_frame') ||
          document.querySelector('.culqi_checkout');

        // If the iframe is gone, the user cancelled or closed the modal
        if (!culqiIframe) {
          console.log('Culqi iframe no longer in DOM. Reverting isProcessing.');
          setIsProcessing(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isProcessing]);

  // React Hook Form initialization
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: user ? `${user.firstName} ${user.lastName}`.trim() : '',
      customerEmail: user?.email || '',
      customerPhone: user?.phone || '',
      customerDocument: '',
      shippingMethod: 'agency',
      departmentCity: '',
      province: '',
      district: '',
      address: '',
      preferredAgency: '',
      paymentMethod: 'card',
    }
  });

  // Reset values when user details change
  useEffect(() => {
    if (user) {
      reset({
        customerName: `${user.firstName} ${user.lastName}`.trim(),
        customerEmail: user.email,
        customerPhone: user.phone || '',
        customerDocument: '',
        shippingMethod: 'agency',
        departmentCity: '',
        province: '',
        district: '',
        address: '',
        preferredAgency: '',
        paymentMethod: 'card',
      });
    }
  }, [user, reset]);

  const handlePaymentSuccess = async (tokenId: string) => {
    const data = pendingOrderRef.current;
    if (!data) return;

    try {
      const orderPayload = {
        customerName: data.customerName,
        customerDocument: data.customerDocument,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        shippingMethod: data.shippingMethod,
        departmentCity: data.departmentCity,
        province: data.province,
        district: data.district,
        address: data.shippingMethod === 'home' ? data.address : undefined,
        preferredAgency: data.shippingMethod === 'agency' ? data.preferredAgency : undefined,
        paymentMethod: data.paymentMethod,
        status: 'paid' as const, // Marked as paid since Culqi succeeded
        subtotal,
        shippingCost,
        total,
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          unitPrice: item.price,
          quantity: item.quantity,
        })),
        paymentToken: tokenId,
      };

      await createOrderMutation.mutateAsync(orderPayload);

      toast.success('¡Pago procesado con éxito y orden confirmada!');
      clearCart();

      if (isAuthenticated) {
        onNavigate('cliente-pedidos');
      } else {
        onNavigate('catalogo');
      }
    } catch (err: any) {
      console.error(err);
      toast.danger('Error al registrar tu orden pagada. Por favor, contáctanos.');
    } finally {
      setIsProcessing(false);
      pendingOrderRef.current = null;
    }
  };

  const onConfirmOrder = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.danger('Tu carrito está vacío. Agrega productos para continuar.');
      return;
    }

    setIsProcessing(true);
    pendingOrderRef.current = data;

    // For Bank Transfer, skip Culqi tokenization
    if (data.paymentMethod === 'transfer') {
      try {
        const orderPayload = {
          customerName: data.customerName,
          customerDocument: data.customerDocument,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail,
          shippingMethod: data.shippingMethod,
          departmentCity: data.departmentCity,
          province: data.province,
          district: data.district,
          address: data.shippingMethod === 'home' ? data.address : undefined,
          preferredAgency: data.shippingMethod === 'agency' ? data.preferredAgency : undefined,
          paymentMethod: data.paymentMethod,
          status: 'pending' as const,
          subtotal,
          shippingCost,
          total,
          items: items.map(item => ({
            productId: item.id,
            productName: item.name,
            unitPrice: item.price,
            quantity: item.quantity,
          })),
        };

        await createOrderMutation.mutateAsync(orderPayload);
        toast.success('¡Orden registrada! Pendiente de validación de transferencia.');
        clearCart();

        if (isAuthenticated) {
          onNavigate('cliente-pedidos');
        } else {
          onNavigate('catalogo');
        }
      } catch (err) {
        console.error(err);
        toast.danger('Error al registrar la orden. Por favor, intente nuevamente.');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    try {
      openCulqiCheckout(
        total,
        data.customerEmail,
        async (tokenId) => {
          await handlePaymentSuccess(tokenId);
        },
        (errorMsg) => {
          toast.danger(`Pago fallido: ${errorMsg}`);
          setIsProcessing(false);
        }
      );
    } catch (err) {
      console.error('Error opening Culqi:', err);
      toast.danger('Ocurrió un error al abrir la pasarela de pagos.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 pt-12">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => onNavigate('cart')}
          className="text-sm font-bold text-slate-500 hover:text-accent transition-colors flex items-center gap-2 mb-6 cursor-pointer"
        >
          ← Volver al carrito
        </button>

        <form onSubmit={handleSubmit(onConfirmOrder)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left Column: Formulario modular */}
            <div className="lg:col-span-7">
              <CheckoutForm
                register={register}
                errors={errors}
                setValue={setValue}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            {/* Right Column: Resumen y Submit */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 lg:sticky lg:top-24 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-[#07fd02] to-emerald-400"></div>

                <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4 mb-4">Resumen de Orden</h3>

                <div className="space-y-4 mb-6 text-left">
                  {items.length === 0 && (
                    <p className="text-sm text-slate-500 italic">No hay productos en tu carrito.</p>
                  )}
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg p-1 flex-shrink-0 relative">
                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-slate-400 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] text-slate-500">S/ {item.price.toLocaleString('es-PE', { minimumFractionDigits: 2 })} c/u</p>
                      </div>
                      <span className="text-sm font-bold text-slate-900">S/ {(item.price * item.quantity).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 mb-6 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-bold">Subtotal</span>
                    <span className="font-bold text-slate-900">S/ {subtotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-500 font-bold">Envío ({shippingMethod === 'agency' ? 'Agencia' : 'Domicilio'})</span>
                    {shippingCost === 0 ? (
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 rounded uppercase text-[10px] tracking-wider">Gratis</span>
                    ) : (
                      <span className="font-bold text-slate-900">S/ {shippingCost.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-300 pt-4 mb-6 text-left">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-black text-slate-900">Total a Pagar</span>
                    <span className="text-3xl font-black text-accent leading-none">
                      S/ {total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || items.length === 0}
                  className={`w-full text-white font-black h-14 rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2 text-base transition-all transform hover:scale-[1.02] ${isProcessing || items.length === 0 ? 'bg-slate-400 cursor-not-allowed shadow-none hover:scale-100' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'}`}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      {paymentMethod === 'transfer' ? 'Confirmar Pedido' : 'Pagar con Culqi'}
                    </>
                  )}
                </button>

                <div className="mt-4 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                    Tus datos están encriptados de extremo a extremo por Culqi
                  </span>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
