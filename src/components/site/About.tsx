import { Building2, ShieldCheck, FileCheck, UserCheck } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const values = [
  { icon: Building2, title: "Полный спектр услуг", text: "От малоэтажного строительства до премиальной отделки." },
  { icon: ShieldCheck, title: "Стандарты надёжности", text: "Каждое действие регламентировано строгими стандартами." },
  { icon: FileCheck, title: "Прозрачные договоры", text: "Чёткие условия, фиксированные сроки и цены." },
  { icon: UserCheck, title: "Персональный контроль", text: "На каждом этапе реализации проекта." },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-dark text-white">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <span className="gold-divider" />
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">О компании</span>
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
              СКАЙСИТИ — где качество <span className="text-gradient-gold">встречается</span> с архитектурной точностью
            </h2>
          </div>
          <div className="reveal text-white/75 text-base md:text-lg leading-relaxed space-y-4">
            <p>
              Строительная компания полного спектра услуг, специализирующаяся на создании
              объектов, где безупречное качество встречается с архитектурной точностью.
            </p>
            <p>
              Мы объединяем многолетний опыт в малоэтажном строительстве и премиальной отделке,
              чтобы предлагать решения «под ключ», избавляющие заказчика от любых забот.
            </p>
            <p>
              Каждое наше действие регламентировано строгими стандартами надёжности, прозрачностью
              договорных отношений и персональным контролем на каждом этапе реализации.
            </p>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="reveal border border-white/10 bg-white/5 p-6 hover:border-primary/40 transition-colors"
              style={{ transitionDelay: `${i * 80}ms`, borderRadius: "10px" }}
            >
              <div className="h-12 w-12 rounded-sm bg-primary/15 flex items-center justify-center mb-4">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-display font-bold uppercase text-base mb-2">{v.title}</div>
              <div className="text-white/60 text-sm leading-relaxed">{v.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
