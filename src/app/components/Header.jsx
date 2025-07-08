'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
export default function Header() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState('/images/default-avatar.png');
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profilePic');
    setToken(null);
    setProfilePic('/images/default-avatar.png');
    router.push('/login');
    toast.success('Logout successful!');
  };

  // Load token and cached profilePic from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedPic = localStorage.getItem('profilePic');

    if (savedToken) setToken(savedToken);
    if (savedPic) setProfilePic(savedPic);
  }, []);

  // Fetch latest profile pic if token is present
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const res = await fetch('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();

        if (data.image) {
          setProfilePic(data.image);
          localStorage.setItem('profilePic', data.image); 
        }
      } catch (err) {
        console.error('Error fetching profile pic:', err);
        setProfilePic('/images/default-avatar.png');
        localStorage.removeItem('profilePic');
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <header className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] text-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/dashboard" className="text-xl font-bold text-purple-400 hover:text-purple-300">
        🖥️ PC Gaming Store
      </Link>

      <nav className="flex items-center space-x-6">
        <Link href="/dashboard" className="hover:text-purple-300">Dashboard</Link>
        <Link href="/cart" className="hover:text-purple-300">
          <ShoppingCart className="w-6 h-6" />
        </Link>
        <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
        <Link
          href="/profile"
          className="block w-9 h-9 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-300"
        >
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        </Link>
      </nav>
    </header>
  );
}
