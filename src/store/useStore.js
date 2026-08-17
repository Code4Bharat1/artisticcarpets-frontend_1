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
      syncCartPrices: async () => {
        const state = get();
        if (state.cart.length === 0) return;
        try {
          const { default: axiosInstance } = await import('@/services/axiosInstance');
          const uniqueProducts = [];
          const seen = new Set();
          for (const item of state.cart) {
            const id = item.id || item._id;
            if (!seen.has(id)) {
               seen.add(id);
               uniqueProducts.push({ id, slug: item.slug });
            }
          }
          
          const updatedCart = [...state.cart];
          let changed = false;
          
          for (const prod of uniqueProducts) {
            try {
              const identifier = prod.slug || prod.id;
              const res = await axiosInstance.get(`/products/${identifier}`);
              const freshProduct = res.data.data?.product || res.data.data;
              
              if (freshProduct) {
                for (let i = 0; i < updatedCart.length; i++) {
                  const item = updatedCart[i];
                  if ((item.id || item._id) === prod.id) {
                     if (!item.selectedVariant && freshProduct.variants && freshProduct.variants.length > 0) {
                       item.selectedVariant = freshProduct.variants[0];
                       item.cartItemId = `${item.id || item._id}-${item.selectedVariant.size}`;
                       updatedCart[i] = { ...item };
                       changed = true;
                     }
                     if (item.price !== freshProduct.price || item.discountPrice !== freshProduct.discountPrice) {
                       updatedCart[i] = { ...item, price: freshProduct.price, discountPrice: freshProduct.discountPrice };
                       changed = true;
                     }
                     if (item.selectedVariant) {
                       const freshVariant = freshProduct.variants?.find(v => v._id === item.selectedVariant._id);
                       if (freshVariant) {
                         if (item.selectedVariant.price !== freshVariant.price || item.selectedVariant.discountPrice !== freshVariant.discountPrice) {
                           updatedCart[i].selectedVariant = { ...item.selectedVariant, price: freshVariant.price, discountPrice: freshVariant.discountPrice };
                           changed = true;
                         }
                       }
                     }
                  }
                }
              }
            } catch (err) {
              console.error(`Failed to sync price for product ${prod.slug || prod.id}`, err);
            }
          }
          if (changed) {
            set({ cart: updatedCart });
          }
        } catch (error) {
          console.error("Failed to sync cart prices", error);
        }
      },

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
