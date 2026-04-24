import { Bath, Check, Users, Tag } from "lucide-react";
const includes = [
  "Гидроизоляция стен с оклейкой углов",
  "Монтаж душевого поддона в уровень с полом",
  "Сантехника с инсталляцией",
  "Коллекторная разводка",
  "Монтаж керамогранита",
  "Эпоксидная затирка",
  "Формирование наружных углов 45°",
  "Сантехнические установки и подключение",
];

export function BathroomPromo() {
  return (
    <section className="py-14 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-dark text-white" style={{ borderRadius: "10px" }}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,_var(--primary),_transparent_60%)]" />
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-10 p-5 sm:p-8 md:p-12 lg:p-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/40 text-primary text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold rounded-sm mb-4 sm:mb-5">
                <Bath className="h-3.5 w-3.5" /> Акция «Приведи друга»
              </div>
              <h2 className="font-display font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                Приведи друга — <span className="text-gradient-gold">получи 10%</span>
              </h2>
              <p className="mt-4 sm:mt-5 text-white/70 text-base sm:text-lg leading-relaxed max-w-lg">
                Приведите друга на ремонт санузла — вы получаете{" "}
                <span className="text-primary font-semibold">10%</span> с его договора.
              </p>

              <div className="mt-6 sm:mt-8 flex items-baseline gap-3 sm:gap-4 flex-wrap">
                <div className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-gradient-gold leading-none whitespace-nowrap">
                  {"от\u00A0300\u00A0000\u00A0₽"}
                </div>
                <div className="text-white/40 text-base sm:text-xl line-through whitespace-nowrap">
                  {"от\u00A0345\u00A0000\u00A0₽"}
                </div>
              </div>
              <div className="mt-2 text-white/50 text-xs sm:text-sm">
                {"Цена санузла под\u00A0ключ для друга со\u00A0скидкой 10%"}
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
                  className="inline-flex items-center justify-center px-5 sm:px-8 py-3.5 sm:py-4 bg-primary text-white font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5 text-center"
                >
                  Получить акционную цену
                </button>
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center px-5 sm:px-8 py-3.5 sm:py-4 border border-white/30 text-white font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-sm hover:bg-white/10 transition-colors text-center"
                >
                  Рассчитать
                </a>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs sm:text-sm text-white/70">
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
                Что входит в санузел под ключ
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
              <div className="mt-5 text-white/50 text-xs leading-relaxed">
                * Скидка 10% — другу на ремонт санузла под ключ при подписании договора.
                Стоимость указана за работу; материалы рассчитываются отдельно.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
