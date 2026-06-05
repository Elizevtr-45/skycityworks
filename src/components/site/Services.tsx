import { PenTool, Hammer, Paintbrush, Eye } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const services = [
  { icon: PenTool, title: "Дизайн-проект", text: "Планировка, 3D-визуализация, проект ремонта квартиры и подбор материалов под ваш стиль." },
  { icon: Hammer, title: "Черновые работы", text: "Демонтаж, стяжка, штукатурка, инженерные сети — черновой ремонт квартиры в новостройке и на вторичке." },
  { icon: Paintbrush, title: "Чистовая отделка", text: "Покраска, обои, плитка, керамогранит, напольные покрытия — отделочные работы под ключ." },
  { icon: Eye, title: "Авторский надзор", text: "Контроль соответствия проекту и качеству на каждом этапе ремонтно-строительных работ." },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-lines-orange">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Что мы делаем"
          title="Планируйте новоселье — ремонт мы возьмем на себя"
          subtitle="Капитальный, косметический и дизайнерский ремонт во Владивостоке — от первого эскиза до сдачи под ключ."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal hover-lift group surface-elevated p-8 rounded-2xl relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-14 w-14 rounded-xl bg-primary/15 ring-1 ring-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:ring-primary transition-all">
                <s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="relative font-display font-bold uppercase text-lg mb-3 text-foreground">{s.title}</h3>
              <p className="relative text-muted-foreground text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
