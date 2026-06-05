import { SectionHeader } from "./SectionHeader";
import { ClipboardList, Hammer, KeyRound } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Заявка и замер",
    text: "Принимаем заявку, выезжаем на объект бесплатно, обсуждаем задачу и готовим техническое задание.",
  },
  {
    n: "02",
    icon: Hammer,
    title: "Договор и ремонт",
    text: "Фиксируем смету и сроки в договоре. Работаем по графику с еженедельной фото-отчётностью.",
  },
  {
    n: "03",
    icon: KeyRound,
    title: "Сдача под ключ",
    text: "Принимаете готовую квартиру, получаете гарантию 2 года и расширенную пожизненную поддержку.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative pt-0 pb-20 md:pb-32 bg-dots-orange overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_50%_0%,_oklch(0.72_0.2_50/0.12),_transparent_60%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <SectionHeader eyebrow="Процесс" title="Три шага до новоселья" center />

        <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group relative liquid-glass rounded-2xl md:rounded-3xl p-5 md:p-10 hover-lift transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl md:rounded-t-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-start justify-between mb-4 md:mb-6">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-primary/15 ring-1 ring-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:ring-primary transition-all duration-500">
                  <s.icon className="h-5 w-5 md:h-7 md:w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <div className="font-display font-black text-4xl md:text-6xl text-gradient-gold leading-none opacity-90">
                  {s.n}
                </div>
              </div>

              <h3 className="relative font-display font-bold uppercase text-lg md:text-2xl mb-2 md:mb-3 text-foreground">
                {s.title}
              </h3>
              <p className="relative text-sm md:text-base text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all duration-300 hover:shadow-[0_10px_40px_-10px_oklch(0.72_0.2_50/0.6)] hover:-translate-y-0.5"
          >
            Начать с бесплатного замера
          </button>
        </div>
      </div>
    </section>
  );
}
