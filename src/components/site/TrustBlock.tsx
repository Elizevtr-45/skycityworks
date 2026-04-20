import { Award, Briefcase, Wallet, Clock } from "lucide-react";

const items = [
  { icon: Award, title: "5+ лет опыта", text: "На рынке Владивостока" },
  { icon: Briefcase, title: "120+ проектов", text: "Сданы и заселены" },
  { icon: Wallet, title: "Фиксированная цена", text: "Без скрытых доплат" },
  { icon: Clock, title: "Соблюдение сроков", text: "Прописано в договоре" },
];

export function TrustBlock() {
  return (
    <section className="bg-dark py-16 md:py-20">
      <div className="container-px mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {items.map((it, i) => (
          <div key={it.title} className="reveal flex flex-col items-start" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="h-14 w-14 rounded-sm border border-primary/40 flex items-center justify-center mb-4">
              <it.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="font-display font-bold uppercase text-white text-lg md:text-xl">{it.title}</div>
            <div className="text-white/60 text-sm mt-1">{it.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
