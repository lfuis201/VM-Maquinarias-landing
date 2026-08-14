import React, { useState } from 'react';
import { OrderRow } from './OrderRow';
import { OrderDetailModal } from './OrderDetailModal';
import { OrderEditModal } from './OrderEditModal';
import { useAdminOrdersQuery, useUpdateOrderStatusMutation, useUpdateOrderMutation } from '../../../landing/hooks/useOrders';

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

export const OrdersTab: React.FC = () => {
  const { data: ordersData, isLoading, error } = useAdminOrdersQuery();
  const updateStatusMutation = useUpdateOrderStatusMutation();
  const updateOrderMutation = useUpdateOrderMutation();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Edit Modal State
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Handlers
  const handleUpdateStatus = async (orderId: string, newStatus: any) => {
    try {
      await updateStatusMutation.mutateAsync({ id: orderId, status: newStatus });
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (order: any) => {
    setEditingOrder(order);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (updatedOrder: any) => {
    try {
      await updateOrderMutation.mutateAsync({ id: updatedOrder.id, data: updatedOrder });
      setIsEditOpen(false);
      setEditingOrder(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        <p className="text-xs text-slate-500 mt-3 font-semibold">Cargando pedidos desde el servidor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-150 p-6 rounded-2xl text-center text-red-700 font-semibold text-xs">
        Error al cargar los pedidos: {error.message}
      </div>
    );
  }

  const orders = Array.isArray(ordersData) ? (ordersData as any[]) : [];

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm) ||
      order.id.includes(searchTerm) ||
      (order.customerDocument && order.customerDocument.includes(searchTerm));

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Title & Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Control de Pedidos</h2>
          <p className="text-xs text-slate-500">Gestión de facturación, despachos y estado de envío de equipos vendidos.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar por pedido, cliente o documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-slate-900 text-xs outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtrar Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs font-bold outline-none cursor-pointer transition-all"
          >
            <option value="all">Todos los Estados</option>
            <option value="pending">Pendientes</option>
            <option value="paid">Pagados</option>
            <option value="shipped">Enviados</option>
            <option value="completed">Completados</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>
      </div>

      {/* Orders List Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Código Pedido</th>
                <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Cliente</th>
                <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Fecha / Envío</th>
                <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Método Pago</th>
                <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Total</th>
                <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Estado</th>
                <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onViewDetails={setSelectedOrder}
                  onEditOrder={handleEditClick}
                />
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 font-semibold">
                    No se encontraron pedidos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Order Editor Modal */}
      <OrderEditModal
        order={editingOrder}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingOrder(null);
        }}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};
