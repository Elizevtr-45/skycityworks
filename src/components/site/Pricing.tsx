import { useMemo, useState } from "react";
import { Check, Clock, ShieldCheck, Lock, Sparkles, Crown, Wrench, Settings2 } from "lucide-react";
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
    tagline: "Предчистовой White Box + простая чистовая отделка",
    pricePerM2: 22000,
    forWho:
      "Инвестиционные квартиры под сдачу, коммерческие пространства, надёжная база без переплаты за сложный дизайн.",
    features: [
      "Кладка перегородок (пеноблок / ПГП) с армированием",
      "Штукатурка по маякам, вывод углов под 90°",
      "Полусухая или цементно-песчаная стяжка с демпфер-лентой",
      "Электромонтаж ВВГнг-LS, сборка щита с УЗО",
      "Шпатлевание стен под плотные обои или под покраску",
      "Укладка ламината / кварцвинила со стыковочными порожками",
      "Санузел под ключ: тройниковая разводка, гидроизоляция, плитка 30×30–60×60",
      "Стандартная чистовая сантехника",
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
    tagline: "Комфорт и современный стиль — самый востребованный",
    pricePerM2: 28000,
    forWho:
      "Современное жильё «для себя»: скрытые двери, единый пол без порогов, покраска. Без избыточного инженерного усложнения.",
    features: [
      "Весь объём работ тарифа «Эконом»",
      "Шпатлевание под покраску с проклейкой стеклохолстом",
      "Двери скрытого монтажа на алюминиевом коробе (заподлицо со стеной)",
      "Паркетная / инженерная доска / кварцвинил единым контуром без порогов",
      "Теневой плинтус — эффект «парящих стен»",
      "Санузел: керамогранит 60×60 или 60×120, единый уровень с коридором",
      "Скрытая инсталляция подвесного унитаза",
      "Внутристенный смеситель скрытого монтажа для раковины",
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
    tagline: "Эксклюзив / High-End по дизайн-проекту",
    pricePerM2: 38000,
    forWho:
      "Бескомпромиссный ремонт для ценителей эксклюзивных материалов, сложных решений и умной инженерии.",
    features: [
      "Весь объём работ «Эконом» и «Базовый»",
      "Идеальные стены под покраску с приёмкой под «Лампу Лосева»",
      "Авторская декор. штукатурка, шпон, камень, латунные / хром-вставки",
      "Канальный кондиционер, скрытая приточно-вытяжная вентиляция",
      "Внутрипольные конвекторы вдоль панорамных окон",
      "Коллекторная разводка водоснабжения — стабильный напор во всех точках",
      "Облицовка крупноформатным керамогранитом 120×120 / 120×240",
      "Запил внешних углов под 45° без накладных уголков",
      "Скрытые смесители экстра-класса для раковины и ванны",
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

const presets = [30, 45, 60, 80, 100, 120];
const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export function Pricing() {
  const [area, setArea] = useState<number>(60);

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
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_15%_15%,_oklch(0.72_0.2_50/0.10),_transparent_55%),radial-gradient(circle_at_85%_85%,_oklch(0.62_0.21_35/0.08),_transparent_55%)]" />
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
            — инженерия, гидроизоляция, плитка и чистовая сантехника. Мы не скрываем стоимость самой
            сложной зоны квартиры. Чистовой потолок рассчитывается отдельно по проекту.
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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:pt-4 items-stretch">
          {tiers.map((t, i) => {
            const total = totals.find((x) => x.id === t.id)?.total ?? 0;
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                className={`group reveal relative liquid-glass rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 ${
                  t.featured
                    ? "ring-accent md:-translate-y-4 hover:md:-translate-y-6 sm:col-span-2 md:col-span-1"
                    : "hover:shadow-[0_30px_80px_-25px_oklch(0.72_0.2_50/0.35)]"
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

                <div className="relative grid grid-cols-3 gap-1.5 sm:gap-2 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/10">
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

                <ul className="relative space-y-2.5 mb-5 sm:mb-6">
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

        {/* Free measurement CTA */}
        <div className="reveal liquid-glass max-w-3xl mx-auto mt-10 sm:mt-12 rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
