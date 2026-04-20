import { Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const reviews = [
  { name: "Анна К.", role: "ЖК «Маринист»", text: "Сделали ремонт за 3 месяца, точно в срок и без единой доплаты. Всё, как обещали — даже лучше." },
  { name: "Дмитрий С.", role: "ЖК «Аквамарин»", text: "Профессиональная команда. Дизайн-проект полностью совпал с реальностью. Рекомендую без оговорок." },
  { name: "Елена М.", role: "Частный дом", text: "Понравился прозрачный подход: каждую неделю отчёт, фото, всё фиксировано в смете." },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-32 bg-dark">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader light eyebrow="Отзывы" title="Что говорят клиенты" center />
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="reveal bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-white/85 leading-relaxed">«{r.text}»</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-display font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{r.name}</div>
                  <div className="text-white/50 text-xs">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
