import React from 'react';
import { Button } from '@heroui/react';

// Interfaces representing Backend Schemas
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
}

interface OrderRowProps {
  order: any;
  onViewDetails: (order: any) => void;
  onEditOrder: (order: any) => void;
}

export const OrderRow: React.FC<OrderRowProps> = ({ order, onViewDetails, onEditOrder }) => {
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
      case 'transfer': return 'Transfer';
      case 'card': return 'Tarjeta';
      default: return method;
    }
  };

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors">
      <td className="p-4">
        <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100/80 px-2 py-1 rounded">
          #{order.id.slice(0, 8)}
        </span>
      </td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">{order.customerName}</span>
          <span className="text-[10px] text-slate-500 mt-0.5">{order.customerEmail} | Tlf: {order.customerPhone}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="text-xs text-slate-700 font-semibold">
            {new Date(order.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
            {order.shippingMethod === 'home' ? (
              <>
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                A domicilio ({order.district})
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Retiro Agencia
              </>
            )}
          </span>
        </div>
      </td>
      <td className="p-4">
        <span className="text-xs text-slate-600 font-semibold">
          {getPaymentMethodLabel(order.paymentMethod)}
        </span>
      </td>
      <td className="p-4">
        <span className="font-bold text-slate-900">S/. {Number(order.total).toFixed(2)}</span>
      </td>
      <td className="p-4">
        <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase border ${getStatusColor(order.status)}`}>
          {getStatusLabel(order.status)}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex justify-end items-center gap-2">
          <Button
            size="sm"
            className="font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white rounded-lg h-8 cursor-pointer px-3 transition-all flex items-center gap-1"
            onClick={() => onViewDetails(order)}
          >
            Detalles
          </Button>
          <Button
            size="sm"
            className="font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg h-8 cursor-pointer px-3 transition-all flex items-center gap-1"
            onClick={() => onEditOrder(order)}
          >
            Editar
          </Button>
        </div>
      </td>
    </tr>
  );
};
