// src/app/product/[id]/page.tsx
import { fetchProducts } from '@/lib/api';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { Product, ChangeObject } from '@/types';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  // ১. সার্ভার সাইডে সেশন চেক করা (লগইন করা না থাকলে সরাসরি /signin এ পাঠাবে)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  const { id } = await params;

  // সব প্রোডাক্ট থেকে নির্দিষ্ট আইডির প্রোডাক্টটি খুঁজে বের করা
  const products: Product[] = await fetchProducts();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    notFound();
  }

  // Safe change parsing
  let changeDisplay = '';
  let isUp = false;
  let isDown = false;

  const changeVal = product.change;
  if (typeof changeVal === 'object' && changeVal !== null) {
    const ch = changeVal as ChangeObject;
    isUp = ch.dir === 'up';
    isDown = ch.dir === 'down';
    changeDisplay = `${isUp ? '▲ বাড়ছে' : isDown ? '▼ কমেছে' : '—'} ${ch.pct}%`;
  } else if (typeof changeVal === 'string') {
    changeDisplay = changeVal;
    isUp = changeDisplay.includes('▲');
    isDown = changeDisplay.includes('▼');
  }

  const productName = product.name || product.slug || 'Unnamed Product';
  const productPrice = product.currentPrice || product.price || product.rate || product.value || '—';
  const productIcon = product.emoji || product.icon || '🛒';

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600 transition-colors">হোম</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{productName}</span>
        </div>

        {/* Main Product Card Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <span className="text-5xl p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                {productIcon}
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                  {productName}
                </h1>
                <p className="text-sm text-gray-500 mt-1">পরিমাণ/একক: {product.unit || 'নির্দিষ্ট নেই'}</p>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 text-left md:text-right">
              <span className="text-xs text-emerald-700 font-medium block">আজকের গড় দাম</span>
              <div className="text-3xl font-extrabold text-emerald-900 mt-1 flex items-center md:justify-end gap-1">
                <span>৳</span>
                <span>{productPrice}</span>
              </div>
              {changeDisplay && (
                <div className={`text-xs mt-2 font-semibold inline-flex items-center px-2 py-0.5 rounded-full ${
                  isUp ? 'bg-green-100 text-green-700' : isDown ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {changeDisplay} (গতকালের তুলনায়)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bazar Prices List (বিভিন্ন বাজারের দামের তালিকা) */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏪</span> বিভিন্ন বাজারের খুচরা ও পাইকারি দাম
          </h2>

          {product.bazarPrices && product.bazarPrices.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {product.bazarPrices.map((bp, index) => (
                <div key={index} className="py-3 flex items-center justify-between">
                  <span className="font-medium text-gray-700">{bp.bazarName}</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg">
                    ৳ {bp.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>এই পণ্যের জন্য নির্দিষ্ট বাজারের কোনো আলাদা মূল্য তালিকা পাওয়া যায়নি।</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-sm"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}