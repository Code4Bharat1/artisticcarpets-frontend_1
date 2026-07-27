"use client";

import React from "react";
import { MapPin, Phone } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import MapCard from "./MapCard";

export default function StoreLocation() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-[#E8E3DD]/40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Gallery Information */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Badge */}
            <div>
              <span className="inline-block bg-[#FDF2F2] text-[#980E0A] font-sans text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-[#F8DADA]">
                VISIT OUR GALLERY
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary font-normal leading-[1.15] tracking-tight">
              Experience Artistry in Person
            </h2>

            {/* Description */}
            <p className="font-sans text-sm md:text-base text-text-secondary font-light leading-relaxed max-w-xl">
              Our flagship atelier is located in the heart of the design district, where you can feel the textures and witness the vibrancy of our loom-woven masterpieces.
            </p>

            {/* Location & Phone Details */}
            <div className="space-y-5 pt-4">
              {/* Location Detail */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-[#FDF2F2] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#980E0A] group-hover:bg-[#980E0A] group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-text-primary">
                    Mayfair Flagship
                  </h3>
                  <p className="font-sans text-xs text-text-secondary font-light mt-0.5">
                    12 Savile Row, London, W1S 3PQ
                  </p>
                </div>
              </div>

              {/* Phone Detail */}
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-[#FDF2F2] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#980E0A] group-hover:bg-[#980E0A] group-hover:text-white transition-colors duration-300">
                  <Phone className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-text-primary">
                    Concierge Line
                  </h3>
                  <p className="font-sans text-xs text-text-secondary font-light mt-0.5">
                    +44 (0) 20 7123 4567
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button
                variant="tan"
                className="py-3 px-6 text-[11px] font-bold tracking-widest"
              >
                VISIT OUR GALLERY
              </Button>
            </div>
          </div>

          {/* Right Column: Map Card */}
          <div className="lg:col-span-6 w-full">
            <MapCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
