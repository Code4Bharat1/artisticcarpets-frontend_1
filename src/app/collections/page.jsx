"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLLECTIONS = [
  {
    id: "persian-rugs",
    name: "Persian Rugs",
    shortName: "Persian",
    description: "Hand-knotted masterpieces inspired by centuries of heritage. Each thread tells a story of ancient traditions, meticulous patience, and unparalleled craftsmanship.",
    count: "124 Products",
    image: "https://images.pexels.com/photos/36203095/pexels-photo-36203095.jpeg",
    link: "/shop?collection=persian"
  },
  {
    id: "modern-rugs",
    name: "Modern Rugs",
    shortName: "Modern",
    description: "Contemporary designs crafted for elegant living spaces. Experience the perfect balance of minimalist aesthetics and supreme underfoot comfort.",
    count: "86 Products",
    image: "https://bhadohirug.in/cdn/shop/files/kolzy-hand-tufted-wool-rug-in-living-room.webp?v=1754199771&width=713",
    link: "/shop?collection=modern"
  },
  {
    id: "vintage-rugs",
    name: "Vintage Rugs",
    shortName: "Vintage",
    description: "Beautifully aged pieces with timeless character. Our vintage collection brings soul and history into your modern home, with distressed textures and faded grandeur.",
    count: "58 Products",
    image: "https://theambiente.com/wp-content/uploads/2021/09/v-38-1.jpg",
    link: "/shop?collection=vintage"
  },
  {
    id: "outdoor-rugs",
    name: "Outdoor Rugs",
    shortName: "Outdoor",
    description: "Durable luxury rugs made for indoor and outdoor living. Weather-resistant materials meet sophisticated design for your patio, deck, or high-traffic areas.",
    count: "43 Products",
    image: "https://i5.walmartimages.com/seo/DEORAB-Outdoor-Rug-8-X10-Chenille-Patio-Rug-Three-Layer-Material-Imitation-Silicone-Spot-Molding-Camping-Outside-Rv-Mat-Beige-Green_fe2bf2fb-0afc-40a9-9862-db640f4d9c65.7d0d54105f5bfaa65f012bd910cd6e27.jpeg",
    link: "/shop?collection=outdoor"
  }
];

export default function CollectionsPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const collectionRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      if (titleRef.current) {
        gsap.from(titleRef.current.children, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      // Collections Reveal and Parallax
      collectionRefs.current.forEach((el, index) => {
        if (!el) return;
        const image = el.querySelector(".parallax-image");
        const textContent = el.querySelector(".text-content");

        // Container fade in
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );

        // Image Parallax
        if (image) {
          gsap.fromTo(image,
            { scale: 1.15, y: "-10%" },
            {
              scale: 1,
              y: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }

        // Text subtle up-slide
        if (textContent) {
          gsap.fromTo(textContent.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 75%",
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FAF7F4] min-h-screen font-sans flex flex-col text-[#1E1E1E]"
      ref={containerRef}
    >
      <Navbar />
      
      <main className="flex-1 w-full overflow-hidden">
        {/* Texture Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        

        {/* Collections List */}
        <section className="pb-[120px] md:pb-[200px]">
          {COLLECTIONS.map((collection, index) => {
            const isEven = index % 2 === 0;
            const number = String(index + 1).padStart(2, '0');
            
            return (
              <div 
                key={collection.id}
                ref={(el) => (collectionRefs.current[index] = el)}
                className={`relative w-full border-t border-[#E8DCD3] ${index === COLLECTIONS.length - 1 ? 'border-b' : ''}`}
              >
                <div className="max-w-7xl  mx-auto px-6 lg:px-8 py-[80px] md:py-[140px] flex flex-col md:flex-row items-center gap-[40px] md:gap-[80px] lg:gap-[120px]">
                  
                  {/* Desktop Number (Absolute) */}
                  <div className="hidden  lg:block absolute left-12 top-[100px] font-serif text-[180px] xl:text-[240px] leading-none text-[#E8DCD3] opacity-30 -z-10 select-none collection-number transition-transform duration-1000">
                    {number}
                  </div>

                  {/* Image Block */}
                  <div className={`w-full md:w-1/2  lg:w-7/12 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <Link href={collection.link} className="block group relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[#E8DCD3]">
                      <div className="absolute  inset-0 z-10 bg-[#1E1E1E]/5 group-hover:bg-transparent transition-colors duration-700 ease-in-out" />
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className=" parallax-image object-cover scale-110"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority={index === 0}
                      />
                      
                      {/* Hover Explore Button */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                        <div className="bg-white/95 backdrop-blur-sm text-[#1E1E1E] px-8 py-4 rounded-full font-sans text-sm uppercase tracking-widest translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out shadow-xl">
                          View Collection
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Text Block */}
                  <div className={`w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center text-content ${isEven ? 'md:order-2 md:pl-0 lg:pl-[40px]' : 'md:order-1 md:pr-0 lg:pr-[40px]'}`}>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-serif text-[24px] text-[#7B1E1E] italic">{number}.</span>
                      <div className="h-[1px] w-[60px] bg-[#7B1E1E]" />
                      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#888]">
                        {collection.count}
                      </span>
                    </div>
                    
                    <h2 className="font-serif text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-tight mb-8">
                      {collection.name.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? "italic text-[#888]" : ""}>
                          {word}{" "}
                        </span>
                      ))}
                    </h2>
                    
                    <p className="font-sans text-[16px] md:text-[18px] leading-[1.8] text-[#555] mb-12 max-w-[480px]">
                      {collection.description}
                    </p>
                    
                    <div>
                      <Link 
                        href={collection.link}
                        className="group inline-flex items-center gap-4 pb-4 border-b border-[#1E1E1E]/30 hover:border-[#7B1E1E] transition-colors duration-300"
                      >
                        <span className="font-sans text-[13px] uppercase tracking-[0.2em] font-medium text-[#1E1E1E] group-hover:text-[#7B1E1E] transition-colors duration-300">
                          Explore {collection.shortName}
                        </span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#1E1E1E] group-hover:stroke-[#7B1E1E] transition-colors duration-300">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
