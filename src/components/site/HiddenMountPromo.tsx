import { useEffect, useState } from "react";
import { Layers, Wind, CircleDot, Droplets, Scroll } from "lucide-react";
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
import img6 from "@/assets/hidden-mount-6.jpg";
import img7 from "@/assets/hidden-mount-7.jpg";
import img8 from "@/assets/hidden-mount-8.jpg";
import img9 from "@/assets/hidden-mount-9.jpg";
import img10 from "@/assets/hidden-mount-10.jpg";
import img11 from "@/assets/hidden-mount-11.jpg";

const photos = [
  { src: img1, alt: "Скрытый монтаж — мраморный керамогранит и душевая зона" },
  { src: img2, alt: "Ванная со скрытым монтажом и керамогранитом под мрамор" },
  { src: img3, alt: "Скрытый монтаж смесителя и душа на керамограните" },
  { src: img4, alt: "Санузел со скрытой инсталляцией и крупноформатным керамогранитом" },
  { src: img5, alt: "Минималистичный санузел со скрытым монтажом" },
  { src: img6, alt: "Кухонный фартук из крупноформатного керамогранита под мрамор" },
  { src: img7, alt: "Ванная зона с керамогранитом под мрамор и отдельностоящей ванной" },
  { src: img8, alt: "Изделие из керамогранита — скрытый монтаж" },
  { src: img9, alt: "Изделие из керамогранита — скрытый монтаж" },
  { src: img10, alt: "Изделие из керамогранита — скрытый монтаж" },
  { src: img11, alt: "Изделие из керамогранита — скрытый монтаж" },
];

const items = [
  { icon: Wind, title: "Скрытая вытяжка", desc: "Вентиляция заподлицо со стеной без видимых решёток" },
  { icon: CircleDot, title: "Кнопка инсталляции", desc: "Из керамогранита в один уровень с плиткой" },
  { icon: Droplets, title: "Ниша под гигиенический душ", desc: "Аккуратное место для венчика без коробов" },
  { icon: Scroll, title: "Держатель туалетной бумаги", desc: "Встроенная ниша из керамогранита" },
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
                <Layers className="h-3.5 w-3.5" /> Наша специализация
              </div>
              <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
                Изделия из <span className="text-gradient-gold">керамогранита</span> и скрытый монтаж
              </h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed max-w-lg">
                Профессионально изготавливаем и монтируем элементы санузла из керамогранита:
                всё лишнее спрятано в стене, на виду — только идеальная плоскость и чистая
                геометрия. Работаем с крупноформатными плитами и сложными раскладками.
              </p>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {items.map(({ icon: Icon, title, desc }) => (
                  <li
                    key={title}
                    className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-sm"
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white">{title}</div>
                      <div className="text-xs text-white/60 mt-1 leading-relaxed">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
                >
                  Обсудить проект
                </button>
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-white/10 transition-colors"
                >
                  Рассчитать
                </a>
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
                * Реальные работы наших мастеров — скрытый монтаж и изделия из керамогранита.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
