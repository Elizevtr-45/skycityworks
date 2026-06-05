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
  { icon: Droplets, title: "Ниша под гигиенический душ", desc: "Аккуратное место для венчика — без коробов" },
  { icon: Scroll, title: "Держатель туалетной бумаги", desc: "Встроенная ниша из керамогранита с держателем внутри" },
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
    <section className="pt-10 md:pt-16 pb-0 bg-background">
      <div className="container-px mx-auto max-w-6xl">
        <div className="relative overflow-hidden bg-dark text-white" style={{ borderRadius: "10px" }}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,_var(--primary),_transparent_60%)]" />
          <div className="relative grid lg:grid-cols-5 gap-6 lg:gap-8 p-5 sm:p-7 md:p-9 items-center">
            <div className="reveal lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/15 border border-primary/40 text-primary text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm mb-3">
                <Layers className="h-3 w-3" /> Специализация
              </div>
              <h2 className="font-display font-bold uppercase text-xl sm:text-2xl md:text-3xl leading-tight">
                Изделия из <span className="text-gradient-gold">керамогранита</span> и скрытый монтаж
              </h2>
              <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
                Всё лишнее спрятано в стене — на виду только идеальная плоскость и чистая геометрия.
              </p>

              <ul className="mt-5 grid grid-cols-2 gap-2">
                {items.map(({ icon: Icon, title }) => (
                  <li
                    key={title}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-2 rounded-sm"
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-white leading-tight">{title}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-lead-form", {
                        detail: { objectType: "Изделия из керамогранита" },
                      }),
                    )
                  }
                  className="inline-flex items-center justify-center px-5 py-3 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
                >
                  Обсудить проект
                </button>
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center px-5 py-3 border border-white/30 text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-white/10 transition-colors"
                >
                  Рассчитать
                </a>
              </div>
            </div>

            <div className="reveal lg:col-span-3">
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
                          className="w-full h-[220px] sm:h-[320px] md:h-[380px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
