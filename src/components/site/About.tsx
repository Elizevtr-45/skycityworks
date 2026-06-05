import { Building2, ShieldCheck, FileCheck, UserCheck } from "lucide-react";

const values = [
  { icon: Building2, title: "Полный спектр услуг", text: "От\u00A0малоэтажного строительства до\u00A0премиальной\u00A0отделки." },
  { icon: ShieldCheck, title: "Стандарты надёжности", text: "Каждое действие регламентировано строгими стандартами." },
  { icon: FileCheck, title: "Прозрачные договоры", text: "Чёткие условия, фиксированные сроки и\u00A0цены." },
  { icon: UserCheck, title: "Персональный контроль", text: "На\u00A0каждом этапе реализации проекта." },
];

const stats = [
  { n: "7+", t: "лет на рынке" },
  { n: "2800+", t: "сданных проектов" },
  { n: "12+", t: "объектов в работе" },
  { n: "100%", t: "цена в договоре" },
];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 bg-grid-orange text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(circle_at_85%_15%,_oklch(0.72_0.2_50/0.18),_transparent_55%),radial-gradient(circle_at_10%_85%,_oklch(0.62_0.21_35/0.14),_transparent_55%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="reveal lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="gold-divider" />
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">О компании</span>
            </div>
            <h2 className="font-display font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
              {"СКАЙСИТИ\u00A0— где качество "}<span className="text-gradient-gold">встречается</span>{" с\u00A0архитектурной точностью"}
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.t} className="liquid-glass rounded-2xl p-5">
                  <div className="font-display font-black text-3xl md:text-4xl text-gradient-gold leading-none">{s.n}</div>
                  <div className="mt-2 text-white/65 text-[11px] uppercase tracking-[0.18em]">{s.t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal lg:col-span-7 text-white/80 text-base md:text-lg leading-relaxed space-y-5">
            <p>
              СКАЙСИТИ — строительная компания полного цикла во Владивостоке.
              Выполняем ремонт квартир под ключ во всех районах города и в новостройках:
              капитальный, косметический, дизайнерский, черновой и чистовой.
            </p>
            <p>
              Три пакета: эконом, стандарт, премиум — цена за квадратный метр фиксируется
              в договоре и не меняется по ходу работ. Работаем со студиями, однушками
              и большими квартирами — в новостройках и на вторичке.
            </p>
            <p>
              Параллельно с ремонтом изготавливаем мебель на заказ, столешницы из камня и
              изделия из керамогранита — собственное производство во Владивостоке.
              Всё одной бригадой, под персональным контролем.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="liquid-glass group rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-500"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/15 ring-1 ring-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:ring-primary transition-all duration-500">
                      <v.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-bold uppercase text-sm text-white">{v.title}</div>
                      <div className="text-white/60 text-sm mt-1 leading-snug">{v.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
