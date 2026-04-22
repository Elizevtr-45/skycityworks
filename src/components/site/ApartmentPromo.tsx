import { Home, Check, Users, Tag } from "lucide-react";

const includes = [
  "Штукатурка стен по маякам",
  "Возведение перегородок",
  "Санузел под ключ",
  "Электрика по проекту",
  "Сантехника и разводка труб",
  "Стяжка пола",
  "Шпаклёвка под покраску / обои",
  "Укладка плитки и напольных покрытий",
];

const notIncluded = [
  "Демонтаж (для новостроя не требуется)",
  "Натяжные / подвесные потолки",
];

export function ApartmentPromo() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-dark text-white" style={{ borderRadius: "10px" }}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,_var(--primary),_transparent_60%)]" />
          <div className="relative grid lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/40 text-primary text-xs uppercase tracking-[0.25em] font-semibold rounded-sm mb-5">
                <Home className="h-3.5 w-3.5" /> Акция «Приведи друга»
              </div>
              <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
                Ремонт квартиры — <span className="text-gradient-gold">скидка 10%</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-lg">
                Приведите друга на ремонт квартиры под ключ — он получает{" "}
                <span className="text-primary font-semibold">10%</span> с договора.
                Расчёт по базовому тарифу для квартиры ≈&nbsp;50&nbsp;м².
              </p>

              <div className="mt-8 flex items-baseline gap-4 flex-wrap">
                <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gradient-gold leading-none whitespace-nowrap">
                  {"от\u00A0990\u00A0000\u00A0₽"}
                </div>
                <div className="text-white/40 text-xl line-through whitespace-nowrap">
                  {"от\u00A01\u00A0100\u00A0000\u00A0₽"}
                </div>
              </div>
              <div className="mt-2 text-white/50 text-sm">
                {"Цена ремонта квартиры под\u00A0ключ для друга со\u00A0скидкой 10% (≈\u00A050\u00A0м²)"}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
                >
                  Получить акционную цену
                </button>
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-white/10 transition-colors"
                >
                  Рассчитать свою площадь
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Скидка 10%
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" /> Цена закреплена в договоре
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="font-display font-bold uppercase text-sm tracking-wider text-primary mb-5">
                Что входит в ремонт под ключ
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-sm"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <div className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-2">
                  Не входит (для новостроя)
                </div>
                <ul className="flex flex-wrap gap-2">
                  {notIncluded.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm"
                    >
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 text-white/50 text-xs leading-relaxed">
                * Скидка 10% — другу на ремонт квартиры под ключ при подписании договора.
                Расчёт от базового тарифа 22&nbsp;000&nbsp;₽/м² × 50&nbsp;м². Финальная стоимость
                фиксируется после бесплатного замера. Материалы рассчитываются отдельно.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
