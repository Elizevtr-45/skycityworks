import { useState } from "react";
import p1 from "@/assets/portfolio-1.jpg";
import p1b from "@/assets/portfolio-1b.jpg";
import p1c from "@/assets/portfolio-1c.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p2b from "@/assets/portfolio-2b.jpg";
import p2c from "@/assets/portfolio-2c.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p3b from "@/assets/portfolio-3b.jpg";
import p3c from "@/assets/portfolio-3c.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p4b from "@/assets/portfolio-4b.jpg";
import p4c from "@/assets/portfolio-4c.jpg";
import { SectionHeader } from "./SectionHeader";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Clock, Ruler, Wallet, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  images: string[];
  title: string;
  type: string;
  price: string;
  duration: string;
  area: string;
  description: string;
  works: string[];
};

const projects: Project[] = [
  {
    images: [p1, p1b, p1c],
    title: "ЖК «Маринист»",
    type: "2-комнатная · 68 м²",
    price: "1 850 000 ₽",
    duration: "3,5 месяца",
    area: "68 м²",
    description:
      "Светлая двухкомнатная квартира в современном минималистичном стиле. Использовали натуральный дуб, микроцемент и итальянскую плитку. Скрытые двери и встроенная подсветка создают ощущение простора.",
    works: [
      "Полный демонтаж и перепланировка",
      "Чистовая отделка под ключ",
      "Электрика и сантехника с нуля",
      "Встроенная мебель и кухня по проекту",
      "Установка системы «умный дом»",
    ],
  },
  {
    images: [p2, p2b, p2c],
    title: "ЖК «Аквамарин»",
    type: "Кухня-гостиная · 42 м²",
    price: "1 120 000 ₽",
    duration: "2 месяца",
    area: "42 м²",
    description:
      "Объединённая кухня-гостиная в тёплых бежевых тонах. Кварцевые столешницы, фасады из шпона ореха и дизайнерское освещение задают премиальный характер пространству.",
    works: [
      "Снос перегородки и согласование",
      "Выравнивание стен и потолков",
      "Монтаж кухонного острова",
      "Декоративная штукатурка",
      "Подбор и установка мебели",
    ],
  },
  {
    images: [p3, p3b, p3c],
    title: "ЖК «Жемчужина»",
    type: "3-комнатная · 92 м²",
    price: "2 480 000 ₽",
    duration: "5 месяцев",
    area: "92 м²",
    description:
      "Просторная трёхкомнатная квартира для семьи. Современная классика: молдинги, паркет ёлочкой, латунная фурнитура. Каждая комната оформлена в единой палитре.",
    works: [
      "Дизайн-проект с 3D-визуализацией",
      "Перепланировка трёх помещений",
      "Тёплые полы во всей квартире",
      "Гардеробная и встроенные шкафы",
      "Авторский надзор на всех этапах",
    ],
  },
  {
    images: [p4, p4b, p4c],
    title: "ЖК «Босфор»",
    type: "Санузел премиум · 9 м²",
    price: "480 000 ₽",
    duration: "3 недели",
    area: "9 м²",
    description:
      "Премиальный санузел с использованием итальянского керамогранита под мрамор, подвесной сантехники и встроенных инсталляций. Скрытая подсветка и стеклянное ограждение душевой зоны.",
    works: [
      "Гидроизоляция и стяжка",
      "Укладка крупноформатного керамогранита",
      "Монтаж инсталляций и сантехники",
      "Тёплый пол и полотенцесушитель",
      "Декоративное освещение",
    ],
  },
];

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-dark">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          light
          eyebrow="Портфолио"
          title="Наши реализованные проекты"
          subtitle="Каждый проект — это история, рассказанная через материалы, свет и пропорции."
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <button
              type="button"
              key={p.title}
              onClick={() => setActive(p)}
              className="reveal group relative overflow-hidden rounded-sm aspect-[4/3] cursor-pointer text-left"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={p.images[0]}
                alt={p.title}
                width={1024}
                height={768}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-primary uppercase tracking-widest text-xs mb-2">{p.type}</div>
                <h3 className="font-display font-bold uppercase text-white text-xl md:text-2xl">{p.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-white/80 text-sm">{p.price}</span>
                  <span className="text-primary text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Смотреть →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogPortal>
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-black/50 backdrop-blur-md",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            )}
          />
          <DialogPrimitive.Content
            style={{ borderRadius: "10px" }}
            className={cn(
              "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
              "w-[92vw] max-w-2xl max-h-[90vh] overflow-y-auto",
              "bg-card border border-border shadow-2xl",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            )}
          >
            {active && (
              <>
                <div className="relative">
                  <Carousel opts={{ loop: true }} className="w-full">
                    <CarouselContent className="ml-0">
                      {active.images.map((src, idx) => (
                        <CarouselItem key={idx} className="pl-0">
                          <div className="relative aspect-video w-full overflow-hidden">
                            <img
                              src={src}
                              alt={`${active.title} — фото ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent pointer-events-none" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-3 h-9 w-9 bg-background/80 border-border text-foreground hover:bg-background" />
                    <CarouselNext className="right-3 h-9 w-9 bg-background/80 border-border text-foreground hover:bg-background" />
                  </Carousel>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pointer-events-none">
                    <div className="text-primary uppercase tracking-widest text-xs mb-1.5">
                      {active.type}
                    </div>
                    <DialogTitle className="font-display font-bold uppercase text-white text-xl md:text-2xl">
                      {active.title}
                    </DialogTitle>
                  </div>
                </div>

                <div className="p-5 md:p-6 space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center text-center p-3 bg-background rounded-sm">
                      <Ruler className="h-4 w-4 text-primary mb-1.5" />
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Площадь</div>
                      <div className="font-display font-semibold mt-0.5 text-sm">{active.area}</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-background rounded-sm">
                      <Clock className="h-4 w-4 text-primary mb-1.5" />
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Срок</div>
                      <div className="font-display font-semibold mt-0.5 text-sm">{active.duration}</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-background rounded-sm">
                      <Wallet className="h-4 w-4 text-primary mb-1.5" />
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Стоимость</div>
                      <div className="font-display font-semibold mt-0.5 text-xs">{active.price}</div>
                    </div>
                  </div>

                  <DialogDescription className="text-sm text-foreground/80 leading-relaxed">
                    {active.description}
                  </DialogDescription>

                  <div>
                    <h4 className="font-display font-semibold uppercase text-xs tracking-wider mb-2.5">
                      Что было сделано
                    </h4>
                    <ul className="space-y-1.5">
                      {active.works.map((w) => (
                        <li key={w} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      setActive(null);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Хочу такой же ремонт
                  </Button>
                </div>
              </>
            )}

            <DialogPrimitive.Close
              style={{ borderRadius: "10px" }}
              className="absolute right-3 top-3 z-10 p-2 bg-background/80 backdrop-blur text-foreground hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Закрыть</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </section>
  );
}
