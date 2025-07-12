'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  IndianRupee,
  Banknote,
  Wallet,
  Landmark,
} from 'lucide-react';

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

    const isSuccess = Math.random() > 0.3;
    setTimeout(() => {
      router.push(isSuccess ? '/payment/success' : '/payment/failure');
    }, 1500);
  };

  const paymentOptions = [
    { name: 'UPI', icon: <IndianRupee className="text-purple-400" size={20} /> },
    { name: 'Credit Card', icon: <CreditCard className="text-purple-400" size={20} /> },
    { name: 'Debit Card', icon: <Wallet className="text-purple-400" size={20} /> },
    { name: 'Net Banking', icon: <Landmark className="text-purple-400" size={20} /> },
    { name: 'Cash on Delivery', icon: <Banknote className="text-purple-400" size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">Choose Payment Method</h1>

      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl space-y-6">
        <p className="text-center text-gray-300 text-sm">
          Select your preferred payment option to complete the order
        </p>

        <div className="space-y-4">
          {paymentOptions.map(({ name, icon }) => (
            <label
              key={name}
              className={`flex items-center gap-3 cursor-pointer border px-4 py-3 rounded-lg transition-all duration-300 
                ${
                  paymentMethod === name
                    ? 'bg-purple-900/40 border-purple-500 shadow-md'
                    : 'border-gray-700 hover:bg-white/5'
                }`}
            >
              <input
                type="radio"
                name="payment"
                value={name}
                checked={paymentMethod === name}
                onChange={() => setPaymentMethod(name)}
                className="accent-purple-600"
              />
              {icon}
              <span className="text-white font-medium">{name}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
