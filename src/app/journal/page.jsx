import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import JournalCard from "@/components/journal/JournalCard";
import { JOURNAL_ARTICLES as DEFAULT_ARTICLES } from "@/constants/data";

export default async function JournalPage() {
  let cmsData = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${baseUrl}/cms/homepage`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      cmsData = json.page;
    }
  } catch (error) {
    console.error("Failed to fetch CMS data for journal page:", error);
  }

  const getSection = (key) => cmsData?.sections?.find(s => s.sectionKey === key) || null;
  const journalData = getSection("journal");
  
  const title = journalData?.title || "From Our Journal";
  const subtitle = journalData?.content || "Craft narratives, design advice, and weaver spotlights.";
  const articlesList = journalData?.data?.articles?.length ? journalData.data.articles : DEFAULT_ARTICLES;

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col min-h-screen bg-brand-white">
        <section className="py-24">
          <Container>
            {/* Header */}
            <div className="flex flex-col border-b border-border-custom pb-6 mb-12">
              <h1 className="font-serif text-4xl md:text-5xl text-text-primary font-medium tracking-tight mb-4">
                {title}
              </h1>
              <p className="font-sans text-lg text-text-secondary font-semibold max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* All Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlesList.map((article, index) => (
                <JournalCard key={article.id || index} article={article} />
              ))}
            </div>
            
            {articlesList.length === 0 && (
              <div className="text-center py-20 text-text-muted">
                No journal articles available at this time.
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
