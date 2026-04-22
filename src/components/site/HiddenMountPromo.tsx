import { useEffect, useState } from "react";
import { Layers, Check, Tag, ShieldCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import img1 from "@/assets/hidden-mount-1.jpg";
import img2 from "@/assets/hidden-mount-2.jpg";
import img3 from "@/assets/hidden-mount-3.jpg";
import img4 from "@/assets/hidden-mount-4.jpg";
import img5 from "@/assets/hidden-mount-5.jpg";

const photos = [
  { src: img1, alt: "Скрытый монтаж — мраморный керамогранит и душевая зона" },
  { src: img2, alt: "Ванная со скрытым монтажом и керамогранитом под мрамор" },
  { src: img3, alt: "Скрытый монтаж смесителя и душа на керамограните" },
  { src: img4, alt: "Санузел со скрытой инсталляцией и крупноформатным керамогранитом" },
  { src: img5, alt: "Минималистичный санузел со скрытым монтажом" },
];

const features = [
  "Инсталляции и смесители без видимых коробов",
  "Бесшовная укладка крупноформатного керамогранита",
  "Скрытые лючки, трапы и ревизии заподлицо",
  "Ровные швы 1,5 мм и идеальная геометрия",
];

export function HiddenMountPromo() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 3500);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-dark text-white" style={{ borderRadius: "10px" }}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,_var(--primary),_transparent_60%)]" />
          <div className="relative grid lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/40 text-primary text-xs uppercase tracking-[0.25em] font-semibold rounded-sm mb-5">
                <Layers className="h-3.5 w-3.5" /> Акция месяца
              </div>
              <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
                Скрытый монтаж из <span className="text-gradient-gold">керамогранита</span>
              </h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-lg">
                Премиальный санузел без лишних деталей: инсталляции, смесители и коммуникации
                спрятаны в стене, а крупноформатный керамогранит уложен бесшовно. Закажите
                до конца месяца и получите скидку{" "}
                <span className="text-primary font-semibold">10%</span> на работы.
              </p>

              <div className="mt-8 flex items-baseline gap-4 flex-wrap">
                <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gradient-gold leading-none whitespace-nowrap">
                  −10%
                </div>
                <div className="text-white/60 text-base sm:text-lg whitespace-nowrap">
                  на работы по скрытому монтажу
                </div>
              </div>
              <div className="mt-2 text-white/50 text-sm">
                {"Расчёт стоимости — после бесплатного замера"}
              </div>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-sm"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
                >
                  Получить скидку 10%
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
                  <Tag className="h-4 w-4 text-primary" /> Фиксированная цена
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Гарантия на работы
                </div>
              </div>
            </div>

            <div className="reveal">
              <Carousel
                opts={{ loop: true, align: "start" }}
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent>
                  {photos.map((p) => (
                    <CarouselItem key={p.src}>
                      <div
                        className="relative overflow-hidden border border-white/10"
                        style={{ borderRadius: "10px" }}
                      >
                        <img
                          src={p.src}
                          alt={p.alt}
                          loading="lazy"
                          className="w-full h-[420px] md:h-[520px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="mt-4 text-white/50 text-xs leading-relaxed">
                * Реальные работы наших мастеров. Скидка 10% действует на работы
                по скрытому монтажу при заключении договора в текущем месяце.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
