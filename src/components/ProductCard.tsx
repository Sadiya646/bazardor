// src/components/ProductCard.tsx
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.changeType === 'up';
  const isDown = product.changeType === 'down';

  return (
    <Link 
      href={`/product/${product.id}`}
      className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Top: Emoji & Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl p-2 bg-emerald-50 rounded-lg group-hover:scale-110 transition-transform">
            {product.emoji || '🛒'}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center space-x-1 ${
            isUp ? 'bg-green-100 text-green-700' : isDown ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
          }`}>
            <span>{product.change}</span>
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 text-base group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>

        {/* Unit Line */}
        <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
      </div>

      {/* Price Row */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">আজকের দাম</span>
        <span className="font-bold text-emerald-800 text-lg">{product.currentPrice}</span>
      </div>
    </Link>
  );
}