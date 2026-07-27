"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ContactImage() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[560px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-300">
      {/* Editorial Luxury Image */}
      {!imageError ? (
        <Image
          src="/image.png"
          alt="Handwoven heritage red carpet folded over warm artisanal wooden table"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-[#800A07] flex items-center justify-center p-8 text-center text-white/80">
          <div className="space-y-3">
            <p className="font-serif text-2xl font-normal text-[#FEF8E6]">Heritage Collection</p>
            <p className="font-sans text-xs uppercase tracking-widest text-white/60">Artisanal Loom Masterpieces</p>
          </div>
        </div>
      )}

      {/* Subtle lighting overlay for editorial luxury depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
