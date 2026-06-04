import { Award, Briefcase, ShieldCheck, Wallet } from "lucide-react";

const items = [
  { icon: Award, title: "7+ лет опыта", text: "В строительстве и отделке" },
  { icon: Briefcase, title: "2800+ проектов", text: "Сданы и заселены" },
  { icon: ShieldCheck, title: "2 года гарантии", text: "+ расширенная пожизненная" },
  { icon: Wallet, title: "Фиксированная цена", text: "Без скрытых доплат" },
];

export function TrustBlock() {
  return (
    <section className="relative bg-dark py-10 md:py-14 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_oklch(0.72_0.2_50/0.08),_transparent_70%)]" />
      <div className="relative container-px mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="reveal liquid-glass group flex items-center gap-3 sm:gap-4 min-w-0 p-3 sm:p-5 rounded-2xl hover:-translate-y-1 transition-transform duration-500"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-primary/15 ring-1 ring-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:ring-primary transition-all duration-500">
              <it.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold uppercase text-white text-[11px] sm:text-sm md:text-base leading-tight break-words">
                {it.title}
              </div>
              <div className="text-white/60 text-[10px] sm:text-xs mt-1 leading-tight break-words">{it.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
