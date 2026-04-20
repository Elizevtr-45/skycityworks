import { useState } from "react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import { SectionHeader } from "./SectionHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Clock, Ruler, Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  img: string;
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
    img: p1,
    title: "ЖК «Маринист»",
    type: "2-комнатная · 68 м²",
    price: "от 1 850 000 ₽",
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
    img: p2,
    title: "ЖК «Аквамарин»",
    type: "Кухня-гостиная · 42 м²",
    price: "от 1 120 000 ₽",
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
    img: p3,
    title: "ЖК «Жемчужина»",
    type: "3-комнатная · 92 м²",
    price: "от 2 480 000 ₽",
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
    img: p4,
    title: "ЖК «Босфор»",
    type: "Санузел премиум · 9 м²",
    price: "от 480 000 ₽",
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
                src={p.img}
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
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
          {active && (
            <>
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={active.img}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="text-primary uppercase tracking-widest text-xs mb-2">
                    {active.type}
                  </div>
                  <DialogTitle className="font-display font-bold uppercase text-white text-2xl md:text-3xl">
                    {active.title}
                  </DialogTitle>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 bg-background rounded-sm">
                    <Ruler className="h-5 w-5 text-primary mb-2" />
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Площадь</div>
                    <div className="font-display font-semibold mt-1">{active.area}</div>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-background rounded-sm">
                    <Clock className="h-5 w-5 text-primary mb-2" />
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Срок</div>
                    <div className="font-display font-semibold mt-1">{active.duration}</div>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-background rounded-sm">
                    <Wallet className="h-5 w-5 text-primary mb-2" />
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Стоимость</div>
                    <div className="font-display font-semibold mt-1 text-sm">{active.price}</div>
                  </div>
                </div>

                <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                  {active.description}
                </DialogDescription>

                <div>
                  <h4 className="font-display font-semibold uppercase text-sm tracking-wider mb-3">
                    Что было сделано
                  </h4>
                  <ul className="space-y-2">
                    {active.works.map((w) => (
                      <li key={w} className="flex items-start gap-3 text-sm text-foreground/80">
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
        </DialogContent>
      </Dialog>
    </section>
  );
}
