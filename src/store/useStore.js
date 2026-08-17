import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],
      isCartOpen: false,
      addToCart: (product, quantity = 1, variant = null) =>
        set((state) => {
          const pId = product.id || product._id;
          const cartItemId = variant ? `${pId}-${variant.size}` : pId;
          const stockLimit = variant ? variant.stock : (product.stock !== undefined ? product.stock : product.availableStock);

          if (stockLimit !== undefined && stockLimit <= 0) {
            alert("This product is currently out of stock and cannot be added to your cart.");
            return state;
          }

          const existing = state.cart.find((item) => item.cartItemId === cartItemId || (item.id || item._id) === cartItemId);
          
          if (existing) {
            if (stockLimit !== undefined && existing.quantity + quantity > stockLimit) {
              alert("You cannot add more of this product than what is in stock.");
              return state;
            }
            return {
              cart: state.cart.map((item) =>
                (item.cartItemId || item.id || item._id) === cartItemId 
                  ? { ...item, quantity: item.quantity + quantity } 
                  : item
              ),
              isCartOpen: true
            };
          }
          return { 
            cart: [...state.cart, { ...product, id: pId, cartItemId, quantity, selectedVariant: variant }], 
            isCartOpen: true 
          };
        }),
      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => (item.cartItemId || item.id || item._id) !== cartItemId),
        })),
      updateCartQuantity: (cartItemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            (item.cartItemId || item.id || item._id) === cartItemId 
              ? { ...item, quantity: Math.max(1, quantity) } 
              : item
          ),
        })),
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      // Wishlist State
      wishlist: [],
      isWishlistOpen: false,
      toggleWishlist: async (product) => {
        const pId = product.id || product._id;
        // Optimistic UI update
        set((state) => {
          const exists = state.wishlist.some((item) => (item.id || item._id) === pId);
          if (exists) {
            return { wishlist: state.wishlist.filter((item) => (item.id || item._id) !== pId) };
          }
          return { wishlist: [...state.wishlist, { ...product, id: pId }] };
        });

        // Sync with backend if logged in
        const token = get().token;
        if (token) {
          try {
            const axiosInstance = (await import("@/services/axiosInstance")).default;
            await axiosInstance.post(`/users/wishlist/${pId}`);
          } catch (error) {
            console.error("Failed to sync wishlist with backend:", error);
          }
        }
      },
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
      login: async (userData, token) => {
        set({
          user: userData || {
            name: "Alexander Sterling",
            email: "alexander@artisticcarpets.com",
          },
          token: token || null,
          isAuthModalOpen: false,
        });

        // Fetch user's wishlist from backend
        if (token) {
          try {
            const axiosInstance = (await import("@/services/axiosInstance")).default;
            const res = await axiosInstance.get("/users/wishlist");
            if (res.data?.data?.wishlist) {
              set({ wishlist: res.data.data.wishlist.map(p => ({ ...p, id: p._id })) });
            }
          } catch (err) {
            console.error("Error fetching wishlist on login", err);
          }
        }
      },
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
