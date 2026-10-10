'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('দয়া করে সব ফিল্ড পূরণ করুন');
      return;
    }
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || 'লগইন ব্যর্থ হয়েছে। ইমেইল বা পাসওয়ার্ড চেক করুন।');
        setLoading(false);
        return;
      }

      toast.success('সফলভাবে লগইন হয়েছে!');
      router.push('/');
      router.refresh();
    } catch {
      toast.error('একটি অপ্রত্যাশিত সমস্যা হয়েছে।');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      toast.loading('গুগল লগইন প্রক্রিয়াকরণ হচ্ছে...');
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch {
      toast.dismiss();
      toast.error('গুগল লগইন ব্যর্থ হয়েছে।');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      toast.loading('জিথাব লগইন প্রক্রিয়াকরণ হচ্ছে...');
      await signIn.social({
        provider: 'github',
        callbackURL: '/',
      });
    } catch {
      toast.dismiss();
      toast.error('জিথাব লগইন ব্যর্থ হয়েছে।');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-900/10 border border-emerald-100 p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/30 text-2xl font-bold">
            🛒
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">বাজার দরে স্বাগতম</h1>
          <p className="text-sm text-gray-500 mt-1">আপনার অ্যাকাউন্টে সাইন ইন করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                পাসওয়ার্ড
              </label>
              <Link href="#" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 text-sm transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-700/25 hover:shadow-emerald-700/40 active:scale-[0.98] disabled:opacity-50 mt-2 text-sm tracking-wide"
          >
            {loading ? 'লগইন হচ্ছে...' : 'সাইন ইন করুন'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/80 backdrop-blur px-3 text-gray-400 font-semibold tracking-wider">অথবা সোশ্যাল লগইন</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Google
          </button>
          <button
            onClick={handleGithubSignIn}
            type="button"
            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          কোনো অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup" className="text-emerald-700 font-bold hover:underline">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>

      </div>
    </div>
  );
}