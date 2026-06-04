import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/hero-interior.jpg";
import bathroom from "@/assets/bathroom-premium-1.jpg";
import furniture from "@/assets/furniture.jpg";

const services = [
  {
    key: "turnkey",
    name: "Ремонт квартир «под ключ»",
    title: "Ремонт квартир «под ключ»",
    text: "Мы берём на себя все этапы: демонтаж, черновые и чистовые работы, инженерия, чистовая отделка и уборка.",
    bullets: [
      "Экономия до 20% — материалы и работы оптимизированы",
      "Единая ответственность — никаких поисков смежников",
      "Поэтапная оплата — после подписания акта приёмки этапа",
    ],
    image: portfolio1,
  },
  {
    key: "design",
    name: "Дизайн-проект",
    title: "Разработка дизайн-проекта",
    text: "Авторский дизайн-проект с 3D-визуализацией, рабочими чертежами и подбором материалов.",
    bullets: [
      "3D-визуализация каждой комнаты",
      "Полный пакет рабочих чертежей",
      "Спецификация мебели и материалов",
    ],
    image: portfolio2,
  },
  {
    key: "bathroom",
    name: "Ремонт санузла",
    title: "Ремонт санузла «под ключ»",
    text: "Премиальные санузлы с гидроизоляцией, скрытым монтажом и работой с керамогранитом любого формата.",
    bullets: [
      "Гидроизоляция и шумоизоляция",
      "Скрытые инсталляции, чистая геометрия",
      "Работа с крупноформатным керамогранитом",
    ],
    image: bathroom,
  },
  {
    key: "furniture",
    name: "Мебель на заказ",
    title: "Мебель и столешницы из камня",
    text: "Кухни, гардеробные и шкафы по индивидуальным размерам. Столешницы из кварца, акрилового камня и керамогранита.",
    bullets: [
      "Производство во Владивостоке",
      "Столешницы из кварца и керамогранита",
      "Гарантия 2 года, монтаж включён",
    ],
    image: furniture,
  },
];

export function RedesignServices() {
  const [active, setActive] = useState(services[0].key);
  const current = services.find((s) => s.key === active) ?? services[0];

  return (
    <section id="services" className="bg-black py-16 md:py-24 border-t border-white/5">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-10 md:mb-14">
          <div className="text-[#FF6A00] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Услуги
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            Полный <span className="text-[#FF6A00]">спектр услуг</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {services.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`px-5 h-11 rounded-full text-sm font-medium transition-colors border ${
                active === s.key
                  ? "bg-[#FF6A00] border-[#FF6A00] text-white"
                  : "bg-transparent border-white/15 text-white/75 hover:border-white/40 hover:text-white"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <div className="p-6 md:p-10 flex flex-col">
            <span className="text-xs uppercase tracking-wider text-white/45">Услуга</span>
            <h3 className="mt-2 font-display text-2xl md:text-4xl font-bold text-white">
              {current.title}
            </h3>
            <p className="mt-4 text-white/75 leading-relaxed">{current.text}</p>

            <div className="mt-6">
              <div className="text-sm text-white/60 mb-3">Почему стоит заказать комплекс:</div>
              <ul className="space-y-2.5">
                {current.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-white/85 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-[#FF6A00] mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-[#FF6A00] text-white font-semibold hover:bg-[#ff7a1f] transition-colors"
              >
                Выбрать эту услугу
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-white/20 text-white font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Посмотреть работы
              </a>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-[460px]">
            <img
              src={current.image}
              alt={current.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
