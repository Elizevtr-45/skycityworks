import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/leads";

type Status = "idle" | "sending" | "success" | "error";

function formatPhone(value: string): string {
  // Берём только цифры. Если первая 8 — заменяем на 7.
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);

  const p = digits.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ") " + p.slice(3, 6);
  if (p.length >= 6) out += "-" + p.slice(6, 8);
  if (p.length >= 8) out += "-" + p.slice(8, 10);
  return out;
}

function isPhoneValid(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}

type Errors = Partial<Record<"name" | "phone" | "area_m2" | "messenger", string>>;

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
  const [errors, setErrors] = useState<Errors>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [messenger, setMessenger] = useState("");
  const [objectType, setObjectType] = useState(defaultObjectType ?? "");

  const formRef = useRef<HTMLFormElement>(null);

  const hideAreaField = Boolean(tier);

  const validate = (): Errors => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Введите имя (минимум 2 символа)";
    if (!isPhoneValid(phone)) e.phone = "Введите телефон полностью";
    if (!hideAreaField) {
      const n = Number(area);
      if (!n || n < 5 || n > 10000) e.area_m2 = "Площадь от 5 до 10000 м²";
    }
    if (messenger.trim().length > 100) e.messenger = "Слишком длинно";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === "sending" || status === "success") return;

    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) {
      setStatus("error");
      setErrorMsg("Проверьте правильность заполнения полей");
      return;
    }

    const messageParts: string[] = [];
    if (tierName) {
      messageParts.push(`Выбран тариф: ${tierName}${tier ? ` (${tier})` : ""}`);
    }
    if (messenger.trim()) {
      messageParts.push(`Мессенджер/контакт: ${messenger.trim()}`);
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      area_m2: hideAreaField ? null : Number(area),
      object_type: objectType.trim() || null,
      message: messageParts.length ? messageParts.join("\n") : undefined,
      source: source ?? "site",
      website: (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
    };

    setStatus("sending");
    setErrorMsg(null);
    const res = await submitLead(payload);

    if (res.ok) {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setName("");
        setPhone("");
        setArea("");
        setMessenger("");
        setObjectType("");
        onDone();
      }, 2400);
    } else if (res.status === 429) {
      setStatus("error");
      setErrorMsg("Слишком много заявок. Попробуйте позже.");
    } else {
      setStatus("error");
      setErrorMsg("Не удалось отправить. Позвоните нам напрямую.");
    }
  };

  const baseInput = dark
    ? "w-full min-w-0 bg-transparent border text-white placeholder:text-white/40 px-4 py-4 rounded-sm focus:outline-none transition-all duration-300"
    : "w-full min-w-0 bg-transparent border text-foreground placeholder:text-muted-foreground px-4 py-4 rounded-sm focus:outline-none transition-all duration-300";

  const inputCls = (field: keyof Errors) =>
    `${baseInput} ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : dark
        ? "border-white/20 focus:border-primary"
        : "border-border focus:border-primary"
    }`;

  const showSuccess = status === "success";
  const showSending = status === "sending";

  return (
    <div className="relative">
      {showSuccess && (
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-sm text-center px-4 animate-in fade-in zoom-in-95 duration-500 ${
            dark ? "bg-dark/95" : "bg-background/95"
          }`}
        >
          <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center">
            <CheckCircle2 className="h-9 w-9 text-primary" />
          </div>
          <div className={`font-display font-bold uppercase text-xl ${dark ? "text-white" : "text-foreground"}`}>
            Заявка отправлена
          </div>
          <p className={`text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
            Спасибо! Перезвоним в течение 15 минут.
          </p>
        </div>
      )}

      <form ref={formRef} onSubmit={onSubmit} className={`grid gap-4 w-full min-w-0 transition-opacity duration-300 ${showSuccess ? "opacity-30" : ""}`}>
        {tierName && (
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-sm border min-w-0 ${
              dark ? "border-primary/40 bg-primary/10 text-white" : "border-primary/40 bg-primary/5 text-foreground"
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

        <div>
          <input
            name="name"
            placeholder="Имя *"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            className={inputCls("name")}
            maxLength={100}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1 px-1">{errors.name}</p>}
        </div>

        <div>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
            }}
            onFocus={() => {
              if (!phone) setPhone("+7 ");
            }}
            className={inputCls("phone")}
            maxLength={20}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1 px-1">{errors.phone}</p>}
        </div>

        <div>
          <input
            name="messenger"
            placeholder="Telegram / WhatsApp / Max (необязательно)"
            value={messenger}
            onChange={(e) => setMessenger(e.target.value)}
            className={inputCls("messenger")}
            maxLength={100}
          />
          {errors.messenger && <p className="text-xs text-red-400 mt-1 px-1">{errors.messenger}</p>}
        </div>

        {!hideAreaField && (
          <div>
            <input
              name="area_m2"
              type="number"
              min={5}
              max={10000}
              placeholder="Площадь, м² *"
              value={area}
              onChange={(e) => {
                setArea(e.target.value);
                if (errors.area_m2) setErrors((p) => ({ ...p, area_m2: undefined }));
              }}
              className={inputCls("area_m2")}
            />
            {errors.area_m2 && <p className="text-xs text-red-400 mt-1 px-1">{errors.area_m2}</p>}
          </div>
        )}

        <input
          name="object_type"
          list="object-type-options"
          className={inputCls("name").replace("border-red-400", "")}
          value={objectType}
          onChange={(e) => setObjectType(e.target.value)}
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

        {/* honeypot */}
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
          disabled={showSending}
          className="relative overflow-hidden mt-2 px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-80 disabled:hover:translate-y-0"
        >
          <span className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${showSending ? "opacity-90" : ""}`}>
            {showSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Отправляем…
              </>
            ) : (
              "Получить консультацию"
            )}
          </span>
          {showSending && (
            <span className="absolute left-0 bottom-0 h-0.5 bg-white/70 animate-[lead-progress_1.4s_ease-in-out_infinite]" />
          )}
        </button>

        {status === "error" && errorMsg && (
          <p className={`text-xs text-center ${dark ? "text-red-300" : "text-red-600"}`}>{errorMsg}</p>
        )}

        <p className={`text-xs text-center ${dark ? "text-white/40" : "text-muted-foreground"}`}>
          Нажимая «Получить консультацию», вы соглашаетесь с политикой обработки персональных данных.
        </p>

        <div className={`mt-2 pt-4 border-t text-center ${dark ? "border-white/10" : "border-border"}`}>
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
              className={`flex flex-col items-center gap-0.5 hover:text-primary transition-colors ${dark ? "text-white" : "text-foreground"}`}
            >
              <span className="inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                8 964 445 55 25
              </span>
              <span className={`text-[11px] ${dark ? "text-white/50" : "text-muted-foreground"}`}>Николай</span>
            </a>
            <a
              href="tel:+79693077772"
              className={`flex flex-col items-center gap-0.5 hover:text-primary transition-colors ${dark ? "text-white" : "text-foreground"}`}
            >
              <span className="inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                8 969 307 77 72
              </span>
              <span className={`text-[11px] ${dark ? "text-white/50" : "text-muted-foreground"}`}>Денис</span>
            </a>
          </div>
        </div>
      </form>
    </div>
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
  const [mounted, setMounted] = useState(false);
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
      // следующий тик — чтобы запустилась анимация появления
      requestAnimationFrame(() => setMounted(true));
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

  const close = () => {
    setMounted(false);
    setTimeout(() => setOpen(false), 280);
  };

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
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto transition-all duration-300 ease-out ${
        mounted ? "bg-dark/70 backdrop-blur-md opacity-100" : "bg-dark/0 backdrop-blur-0 opacity-0"
      }`}
      onClick={close}
    >
      <div
        className={`bg-background w-full max-w-md max-h-[90vh] sm:max-h-[85vh] flex flex-col relative my-auto shadow-2xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
        }`}
        style={{ borderRadius: "12px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 z-30 h-9 w-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
            onDone={close}
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
