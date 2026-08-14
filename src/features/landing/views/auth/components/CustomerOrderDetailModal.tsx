import React from 'react';
import {
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@heroui/react';
import type { Order } from '../../../types/order';

interface CustomerOrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

export const CustomerOrderDetailModal: React.FC<CustomerOrderDetailModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      shipped: 'bg-blue-50 text-blue-700 border-blue-200',
      completed: 'bg-slate-50 text-slate-700 border-slate-200',
      cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
    };

    const labels = {
      pending: 'Pendiente',
      paid: 'Pagado',
      shipped: 'Enviado',
      completed: 'Completado',
      cancelled: 'Cancelado',
    };

    return (
      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getPaymentLabel = (method: Order['paymentMethod']) => {
    const labels = {
      yape: 'Yape / Plin',
      transfer: 'Transferencia',
      card: 'Tarjeta',
    };
    return labels[method] || method;
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <ModalBackdrop
      isOpen={!!order}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="bg-slate-900/60 backdrop-blur-sm fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
    >
      <ModalContainer>
        <ModalDialog className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] text-left animate-scale-up">
          <ModalHeader className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-1 relative">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-base font-black text-slate-900">Detalles de la Orden</span>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-[11px] text-slate-500 font-bold mt-1">
              Código de pedido: <span className="font-mono text-slate-800">{order.id}</span>
            </p>
            <p className="text-[10px] text-slate-450 font-medium">
              Realizado el {formatDate(order.createdAt)}
            </p>

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors border-none outline-none"
              type="button"
            >
              ✕
            </button>
          </ModalHeader>

          <ModalBody className="p-6 space-y-6 text-slate-800 overflow-y-auto flex-1">
            {/* Products List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-slate-900 rounded-full"></span>
                Productos Adquiridos
              </h4>
              <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-450 uppercase font-black tracking-wider border-b border-slate-100">
                      <th className="p-3">Producto</th>
                      <th className="p-3 text-center">Cant.</th>
                      <th className="p-3 text-right">Unitario</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                    {order.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="p-3 text-slate-900 font-extrabold">{item.productName}</td>
                        <td className="p-3 text-center text-slate-500">{item.quantity}</td>
                        <td className="p-3 text-right text-slate-550">S/ {Number(item.unitPrice).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</td>
                        <td className="p-3 text-right text-slate-900 font-extrabold">
                          S/ {(Number(item.unitPrice) * item.quantity).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Delivery & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping info */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-slate-900 rounded-full"></span>
                  Información de Entrega
                </h4>
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-2 font-bold text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-450">Método:</span>
                    <span className="capitalize">{order.shippingMethod === 'agency' ? 'Retiro en Agencia' : 'Envío a Domicilio'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-450">Destino:</span>
                    <span>
                      {[order.departmentCity, order.province, order.district]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                  {order.shippingMethod === 'home' && order.address && (
                    <div className="flex flex-col gap-1 border-t border-slate-100 pt-2 mt-2">
                      <span className="text-slate-450">Dirección exacta:</span>
                      <span className="text-slate-900 font-extrabold">{order.address}</span>
                    </div>
                  )}
                  {order.shippingMethod === 'agency' && order.preferredAgency && (
                    <div className="flex flex-col gap-1 border-t border-slate-100 pt-2 mt-2">
                      <span className="text-slate-450">Agencia de despacho:</span>
                      <span className="text-slate-900 font-extrabold">{order.preferredAgency}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Totals & Payment method */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-slate-900 rounded-full"></span>
                  Resumen de Pago
                </h4>
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-2.5 font-bold text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-450">Medio de Pago:</span>
                    <span>{getPaymentLabel(order.paymentMethod)}</span>
                  </div>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <div className="flex justify-between">
                    <span className="text-slate-450">Subtotal:</span>
                    <span>S/ {Number(order.subtotal).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-450">Costo Envío:</span>
                    <span>
                      {Number(order.shippingCost) === 0 ? (
                        <span className="text-emerald-600">Gratis</span>
                      ) : (
                        `S/ ${Number(order.shippingCost).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-dashed border-slate-200 pt-2.5 mt-2">
                    <span className="text-slate-900 font-extrabold">Total Pagado:</span>
                    <span className="text-accent font-extrabold text-base leading-none">
                      S/ {Number(order.total).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <Button
              onPress={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-10 px-6 rounded-xl transition-all cursor-pointer border-none"
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalDialog>
      </ModalContainer>
    </ModalBackdrop>
  );
};
