export default function Badge({ children, className = "", variant = "primary" }) {
  const variants = {
    primary: "bg-primary-brand text-brand-white",
    secondary: "bg-collection-bg text-text-primary border border-border-custom",
    outline: "bg-transparent text-text-secondary border border-border-custom",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] font-medium tracking-widest uppercase rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
