import { useState, type FormEvent } from "react";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { submitLead } from "@/lib/leads";

const PDF_URL = "/skycity-7-oshibok-remonta.pdf";

type Status = "idle" | "sending" | "success" | "error";

export function LeadMagnet() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "skycity-7-oshibok-remonta.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      source: "lead-magnet:pdf-guide",
      message: "Скачал PDF-гайд «7 ошибок при ремонте квартиры»",
      website: String(fd.get("website") || ""),
    };

    if (!payload.name || !payload.phone) {
      setStatus("error");
      setErrorMsg("Заполните имя и телефон");
      return;
    }

    setStatus("sending");
    setErrorMsg(null);
    const res = await submitLead(payload);

    if (res.ok) {
      setStatus("success");
      triggerDownload();
      form.reset();
    } else if (res.status === 429) {
      setStatus("error");
      setErrorMsg("Слишком много заявок. Попробуйте позже.");
    } else {
      setStatus("error");
      setErrorMsg("Не удалось отправить. Позвоните нам напрямую.");
    }
  };

  return (
    <section id="lead-magnet" className="py-20 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-6xl">
        <div className="reveal grid md:grid-cols-2 gap-0 border border-border rounded-sm overflow-hidden shadow-xl">
          {/* Left: visual + value */}
          <div className="bg-dark text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="gold-divider" />
                <span className="text-primary uppercase tracking-[0.3em] text-xs font-semibold">
                  Бесплатно
                </span>
              </div>
              <h2 className="font-display font-bold uppercase text-3xl md:text-4xl leading-tight mb-4">
                7 ошибок при&nbsp;ремонте квартиры
              </h2>
              <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed">
                PDF-гайд на основе 2800+ сданных объектов и 7+ лет работы.
                Прочитайте до подписания договора с любым подрядчиком — сэкономите
                от 100 000 ₽ и нервы.
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Как поймать «резиновую» смету",
                  "Что должно быть в договоре, чтобы вас не кинули",
                  "На чём экономить можно, а на чём — нельзя",
                  "Чек-лист приёмки ремонта",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex items-center gap-3 text-white/50 text-xs">
              <FileText className="h-4 w-4 text-primary" />
              PDF · 4 страницы · ~60&nbsp;KB
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-card p-8 md:p-12 flex flex-col justify-center">
            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display font-bold uppercase text-2xl mb-3">
                  Гайд скачивается
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Если загрузка не началась — нажмите кнопку ниже. Мы также
                  перезвоним в течение дня, чтобы ответить на вопросы.
                </p>
                <a
                  href={PDF_URL}
                  download="skycity-7-oshibok-remonta.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-accent transition-all"
                >
                  <Download className="h-4 w-4" />
                  Скачать PDF
                </a>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold uppercase text-xl md:text-2xl mb-2">
                  Получить PDF на почту звонком
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Оставьте контакты — пришлём гайд и бесплатную консультацию по
                  вашему объекту.
                </p>
                <form onSubmit={onSubmit} className="grid gap-4">
                  <input
                    required
                    name="name"
                    placeholder="Имя *"
                    maxLength={100}
                    className="w-full bg-transparent border border-border px-4 py-3.5 rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="Телефон *"
                    maxLength={30}
                    className="w-full bg-transparent border border-border px-4 py-3.5 rounded-sm focus:outline-none focus:border-primary transition-colors"
                  />
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-accent transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <Download className="h-4 w-4" />
                    {status === "sending" ? "Отправляем…" : "Скачать PDF бесплатно"}
                  </button>
                  {status === "error" && errorMsg && (
                    <p className="text-xs text-center text-red-600">{errorMsg}</p>
                  )}
                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
