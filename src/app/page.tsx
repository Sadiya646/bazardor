
'use client';

import { useEffect, useState } from 'react';

import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

import { fetchCategories, fetchProducts } from '@/lib/api';
import type { Category, Product, ChangeType } from '@/types';

interface ChangeInfo {
  text: string;
  type: ChangeType;
}

interface TickerItem {
  emoji: string;
  name: string;
  price: string | number;
  change: string;
  changeType: ChangeType;
}

function getChangeInfo(change: Product['change']): ChangeInfo {
  if (typeof change === 'object' && change !== null) {
    const type: ChangeType =
      change.dir === 'up'
        ? 'up'
        : change.dir === 'down'
          ? 'down'
          : 'flat';

    const symbol =
      type === 'up' ? '▲' : type === 'down' ? '▼' : '—';

    return {
      text: `${symbol} ${change.pct}%`,
      type,
    };
  }

  const value = String(change ?? '').trim();

  if (value.includes('▲') || value.startsWith('+')) {
    return { text: value, type: 'up' };
  }

  if (value.includes('▼') || value.startsWith('-')) {
    return { text: value, type: 'down' };
  }

  return { text: value || '—', type: 'flat' };
}

function getCategoryIcon(
  product: Product,
  categories: Category[],
): string {
  const productCategory = String(
    product.categoryId ?? product.categorySlug ?? product.category,
  ).toLowerCase();

  const category = categories.find((item) => {
    const idMatches = String(item.id).toLowerCase() === productCategory;
    const slugMatches = item.slug?.toLowerCase() === productCategory;
    const nameMatches = item.name?.toLowerCase() === productCategory;

    return idMatches || slugMatches || nameMatches;
  });

  return (
    product.emoji ||
    product.icon ||
    product.image_emoji ||
    category?.icon ||
    category?.emoji ||
    '🛒'
  );
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [categoryData, productData] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);

        if (!active) return;

        setCategories(categoryData);
        setProducts(productData);
      } catch (err: unknown) {
        if (!active) return;

        console.error('Failed to load homepage data:', err);
        setError('পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      active = false;
    };
  }, []);

  const risers = products
    .filter((product) => getChangeInfo(product.change).type === 'up')
    .slice(0, 6);

  const fallers = products
    .filter((product) => getChangeInfo(product.change).type === 'down')
    .slice(0, 6);

  const tickerItems: TickerItem[] = products.map((product) => {
    const changeInfo = getChangeInfo(product.change);

    return {
      emoji: getCategoryIcon(product, categories),
      name: product.nameBn ?? product.name,
      price:
        product.currentPrice ??
        product.current_price ??
        product.todayPrice ??
        product.today_price ??
        product.price ??
        product.rate ??
        product.value ??
        product.avgPrice ??
        product.avg_price ??
        '—',
      change: changeInfo.text,
      changeType: changeInfo.type,
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* <Navbar categories={categories} /> */}

     

      <main className="flex-grow">
        <Hero />

        <div className="mx-auto my-8 max-w-6xl space-y-12 px-4">
          {loading ? (
            <div
              className="space-y-6"
              aria-label="পণ্যের তথ্য লোড হচ্ছে"
              aria-busy="true"
            >
              <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className="h-40 animate-pulse rounded-xl bg-gray-200"
                  />
                ))}
              </div>
            </div>
          ) : error ? (
            <div
              className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
              role="alert"
            >
              <p className="text-red-700">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800"
              >
                আবার চেষ্টা করো
              </button>
            </div>
          ) : products.length === 0 ? (
            <p className="rounded-xl bg-white p-8 text-center text-gray-600">
              এখনো কোনো পণ্যের তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <>
              {/* Section A: দাম বেড়েছে */}
              {risers.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">
                      📈
                    </span>

                    <h2 className="text-xl font-bold text-red-600">
                      আজ দাম বেড়েছে ▲
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {risers.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        categoryIcon={getCategoryIcon(product, categories)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Section B: দাম কমেছে */}
              {fallers.length > 0 && (
                <section>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">
                      📉
                    </span>

                    <h2 className="text-xl font-bold text-green-600">
                      আজ দাম কমেছে ▼
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {fallers.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        categoryIcon={getCategoryIcon(product, categories)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Section C: সব পণ্য */}
              <section id="shob-ponno" className="scroll-mt-24 pt-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-emerald-900">
                    সব পণ্য
                  </h2>

                  <p className="text-sm text-gray-500">
                    বাজারের নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও বর্তমান মূল্য
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      categoryIcon={getCategoryIcon(product, categories)}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
