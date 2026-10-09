// src/app/category/[slug]/page.tsx
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // ক্যাটাগরি ও প্রোডাক্ট ডেটা ফেচ করা
  const categories = await fetchCategories();
  const currentCategory = categories.find((cat) => cat.slug === slug);
  const products = await fetchProducts(slug);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-emerald-600 transition-colors">হোম</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">
              {currentCategory ? currentCategory.name : slug}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span>{currentCategory?.icon || '📦'}</span>
            <span>{currentCategory ? currentCategory.name : slug} ক্যাটাগরির বাজার দর</span>
          </h1>
          <p className="text-gray-500 mt-1">
            এই ক্যাটাগরিতে মোট {products.length} টি পণ্য পাওয়া গেছে।
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-5xl mb-3">🔍</p>
            <h3 className="text-lg font-semibold text-gray-700">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-sm text-gray-400 mt-1">দয়া করে অন্য ক্যাটাগরি চেক করুন।</p>
            <Link 
              href="/"
              className="inline-block mt-4 px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}