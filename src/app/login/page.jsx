'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);

      try {
        const profileRes = await fetch('/api/profile', {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.image) {
            localStorage.setItem('profilePic', profileData.image);
          }
        }
      } catch (err) {
        console.error('Failed to fetch profile pic after login', err);
      }

      toast.success('Login successful!');
      router.push('/dashboard');
    } else {
      toast.error(data.error || 'Login failed');
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-4 text-white"
      style={{
        backgroundImage: "url('/images/gaming-bg4.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/15 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-transparent border border-purple-600 shadow-[0_0_20px_rgba(128,0,255,0.4)] backdrop-blur-sm p-8 rounded-xl space-y-5 w-full max-w-md"
      >
        <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-2">Login</h1>
        <p className="text-sm text-center text-gray-300 mb-6">Welcome back, gamer!</p>

        <input
          name="email"
          type="email"
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-200"
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-200"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="w-full py-3 font-semibold bg-purple-600 hover:bg-purple-700 transition-all rounded-lg shadow-lg shadow-purple-800/40"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Don&apos;t have an account?{' '}
          <span
            className="text-purple-400 hover:underline cursor-pointer"
            onClick={() => router.push('/signup')}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
