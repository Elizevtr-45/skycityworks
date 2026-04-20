import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import { SectionHeader } from "./SectionHeader";

const projects = [
  { img: p1, title: "ЖК «Маринист»", type: "2-комнатная · 68 м²", price: "от 1 850 000 ₽" },
  { img: p2, title: "ЖК «Аквамарин»", type: "Кухня-гостиная · 42 м²", price: "от 1 120 000 ₽" },
  { img: p3, title: "ЖК «Жемчужина»", type: "3-комнатная · 92 м²", price: "от 2 480 000 ₽" },
  { img: p4, title: "ЖК «Босфор»", type: "Санузел премиум · 9 м²", price: "от 480 000 ₽" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-dark">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          light
          eyebrow="Портфолио"
          title="Наши реализованные проекты"
          subtitle="Каждый проект — это история, рассказанная через материалы, свет и пропорции."
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="reveal group relative overflow-hidden rounded-sm aspect-[4/3] cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <img
                src={p.img}
                alt={p.title}
                width={1024}
                height={768}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-primary uppercase tracking-widest text-xs mb-2">{p.type}</div>
                <h3 className="font-display font-bold uppercase text-white text-xl md:text-2xl">{p.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-white/80 text-sm">{p.price}</span>
                  <span className="text-primary text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Смотреть →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
