'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProductStore } from '../../../store/useProductStore';
import toast from 'react-hot-toast';

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const category = params.category;

  const { products, loading, error, fetchProductsByCategory } = useProductStore();

  const handleBuyNow = (product) => {
    const storedCart = localStorage.getItem('cart');
    const currentCart = storedCart ? JSON.parse(storedCart) : [];
  
    const existingIndex = currentCart.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      currentCart[existingIndex].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(currentCart));
    toast.success(`${product.name} added to cart!`);
    router.push('/cart');
  };
  

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category, fetchProductsByCategory]);

  const addToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    const currentCart = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = currentCart.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      currentCart[existingIndex].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

  if (!products.length)
    return <div className="text-white text-center mt-20">No products found for {category}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] p-8 text-white">
      <h1 className="text-4xl font-bold mb-12 text-center capitalize">{category.replace('-', ' ')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map(({ id, name, price, image }) => (
          <div key={id} className="rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-contain p-4 overflow-hidden hover:scale-105 transform transition-transform duration-300 shadow-2xl border border-white/20"
              loading="lazy"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2">{name}</h2>
              <p className="text-lg font-semibold text-green-400">₹ {Number(price).toFixed(2)}</p>
              <div className="mt-auto flex space-x-4">
  <button
    onClick={() => addToCart({ id, name, price, image })}
    className="btn flex-grow bg-purple-600 hover:bg-purple-700"
  >
    Add to Cart
  </button>
  <button
    onClick={() => handleBuyNow({ id, name, price, image })}
    className="btn flex-grow bg-green-600 hover:bg-green-700"
  >
    Buy Now
  </button>
  {category === 'customize-pc' && (
    <button
      onClick={() => router.push(`/customize/${id}`)}
      className="btn flex-grow bg-blue-600 hover:bg-blue-700"
    >
      Customize
    </button>
  )}
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
''