'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart and checkout details after success
    localStorage.removeItem('checkoutDetails');
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white px-4">
      <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-green-400 mb-4">Payment Successful!</h1>
        <p className="mb-6 text-gray-300">Thank you for your purchase. Your order has been placed successfully.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
