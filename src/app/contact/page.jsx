import Navbar from "@/components/layout/Navbar";
import FeaturesBar from "@/components/contact/FeaturesBar";
import ContactSection from "@/components/contact/ContactSection";
import StoreLocation from "@/components/contact/StoreLocation";
import Footer from "@/components/contact/Footer";

export const metadata = {
  title: "Contact Us | Artistic Carpets - Heritage Luxury Rugs",
  description:
    "We invite you to reach out for a private consultation or any inquiries regarding our heritage collections. Visit our flagship Mayfair atelier.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FCF9F8] flex flex-col font-sans">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Spacing for sticky navbar height */}
      <div className="pt-24 md:pt-28" />

      {/* Feature Bar directly below navbar */}
      {/* <FeaturesBar /> */}

      {/* Main Burgundy Contact Section */}
      <ContactSection />

      {/* Flagship Atelier & Map Section */}
      <StoreLocation />

      {/* Footer */}
      <Footer />
    </main>
  );
}
