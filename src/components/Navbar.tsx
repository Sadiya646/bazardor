// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Category } from '@/types';
import { getBengaliDate } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const bengaliDate = getBengaliDate();

  // Better Auth client session hook
  const { data: session, isPending } = authClient.useSession();

  // Hompage check
  const isHomeActive = pathname === '/' || pathname === '/products';

  // Logout Handler
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('সফলভাবে সাইন আউট হয়েছে!');
            router.push('/signin');
            router.refresh();
          },
          onError: () => {
            toast.error('সাইন আউট করতে সমস্যা হয়েছে।');
          },
        },
      });
    } catch {
      toast.error('একটি অপ্রত্যাশিত সমস্যা হয়েছে।');
    }
  };

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

        {/* Auth Buttons / User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? (
            <div className="text-xs text-gray-400">লোড হচ্ছে...</div>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                <span>👤</span>
                <span className="max-w-[120px] truncate">{session.user.name || 'প্রোফাইল'}</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 shadow-sm"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-md px-3 py-2 text-sm text-emerald-800 transition-colors hover:bg-emerald-50 font-medium"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-md bg-emerald-700 px-3 py-2 text-sm text-white transition-colors hover:bg-emerald-800 font-medium shadow-sm"
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