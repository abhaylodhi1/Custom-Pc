'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] p-6">
        <h2 className="text-2xl mb-4 text-center">Your cart is empty.</h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] p-4 sm:p-6 text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Your Cart</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {cart.map(({ id, name, price, image, quantity }) => (
          <div
            key={id}
            className="flex flex-col sm:flex-row sm:items-center bg-white/10 p-4 rounded-lg shadow-lg gap-4"
          >
            <img
              src={image}
              alt={name}
              className="w-full sm:w-24 h-32 sm:h-24 object-contain rounded"
            />
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
              <p className="text-green-400 font-semibold mt-1">
                ₹ {Number(price).toFixed(2)}
              </p>
              <div className="mt-2 flex items-center space-x-2 sm:space-x-4">
                <label className="text-sm">Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => updateQuantity(id, parseInt(e.target.value))}
                  className="w-16 p-1 rounded bg-gray-800 text-white text-center"
                />
              </div>
            </div>
            <button
              onClick={() => removeItem(id)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded self-start sm:self-auto"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-right text-xl sm:text-2xl font-bold">
          Total: ₹ {totalPrice.toFixed(2)}
        </div>

        <button
          onClick={() => router.push('/checkout')}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
