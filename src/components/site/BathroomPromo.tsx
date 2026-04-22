import { Bath, Check, Users, Tag, Ruler, Home, Wallet } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import bp1 from "@/assets/bathroom-premium-1.jpg";
import bp2 from "@/assets/bathroom-premium-2.jpg";
import bp3 from "@/assets/bathroom-premium-3.jpg";
import bp4 from "@/assets/bathroom-premium-4.jpg";
import bp5 from "@/assets/bathroom-premium-5.jpg";

const premiumGallery = [
  { src: bp1, alt: "Премиальный санузел под ключ во Владивостоке — каркасный дом, 4,5 м², СКАЙСИТИ" },
  { src: bp2, alt: "Дизайнерский санузел с отдельностоящей ванной — каркасный дом, проект СКАЙСИТИ" },
  { src: bp3, alt: "Санузел премиум — комбинация керамогранита под дерево и бетон, СКАЙСИТИ Владивосток" },
  { src: bp4, alt: "Премиальный санузел 4,5 м² — скрытая подсветка и чёрная сантехника, СКАЙСИТИ" },
  { src: bp5, alt: "Декор санузла премиум — раскладка ёлочкой, полотенцесушитель, СКАЙСИТИ" },
];

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
                Приведи друга — <span className="text-gradient-gold">получи 10%</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-lg">
                Приведите друга на ремонт санузла — вы получаете{" "}
                <span className="text-primary font-semibold">10%</span> с его договора.
              </p>

              <div className="mt-8 flex items-baseline gap-4 flex-wrap">
                <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gradient-gold leading-none whitespace-nowrap">
                  {"от\u00A0300\u00A0000\u00A0₽"}
                </div>
                <div className="text-white/40 text-xl line-through whitespace-nowrap">
                  {"от\u00A0345\u00A0000\u00A0₽"}
                </div>
              </div>
              <div className="mt-2 text-white/50 text-sm">
                {"Цена санузла под\u00A0ключ для друга со\u00A0скидкой 10%"}
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
                  Рассчитать
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

        <div className="reveal mt-10 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center bg-card border border-border rounded-[10px] p-6 md:p-10">
          <div className="relative">
            <Carousel opts={{ align: "start", loop: true }} className="relative">
              <CarouselContent>
                {premiumGallery.map((p, i) => (
                  <CarouselItem key={i}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                      <img
                        src={p.src}
                        alt={p.alt}
                        title={p.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4" />
              <CarouselNext className="hidden md:flex -right-4" />
            </Carousel>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.25em] font-semibold rounded-sm mb-4">
              Реализованный проект
            </div>
            <h3 className="font-display font-bold uppercase text-2xl md:text-3xl lg:text-4xl leading-tight">
              Премиальный санузел <span className="text-gradient-gold">«под ключ»</span>
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Дизайнерское решение с керамогранитом под дерево и бетон, скрытой подсветкой,
              чёрной сантехникой и отдельностоящей ванной с декоративными рёбрами.
            </p>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 p-4 bg-background border border-border rounded-sm">
                <Ruler className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Площадь</div>
                  <div className="font-display font-bold mt-0.5">4,5 м²</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background border border-border rounded-sm">
                <Home className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Объект</div>
                  <div className="font-display font-bold mt-0.5">Каркасный дом</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background border border-border rounded-sm">
                <Wallet className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Стоимость</div>
                  <div className="font-display font-bold mt-0.5 whitespace-nowrap">390 000 ₽</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className="mt-6 inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
            >
              Хочу такой же санузел
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
