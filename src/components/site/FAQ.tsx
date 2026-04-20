import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  {
    q: "Какие сроки ремонта?",
    a: "Стандартная 2-комнатная квартира под ключ — 2–3 месяца. Точные сроки фиксируются в договоре после замера.",
  },
  {
    q: "Какие гарантии вы даёте?",
    a: "До 5 лет на все виды работ в зависимости от выбранного тарифа. Гарантия прописана в договоре.",
  },
  {
    q: "Как формируется стоимость?",
    a: "Цена фиксируется в смете до начала работ и не меняется. В неё входят все материалы и работы согласно проекту.",
  },
  {
    q: "Можно ли наблюдать за процессом?",
    a: "Да. Вы получаете еженедельные фотоотчёты и можете посетить объект в любое удобное время.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Частые вопросы" center />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="reveal border border-border bg-card rounded-sm overflow-hidden"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted transition-colors"
                >
                  <span className="font-display font-semibold uppercase text-sm md:text-base pr-4">
                    {f.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
