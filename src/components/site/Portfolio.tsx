import { useState } from "react";
import p1 from "@/assets/portfolio-1.jpg";
import p1b from "@/assets/portfolio-1b.jpg";
import p1c from "@/assets/portfolio-1c.jpg";
import p1d from "@/assets/portfolio-1d.jpg";
import p1e from "@/assets/portfolio-1e.jpg";
import p1f from "@/assets/portfolio-1f.jpg";
import p1g from "@/assets/portfolio-1g.jpg";
import p1h from "@/assets/portfolio-1h.jpg";
import p1i from "@/assets/portfolio-1i.jpg";
import p1j from "@/assets/portfolio-1j.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p2b from "@/assets/portfolio-2b.jpg";
import p2c from "@/assets/portfolio-2c.jpg";
import p2d from "@/assets/portfolio-2d.jpg";
import p2e from "@/assets/portfolio-2e.jpg";
import p2f from "@/assets/portfolio-2f.jpg";
import p2g from "@/assets/portfolio-2g.jpg";
import p2h from "@/assets/portfolio-2h.jpg";
import p2i from "@/assets/portfolio-2i.jpg";
import p2j from "@/assets/portfolio-2j.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p3b from "@/assets/portfolio-3b.jpg";
import p3c from "@/assets/portfolio-3c.jpg";
import p3d from "@/assets/portfolio-3d.jpg";
import p3e from "@/assets/portfolio-3e.jpg";
import p3f from "@/assets/portfolio-3f.jpg";
import p3g from "@/assets/portfolio-3g.jpg";
import p3h from "@/assets/portfolio-3h.jpg";
import p3i from "@/assets/portfolio-3i.jpg";
import p3j from "@/assets/portfolio-3j.jpg";
import p4 from "@/assets/bathroom-premium-1.jpg";
import p4b from "@/assets/bathroom-premium-2.jpg";
import p4c from "@/assets/bathroom-premium-3.jpg";
import p4d from "@/assets/bathroom-premium-4.jpg";
import p4e from "@/assets/bathroom-premium-5.jpg";
import { SectionHeader } from "./SectionHeader";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Clock, Ruler, Wallet, CheckCircle2, X } from "lucide-react";

import { cn } from "@/lib/utils";

type Project = {
  images: string[];
  title: string;
  type: string;
  price: string;
  tier: string;
  duration: string;
  area: string;
  description: string;
  works: string[];
};

const projects: Project[] = [
  {
    images: [p1, p1b, p1c, p1d, p1e, p1f, p1g, p1h, p1i, p1j],
    title: "Современный ремонт под ключ",
    type: "Владивосток · Первореченский район · 98 м²",
    price: "3 700 000 ₽",
    tier: "Премиум",
    duration: "3 месяца",
    area: "98 м²",
    description:
      "Ремонт под ключ в новостройке во Владивостоке (Первореченский район). Полный комплекс работ: от чернового состояния до заселения. Премиальные материалы, скрытые инженерные решения и индивидуальный дизайн.",
    works: [
      "Возведение перегородок и перепланировка",
      "Полная разводка электрики и слаботочки",
      "Сантехника и водоподготовка с нуля",
      "Стяжка пола и тёплые полы",
      "Чистовая отделка: декоративная штукатурка, плитка, паркет",
      "Скрытые двери и встроенная подсветка",
      "Кухня и встроенная мебель по индивидуальному проекту",
    ],
  },
  {
    images: [p2, p2b, p2c, p2d, p2e, p2f, p2g, p2h, p2i, p2j],
    title: "Стильная квартира под ключ",
    type: "Владивосток · Ленинский район, Чуркин · 57 м²",
    price: "1 750 000 ₽",
    tier: "Стандарт",
    duration: "3 месяца",
    area: "57 м²",
    description:
      "Ремонт под ключ в новостройке во Владивостоке (Ленинский район, Чуркин) в тарифе «Стандарт». Спокойная современная палитра, встроенные системы хранения, аккуратная отделка и готовое пространство для комфортной жизни.",
    works: [
      "Выравнивание стен и подготовка под чистовую отделку",
      "Разводка электрики и освещения по проекту",
      "Сантехнические работы и подключение приборов",
      "Укладка плитки и напольных покрытий",
      "Монтаж встроенной мебели и шкафов",
      "Установка межкомнатных дверей и фурнитуры",
      "Финишная сборка интерьера под заселение",
    ],
  },
  {
    images: [p3, p3b, p3c, p3d, p3e, p3f, p3g, p3h, p3i, p3j],
    title: "Уютная однушка для жизни",
    type: "Владивосток · Снеговая Падь · 1-комнатная · 40 м²",
    price: "1 100 000 ₽",
    tier: "Базовый",
    duration: "3 месяца",
    area: "40 м²",
    description:
      "Ремонт под ключ однокомнатной квартиры в новостройке во Владивостоке (Снеговая Падь). Тариф «Базовый»: всё необходимое для комфортного заселения — надёжно, аккуратно и по фиксированной смете.",
    works: [
      "Подготовка стен и потолков под чистовую отделку",
      "Базовая разводка электрики и розеточных групп",
      "Сантехнические работы и подключение приборов",
      "Стяжка пола и укладка напольных покрытий",
      "Покраска стен и потолков",
      "Облицовка плиткой санузла",
      "Монтаж дверей, плинтусов и фурнитуры",
    ],
  },
  {
    images: [p4, p4b, p4c, p4d, p4e],
    title: "Премиальный санузел",
    type: "Владивосток · Седанка · Каркасный дом · Санузел · 4,5 м²",
    price: "390 000 ₽",
    tier: "Премиум",
    duration: "3 недели",
    area: "4,5 м²",
    description:
      "Премиальный санузел в каркасном доме во Владивостоке (район Седанка): керамогранит под дерево и бетон в раскладке «ёлочкой», отдельностоящая ванна с декоративными рёбрами, чёрная сантехника, скрытая подсветка по периметру потолка и дизайнерский декор.",
    works: [
      "Гидроизоляция и подготовка оснований",
      "Раскладка керамогранита под дерево и бетон «ёлочкой»",
      "Монтаж отдельностоящей ванны и смесителя",
      "Установка чёрной сантехники и раковины",
      "Скрытая подсветка по периметру потолка",
      "Полотенцесушитель и аксессуары",
    ],
  },
];

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-grid-orange">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          light
          eyebrow="Портфолио"
          title="Реальные объекты во Владивостоке"
          subtitle="Реализованные проекты в новостройках Владивостока и в частных домах на Седанке, Патрокле, Эгершельде."
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <button
              type="button"
              key={p.title}
              onClick={() => setActive(p)}
              className="reveal group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer text-left ring-1 ring-white/5 hover:ring-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-25px_oklch(0.72_0.2_50/0.55)]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={p.images[0]}
                alt={p.title}
                width={1024}
                height={768}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 group-hover:from-primary/15 group-hover:to-accent/10 transition-all duration-500" />

              {/* Top tags */}
              <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold bg-primary text-primary-foreground shadow-lg">
                  {p.tier}
                </span>
                <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold liquid-glass text-white">
                  {p.area}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10">
                <div className="text-primary uppercase tracking-widest text-xs mb-2 font-semibold">{p.type}</div>
                <h3 className="font-display font-black uppercase text-white text-xl md:text-2xl leading-tight">{p.title}</h3>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg liquid-glass text-white text-sm font-semibold tabular-nums">
                    <Wallet className="h-3.5 w-3.5 text-primary" />
                    {p.price}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-bold">
                    Смотреть
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
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
              "fixed inset-0 z-50 bg-black/55 backdrop-blur-md",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=open]:duration-500 data-[state=closed]:duration-300",
            )}
          />
          <DialogPrimitive.Content
            style={{ borderRadius: "28px" }}
            className={cn(
              "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
              "w-[92vw] max-w-2xl max-h-[90vh] overflow-hidden",
              "bg-card border border-border shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-2",
              "data-[state=open]:duration-[600ms] data-[state=closed]:duration-300",
              "data-[state=open]:ease-[cubic-bezier(.22,1,.36,1)]",
              "flex flex-col",
            )}
          >
            <div className="overflow-y-auto" style={{ borderRadius: "28px" }}>

            {active && (
              <>
                <div className="relative">
                  <Carousel opts={{ loop: true }} className="w-full">
                    <CarouselContent className="ml-0">
                      {active.images.map((src, idx) => (
                        <CarouselItem key={idx} className="pl-0">
                          <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden">
                            <img
                              src={src}
                              alt={`${active.title} — фото ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-3 h-9 w-9 bg-background/80 border-border text-foreground hover:bg-background" />
                    <CarouselNext className="right-3 h-9 w-9 bg-background/80 border-border text-foreground hover:bg-background" />
                  </Carousel>
                </div>

                <div className="p-5 md:p-6 space-y-5 bg-gradient-to-b from-card to-card/95">
                  <div>
                    <div className="text-primary uppercase tracking-widest text-[10px] md:text-xs mb-1.5 font-semibold">
                      {active.type}
                    </div>
                    <DialogTitle className="font-display font-bold uppercase text-foreground text-lg md:text-2xl leading-tight">
                      {active.title}
                    </DialogTitle>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center text-center p-3 bg-background/80 rounded-xl ring-1 ring-border/60 transition-all duration-300 hover:ring-primary/40 hover:-translate-y-0.5">
                      <Ruler className="h-4 w-4 text-primary mb-1.5" />
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Площадь</div>
                      <div className="font-display font-semibold mt-0.5 text-sm">{active.area}</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-background/80 rounded-xl ring-1 ring-border/60 transition-all duration-300 hover:ring-primary/40 hover:-translate-y-0.5">
                      <Clock className="h-4 w-4 text-primary mb-1.5" />
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Срок</div>
                      <div className="font-display font-semibold mt-0.5 text-sm">{active.duration}</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-background/80 rounded-xl ring-1 ring-primary/30 transition-all duration-300 hover:ring-primary/60 hover:-translate-y-0.5">
                      <Wallet className="h-4 w-4 text-primary mb-1.5" />
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Стоимость</div>
                      <div className="font-display font-semibold mt-0.5 text-xs">{active.price}</div>
                      <div className="text-[10px] text-primary uppercase tracking-wider mt-1 font-semibold">Тариф «{active.tier}»</div>
                    </div>
                  </div>

                  <DialogDescription className="text-sm text-foreground/80 leading-relaxed">
                    {active.description}
                  </DialogDescription>

                  <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                    <h4 className="font-display font-semibold uppercase text-xs tracking-[0.2em] mb-3 text-primary">
                      Что было сделано
                    </h4>
                    <ul className="space-y-2">
                      {active.works.map((w) => (
                        <li key={w} className="flex items-start gap-2.5 text-sm text-foreground/85">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </>
            )}
            </div>

            <DialogPrimitive.Close
              style={{ borderRadius: "999px" }}
              className="absolute right-3 top-3 z-30 h-9 w-9 flex items-center justify-center bg-background/80 backdrop-blur text-foreground hover:bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
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
