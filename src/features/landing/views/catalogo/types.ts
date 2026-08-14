import React from 'react';

export interface Equipo {
  id: string;
  name: string;
  category: 'terminales' | 'impresoras' | 'lectores' | 'kits';
  model: string;
  price: number;
  priceTier1: number; // 1-4 units
  priceTier2: number; // 5-9 units
  priceTier3: number; // >= 10 units
  description: string;
  specs: Record<string, string>;
  features: string[];
  inclusions: string;
  images?: string[]; // main image array
  mockup?: React.ReactNode; // optional inline styled mockup if no image
}
