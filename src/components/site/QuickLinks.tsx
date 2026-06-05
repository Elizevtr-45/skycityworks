import { Calculator, Wallet, Images, Wrench, Sofa, ClipboardList, MessageSquare, Building2, Phone } from "lucide-react";

const links = [
  {
    href: "#calculator",
    icon: Calculator,
    title: "Калькулятор ремонта",
    subtitle: "Рассчитайте стоимость за 30 секунд",
    badge: "Бесплатно",
    cta: "Рассчитать",
  },
  {
    href: "#pricing",
    icon: Wallet,
    title: "Тарифы ремонта",
    subtitle: "Эконом, стандарт, премиум — цена в договоре",
    badge: "от 9 900 ₽/м²",
    cta: "Смотреть цены",
  },
  {
    href: "#portfolio",
    icon: Images,
    title: "Реальные объекты",
    subtitle: "2800+ выполненных ремонтов — смотрите фото до и после",
    badge: "2800+",
    cta: "В портфолио",
  },
  {
    href: "#services",
    icon: Wrench,
    title: "Все услуги",
    subtitle: "Дизайн, черновые, чистовые — всё под ключ",
    badge: "Под ключ",
    cta: "Подробнее",
  },
  {
    href: "#furniture",
    icon: Sofa,
    title: "Мебель на заказ",
    subtitle: "Кухни, шкафы-купе, столешницы из камня и керамогранита",
    badge: "Кэшбэк 10%",
    cta: "Заказать",
  },
  {
    href: "#process",
    icon: ClipboardList,
    title: "Как мы работаем",
    subtitle: "7 этапов — от замера до заселения, гарантия 2 года",
    badge: "Гарантия",
    cta: "Узнать",
  },
  {
    href: "#reviews",
    icon: MessageSquare,
    title: "Отзывы клиентов",
    subtitle: "Что говорят владельцы квартир во Владивостоке",
    badge: "4.9 / 5",
    cta: "Читать",
  },
  {
    href: "#about",
    icon: Building2,
    title: "О компании",
    subtitle: "СКАЙСИТИ — 7+ лет, более 100 специалистов в Приморье",
    badge: "С 2018 года",
    cta: "О нас",
  },
  {
    href: "#contact",
    icon: Phone,
    title: "Бесплатный замер",
    subtitle: "Выезд мастера сегодня — Владивосток, Артём, Уссурийск, Находка",
    badge: "Сегодня",
    cta: "Записаться",
  },
];

export function QuickLinks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3">
            Быстрые переходы
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Выберите, что вам нужно — и переходите сразу к делу
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="reveal group relative flex flex-col bg-card border border-border rounded-sm p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Badge */}
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-foreground/10 text-foreground px-2.5 py-1 rounded-sm border border-foreground/15">
                {link.badge}
              </span>

              {/* Icon */}
              <div className="h-11 w-11 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <link.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-lg mb-1.5 group-hover:text-primary transition-colors">
                {link.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {link.subtitle}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                {link.cta}
                <svg
                  className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
