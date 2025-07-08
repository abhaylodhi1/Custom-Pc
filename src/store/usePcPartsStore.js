// /store/usePcPartsStore.js
import { create } from 'zustand';

export const usePcPartsStore = create((set) => ({
  parts: {
    motherboard: [],
    processor: [],
    ram: [],
    storage: [],
    gpu: [],
  },
  loading: false,
  error: null,

  fetchAllParts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/pc-parts');
      if (!res.ok) throw new Error('Failed to fetch PC parts');
      const data = await res.json();
      set({ parts: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
