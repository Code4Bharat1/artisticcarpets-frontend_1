import Container from "@/components/common/Container";
import Link from "next/link";

export default function Journal({ data }) {
  const title = data?.title || "From Our Journal";
  const subtitle = data?.content || "Craft narratives, design advice, and weaver spotlights.";

  return (
    <section id="journal" className="bg-brand-white py-24 border-t border-border-custom/50">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-custom pb-6 mb-12">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary font-medium tracking-tight">
              {title}
            </h2>
            <p className="font-sans text-sm text-text-secondary font-semibold">
              {subtitle}
            </p>
          </div>
          <Link
            href="/journal"
            className="group inline-flex items-center text-xs font-semibold tracking-widest uppercase text-text-primary hover:text-primary-brand mt-4 md:mt-0 transition-colors duration-300"
          >
            Explore Journal
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Process Video */}
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            background: "#000",
            lineHeight: 0,
          }}
        >
          <video
            src="/Process Vedio/Artistic Carpets Video.mp4"
            controls
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              display: "block",
              maxHeight: "600px",
              objectFit: "cover",
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
    </section>
  );
}
