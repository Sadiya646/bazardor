
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";
import Link from "next/link";

type SortOption = "default" | "low-high" | "high-low";

interface CategoryProductsProps {
  products: Product[];
}

function getPrice(product: Product): number {
  const item = product as unknown as Record<string, unknown>;

  const value =
    item.today ??
    item.currentPrice ??
    item.current_price ??
    item.price ??
    item.rate ??
    item.value;

  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const englishDigits = value
      .replace(/[০-৯]/g, (digit) =>
        String("০১২৩৪৫৬৭৮৯".indexOf(digit))
      )
      .replace(/,/g, "");

    const match = englishDigits.match(/-?\d+(\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  return 0;
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-high") {
      result.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sort === "high-low") {
      result.sort((a, b) => getPrice(b) - getPrice(a));
    }

    return result;
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <div className="rounded-xl border bg-white py-16 text-center">
        <p className="mb-3 text-5xl">🔍</p>
        <h2 className="font-semibold text-gray-700">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
        </h2>
       <Link
  href="/"
  className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
>
  হোম পেজে ফিরে যান
</Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {products.length} টি পণ্য
        </p>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          সাজান:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border bg-white px-3 py-2 outline-none focus:border-emerald-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={product.id ?? index}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
