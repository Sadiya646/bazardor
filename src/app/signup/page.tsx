// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';
import toast, { Toaster } from 'react-hot-toast'; // ১. টোস্ট ইমপোর্ট করা হলো

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('দয়া করে সব ফিল্ড পূরণ করুন');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
      });

      if (authError) {
        setError(authError.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
        setLoading(false);
        return;
      }

      // ২. অ্যাকাউন্ট তৈরি সফল হলে টোস্ট মেসেজ দেখাবে
      toast.success('রেজিস্ট্রেশন সফল হয়েছে! স্বাগতম!');

      // একটু দেরীতে রিডাইরেক্ট হবে যাতে টোস্ট মেসেজটি দেখা যায়
      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (err) {
      setError('একটি অপ্রত্যাশিত সমস্যা হয়েছে।');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white px-4 py-12">
      {/* ৩. টোস্ট কম্পোনেন্ট এখানে রেন্ডার করা হলো */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-900/10 border border-emerald-100 p-8 sm:p-10">
        
        {/* Top Icon & Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/30 text-2xl font-bold">
            ✨
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-sm text-gray-500 mt-1">বাজার দর অ্যাপে আপনাকে স্বাগতম</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 rounded-2xl border border-red-200 text-center font-medium shadow-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              আপনার নাম
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              ইমেইল ঠিকানা
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              পাসওয়ার্ড
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 text-sm transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-700/25 hover:shadow-emerald-700/40 active:scale-[0.98] disabled:opacity-50 mt-2 text-sm tracking-wide"
          >
            {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/80 backdrop-blur px-3 text-gray-400 font-semibold tracking-wider">অথবা</span>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link href="/signin" className="text-emerald-700 font-bold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>

      </div>
    </div>
  );
}