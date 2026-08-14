export interface LandingPlan {
  id?: number;
  name: string;
  description: string;
  priceMensual: number;
  priceAnual: number;
  features: string[];
  cta: string;
  popular: boolean;
  color: string;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
