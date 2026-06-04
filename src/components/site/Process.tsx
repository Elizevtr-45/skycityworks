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
    <section id="process" className="pt-0 pb-20 md:pb-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader eyebrow="Процесс" title="Как мы работаем" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal relative surface-elevated p-6 rounded-2xl hover-lift overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent opacity-60" />
              <div className="font-display font-black text-6xl text-gradient-gold mb-3 leading-none">{s.n}</div>
              <div className="font-display font-bold uppercase text-lg mb-2 text-foreground">{s.title}</div>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
