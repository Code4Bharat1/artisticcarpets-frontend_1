"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Navigation, Phone, Compass } from "lucide-react";

export default function MapCard() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-[#E8E3DD] bg-[#F7F3EE] group">
      {/* Top Map Header Bar */}
      <div className="absolute top-0 inset-x-0 z-20 bg-white/90 backdrop-blur-md px-6 py-3 border-b border-[#E8E3DD]/60 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-[#980E0A]" />
          <span className="font-serif text-sm font-medium text-text-primary">
            Contact Us - Artistic Carpets
          </span>
        </div>
        <div className="flex items-center space-x-4 font-sans text-[11px] text-text-secondary">
          <span className="cursor-pointer hover:text-[#980E0A] transition-colors">Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-[#980E0A] transition-colors">Gallery</span>
        </div>
      </div>

      {/* Map Content / Illustration */}
      <div className="relative w-full h-full pt-10">
        {!imgError ? (
          <img
            src="/mayfair_vintage_map.png"
            alt="Map illustration of Mayfair London flagship location"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            onError={() => setImgError(true)}
          />
        ) : (
          /* SVG Vintage Map Fallback Graphic */
          <div className="w-full h-full bg-[#FAF5EE] relative p-8 flex items-center justify-center overflow-hidden">
            {/* Grid street layout SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-30 stroke-[#C4A892]" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="20%" x2="90%" y2="20%" strokeWidth="2" />
              <line x1="20%" y1="10%" x2="20%" y2="90%" strokeWidth="2" />
              <line x1="50%" y1="10%" x2="50%" y2="90%" strokeWidth="3" />
              <line x1="10%" y1="60%" x2="90%" y2="60%" strokeWidth="2" strokeDasharray="6 4" />
              <text x="35%" y="45%" className="fill-text-secondary text-xs font-serif font-bold tracking-widest uppercase">MAYFAIR</text>
              <text x="52%" y="55%" className="fill-[#980E0A] text-xs font-sans font-bold tracking-wider uppercase">SAVILE ROW</text>
            </svg>
          </div>
        )}

        {/* Central Flagship Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-10 h-10 bg-[#980E0A]/20 rounded-full animate-ping" />
            <div className="w-9 h-9 bg-[#980E0A] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="mt-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-[#E8E3DD] text-center">
            <p className="font-serif text-xs font-bold text-[#980E0A]">Artistic Carpets</p>
            <p className="font-sans text-[10px] text-text-secondary">Sq. 12 Mayfair</p>
          </div>
        </div>

        {/* Floating Detail Overlay Card in corner */}
        <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#E8E3DD] max-w-[220px]">
          <p className="font-sans text-[10px] font-semibold tracking-wider text-text-secondary uppercase mb-1">
            Address
          </p>
          <p className="font-sans text-xs font-medium text-text-primary mb-2 leading-tight">
            12 Savile Row, Mayfair, London W1S 3PQ
          </p>
          <p className="font-sans text-[10px] font-semibold tracking-wider text-text-secondary uppercase mb-1">
            Phone
          </p>
          <p className="font-sans text-xs font-medium text-[#980E0A]">
            +44 (0) 20 7123 4567
          </p>
        </div>
      </div>
    </div>
  );
}
