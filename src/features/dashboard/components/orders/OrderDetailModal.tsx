import React from 'react';
import { Button } from '@heroui/react';

interface OrderItem {
  id?: string;
  productId: string;
  productName: string;
  unitPrice: number | string;
  quantity: number;
  totalPrice?: number | string;
}

interface Order {
  id: string;
  customerName: string;
  customerDocument?: string;
  customerPhone: string;
  customerEmail: string;
  shippingMethod: 'agency' | 'home';
  departmentCity?: string;
  province?: string;
  district?: string;
  address?: string;
  preferredAgency?: string;
  paymentMethod: 'yape' | 'transfer' | 'card';
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  subtotal: number | string;
  shippingCost: number | string;
  total: number | string;
  items: OrderItem[];
  createdAt: string;
  updatedAt?: string;
}

interface OrderDetailModalProps {
  order: any;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200/50';
      case 'paid':
        return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'shipped':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/50';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200/50';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/50';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'paid': return 'Pagado';
      case 'shipped': return 'Enviado';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getPaymentMethodLabel = (method: Order['paymentMethod']) => {
    switch (method) {
      case 'yape': return 'Yape / Plin';
      case 'transfer': return 'Transferencia Bancaria';
      case 'card': return 'Tarjeta Crédito/Débito';
      default: return method;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] animate-scale-up text-left">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Detalles del Pedido
              <span className="font-mono text-xs text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                #{order.id.slice(4, 15)}...
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">Registrado el {new Date(order.createdAt).toLocaleString('es-PE')}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Order Status Controller */}
          <div className="bg-indigo-900/5 border border-indigo-100 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">Estado Actual:</span>
              <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full uppercase border ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">Cambiar a:</span>
              <div className="flex flex-wrap gap-1">
                {(['pending', 'paid', 'shipped', 'completed', 'cancelled'] as Order['status'][]).map((st) => {
                  if (st === order.status) return null;
                  return (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(order.id, st)}
                      className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-all cursor-pointer capitalize"
                    >
                      {getStatusLabel(st)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Two Column details: Customer Info & Shipping/Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider pb-1.5 border-b border-slate-200/60">Datos del Cliente</h4>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-450 block text-[10px] font-bold uppercase">Nombre Completo</span>
                  <span className="font-semibold text-slate-900">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-450 block text-[10px] font-bold uppercase">Documento de Identidad (RUC/DNI)</span>
                  <span className="font-mono font-semibold text-slate-800">{order.customerDocument || 'No ingresado'}</span>
                </div>
                <div>
                  <span className="text-slate-450 block text-[10px] font-bold uppercase">Correo Electrónico</span>
                  <span className="font-semibold text-slate-800">{order.customerEmail}</span>
                </div>
                <div>
                  <span className="text-slate-450 block text-[10px] font-bold uppercase">Número de Contacto</span>
                  <span className="font-semibold text-slate-800">{order.customerPhone}</span>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Details */}
            <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider pb-1.5 border-b border-slate-200/60">Despacho y Pago</h4>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-450 block text-[10px] font-bold uppercase">Método de Envío</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {order.shippingMethod === 'home' ? 'Envío a domicilio' : 'Retiro en agencia'}
                  </span>
                </div>
                {order.shippingMethod === 'home' ? (
                  <div>
                    <span className="text-slate-450 block text-[10px] font-bold uppercase">Dirección de Entrega</span>
                    <span className="font-semibold text-slate-800">
                      {order.address}, {order.district} - {order.province}, {order.departmentCity}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-450 block text-[10px] font-bold uppercase">Agencia de Carga Preferida</span>
                    <span className="font-semibold text-slate-800">
                      {order.preferredAgency} ({order.district} - {order.departmentCity})
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-slate-450 block text-[10px] font-bold uppercase">Método de Pago Seleccionado</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    {getPaymentMethodLabel(order.paymentMethod)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-150">Productos en el Pedido</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-650 font-bold">
                    <th className="p-3">Producto / Accesorio</th>
                    <th className="p-3 text-center">Cant.</th>
                    <th className="p-3 text-right">Precio Unit.</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item: any) => (
                    <tr key={item.id} className="border-b border-slate-100 last:border-none">
                      <td className="p-3 font-semibold text-slate-900">{item.productName}</td>
                      <td className="p-3 text-center font-bold text-slate-700">{item.quantity}</td>
                      <td className="p-3 text-right text-slate-600">S/. {Number(item.unitPrice).toFixed(2)}</td>
                      <td className="p-3 text-right font-bold text-slate-900">S/. {Number(item.totalPrice ?? (Number(item.unitPrice) * item.quantity)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Totals Summary */}
          <div className="flex justify-end">
            <div className="w-full sm:w-64 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Subtotal:</span>
                <span>S/. {Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>Costo de envío:</span>
                <span>{Number(order.shippingCost) > 0 ? `S/. ${Number(order.shippingCost).toFixed(2)}` : 'Gratis'}</span>
              </div>
              <div className="h-px bg-slate-250 my-1"></div>
              <div className="flex justify-between text-sm font-black text-slate-900">
                <span>Total a Pagar:</span>
                <span className="text-indigo-650">S/. {Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
          <Button
            size="sm"
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer"
            onClick={onClose}
          >
            Cerrar
          </Button>
          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl h-10 cursor-pointer flex items-center gap-1.5"
              onClick={() => onUpdateStatus(order.id, 'completed')}
            >
              Marcar como Completado
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
