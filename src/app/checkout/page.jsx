'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, User, Landmark } from 'lucide-react';

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

  const fields = [
    { name: 'name', label: 'Full Name', icon: <User size={18} /> },
    { name: 'email', label: 'Email', icon: <Mail size={18} /> },
    { name: 'phone', label: 'Phone Number', icon: <Phone size={18} /> },
    { name: 'address', label: 'Address', icon: <MapPin size={18} /> },
    { name: 'city', label: 'City', icon: <MapPin size={18} /> },
    { name: 'pincode', label: 'Pincode', icon: <MapPin size={18} /> },
    { name: 'state', label: 'State', icon: <Landmark size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black p-8 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10">Shipping Details</h1>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map(({ name, label, icon }) => (
            <div key={name} className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-300">{label}</label>
              <div className="flex items-center bg-gray-900 border border-gray-700 rounded-lg px-3">
                <span className="text-gray-400">{icon}</span>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full p-3 bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
