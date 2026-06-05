import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.svg";

type NavLink = { href?: string; label: string; action?: "lead" };

const links: NavLink[] = [
  { href: "#portfolio", label: "Портфолио" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#process", label: "Процесс" },
  { href: "#about", label: "О компании" },
  { label: "Контакты", action: "lead" },
];

const openLead = () => window.dispatchEvent(new CustomEvent("open-lead-form"));

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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color,padding] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        scrolled ? "liquid-glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.45)]" : "bg-transparent"
      }`}
    >
      <div
        className={`container-px mx-auto max-w-7xl flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        }`}
      >
        <a href="#top" className="flex items-center" aria-label="СКАЙСИТИ — на главную">
          <img
            src={logo}
            alt="СКАЙСИТИ"
            className={`w-auto brightness-0 invert transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
              scrolled ? "h-7 md:h-9" : "h-8 md:h-10"
            }`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) =>
            l.action === "lead" ? (
              <button
                key={l.label}
                type="button"
                onClick={openLead}
                className="text-sm text-white/80 hover:text-primary transition-colors duration-500 uppercase tracking-wider font-medium"
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/80 hover:text-primary transition-colors duration-500 uppercase tracking-wider font-medium"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary shrink-0" />
          <div className="flex flex-col leading-tight">
            <a
              href="tel:+79644455525"
              className="text-white text-sm font-semibold hover:text-primary transition-colors duration-500"
            >
              8 964 445 55 25
            </a>
            <a
              href="tel:+79693077772"
              className="text-white text-sm font-semibold hover:text-primary transition-colors duration-500"
            >
              8 969 307 77 72
            </a>
          </div>
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2 relative h-10 w-10 flex items-center justify-center z-[60]"
        >
          <Menu
            className={`absolute transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu — всегда смонтировано, плавно открывается/закрывается */}
      <div
        className={`lg:hidden fixed inset-0 top-16 md:top-20 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "opacity-100 z-40 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`lg:hidden absolute left-0 right-0 top-full z-50 bg-dark border-t border-white/5 origin-top transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] overflow-hidden ${
          open ? "opacity-100 translate-y-0 max-h-[80vh]" : "opacity-0 -translate-y-3 max-h-0 pointer-events-none"
        }`}
      >
        <div className="container-px mx-auto py-4 flex flex-col gap-4">
          {links.map((l) =>
            l.action === "lead" ? (
              <button
                key={l.label}
                type="button"
                onClick={() => {
                  setOpen(false);
                  openLead();
                }}
                className="text-left text-white/80 hover:text-primary transition-colors duration-500 uppercase tracking-wider text-sm font-medium"
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-primary transition-colors duration-500 uppercase tracking-wider text-sm font-medium"
              >
                {l.label}
              </a>
            )
          )}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a href="tel:+79644455525" className="inline-flex items-center gap-2 text-primary font-semibold">
              <Phone className="h-4 w-4" /> 8 964 445 55 25 — Николай
            </a>
            <a href="tel:+79693077772" className="inline-flex items-center gap-2 text-primary font-semibold">
              <Phone className="h-4 w-4" /> 8 969 307 77 72 — Денис
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

