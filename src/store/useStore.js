import { create } from "zustand";

export const useStore = create((set) => ({
  // Cart State
  cart: [],
  isCartOpen: false,
  addToCart: (product) =>
    set((state) => {
      const pId = product.id || product._id;
      const existing = state.cart.find((item) => (item.id || item._id) === pId);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            (item.id || item._id) === pId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, id: pId, quantity: 1 }], isCartOpen: true };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  // Wishlist State
  wishlist: [],
  isWishlistOpen: false,
  toggleWishlist: (product) =>
    set((state) => {
      const pId = product.id || product._id;
      const exists = state.wishlist.some((item) => (item.id || item._id) === pId);
      if (exists) {
        return { wishlist: state.wishlist.filter((item) => (item.id || item._id) !== pId) };
      }
      return { wishlist: [...state.wishlist, { ...product, id: pId }] };
    }),
  setWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),

  // Search Modal State
  isSearchOpen: false,
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),

  // Quick View State
  quickViewProduct: null,
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),

  // Auth State
  user: null, // null when logged out, object when logged in
  isAuthModalOpen: false,
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
  login: (userData) =>
    set({
      user: userData || {
        name: "Alexander Sterling",
        email: "alexander@artisticcarpets.com",
      },
      isAuthModalOpen: false,
    }),
  logout: () => set({ user: null }),

  // Orders State
  orders: [],
  placeOrder: (orderData) =>
    set((state) => ({
      orders: [
        {
          id: `ORD-${Math.floor(Math.random() * 100000000)}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Ordered',
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          ...orderData
        },
        ...state.orders,
      ],
      cart: [], // Empty cart on place order
    })),
}));
