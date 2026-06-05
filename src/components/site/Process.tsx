import { SectionHeader } from "./SectionHeader";
import { ClipboardList, Hammer, KeyRound, ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Заявка и замер",
    text: "Принимаем заявку, выезжаем на объект бесплатно, обсуждаем задачу и готовим техническое задание.",
    meta: "1–2 дня",
  },
  {
    n: "02",
    icon: Hammer,
    title: "Договор и ремонт",
    text: "Фиксируем смету и сроки в договоре. Работаем по графику с еженедельной фото-отчётностью.",
    meta: "по графику",
  },
  {
    n: "03",
    icon: KeyRound,
    title: "Сдача под ключ",
    text: "Принимаете готовую квартиру, получаете гарантию 2 года и расширенную пожизненную поддержку.",
    meta: "гарантия 2 года",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-16 md:py-24 bg-dots-orange overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_50%_0%,_oklch(0.72_0.2_50/0.12),_transparent_60%)]" />

      <div className="relative container-px mx-auto max-w-6xl">
        <SectionHeader eyebrow="Процесс" title="Три шага до новоселья" center />

        <ol className="relative mt-12 md:mt-16 grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.n}
                className="reveal group relative flex flex-col"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Number + icon row */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative shrink-0">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:ring-primary transition-all duration-500">
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                  </div>
                  <span className="font-display font-black text-4xl md:text-5xl text-gradient-gold leading-none">
                    {s.n}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px w-12 bg-gradient-to-r from-primary/60 to-transparent mb-5" />

                <h3 className="font-display font-bold uppercase text-lg md:text-xl mb-3 text-foreground tracking-wide">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                  {s.text}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/80 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {s.meta}
                </div>

                {/* connector arrow between cards on desktop */}
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-5 top-4 h-5 w-5 text-primary/40" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="reveal mt-14 text-center">
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
