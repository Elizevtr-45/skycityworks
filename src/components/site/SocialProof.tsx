import { Building2 } from "lucide-react";

const complexes = [
  "Айвазовский",
  "Восточный Луч",
  "Маринист",
  "Семь Ветров",
  "Da Vinci",
  "Аквамарин",
  "Чайка",
  "Босфорский",
  "Облака",
  "Зелёный Угол",
  "Тихий",
  "Цемзаводская",
];

export function SocialProof() {
  return (
    <section className="relative py-24 md:py-32 bg-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_var(--primary),_transparent_60%)]" />
      <div className="container-px mx-auto max-w-5xl text-center relative">
        <div className="reveal">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="gold-divider" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              Знаем каждый ЖК Владивостока
            </span>
            <span className="gold-divider" />
          </div>

          <h2 className="font-display font-bold uppercase text-white text-3xl md:text-5xl lg:text-6xl leading-tight">
            Работаем в&nbsp;<span className="text-gradient-gold">новостройках</span> вашего ЖК
          </h2>

          <p className="mt-6 text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Знаем планировки, инженерные особенности и требования управляющих компаний
            ключевых жилых комплексов Владивостока — заходим на объект и сразу начинаем работу.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {complexes.map((name) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 bg-white/5 rounded-sm hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span className="font-display uppercase text-white text-sm tracking-wider">
                  ЖК «{name}»
                </span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-white/60 text-sm">
            Вашего ЖК нет в списке? Мы работаем во всех районах Владивостока —
            Первореченском, Ленинском, Фрунзенском, Советском и Первомайском.
          </p>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="mt-10 inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_oklch(0.7_0.08_65/0.6)]"
          >
            Узнать стоимость для моего ЖК
          </button>
        </div>
      </div>
    </section>
  );
}
