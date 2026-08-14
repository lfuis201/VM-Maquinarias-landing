import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/react';

interface Order {
  id: string;
  customerName: string;
  customerDocument: string;
  customerPhone: string;
  customerEmail: string;
  shippingMethod: 'agency' | 'home';
  departmentCity: string;
  province: string;
  district: string;
  address?: string;
  preferredAgency?: string;
  paymentMethod: 'yape' | 'transfer' | 'card';
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: string;
}

interface OrderEditModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedOrder: Order) => void;
}

export const OrderEditModal: React.FC<OrderEditModalProps> = ({
  order,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerDocument, setCustomerDocument] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'home' | 'agency'>('home');
  const [departmentCity, setDepartmentCity] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [preferredAgency, setPreferredAgency] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'transfer' | 'card'>('yape');
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName);
      setCustomerDocument(order.customerDocument);
      setCustomerPhone(order.customerPhone);
      setCustomerEmail(order.customerEmail);
      setShippingMethod(order.shippingMethod);
      setDepartmentCity(order.departmentCity);
      setProvince(order.province);
      setDistrict(order.district);
      setAddress(order.address || '');
      setPreferredAgency(order.preferredAgency || '');
      setPaymentMethod(order.paymentMethod);
      setSubtotal(order.subtotal);
      setShippingCost(order.shippingCost);
    }
  }, [order, isOpen]);

  if (!isOpen || !order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTotal = subtotal + shippingCost;
    onSubmit({
      ...order,
      customerName,
      customerDocument,
      customerPhone,
      customerEmail,
      shippingMethod,
      departmentCity,
      province,
      district,
      address: shippingMethod === 'home' ? address : undefined,
      preferredAgency: shippingMethod === 'agency' ? preferredAgency : undefined,
      paymentMethod,
      subtotal,
      shippingCost,
      total: finalTotal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] animate-scale-up text-left">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-900">Editar Información del Pedido</h3>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">
              ID: {order.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-150">Datos del Cliente</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Nombre / Razón Social</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">DNI / RUC</label>
                  <input
                    type="text"
                    required
                    value={customerDocument}
                    onChange={(e) => setCustomerDocument(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all font-mono"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Celular</label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Correo</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Shipping details */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-150">Información de Envío</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 flex flex-col col-span-1 md:col-span-3">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Método de Envío</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        checked={shippingMethod === 'home'}
                        onChange={() => setShippingMethod('home')}
                        className="text-indigo-650"
                      />
                      A Domicilio
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        checked={shippingMethod === 'agency'}
                        onChange={() => setShippingMethod('agency')}
                        className="text-indigo-650"
                      />
                      Retiro en Agencia
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Departamento</label>
                  <input
                    type="text"
                    required
                    value={departmentCity}
                    onChange={(e) => setDepartmentCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Provincia</label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Distrito</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                  />
                </div>

                {shippingMethod === 'home' ? (
                  <div className="space-y-1.5 flex flex-col col-span-1 md:col-span-3">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Dirección Completa</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5 flex flex-col col-span-1 md:col-span-3">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Agencia de Transporte ( Shalom, Marvisur, etc. )</label>
                    <input
                      type="text"
                      required
                      value={preferredAgency}
                      onChange={(e) => setPreferredAgency(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Payment & Totals */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-150">Pago y Costos</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Método de Pago</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-3 py-2 text-slate-900 text-xs font-bold outline-none cursor-pointer"
                  >
                    <option value="yape">Yape / Plin</option>
                    <option value="transfer">Transferencia Bancaria</option>
                    <option value="card">Tarjeta de Crédito</option>
                  </select>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Subtotal (S/.)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={subtotal}
                    onChange={(e) => setSubtotal(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all font-mono"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Envío (S/.)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={shippingCost}
                    onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl px-4 py-2 text-slate-900 text-xs outline-none transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Total calculation indicator */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600">Cálculo de Total Automático:</span>
              <span className="text-base font-black text-indigo-650 font-mono">
                S/. {(subtotal + shippingCost).toFixed(2)}
              </span>
            </div>

          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
            <Button
              type="button"
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl h-10 cursor-pointer text-xs"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-slate-900 hover:bg-slate-805 text-white font-bold px-4 py-2 rounded-xl h-10 cursor-pointer text-xs"
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
