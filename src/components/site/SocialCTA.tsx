import { Instagram, Send } from "lucide-react";

export function SocialCTA() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-5">
          <a
            href="https://www.instagram.com/skycity_works?igsh=MXZraHB4czRnYTRhcA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal group relative overflow-hidden p-8 md:p-10 bg-dark text-white hover-lift transition-all"
            style={{ borderRadius: "10px" }}
          >
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Instagram className="h-56 w-56" />
            </div>
            <div className="relative flex items-start gap-5">
              <div className="h-14 w-14 rounded-sm bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <Instagram className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-2">
                  Instagram · @skycity_works
                </div>
                <h3 className="font-display font-bold uppercase text-xl md:text-2xl mb-2">
                  Закулисье наших объектов
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Ежедневные обновления с площадок, тайм-лапсы ремонтов и готовые интерьеры.
                  Подпишитесь, чтобы первыми видеть новые проекты.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
                  Подписаться <span>→</span>
                </div>
              </div>
            </div>
          </a>

          <a
            href="https://t.me/ConComSkyCity"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal group relative overflow-hidden p-8 md:p-10 bg-dark text-white hover-lift transition-all"
            style={{ borderRadius: "10px" }}
          >
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Send className="h-56 w-56" />
            </div>
            <div className="relative flex items-start gap-5">
              <div className="h-14 w-14 rounded-sm bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <Send className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-2">
                  Telegram · ConComSkyCity
                </div>
                <h3 className="font-display font-bold uppercase text-xl md:text-2xl mb-2">
                  Спецпредложения и акции
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Анонсы скидок, открытые сметы, советы по выбору материалов и быстрые ответы
                  на вопросы — всё в нашем Telegram-канале.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
                  Перейти в канал <span>→</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
