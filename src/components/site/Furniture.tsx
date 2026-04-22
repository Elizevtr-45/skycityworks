import { Hammer, Ruler, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import furnitureImg from "@/assets/furniture.jpg";
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
  { src: f1, alt: "Мебель на заказ — работа СКАЙСИТИ" },
  { src: f2, alt: "Мебель на заказ — работа СКАЙСИТИ" },
  { src: f3, alt: "Мебель на заказ — работа СКАЙСИТИ" },
  { src: f4, alt: "Мебель на заказ — работа СКАЙСИТИ" },
  { src: f5, alt: "Мебель на заказ — работа СКАЙСИТИ" },
];

export function Furniture() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="gold-divider" />
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">Новое направление</span>
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
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

          <div className="reveal order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-sm">
            <img
              src={furnitureImg}
              alt="Изготовление мебели на заказ СКАЙСИТИ"
              width={1280}
              height={960}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="reveal mt-14 md:mt-20">
          <div className="flex items-end justify-between mb-6">
            <div className="font-display font-bold uppercase text-sm tracking-wider text-primary">
              Наши работы
            </div>
            <div className="text-xs text-muted-foreground hidden sm:block">
              Листайте галерею →
            </div>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="relative">
            <CarouselContent className="-ml-4">
              {gallery.map((p, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div
                    className="relative overflow-hidden border border-border bg-card"
                    style={{ borderRadius: "10px" }}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      className="w-full h-[320px] md:h-[380px] object-cover hover:scale-105 transition-transform duration-700"
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
    </section>
  );
}
