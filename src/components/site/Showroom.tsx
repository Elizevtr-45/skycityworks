import siteVisitImg from "@/assets/site-visit.jpg";
import { MapPin, Eye } from "lucide-react";

export function Showroom() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-sm">
          <img
            src={siteVisitImg}
            alt="Экскурсия на объект ремонта СКАЙСИТИ"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="reveal">
          <div className="flex items-center gap-3 mb-4">
            <span className="gold-divider" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              Экскурсия на объекты
            </span>
          </div>
          <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
            Увидьте наши проекты своими глазами
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Приглашаем вас увидеть наши проекты своими глазами. Подберём для вас объекты,
            максимально подходящие по стилю, планировке и бюджету — как уже завершённые,
            так и находящиеся в процессе реализации.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Во время экскурсии вы сможете оценить качество материалов, уровень исполнения
            и наш подход к работе.
          </p>
          <div className="mt-8 flex items-start gap-3 text-foreground">
            <Eye className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Индивидуальный подбор объектов</div>
              <div className="text-sm text-muted-foreground">
                По вашему стилю, планировке и бюджету
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-3 text-foreground">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Приморский край, Надеждинский район</div>
              <div className="text-sm text-muted-foreground">пос. Новый, ул. Хрустальная, 14</div>
            </div>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-dark text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-primary transition-colors"
          >
            Записаться на экскурсию
          </a>
        </div>
      </div>
    </section>
  );
}
