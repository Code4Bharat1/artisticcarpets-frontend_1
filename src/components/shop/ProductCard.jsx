"use client";

import { Star, Heart, Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "@/components/common/Badge";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, priority = false }) {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useStore();
  const router = useRouter();
  
  const isWishlisted = wishlist.some((item) => (item._id || item.id) === (product._id || product.id));

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setQuickViewProduct(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product);
    }
  };
  
  const handleCardClick = () => {
    router.push(`/shop/${product.slug || product.id}`);
  };

  // Map Backend Data structure to card UI
  const title = product.title || product.name;
  const price = product.price || 0;
  const discountPrice = product.discountPrice;
  const rating = product.ratingAverage || product.rating || 0;
  const subtitle = product.productCollection || product.category || product.subtitle;
  const size = product.size || "";
  
  const getImgUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `http://localhost:5000${path}`;
  };

  // Image logic
  const mainImg = product.thumbnail?.path 
    ? getImgUrl(product.thumbnail.path)
    : (product.images && product.images.length > 0 
        ? getImgUrl(product.images[0].path)
        : (product.image || "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop"));
        
  const hoverImg = product.images && product.images.length > 0 
    ? getImgUrl(product.images[0].path)
    : (product.hoverimage || mainImg);

  // Badge Logic
  let badge = product.badge;
  if (!badge) {
    if (product.isNewArrival) badge = "New";
    else if (product.isBestSeller) badge = "Best Seller";
    else if (product.discountPrice) badge = "Sale";
  }

  const outOfStock = product.stock === 0;

  return (
    <motion.div
      className="group bg-white border border-[#E8DCD3] rounded-[12px] overflow-hidden flex flex-col cursor-default relative"
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      initial={{ boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Image Container with hover zoom and overlays */}
      <div 
        className="relative w-full aspect-[4/5] bg-[#FAF7F4] overflow-hidden cursor-pointer"
        onClick={handleQuickView}
      >
        {/* Primary Product Image */}
        <img
          src={mainImg}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 transform scale-100 ease-out ${hoverImg !== mainImg ? 'group-hover:opacity-0 group-hover:scale-[1.04]' : 'group-hover:scale-[1.04]'} ${outOfStock ? 'opacity-60 grayscale-[50%]' : 'opacity-100'}`}
        />

        {/* Hover Alternate Product Image */}
        {hoverImg !== mainImg && !outOfStock && (
          <img
            src={hoverImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 transform scale-100 group-hover:scale-[1.04] ease-out"
          />
        )}

        {/* Badge Overlay */}
        {badge && !outOfStock && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <Badge variant="primary">{badge}</Badge>
          </div>
        )}
        
        {outOfStock && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Out of Stock
          </div>
        )}

        {/* Wishlist Button Overlay - z-30 ensures clickability over hover overlay */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border ${isWishlisted
              ? "bg-[#980E0A] text-white border-[#980E0A]"
              : "bg-white text-text-primary border-[#E8E3DD] hover:text-[#980E0A] hover:border-[#980E0A]"
            }`}
          aria-label="Add to Wishlist"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-current text-white" : ""}`} />
        </button>

        {/* Quick View & Add to Cart Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
          <button
            type="button"
            onClick={handleQuickView}
            className="w-10 h-10 rounded-full bg-white text-text-primary border border-[#E8E3DD] flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md transform hover:scale-105 ${outOfStock ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-white text-text-primary border border-[#E8E3DD] hover:bg-[#980E0A] hover:text-white hover:border-[#980E0A]'}`}
            title={outOfStock ? "Out of Stock" : "Add to Cart"}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-xl font-medium text-[#2B2B2B] truncate mr-2 group-hover:text-[#980E0A] transition-colors duration-200">
            {title}
          </h3>
          <div className="flex items-center text-[#980E0A] gap-1 shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-sans font-semibold">{rating}</span>
          </div>
        </div>

        <p className="font-sans text-sm text-[#666666] mb-4">
          {subtitle}{size ? `, ${size}` : ""}
        </p>

        <div className="mt-auto font-sans font-semibold text-lg flex items-center gap-2">
          {discountPrice ? (
            <>
              <span className="text-[#980E0A]">
                ₹{discountPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[#999] text-sm line-through font-normal">
                ₹{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </>
          ) : (
            <span className="text-[#980E0A]">
              ₹{price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
