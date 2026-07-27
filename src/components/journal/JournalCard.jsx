import Link from "next/link";

export default function JournalCard({ article }) {
  return (
    <article className="group flex flex-col space-y-4">
      {/* Article Image Container */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border-custom bg-collection-bg shadow-sm transition-all duration-300">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      {/* Article Metadata */}
      <div className="space-y-2">
        <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-primary-brand uppercase">
          {article.category}
        </span>
        
        {/* Title */}
        <h3 className="font-serif text-lg md:text-xl text-text-primary font-medium group-hover:text-primary-brand transition-colors duration-300 leading-snug">
          {article.title}
        </h3>

        {/* Snippet */}
        <p className="font-sans text-xs md:text-sm text-text-secondary font-light leading-relaxed">
          {article.snippet}
        </p>

        {/* Read More Link */}
        <div className="pt-2">
          <Link
            href="#"
            className="inline-flex items-center text-[10px] font-bold tracking-widest uppercase text-text-primary group-hover:text-primary-brand border-b border-text-primary/10 group-hover:border-primary-brand pb-1 transition-all duration-300"
          >
            Read More
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
