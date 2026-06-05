import { useEffect, useState, type FormEvent } from "react";
import { X, Phone } from "lucide-react";
import { submitLead } from "@/lib/leads";

type Status = "idle" | "sending" | "success" | "error";

function LeadFormFields({
  onDone,
  dark = true,
  source,
  defaultObjectType,
  tier,
  tierName,
}: {
  onDone: () => void;
  dark?: boolean;
  source?: string;
  defaultObjectType?: string;
  tier?: string;
  tierName?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const tierFromForm = String(fd.get("tier") || "").trim();
    const tierNameFromForm = String(fd.get("tier_name") || "").trim();

    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      area_m2: Number(fd.get("area_m2") || 0) || null,
      object_type: (String(fd.get("object_type") || "").trim() || null) as string | null,
      message: tierNameFromForm ? `Выбран тариф: ${tierNameFromForm}${tierFromForm ? ` (${tierFromForm})` : ""}` : undefined,
      source: source ?? "site",
      website: String(fd.get("website") || ""),
    };

    if (!payload.name || !payload.phone || (!tier && !payload.area_m2)) {
      setStatus("error");
      setErrorMsg(tier ? "Заполните имя и телефон" : "Заполните имя, телефон и площадь");
      return;
    }

    setStatus("sending");
    setErrorMsg(null);
    const res = await submitLead(payload);

    if (res.ok) {
      setStatus("success");
      form.reset();
      setTimeout(() => {
        setStatus("idle");
        onDone();
      }, 2500);
    } else if (res.status === 429) {
      setStatus("error");
      setErrorMsg("Слишком много заявок. Попробуйте позже.");
    } else {
      setStatus("error");
      setErrorMsg("Не удалось отправить. Позвоните нам напрямую.");
    }
  };

  const inputCls = dark
    ? "w-full min-w-0 bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
    : "w-full min-w-0 bg-transparent border border-border text-foreground placeholder:text-muted-foreground px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors";

  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  // Если тариф пришёл из калькулятора — площадь уже включена в название тарифа,
  // отдельное поле не показываем, чтобы не перегружать форму.
  const hideAreaField = Boolean(tier);

  return (
    <form onSubmit={onSubmit} className="grid gap-4 w-full min-w-0">
      {tierName && (
        <div
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-sm border min-w-0 ${
            dark
              ? "border-primary/40 bg-primary/10 text-white"
              : "border-primary/40 bg-primary/5 text-foreground"
          }`}
        >
          <div className="min-w-0">
            <div className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${dark ? "text-white/60" : "text-muted-foreground"}`}>
              Выбранный тариф
            </div>
            <div className="font-display font-bold uppercase text-sm sm:text-base break-words leading-tight">
              {tierName}
            </div>
          </div>
          <span className="text-primary text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0">✓</span>
        </div>
      )}
      <input type="hidden" name="tier" value={tier ?? ""} />
      <input type="hidden" name="tier_name" value={tierName ?? ""} />
      <input required name="name" placeholder="Имя *" className={inputCls} maxLength={100} />
      <input required name="phone" type="tel" placeholder="Телефон *" className={inputCls} maxLength={30} />
      {!hideAreaField && (
        <input required name="area_m2" type="number" min={5} max={10000} placeholder="Площадь, м² *" className={inputCls} />
      )}
      <>
        <input
          name="object_type"
          list="object-type-options"
          className={inputCls}
          defaultValue={defaultObjectType ?? ""}
          placeholder="Тип объекта / услуга (необязательно)"
          maxLength={50}
        />
        <datalist id="object-type-options">
          <option value="Квартира" />
          <option value="Дом" />
          <option value="Санузел" />
          <option value="Кухня" />
          <option value="Изделия из керамогранита" />
          <option value="Коммерческое" />
        </datalist>
      </>

      {/* honeypot — скрыт от пользователей */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending"
          ? "Отправляем…"
          : status === "success"
          ? "Спасибо! Мы свяжемся с вами"
          : "Получить консультацию"}
      </button>

      {status === "error" && errorMsg && (
        <p className={`text-xs text-center ${dark ? "text-red-300" : "text-red-600"}`}>{errorMsg}</p>
      )}

      <p className={`text-xs text-center ${dark ? "text-white/40" : "text-muted-foreground"}`}>
        Нажимая «Получить консультацию», вы соглашаетесь с политикой обработки персональных данных.
      </p>

      <div
        className={`mt-2 pt-4 border-t text-center ${
          dark ? "border-white/10" : "border-border"
        }`}
      >
        <div
          className={`text-[10px] uppercase tracking-[0.25em] font-semibold mb-2 ${
            dark ? "text-white/50" : "text-muted-foreground"
          }`}
        >
          Также можете связаться с нами самостоятельно
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-stretch sm:items-center">
          <a
            href="tel:+79644455525"
            className={`flex flex-col items-center gap-0.5 hover:text-primary transition-colors ${
              dark ? "text-white" : "text-foreground"
            }`}
          >
            <span className="inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              8 964 445 55 25
            </span>
            <span className={`text-[11px] ${dark ? "text-white/50" : "text-muted-foreground"}`}>
              Николай
            </span>
          </a>
          <a
            href="tel:+79693077772"
            className={`flex flex-col items-center gap-0.5 hover:text-primary transition-colors ${
              dark ? "text-white" : "text-foreground"
            }`}
          >
            <span className="inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              8 969 307 77 72
            </span>
            <span className={`text-[11px] ${dark ? "text-white/50" : "text-muted-foreground"}`}>
              Денис
            </span>
          </a>
        </div>
      </div>
    </form>
  );
}

export function LeadForm() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-grid-orange">
      <div className="container-px mx-auto max-w-2xl">
        <div className="reveal text-center mb-10">
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="gold-divider" />
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">Заявка</span>
          </div>
          <h2 className="font-display font-bold uppercase text-white text-3xl md:text-4xl lg:text-5xl">
            Получите расчёт стоимости
          </h2>
          <p className="mt-4 text-white/70">
            Перезвоним в течение 15 минут. Бесплатный осмотр, замер и смета — без обязательств.
          </p>
        </div>
        <div className="reveal bg-white/5 border border-white/10 p-4 sm:p-6 md:p-10 rounded-sm overflow-hidden">
          <LeadFormFields onDone={() => {}} dark source="contact-section" />
        </div>
      </div>
    </section>
  );
}

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>(undefined);
  const [tier, setTier] = useState<string | undefined>(undefined);
  const [tierName, setTierName] = useState<string | undefined>(undefined);
  const [sourceOverride, setSourceOverride] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { objectType?: string; tier?: string; tierName?: string; source?: string }
        | undefined;
      setPreset(detail?.objectType);
      setTier(detail?.tier);
      setTierName(detail?.tierName);
      setSourceOverride(detail?.source);
      setOpen(true);
    };
    window.addEventListener("open-lead-form", handler);
    return () => window.removeEventListener("open-lead-form", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const computedSource =
    sourceOverride ?? (tier ? `popup:tier:${tier}` : preset ? `popup:${preset}` : "popup");

  const heading = tierName
    ? `Тариф «${tierName}»`
    : preset
    ? `Заявка: ${preset}`
    : "Оставьте заявку";

  return (
    <div
      className="fixed inset-0 z-[100] bg-dark/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in overflow-y-auto"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-background w-full max-w-md max-h-[90vh] sm:max-h-[85vh] flex flex-col relative my-auto shadow-2xl"
        style={{ borderRadius: "12px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="overflow-y-auto px-5 sm:px-7 py-6 sm:py-7">
          <div className="mb-5 pr-8">
            <div className="text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold mb-2">
              Бесплатная консультация
            </div>
            <h3 className="font-display font-bold uppercase text-xl sm:text-2xl md:text-3xl leading-tight">
              {heading}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm mt-2">
              Перезвоним в течение 15 минут и ответим на все вопросы.
            </p>
          </div>
          <LeadFormFields
            key={`${tier ?? ""}-${preset ?? "default"}`}
            onDone={() => setOpen(false)}
            dark={false}
            source={computedSource}
            defaultObjectType={preset}
            tier={tier}
            tierName={tierName}
          />
        </div>
      </div>
    </div>
  );
}
