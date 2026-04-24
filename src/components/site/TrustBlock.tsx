import { Award, Briefcase, ShieldCheck, Wallet } from "lucide-react";

const items = [
  { icon: Award, title: "7+ лет опыта", text: "В строительстве и отделке" },
  { icon: Briefcase, title: "2800+ проектов", text: "Сданы и заселены" },
  { icon: ShieldCheck, title: "2 года гарантии", text: "+ расширенная пожизненная" },
  { icon: Wallet, title: "Фиксированная цена", text: "Без скрытых доплат" },
];

export function TrustBlock() {
  return (
    <section className="bg-dark py-8 md:py-10">
      <div className="container-px mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="reveal flex items-center gap-2 sm:gap-3 min-w-0"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-sm border border-primary/40 flex items-center justify-center">
              <it.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold uppercase text-white text-[11px] sm:text-sm md:text-base leading-tight break-words">
                {it.title}
              </div>
              <div className="text-white/60 text-[10px] sm:text-xs mt-0.5 leading-tight break-words">{it.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
