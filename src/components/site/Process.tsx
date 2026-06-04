import { SectionHeader } from "./SectionHeader";

const steps = [
  { n: "01", title: "Заявка", text: "Оставляете заявку на сайте или по телефону." },
  { n: "02", title: "Замер", text: "Бесплатный выезд на объект и техническое задание." },
  { n: "03", title: "Договор", text: "Фиксированная смета, сроки и гарантии." },
  { n: "04", title: "Ремонт", text: "Работаем по графику с еженедельной отчётностью." },
  { n: "05", title: "Сдача", text: "Принимаете готовую квартиру и получаете гарантию." },
];

export function Process() {
  return (
    <section id="process" className="relative pt-0 pb-20 md:pb-32 bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_50%_0%,_oklch(0.72_0.2_50/0.10),_transparent_60%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <SectionHeader eyebrow="Процесс" title="Как мы работаем" center />
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group relative liquid-glass p-6 rounded-2xl hover-lift overflow-hidden transition-all duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative font-display font-black text-6xl text-gradient-gold mb-3 leading-none group-hover:scale-110 origin-left transition-transform duration-500">{s.n}</div>
              <div className="relative font-display font-bold uppercase text-lg mb-2 text-foreground">{s.title}</div>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
