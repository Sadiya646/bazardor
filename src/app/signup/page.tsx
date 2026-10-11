
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

type SocialProvider = 'google' | 'github';

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);
  const [error, setError] = useState('');

  // OAuth থেকে ফিরে এলে URL-এর error পড়ে Toast দেখাবে
  useEffect(() => {
    const url = new URL(window.location.href);
    const errorCode = url.searchParams.get('error');

    if (!errorCode) return;

    const errorMessages: Record<string, string> = {
      account_not_linked:
        'এই GitHub account-টি link করা যায়নি। আগে account তৈরি করে থাকলে সেই পদ্ধতিতে Sign In করুন।',

      account_already_linked_to_different_user:
        'এই social account অন্য একটি account-এর সঙ্গে যুক্ত আছে।',

      email_not_found:
        'Provider থেকে email পাওয়া যায়নি। আপনার account-এর email settings পরীক্ষা করুন।',

      access_denied:
        'আপনি social login বাতিল করেছেন। আবার চেষ্টা করুন।',

      state_mismatch:
        'Authentication session-এর সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    };

    const message =
      errorMessages[errorCode] ||
      `Social signup ব্যর্থ হয়েছে (${errorCode})। আবার চেষ্টা করুন।`;

    setError(message);
    toast.error(message);

    // URL থেকে error সরাবে, যাতে refresh করলে একই Toast আবার না আসে
    url.searchParams.delete('error');
    url.searchParams.delete('error_description');

    window.history.replaceState(
      {},
      '',
      `${url.pathname}${url.search}${url.hash}`
    );
  }, []);

  // Email and password signup
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError('');

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password) {
      const message = 'দয়া করে সব ফিল্ড পূরণ করুন।';
      setError(message);
      toast.error(message);
      return;
    }

    if (password.length < 6) {
      const message = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।';
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name: cleanName,
        email: cleanEmail,
        password,
      });

      if (authError) {
        const message =
          authError.message ||
          'রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';

        setError(message);
        toast.error(message);
        return;
      }

      toast.success('রেজিস্ট্রেশন সফল! এবার সাইন ইন করুন।');

      setTimeout(() => {
        router.push('/signin');
      }, 1200);
    } catch {
      const message = 'রেজিস্ট্রেশন করা যায়নি। আবার চেষ্টা করুন।';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub signup
  const handleSocialSignUp = async (
    provider: SocialProvider
  ) => {
    setSocialLoading(provider);
    setError('');

    try {
      const { error: socialError } = await authClient.signIn.social({
        provider,
        callbackURL: '/',
        errorCallbackURL: '/signup',
      });

      if (socialError) {
        const providerName =
          provider === 'google' ? 'Google' : 'GitHub';

        const message =
          socialError.message ||
          `${providerName} দিয়ে সাইন আপ করা যায়নি।`;

        setError(message);
        toast.error(message);
        setSocialLoading(null);
      }
    } catch {
      const message =
        'Social login ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';

      setError(message);
      toast.error(message);
      setSocialLoading(null);
    }
  };

  const isBusy = loading || socialLoading !== null;

  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-900/10 backdrop-blur-xl sm:p-9">
        {/* Header */}
        <div className="mb-7 text-center">
          <Link
            href="/"
            aria-label="বাজার দর হোম পেজ"
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white shadow-lg shadow-emerald-600/25"
          >
            🛒
          </Link>

          <h1 className="text-2xl font-extrabold text-gray-900">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বাজার দর অ্যাপে আপনাকে স্বাগতম
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Email signup form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              আপনার নাম
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              ইমেইল ঠিকানা
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
              minLength={6}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="w-full rounded-xl bg-emerald-700 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'অ্যাকাউন্ট তৈরি হচ্ছে...'
              : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">
            অথবা
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google signup */}
        <button
          type="button"
          onClick={() => handleSocialSignUp('google')}
          disabled={isBusy}
          className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            viewBox="0 0 48 48"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.9 6-15Z"
            />
            <path
              fill="#34A853"
              d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20 20 0 0 0 24 44Z"
            />
            <path
              fill="#FBBC05"
              d="M12.8 27.8a12 12 0 0 1 0-7.6v-5.3H5.9a20 20 0 0 0 0 18.2l6.9-5.3Z"
            />
            <path
              fill="#EA4335"
              d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.9 14.9l6.9 5.3C14.4 15.5 18.8 12 24 12Z"
            />
          </svg>

          {socialLoading === 'google'
            ? 'Google-এ সংযোগ হচ্ছে...'
            : 'Google দিয়ে সাইন আপ'}
        </button>

        {/* GitHub signup */}
        <button
          type="button"
          onClick={() => handleSocialSignUp('github')}
          disabled={isBusy}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.04-1.15 3.04-1.15.61 1.53.23 2.67.12 2.95.72.78 1.15 1.78 1.15 3.01 0 4.27-2.6 5.21-5.08 5.49.4.34.75 1.01.75 2.04V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
          </svg>

          {socialLoading === 'github'
            ? 'GitHub-এ সংযোগ হচ্ছে...'
            : 'GitHub দিয়ে সাইন আপ'}
        </button>

        {/* Sign in link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link
            href="/signin"
            className="font-bold text-emerald-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
