import { SectionHeader } from "./SectionHeader";
import denisImg from "@/assets/team-denis.png";
import nikolayImg from "@/assets/team-nikolay.png";

const team = [
  { name: "Денис", role: "Основатель / Руководитель", photo: denisImg },
  { name: "Николай", role: "Основатель / Руководитель", photo: nikolayImg },
];

export function Team() {
  return (
    <section className="relative py-20 md:py-32 bg-lines-orange overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_20%_30%,_oklch(0.72_0.2_50/0.10),_transparent_55%),radial-gradient(circle_at_80%_70%,_oklch(0.62_0.21_35/0.08),_transparent_55%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <SectionHeader eyebrow="Команда" title="Наша команда" center />
        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <div key={`${m.name}-${i}`} className="reveal group text-center" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative aspect-[3/4] liquid-glass rounded-2xl mb-5 overflow-hidden hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <img
                  src={m.photo}
                  alt={`${m.name} — ${m.role}, СКАЙСИТИ Владивосток`}
                  title={`${m.name} — ${m.role}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark/60 to-transparent pointer-events-none" />
              </div>
              <div className="font-display font-black uppercase text-xl tracking-wide">{m.name}</div>
              <div className="text-sm text-primary uppercase tracking-[0.2em] mt-2">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
