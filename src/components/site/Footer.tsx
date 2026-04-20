import { Phone, Mail, MapPin, Instagram, Send, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 pt-16 pb-8">
      <div className="container-px mx-auto max-w-7xl grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display font-bold text-xl uppercase tracking-widest text-white">
            Велес<span className="text-primary">·</span>Ремонт
          </div>
          <p className="mt-4 text-white/60 max-w-md text-sm leading-relaxed">
            Ремонт квартир под ключ во Владивостоке. Премиум-качество, фиксированные
            сроки и гарантия до 5 лет.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Send, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 rounded-sm border border-white/15 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                aria-label="Соцсеть"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-display font-bold uppercase text-white text-sm tracking-wider mb-4">
            Контакты
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-primary mt-0.5" />
              <a href="tel:+74232000000" className="hover:text-primary transition-colors">
                +7 (423) 200-00-00
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-primary mt-0.5" />
              <a href="mailto:hello@veles-remont.ru" className="hover:text-primary transition-colors">
                hello@veles-remont.ru
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5" />
              <span>г. Владивосток,<br />ул. Светланская, 45</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-display font-bold uppercase text-white text-sm tracking-wider mb-4">
            Навигация
          </div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#services" className="hover:text-primary transition-colors">Услуги</a></li>
            <li><a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a></li>
            <li><a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
          </ul>
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/40">
        <div>© {new Date().getFullYear()} Велес·Ремонт. Все права защищены.</div>
        <div>Владивосток, Приморский край</div>
      </div>
    </footer>
  );
}
