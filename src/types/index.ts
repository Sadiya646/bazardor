// types/index.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface BazarPrice {
  bazarName: string;
  price: string;
}

export interface Product {
  id: number | string;
  name: string;
  slug?: string;
  category: string;
  unit: string;
  emoji: string;
  currentPrice: string; // e.g. "১৪৮ টাকা"
  numericPrice?: number; // Sorting er jonno
  change: string; 
  changeType: 'up' | 'down' | 'flat';
  minPrice?: string;
  maxPrice?: string;
  avgPrice?: string;
  bazarPrices?: BazarPrice[];
}

export type SortOption = 'default' | 'low-to-high' | 'high-to-low';