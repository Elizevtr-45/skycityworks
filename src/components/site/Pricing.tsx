import { Check, Clock, ShieldCheck, Lock, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type Tier = {
  id: string;
  name: string;
  price: string;
  unit: string;
  features: string[];
  trust: { icon: typeof Clock; label: string; value: string }[];
  highlight: string;
  featured: boolean;
};

const tiers: Tier[] = [
  {
    id: "basic",
    name: "Базовый",
    price: "от 22 000",
    unit: "₽ / м²",
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
    price: "от 25 000",
    unit: "₽ / м²",
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
    price: "от 30 000",
    unit: "₽ / м²",
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

export function Pricing() {
  const selectTier = (tierId: string, tierName: string) => {
    window.dispatchEvent(
      new CustomEvent("open-lead-form", {
        detail: { tier: tierId, tierName, source: `pricing-${tierId}` },
      }),
    );
  };

  return (
    <section id="pricing" className="scroll-mt-24 md:scroll-mt-32 py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Тарифы"
          title="Наши тарифы"
          subtitle="Прозрачное ценообразование. Окончательная стоимость — после бесплатного замера."
          center
        />

        <div className="reveal max-w-3xl mx-auto mb-12 -mt-4 bg-dark text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ borderRadius: "10px" }}>
          <div>
            <div className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-2">Бесплатно</div>
            <div className="font-display font-bold uppercase text-xl md:text-2xl">
              Осмотр · Замер · Смета
            </div>
            <div className="text-white/60 text-sm mt-2">Без обязательств. Выезд по Приморскому краю.</div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-4xl md:text-5xl text-primary">0</span>
            <span className="text-white/60 text-sm">₽</span>
          </div>
          <button
            type="button"
            onClick={() => selectTier("free-measure", "Бесплатный замер")}
            className="px-6 py-3 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-colors text-center whitespace-nowrap"
          >
            Вызвать замерщика
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:pt-6 items-stretch">
          {tiers.map((t, i) => (
            <div
              key={t.id}
              className={`group reveal relative rounded-sm p-6 sm:p-7 md:p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 ${
                t.featured
                  ? "bg-dark text-white border border-primary shadow-[0_20px_60px_-20px_oklch(0.7_0.08_65/0.5)] md:-translate-y-4 hover:md:-translate-y-6 hover:shadow-[0_30px_80px_-20px_oklch(0.7_0.08_65/0.7)] sm:col-span-2 md:col-span-1"
                  : "bg-card border border-border hover:border-primary hover:shadow-[0_20px_60px_-20px_oklch(0.7_0.08_65/0.35)]"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 sm:px-4 py-1 rounded-sm flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="h-3 w-3" /> Популярный
                </div>
              )}

              <div className="font-display font-bold uppercase text-lg sm:text-xl mb-4 sm:mb-5">{t.name}</div>

              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-5 sm:mb-6">
                <span className="font-display font-bold text-3xl sm:text-4xl text-primary leading-none">{t.price}</span>
                <span className={`text-xs sm:text-sm ${t.featured ? "text-white/60" : "text-muted-foreground"}`}>{t.unit}</span>
              </div>

              {/* Trust triggers */}
              <div
                className={`grid grid-cols-3 gap-1.5 sm:gap-2 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b ${
                  t.featured ? "border-white/10" : "border-border"
                }`}
              >
                {t.trust.map((tr) => {
                  const Icon = tr.icon;
                  return (
                    <div
                      key={tr.label}
                      className={`flex flex-col items-center text-center px-1 py-2 rounded-sm transition-colors duration-300 min-w-0 ${
                        t.featured ? "group-hover:bg-primary/10" : "group-hover:bg-primary/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1.5 shrink-0" />
                      <div className={`text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 ${t.featured ? "text-white/50" : "text-muted-foreground"}`}>
                        {tr.label}
                      </div>
                      <div className={`text-[10px] sm:text-[11px] font-semibold leading-tight break-words hyphens-auto ${t.featured ? "text-white" : "text-foreground"}`}>
                        {tr.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 sm:gap-3 text-sm leading-snug">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Highlight — always visible (no layout shift on hover) */}
              <div
                className={`text-xs sm:text-sm italic leading-relaxed border-l-2 border-primary pl-3 mb-6 ${
                  t.featured ? "text-white/80" : "text-muted-foreground"
                }`}
              >
                {t.highlight}
              </div>

              <button
                type="button"
                onClick={() => selectTier(t.id, t.name)}
                className={`mt-auto block w-full text-center px-4 sm:px-6 py-3 font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-sm transition-all hover:-translate-y-0.5 break-words ${
                  t.featured
                    ? "bg-primary text-white hover:bg-accent hover:shadow-[0_10px_30px_-10px_oklch(0.7_0.08_65/0.6)]"
                    : "bg-dark text-white hover:bg-primary"
                }`}
              >
                Выбрать «{t.name}»
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
