import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      // Cart State
      cart: [],
      isCartOpen: false,
      addToCart: (product) =>
        set((state) => {
          if ((product.stock !== undefined && product.stock <= 0) || (product.availableStock !== undefined && product.availableStock <= 0)) {
            alert("This product is currently out of stock and cannot be added to your cart.");
            return state;
          }
          const pId = product.id || product._id;
          const existing = state.cart.find((item) => (item.id || item._id) === pId);
          if (existing) {
            if ((product.stock !== undefined && existing.quantity >= product.stock) || (product.availableStock !== undefined && existing.quantity >= product.availableStock)) {
              alert("You cannot add more of this product than what is in stock.");
              return state;
            }
            return {
              cart: state.cart.map((item) =>
                (item.id || item._id) === pId ? { ...item, quantity: item.quantity + 1 } : item
              ),
              isCartOpen: true
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
      user: null,
      token: null,
      isAuthModalOpen: false,
      setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
      login: (userData, token) =>
        set({
          user: userData || {
            name: "Alexander Sterling",
            email: "alexander@artisticcarpets.com",
          },
          token: token || null,
          isAuthModalOpen: false,
        }),
      logout: () => set({ user: null, token: null }),

      // Checkout State
      shippingAddress: {
        addressLine1: "123 Artistic Way",
        city: "Mumbai",
        state: "MH",
        postalCode: "400001",
        country: "India"
      },
      setShippingAddress: (address) => set({ shippingAddress: address }),

      // Orders State — orders are always fetched live from the API but local orders are saved as fallback
      orders: [],
      placeOrder: (order) =>
        set((state) => ({
          cart: [], // Empty cart on place order
          orders: order ? [order, ...state.orders] : state.orders,
        })),
    }),
    {
      name: "artistic-carpets-storage",
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist, user: state.user, token: state.token, shippingAddress: state.shippingAddress, orders: state.orders }),
    }
  )
);
