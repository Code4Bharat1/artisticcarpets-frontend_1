import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Image from "next/image";

import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: [ "700"],
});

export default function Hero({ data }) {
  // Use CMS data or fallback to defaults
  const title = data?.title || "Handwoven Elegance\n<span class=\"italic font-semibold text-primary-brand\">for Every Home</span>";
  const subtitle = data?.content || "Discover a curated collection of artisanal rugs that tell a story of heritage, patience, and unparalleled craftsmanship.";
  const image = data?.data?.image || "/background.png";
  const ctaText = data?.data?.ctaText || "Shop Collections";
  const ctaLink = data?.data?.ctaLink || "#collections";

  // If title doesn't contain HTML (like our default fallback), we just render it. 
  // If it does, we use dangerouslySetInnerHTML.
  const hasHtml = title.includes("<") && title.includes(">");

  return (
    <section className="bg-hero-bg pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in">
            <div className="space-y-4">
              {hasHtml ? (
                <h1 
                  className={`${cormorant.className} text-4xl mb-4 md:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-[-0.05em] text-text-primary whitespace-pre-line`}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              ) : (
                <h1 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-[-0.05em] text-text-primary whitespace-pre-line`}>
                  {title}
                </h1>
              )}
              <p className="font-sans text-xl md:text-xl lg:text-2xl text-text-secondary font-light leading-[1.2] max-w-xl">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={ctaLink}>
                <Button variant="primary">{ctaText}</Button>
              </a>
              <a href="#journal">
                <Button variant="secondary">Our Story</Button>
              </a>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end animate-slide-up">
              <Image
                src="/Carpet1.png"
                width={1200}
                height={1200}
                alt="Luxurious handwoven carpet"
                className="absolute z-10 w-full h-full object-cover   bottom-8 md:bottom-7 left-0  md:left-5  scale-y-110"
                loading="eager"
                />
            <div className="relative group max-w-2xl w-full">
              {/* Decorative background shape */}
              <div className="absolute -inset-3 bg-primary-brand/5 rounded-3xl blur-lg group-hover:bg-primary-brand/10 transition-colors duration-300" />
              
              <div className="relative z-0 overflow-hidden rounded-3xl border border-border-custom bg-brand-white shadow-xl group-hover:shadow-2xl transition-all duration-500 ease-out transform group-hover:-translate-y-1">
             
                
                  <Image
                  width={1200}
                  height={800}
                  src={image}
                  alt="Luxurious handwoven carpet in modern neutral living room"
                  className="w-full relative z-6 aspect-[4/3] object-cover object-center transform scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="eager"
                />
              
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
