import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const existing = get().cart.find((item) => item.id === product.id);
    if (!existing) {
      set((state) => ({ cart: [...state.cart, { ...product, quantity: 1 }] }));
    }
  },
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cart: [] }),
}));
