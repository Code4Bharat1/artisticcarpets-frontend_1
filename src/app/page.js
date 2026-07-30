import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import CollectionSlider from "@/components/collections/CollectionSlider";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import Newsletter from "@/components/newsletter/Newsletter";
import Journal from "@/components/journal/Journal";
import Footer from "@/components/layout/Footer";

export default async function Home() {
  let cmsData = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${baseUrl}/cms/homepage`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      cmsData = json.page;
    }
  } catch (error) {
    console.error("Failed to fetch CMS data for homepage:", error);
  }

  const getSection = (key) => cmsData?.sections?.find(s => s.sectionKey === key) || null;
  
  const heroData = getSection("locked-hero");
  const collectionsData = getSection("explore-collections");
  const newsData = getSection("locked-news");
  const journalData = getSection("journal");
  const highlightsData = getSection("curated-highlights");

  return (
    <>
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Layout Content */}
      <main className="flex-1 flex flex-col">
        {/* Editorial Hero Banner */}
        <Hero />

        {/* Circular Collections Grid */}
        <CollectionSlider data={collectionsData} />

        {/* Featured Products Showcase (TanStack Query integration) */}
        <FeaturedProducts data={highlightsData} />

        {/* Dark Red Editorial Newsletter Signup (React Hook Form & Yup) */}
        <Newsletter />

        {/* From Our Journal Section */}
        <Journal data={journalData} />
      </main>

      <Footer />
    </>
  );
}
