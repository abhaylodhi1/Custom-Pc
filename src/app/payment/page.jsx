'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem('checkoutDetails');
    if (!storedDetails) {
      router.push('/checkout');
    } else {
      setDetails(JSON.parse(storedDetails));
    }
  }, [router]);

  const handlePayment = () => {
    if (!paymentMethod) return alert('Please select a payment method');

    // Simulate success or failure
    const isSuccess = Math.random() > 0.3; // 70% chance of success
    setTimeout(() => {
      router.push(isSuccess ? '/payment/success' : '/payment/failure');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Payment Options</h1>
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4">

        <p className="text-center text-sm text-gray-400">Select your preferred payment method:</p>

        {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery'].map((method) => (
          <label
            key={method}
            className={`block cursor-pointer border p-3 rounded-lg transition ${
              paymentMethod === method ? 'border-purple-500 bg-purple-900/30' : 'border-gray-700'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
              className="mr-2"
            />
            {method}
          </label>
        ))}

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold mt-4"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
