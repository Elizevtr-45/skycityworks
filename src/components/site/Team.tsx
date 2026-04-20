import { SectionHeader } from "./SectionHeader";

const team = [
  { name: "Алексей Воронов", role: "Основатель, прораб" },
  { name: "Мария Левина", role: "Главный дизайнер" },
  { name: "Игорь Седов", role: "Технический директор" },
  { name: "Ольга Нестерова", role: "Менеджер проектов" },
];

export function Team() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader eyebrow="Команда" title="Наша команда" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <div key={m.name} className="reveal text-center" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-muted to-accent/20 rounded-sm mb-4 relative overflow-hidden hover-lift">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-bold text-7xl text-primary/40">
                    {m.name.charAt(0)}
                  </span>
                </div>
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
