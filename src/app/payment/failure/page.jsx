'use client';
import { useRouter } from 'next/navigation';

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white px-4">
      <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Payment Failed</h1>
        <p className="mb-6 text-gray-300">Something went wrong during your payment. Please try again.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
