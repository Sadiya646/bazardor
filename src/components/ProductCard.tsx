'use client';

import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  categoryIcon?: string;
}

type ProductWithApiFields = Product & {
  image?: string;
categoryIcon?: string;
emoji?: string;
icon?: string;
  _id?: string | number;
  today?: string | number;
  nameBn?: string;
  nameEn?: string;
  current_price?: string | number;
  todayPrice?: string | number;
  today_price?: string | number;
  avg_price?: string | number;
  image_emoji?: string;
};

function formatPrice(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return 'দাম পাওয়া যায়নি';
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;

    return formatPrice(
      obj.price ?? obj.amount ?? obj.value ?? obj.currentPrice
    );
  }

  const text = String(value).trim();

  if (!text) return 'দাম পাওয়া যায়নি';

  const normalized = text
    .replace(/[০-৯]/g, (digit) =>
      String('০১২৩৪৫৬৭৮৯'.indexOf(digit))
    )
    .replace(/,/g, '')
    .replace(/\s*টাকা/g, '')
    .trim();

  const number = Number(normalized);

  if (normalized && Number.isFinite(number)) {
    return `${number.toLocaleString('bn-BD')} টাকা`;
  }

  return text;
}

export default function ProductCard({
  product,
  categoryIcon,
}: ProductCardProps) {
  const data = product as ProductWithApiFields;

  const name =
    data.nameBn ||
    data.name ||
    data.nameEn ||
    data.slug ||
    'পণ্যের নাম নেই';

  const unit = data.unit || 'একক উল্লেখ নেই';

  const icon =
    data.emoji ||
    data.categoryIcon ||
    data.image ||
    data.icon ||
    data.image_emoji ||
    categoryIcon ||
    '🛒';

  const price = formatPrice(
    data.today ??
      data.currentPrice ??
      data.current_price ??
      data.todayPrice ??
      data.today_price ??
      data.price ??
      data.rate ??
      data.value ??
      data.avg_price
  );

  const change = data.change;

  let isUp = false;
  let isDown = false;
  let changeText = '— ০.০%';

  if (typeof change === 'object' && change !== null) {
    isUp = change.dir === 'up';
    isDown = change.dir === 'down';

    changeText = `${
      isUp ? '▲' : isDown ? '▼' : '—'
    } ${Number(change.pct).toLocaleString('bn-BD')}%`;
  } else if (typeof change === 'string' && change.trim()) {
    changeText = change;
    isUp = change.includes('▲');
    isDown = change.includes('▼');
  } else if (data.changeType) {
    isUp = data.changeType === 'up';
    isDown = data.changeType === 'down';

    if (isUp || isDown) {
      changeText = `${isUp ? '▲' : '▼'} ০.০%`;
    }
  }

  const productId = data._id || data.id || data.slug;
  const href = `/product/${productId}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-2xl
        border border-emerald-100 bg-white p-4 shadow-sm
        transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className="flex h-14 w-14 items-center justify-center
              rounded-xl bg-emerald-50 text-3xl
              transition-transform group-hover:scale-110"
          >
            {icon}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              isUp
                ? 'bg-green-100 text-green-700'
                : isDown
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {changeText}
          </span>
        </div>

        <h3 className="font-bold text-gray-800 transition-colors group-hover:text-emerald-700">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">{unit}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-500">আজকের দাম</span>

        <span className="text-right font-bold text-emerald-800">
          {price}
        </span>
      </div>
    </Link>
  );
}