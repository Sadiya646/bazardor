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

export default function Navbar({ categories, isLoggedIn = false }: NavbarProps) {
  const pathname = usePathname();
  const bengaliDate = getBengaliDate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Row: Logo & Auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🛒</span>
          <div>
            <h1 className="text-xl font-bold text-emerald-800">বাজার দর</h1>
            <p className="text-xs text-gray-500">{bengaliDate}</p>
          </div>
        </Link>

        {/* Right Side Auth Buttons */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <Link href="/profile" className="btn btn-sm btn-outline btn-success">
                প্রোফাইল
              </Link>
              <button className="btn btn-sm btn-error text-white">
                সাইন আউট
              </button>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-ghost text-emerald-800">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white border-none">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Second Row: Category Links Navigation */}
      <nav className="bg-emerald-50 border-t border-emerald-100 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 flex space-x-6 py-2 whitespace-nowrap">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-emerald-800 border-b-2 border-emerald-700 pb-1 font-bold' : 'text-gray-600 hover:text-emerald-700'
            }`}
          >
            সকল পণ্য
          </Link>
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-emerald-800 border-b-2 border-emerald-700 pb-1 font-bold' : 'text-gray-600 hover:text-emerald-700'
                }`}
              >
                {cat.icon} {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}