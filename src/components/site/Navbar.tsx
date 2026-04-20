import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.svg";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "О компании" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#process", label: "Процесс" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#contact", label: "Контакты" },
];

export function Navbar() {
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
        scrolled
          ? "bg-dark/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center" aria-label="СКАЙСИТИ — на главную">
          <img src={logo} alt="СКАЙСИТИ" className="h-8 md:h-10 w-auto brightness-0 invert" />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 hover:text-primary transition-colors uppercase tracking-wider font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+79693077772"
            className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            8 969 307 77 72
          </a>
          <a
            href="tel:+79644455525"
            className="hidden xl:inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            8 964 445 55 25
          </a>
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-dark border-t border-white/5">
          <div className="container-px mx-auto py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-primary transition-colors uppercase tracking-wider text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a href="tel:+79693077772" className="inline-flex items-center gap-2 text-primary font-semibold">
                <Phone className="h-4 w-4" /> 8 969 307 77 72 — Денис
              </a>
              <a href="tel:+79644455525" className="inline-flex items-center gap-2 text-primary font-semibold">
                <Phone className="h-4 w-4" /> 8 964 445 55 25 — Николай
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
