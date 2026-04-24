import { useMemo, useState } from "react";
import { Check, Calculator as CalcIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

type TierKey = "basic" | "standard" | "premium";

const TIERS: Record<TierKey, { name: string; price: number }> = {
  basic: { name: "Базовый", price: 22000 },
  standard: { name: "Стандарт", price: 25000 },
  premium: { name: "Премиум", price: 30000 },
};

type OptionItem = {
  id: string;
  label: string;
  price: number;
  /** "perM2" умножается на площадь, "flat" — фиксированная сумма */
  mode: "perM2" | "flat";
};

const OPTIONS: OptionItem[] = [
  { id: "design", label: "Дизайн-проект", price: 3000, mode: "perM2" },
  { id: "demolition", label: "Демонтаж отделки", price: 1500, mode: "perM2" },
  { id: "ceiling", label: "Натяжной потолок", price: 2000, mode: "perM2" },
  { id: "furniture", label: "Меблировка под ключ", price: 900000, mode: "flat" },
];

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₽";

export function Calculator() {
  const [area, setArea] = useState(60);
  const MIN_AREA = 5;
  const [tier, setTier] = useState<TierKey>("standard");
  const [opts, setOpts] = useState<string[]>(["design"]);

  const toggle = (id: string) =>
    setOpts((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const { base, extras, total, perM2 } = useMemo(() => {
    const tierPrice = TIERS[tier].price;
    const base = tierPrice * area;
    const extras = OPTIONS.filter((o) => opts.includes(o.id)).reduce(
      (acc, o) => acc + (o.mode === "perM2" ? o.price * area : o.price),
      0,
    );
    const total = base + extras;
    return { base, extras, total, perM2: total / area };
  }, [area, tier, opts]);

  return (
    <section id="calculator" className="scroll-mt-24 md:scroll-mt-32 py-20 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Калькулятор"
          title="Рассчитайте стоимость ремонта"
          subtitle="Укажите параметры — получите ориентировочную смету за 30 секунд. Точная цена после бесплатного замера."
          center
        />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Inputs */}
          <div className="lg:col-span-3 bg-card border border-border rounded-sm p-6 md:p-10 reveal">
            {/* Area */}
            <div className="mb-10">
              <div className="flex items-baseline justify-between mb-4">
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
                  [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(200,155,109,0.5)]
                  [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{MIN_AREA} м²</span>
                <span>250 м²</span>
              </div>
            </div>

            {/* Tier */}
            <div className="mb-10">
              <label className="font-display font-bold uppercase text-sm tracking-wider block mb-4">
                Тариф
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(Object.keys(TIERS) as TierKey[]).map((k) => {
                  const active = tier === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setTier(k)}
                      className={`p-3 sm:p-4 rounded-sm border text-left transition-all min-w-0 ${
                        active
                          ? "border-primary bg-primary/5 shadow-[0_4px_20px_-8px_oklch(0.7_0.08_65/0.5)]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-display font-bold uppercase text-xs sm:text-sm break-words">
                        {TIERS[k].name}
                      </div>
                      <div className={`text-[11px] sm:text-xs mt-1 break-words ${active ? "text-primary" : "text-muted-foreground"}`}>
                        от {fmt(TIERS[k].price)}/м²
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options */}
            <div>
              <label className="font-display font-bold uppercase text-sm tracking-wider block mb-4">
                Дополнительные опции
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {OPTIONS.map((o) => {
                  const active = opts.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => toggle(o.id)}
                      className={`flex items-center gap-3 p-4 rounded-sm border text-left transition-all ${
                        active
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${
                          active ? "bg-primary border-primary" : "border-border"
                        }`}
                      >
                        {active && <Check className="h-3 w-3 text-white" />}
                      </span>
                      <span className="flex-1 text-sm">
                        <span className="block font-medium">{o.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {o.mode === "perM2" ? `от ${fmt(o.price)}/м²` : `от ${fmt(o.price)}`}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-2 reveal">
            <div className="bg-dark text-white rounded-sm p-8 md:p-10 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-sm bg-primary/15 flex items-center justify-center">
                  <CalcIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="font-display font-bold uppercase tracking-wider text-sm">
                  Ваш расчёт
                </div>
              </div>

              <div className="space-y-3 text-sm border-b border-white/10 pb-6">
                <Row label={`${TIERS[tier].name} · ${area} м²`} value={fmt(base)} />
                <Row label="Дополнительные опции" value={fmt(extras)} />
              </div>

              <div className="pt-6 mb-8">
                <div className="text-white/60 text-xs uppercase tracking-widest mb-2">
                  Итого ориентировочно
                </div>
                <div className="font-display font-bold text-4xl md:text-5xl text-gradient-gold leading-none">
                  {fmt(total)}
                </div>
                <div className="text-white/50 text-sm mt-2">
                  ≈ {fmt(perM2)} за м²
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-lead-form", {
                      detail: {
                        tier: tier,
                        tierName: `${TIERS[tier].name} · ${area} м² · ${fmt(total)}`,
                        source: `calculator:${tier}`,
                      },
                    }),
                  )
                }
                className="block w-full text-center px-6 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
              >
                Получить точную смету
              </button>
              <p className="text-white/40 text-xs text-center mt-4 leading-relaxed">
                Расчёт носит ориентировочный характер. Финальная стоимость
                фиксируется в договоре после бесплатного замера.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
