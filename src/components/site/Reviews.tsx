import { Star, Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const reviews = [
  { name: "Анна К.", role: "ЖК «Маринист»", text: "Сделали ремонт за 3 месяца, точно в срок и без единой доплаты. Всё, как обещали — даже лучше." },
  { name: "Дмитрий С.", role: "ЖК «Аквамарин»", text: "Профессиональная команда. Дизайн-проект полностью совпал с реальностью. Рекомендую без оговорок." },
  { name: "Елена М.", role: "Частный дом", text: "Понравился прозрачный подход: каждую неделю отчёт, фото, всё фиксировано в смете." },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative py-20 md:py-32 bg-grid-orange overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_15%_20%,_oklch(0.72_0.2_50/0.18),_transparent_55%),radial-gradient(circle_at_85%_80%,_oklch(0.62_0.21_35/0.14),_transparent_55%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <SectionHeader light eyebrow="Отзывы" title="Что говорят клиенты" center />
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="reveal liquid-glass group p-8 rounded-2xl relative hover-lift transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="absolute -top-3 -left-2 h-16 w-16 text-primary/15 group-hover:text-primary/30 transition-colors duration-500" strokeWidth={1} />
              <div className="relative flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="relative text-white/90 leading-relaxed text-[15px]">«{r.text}»</p>
              <div className="relative mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold shadow-[0_8px_24px_-8px_oklch(0.72_0.2_50/0.6)]">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.name}</div>
                  <div className="text-primary/80 text-xs uppercase tracking-widest mt-0.5">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
