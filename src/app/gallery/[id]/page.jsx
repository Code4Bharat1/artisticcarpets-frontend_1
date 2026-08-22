"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, MapPin, User, Calendar, Ruler, Scissors, Share2, Heart, X, Loader2 } from "lucide-react";

export default function GalleryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [gallery, setGallery] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, [id]);

  useEffect(() => {
    // Add view count
    if (gallery && gallery._id) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      fetch(`${baseUrl}/gallery/${gallery._id}/view`, { method: "POST" }).catch(() => { });
    }
  }, [gallery]);

  const fetchGallery = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${baseUrl}/gallery/${id}`);
      const data = await res.json();
      if (data.success) {
        setGallery(data.gallery);

        // Fetch related
        if (data.gallery.category) {
          const relRes = await fetch(`${baseUrl}/gallery?category=${data.gallery.category}&limit=4`);
          const relData = await relRes.json();
          if (relData.success) {
            setRelated(relData.data.filter(g => g._id !== data.gallery._id).slice(0, 3));
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!gallery) return;
    setLiked(!liked);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      await fetch(`${baseUrl}/gallery/${gallery._id}/like`, { method: "POST" });
    } catch (err) {
      setLiked(liked);
    }
  };

  const getImgSrc = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop";
    if (path.startsWith("http") || path.startsWith("data:")) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
    return path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-brand" size={40} />
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col items-center justify-center font-sans">
        <h1 className="font-heading text-3xl mb-4 text-text-primary">Project Not Found</h1>
        <Link href="/gallery" className="text-primary-brand hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Gallery
        </Link>
      </div>
    );
  }

  const images = gallery.images?.length > 0 ? gallery.images : [gallery.featuredImage];
  const activeImg = getImgSrc(images[activeImgIndex]);

  const nextImg = () => setActiveImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-brand-white min-h-screen font-sans">
      <Navbar />

      {/* Hero Image Slider */}
      <section className="pt-24 lg:pt-32 px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <Link href="/gallery" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-brand transition-colors mb-6 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Gallery
        </Link>

        <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 group">
          <img
            src={activeImg}
            alt={gallery.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={nextImg} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all">
                  <ChevronRight size={24} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === activeImgIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24 flex flex-col lg:flex-row gap-16">

        {/* Left: Project Information */}
        <aside className="w-full lg:w-1/3 order-2 lg:order-1">
          <div className="sticky top-32 bg-brand-offwhite rounded-2xl p-8 border border-border-custom shadow-sm">
            <h3 className="font-heading text-2xl text-text-primary mb-6 border-b border-border-custom pb-4">Project Details</h3>

            <div className="space-y-6">
              {gallery.clientName && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-primary-brand shadow-sm"><User size={20} /></div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Client</p>
                    <p className="text-text-primary font-medium">{gallery.clientName}</p>
                  </div>
                </div>
              )}
              {gallery.location && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-primary-brand shadow-sm"><MapPin size={20} /></div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Location</p>
                    <p className="text-text-primary font-medium">{gallery.location}</p>
                  </div>
                </div>
              )}
              {gallery.category && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-primary-brand shadow-sm"><span className="w-5 h-5 flex items-center justify-center font-bold">C</span></div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Category</p>
                    <p className="text-text-primary font-medium">{gallery.category}</p>
                  </div>
                </div>
              )}
              {gallery.carpetType && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-primary-brand shadow-sm"><span className="w-5 h-5 flex items-center justify-center font-bold">T</span></div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Carpet Type</p>
                    <p className="text-text-primary font-medium">{gallery.carpetType}</p>
                  </div>
                </div>
              )}
              {gallery.areaCovered && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-primary-brand shadow-sm"><Ruler size={20} /></div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Area Covered</p>
                    <p className="text-text-primary font-medium">{gallery.areaCovered}</p>
                  </div>
                </div>
              )}
              {gallery.completionDate && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-primary-brand shadow-sm"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Completion Date</p>
                    <p className="text-text-primary font-medium">{gallery.completionDate}</p>
                  </div>
                </div>
              )}
              {gallery.designer && (
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-primary-brand shadow-sm"><Scissors size={20} /></div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Designer</p>
                    <p className="text-text-primary font-medium">{gallery.designer}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-border-custom flex gap-4">
              <button
                onClick={toggleLike}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border-custom bg-white hover:bg-red-50 text-text-primary hover:text-red-500 hover:border-red-100 transition-colors font-medium"
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} className={liked ? "text-red-500" : ""} />
                {liked ? "Loved" : "Love Project"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }}
                className="flex items-center justify-center w-12 rounded-lg border border-border-custom bg-white hover:bg-gray-50 text-text-secondary transition-colors"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </aside>

        {/* Right: Story & Highlights */}
        <main className="w-full lg:w-2/3 order-1 lg:order-2">
          {gallery.badge && (
            <span className="inline-block bg-primary-gold/10 text-primary-gold font-bold uppercase tracking-widest text-xs px-3 py-1 rounded-full mb-4">
              {gallery.badge}
            </span>
          )}

          <h1 className="font-heading text-4xl lg:text-5xl text-text-primary mb-6 leading-tight">
            {gallery.title}
          </h1>

          {/* Highlights Chips */}
          {(gallery.materials?.length > 0 || gallery.tags?.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-10">
              {gallery.materials?.map(m => (
                <span key={m} className="px-4 py-1.5 bg-brand-offwhite border border-border-custom rounded-full text-xs font-semibold text-text-primary">
                  {m}
                </span>
              ))}
              {gallery.tags?.map(t => (
                <span key={t} className="px-4 py-1.5 bg-white border border-border-custom rounded-full text-xs font-medium text-text-secondary">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-lg prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed max-w-none">
            <h2 className="text-3xl mb-4">The Project Story</h2>
            {gallery.fullDescription ? (
              <div dangerouslySetInnerHTML={{ __html: gallery.fullDescription.replace(/\n/g, '<br/>') }} />
            ) : (
              <p>{gallery.shortDescription}</p>
            )}
          </div>

          {/* Testimonial Section */}
          <div className="mt-16 bg-brand-offwhite rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-primary-gold/10">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L16.017 14L10.017 14L12.017 5L20.017 5L22.017 14L20.017 21L14.017 21ZM5.01697 21L7.01697 14L1.01697 14L3.01697 5L11.017 5L13.017 14L11.017 21L5.01697 21Z" /></svg>
            </div>
            <div className="relative z-10">
              <div className="flex gap-1 text-primary-gold mb-6">
                {[1, 2, 3, 4, 5].map(i => <Heart key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="font-heading text-2xl lg:text-3xl text-text-primary leading-relaxed italic">
                "The craftsmanship exceeded our expectations. Every detail reflects luxury and perfection, perfectly complementing the space."
              </p>
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-text-secondary">
                — {gallery.clientName || "Valued Client"}
              </p>
            </div>
          </div>

        </main>
      </section>

      {/* Image Gallery Grid */}
      {images.length > 1 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <h2 className="font-heading text-3xl text-text-primary mb-8 border-b border-border-custom pb-4">Project Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => {
                  setActiveImgIndex(idx);
                  setIsFullscreen(true);
                }}
              >
                <img
                  src={getImgSrc(img)}
                  alt={`${gallery.title} - Image ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="bg-brand-offwhite py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-3xl text-text-primary mb-12 text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  href={`/gallery/${item.slug || item._id}`}
                  key={item._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={getImgSrc(item.featuredImage || (item.images && item.images[0]))}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-text-primary mb-2 line-clamp-1 group-hover:text-primary-brand transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-medium uppercase tracking-wider">
                      {item.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft size={48} />
          </button>

          <img
            src={getImgSrc(images[activeImgIndex])}
            alt="Fullscreen"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />

          <button
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight size={48} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-widest">
            {activeImgIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
