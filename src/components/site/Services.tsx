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
    <section id="services" className="py-20 md:py-32 bg-background">
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
              className="reveal hover-lift group bg-card border border-border p-8 rounded-sm"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="h-14 w-14 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <s.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-bold uppercase text-lg mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
