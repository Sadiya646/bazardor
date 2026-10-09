// src/lib/api.ts
import { Product, Category } from '@/types';

const BASE_URL = ' https://api.api-store.workers.dev/api/bazardor';

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    // অনেক সময় API সরাসরি অ্যারে না পাঠিয়ে অবজেক্টের ভিতরে পাঠাতে পারে, তাই চেক করা হচ্ছে
    return Array.isArray(data) ? data : data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  try {
    const url = category ? `${BASE_URL}/products?category=${category}` : `${BASE_URL}/products`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return Array.isArray(data) ? data : data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}