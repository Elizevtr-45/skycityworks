export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`reveal ${center ? "text-center mx-auto" : ""} max-w-3xl mb-12 md:mb-16`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}>
          <span className="gold-divider" />
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-display font-black uppercase text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
