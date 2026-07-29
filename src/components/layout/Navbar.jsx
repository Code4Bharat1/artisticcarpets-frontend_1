"use client";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
});
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Trash2,
  Plus,
  Minus,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import AuthModal from "@/components/layout/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const {
    cart,
    wishlist,
    isCartOpen,
    setCartOpen,
    isWishlistOpen,
    setWishlistOpen,
    isSearchOpen,
    setSearchOpen,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    addToCart,
    user,
    setAuthModalOpen,
    logout,
  } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getProductImage = (item) => {
    const path = item.thumbnail?.path || (item.images && item.images[0]?.path) || item.image;
    if (!path) return "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000${path}`;
  };

  return (
    <>
      {/* Main Navbar */}
      {pathname !== "/dashboard" && (
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            isScrolled
              ? "bg-brand-white/95 backdrop-blur-md border-b border-border-custom shadow-sm py-4"
              : "bg-transparent py-6"
          }`}
        >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* The user needs to save their uploaded logo as public/images/logo.png */}
            <img 
              src="/logo2.jpeg" 
              alt="Artistic Carpets" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Shop", "Collections", "About", "Contact"].map((item) => {
              const href =
                item === "Home"
                  ? "/"
                  : item === "Shop"
                  ? "/shop"
                  : item === "About"
                  ? "/about"
                  : item === "Contact"
                  ? "/contact"
                  : item === "Collections"
                  ? "/collections"
                  : `/#${item.toLowerCase()}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item}
                  href={href}
                  className={`font-sans text-xs uppercase tracking-widest transition-colors duration-200 ${
                    isActive
                      ? "text-[#980E0A] border-b-2 border-[#980E0A] font-semibold pb-1"
                      : "text-text-primary/80 hover:text-primary-brand"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls & Auth Buttons */}
          <div className="flex items-center space-x-4 md:space-x-5">
            {/* 1. Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-text-primary hover:text-primary-brand transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* 2. Wishlist Icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative text-text-primary hover:text-primary-brand transition-colors p-1"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-brand text-brand-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* 3. Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-text-primary hover:text-primary-brand transition-colors p-1"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-brand text-brand-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* 4. Profile Symbol (Shown ONLY when LOGGED IN - positioned at far right of navbar) */}
            {user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-1 text-text-primary hover:text-primary-brand transition-colors p-1 group"
                  aria-label="User Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-[#980E0A] text-white flex items-center justify-center font-serif text-sm font-semibold shadow-xs group-hover:scale-105 transition-transform">
                    {user.name ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-text-secondary group-hover:text-primary-brand transition-colors" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-[#E8E3DD] py-3 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#E8E3DD]/60">
                      <p className="font-serif text-sm font-semibold text-text-primary truncate">
                        {user.name}
                      </p>
                      <p className="font-sans text-[11px] text-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 font-sans text-xs text-text-primary hover:bg-[#FAF7F5] hover:text-[#980E0A] transition-colors"
                      >
                        My Dashboard
                      </Link>
                      
                    </div>

                    <div className="border-t border-[#E8E3DD]/60 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 font-sans text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Login Button (Shown ONLY BEFORE LOGIN - positioned at far right of navbar, hidden when logged in) */}
            {!user && (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center font-sans text-xs uppercase tracking-wider text-[#980E0A] border border-[#980E0A] hover:bg-[#980E0A] hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 font-semibold shadow-xs ml-1"
              >
                LOGIN
              </Link>
            )}

            {/* 6. Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-text-primary hover:text-primary-brand transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-brand-white transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden pt-24 px-6 flex flex-col justify-between pb-8`}
      >
        <nav className="flex flex-col space-y-6 text-center mt-6">
          {["Home", "Shop", "Collections", "About", "Contact"].map((item) => {
            const href =
              item === "Home"
                ? "/"
                : item === "Shop"
                ? "/shop"
                : item === "About"
                ? "/about"
                : item === "Contact"
                ? "/contact"
                : `/#${item.toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-2xl transition-colors ${
                  isActive ? "text-[#980E0A] font-semibold" : "text-text-primary hover:text-primary-brand"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Authentication Action */}
        <div className="pt-6 border-t border-[#E8E3DD] text-center">
          {!user ? (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-[#980E0A] text-white py-3.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider"
            >
              LOGIN / REGISTER
            </Link>
          ) : (
            <div className="space-y-3">
              <p className="font-serif text-sm text-text-primary">
                Logged in as <span className="font-bold text-[#980E0A]">{user.name}</span>
              </p>
              <Button
                variant="secondary"
                className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-text-primary/60 backdrop-blur-sm flex items-start justify-center pt-32 px-6">
          <div className="bg-brand-white w-full max-w-xl rounded-2xl shadow-2xl p-6 relative animate-slide-up">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-lg text-text-primary mb-4">Search Our Collection</h3>
            <div className="flex border-b border-border-custom pb-2">
              <Search className="w-5 h-5 text-text-secondary mr-3" />
              <input
                type="text"
                placeholder="Persian rugs, Vintage Oushak, Modern runners..."
                suppressHydrationWarning
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    setSearchOpen(false);
                    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className="w-full text-sm outline-none bg-transparent"
                autoFocus
              />
            </div>
            {searchQuery && (
              <div className="mt-4 text-xs text-text-secondary">
                Press Enter to search for <span className="font-semibold text-text-primary">"{searchQuery}"</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-brand-white shadow-2xl border-l border-border-custom transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col justify-between p-6 md:p-8">
          <div>
            <div className="flex items-center justify-between border-b border-border-custom pb-4 mb-6">
              <h3 className="font-serif text-xl font-medium text-text-primary">Shopping Cart</h3>
              <button onClick={() => setCartOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-12 h-12 text-text-secondary/40 mx-auto mb-4 stroke-[1]" />
                <p className="font-sans text-sm text-text-secondary">Your cart is currently empty.</p>
                <Button variant="secondary" className="mt-6" onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6 max-h-[55vh] overflow-y-auto pr-2 scrollbar-hide">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-border-custom/50 pb-6">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-collection-bg flex-shrink-0">
                      <img src={getProductImage(item)} alt={item.title || item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-medium text-text-primary">{item.title || item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-text-secondary hover:text-primary-brand"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-sans text-xs text-text-secondary mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border-custom rounded-full px-2 py-1">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-primary-brand"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs px-3 font-medium select-none">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-primary-brand"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-sans text-sm font-semibold text-text-primary">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-border-custom pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-widest text-text-secondary">Subtotal</span>
                <span className="font-sans text-lg font-bold text-text-primary">
                  ₹{cartSubtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-text-secondary font-light mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              {cart.some(item => (item.stock !== undefined && item.stock <= 0) || (item.availableStock !== undefined && item.availableStock <= 0)) ? (
                <div className="text-sm text-red-500 mb-4 font-medium text-center">
                  Some items in your cart are out of stock. Please remove them to proceed.
                </div>
              ) : (
                <Link href="/dashboard?tab=payment" onClick={() => setCartOpen(false)}>
                  <Button variant="primary" className="w-full justify-center">Proceed to Checkout</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Wishlist Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-brand-white shadow-2xl border-l border-border-custom transform ${
          isWishlistOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-border-custom pb-4 mb-6">
            <h3 className="font-serif text-xl font-medium text-text-primary">Wishlist</h3>
            <button onClick={() => setWishlistOpen(false)} className="text-text-secondary hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20 my-auto">
              <Heart className="w-12 h-12 text-text-secondary/40 mx-auto mb-4 stroke-[1]" />
              <p className="font-sans text-sm text-text-secondary">Your wishlist is currently empty.</p>
              <Button variant="secondary" className="mt-6 animate-pulse" onClick={() => setWishlistOpen(false)}>
                Explore Rugs
              </Button>
            </div>
          ) : (
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-hide">
              {wishlist.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-border-custom/50 pb-6">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-collection-bg flex-shrink-0">
                    <img src={getProductImage(item)} alt={item.title || item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-medium text-text-primary">{item.title || item.name}</h4>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-text-secondary hover:text-primary-brand"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-sans text-xs text-text-secondary mt-1">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Button
                        variant="secondary"
                        className="py-2 px-4 text-[10px] tracking-widest"
                        onClick={() => {
                          addToCart(item);
                          toggleWishlist(item);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Authentication Modal */}
      <AuthModal />
    </>
  );
}
