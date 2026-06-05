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
    <section id="process" className="relative pt-0 pb-10 md:pb-20 bg-dots-orange overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_50%_0%,_oklch(0.72_0.2_50/0.12),_transparent_60%)]" />
      <div className="relative container-px mx-auto max-w-6xl">
        <SectionHeader eyebrow="Процесс" title="Три шага до новоселья" center />

        <div className="relative grid md:grid-cols-3 gap-5 md:gap-8 mt-6">
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group relative liquid-glass rounded-2xl pt-10 px-5 pb-5 md:pt-12 md:px-8 md:pb-8 hover-lift transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center justify-between gap-4 mb-5">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-primary/15 ring-1 ring-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:ring-primary transition-all duration-500 shrink-0">
                  <s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <div className="font-display font-black text-2xl md:text-3xl text-gradient-gold leading-none opacity-90">
                  {s.n}
                </div>
              </div>

              <h3 className="relative font-display font-bold uppercase text-base md:text-lg mb-2.5 text-foreground">
                {s.title}
              </h3>
              <p className="relative text-sm md:text-base text-muted-foreground leading-snug">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="btn-cta hover:btn-cta-hover inline-flex items-center justify-center px-7 py-3.5 font-semibold uppercase tracking-wider text-sm rounded-xl hover:-translate-y-0.5"
          >
            Начать с бесплатного замера
          </button>
        </div>
      </div>
    </section>
  );
}

