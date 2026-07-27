"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_COLLECTIONS = [
  {
    id: "persian-rugs",
    name: "Persian Rugs",
    description: "Hand-knotted masterpieces inspired by centuries of heritage.",
    count: "124 Products",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwkZ-8Xama4gfHG2H9s9vunhksD5kK_ukjgQDQSIsojw&s=10",
    link: "#"
  },
  {
    id: "modern-rugs",
    name: "Modern Rugs",
    description: "Contemporary designs crafted for elegant living spaces.",
    count: "86 Products",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtJjEy9j8D1SEREGlqErs7sx2EzlWh15Pw3UU_P-nPw&s=10",
    link: "#"
  },
  {
    id: "vintage-rugs",
    name: "Vintage Rugs",
    description: "Beautifully aged pieces with timeless character.",
    count: "58 Products",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    link: "#"
  },
  {
    id: "outdoor-rugs",
    name: "Outdoor Rugs",
    description: "Durable luxury rugs made for indoor and outdoor living.",
    count: "43 Products",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    link: "#"
  }
];

export default function CollectionSlider({ data }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const title = data?.title || "Explore Our Collections";
  const subtitle = data?.content || "Crafted for every space, inspired by centuries of artistry.";
  const collectionsList = data?.data?.collections?.length ? data.data.collections : DEFAULT_COLLECTIONS;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards Animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="collections" 
      ref={sectionRef}
      className="relative bg-collection-bg py-[100px] overflow-hidden"
    >
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10">
        {/* Section Heading */}
        <div ref={headerRef} className="text-center mb-[60px]">
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-[24px]">
            {title}
          </h2>
          <p className="font-sans text-[18px] text-[#666] max-w-2xl mx-auto whitespace-pre-line">
            {subtitle}
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {collectionsList.map((collection, index) => (
            <Link
              href={collection.link || "#"}
              key={collection.id || index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group block rounded-[20px] p-[24px]  hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-[8px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full h-[280px] rounded-[16px] overflow-hidden mb-6">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  priority={true}
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* Card Content */}
              <div className="flex flex-col h-[calc(100%-280px-24px)]">
                <h3 className="font-serif text-[28px] font-semibold text-text-primary mb-3">
                  {collection.name}
                </h3>
                
                <p className="font-sans text-[16px] leading-[1.7] text-[#666] mb-6 flex-grow line-clamp-3">
                  {collection.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-sans text-[14px] uppercase tracking-[0.05em] text-primary-brand font-semibold">
                    {collection.count}
                  </span>
                  
                  <span className="text-primary-brand transition-transform duration-300 ease-out group-hover:translate-x-[6px]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-[60px] text-center">
          <Link
            href="/collections"
            className="inline-flex flex-col items-center gap-1 font-sans text-[16px] font-semibold text-text-primary group relative overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <span className="relative z-10">View All Collections</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-[4px]">
                →
              </span>
            </div>
            <span className="w-full h-[2px] bg-primary-brand transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
