
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { Category } from '@/types';
import { getBengaliDate } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Logo from '@/app/assets/logo-icon.png';
import GlobalPriceTicker from '@/components/GlobalPriceTicker';

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const bengaliDate = getBengaliDate();

  const { data: session, isPending } = authClient.useSession();

  const isHomeActive =
    pathname === '/' || pathname === '/products';

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Logo and Authentication */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2"
        >
          <img
            src={Logo.src}
            alt="বাজার দর লোগো"
            className="h-10 w-10 object-contain"
          />

          <div>
            <h1 className="text-lg font-bold text-emerald-800 sm:text-xl">
              বাজার দর
            </h1>

            <p className="text-xs text-gray-500">
              {bengaliDate}
            </p>
          </div>
        </Link>

        {/* Authentication Buttons */}
        <div className="flex shrink-0 items-center gap-2">
          {isPending ? (
            <span className="text-xs text-gray-400">
              লোড হচ্ছে...
            </span>
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                className="flex max-w-36 items-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-50 px-2 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 sm:px-3"
              >
                <span>👤</span>
                <span className="truncate">
                  {session.user.name || 'প্রোফাইল'}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg bg-red-600 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 sm:px-3"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg px-2 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 sm:px-3"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-emerald-700 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 sm:px-3"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-emerald-100 bg-emerald-50">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto whitespace-nowrap px-3 py-2 sm:px-4">
          <Link
            href="/"
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isHomeActive
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-100'
            }`}
          >
            🛍️ সকল পণ্য
          </Link>

          {categories.map((cat) => {
            const categoryPath = `/category/${cat.slug}`;
            const isActive = pathname === categoryPath;

            return (
              <Link
                key={cat.id ?? cat.slug}
                href={categoryPath}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-emerald-100'
                }`}
              >
                <span className="text-base">
                  {cat.icon || cat.emoji || '🛒'}
                </span>

                <span>{cat.nameBn || cat.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Scrolling Price Ticker */}
      <div className="relative z-10 w-full">
        <GlobalPriceTicker />
      </div>
    </header>
  );
}
