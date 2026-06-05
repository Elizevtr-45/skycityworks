import { Play } from "lucide-react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-3.jpg";
import p3 from "@/assets/portfolio-4.jpg";
import { SectionHeader } from "./SectionHeader";

const videos = [
  { img: p1, title: "Обзор готовой квартиры под ключ", duration: "08:24" },
  { img: p2, title: "Как мы делаем чистовую отделку", duration: "12:10" },
  { img: p3, title: "Премиум санузел: материалы и технологии", duration: "06:48" },
];

export function VideoBlog() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Видео и блог"
          title="Показываем проекты и делимся опытом"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <div
              key={v.title}
              className="reveal group cursor-pointer rounded-sm overflow-hidden bg-card border border-border hover-lift"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={v.img} alt={v.title} loading="lazy" width={1024} height={576}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/50 transition-colors flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-dark/80 text-white text-xs px-2 py-1 rounded-sm">
                  {v.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold uppercase text-base">{v.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
