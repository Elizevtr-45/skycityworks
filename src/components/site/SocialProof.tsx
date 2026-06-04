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
  { name: "Айвазовский", font: "font-display", weight: "font-semibold", tracking: "tracking-[0.1em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M3 17c3-3 6-3 9 0s6 3 9 0M3 13c3-3 6-3 9 0s6 3 9 0" stroke={stroke} strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>) },
  { name: "Восточный Луч", font: "font-display", weight: "font-bold", tracking: "tracking-[0.18em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth="1.4" fill="none"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/></svg>) },
  { name: "Маринист", font: "font-display", weight: "font-medium", tracking: "tracking-[0.2em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M12 3l9 16H3L12 3z" stroke={stroke} strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>) },
  { name: "Семь Ветров", font: "font-sans", weight: "font-semibold", tracking: "tracking-wide",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M3 8h12a3 3 0 100-6M3 14h16a3 3 0 110 6M3 11h8" stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>) },
  { name: "Da Vinci", font: "font-display", weight: "font-light", tracking: "tracking-[0.25em]", transform: "italic",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.3" fill="none"/><path d="M12 3v18M3 12h18" stroke={stroke} strokeWidth="0.8"/></svg>) },
  { name: "Аквамарин", font: "font-display", weight: "font-medium", tracking: "tracking-[0.22em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M12 3l8 7-8 11-8-11 8-7z" stroke={stroke} strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>) },
  { name: "Босфорский", font: "font-display", weight: "font-bold", tracking: "tracking-[0.15em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M3 18c0-5 4-9 9-9s9 4 9 9M3 18h18M8 18V9M16 18V9" stroke={stroke} strokeWidth="1.3" fill="none" strokeLinecap="round"/></svg>) },
  { name: "Чайка", font: "font-display", weight: "font-light", tracking: "tracking-[0.4em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M2 14c3-4 6-4 10 0 4-4 7-4 10 0" stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>) },
  { name: "Облака", font: "font-sans", weight: "font-normal", tracking: "tracking-[0.3em]", transform: "uppercase",
    mark: (<svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M6 16a4 4 0 010-8 5 5 0 019-2 4 4 0 013 8H6z" stroke={stroke} strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>) },
];

export function SocialProof() {
  const loop = [...logos, ...logos];

  return (
    <section className="pt-4 md:pt-6 pb-[30px] bg-background overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
      <div className="text-center mb-[30px]">
          <span className="text-foreground/60 uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold">
            ЖК, в которых мы работаем
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
