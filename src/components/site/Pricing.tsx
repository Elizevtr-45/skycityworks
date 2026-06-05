import { useMemo, useState } from "react";
import { Check, Clock, ShieldCheck, Lock, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Slider } from "@/components/ui/slider";

type Tier = {
  id: string;
  name: string;
  pricePerM2: number;
  features: string[];
  trust: { icon: typeof Clock; label: string; value: string }[];
  highlight: string;
  featured: boolean;
};

const tiers: Tier[] = [
  {
    id: "basic",
    name: "Базовый",
    pricePerM2: 22000,
    features: [
      "Черновые работы",
      "Стандартная отделка",
      "Гарантия 2 года",
      "Сроки от 2 месяцев",
    ],
    trust: [
      { icon: Clock, label: "Срок", value: "от 2 мес." },
      { icon: Lock, label: "Цена", value: "Фиксирована" },
      { icon: ShieldCheck, label: "Гарантия", value: "2 года" },
    ],
    highlight: "Идеально под сдачу в аренду или быстрое заселение",
    featured: false,
  },
  {
    id: "standard",
    name: "Стандарт",
    pricePerM2: 25000,
    features: [
      "Дизайн-проект включён",
      "Премиальные материалы",
      "Авторский надзор",
      "Гарантия 3 года",
    ],
    trust: [
      { icon: Clock, label: "Срок", value: "от 3 мес." },
      { icon: Lock, label: "Цена", value: "Фиксирована в договоре" },
      { icon: ShieldCheck, label: "Гарантия", value: "3 года + пожизненная" },
    ],
    highlight: "Выбор 7 из 10 наших клиентов — баланс цены и качества",
    featured: true,
  },
  {
    id: "premium",
    name: "Премиум",
    pricePerM2: 30000,
    features: [
      "Индивидуальный дизайн",
      "Эксклюзивные материалы",
      "Персональный менеджер",
      "Гарантия 5 лет",
    ],
    trust: [
      { icon: Clock, label: "Срок", value: "по проекту" },
      { icon: Lock, label: "Цена", value: "Фиксирована, без доплат" },
      { icon: ShieldCheck, label: "Гарантия", value: "5 лет + пожизненная" },
    ],
    highlight: "Для тех, кто хочет уникальный интерьер «под себя»",
    featured: false,
  },
];

const presets = [30, 45, 60, 80, 100, 120];
const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export function Pricing() {
  const [area, setArea] = useState<number>(60);

  const selectTier = (tierId: string, tierName: string) => {
    window.dispatchEvent(
      new CustomEvent("open-lead-form", {
        detail: { tier: tierId, tierName, source: `pricing-${tierId}`, area },
      }),
    );
  };

  const totals = useMemo(
    () => tiers.map((t) => ({ id: t.id, total: t.pricePerM2 * area })),
    [area],
  );

  return (
    <section id="pricing" className="relative scroll-mt-24 md:scroll-mt-32 py-20 md:py-32 bg-aurora-orange overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_15%_15%,_oklch(0.72_0.2_50/0.12),_transparent_55%),radial-gradient(circle_at_85%_85%,_oklch(0.62_0.21_35/0.10),_transparent_55%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Тарифы"
          title="Наши тарифы"
          subtitle="Прозрачное ценообразование. Двигайте площадь — стоимость пересчитается мгновенно."
          center
        />

        {/* Area calculator */}
        <div className="reveal liquid-glass max-w-3xl mx-auto mb-10 sm:mb-12 -mt-2 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <div className="text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-1.5">
                Калькулятор площади
              </div>
              <div className="font-display font-bold uppercase text-base sm:text-lg text-foreground">
                Площадь квартиры
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 shrink-0">
              <span className="font-display font-black text-4xl sm:text-5xl text-gradient-gold leading-none">
                {area}
              </span>
              <span className="text-muted-foreground text-sm">м²</span>
            </div>
          </div>

          <Slider
            value={[area]}
            min={20}
            max={200}
            step={1}
            onValueChange={(v) => setArea(v[0] ?? 60)}
            aria-label="Площадь квартиры в квадратных метрах"
            className="mb-5"
          />

          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setArea(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                  area === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/5 text-foreground/80 border-white/10 hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {p} м²
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:pt-4 items-stretch">
          {tiers.map((t, i) => {
            const total = totals.find((x) => x.id === t.id)?.total ?? 0;
            return (
              <div
                key={t.id}
                className={`group reveal relative liquid-glass rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 ${
                  t.featured
                    ? "ring-accent md:-translate-y-4 hover:md:-translate-y-6 sm:col-span-2 md:col-span-1"
                    : "hover:shadow-[0_30px_80px_-25px_oklch(0.72_0.2_50/0.35)]"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 sm:px-4 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap shadow-[0_8px_24px_-8px_oklch(0.72_0.2_50/0.7)]">
                    <Sparkles className="h-3 w-3" /> Популярный
                  </div>
                )}

                <div className="relative font-display font-bold uppercase text-lg sm:text-xl mb-4 sm:mb-5 text-foreground">
                  {t.name}
                </div>

                <div className="relative mb-5 sm:mb-6">
                  <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-primary leading-none">
                      от {fmt(t.pricePerM2)}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">₽ / м²</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      за {area} м²
                    </span>
                    <span className="font-display font-bold text-xl text-foreground">
                      ≈ {fmt(total)} ₽
                    </span>
                  </div>
                </div>

                <div className="relative grid grid-cols-3 gap-1.5 sm:gap-2 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/10">
                  {t.trust.map((tr) => {
                    const Icon = tr.icon;
                    return (
                      <div
                        key={tr.label}
                        className="flex flex-col items-center text-center px-1 py-2 rounded-xl transition-colors duration-300 min-w-0 group-hover:bg-primary/10"
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1.5 shrink-0" />
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 text-muted-foreground">
                          {tr.label}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-semibold leading-tight break-words text-foreground">
                          {tr.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <ul className="relative space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 sm:gap-3 text-sm leading-snug text-foreground/90">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative text-xs sm:text-sm italic leading-relaxed border-l-2 border-primary pl-3 mb-6 text-muted-foreground">
                  {t.highlight}
                </div>

                <button
                  type="button"
                  onClick={() => selectTier(t.id, t.name)}
                  className={`relative mt-auto block w-full text-center px-3 sm:px-6 py-3 font-semibold uppercase tracking-wide sm:tracking-wider text-xs sm:text-sm rounded-xl transition-all hover:-translate-y-0.5 leading-tight ${
                    t.featured
                      ? "btn-cta hover:btn-cta-hover"
                      : "bg-white/10 text-foreground hover:bg-cta hover:text-cta-foreground"
                  }`}
                >
                  <span className="hidden sm:inline">Выбрать «{t.name}»</span>
                  <span className="sm:hidden">Выбрать тариф</span>
                </button>

              </div>
            );
          })}
        </div>

        {/* Free measurement CTA */}
        <div className="reveal liquid-glass max-w-3xl mx-auto mt-10 sm:mt-12 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-1.5">
              Бесплатно
            </div>
            <div className="font-display font-bold uppercase text-lg sm:text-xl md:text-2xl leading-tight text-foreground">
              Осмотр · Замер · Смета
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm mt-1.5">
              Без обязательств. Выезд по Приморскому краю.
            </div>
          </div>
          <button
            type="button"
            onClick={() => selectTier("free-measure", "Бесплатный замер")}
            className="btn-cta hover:btn-cta-hover px-5 sm:px-6 py-3 font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-xl text-center whitespace-nowrap"
          >
            Вызвать замерщика
          </button>
        </div>
      </div>
    </section>
  );
}
