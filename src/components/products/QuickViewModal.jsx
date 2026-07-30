"use client";

import { useStore } from "@/store/useStore";
import { X, ShoppingBag, Heart, Star, Check } from "lucide-react";
import Button from "@/components/common/Button";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useStore();

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.some((item) => (item._id || item.id) === (quickViewProduct._id || quickViewProduct.id));

  // Map backend data structure
  const title = quickViewProduct.title || quickViewProduct.name;
  const price = quickViewProduct.price || 0;
  const discountPrice = quickViewProduct.discountPrice;
  const rating = quickViewProduct.ratingAverage || quickViewProduct.rating || 0;
  const reviews = quickViewProduct.ratingCount || quickViewProduct.reviews || 0;
  const description = quickViewProduct.description || quickViewProduct.shortDescription;
  
  const getImgUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace("/api", "");
    return `${baseUrl}${path}`;
  };

  const mainImg = quickViewProduct.thumbnail?.path 
    ? getImgUrl(quickViewProduct.thumbnail.path)
    : (quickViewProduct.images && quickViewProduct.images.length > 0 
        ? getImgUrl(quickViewProduct.images[0].path)
        : (quickViewProduct.image || "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop"));

  let badge = quickViewProduct.badge;
  if (!badge) {
    if (quickViewProduct.isNewArrival) badge = "New";
    else if (quickViewProduct.isBestSeller) badge = "Best Seller";
    else if (discountPrice) badge = "Sale";
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-text-primary/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
      {/* Modal Card */}
      <div className="relative bg-brand-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-border-custom">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-brand-white/80 backdrop-blur border border-border-custom flex items-center justify-center text-text-primary hover:text-primary-brand transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Left Column: Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-collection-bg border border-border-custom">
            <img
              src={mainImg}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Content Info */}
          <div className="flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-4">
              {/* Badge & Rating */}
              <div className="flex items-center justify-between">
                {badge ? (
                  <span className="text-[10px] font-semibold tracking-widest uppercase bg-primary-brand text-brand-white px-2.5 py-1 rounded-full">
                    {badge}
                  </span>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-primary-brand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating || 5) ? 'fill-current' : 'text-[#E8DCD3]'}`} />
                    ))}
                  </div>
                  <span className="text-[12px] text-text-secondary">({reviews} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-1 border-b border-border-custom pb-4">
                <h3 className="font-serif text-2xl md:text-3xl text-text-primary font-medium">
                  {title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <p className="font-sans text-xl font-bold text-primary-brand">
                    ₹{discountPrice ? discountPrice.toLocaleString() : price.toLocaleString()}
                  </p>
                  {discountPrice && (
                    <p className="font-sans text-sm text-text-muted line-through">
                      ₹{price.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs md:text-sm text-text-secondary font-light leading-relaxed">
                {description}
              </p>

              {/* Details List */}
              {(() => {
                const details = quickViewProduct.details || [
                  quickViewProduct.material && `Material: ${quickViewProduct.material}`,
                  quickViewProduct.size && `Size: ${quickViewProduct.size}`,
                  quickViewProduct.shape && `Shape: ${quickViewProduct.shape}`,
                  quickViewProduct.origin && `Origin: ${quickViewProduct.origin}`,
                  quickViewProduct.weavingType && `Weaving: ${quickViewProduct.weavingType}`,
                ].filter(Boolean);
                
                if (details.length === 0) return null;
                
                return (
                  <div className="space-y-2 pt-2">
                  <h4 className="font-serif text-[10px] font-bold tracking-widest uppercase text-text-primary">
                    Product Specifications
                  </h4>
                  <ul className="space-y-1.5">
                    {details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-xs text-text-secondary font-light">
                        <Check className="w-3.5 h-3.5 text-primary-brand mr-2 flex-shrink-0 stroke-[2.5]" />
                        {detail}
                      </li>
                    ))}
                    <li className="flex items-center text-xs text-text-secondary font-light">
                      <Check className="w-3.5 h-3.5 text-primary-brand mr-2 flex-shrink-0 stroke-[2.5]" />
                      {quickViewProduct.refundPolicy?.enabled 
                        ? `Refund: Available within ${quickViewProduct.refundPolicy.refundWindow || 7} days` 
                        : 'Refund: Non-refundable'}
                    </li>
                  </ul>
                </div>
                );
              })()}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-custom">
              <Button
                variant="primary"
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="w-full justify-center py-4 text-xs font-semibold"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => toggleWishlist(quickViewProduct)}
                className="w-full  justify-center py-4 text-xs font-semibold"
              >
                <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current text-primary-brand" : ""}`} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
