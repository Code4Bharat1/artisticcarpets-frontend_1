"use client";

import React from "react";
import Container from "@/components/common/Container";

export default function ContactHero() {
  return (
    <section className="bg-[#FEF8E6] pt-32 pb-12 text-center border-b border-[#E8E3DD]/40">
      <Container>
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="inline-block font-sans text-xs font-bold tracking-[0.25em] text-[#980E0A] uppercase">
            ATELIER & CONCIERGE
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-text-primary tracking-tight">
            Connect With Us
          </h1>
          <p className="font-sans text-sm md:text-base text-text-secondary font-light leading-relaxed">
            From bespoke rug commissions to heritage collection inquiries, our master artisans are at your service.
          </p>
        </div>
      </Container>
    </section>
  );
}
