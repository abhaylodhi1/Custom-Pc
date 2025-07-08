'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { usePcPartsStore } from '@/store/usePcPartsStore';

export default function CustomizePage() {
  const { id } = useParams();
  const router = useRouter();

  const [parts, setParts] = useState({
    motherboard: '',
    processor: '',
    ram: '',
    storage: '',
    gpu: '',
  });

  const { parts: allParts, loading, error, fetchAllParts } = usePcPartsStore();

  useEffect(() => {
    fetchAllParts();
  }, []);

  const handleChange = (e) => {
    setParts({ ...parts, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const selectedItems = Object.entries(parts).reduce((acc, [key, id]) => {
      const selected = allParts[key].find((item) => item.id === parseInt(id));
      acc[key] = selected ? selected.name : '';
      return acc;
    }, {});
      
    const customizedProduct = {
      id,
      name: 'Custom Build',
      image: '/images/customize-pc.jpg',
      price: 1999.99,
      ...selectedItems,
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...customizedProduct, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Custom PC added to cart!');
    router.push('/cart');
  };
  const calculateTotalPrice = () => {
    let total = 0;
    for (const [key, id] of Object.entries(parts)) {
      const selected = allParts[key]?.find((item) => item.id === parseInt(id));
      if (selected) total += Number(selected.price); // ensures numeric addition
    }
    return total.toFixed(2); // optional: round to 2 decimal places
  };
  

  const renderOptions = (category) => {
    return allParts[category]?.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };

  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Customize Your PC</h1>
  
      {loading ? (
        <p>Loading parts...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Form with dropdowns */}
          <form className="grid gap-4">
            {['motherboard', 'processor', 'ram', 'storage', 'gpu'].map((category) => {
              const selectedId = parts[category];
              const selectedPart = allParts[category]?.find((item) => item.id === parseInt(selectedId));
  
              return (
                <div key={category} className="bg-gray-800 rounded p-4 flex gap-6 items-center">
                  {/* Dropdown */}
                  <div className="w-1/2">
                    <label className="block mb-1 capitalize text-sm text-gray-300">{category}</label>
                    <select
                      name={category}
                      onChange={handleChange}
                      className="text-white bg-gray-900 border border-gray-600 p-2 rounded w-full"
                      value={selectedId}
                    >
                      <option value="">Select {category}</option>
                      {allParts[category]?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  {/* Image + Info */}
                  {selectedPart ? (
                    <div className="flex items-center gap-4 w-1/2">
                      <img
                        src={selectedPart.image}
                        alt={selectedPart.name}
                        className="w-24 h-24 object-cover rounded border border-gray-700"
                      />
                      <div>
                        <p className="text-md font-semibold text-white">{selectedPart.name}</p>
                        <p className="text-sm text-gray-400">₹{selectedPart.price}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-1/2 text-gray-500 italic">No part selected</div>
                  )}
                </div>
              );
            })}
  
            <div className="text-right text-lg font-semibold text-white">
              Total: ₹{calculateTotalPrice()}
            </div>
  
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
            >
              Add to Cart
            </button>
          </form>
  
          {/* Right: Build Summary */}
          <div className="bg-gray-800 p-4 rounded h-fit">
            <h2 className="text-2xl font-bold mb-4">Build Summary</h2>
            {['motherboard', 'processor', 'ram', 'storage', 'gpu'].map((category) => {
              const selectedId = parts[category];
              const selected = allParts[category]?.find((item) => item.id === parseInt(selectedId));
              return selected ? (
                <div key={category} className="flex items-center gap-4 mb-4">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-16 h-16 object-cover rounded border border-gray-700"
                  />
                  <div>
                    <p className="font-medium text-white">{selected.name}</p>
                    <p className="text-sm text-gray-400">₹{selected.price}</p>
                  </div>
                </div>
              ) : null;
            })}
            <hr className="my-2 border-gray-700" />
            <div className="text-right text-lg font-semibold text-white">
              Total: ₹{calculateTotalPrice()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  
