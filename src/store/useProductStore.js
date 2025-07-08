// /store/useProductStore.js
import { create } from 'zustand';


export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProductsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/products?category=${category}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
