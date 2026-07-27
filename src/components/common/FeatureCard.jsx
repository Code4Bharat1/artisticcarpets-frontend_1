"use client";

import React from "react";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center group cursor-pointer hover:-translate-y-1 transition-all duration-300">
      {/* Circular light pink/red icon background */}
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FCEBEB] group-hover:bg-[#F8DADA] flex items-center justify-center transition-colors duration-300 mb-4 shadow-xs">
        {Icon && <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#980E0A] stroke-[1.75]" aria-hidden="true" />}
      </div>

      {/* Heading */}
      <h3 className="font-sans text-xs md:text-sm font-semibold tracking-wider uppercase text-text-primary group-hover:text-[#980E0A] transition-colors duration-300">
        {title}
      </h3>

      {description && (
        <p className="font-sans text-xs text-text-secondary mt-1 font-light leading-normal max-w-xs">
          {description}
        </p>
      )}
    </div>
  );
}
