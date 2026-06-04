import { Gift, Repeat, BadgePercent, ArrowUpRight } from "lucide-react";

const offers = [
  {
    icon: Gift,
    title: "Дизайн-проект в подарок",
    text: "Закажите ремонт «под ключ» и получите профессиональный дизайн-проект бесплатно.",
  },
  {
    icon: Repeat,
    title: "Бесплатная приёмка квартиры",
    text: "Заключите договор на ремонт после приёмки — мы компенсируем её стоимость.",
  },
  {
    icon: BadgePercent,
    title: "Скидка 30 000 ₽ на ремонт",
    text: "Закажите механизированную штукатурку стен и получите скидку 30 000 ₽ на ремонт «под ключ».",
  },
];

export function SpecialOffers() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="text-[#FF6A00] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Специальные предложения
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
              <span className="text-[#FF6A00]">Специальные</span> предложения
            </h2>
          </div>
          <p className="hidden md:block max-w-md text-white/65 text-sm leading-relaxed">
            Хороший ремонт не терпит спешки, а выгодные предложения — да. Акции регулярно обновляются и имеют ограниченный срок действия.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {offers.map((o) => (
            <button
              key={o.title}
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className="group text-left relative rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 md:p-8 hover:border-[#FF6A00]/40 transition-colors overflow-hidden"
            >
              {/* arrow pattern */}
              <div className="absolute -right-6 -top-6 opacity-[0.06] text-[#FF6A00]">
                <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
                  {[...Array(8)].map((_, i) => (
                    <path
                      key={i}
                      d={`M${20 + i * 22} 180 L${100 + i * 22} 20 L${180 + i * 22} 180`}
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  ))}
                </svg>
              </div>

              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-[#FF6A00]/15 border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00] mb-6">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">{o.text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-[#FF6A00] text-sm font-semibold">
                  Получить предложение
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
