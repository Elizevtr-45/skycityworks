import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Calculator as CalcIcon,
  Info,
  Paintbrush,
  DoorOpen,
  Bath,
  Wind,
  Lock,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type TierKey = "econom" | "basic" | "premium";

const TIERS: Record<TierKey, { name: string; price: number; desc: string }> = {
  econom: { name: "Эконом", price: 22000, desc: "White Box + простой чистовой" },
  basic: { name: "Базовый", price: 25000, desc: "Комфорт и современный стиль" },
  premium: { name: "Премиум", price: 45000, desc: "High-End по дизайн-проекту" },
};

type PropertyType = "new" | "secondary";
const PROPERTY: Record<PropertyType, { name: string; multiplier: number; note: string }> = {
  new: { name: "Новостройка", multiplier: 1.0, note: "Базовый коэффициент" },
  secondary: {
    name: "Вторичное жильё",
    multiplier: 1.1,
    note: "+10% — демонтаж и подготовка",
  },
};

type InputMode =
  | "flat" // фиксированная сумма
  | "perFloorM2" // × площадь пола
  | "perWallM2" // × площадь стен/панелей (ввод пользователя)
  | "perBathM2" // × площадь санузла (ввод)
  | "perLinearM" // × погонный метр (ввод)
  | "perCount"; // × штук/точек (ввод)

type Option = {
  id: string;
  category: "Стены и отделка" | "Двери и полы" | "Санузел и плитка" | "Инженерия и климат";
  label: string;
  price: number;
  mode: InputMode;
  unit: string; // "м²", "пог. м", "шт.", "точек"
  hint: string;
  defaultQty?: number;
  includedIn?: TierKey[]; // авто-включено в эти тарифы
  group?: string; // взаимоисключающая группа (выбор одного отключает другие)
};

const OPTIONS: Option[] = [
  // Стены и отделка
  {
    id: "paint-standard",
    category: "Стены и отделка",
    label: "Покраска стен (Стандарт)",
    price: 2500,
    mode: "perFloorM2",
    unit: "м²",
    hint: "Матовая краска вместо обоев. 2 слоя шпатлевки + базовая шлифовка.",
    includedIn: ["basic", "premium"],
    group: "paint",
  },
  {
    id: "paint-comfort",
    category: "Стены и отделка",
    label: "Покраска стен (Комфорт со стеклохолстом)",
    price: 5000,
    mode: "perFloorM2",
    unit: "м²",
    hint: "Армирование стеклохолстом + финишная шпатлевка — защита от микротрещин при усадке.",
    group: "paint",
  },
  {
    id: "paint-losev",
    category: "Стены и отделка",
    label: "Премиальная покраска под Лампу Лосева",
    price: 7500,
    mode: "perFloorM2",
    unit: "м²",
    hint: "Приёмка стен под мощным боковым прожектором — эффект зеркала под любым светом.",
    includedIn: ["premium"],
    group: "paint",
  },
  {
    id: "decor-plaster",
    category: "Стены и отделка",
    label: "Авторская декоративная штукатурка",
    price: 3500,
    mode: "perWallM2",
    unit: "м²",
    hint: "Бесшовные фактуры: микроцемент, арт-бетон, шелк, травертин.",
    defaultQty: 10,
  },
  {
    id: "wall-panels",
    category: "Стены и отделка",
    label: "Стеновые панели (камень / шпон)",
    price: 2500,
    mode: "perWallM2",
    unit: "м²",
    hint: "Натуральное дерево, МДФ со шпоном или архитектурный камень.",
    defaultQty: 8,
  },
  {
    id: "metal-inlay",
    category: "Стены и отделка",
    label: "Латунные / хром-вставки",
    price: 2500,
    mode: "perLinearM",
    unit: "пог. м",
    hint: "Тонкие металлические профили в стыках плитки и панелей.",
    defaultQty: 6,
  },

  // Двери и полы
  {
    id: "hidden-doors",
    category: "Двери и полы",
    label: "Двери скрытого монтажа",
    price: 25000,
    mode: "perCount",
    unit: "шт.",
    hint: "Алюминиевый короб на черновом этапе — дверь сливается со стеной.",
    defaultQty: 3,
    includedIn: ["basic", "premium"],
  },
  {
    id: "shadow-skirting",
    category: "Двери и полы",
    label: "Теневой плинтус (парящие стены)",
    price: 4500,
    mode: "perLinearM",
    unit: "пог. м",
    hint: "Зазор между стеной и полом на алюминиевом профиле.",
    defaultQty: 40,
    includedIn: ["basic", "premium"],
  },
  {
    id: "parquet",
    category: "Двери и полы",
    label: "Натуральный паркет / Инженерная доска",
    price: 2500,
    mode: "perFloorM2",
    unit: "м²",
    hint: "Премиальное деревянное покрытие единым контуром без порогов.",
    includedIn: ["basic", "premium"],
  },

  // Санузел и плитка
  {
    id: "small-tile",
    category: "Санузел и плитка",
    label: "Мелкоформатная плитка / «кабанчик»",
    price: 6000,
    mode: "perBathM2",
    unit: "м²",
    hint: "Сложная укладка плитки малого размера — много подрезок.",
    defaultQty: 12,
    group: "tile",
  },
  {
    id: "large-porcelain",
    category: "Санузел и плитка",
    label: "Крупный формат керамогранита (от 120×120)",
    price: 8000,
    mode: "perBathM2",
    unit: "м²",
    hint: "Облицовка плитами 120×120 / 120×240, подгонка рисунка, запил под 45°.",
    defaultQty: 12,
    includedIn: ["premium"],
    group: "tile",
  },
  {
    id: "manifold",
    category: "Санузел и плитка",
    label: "Коллекторная разводка узлов",
    price: 120000,
    mode: "flat",
    unit: "",
    hint: "Распределительный коллектор — независимый стабильный напор во всех точках.",
    includedIn: ["premium"],
  },
  {
    id: "hidden-mixer-bath",
    category: "Санузел и плитка",
    label: "Скрытый смеситель для ванны",
    price: 30000,
    mode: "perCount",
    unit: "шт.",
    hint: "Механизм глубоко в стене — снаружи только минималистичный излив.",
    defaultQty: 1,
    includedIn: ["premium"],
  },
  {
    id: "hidden-mixer-sink",
    category: "Санузел и плитка",
    label: "Скрытый смеситель для раковины",
    price: 12000,
    mode: "perCount",
    unit: "шт.",
    hint: "Излив выходит напрямую из стены над раковиной. Опция-апгрейд для любого тарифа.",
    defaultQty: 1,
  },

  // Инженерия и климат
  {
    id: "smart-home",
    category: "Инженерия и климат",
    label: "Умный дом",
    price: 6000,
    mode: "perFloorM2",
    unit: "м²",
    hint: "Управление светом, климатом и сценариями со смартфона.",
  },
  {
    id: "ventilation",
    category: "Инженерия и климат",
    label: "Приточная вентиляция",
    price: 30000,
    mode: "perCount",
    unit: "точек",
    hint: "Постоянный приток очищенного воздуха без открывания окон.",
    defaultQty: 2,
    includedIn: ["premium"],
  },
  {
    id: "floor-convectors",
    category: "Инженерия и климат",
    label: "Внутрипольные конвекторы",
    price: 25000,
    mode: "perCount",
    unit: "точек",
    hint: "Скрытые обогреватели в стяжке вдоль панорамных окон.",
    defaultQty: 2,
    includedIn: ["premium"],
  },
];

const CATEGORIES = [
  { key: "Стены и отделка", icon: Paintbrush },
  { key: "Двери и полы", icon: DoorOpen },
  { key: "Санузел и плитка", icon: Bath },
  { key: "Инженерия и климат", icon: Wind },
] as const;

const fmt = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₽";

function optionCost(o: Option, area: number, qty: number): number {
  switch (o.mode) {
    case "flat":
      return o.price;
    case "perFloorM2":
      return o.price * area;
    case "perWallM2":
    case "perBathM2":
    case "perLinearM":
    case "perCount":
      return o.price * (qty || 0);
  }
}

function unitLabel(o: Option): string {
  switch (o.mode) {
    case "flat":
      return `${fmt(o.price)} фикс.`;
    case "perFloorM2":
      return `${fmt(o.price)} × площадь`;
    case "perWallM2":
      return `${fmt(o.price)} × ${o.unit}`;
    case "perBathM2":
      return `${fmt(o.price)} × ${o.unit} санузла`;
    case "perLinearM":
      return `${fmt(o.price)} × ${o.unit}`;
    case "perCount":
      return `${fmt(o.price)} × ${o.unit}`;
  }
}

export function Calculator() {
  const MIN_AREA = 20;
  const [area, setArea] = useState(60);
  const [property, setProperty] = useState<PropertyType>("new");
  const [tier, setTier] = useState<TierKey>("basic");

  // Per-option enabled state and quantities
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});
  const [qty, setQty] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    OPTIONS.forEach((o) => {
      if (o.defaultQty != null) init[o.id] = o.defaultQty;
    });
    return init;
  });

  const isIncluded = (o: Option) => !!o.includedIn?.includes(tier);
  // active = пользователь явно включил/выключил; иначе — по умолчанию из тарифа
  const isActive = (o: Option) =>
    enabled[o.id] !== undefined ? !!enabled[o.id] : isIncluded(o);

  // Listen for "Сконфигурировать" clicks from Pricing
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { tier?: TierKey; area?: number };
      if (detail?.tier && TIERS[detail.tier]) setTier(detail.tier);
      if (typeof detail?.area === "number") setArea(detail.area);
    };
    window.addEventListener("calc-preset-tier", handler);
    return () => window.removeEventListener("calc-preset-tier", handler);
  }, []);

  const toggle = (o: Option) => {
    const currentlyActive = isActive(o);
    const next = !currentlyActive;
    setEnabled((s) => {
      const updated: Record<string, boolean> = { ...s, [o.id]: next };
      // Взаимоисключающая группа: при включении выключаем остальных
      if (next && o.group) {
        OPTIONS.forEach((other) => {
          if (other.id !== o.id && other.group === o.group) {
            updated[other.id] = false;
          }
        });
      }
      return updated;
    });
  };

  const setQuantity = (id: string, v: number) =>
    setQty((s) => ({ ...s, [id]: Math.max(0, Math.floor(v) || 0) }));

  const { base, baseRaw, multiplier, extras, total, lines, activeList } = useMemo(() => {
    const multiplier = PROPERTY[property].multiplier;
    const baseRaw = TIERS[tier].price * area;
    const base = baseRaw * multiplier;
    let extras = 0;
    const lines: { label: string; sum: number }[] = [];
    const activeList: string[] = [];
    OPTIONS.forEach((o) => {
      if (!isActive(o)) return;
      const included = isIncluded(o);
      const q = qty[o.id] ?? o.defaultQty ?? 1;
      const cost = included ? 0 : optionCost(o, area, q);
      extras += cost;
      lines.push({
        label:
          included
            ? `${o.label} — включено в тариф`
            : o.mode === "flat"
              ? o.label
              : `${o.label} (${q} ${o.unit})`,
        sum: cost,
      });
      activeList.push(o.label);
    });
    return { base, baseRaw, multiplier, extras, total: base + extras, lines, activeList };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, tier, property, enabled, qty]);

  const perM2 = area > 0 ? total / area : 0;

  return (
    <section
      id="calculator"
      className="scroll-mt-24 md:scroll-mt-32 py-20 md:py-32 bg-dots-orange"
    >
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Калькулятор"
          title="Конструктор сметы под себя"
          subtitle="3 шага: параметры объекта → апгрейды → персональная смета. Все цены — из реальной практики во Владивостоке."
          center
        />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Inputs */}
          <div className="lg:col-span-3 bg-card border border-border rounded-3xl p-6 md:p-8 reveal">
            {/* STEP 1 */}
            <StepHeader n={1} title="Параметры объекта" />

            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <label className="font-display font-bold uppercase text-sm tracking-wider">
                  Площадь квартиры
                </label>
                <div className="font-display font-bold text-2xl text-primary">
                  {area} <span className="text-sm text-muted-foreground">м²</span>
                </div>
              </div>
              <input
                type="range"
                min={MIN_AREA}
                max={250}
                step={1}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                  [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{MIN_AREA} м²</span>
                <span>250 м²</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="font-display font-bold uppercase text-sm tracking-wider block mb-3">
                Тип недвижимости
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {(Object.keys(PROPERTY) as PropertyType[]).map((k) => {
                  const active = property === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setProperty(k)}
                      className={`p-3 sm:p-4 rounded-2xl border text-left transition-all ${
                        active
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-display font-bold uppercase text-[11px] sm:text-sm leading-tight">
                        {PROPERTY[k].name}
                      </div>
                      <div
                        className={`text-[10px] sm:text-xs mt-1 leading-tight ${
                          active ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {PROPERTY[k].note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-10">
              <label className="font-display font-bold uppercase text-sm tracking-wider block mb-3">
                Базовый тариф
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(Object.keys(TIERS) as TierKey[]).map((k) => {
                  const active = tier === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setTier(k)}
                      className={`p-3 sm:p-4 rounded-2xl border text-left transition-all min-w-0 ${
                        active
                          ? "border-primary bg-primary/5 shadow-[0_4px_20px_-8px_oklch(0.72_0.2_50/0.4)]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-display font-bold uppercase text-[11px] sm:text-sm leading-tight">
                        {TIERS[k].name}
                      </div>
                      <div
                        className={`text-[10px] sm:text-xs mt-1 leading-tight ${
                          active ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        от {fmt(TIERS[k].price)}/м²
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2 */}
            <StepHeader n={2} title="Апгрейды и опции" />
            <p className="text-xs sm:text-sm text-muted-foreground mb-5 -mt-2">
              Опции, уже входящие в выбранный тариф, помечены{" "}
              <span className="text-primary font-semibold">«Включено»</span>.
              Остальные можно добавить.
            </p>

            <div className="space-y-7">
              {CATEGORIES.map(({ key, icon: CIcon }) => {
                const items = OPTIONS.filter((o) => o.category === key);
                return (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-3">
                      <CIcon className="h-4 w-4 text-primary" />
                      <h4 className="font-display font-bold uppercase text-xs sm:text-sm tracking-wider text-foreground">
                        {key}
                      </h4>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {items.map((o) => {
                        const included = isIncluded(o);
                        const active = isActive(o);
                        const includedActive = included && active;
                        const includedDisabled = included && !active;
                        const needsQty =
                          o.mode === "perWallM2" ||
                          o.mode === "perBathM2" ||
                          o.mode === "perLinearM" ||
                          o.mode === "perCount";
                        const q = qty[o.id] ?? o.defaultQty ?? 1;
                        return (
                          <div
                            key={o.id}
                            className={`p-3.5 rounded-2xl border transition-all ${
                              includedActive
                                ? "border-primary/60 bg-primary/10"
                                : active
                                  ? "border-primary bg-primary/5"
                                  : includedDisabled
                                    ? "border-dashed border-primary/30 bg-primary/[0.03] opacity-80"
                                    : "border-border hover:border-primary/50"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggle(o)}
                              className="flex items-start gap-3 text-left w-full"
                              aria-pressed={active}
                            >
                              <span
                                className={`h-5 w-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  active ? "bg-primary border-primary" : "border-border"
                                }`}
                              >
                                {active && <Check className="h-3 w-3 text-primary-foreground" />}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="flex items-center gap-2 flex-wrap">
                                  <span className="font-semibold text-sm leading-tight text-foreground">
                                    {o.label}
                                  </span>
                                  {includedActive && (
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                                      <Lock className="h-2.5 w-2.5" /> Включено
                                    </span>
                                  )}
                                  {includedDisabled && (
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded">
                                      Отключено
                                    </span>
                                  )}
                                </span>
                                <span className="block text-[11px] text-muted-foreground mt-1 leading-snug">
                                  {includedActive ? "Входит в тариф · 0 ₽" : unitLabel(o)}
                                </span>
                                <span className="flex items-start gap-1 text-[11px] text-muted-foreground/80 mt-1 leading-snug">
                                  <Info className="h-3 w-3 shrink-0 mt-0.5 text-primary/70" />
                                  <span>{o.hint}</span>
                                </span>
                              </span>
                            </button>
                            {needsQty && active && !included && (
                              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                                <label className="text-[11px] uppercase tracking-wider text-muted-foreground shrink-0">
                                  {o.mode === "perCount"
                                    ? `Кол-во (${o.unit})`
                                    : `Объём (${o.unit})`}
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  value={q}
                                  onChange={(e) => setQuantity(o.id, Number(e.target.value))}
                                  className="ml-auto w-20 px-2 py-1 rounded-lg bg-background border border-border text-sm text-foreground text-right focus:outline-none focus:border-primary"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-2 reveal">
            <div className="bg-dark text-white rounded-3xl p-7 md:p-9 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <CalcIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-display font-bold uppercase tracking-wider text-sm">
                    Шаг 3 · Ваш расчёт
                  </div>
                  <div className="text-white/50 text-[11px] mt-0.5">
                    {TIERS[tier].name} · {PROPERTY[property].name} · {area} м²
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-sm border-b border-white/10 pb-5">
                <Row
                  label={`${TIERS[tier].name} · ${area} м²`}
                  value={fmt(baseRaw)}
                />
                {multiplier > 1 && (
                  <Row
                    label={`Коэффициент вторички (+${Math.round((multiplier - 1) * 100)}%)`}
                    value={fmt(base - baseRaw)}
                  />
                )}
                <Row label="Апгрейды и опции" value={fmt(extras)} />
              </div>

              {activeList.length > 0 && (
                <div className="pt-5 border-b border-white/10 pb-5">
                  <div className="text-white/50 text-[11px] uppercase tracking-widest mb-2.5">
                    Ваша конфигурация
                  </div>
                  <ul className="space-y-1.5 max-h-44 overflow-auto pr-1">
                    {lines.map((l, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between gap-2 text-[12px] leading-snug"
                      >
                        <span className="text-white/80 flex items-start gap-1.5">
                          <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                          {l.label}
                        </span>
                        <span className="text-white/60 tabular-nums shrink-0">
                          {l.sum > 0 ? `+${fmt(l.sum)}` : "—"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 mb-7">
                <div className="text-white/60 text-xs uppercase tracking-widest mb-2">
                  Предварительная стоимость
                </div>
                <div className="font-display font-bold text-4xl md:text-5xl text-gradient-gold leading-none">
                  {fmt(total)}
                </div>
                <div className="text-white/50 text-sm mt-2">
                  ≈ {fmt(perM2)} за м² · работа + черновые материалы
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-lead-form", {
                      detail: {
                        tier,
                        tierName: `${TIERS[tier].name} · ${area} м² · ${fmt(total)}`,
                        source: `calculator:${tier}`,
                      },
                    }),
                  )
                }
                className="btn-cta hover:btn-cta-hover block w-full text-center px-5 py-4 font-semibold uppercase tracking-wider text-sm rounded-xl hover:-translate-y-0.5"
              >
                Зафиксировать стоимость · скидка на дизайн
              </button>

              <p className="text-white/40 text-[11px] text-center mt-4 leading-relaxed">
                Расчёт носит ознакомительный характер и сформирован на основе типовых
                технологических карт. Финишные потолки, индивидуальные сценарии освещения и
                нестандартные планировки уточняются после бесплатного замера и согласования
                дизайн-проекта.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-display font-black text-sm flex items-center justify-center shrink-0">
        {n}
      </div>
      <div className="font-display font-bold uppercase text-base sm:text-lg tracking-wider text-foreground">
        {title}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/70">{label}</span>
      <span className="font-semibold text-white tabular-nums">{value}</span>
    </div>
  );
}
