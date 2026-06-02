import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "svo-discount-dismissed";

export function SvoDiscountBadge() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      setDismissed(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setExpanded(true), 600);
    const t2 = setTimeout(() => setExpanded(false), 6000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [visible, dismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  const handleClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        aria-label="Скидка 10% участникам СВО и их семьям"
        className={`group relative flex items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.7_0.08_65/0.6)] overflow-hidden transition-[width,padding,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 ${
          expanded ? "w-[280px] sm:w-[320px] pl-2 pr-4 py-2" : "w-14 h-14 p-0 justify-center"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-sm font-bold leading-none animate-pulse">
          −10%
        </span>
        <span
          className={`ml-3 text-left text-xs sm:text-sm leading-tight whitespace-normal transition-all duration-500 ease-out ${
            expanded ? "opacity-100 translate-x-0 delay-150" : "opacity-0 -translate-x-2 pointer-events-none"
          }`}
        >
          Участникам СВО и их семьям —<br />
          <b>скидка 10%</b> на ремонт и строительство
        </span>
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Закрыть"
        className={`absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background text-foreground border border-border shadow flex items-center justify-center hover:bg-muted transition-all duration-300 ${
          expanded ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
