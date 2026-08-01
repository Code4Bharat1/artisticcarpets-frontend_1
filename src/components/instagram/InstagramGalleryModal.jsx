"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Share2, ExternalLink } from "lucide-react";

const InstagramGalleryModal = ({ post, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Artistic Carpets on Instagram",
          text: post.caption,
          url: post.permalink,
        });
      } else {
        navigator.clipboard.writeText(post.permalink);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Determine all media items (if carousel, combine them)
  const mediaItems = post.mediaType === "CAROUSEL_ALBUM" && post.children?.length > 0
    ? post.children
    : [{ mediaType: post.mediaType, mediaUrl: post.mediaUrl, thumbnailUrl: post.thumbnailUrl }];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl bg-white rounded-[24px] overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] shadow-2xl">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full text-gray-800 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Section */}
        <div className="w-full md:w-3/5 lg:w-2/3 bg-black relative flex items-center justify-center min-h-[40vh] md:min-h-full">
          {mediaItems[currentIndex].mediaType === "VIDEO" ? (
            <video
              src={mediaItems[currentIndex].mediaUrl}
              className="w-full h-full object-contain max-h-full"
              controls
              autoPlay
              muted
              loop
            />
          ) : (
            <img 
              src={mediaItems[currentIndex].mediaUrl} 
              alt={post.caption?.substring(0, 50) || "Gallery image"} 
              className="w-full h-full object-contain max-h-full"
            />
          )}

          {/* Carousel Controls */}
          {mediaItems.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-y-1/2 flex gap-2">
                {mediaItems.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/5 lg:w-1/3 bg-white flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <img src="/assets/logo.png" alt="Logo" className="w-6 h-6 object-contain" onError={(e) => e.target.style.display='none'} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-sm text-text-primary">{post.username || "artisticcarpets"}</h4>
                <p className="text-xs text-text-secondary">{formatDate(post.timestamp)}</p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="hidden md:block text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Caption */}
          <div className="p-6 overflow-y-auto flex-1">
            <p className="text-text-primary whitespace-pre-wrap text-sm leading-relaxed">
              {post.caption}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
            <a 
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary-brand text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#7A0B08] transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View on Instagram
            </a>
            <button 
              onClick={handleShare}
              className="bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstagramGalleryModal;
