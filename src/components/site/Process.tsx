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
    <section id="process" className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader eyebrow="Процесс" title="Как мы работаем" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal relative bg-card border border-border p-6 rounded-sm hover-lift"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-display font-bold text-5xl text-primary/30 mb-3">{s.n}</div>
              <div className="font-display font-bold uppercase text-lg mb-2">{s.title}</div>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
