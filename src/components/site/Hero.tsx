export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-hero-orange">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
        <div className="absolute -top-24 -right-24 h-[60vw] max-h-[520px] w-[60vw] max-w-[520px] rounded-full bg-primary/25 blur-[100px]" />
        <div className="absolute -bottom-24 -left-16 h-[55vw] max-h-[420px] w-[55vw] max-w-[420px] rounded-full bg-accent/25 blur-[100px]" />
      </div>

      <div className="relative container-px mx-auto max-w-7xl pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl reveal is-visible">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="gold-divider" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              СКАЙСИТИ · Приморский край
            </span>
          </div>

          <h1 className="font-display font-bold uppercase text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] break-words">
            <span className="block">Ремонт квартир</span>
            <span className="block">{"под\u00A0ключ"}</span>
            <span className="block text-gradient-gold">{"во\u00A0Владивостоке"}</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            {"Ремонт квартир во\u00A0Владивостоке без переплат — во\u00A0всех районах города и\u00A0новостройках: ЖК «Айвазовский», «Восточный Луч», «Маринист», «Семь Ветров», «Da\u00A0Vinci». Эконом, стандарт, премиум — цена фиксируется в\u00A0договоре. Скидка 10% участникам СВО, кэшбэк\u00A010%."}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all duration-300 hover:shadow-[0_10px_40px_-10px_oklch(0.7_0.08_65/0.6)] hover:-translate-y-0.5"
            >
              Рассчитать стоимость
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-white hover:text-dark transition-all duration-300"
            >
              Получить консультацию
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl">
            {[
              { n: "7+", t: "лет опыта" },
              { n: "2800+", t: "проектов" },
              { n: "2 года", t: "гарантии" },
            ].map((s) => (
              <div key={s.t}>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">{s.n}</div>
                <div className="text-white/70 text-xs md:text-sm uppercase tracking-wider mt-1">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
