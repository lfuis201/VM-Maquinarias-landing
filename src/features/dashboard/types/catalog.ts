export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  id?: string;
  name: string;
  category: string;
  model: string;
  price: number;
  priceTier1?: number;
  priceTier2?: number;
  priceTier3?: number;
  description: string;
  specs?: Record<string, string>;
  features?: string[];
  inclusions?: string;
  images?: string[];
}
