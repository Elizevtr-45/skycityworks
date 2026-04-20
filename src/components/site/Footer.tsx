import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.svg";

export function Footer() {
  const [legal, setLegal] = useState<"privacy" | "terms" | "cookies" | null>(null);

  return (
    <>
      <footer className="bg-dark border-t border-white/10 pt-16 pb-8">
        <div className="container-px mx-auto max-w-7xl grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logo} alt="СКАЙСИТИ" className="h-10 w-auto brightness-0 invert" />
            <p className="mt-4 text-white/60 max-w-md text-sm leading-relaxed">
              Строительная компания полного спектра услуг. Ремонт квартир и домов под ключ,
              изготовление мебели, малоэтажное строительство в Приморском крае.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/skycity_works?igsh=MXZraHB4czRnYTRhcA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-sm border border-white/15 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/ConComSkyCity"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-sm border border-white/15 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="font-display font-bold uppercase text-white text-sm tracking-wider mb-4">
              Контакты
            </div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <a href="tel:+79693077772" className="hover:text-primary transition-colors">
                  8 969 307 77 72 — Денис
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <a href="tel:+79644455525" className="hover:text-primary transition-colors">
                  8 964 445 55 25 — Николай
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <a href="mailto:sk-skycity@mail.ru" className="hover:text-primary transition-colors">
                  sk-skycity@mail.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>
                  Приморский край,<br />
                  Надеждинский район,<br />
                  пос. Новый, ул. Хрустальная, 14
                </span>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-display font-bold uppercase text-white text-sm tracking-wider mb-4">
              Навигация
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#services" className="hover:text-primary transition-colors">Услуги</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">О компании</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
            </ul>
            <div className="font-display font-bold uppercase text-white text-sm tracking-wider mb-3 mt-6">
              Документы
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <button onClick={() => setLegal("privacy")} className="hover:text-primary transition-colors text-left">
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button onClick={() => setLegal("terms")} className="hover:text-primary transition-colors text-left">
                  Согласие на обработку ПД
                </button>
              </li>
              <li>
                <button onClick={() => setLegal("cookies")} className="hover:text-primary transition-colors text-left">
                  Политика cookie
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-px mx-auto max-w-7xl mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/40">
          <div>© {new Date().getFullYear()} СКАЙСИТИ. Все права защищены.</div>
          <div>Приморский край · Надеждинский район</div>
        </div>
      </footer>

      {legal && <LegalModal type={legal} onClose={() => setLegal(null)} />}
    </>
  );
}

function LegalModal({ type, onClose }: { type: "privacy" | "terms" | "cookies"; onClose: () => void }) {
  const content = {
    privacy: {
      title: "Политика конфиденциальности",
      body: (
        <>
          <p>
            Настоящая Политика конфиденциальности персональных данных (далее — Политика) действует
            в отношении всей информации, которую СКАЙСИТИ может получить о Пользователе во время
            использования сайта.
          </p>
          <h4>1. Общие положения</h4>
          <p>
            Использование сайта означает безоговорочное согласие Пользователя с настоящей Политикой
            и указанными в ней условиями обработки его персональной информации.
          </p>
          <h4>2. Состав персональных данных</h4>
          <p>
            Имя, номер телефона, адрес электронной почты, иные данные, добровольно предоставленные
            через формы обратной связи на сайте.
          </p>
          <h4>3. Цели обработки</h4>
          <p>
            Связь с Пользователем по запросу, согласование замера, расчёта стоимости и условий
            оказания услуг, направление информационных сообщений.
          </p>
          <h4>4. Сроки и способы хранения</h4>
          <p>
            Персональные данные хранятся на защищённых серверах и не передаются третьим лицам, за
            исключением случаев, предусмотренных законодательством РФ.
          </p>
          <h4>5. Контакты</h4>
          <p>
            Вопросы по обработке персональных данных направляйте на <a href="mailto:sk-skycity@mail.ru" className="text-primary">sk-skycity@mail.ru</a>.
          </p>
        </>
      ),
    },
    terms: {
      title: "Согласие на обработку персональных данных",
      body: (
        <>
          <p>
            Отправляя данные через формы на сайте СКАЙСИТИ, Пользователь подтверждает своё согласие
            на обработку своих персональных данных в соответствии с Федеральным законом
            № 152-ФЗ «О персональных данных».
          </p>
          <p>
            Согласие даётся на совершение следующих действий: сбор, запись, систематизацию, хранение,
            уточнение, использование, передачу (исключительно сотрудникам компании СКАЙСИТИ),
            обезличивание, блокирование и уничтожение персональных данных.
          </p>
          <p>
            Согласие действует до его отзыва Пользователем путём направления заявления на адрес
            <a href="mailto:sk-skycity@mail.ru" className="text-primary"> sk-skycity@mail.ru</a>.
          </p>
        </>
      ),
    },
    cookies: {
      title: "Политика использования файлов cookie",
      body: (
        <>
          <p>
            Сайт СКАЙСИТИ использует файлы cookie для улучшения работы сайта, анализа посещаемости
            и персонализации контента.
          </p>
          <p>
            Файлы cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере при
            посещении сайта. Они не содержат персональных данных и не передаются третьим лицам без
            вашего согласия.
          </p>
          <p>
            Вы можете отключить использование cookie в настройках вашего браузера, однако это может
            повлиять на корректность отображения сайта.
          </p>
        </>
      ),
    },
  }[type];

  return (
    <div
      className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-background max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-10"
        style={{ borderRadius: "10px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <h3 className="font-display font-bold uppercase text-xl md:text-2xl">{content.title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl leading-none px-2"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        <div className="text-sm text-muted-foreground space-y-3 leading-relaxed [&_h4]:font-display [&_h4]:font-bold [&_h4]:uppercase [&_h4]:text-foreground [&_h4]:text-sm [&_h4]:mt-4">
          {content.body}
        </div>
      </div>
    </div>
  );
}
