// src/app/signin/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // সাধারণ ভ্যালিডেশন বা লগইন লজিক
    if (!email || !password) {
      setError('দয়া করে সব ফিল্ড পূরণ করুন');
      return;
    }
    setError('');
    // সফলভাবে লগইন হওয়ার পর হোমপেজে রিডাইরেক্ট করা
    router.push('/');
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-emerald-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl p-3 bg-emerald-50 rounded-2xl inline-block mb-3">🔐</span>
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন করুন</h1>
          <p className="text-sm text-gray-500 mt-1">আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল ঠিকানা</label>
            <input 
              type="email5" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl transition-colors shadow-sm mt-2"
          >
            লগইন করুন
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          কোনো অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup" className="text-emerald-700 font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}