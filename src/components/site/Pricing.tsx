import { useMemo, useState } from "react";
import {
  Check,
  Clock,
  ShieldCheck,
  Lock,
  Sparkles,
  Crown,
  Wrench,
  Settings2,
  ChevronDown,
  Paintbrush,
  Layers,
  Eye,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Slider } from "@/components/ui/slider";

type TierId = "econom" | "basic" | "premium";

type Tier = {
  id: TierId;
  name: string;
  tagline: string;
  pricePerM2: number;
  forWho: string;
  features: string[];
  trust: { icon: typeof Clock; label: string; value: string }[];
  highlight: string;
  featured: boolean;
  icon: typeof Sparkles;
};

const tiers: Tier[] = [
  {
    id: "econom",
    name: "Эконом",
    tagline: "Под сдачу или базовое обновление — без переплат",
    pricePerM2: 22000,
    forWho:
      "Инвестиционные квартиры под аренду, новостройки, базовое обновление интерьера в полном объёме.",
    features: [
      "Кладка перегородок (пеноблок / ПГП) с армированием каждые 2 ряда",
      "Штукатурка по маякам, вывод углов под 90° на кухне и в санузле",
      "Полусухая или цементно-песчаная стяжка с демпфер-лентой",
      "Электромонтаж ВВГнг-LS, сборка щита с УЗО и автоматами",
      "Шпатлевка в 2–3 слоя под плотные обои или обои под покраску",
      "Укладка ламината / кварцвинила / линолеума с декоративными порожками",
      "Санузел: гидроизоляция, тройниковая разводка, плитка до 60×60",
      "Классический напольный унитаз, стандартная ванна и раковина",
    ],
    trust: [
      { icon: Clock, label: "Срок", value: "от 2 мес." },
      { icon: Lock, label: "Цена", value: "Фикс в договоре" },
      { icon: ShieldCheck, label: "Гарантия", value: "2 года" },
    ],
    highlight: "Надёжная база без визуальных излишеств — идеально под сдачу.",
    featured: false,
    icon: Wrench,
  },
  {
    id: "basic",
    name: "Базовый",
    tagline: "Современные тренды без излишеств — выбор большинства",
    pricePerM2: 25000,
    forWho:
      "Современное жильё «для себя»: скрытые двери, единый пол без порогов, стены под покраску. Без избыточной инженерии.",
    features: [
      "Весь объём работ тарифа «Эконом»",
      "Шпатлевание под покраску с проклейкой стеклохолстом",
      "Двери скрытого монтажа на алюминиевом коробе заподлицо со стеной",
      "Паркет / инженерная доска единым контуром без порогов",
      "Теневой плинтус — эффект «парящих стен»",
      "Санузел: керамогранит 60×60 или 60×120, единый уровень с коридором",
      "Скрытая инсталляция подвесного унитаза",
    ],
    trust: [
      { icon: Clock, label: "Срок", value: "от 3 мес." },
      { icon: Lock, label: "Цена", value: "Фикс в договоре" },
      { icon: ShieldCheck, label: "Гарантия", value: "3 года + пожизн." },
    ],
    highlight: "Выбор 7 из 10 клиентов — баланс эстетики и бюджета.",
    featured: true,
    icon: Sparkles,
  },
  {
    id: "premium",
    name: "Премиум",
    tagline: "Эксклюзив / High-End по индивидуальному дизайн-проекту",
    pricePerM2: 45000,
    forWho:
      "Бескомпромиссный ремонт экстра-класса: сложные материалы, климат-контроль, автоматизация, безупречная инженерия.",
    features: [
      "Весь объём работ «Эконом» и «Базовый»",
      "Идеальные стены под покраску с приёмкой под «Лампу Лосева»",
      "Авторская декор. штукатурка, шпон, камень, латунные / хром-вставки",
      "Канальный кондиционер, скрытая приточно-вытяжная вентиляция",
      "Внутрипольные конвекторы вдоль панорамных окон",
      "Коллекторная разводка водоснабжения — стабильный напор во всех точках",
      "Облицовка крупноформатным керамогранитом 120×120 / 120×240",
      "Запил внешних углов под 45° без накладных уголков",
      "Скрытый смеситель экстра-класса для ванны",
    ],
    trust: [
      { icon: Clock, label: "Срок", value: "по проекту" },
      { icon: Lock, label: "Цена", value: "Фикс, без доплат" },
      { icon: ShieldCheck, label: "Гарантия", value: "5 лет + пожизн." },
    ],
    highlight: "Для тех, кто хочет уникальный интерьер «под себя».",
    featured: false,
    icon: Crown,
  },
];

const paintGuide = [
  {
    id: "standard",
    title: "Стандарт",
    subtitle: "Под матовую краску / фактурные обои",
    forWho:
      "Под обои под покраску или глубокоматовые краски с классическим люстровым освещением.",
    how: "Шпатлевка в 2 слоя, базовая шлифовка, грунт и финишная краска.",
    result: "Ровные стены без явных дефектов — нюансы скрыты матовой текстурой.",
    price: "Включено в «Базовый» · +2 500 ₽/м² для «Эконом»",
    icon: Paintbrush,
    accent: false,
  },
  {
    id: "comfort",
    title: "Комфорт",
    subtitle: "Под покраску с защитой от микротрещин",
    forWho:
      "Большинство современных интерьеров с гладкими однотонными стенами.",
    how: "Армирование стеклохолстом + 2 слоя финишной шпатлевки и шлифовка под обычным светом.",
    result: "Идеально гладкая поверхность, защищённая от трещин при усадке дома.",
    price: "+5 000 ₽/м² (апгрейд)",
    icon: Layers,
    accent: true,
  },
  {
    id: "premium",
    title: "Премиум",
    subtitle: "Приёмка под «Лампу Лосева»",
    forWho:
      "Скользящий свет (LED-ленты, скрытая подсветка, панорамные окна) и полуглянцевые краски.",
    how: "Шпатлевка и шлифовка с прожектором Лампы Лосева вдоль стены — устраняются микронные изъяны.",
    result: "Эффект зеркала / яичной скорлупы под любым футуристичным светом.",
    price: "Включено в «Премиум» · +7 500 ₽/м² (апгрейд)",
    icon: Eye,
    accent: false,
  },
];

const presets = [30, 45, 60, 80, 100, 120];
const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export function Pricing() {
  const [area, setArea] = useState<number>(60);
  const [openTier, setOpenTier] = useState<TierId | null>("basic");

  const selectTier = (tierId: string, tierName: string) => {
    window.dispatchEvent(
      new CustomEvent("open-lead-form", {
        detail: { tier: tierId, tierName, source: `pricing-${tierId}`, area },
      }),
    );
  };

  const scrollToCalc = (tierId: TierId) => {
    window.dispatchEvent(
      new CustomEvent("calc-preset-tier", { detail: { tier: tierId, area } }),
    );
    const el = document.getElementById("calculator");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totals = useMemo(
    () => tiers.map((t) => ({ id: t.id, total: t.pricePerM2 * area })),
    [area],
  );

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 md:scroll-mt-32 py-20 md:py-32 bg-aurora-orange overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_15%_15%,_oklch(0.72_0.2_50/0.05),_transparent_55%),radial-gradient(circle_at_85%_85%,_oklch(0.62_0.21_35/0.04),_transparent_55%)]" />
      <div className="relative container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Тарифы"
          title="Три тарифа под ключ"
          subtitle="Эконом · Базовый · Премиум. Цена фиксируется в договоре. Двигайте площадь — стоимость пересчитается мгновенно."
          center
        />

        {/* UX-маркер: санузел в каждом тарифе */}
        <div className="reveal max-w-4xl mx-auto mb-8 sm:mb-10 -mt-4 rounded-2xl border border-primary/30 bg-primary/5 px-5 sm:px-6 py-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground">В каждый тариф уже включён полный цикл санузла под ключ</span>{" "}
            — отделочные и инженерные работы. Мы не скрываем стоимость самой сложной зоны
            квартиры. Чистовой потолок (натяжной / подвесной) рассчитывается отдельно — он зависит
            от сценариев освещения.
          </p>
        </div>

        {/* Area calculator */}
        <div className="reveal liquid-glass max-w-3xl mx-auto mb-10 sm:mb-12 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <div className="text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-1.5">
                Калькулятор площади
              </div>
              <div className="font-display font-bold uppercase text-base sm:text-lg text-foreground">
                Площадь квартиры
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 shrink-0">
              <span className="font-display font-black text-4xl sm:text-5xl text-gradient-gold leading-none">
                {area}
              </span>
              <span className="text-muted-foreground text-sm">м²</span>
            </div>
          </div>

          <Slider
            value={[area]}
            min={20}
            max={200}
            step={1}
            onValueChange={(v) => setArea(v[0] ?? 60)}
            aria-label="Площадь квартиры в квадратных метрах"
            className="mb-5"
          />

          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setArea(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                  area === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/5 text-foreground/80 border-white/10 hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {p} м²
              </button>
            ))}
          </div>
        </div>

        {/* Accordion-style tier cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:pt-4 items-start">
          {tiers.map((t, i) => {
            const total = totals.find((x) => x.id === t.id)?.total ?? 0;
            const Icon = t.icon;
            const isOpen = openTier === t.id;
            return (
              <div
                key={t.id}
                className={`group reveal relative liquid-glass rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col transition-all duration-500 ${
                  t.featured
                    ? "ring-accent md:-translate-y-4 sm:col-span-2 md:col-span-1"
                    : ""
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 sm:px-4 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap shadow-[0_8px_24px_-8px_oklch(0.72_0.2_50/0.7)]">
                    <Sparkles className="h-3 w-3" /> Популярный
                  </div>
                )}

                <div className="relative flex items-center gap-2.5 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="font-display font-bold uppercase text-lg sm:text-xl text-foreground">
                    {t.name}
                  </div>
                </div>
                <div className="relative text-xs sm:text-sm text-muted-foreground mb-5 leading-snug">
                  {t.tagline}
                </div>

                <div className="relative mb-4">
                  <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-primary leading-none">
                      от {fmt(t.pricePerM2)}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">₽ / м²</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      за {area} м²
                    </span>
                    <span className="font-display font-bold text-xl text-foreground">
                      ≈ {fmt(total)} ₽
                    </span>
                  </div>
                </div>

                <div className="relative text-xs sm:text-sm italic leading-snug text-muted-foreground/90 mb-5 pb-5 border-b border-white/10">
                  {t.forWho}
                </div>

                <div className="relative grid grid-cols-3 gap-1.5 sm:gap-2 mb-5 pb-5 border-b border-white/10">
                  {t.trust.map((tr) => {
                    const TIcon = tr.icon;
                    return (
                      <div
                        key={tr.label}
                        className="flex flex-col items-center text-center px-1 py-2 rounded-xl transition-colors duration-300 min-w-0 group-hover:bg-primary/10"
                      >
                        <TIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1.5 shrink-0" />
                        <div className="text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 text-muted-foreground">
                          {tr.label}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-semibold leading-tight break-words text-foreground">
                          {tr.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Accordion toggle */}
                <button
                  type="button"
                  onClick={() => setOpenTier(isOpen ? null : t.id)}
                  aria-expanded={isOpen}
                  aria-controls={`tier-features-${t.id}`}
                  className="relative flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all mb-4"
                >
                  <span className="text-left">
                    <span className="block font-display font-bold uppercase tracking-wider text-[11px] sm:text-xs text-foreground">
                      Что входит в стоимость
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">
                      {isOpen ? "Скрыть детали" : "Раскрыть подробный список работ"}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id={`tier-features-${t.id}`}
                  className={`relative grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mb-5"
                      : "grid-rows-[0fr] opacity-0 mb-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2.5 pt-1">
                      {t.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 sm:gap-3 text-sm leading-snug text-foreground/90"
                        >
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-[11px] italic text-muted-foreground mt-4 pt-4 border-t border-white/10">
                      Монтаж чистового потолка не входит в стоимость — считается отдельно по
                      выбранной системе освещения.
                    </div>
                  </div>
                </div>

                <div className="relative text-xs sm:text-sm italic leading-relaxed border-l-2 border-primary pl-3 mb-6 text-muted-foreground">
                  {t.highlight}
                </div>

                <div className="relative mt-auto flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => selectTier(t.id, t.name)}
                    className={`block w-full text-center px-3 sm:px-6 py-3 font-semibold uppercase tracking-wide sm:tracking-wider text-xs sm:text-sm rounded-xl transition-all hover:-translate-y-0.5 leading-tight ${
                      t.featured
                        ? "btn-cta hover:btn-cta-hover"
                        : "bg-white/10 text-foreground hover:bg-cta hover:text-cta-foreground"
                    }`}
                  >
                    <span className="hidden sm:inline">Выбрать «{t.name}»</span>
                    <span className="sm:hidden">Выбрать тариф</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToCalc(t.id)}
                    className="flex items-center justify-center gap-2 w-full text-center px-3 py-2.5 font-semibold uppercase tracking-wider text-[11px] sm:text-xs rounded-xl border border-primary/40 text-primary hover:bg-primary/10 transition-all"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                    Сконфигурировать под себя
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paint guide */}
        <div className="reveal mt-16 sm:mt-20">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <div className="text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-2">
              Гайд по покраске стен
            </div>
            <h3 className="font-display font-bold uppercase text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Три уровня подготовки стен под краску
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Качество подготовки стен напрямую зависит от планируемого освещения. Выбирайте
              уровень — апгрейд можно добавить в калькуляторе ниже.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {paintGuide.map((g) => {
              const GIcon = g.icon;
              return (
                <div
                  key={g.id}
                  className={`liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col ${
                    g.accent ? "ring-accent" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <GIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-display font-bold uppercase text-base sm:text-lg text-foreground leading-tight">
                        {g.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
                        {g.subtitle}
                      </div>
                    </div>
                  </div>

                  <dl className="space-y-3 mb-5 text-sm leading-snug">
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold mb-1">
                        Для чего
                      </dt>
                      <dd className="text-foreground/90">{g.forWho}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold mb-1">
                        Как делаем
                      </dt>
                      <dd className="text-foreground/90">{g.how}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-primary/80 font-semibold mb-1">
                        Результат
                      </dt>
                      <dd className="text-foreground/90">{g.result}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-4 border-t border-white/10 text-[12px] sm:text-sm font-semibold text-primary">
                    {g.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free measurement CTA */}
        <div className="reveal liquid-glass max-w-3xl mx-auto mt-12 sm:mt-16 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-1.5">
              Бесплатно
            </div>
            <div className="font-display font-bold uppercase text-lg sm:text-xl md:text-2xl leading-tight text-foreground">
              Осмотр · Замер · Смета
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm mt-1.5">
              Без обязательств. Выезд по Приморскому краю.
            </div>
          </div>
          <button
            type="button"
            onClick={() => selectTier("free-measure", "Бесплатный замер")}
            className="btn-cta hover:btn-cta-hover px-5 sm:px-6 py-3 font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-xl text-center whitespace-nowrap"
          >
            Вызвать замерщика
          </button>
        </div>
      </div>
    </section>
  );
}
