"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="bg-[#FCF9F8] border-t border-[#E8E3DD] pt-16 pb-10 text-text-primary">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-16">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-normal tracking-tight text-[#980E0A]">
              Artistic Carpets
            </h3>
            <p className="font-sans text-xs text-text-secondary font-light leading-relaxed max-w-xs">
              Crafting stories one thread at a time since 1924.
            </p>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-text-primary/90">
              Collections
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-text-secondary font-light">
              <li>
                <Link href="/shop" className="hover:text-[#980E0A] transition-colors">
                  Heritage Silks
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#980E0A] transition-colors">
                  Modern Abstract
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#980E0A] transition-colors">
                  Tribal Nomadic
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-text-primary/90">
              Support
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-text-secondary font-light">
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Journal */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-text-primary/90">
              Journal
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-text-secondary font-light">
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Artisan Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Design Trends
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#E8E3DD]/60 pt-8 text-center">
          <p className="font-sans text-[11px] text-text-secondary font-light">
            © 2026 Artistic Carpets. Crafted with Artistry.
          </p>
        </div>
      </Container>
    </footer>
  );
}
