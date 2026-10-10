'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('সফলভাবে লগআউট হয়েছে!');
            router.push('/signin');
            router.refresh();
          },
        },
      });
    } catch {
      toast.error('লগআউট করতে সমস্যা হয়েছে।');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
    >
      লগআউট
    </button>
  );
}