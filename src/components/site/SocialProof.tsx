const complexes = [
  "Айвазовский", "Восточный Луч", "Маринист", "Семь Ветров", "Da Vinci",
  "Аквамарин", "Чайка", "Босфорский", "Облака", "Зелёный Угол",
  "Тихий", "ДНС Сити", "Формат", "MORE", "Молодёжный",
  "Посейдония", "Андерсен", "Весна", "Фьорд", "Novatoria",
  "LDV", "Стрижи", "Сады Маковского", "Амурский", "Zaliv",
  "Каштановый Двор", "Новый Век", "Сабанеевский", "Парус", "Регент",
  "Тихая Гавань", "Адмирал", "Маяк", "Олимп", "Жемчужина",
  "Светлый", "Изумруд", "Артемида", "Восход", "Панорама",
  "Триумф", "Гранд Парк", "Солнечный", "Берёзовый", "Рассвет",
];

export function SocialProof() {
  const loop = [...complexes, ...complexes];

  return (
    <section className="py-14 md:py-16 bg-background overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <span className="text-foreground/60 uppercase tracking-[0.3em] text-xs font-semibold">
            ЖК, в которых мы работаем
          </span>
        </div>
      </div>

      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 px-8 md:px-10 text-foreground/85 hover:text-primary transition-colors shrink-0"
            >
              <span className="font-display uppercase tracking-[0.15em] text-base md:text-lg font-semibold">
                ЖК «{name}»
              </span>
              <span className="text-primary/40 text-lg" aria-hidden>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
