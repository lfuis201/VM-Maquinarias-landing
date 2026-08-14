import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { useAuthStore } from '../../../dashboard/stores/authStore';
import { useMyOrdersQuery } from '../../hooks/useOrders';
import type { Order } from '../../types/order';
import { CustomerOrderDetailModal } from './components/CustomerOrderDetailModal';

interface CustomerOrdersViewProps {
  onNavigate: (view: string, subId?: string) => void;
}

export const CustomerOrdersView: React.FC<CustomerOrdersViewProps> = ({ onNavigate }) => {
  const { user, token } = useAuthStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: ordersData, isLoading } = useMyOrdersQuery();
  const orders = Array.isArray(ordersData) ? ordersData : [];

  React.useEffect(() => {
    if (!token || !user) {
      onNavigate('cliente-auth');
    }
  }, [token, user, onNavigate]);

  if (!token || !user) {
    return null;
  }

  const getStatusBadge = (status: Order['status']) => {
    const styles: Record<Order['status'], string> = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      paid: 'bg-blue-50 text-blue-700 border-blue-200',
      shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
    };

    const labels: Record<Order['status'], string> = {
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

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-accent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-bold mt-4">Cargando tus pedidos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-view text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Mis Pedidos</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Historial de compras y seguimiento de tus pedidos en Sistematízate.
          </p>
        </div>
        <Button
          onPress={() => onNavigate('catalogo')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-10 px-5 rounded-xl transition-all cursor-pointer"
        >
          Explorar Catálogo
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-lg shadow-slate-100/50 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 text-slate-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-base font-black text-slate-800">Aún no tienes pedidos</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
            Cuando realices una compra de equipos en nuestro catálogo POS, verás su progreso y detalles aquí.
          </p>
          <Button
            onPress={() => onNavigate('catalogo')}
            className="bg-accent hover:bg-accent-light text-primary font-black text-xs h-10 px-6 rounded-xl mt-5 shadow-lg shadow-accent/25 cursor-pointer"
          >
            Comprar Equipos POS
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="p-4 text-slate-550 font-black uppercase tracking-wider">ID Pedido</th>
                  <th className="p-4 text-slate-550 font-black uppercase tracking-wider">Fecha / Hora</th>
                  <th className="p-4 text-slate-550 font-black uppercase tracking-wider">Método Pago</th>
                  <th className="p-4 text-slate-550 font-black uppercase tracking-wider">Total</th>
                  <th className="p-4 text-slate-550 font-black uppercase tracking-wider">Estado</th>
                  <th className="p-4 text-slate-550 font-black uppercase tracking-wider text-right">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-slate-900 font-extrabold uppercase truncate max-w-[120px]">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="p-4 text-slate-500 font-medium">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="p-4">
                      {getPaymentLabel(order.paymentMethod)}
                    </td>
                    <td className="p-4 text-slate-900 font-extrabold text-sm">
                      S/ {Number(order.total).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs font-black text-slate-800 hover:text-accent transition-colors bg-slate-100/80 hover:bg-slate-200 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <CustomerOrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};
