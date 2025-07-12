'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('checkoutDetails');
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 text-white">
      <div className="text-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-md w-full space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <CheckCircle className="text-green-400 animate-pulse" size={60} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-400 animate-glow">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-300 text-sm">
          Thank you for your purchase. Your order has been placed and will be processed shortly.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl font-semibold text-white transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-glow {
          animation: glow 2s infinite ease-in-out alternate;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e;
          }
          to {
            text-shadow: 0 0 20px #4ade80, 0 0 30px #4ade80;
          }
        }
      `}</style>
    </div>
  );
}
