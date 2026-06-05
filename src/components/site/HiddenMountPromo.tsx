import { useEffect, useState } from "react";
import { Layers, Wind, CircleDot, Droplets, Scroll, ArrowRight } from "lucide-react";
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
  { src: img1, alt: "Скрытый монтаж — мраморный керамогранит" },
  { src: img2, alt: "Ванная со скрытым монтажом" },
  { src: img3, alt: "Скрытый монтаж смесителя" },
  { src: img4, alt: "Санузел со скрытой инсталляцией" },
  { src: img5, alt: "Минималистичный санузел" },
  { src: img6, alt: "Фартук из керамогранита" },
  { src: img7, alt: "Ванная с керамогранитом" },
  { src: img8, alt: "Изделие из керамогранита" },
  { src: img9, alt: "Изделие из керамогранита" },
  { src: img10, alt: "Изделие из керамогранита" },
  { src: img11, alt: "Изделие из керамогранита" },
];

const items = [
  { icon: Wind, title: "Скрытая вытяжка" },
  { icon: CircleDot, title: "Кнопка из камня" },
  { icon: Droplets, title: "Ниша под душ" },
  { icon: Scroll, title: "Держатель бумаги" },
];

export function HiddenMountPromo() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    const id = setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 3500);
    return () => {
      clearInterval(id);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="pt-10 md:pt-16 pb-0 bg-background">
      <div className="container-px mx-auto max-w-6xl">
        <div className="liquid-glass rounded-sm overflow-hidden">
          {/* Top: full-bleed carousel with overlay */}
          <div className="relative">
            <Carousel
              opts={{ loop: true, align: "start" }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent>
                {photos.map((p) => (
                  <CarouselItem key={p.src}>
                    <div className="relative">
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading="lazy"
                        className="w-full h-[260px] sm:h-[340px] md:h-[420px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 md:p-9">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/20 border border-primary/40 text-primary text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full mb-3 w-fit backdrop-blur-sm">
                <Layers className="h-3 w-3" /> Специализация
              </div>
              <h2 className="font-display font-bold uppercase text-xl sm:text-2xl md:text-3xl leading-tight text-white max-w-3xl">
                Изделия из <span className="text-gradient-gold">керамогранита</span> и скрытый монтаж
              </h2>
              <p className="mt-2 text-white/80 text-sm md:text-base max-w-2xl">
                Всё лишнее спрятано в стене — только идеальная плоскость и чистая геометрия.
              </p>
            </div>

            {/* Slide indicator */}
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-sm text-white/90 text-[10px] font-mono">
              {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </div>
          </div>

          {/* Bottom: features + CTA in single row */}
          <div className="p-5 sm:p-7 md:p-7 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {items.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-2 rounded-sm"
                >
                  <Icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs font-medium leading-tight">{title}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-lead-form", {
                      detail: { objectType: "Изделия из керамогранита" },
                    }),
                  )
                }
                className="btn-cta hover:btn-cta-hover group inline-flex items-center gap-2 px-5 py-2.5 font-semibold uppercase tracking-wider text-xs rounded-xl hover:-translate-y-0.5"
              >
                Обсудить
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-white/20 text-foreground font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-white/10 transition-colors"
              >
                Рассчитать
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
