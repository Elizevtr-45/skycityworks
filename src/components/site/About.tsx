import { Building2, ShieldCheck, FileCheck, UserCheck } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const values = [
  { icon: Building2, title: "Полный спектр услуг", text: "От\u00A0малоэтажного строительства до\u00A0премиальной\u00A0отделки." },
  { icon: ShieldCheck, title: "Стандарты надёжности", text: "Каждое действие регламентировано строгими стандартами." },
  { icon: FileCheck, title: "Прозрачные договоры", text: "Чёткие условия, фиксированные сроки и\u00A0цены." },
  { icon: UserCheck, title: "Персональный контроль", text: "На\u00A0каждом этапе реализации проекта." },
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
              {"СКАЙСИТИ\u00A0— где качество "}<span className="text-gradient-gold">встречается</span>{" с\u00A0архитектурной точностью"}
            </h2>
          </div>
          <div className="reveal text-white/75 text-base md:text-lg leading-relaxed space-y-4">
            <p>
              СКАЙСИТИ — строительная компания полного цикла во Владивостоке.
              Выполняем ремонт квартир под ключ во всех районах города: Первореченский,
              Ленинский, Фрунзенский, Советский, Первомайский — Эгершельд, Чуркин,
              Снеговая Падь, Патрокл, Седанка, Вторая Речка, Тихая, Зелёный Угол.
              Дополнительно выезжаем в Артём, Уссурийск и Находку.
            </p>
            <p>
              Делаем ремонт в новостройках Владивостока — ЖК «Айвазовский», «Восточный Луч»,
              «Маринист», «Семь Ветров», «Da Vinci», «Аквамарин», «Чайка», «Босфорский»,
              «Облака» — и на вторичке: от студий и однокомнатных до больших квартир.
              Три пакета: эконом, стандарт, премиум — цена за квадратный метр фиксируется
              в договоре и не меняется по ходу работ.
            </p>
            <p>
              Параллельно с ремонтом изготавливаем мебель на заказ, столешницы из камня и
              изделия из керамогранита — собственное производство во Владивостоке. Жилищное
              строительство, отделочные и ремонтно-строительные работы — всё одной бригадой,
              под персональным контролем.
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
