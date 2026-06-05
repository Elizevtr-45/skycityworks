import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";

const phones = [
  {
    name: "Николай, руководитель — ремонтные работы",
    label: "8 964 445 55 25",
    href: "tel:+79644455525",
  },
  {
    name: "Денис, руководитель — приёмка квартир и уличные работы",
    label: "8 969 307 77 72",
    href: "tel:+79693077772",
  },
];

export function Contacts() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mb-10 md:mb-14">
          <span className="inline-block px-5 py-2 rounded-full border border-border text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">
            Контакты
          </span>
          <h2 className="mt-6 font-display font-black uppercase text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
            Контакты
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Phones + email card */}
            <div className="reveal rounded-3xl bg-muted/60 border border-border/60 p-6 md:p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_25px_80px_-30px_oklch(0.72_0.2_50/0.35)]">
              <div className="space-y-6">
                {phones.map((p) => (
                  <div key={p.href}>
                    <div className="text-sm text-muted-foreground mb-1.5">{p.name}</div>
                    <a
                      href={p.href}
                      className="inline-flex items-center gap-2 text-2xl md:text-3xl font-display font-bold text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-foreground/30 hover:decoration-primary"
                    >
                      <Phone className="h-5 w-5 text-primary" />
                      {p.label}
                    </a>
                  </div>
                ))}

                <div className="pt-2 border-t border-border/60">
                  <div className="text-sm text-muted-foreground mb-1.5 mt-4">Электронная почта</div>
                  <a
                    href="mailto:skycityworks@mail.ru"
                    className="inline-flex items-center gap-2 text-lg md:text-xl font-display font-bold text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-foreground/30 hover:decoration-primary break-all"
                  >
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    skycityworks@mail.ru
                  </a>
                </div>
              </div>
            </div>

            {/* Address + socials card */}
            <div className="reveal rounded-3xl bg-muted/60 border border-border/60 p-6 md:p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_25px_80px_-30px_oklch(0.72_0.2_50/0.35)]">
              <div className="text-sm text-muted-foreground mb-2">Адрес</div>
              <div className="flex items-start gap-2 text-xl md:text-2xl font-display font-bold text-foreground leading-snug">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span>Владивосток, Приморский край</span>
              </div>

              <div className="mt-7">
                <div className="text-sm text-muted-foreground mb-3">Социальные сети</div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://t.me/ConComSkyCity"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent shadow-md"
                  >
                    <Send className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/79644455525"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent shadow-md"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/skycity_works?igsh=MXZraHB4czRnYTRhcA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent shadow-md text-xs font-bold tracking-tight"
                  >
                    IG
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="reveal rounded-3xl overflow-hidden border border-border/60 min-h-[420px] lg:min-h-full shadow-lg">
            <iframe
              title="Карта — Владивосток"
              src="https://yandex.ru/map-widget/v1/?ll=131.886486%2C43.115538&z=12&mode=search&text=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%BE%D0%BA"
              className="w-full h-full min-h-[420px] block"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
