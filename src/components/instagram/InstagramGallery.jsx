"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader2, Instagram, Image as ImageIcon, Play, Layers } from "lucide-react";
import InstagramGalleryModal from "./InstagramGalleryModal";

const InstagramGallery = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const loaderRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    // Intersection Observer for infinite scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await axios.get(`${baseUrl}/instagram?page=${page}&limit=12`);
      
      const { data, pages, total } = res.data;
      
      if (page === 1) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }
      
      setTotalPosts(total);
      setHasMore(page < pages);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch Instagram posts", err);
      setError("Failed to load Instagram gallery. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full">
      {/* Header section is already in GalleryPage, we just display grid here */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-heading text-2xl text-text-primary">Latest on Instagram</h3>
        {totalPosts > 0 && (
          <span className="text-sm font-medium text-text-secondary">
            {totalPosts} Posts
          </span>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-[16px] text-center border border-red-100">
          <p>{error}</p>
        </div>
      ) : posts.length === 0 && !loading ? (
        <div className="bg-white p-12 rounded-[16px] text-center border border-border-custom shadow-sm">
          <Instagram className="w-12 h-12 text-text-secondary mx-auto mb-4 opacity-50" />
          <h4 className="font-heading text-xl text-text-primary mb-2">No Posts Yet</h4>
          <p className="text-text-secondary">Check back soon for our latest updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.instagramId}
              className="group rounded-[16px] overflow-hidden shadow-sm border border-border-custom bg-white flex flex-col hover:shadow-lg transition-all duration-300 text-left cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-4 flex items-center gap-3 border-b border-border-custom justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/assets/logo.png" alt="Logo" className="w-6 h-6 object-contain" onError={(e) => e.target.style.display='none'} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-text-primary">{post.username || "artisticcarpets"}</h4>
                  </div>
                </div>
                <Instagram className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {post.mediaType === "VIDEO" ? (
                  <>
                    <img 
                      src={post.thumbnailUrl || post.mediaUrl} 
                      alt="Instagram Video Thumbnail" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                    <video
                      src={post.mediaUrl}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    />
                    <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full text-white backdrop-blur-sm">
                      <Play className="w-4 h-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <img 
                      src={post.mediaUrl} 
                      alt={post.caption?.substring(0, 50) || "Instagram post"} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy" 
                    />
                    {post.mediaType === "CAROUSEL_ALBUM" && (
                      <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded-md text-white flex items-center gap-1 backdrop-blur-sm">
                        <Layers className="w-4 h-4" />
                        <span className="text-xs font-medium">+{post.children?.length || 0}</span>
                      </div>
                    )}
                  </>
                )}
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                   <div className="bg-white/95 text-primary-brand px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 font-medium shadow-sm flex items-center gap-2">
                     <ImageIcon className="w-4 h-4" />
                     View Gallery
                   </div>
                </div>
              </div>

              <div className="p-4 pb-5 bg-white flex-1 flex flex-col justify-between">
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {post.caption}
                </p>
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{formatDate(post.timestamp)}</span>
                  <a 
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-brand font-semibold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open on Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Skeleton Loaders */}
          {loading && (
             Array.from({ length: page === 1 ? 6 : 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="rounded-[16px] overflow-hidden border border-border-custom bg-white flex flex-col">
                  <div className="p-4 flex items-center gap-3 border-b border-border-custom">
                     <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                     <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="aspect-square bg-gray-100 animate-pulse"></div>
                  <div className="p-4 pb-5 flex-1">
                    <div className="h-3 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-3 w-2/3 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
             ))
          )}
        </div>
      )}

      {/* Infinite Scroll trigger point */}
      <div ref={loaderRef} className="h-10 mt-8 flex justify-center items-center">
        {loading && page > 1 && <Loader2 className="w-6 h-6 text-primary-brand animate-spin" />}
        {!hasMore && posts.length > 0 && (
          <p className="text-sm text-gray-500 text-center w-full">You've seen all the posts.</p>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <InstagramGalleryModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </div>
  );
};

export default InstagramGallery;
