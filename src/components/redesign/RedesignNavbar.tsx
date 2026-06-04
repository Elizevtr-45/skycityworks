import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle, Send } from "lucide-react";
import logo from "@/assets/logo.svg";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#calculator", label: "Рассчитать стоимость" },
  { href: "#about", label: "О компании" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "Частые вопросы" },
  { href: "#contact", label: "Контакты" },
];

export function RedesignNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20 gap-4">
        <a href="#top" className="flex items-center shrink-0" aria-label="СКАЙСИТИ — на главную">
          <img src={logo} alt="СКАЙСИТИ" className="h-8 md:h-10 w-auto brightness-0 invert" />
        </a>

        <nav className="hidden xl:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/85 hover:text-[#FF6A00] transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href="tel:+79644455525" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors" aria-label="Позвонить">
            <Phone className="h-4 w-4" />
          </a>
          <a href="https://wa.me/79644455525" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors" aria-label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </a>
          <a href="https://t.me/skycityworks" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors" aria-label="Telegram">
            <Send className="h-4 w-4" />
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-lead-form"))}
            className="ml-2 inline-flex items-center justify-center px-5 h-10 rounded-full bg-[#FF6A00] text-white text-sm font-semibold hover:bg-[#ff7a1f] transition-colors"
          >
            Заказать звонок
          </button>
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden text-white p-2"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-black border-t border-white/5">
          <div className="container-px mx-auto py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/85 hover:text-[#FF6A00] transition-colors text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a href="tel:+79644455525" className="inline-flex items-center gap-2 text-[#FF6A00] font-semibold">
                <Phone className="h-4 w-4" /> 8 964 445 55 25
              </a>
              <a href="tel:+79693077772" className="inline-flex items-center gap-2 text-[#FF6A00] font-semibold">
                <Phone className="h-4 w-4" /> 8 969 307 77 72
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
