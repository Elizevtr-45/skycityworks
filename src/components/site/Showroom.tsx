import { MapPin, Eye, Building2, Hammer, Sparkles } from "lucide-react";

export function Showroom() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div
          className="reveal relative aspect-[4/3] overflow-hidden bg-dark text-white p-8 md:p-12 flex flex-col justify-between"
          style={{ borderRadius: "10px" }}
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,_var(--primary),_transparent_55%),radial-gradient(circle_at_80%_80%,_var(--primary),_transparent_60%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/40 text-primary text-xs uppercase tracking-[0.25em] font-semibold rounded-sm">
              <Building2 className="h-3.5 w-3.5" /> Объекты в работе
            </div>
            <div className="mt-6 font-display font-bold uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
              <span className="text-gradient-gold">Покажем</span>
              <br />вживую
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-sm p-4">
              <Hammer className="h-5 w-5 text-primary mb-2" />
              <div className="font-display font-bold text-2xl">12+</div>
              <div className="text-white/60 text-xs uppercase tracking-wider">активных объектов</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-4">
              <Sparkles className="h-5 w-5 text-primary mb-2" />
              <div className="font-display font-bold text-2xl">100%</div>
              <div className="text-white/60 text-xs uppercase tracking-wider">прозрачность работ</div>
            </div>
          </div>
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
            Приглашаем вас увидеть наши проекты своими глазами. Подберём для вас действующие
            объекты в работе, максимально подходящие по стилю, планировке и бюджету.
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
