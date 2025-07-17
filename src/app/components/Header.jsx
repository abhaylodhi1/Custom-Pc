'use client';
//hello
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Header() {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState('/images/default-avatar.png');
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profilePic');
    setToken(null);
    setProfilePic('/images/default-avatar.png');
    router.push('/login');
    toast.success('Logout successful!');
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedPic = localStorage.getItem('profilePic');
    if (savedToken) setToken(savedToken);
    if (savedPic) setProfilePic(savedPic);
  }, []);

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
    <header className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#24438c] text-white shadow-md px-4 py-3 md:py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-lg md:text-xl font-bold text-purple-400 hover:text-purple-300"
        >
          🖥️ PC Gaming Store
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/dashboard" className="hover:text-purple-300">
            Dashboard
          </Link>
          <Link href="/cart" className="hover:text-purple-300">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <button onClick={handleLogout} className="hover:text-red-400">
            Logout
          </button>
          <Link
            href="/profile"
            className="block w-9 h-9 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-300"
          >
            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center animate-fadeIn">
          <Link
            href="/dashboard"
            className="block hover:text-purple-300"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/cart"
            className="block hover:text-purple-300"
            onClick={() => setMenuOpen(false)}
          >
            <div className="inline-flex items-center space-x-1">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </div>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="block w-full hover:text-red-400"
          >
            Logout
          </button>
          <Link
            href="/profile"
            className="inline-flex items-center space-x-2"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-purple-500"
            />
            <span>Profile</span>
          </Link>
        </div>
      )}
    </header>
  );
}
