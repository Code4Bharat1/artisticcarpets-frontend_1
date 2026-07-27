"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/common/Container";

export default function LoginFooter() {
  return (
    <footer className="bg-[#FAF7F4] border-t border-[#E8E3DD] py-12 text-[#1E1E1E]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-normal text-[#980E0A]">
              Artistic Carpets
            </h3>
            <p className="font-sans text-xs text-[#666666] font-light leading-relaxed">
              © 2024 Artistic Carpets. Crafted with Artistry.
            </p>
          </div>

          {/* Column 2: Shopping */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#980E0A]">
              Shopping
            </h4>
            <ul className="space-y-2 font-sans text-xs text-[#666666] font-light">
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Journal */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#980E0A]">
              Journal
            </h4>
            <ul className="space-y-2 font-sans text-xs text-[#666666] font-light">
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Artisan Stories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#980E0A] transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#980E0A]">
              Legal
            </h4>
            <ul className="space-y-2 font-sans text-xs text-[#666666] font-light">
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#980E0A] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
