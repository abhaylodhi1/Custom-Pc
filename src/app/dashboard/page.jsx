'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const bannerImages = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg',
];

const options = [
  {
    label: 'Buy Prebuilt PC',
    path: '/dashboard/prebuilt-pc',
    image: '/images/prebuilt-pc.jpg',
  },
  {
    label: 'Customize Your Own PC',
    path: '/dashboard/customize-pc',
    image: '/images/customize-pc.jpg',
  },
  {
    label: 'Buy Laptop',
    path: '/dashboard/laptop',
    image: '/images/laptop.jpg',
  },
  {
    label: 'Buy Headphone',
    path: '/dashboard/headphone',
    image: '/images/headphone.jpg',
  },
  {
    label: 'Buy PC Parts',
    path: '/dashboard/pc-parts',
    image: '/images/pc-parts.jpg',
  },
  {
    label: 'Gaming Accessories',
    path: '/dashboard/gaming-accessories',
    image: '/images/gaming-accessories.jpg',
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] text-white">

      {/* Banner */}
      <div className="relative w-full h-[500px] overflow-hidden my-1">
        {bannerImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`banner-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Arrows */}
        <button
          onClick={prevBanner}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 z-10"
        >
          ‹
        </button>
        <button
          onClick={nextBanner}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 z-10"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentBanner ? 'bg-purple-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-12 text-center">Welcome to Your Gaming Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {options.map(({ label, path, image }) => (
            <div
              key={label}
              role="button"
              tabIndex={0}
              onClick={() => router.push(path)}
              onKeyDown={(e) => e.key === 'Enter' && router.push(path)}
              className="relative cursor-pointer rounded-2xl overflow-hidden  backdrop-blur-none hover:scale-105 transform transition-transform duration-300 shadow-2xl border border-white/20"
            >
              <img
                src={image}
                alt={label}
                className="w-full h-56 object-contain  p-2"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                <h2 className="text-lg sm:text-xl font-semibold">{label}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
