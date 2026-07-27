"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/common/Container";
import LoginLeftHero from "./LoginLeftHero";
import LoginForm from "./LoginForm";

export default function LoginSection() {
  return (
    <section className="w-full py-6 sm:py-8 md:py-12 flex-1 flex flex-col justify-center">
      <Container>
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#980E0A] hover:text-neutral-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-[#FEF7E4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#E8E3DD]/60 flex flex-col lg:flex-row min-h-0 lg:min-h-[580px]">
          {/* Left 50% Editorial Loom Hero Panel */}
          <LoginLeftHero />

          {/* Right 50% Luxury Beige Login Form */}
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
