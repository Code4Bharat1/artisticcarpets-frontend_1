"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart, Share2, Star, Truck, Shield, RotateCcw, Minus, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import { useStore } from "@/store/useStore";
import axiosInstance from "@/services/axiosInstance";

export default function ProductDetailsPage({ params }) {
  const { slug } = use(params);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${slug}`);
        const data = res.data;
        setProduct(data.data?.product);
        if (data.data?.product?.variants?.length > 0) {
          setSelectedVariant(data.data.product.variants[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-[#FAF7F4]">
        <Navbar/>
        <Loader2 className="w-10 h-10 animate-spin text-[#7B1E1E]" />
        <p className="mt-4 text-[#666]">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-[#FAF7F4] text-[#2B2B2B]">
        <Navbar/>
        <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
        <p className="text-[#666] mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link href="/shop" className="px-8 py-3 bg-[#7B1E1E] text-white rounded font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => (item._id || item.id) === product._id);
  
  const getImgUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace("/api", "");
    return `${baseUrl}${path}`;
  };

  const mainImg = product.thumbnail?.path 
    ? getImgUrl(product.thumbnail.path)
    : "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop";

  const galleryImages = [mainImg, ...(product.images?.map(i => getImgUrl(i.path)) || [])];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, 1, selectedVariant);
    }
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentDiscountPrice = (selectedVariant && selectedVariant.discountPrice) ? selectedVariant.discountPrice : product.discountPrice;
  // Use product stock if no variants, otherwise use variant stock
  const outOfStock = product.variants && product.variants.length > 0 
    ? (selectedVariant ? selectedVariant.stock === 0 : true) 
    : product.stock === 0;

  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <Container>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#666] mb-8 font-sans">
            <Link href="/" className="hover:text-[#7B1E1E] transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-[#7B1E1E] transition">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#2B2B2B] font-medium">{product.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
            
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="aspect-[4/5] relative bg-white border border-[#E8DCD3] rounded-2xl overflow-hidden">
                <img 
                  src={galleryImages[activeImage]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-[#7B1E1E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                    {product.badge}
                  </div>
                )}
                {outOfStock && (
                  <div className="absolute top-4 left-4 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                    Out of Stock
                  </div>
                )}
              </div>
              
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {galleryImages.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#7B1E1E] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col font-sans">
              <div className="mb-2 text-sm font-semibold text-[#7B1E1E] tracking-widest uppercase">
                {product.productCollection || product.category}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2B2B2B] mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-[#7B1E1E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.ratingAverage || 5) ? 'fill-current' : 'text-[#E8DCD3]'}`} />
                  ))}
                </div>
                <span className="text-[#666] text-sm">{product.ratingCount || 0} Reviews</span>
                <span className="text-[#E8DCD3]">|</span>
                <span className="text-[#666] text-sm font-medium">SKU: {product.sku}</span>
              </div>

              <div className="text-2xl font-semibold text-[#2B2B2B] mb-6 flex items-center gap-3">
                {currentDiscountPrice ? (
                  <>
                    <span className="text-[#7B1E1E]">₹{currentDiscountPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    <span className="text-lg text-[#999] line-through font-normal">₹{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </>
                ) : (
                  <span>
                    {product.variants && product.variants.length > 0 && !selectedVariant && <span className="text-sm font-normal mr-1 text-[#2B2B2B]">From</span>}
                    ₹{(currentPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              <p className="text-[#666] leading-relaxed mb-8">
                {product.shortDescription || product.description}
              </p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-[#2B2B2B] uppercase tracking-widest mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 border rounded-md font-medium text-sm transition-all ${
                          selectedVariant?.size === variant.size
                            ? "border-[#7B1E1E] bg-[#7B1E1E] text-white"
                            : "border-[#E8DCD3] text-[#666] hover:border-[#7B1E1E]"
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-y-4 mb-8 py-6 border-y border-[#E8DCD3]">
                {product.origin && <div><span className="text-[#666] text-sm block mb-1">Origin</span><span className="font-medium text-[#2B2B2B]">{product.origin}</span></div>}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 mb-8">
                {outOfStock ? (
                  <div className="p-4 bg-neutral-100 rounded-xl text-center text-neutral-600 font-medium">
                    This item is currently out of stock.
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center justify-between border border-[#E8DCD3] rounded-xl px-4 py-3 sm:w-32 bg-white">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-[#666] hover:text-[#7B1E1E]"><Minus className="w-4 h-4" /></button>
                      <span className="font-semibold text-[#2B2B2B]">{quantity}</span>
                      <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="text-[#666] hover:text-[#7B1E1E]"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#7B1E1E] text-white rounded-xl font-semibold tracking-wide hover:bg-[#5A1616] transition-colors py-3"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="flex-1 flex items-center justify-center gap-2 border border-[#E8DCD3] rounded-xl py-3 hover:border-[#7B1E1E] hover:text-[#7B1E1E] transition-colors bg-white font-medium"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7B1E1E] text-[#7B1E1E]' : ''}`} />
                    {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-[#E8DCD3] rounded-xl hover:border-[#7B1E1E] hover:text-[#7B1E1E] transition-colors bg-white">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Promises */}
              <div className="flex flex-col gap-3 text-sm text-[#666]">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#7B1E1E]" />
                  <span>Free Worldwide Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-[#7B1E1E]" />
                  <span>30-Day Free Returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#7B1E1E]" />
                  <span>Certificate of Authenticity Included</span>
                </div>
              </div>

            </div>
          </div>
          
        </Container>
      </div>
      
      <Footer />
    </div>
  );
}
