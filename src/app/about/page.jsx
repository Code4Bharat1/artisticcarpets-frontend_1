"use client";
import { DM_Serif_Display } from "next/font/google";
import { ArrowRight, Leaf, PenTool } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#333333]">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Image */}
            <div className="relative w-full aspect-[4/5] max-w-lg mx-auto lg:mx-0">
              <div className="absolute inset-1  rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-sm">
                <img
                  src="https://turkishrug.com/cdn/shop/articles/turkish-rugs.webp?v=1782736855&width=800"
                  alt="Traditional Persian Carpet"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-[8px] cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                />
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-2 text-[10px] tracking-widest font-semibold text-[#7B1E1E]">
                EST. 1924 • HANDMADE
              </div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col">
              <h1 className={`${dmSerif.className} text-4xl md:text-[58px] text-[#7B1E1E] mb-8`}>
                Handcrafted
                for Generations.</h1>

              <p>
                Since 1924, Artistic Carpets has transformed centuries of craftsmanship into
                timeless works of art. Every carpet is hand-knotted by skilled artisans using
                the finest natural materials.
              </p>

              <p>
                Rooted in heritage and guided by contemporary design, our collections are
                created to be lived with, admired, and passed on for generations.
              </p>

              <Link href="#" className="inline-flex mt-4 items-center text-xs font-semibold tracking-widest text-[#7B1E1E] hover:text-[#5A1515] transition-colors mb-16">
                Explore Our Heritage  <ArrowRight className="ml-3 w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 border-t border-[#E5E0D8] pt-8">
                <div>
                  <div className={`${dmSerif.className} text-2xl text-[#7B1E1E] mb-1`}>100<span className="text-xl">+</span></div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Years of Legacy</div>
                </div>
                <div>
                  <div className={`${dmSerif.className} text-2xl text-[#7B1E1E] mb-1`}>5000<span className="text-xl">+</span></div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Artisans Supported</div>
                </div>
                <div>
                  <div className={`${dmSerif.className} text-2xl text-[#7B1E1E] mb-1`}>12</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Global Awards</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#F8F5F0] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`${dmSerif.className} text-3xl md:text-4xl text-[#7B1E1E] mb-4`}>The Artisan's Process</h2>
            <div className="w-16 h-0.5 bg-[#7B1E1E] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Image & Cards - Span 8 columns */}
            <div className="lg:col-span-8 space-y-8">
              <div className="relative w-full aspect-[16/7] overflow-hidden group">
                <img
                  src="https://oldkilim.com/wp-content/uploads/2025/01/Turkish-Handwoven-Rugs-History.webp"
                  alt="Weaver at loom"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-8">
                  <h3 className={`${dmSerif.className} text-2xl text-white`}>The Weaver's Touch</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-[#E5E0D8]">
                  <Leaf className="w-5 h-5 text-[#7B1E1E] mb-4" />
                  <h4 className="text-xs font-semibold text-[#7B1E1E] uppercase tracking-widest mb-2">Natural Dyes</h4>
                  <p className="text-sm text-gray-600 font-light">Extracted from pomegranate, indigo, and madder root for timeless vibrance.</p>
                </div>
                <div className="bg-white p-6 border border-[#E5E0D8]">
                  <PenTool className="w-5 h-5 text-[#7B1E1E] mb-4" />
                  <h4 className="text-xs font-semibold text-[#7B1E1E] uppercase tracking-widest mb-2">Bespoke Design</h4>
                  <p className="text-sm text-gray-600 font-light">Custom patterns tailored to individual architectural contexts.</p>
                </div>
              </div>
            </div>

            {/* Right Red Box - Span 4 columns */}
            <div className="lg:col-span-4 h-full">
              <div className="bg-[#8B2323] h-full p-10 flex flex-col justify-center text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-10 right-10 opacity-10">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                  </svg>
                </div>

                <h3 className={`${dmSerif.className} text-3xl mb-6 relative z-10`}>A Legacy of Softness</h3>
                <p className="text-white/80 text-sm font-light leading-relaxed mb-12 relative z-10">
                  Our signature New Zealand wool is hand-combed and spun to preserve natural oils, ensuring a luster that only deepens with age.
                </p>

                <Link href="/collections" className="inline-flex items-center text-[10px] uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors self-start relative z-10">
                  EXPLORE COLLECTIONS
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
