"use client";

import React from "react";
import Container from "@/components/common/Container";
import ContactImage from "./ContactImage";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="py-12 md:py-2 bg-[#FCF9F8]">
      <Container>
        {/* Deep Burgundy Section Frame */}
        <div className="bg-[#980E0A] rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 60% Column - Lifestyle Image */}
            <div className="lg:col-span-7 flex flex-col min-h-[420px] lg:min-h-[580px]">
              <ContactImage />
            </div>

            {/* Right 40% Column - Luxury Contact Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
