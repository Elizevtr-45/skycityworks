import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";

function LeadFormFields({ onDone, dark = true }: { onDone: () => void; dark?: boolean }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onDone();
    }, 2500);
  };

  const inputCls = dark
    ? "bg-transparent border border-white/20 text-white placeholder:text-white/40 px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors"
    : "bg-transparent border border-border text-foreground placeholder:text-muted-foreground px-4 py-4 rounded-sm focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input required placeholder="Имя *" className={inputCls} />
      <input required type="tel" placeholder="Телефон *" className={inputCls} />
      <input required type="number" min={5} placeholder="Площадь, м² *" className={inputCls} />
      <button
        type="submit"
        className="mt-2 px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5"
      >
        {sent ? "Спасибо! Мы свяжемся с вами" : "Получить консультацию"}
      </button>
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
          <LeadFormFields onDone={() => {}} dark />
        </div>
      </div>
    </section>
  );
}

export function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
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
            Оставьте заявку
          </h3>
          <p className="text-muted-foreground text-sm mt-2">
            Перезвоним в течение 15 минут и ответим на все вопросы.
          </p>
        </div>
        <LeadFormFields onDone={() => setOpen(false)} dark={false} />
      </div>
    </div>
  );
}
