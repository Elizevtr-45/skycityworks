import { Hammer, Ruler, Sparkles, ArrowRight } from "lucide-react";

import f1 from "@/assets/furniture-1.jpg";
import f2 from "@/assets/furniture-2.jpg";
import f3 from "@/assets/furniture-3.jpg";
import f4 from "@/assets/furniture-4.jpg";
import f5 from "@/assets/furniture-5.jpg";

const features = [
  { icon: Ruler, title: "Точные размеры" },
  { icon: Sparkles, title: "Премиум материалы" },
  { icon: Hammer, title: "Своё производство" },
];

const gallery = [
  { src: f1, alt: "Кухонный гарнитур на заказ во Владивостоке — СКАЙСИТИ" },
  { src: f2, alt: "Встроенный шкаф под потолок — СКАЙСИТИ" },
  { src: f3, alt: "Гардеробная под заказ — СКАЙСИТИ" },
  { src: f4, alt: "Кухня на заказ — СКАЙСИТИ" },
  { src: f5, alt: "Мебель на заказ — СКАЙСИТИ Владивосток" },
];

export function Furniture() {
  return (
    <section
      id="furniture"
      aria-labelledby="furniture-heading"
      className="py-12 md:py-16 bg-background"
    >
      <div className="container-px mx-auto max-w-6xl">
        <div className="liquid-glass rounded-sm p-5 sm:p-7 md:p-9 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/15 border border-primary/40 text-primary text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full mb-3">
                <Sparkles className="h-3 w-3" /> Своё производство
              </div>
              <h2 id="furniture-heading" className="font-display font-bold uppercase text-2xl md:text-3xl leading-[1.1]">
                Мебель, которая <span className="text-gradient-gold">продолжает</span> ремонт
              </h2>
              <p className="mt-2 text-muted-foreground text-sm md:text-base">
                Кухни, гардеробные и корпусная мебель — единая концепция от стен до фасадов.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-accent transition-colors shrink-0"
            >
              Заказать мебель
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Marquee strip of images */}
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-black/20">
            <div className="flex gap-3 animate-marquee" style={{ animationDuration: "40s" }}>
              {[...gallery, ...gallery].map((p, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-[240px] sm:w-[300px] md:w-[360px] aspect-[4/3] overflow-hidden rounded-sm"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background/80 to-transparent" />
          </div>

          {/* Features as inline chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-sm"
              >
                <f.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{f.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
