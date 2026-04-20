export function SocialProof() {
  return (
    <section className="relative py-24 md:py-32 bg-dark overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_var(--primary),_transparent_60%)]" />
      <div className="container-px mx-auto max-w-5xl text-center relative">
        <div className="reveal">
          <div className="font-display font-bold text-7xl md:text-8xl lg:text-9xl text-gradient-gold leading-none">
            2800+
          </div>
          <div className="mt-4 font-display uppercase tracking-[0.3em] text-white text-sm md:text-base">
            Сданных и заселённых проектов
          </div>
          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            За 7+ лет работы мы построили доверие тысяч семей в Приморском крае. Запишитесь на
            экскурсию по действующему объекту и убедитесь в качестве нашей работы лично.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="mt-10 inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_oklch(0.7_0.08_65/0.6)]"
          >
            Записаться на экскурсию
          </button>
        </div>
      </div>
    </section>
  );
}
