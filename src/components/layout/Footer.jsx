"use client";
import { useEffect, useState } from "react";
import { Instagram, Mail, Globe } from "lucide-react";
import Link from "next/link";
import Container from "@/components/common/Container";
import axiosInstance from "@/services/axiosInstance";

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState({ instagram: "#", facebook: "#", email: "#" });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await axiosInstance.get("/cms/homepage");
        if (res.data) {
          const json = res.data;
          const footSec = json.page?.sections?.find(s => s.sectionKey === "footer");
          if (footSec && footSec.data) {
            setFooterLinks({
              instagram: footSec.data.instagram || "#",
              facebook: footSec.data.facebook || "#",
              email: footSec.data.email ? `mailto:${footSec.data.email}` : "#"
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch footer CMS data:", error);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer id="footer" className="bg-brand-white border-t border-border-custom pt-24 pb-12 text-text-primary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold tracking-tight text-primary-brand">
              Artistic Carpets
            </h3>
            <p className="font-sans text-sm text-text-secondary font-light leading-relaxed max-w-sm">
              Crafting narrative spaces through the art of the handwoven rug. Every piece is an heirloom in waiting.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: Instagram, href: footerLinks.instagram, label: "Instagram" },
                { icon: Globe, href: footerLinks.facebook, label: "Facebook" },
                { icon: Mail, href: footerLinks.email, label: "Email" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full border border-border-custom flex items-center justify-center text-text-secondary hover:text-primary-brand hover:border-primary-brand transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 stroke-[1.5]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-primary-brand">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Shipping & Returns", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-primary-brand">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Sustainable Wool", href: "#" },
                { name: "Artisan Stories", href: "#" },
                { name: "Wholesale", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Showroom Column */}
          <div className="space-y-6">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-primary-brand">
              Visit Our Showroom
            </h4>
            <div className="space-y-4 font-sans text-xs text-text-secondary leading-relaxed font-light">
              <p>
                1240 Weaver's Lane
                <br />
                Art District, NY 10012
              </p>
              <p>
                Monday - Saturday
                <br />
                10:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border-custom/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] uppercase tracking-widest text-text-secondary font-light">
            © 2026 Artistic Carpets. Crafted with Artistry.
          </p>
          <div className="flex items-center space-x-4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
            {/* Simple representation of payment icons */}
            <span className="text-[10px] font-sans font-bold tracking-widest text-text-primary border border-border-custom px-2 py-0.5 rounded uppercase">
              Visa
            </span>
            <span className="text-[10px] font-sans font-bold tracking-widest text-text-primary border border-border-custom px-2 py-0.5 rounded uppercase">
              MC
            </span>
            <span className="text-[10px] font-sans font-bold tracking-widest text-text-primary border border-border-custom px-2 py-0.5 rounded uppercase">
              Amex
            </span>
            <span className="text-[10px] font-sans font-bold tracking-widest text-text-primary border border-border-custom px-2 py-0.5 rounded uppercase">
              Pay
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
