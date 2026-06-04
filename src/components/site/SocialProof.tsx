const complexes = [
  "ДНС Сити",
  "Формат",
  "MORE",
  "Молодёжный",
  "Посейдония",
  "Андерсен",
  "Весна",
  "Айвазовский",
  "Восточный Луч",
  "Маринист",
  "Семь Ветров",
  "Da Vinci",
  "Аквамарин",
  "Босфорский",
  "Чайка",
  "Облака",
];

export function SocialProof() {
  // Duplicate for seamless loop
  const loop = [...complexes, ...complexes];

  return (
    <section className="py-16 md:py-20 bg-dark border-y border-white/5 overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
              ЖК, в которых мы работаем
            </span>
            <span className="gold-divider" />
          </div>
        </div>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-12 md:gap-16 animate-marquee whitespace-nowrap">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 text-white/40 hover:text-primary transition-colors shrink-0"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                className="shrink-0"
                aria-hidden
              >
                <path
                  d="M4 28V14L16 5l12 9v14h-8v-9h-8v9H4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display uppercase tracking-[0.18em] text-lg md:text-xl font-semibold">
                ЖК «{name}»
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
