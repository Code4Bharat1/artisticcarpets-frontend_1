"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import Badge from "@/components/common/Badge";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useStore();
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
    const variant = (product.variants && product.variants.length > 0) ? product.variants[0] : null;
    const stockLimit = variant ? variant.stock : product.stock;
    if (stockLimit !== 0) {
      addToCart(product, 1, variant);
    }
  };

  const handleCardClick = () => {
    router.push(`/shop/${product.slug || product.id}`);
  };

  // Map Backend Data structure to card UI
  const title = product.title || product.name;
  const hasVariants = product.variants && product.variants.length > 0;
  const rawPrice = hasVariants ? product.variants[0].price : product.price;
  const price = Number(rawPrice) || 0;
  const rawDiscountPrice = hasVariants ? product.variants[0].discountPrice : product.discountPrice;
  const discountPrice = rawDiscountPrice ? Number(rawDiscountPrice) : null;
  const rating = product.ratingAverage || product.rating || 0;
  
  const getImgUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
    return `${baseUrl}${path}`;
  };
  
  // Image handling
  const mainImg = product.thumbnail?.path 
    ? getImgUrl(product.thumbnail.path)
    : (product.images && product.images.length > 0 
        ? getImgUrl(product.images[0].path)
        : (product.image || "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop"));
        
  const hoverIndex = product.hoverImageIndex || 0;
  const hoverImg = product.images && product.images.length > hoverIndex 
    ? getImgUrl(product.images[hoverIndex].path)
    : (product.hoverimage || mainImg);

  // Badge Logic
  let badge = product.badge;
  if (!badge) {
    if (product.isNewArrival) badge = "New";
    else if (product.isBestSeller) badge = "Best Seller";
    else if (discountPrice) badge = "Sale";
  }

  const outOfStock = product.stock === 0;

  // Helper to render star ratings
  const renderStars = (currentRating) => {
    const stars = [];
    const fullStars = Math.floor(currentRating);
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="text-[#980E0A]">★</span>);
      } else {
        stars.push(<span key={i} className="text-neutral-200">★</span>);
      }
    }
    return stars;
  };

  return (
    <div
      className="group flex flex-col space-y-4 cursor-default"
    >
      {/* Image Container with overlays */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border-custom bg-[#FAF7F4] shadow-sm transition-all duration-500 ease-out group-hover:shadow-md">
        {/* Product Primary Image */}
        <img
          src={mainImg}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 transform scale-100 group-hover:scale-[1.04] ease-out ${outOfStock ? 'opacity-60 grayscale-[50%]' : ''}`}
          loading="lazy"
        />

        {/* Hover Image */}
        {hoverImg !== mainImg && !outOfStock && (
          <img
            src={hoverImg}
            alt={title}
            loading="lazy"
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

        {/* Wishlist Button Overlay - z-30 */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md border ${
            isWishlisted
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
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md transform hover:scale-105 ${
              outOfStock ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-white text-text-primary border border-[#E8E3DD] hover:bg-[#980E0A] hover:text-white hover:border-[#980E0A]'
            }`}
            title={outOfStock ? "Out of Stock" : "Add to Cart"}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Details Container */}
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-base md:text-lg text-text-primary font-medium group-hover:text-[#980E0A] transition-colors duration-200 truncate pr-2">
            {title}
          </h3>
          <div className="flex flex-col items-end shrink-0">
            {discountPrice && discountPrice < price ? (
              <>
                <span className="font-sans text-sm md:text-base font-semibold text-[#980E0A]">
                  ₹{discountPrice.toLocaleString()}
                </span>
                <span className="text-[#999] text-[11px] md:text-xs line-through font-normal">
                  ₹{price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-sans text-sm md:text-base font-semibold text-[#980E0A]">
                ₹{price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <div className="flex text-sm leading-none">{renderStars(rating)}</div>
          {product.ratingCount > 0 && (
            <span className="text-[10px] text-text-secondary font-light">({product.ratingCount})</span>
          )}
        </div>
      </div>
    </div>
  );
}
