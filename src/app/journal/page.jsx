"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { useState } from "react";

const PROCESS_IMAGES = [
  "IMG20251222145021.jpg",
  "IMG_0697.JPG",
  "IMG_0933.JPG",
  "IMG_0935.JPG",
  "IMG_0941.JPG",
  "IMG_0958.JPG",
  "IMG_0996.JPG",
  "IMG_0997.JPG",
  "IMG_1006.JPG",
  "IMG_1038.JPG",
  "IMG_1082.JPG",
  "IMG_1093.JPG",
  "IMG_1095.JPG",
  "IMG_1147.JPG",
  "IMG_20251219_174209.jpg",
  "IMG_20251219_174258.jpg",
  "IMG_20251219_174632.jpg",
  "WhatsApp Image 2025-11-27 at 12.30.44_19b0e2ba.jpg",
];

export default function JournalPage() {
  const [lightbox, setLightbox] = useState(null); // index of open image

  const prev = () => setLightbox((i) => (i - 1 + PROCESS_IMAGES.length) % PROCESS_IMAGES.length);
  const next = () => setLightbox((i) => (i + 1) % PROCESS_IMAGES.length);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col min-h-screen bg-brand-white">
        <section className="py-24">
          <Container>
            {/* Header */}
            <div className="flex flex-col border-b border-border-custom pb-6 mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-text-primary font-medium tracking-tight mb-4">
                Our Craft in Process
              </h1>
              <p className="font-sans text-lg text-text-secondary font-semibold max-w-2xl">
                A behind-the-scenes look at the artistry, dedication, and tradition woven into every carpet we create.
              </p>
            </div>

            {/* Masonry / Grid Gallery */}
            <div
              style={{
                columns: "3",
                columnGap: "16px",
                lineHeight: 0,
              }}
              className="journal-gallery"
            >
              {PROCESS_IMAGES.map((img, index) => (
                <div
                  key={img}
                  onClick={() => setLightbox(index)}
                  style={{
                    breakInside: "avoid",
                    marginBottom: "16px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "zoom-in",
                    position: "relative",
                    display: "block",
                    lineHeight: 0,
                  }}
                  className="journal-gallery-item"
                >
                  <img
                    src={`/Process Images/${img}`}
                    alt={`Carpet crafting process ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      transition: "transform 0.4s ease, filter 0.4s ease",
                    }}
                    className="journal-gallery-img"
                  />
                  {/* Hover overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0)",
                      transition: "background 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="journal-gallery-overlay"
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "28px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                      className="journal-gallery-zoom-icon"
                    >
                      ⊕
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            outline: "none",
          }}
          autoFocus
        >
          {/* Counter */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontFamily: "sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            {lightbox + 1} / {PROCESS_IMAGES.length}
          </div>

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close lightbox"
            style={{
              position: "absolute",
              top: "16px",
              right: "20px",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "32px",
              cursor: "pointer",
              lineHeight: 1,
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
          >
            ×
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: "16px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              color: "#fff",
              width: "48px",
              height: "48px",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={`/Process Images/${PROCESS_IMAGES[lightbox]}`}
            alt={`Process image ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
              display: "block",
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            style={{
              position: "absolute",
              right: "16px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              color: "#fff",
              width: "48px",
              height: "48px",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .journal-gallery { columns: 2 !important; }
        }
        @media (max-width: 480px) {
          .journal-gallery { columns: 1 !important; }
        }
        .journal-gallery-item:hover .journal-gallery-overlay {
          background: rgba(0,0,0,0.35) !important;
        }
        .journal-gallery-item:hover .journal-gallery-zoom-icon {
          opacity: 1 !important;
        }
        .journal-gallery-item:hover .journal-gallery-img {
          transform: scale(1.03);
          filter: brightness(0.95);
        }
      `}</style>
    </>
  );
}
