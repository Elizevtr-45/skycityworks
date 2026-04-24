import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
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

    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      area_m2: Number(fd.get("area_m2") || 0) || null,
      object_type: (String(fd.get("object_type") || "").trim() || null) as string | null,
      source: source ?? "site",
      website: String(fd.get("website") || ""),
    };

    if (!payload.name || !payload.phone || !payload.area_m2) {
      setStatus("error");
      setErrorMsg("Заполните имя, телефон и площадь");
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
    ? "bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
    : "bg-transparent border border-border text-foreground placeholder:text-muted-foreground px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors";

  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input required name="name" placeholder="Имя *" className={inputCls} maxLength={100} />
      <input required name="phone" type="tel" placeholder="Телефон *" className={inputCls} maxLength={30} />
      <input required name="area_m2" type="number" min={5} max={10000} placeholder="Площадь, м² *" className={inputCls} />
      <select name="object_type" className={selectCls} defaultValue={defaultObjectType ?? ""}>
        <option value="" disabled className={dark ? "bg-dark text-white" : "bg-background text-foreground"}>
          Тип объекта / услуга (необязательно)
        </option>
        <option value="Квартира" className={dark ? "bg-dark text-white" : "bg-background text-foreground"}>Квартира</option>
        <option value="Дом" className={dark ? "bg-dark text-white" : "bg-background text-foreground"}>Дом</option>
        <option value="Санузел" className={dark ? "bg-dark text-white" : "bg-background text-foreground"}>Санузел</option>
        <option value="Кухня" className={dark ? "bg-dark text-white" : "bg-background text-foreground"}>Кухня</option>
        <option value="Изделия из керамогранита" className={dark ? "bg-dark text-white" : "bg-background text-foreground"}>Изделия из керамогранита</option>
        <option value="Коммерческое" className={dark ? "bg-dark text-white" : "bg-background text-foreground"}>Коммерческое</option>
      </select>

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
    </form>
  );
}

export function LeadForm() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-dark">
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
        <div className="reveal bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm">
          <LeadFormFields onDone={() => {}} dark source="contact-section" />
        </div>
      </div>
    </section>
  );
}

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { objectType?: string } | undefined;
      setPreset(detail?.objectType);
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

  return (
    <div
      className="fixed inset-0 z-[100] bg-dark/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-background w-full max-w-md p-6 md:p-8 relative"
        style={{ borderRadius: "10px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-6">
          <div className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-2">
            Бесплатная консультация
          </div>
          <h3 className="font-display font-bold uppercase text-2xl md:text-3xl">
            {preset ? `Заявка: ${preset}` : "Оставьте заявку"}
          </h3>
          <p className="text-muted-foreground text-sm mt-2">
            Перезвоним в течение 15 минут и ответим на все вопросы.
          </p>
        </div>
        <LeadFormFields
          key={preset ?? "default"}
          onDone={() => setOpen(false)}
          dark={false}
          source={preset ? `popup:${preset}` : "popup"}
          defaultObjectType={preset}
        />
      </div>
    </div>
  );
}
