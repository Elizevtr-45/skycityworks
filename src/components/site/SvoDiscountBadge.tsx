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

  // Auto-expand briefly first time it appears
  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setExpanded(true), 400);
    const t2 = setTimeout(() => setExpanded(false), 5000);
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
    const el = document.getElementById("lead");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        aria-label="Скидка 10% участникам СВО и их семьям"
        className={`group relative flex items-center gap-3 rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.7_0.08_65/0.6)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ${
          expanded ? "pl-3 pr-5 py-2 max-w-[320px]" : "h-14 w-14 max-w-[56px] justify-center"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-sm font-bold leading-none">
          −10%
        </span>
        <span
          className={`text-left text-xs sm:text-sm leading-tight whitespace-normal transition-opacity duration-200 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Участникам СВО и их семьям —<br />
          <b>скидка 10%</b> на ремонт и строительство
        </span>
      </button>
      {expanded && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Закрыть"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background text-foreground border border-border shadow flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
