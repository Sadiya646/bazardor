// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/types';
import { getBengaliDate } from '@/lib/utils';

interface NavbarProps {
  categories: Category[];
  isLoggedIn?: boolean;
}

export default function Navbar({
  categories,
  isLoggedIn = false,
}: NavbarProps) {
  const pathname = usePathname();
  const bengaliDate = getBengaliDate();

  // হোম পেজ চেক করার জন্য (pathname === '/' অথবা '/products' হতে পারে)
  const isHomeActive = pathname === '/' || pathname === '/products';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Row: Logo & Auth */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>

          <div>
            <h1 className="text-xl font-bold text-emerald-800">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">
              {bengaliDate}
            </p>
          </div>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="rounded-md border border-emerald-700 px-3 py-2 text-sm text-emerald-800 transition-colors hover:bg-emerald-50"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm text-white transition-colors hover:bg-red-700"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-md px-3 py-2 text-sm text-emerald-800 transition-colors hover:bg-emerald-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-emerald-700 px-3 py-2 text-sm text-white transition-colors hover:bg-emerald-800"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-emerald-100 bg-emerald-50">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-1.5 whitespace-nowrap">

          {/* সকল পণ্য বাটন */}
          <Link
            href="/"
            className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isHomeActive
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-100'
            }`}
          >
            🛍️ সকল পণ্য
          </Link>

          {/* ক্যাটাগরি তালিকা */}
          {categories.map((cat) => {
            const categoryPath = `/category/${cat.slug}`;
            const isActive = pathname === categoryPath;

            return (
              <Link
                key={cat.id}
                href={categoryPath}
                className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-100'
                }`}
              >
                <span>{cat.icon || cat.emoji || '🛒'}</span>
                <span>{cat.nameBn || cat.name}</span>
              </Link>
            );
          })}

        </div>
      </nav>
    </header>
  );
}