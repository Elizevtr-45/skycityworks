import { Hammer, Ruler, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import f1 from "@/assets/furniture-1.jpg";
import f2 from "@/assets/furniture-2.jpg";
import f3 from "@/assets/furniture-3.jpg";
import f4 from "@/assets/furniture-4.jpg";
import f5 from "@/assets/furniture-5.jpg";

const features = [
  { icon: Ruler, title: "Точные размеры", text: "Идеально под вашу планировку и нишу." },
  { icon: Sparkles, title: "Премиальные материалы", text: "Массив дуба, ореха, шпон и фурнитура." },
  { icon: Hammer, title: "Собственное производство", text: "Контролируем качество на каждом этапе." },
];

const gallery = [
  { src: f1, alt: "Кухонный гарнитур на заказ во Владивостоке — фасады МДФ, столешница из камня (СКАЙСИТИ)" },
  { src: f2, alt: "Корпусная мебель на заказ — встроенный шкаф под потолок, проект СКАЙСИТИ" },
  { src: f3, alt: "Гардеробная под заказ — индивидуальное наполнение и подсветка, СКАЙСИТИ" },
  { src: f4, alt: "Кухня на заказ — встроенная техника и скрытая фурнитура, работа СКАЙСИТИ" },
  { src: f5, alt: "Мебель на заказ для квартиры — премиальная фурнитура и точные размеры, СКАЙСИТИ Владивосток" },
];

export function Furniture() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Мебель на заказ во Владивостоке — СКАЙСИТИ",
    description:
      "Кухонные гарнитуры, гардеробные и корпусная мебель на заказ под ваш ремонт. Собственное производство, премиальные материалы, точные размеры.",
    itemListElement: gallery.map((p, i) => ({
      "@type": "ImageObject",
      position: i + 1,
      contentUrl: p.src,
      description: p.alt,
    })),
  };

  return (
    <section
      id="furniture"
      aria-labelledby="furniture-heading"
      className="py-12 md:py-16 bg-background"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-center">
          <div className="reveal order-2 lg:order-1 lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/15 border border-primary/40 text-primary text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full mb-3">
              <Sparkles className="h-3 w-3" /> Своё производство
            </div>
            <h2 id="furniture-heading" className="font-display font-bold uppercase text-2xl md:text-3xl leading-[1.1]">
              Мебель, которая <span className="text-gradient-gold">продолжает</span> ремонт
            </h2>
            <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              Кухни, гардеробные и корпусная мебель — единая концепция от стен до фасадов.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-2.5">
                  <div className="h-8 w-8 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold uppercase text-xs">{f.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{f.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-5 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-accent transition-colors"
            >
              Заказать мебель
            </a>
          </div>

          <div className="reveal order-1 lg:order-2 lg:col-span-3 relative">
            <Carousel opts={{ align: "start", loop: true }} className="relative">
              <CarouselContent>
                {gallery.map((p, i) => (
                  <CarouselItem key={i}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-card">
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        width={1280}
                        height={800}
                        data-nosnippet
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
        </div>
      </div>
    </section>
  );
}
