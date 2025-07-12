'use client';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-black text-white px-4">
      <div className="text-center bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-md w-full space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <XCircle className="text-red-500 animate-pulse" size={60} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-red-500 animate-glow">
          ❌ Payment Failed
        </h1>
        <p className="text-gray-300 text-sm">
          Something went wrong during your payment. Please try again or return to dashboard.
        </p>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto py-3 px-6 bg-gray-700 hover:bg-gray-800 rounded-xl font-semibold transition-all duration-300"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl font-semibold transition-all duration-300"
          >
            Back to Dashboard
          </button>
        </div>
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
            text-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444;
          }
          to {
            text-shadow: 0 0 20px #f87171, 0 0 30px #f87171;
          }
        }
      `}</style>
    </div>
  );
}
