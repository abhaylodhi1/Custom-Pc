'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (!storedCart || JSON.parse(storedCart).length === 0) {
      alert('Cart is empty!');
      router.push('/cart');
    } else {
      setCart(JSON.parse(storedCart));
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const isValid = Object.values(form).every((v) => v.trim().length > 0);
    if (!isValid) return alert('Please fill all fields');
    localStorage.setItem('checkoutDetails', JSON.stringify(form));
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Shipping Details</h1>
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4">
        {[
          { name: 'name', label: 'Full Name' },
          { name: 'email', label: 'Email' },
          { name: 'phone', label: 'Phone Number' },
          { name: 'address', label: 'Address' },
          { name: 'city', label: 'City' },
          { name: 'pincode', label: 'Pincode' },
          { name: 'state', label: 'State' },
        ].map(({ name, label }) => (
          <input
            key={name}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={label}
            className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />
        ))}

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
