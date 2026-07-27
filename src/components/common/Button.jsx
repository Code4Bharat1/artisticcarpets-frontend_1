export default function Button({
  children,
  onClick,
  type = "button",
  variant = "tan",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-semibold text-xs tracking-widest uppercase rounded-full px-8 py-3.5 transition-all duration-300 ease-in-out cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0";

  const variants = {
    tan:
      "bg-[#C4A892] text-white hover:bg-[#980E0A] hover:shadow-lg focus:ring-[#980E0A]",
    primary:
      "bg-[#980E0A] text-white hover:bg-neutral-900 hover:shadow-lg focus:ring-[#980E0A]",
    secondary:
      "bg-transparent text-text-primary border border-border-custom hover:bg-text-primary hover:text-white hover:border-text-primary focus:ring-text-primary",
    white:
      "bg-white text-text-primary hover:bg-[#980E0A] hover:text-white hover:shadow-lg focus:ring-white",
    outlineWhite:
      "bg-transparent text-white border border-white/30 hover:bg-white hover:text-text-primary hover:border-white focus:ring-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.tan} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
