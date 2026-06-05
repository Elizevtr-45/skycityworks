import { Phone, Mail, MapPin, Send, MessageCircle, MessagesSquare } from "lucide-react";

const phones = [
  { name: "Николай — руководитель", label: "8 964 445 55 25", href: "tel:+79644455525" },
  { name: "Денис — руководитель", label: "8 969 307 77 72", href: "tel:+79693077772" },
];

const socials = [
  { label: "Telegram", href: "https://t.me/ConComSkyCity", Icon: Send },
  { label: "WhatsApp", href: "https://wa.clck.bar/1b82e4", Icon: MessageCircle },
  { label: "Max", href: "https://max.ru", Icon: MessagesSquare },
];

export function Contacts() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-16 md:py-28 bg-aurora-orange overflow-hidden">
      <div className="container-px mx-auto max-w-7xl relative">
        <div className="reveal mb-10 md:mb-14 text-center md:text-left">
          <span className="inline-block px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
            Контакты
          </span>
          <h2 className="mt-6 font-display font-black uppercase text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
            На связи <span className="text-gradient-gold">24/7</span>
          </h2>
          <div className="gold-divider mt-6 mx-auto md:mx-0" />
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto md:mx-0">
            Руководители Николай и Денис лично ведут все ремонтные работы — звоните, пишите в мессенджеры или приезжайте в офис.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <div className="reveal surface-elevated rounded-3xl p-6 md:p-8 hover-lift">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
                  Телефоны
                </div>
              </div>

              <div className="space-y-5">
                {phones.map((p) => (
                  <div key={p.href} className="group">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{p.name}</div>
                    <a
                      href={p.href}
                      className="inline-block text-2xl md:text-3xl font-display font-bold text-foreground hover:text-primary"
                    >
                      {p.label}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-6 border-t border-border/60">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-3">
                  Электронная почта
                </div>
                <a
                  href="mailto:skycityworks@mail.ru"
                  className="inline-flex items-center gap-2 text-lg md:text-xl font-display font-bold text-foreground hover:text-primary break-all"
                >
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  skycityworks@mail.ru
                </a>
              </div>
            </div>

            <div className="reveal surface-elevated rounded-3xl p-6 md:p-8 hover-lift">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
                  Адрес офиса
                </div>
              </div>
              <div className="text-xl md:text-2xl font-display font-bold text-foreground leading-snug">
                Приморский край,<br />
                Надеждинский&nbsp;район,<br />
                пос.&nbsp;Новый, ул.&nbsp;Хрустальная,&nbsp;14
              </div>

              <div className="mt-7 pt-6 border-t border-border/60">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-4">
                  Мессенджеры
                </div>
                <div className="flex items-center gap-3">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="group h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center shadow-[0_15px_40px_-15px_oklch(0.72_0.2_50/0.6)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_oklch(0.72_0.2_50/0.8)]"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="reveal surface-elevated rounded-3xl overflow-hidden min-h-[460px] lg:min-h-full p-1.5">
            <iframe
              title="Карта — пос. Новый, ул. Хрустальная, 14"
              src="https://yandex.ru/map-widget/v1/?ll=131.873%2C43.305&z=16&mode=search&text=Приморский%20край%2C%20Надеждинский%20район%2C%20пос.%20Новый%2C%20улица%20Хрустальная%2C%2014"
              className="w-full h-full min-h-[460px] block rounded-[22px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
