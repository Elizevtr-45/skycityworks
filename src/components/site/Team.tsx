import { SectionHeader } from "./SectionHeader";
import denisImg from "@/assets/team-denis.png";
import nikolayImg from "@/assets/team-nikolay.png";

const team = [
  { name: "Денис", role: "Основатель / Руководитель", photo: denisImg },
  { name: "Николай", role: "Основатель / Руководитель", photo: nikolayImg },
];

export function Team() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader eyebrow="Команда" title="Наша команда" center />
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <div key={`${m.name}-${i}`} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-muted to-accent/20 rounded-sm mb-4 relative overflow-hidden hover-lift">
                <img
                  src={m.photo}
                  alt={`${m.name} — ${m.role}, СКАЙСИТИ Владивосток`}
                  title={`${m.name} — ${m.role}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="font-display font-bold uppercase">{m.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
