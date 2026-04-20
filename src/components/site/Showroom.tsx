import showroomImg from "@/assets/showroom.jpg";
import { MapPin } from "lucide-react";

export function Showroom() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-sm">
          <img
            src={showroomImg}
            alt="Шоурум материалов для ремонта во Владивостоке"
            width={1280}
            height={896}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="reveal">
          <div className="flex items-center gap-3 mb-4">
            <span className="gold-divider" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">Шоурум</span>
          </div>
          <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
            Посетите выставочную площадку
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Прикоснитесь к материалам, оцените фактуры и оттенки вживую. Наши специалисты
            помогут подобрать оптимальное решение для вашего интерьера.
          </p>
          <div className="mt-8 flex items-start gap-3 text-foreground">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="font-semibold">Владивосток, ул. Светланская, 45</div>
              <div className="text-sm text-muted-foreground">Пн–Сб: 10:00 – 20:00</div>
            </div>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-dark text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-primary transition-colors"
          >
            Записаться на визит
          </a>
        </div>
      </div>
    </section>
  );
}
