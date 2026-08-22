"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Search, Heart, MapPin, Eye, ImageIcon, Loader2 } from "lucide-react";
import InstagramGallery from "@/components/instagram/InstagramGallery";

export default function GalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");
  const [liked, setLiked] = useState({});
  const categories = ["All", "Residential", "Commercial", "Hotels", "Villas", "Mosques", "Offices", "Exhibitions", "Events", "Behind the Scenes"];

  useEffect(() => {
    fetchGalleries();
  }, [category, sort]);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: 50, sort });
      if (category !== "All") params.append("category", category);
      if (search) params.append("search", search);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${baseUrl}/gallery?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setGalleries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchGalleries();
  };

  const toggleLike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic UI update
    const isLiked = liked[id];
    setLiked({ ...liked, [id]: !isLiked });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      await fetch(`${baseUrl}/gallery/${id}/like`, { method: "POST" });
    } catch (err) {
      // Revert if error
      setLiked({ ...liked, [id]: isLiked });
    }
  };

  const getImgSrc = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop";
    if (path.startsWith("http") || path.startsWith("data:")) return path;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
    return path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  };

  return (
    <div className="bg-brand-white min-h-screen font-sans">
      <Navbar />


      {/* Instagram Integration Section */}
      <section className="bg-brand-offwhite py-24 border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-4">Follow Our Journey</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-12">
            Stay updated with our latest projects, behind-the-scenes craftsmanship, and design inspiration on Instagram.
          </p>

          <InstagramGallery />
        </div>
      </section>

      <Footer />
    </div>
  );
}
