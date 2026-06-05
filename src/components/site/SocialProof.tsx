import type { ReactNode } from "react";

type Logo = {
  name: string;
  mark: ReactNode;
  font: string;
  tracking?: string;
  weight?: string;
  transform?: string;
};

const stroke = "currentColor";

const logos: Logo[] = [
  { name: "ДНС Сити", font: "font-display", weight: "font-black", tracking: "tracking-tight", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M3 20V10l9-6 9 6v10h-6v-6h-6v6H3z" stroke={stroke} strokeWidth="1.5" fill="none"/></svg>) },
  { name: "Формат", font: "font-display", weight: "font-bold", tracking: "tracking-[0.2em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><rect x="4" y="4" width="16" height="16" stroke={stroke} strokeWidth="1.5" fill="none"/><path d="M4 12h16M12 4v16" stroke={stroke} strokeWidth="1"/></svg>) },
  { name: "MORE", font: "font-display", weight: "font-light", tracking: "tracking-[0.5em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>) },
  { name: "Молодёжный", font: "font-sans", weight: "font-medium", tracking: "tracking-wide",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M4 20l8-14 8 14H4z" stroke={stroke} strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>) },
  { name: "Посейдония", font: "font-display", weight: "font-semibold", tracking: "tracking-[0.15em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M12 3v18M7 8l5-5 5 5M9 14h6" stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>) },
  { name: "Андерсен", font: "font-display", weight: "font-bold", tracking: "tracking-wide",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M5 20V11l7-7 7 7v9M9 20v-5h6v5" stroke={stroke} strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>) },
  { name: "Весна", font: "font-display", weight: "font-light", tracking: "tracking-[0.3em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="1.4" fill="none"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke={stroke} strokeWidth="1.2" strokeLinecap="round"/></svg>) },
];

export function SocialProof() {
  const loop = [...logos, ...logos];

  return (
    <section className="pt-[30px] pb-[30px] bg-background overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
      <div className="text-center mb-[30px]">
          <span className="text-foreground/60 uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold">
            С нами уже работают
          </span>
        </div>
      </div>

      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {loop.map((l, i) => (
            <div
              key={`${l.name}-${i}`}
              className="flex items-center gap-3 h-12 px-4 md:px-5 text-foreground/70 shrink-0 select-none pointer-events-none"
            >
              <span className="shrink-0 flex items-center justify-center h-full">
                {l.mark}
              </span>
              <span className={`${l.font} ${l.weight ?? ""} ${l.tracking ?? ""} ${l.transform ?? ""} text-[30px] leading-none`}>
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
