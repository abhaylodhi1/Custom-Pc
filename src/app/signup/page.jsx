'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const file = watch('profile_pic')?.[0];
  const profilePicUrl = file ? URL.createObjectURL(file) : '/images/default-avatar.png';

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    for (const key in data) {
      if (key === 'profile_pic' && data.profile_pic?.[0]) {
        formData.append('profile_pic', data.profile_pic[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success('Signup successful! Please log in.');
      router.push('/login');
    } else {
      toast.error(result.error || 'Signup failed');
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
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 bg-transparent border border-purple-600 shadow-[0_0_20px_rgba(128,0,255,0.4)] backdrop-blur-sm p-8 rounded-xl space-y-5 w-full max-w-md"
        encType="multipart/form-data"
      >
        <div className="flex justify-center mb-4">
          <img
            src={profilePicUrl}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-md object-cover"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-2">Create Your Account</h1>
        <p className="text-sm text-center text-gray-300 mb-6">Start your gaming journey with us</p>

        <input
          {...register('first_name')}
          className="w-full px-4 py-2 bg-gray-800/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-200"
          placeholder="First Name"
          required
        />
        <input
          {...register('last_name')}
          className="w-full px-4 py-2 bg-gray-800/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-200"
          placeholder="Last Name"
          required
        />
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-2 bg-gray-800/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-200"
          placeholder="Email"
          required
        />
        <input
          {...register('password')}
          type="password"
          className="w-full px-4 py-2 bg-gray-800/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-200"
          placeholder="Password"
          required
        />
        <input
          {...register('mobile')}
          className="w-full px-4 py-2 bg-gray-800/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-200"
          placeholder="Mobile No."
          required
        />
        <input
          type="file"
          {...register('profile_pic')}
          className="w-full text-gray-300"
          accept="image/*"
        />

        <button
          type="submit"
          className="w-full py-3 font-semibold bg-purple-600 hover:bg-purple-700 transition-all rounded-lg shadow-lg shadow-purple-800/40"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <span
            className="text-purple-400 hover:underline cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}
