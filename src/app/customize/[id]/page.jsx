'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { usePcPartsStore } from '@/store/usePcPartsStore';
import { useProductStore } from '@/store/useProductStore';

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

  const { products, fetchProductsByCategory } = useProductStore();
  const { parts: allParts, loading, error, fetchAllParts } = usePcPartsStore();

  useEffect(() => {
    fetchAllParts();
    fetchProductsByCategory('customize-pc');
  }, []);

  const handleChange = (e) => {
    setParts({ ...parts, [e.target.name]: e.target.value });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const [key, id] of Object.entries(parts)) {
      const selected = allParts[key]?.find((item) => item.id === parseInt(id));
      if (selected) total += Number(selected.price);
    }
    return total.toFixed(2);
  };

  const handleSubmit = () => {
    const selectedItems = Object.entries(parts).reduce((acc, [key, id]) => {
      const selected = allParts[key].find((item) => item.id === parseInt(id));
      acc[key] = selected ? selected.name : '';
      return acc;
    }, {});

    const selectedImage = products.find((p) => p.id == id)?.image || '/images/customize-pc.jpg';

    const customizedProduct = {
      id,
      name: 'Custom Build',
      image: selectedImage,
      price: Number(calculateTotalPrice()),
      ...selectedItems,
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...customizedProduct, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Custom PC added to cart!');
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-12 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Customize Your PC</h1>

      {loading ? (
        <p>Loading parts...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <form className="space-y-4">
            {['motherboard', 'processor', 'ram', 'storage', 'gpu'].map((category) => {
              const selectedId = parts[category];
              const selectedPart = allParts[category]?.find((item) => item.id === parseInt(selectedId));

              return (
                <div
                  key={category}
                  className="bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  {/* Dropdown */}
                  <div className="sm:w-1/2">
                    <label className="block mb-1 capitalize text-sm text-gray-300">
                      {category}
                    </label>
                    <select
                      name={category}
                      onChange={handleChange}
                      className="text-white bg-gray-900 border border-gray-600 p-2 rounded w-full"
                      value={selectedId}
                    >
                      <option value="">Select {category}</option>
                      {allParts[category]?.map((item) => (
                        <option key={`${category}-${item.id}`} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preview */}
                  {selectedPart ? (
                    <div className="flex items-center sm:w-1/2 gap-4">
                      <img
                        src={selectedPart.image}
                        alt={selectedPart.name}
                        className="w-24 h-24 object-cover rounded border border-gray-700"
                      />
                      <div>
                        <p className="text-md font-semibold">{selectedPart.name}</p>
                        <p className="text-sm text-gray-400">₹{selectedPart.price}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="sm:w-1/2 text-gray-500 italic">No part selected</div>
                  )}
                </div>
              );
            })}

            <div className="text-right text-lg font-semibold">Total: ₹{calculateTotalPrice()}</div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white"
            >
              Add to Cart
            </button>
          </form>

          {/* Summary Section */}
          <div className="bg-gray-800 p-4 rounded-lg h-fit">
            <h2 className="text-2xl font-bold mb-4">Build Summary</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {['motherboard', 'processor', 'ram', 'storage', 'gpu'].map((category) => {
                const selectedId = parts[category];
                const selected = allParts[category]?.find((item) => item.id === parseInt(selectedId));
                return selected ? (
                  <div key={category} className="flex items-start gap-4">
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="w-16 h-16 object-cover rounded border border-gray-700"
                    />
                    <div>
                      <p className="font-medium">{selected.name}</p>
                      <p className="text-sm text-gray-400">₹{selected.price}</p>
                      <p className="text-sm text-gray-500 mt-1">{selected.specification}</p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            <hr className="my-4 border-gray-700" />
            <div className="text-right text-lg font-semibold">
              Total: ₹{calculateTotalPrice()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
