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
      className="py-20 md:py-32 bg-background"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="gold-divider" />
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">Новое направление</span>
            </div>
            <h2 id="furniture-heading" className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
              Изготавливаем мебель <span className="text-gradient-gold">на заказ</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              От кухонных гарнитуров до корпусной мебели и гардеробных. Создаём предметы интерьера,
              которые идеально впишутся в ваш ремонт — единая концепция от стен до фасадов шкафов.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold uppercase text-sm">{f.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{f.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-colors"
            >
              Заказать мебель
            </a>
          </div>

          <div className="reveal order-1 lg:order-2 relative">
            <Carousel opts={{ align: "start", loop: true }} className="relative">
              <CarouselContent>
                {gallery.map((p, i) => (
                  <CarouselItem key={i}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-card">
                      <img
                        src={p.src}
                        alt={p.alt}
                        title={p.alt}
                        loading="lazy"
                        decoding="async"
                        width={1280}
                        height={960}
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
