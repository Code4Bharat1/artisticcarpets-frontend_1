export default function SectionTitle({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
}) {
  const alignment = align === "left" ? "text-left" : "text-center";
  const descAlign = align === "left" ? "mr-auto" : "mx-auto";

  return (
    <div className={`space-y-3 mb-12 ${alignment} ${className}`}>
      {subtitle && (
        <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary-brand uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary font-medium tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className={`text-sm md:text-base text-text-secondary max-w-xl font-light leading-relaxed ${descAlign}`}>
          {description}
        </p>
      )}
    </div>
  );
}
