import { Users, ShieldCheck, BadgePercent } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const promos = [
  {
    icon: Users,
    badge: "Приведи друга",
    title: "10% с договора друга",
    text: "Рекомендуете нас другу — получаете 10% от стоимости его ремонта на свою карту.",
  },
  {
    icon: ShieldCheck,
    badge: "Участникам СВО",
    title: "Скидка 10%",
    text: "На любой пакет ремонта по предъявлении удостоверения. Фиксируется в договоре.",
  },
  {
    icon: BadgePercent,
    badge: "Постоянным клиентам",
    title: "Кэшбэк 10%",
    text: "Возвращаем 10% от стоимости работ на следующий заказ — без срока сгорания.",
  },
];

export function Promotions() {
  return (
    <section
      id="promotions"
      className="relative py-20 md:py-28 bg-grid-orange text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(circle_at_85%_15%,_oklch(0.72_0.2_50/0.18),_transparent_55%),radial-gradient(circle_at_10%_85%,_oklch(0.62_0.21_35/0.14),_transparent_55%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <SectionHeader
          light
          center
          eyebrow="Акции и бонусы"
          title="Действующие предложения"
          subtitle="Три способа сэкономить на ремонте под ключ — без скрытых условий."
        />

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {promos.map((p, i) => (
            <div
              key={p.title}
              className="reveal liquid-glass group rounded-2xl p-6 sm:p-7 hover:-translate-y-1 transition-transform duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/15 ring-1 ring-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:ring-primary transition-all duration-500">
                  <p.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <div className="min-w-0">
                  <div className="text-primary uppercase tracking-[0.18em] text-[10px] font-semibold">
                    {p.badge}
                  </div>
                  <div className="mt-1 font-display font-bold uppercase text-lg sm:text-xl text-gradient-gold leading-tight">
                    {p.title}
                  </div>
                  <p className="mt-3 text-white/70 text-sm leading-relaxed">{p.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="btn-cta hover:btn-cta-hover inline-flex items-center justify-center px-7 py-3.5 font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-xl hover:-translate-y-0.5"
          >
            Воспользоваться акцией
          </button>
          <a
            href="#calculator"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-white/30 text-white font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-sm hover:bg-white/10 transition-colors"
          >
            Рассчитать стоимость
          </a>
        </div>
      </div>
    </section>
  );
}
