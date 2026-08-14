export interface OrderItem {
  id?: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice?: number;
}

export interface Order {
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
  subtotal: number;
  shippingCost: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt?: string;
}
