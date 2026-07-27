"use client";

import React from "react";
import Link from "next/link";

export default function LoginLeftHero() {
  return (
    <div className="relative w-full lg:w-1/2 min-h-[220px] sm:min-h-[300px] lg:min-h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden bg-[#5B0907]">
      {/* Background Editorial Imagery */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
        <img
          src="https://oldkilim.com/wp-content/uploads/2025/01/Turkish-Handwoven-Rugs-History.webp"
          alt="Artisan weaving rug at traditional loom"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Deep Burgundy Color Filter Overlay matching reference mockup */}
      <div className="absolute inset-0 bg-[#680C09]/85 z-0 pointer-events-none" />

      {/* Top Brand Logo */}
      <div className="relative z-10">
        <Link
          href="/"
          className="font-serif text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          Artistic Carpets
        </Link>
      </div>

      {/* Center Welcome Headline */}
      <div className="relative z-10 my-auto text-center space-y-4 sm:space-y-6 max-w-md mx-auto py-6 sm:py-12">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-[1.15] tracking-tight">
          Welcome Back to <br />
          Artistic Carpets
        </h1>
        {/* Underline Graphic */}
        <div className="w-12 sm:w-16 h-0.5 bg-white/60 mx-auto rounded-full" />
      </div>

      {/* Bottom Subtle Spacer */}
      <div className="relative z-10 text-white/40 font-sans text-[10px] sm:text-xs tracking-widest uppercase text-center font-light">
        Handwoven Luxury Heritage Since 1924
      </div>
    </div>
  );
}
