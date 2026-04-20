import { Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const tiers = [
  {
    name: "Базовый",
    price: "от 12 900",
    unit: "₽ / м²",
    features: [
      "Черновые работы",
      "Стандартная отделка",
      "Гарантия 2 года",
      "Сроки от 2 месяцев",
    ],
    featured: false,
  },
  {
    name: "Стандарт",
    price: "от 18 900",
    unit: "₽ / м²",
    features: [
      "Дизайн-проект включён",
      "Премиальные материалы",
      "Авторский надзор",
      "Гарантия 3 года",
    ],
    featured: true,
  },
  {
    name: "Премиум",
    price: "от 28 900",
    unit: "₽ / м²",
    features: [
      "Индивидуальный дизайн",
      "Эксклюзивные материалы",
      "Персональный менеджер",
      "Гарантия 5 лет",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
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
          <a
            href="#contact"
            className="px-6 py-3 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-colors text-center whitespace-nowrap"
          >
            Вызвать замерщика
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`reveal relative rounded-sm p-8 md:p-10 hover-lift transition-all ${
                t.featured
                  ? "bg-dark text-white border border-primary shadow-[0_20px_60px_-20px_oklch(0.7_0.08_65/0.5)] md:-translate-y-4"
                  : "bg-card border border-border"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-sm">
                  Популярный
                </div>
              )}
              <div className="font-display font-bold uppercase text-xl mb-6">{t.name}</div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-display font-bold text-4xl text-primary">{t.price}</span>
                <span className={`text-sm ${t.featured ? "text-white/60" : "text-muted-foreground"}`}>{t.unit}</span>
              </div>
              <ul className="space-y-3 mb-10">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center px-6 py-3 font-semibold uppercase tracking-wider text-sm rounded-sm transition-colors ${
                  t.featured
                    ? "bg-primary text-white hover:bg-accent"
                    : "bg-dark text-white hover:bg-primary"
                }`}
              >
                Выбрать
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
