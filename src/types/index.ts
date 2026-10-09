export interface Category {
  id: string | number;
  name: string;
  nameBn?: string;
  nameEn?: string;
  slug: string;
  icon?: string;
  emoji?: string;
}

export interface BazarPrice {
  bazarName: string;
  price: string | number;
}

export interface ChangeObject {
  dir: "up" | "down" | "flat";
  pct: number;
}

export type ChangeType = "up" | "down" | "flat";

export interface Product {
  id: string | number;
  name: string;
  nameBn?: string;
  nameEn?: string;
  slug?: string;

  category: string | number;
  categoryId?: string | number;
  categoryName?: string;
  categorySlug?: string;

  unit: string;

  emoji?: string;
  icon?: string;
  image_emoji?: string;
  categoryIcon?: string;

  currentPrice?: string | number;
  current_price?: string | number;

  todayPrice?: string | number;
  today_price?: string | number;

  price?: string | number;
  rate?: string | number;
  value?: string | number;

  minPrice?: string | number;
  min_price?: string | number;

  maxPrice?: string | number;
  max_price?: string | number;

  avgPrice?: string | number;
  avg_price?: string | number;

  change: string | number | ChangeObject;
  changeType?: ChangeType;

  bazarPrices?: BazarPrice[];
}

export type SortOption =
  | "default"
  | "low-to-high"
  | "high-to-low";