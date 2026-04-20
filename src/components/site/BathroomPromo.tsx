import { Bath, Check, Users, Tag } from "lucide-react";

const includes = [
  "Демонтаж и вывоз мусора",
  "Замена сантехники и труб",
  "Электрика, тёплый пол",
  "Плитка премиум-сегмента",
  "Подвесной потолок",
  "Установка мебели и аксессуаров",
];

export function BathroomPromo() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-dark text-white" style={{ borderRadius: "10px" }}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,_var(--primary),_transparent_60%)]" />
          <div className="relative grid lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/40 text-primary text-xs uppercase tracking-[0.25em] font-semibold rounded-sm mb-5">
                <Bath className="h-3.5 w-3.5" /> Акция «Приведи друга»
              </div>
              <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
                Акция <span className="text-gradient-gold">«Приведи друга»</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-lg">
                Закажите ремонт квартиры под ключ и приведите друга — вы получите дополнительную
                скидку <span className="text-primary font-semibold">10%</span> на ремонт под ключ,
                а друг — скидку <span className="text-primary font-semibold">30%</span> на ремонт
                санузла от компании СКАЙСИТИ.
              </p>

              <div className="mt-8 flex items-baseline gap-4 flex-wrap">
                <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gradient-gold leading-none whitespace-nowrap">
                  {"от\u00A0155\u00A0400\u00A0₽"}
                </div>
                <div className="text-white/40 text-xl line-through whitespace-nowrap">{"от\u00A0222\u00A0000\u00A0₽"}</div>
              </div>
              <div className="mt-2 text-white/50 text-sm">{"Цена санузла для друга со\u00A0скидкой 30% · работа без\u00A0материалов"}</div>

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
                  Рассчитать
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Действует для друга
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" /> Фиксированная цена
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="font-display font-bold uppercase text-sm tracking-wider text-primary mb-5">
                Что входит
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
                * В акционную стоимость включена только работа. Материалы (плитка, сантехника,
                мебель) оплачиваются отдельно по закупочной цене. Скидка 10% на ремонт под ключ
                начисляется заказчику, скидка 30% на ремонт санузла — приведённому другу при
                заключении им договора.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
