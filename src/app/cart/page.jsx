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
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] p-8">
        <h2 className="text-2xl mb-4">Your cart is empty.</h2>
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] p-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {cart.map(({ id, name, price, image, quantity }) => (
          <div key={id} className="flex items-center bg-white/10 p-4 rounded-lg shadow-lg">
            <img src={image} alt={name} className="w-24 h-24 object-contain mr-6" />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-green-400 font-semibold">₹ {Number(price).toFixed(2)}</p>

              <div className="mt-2 flex items-center space-x-4">
                <label>Quantity:</label>
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
              className="ml-6 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="text-right text-2xl font-bold">
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
