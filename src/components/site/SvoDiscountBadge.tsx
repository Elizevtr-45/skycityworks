import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "svo-discount-dismissed";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; // very smooth ease-out-expo-like

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
    const t = setTimeout(() => setExpanded(true), 800);
    const t2 = setTimeout(() => setExpanded(false), 6500);
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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (dismissed) return null;

  const EXPANDED_W = 300;
  const COLLAPSED_W = 56;

  return (
    <div
      style={{
        transition: `opacity 900ms ${EASE}, transform 900ms ${EASE}`,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        willChange: "transform, opacity",
      }}
      className="fixed bottom-6 left-6 z-50"
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        aria-label="Скидка 10% участникам СВО и их семьям"
        style={{
          width: expanded ? EXPANDED_W : COLLAPSED_W,
          height: 56,
          transition: `width 1100ms ${EASE}, box-shadow 600ms ease, transform 400ms ease`,
          willChange: "width",
        }}
        className="relative flex items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.7_0.08_65/0.6)] overflow-hidden hover:-translate-y-0.5"
      >
        <span
          className="absolute left-2 top-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 text-sm font-bold leading-none"
          style={{ transform: "translateY(-50%)" }}
        >
          −10%
        </span>
        <span
          style={{
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateX(0)" : "translateX(-8px)",
            transition: `opacity 700ms ${EASE} ${expanded ? "300ms" : "0ms"}, transform 700ms ${EASE} ${expanded ? "300ms" : "0ms"}`,
          }}
          className="absolute left-[56px] right-4 text-left text-xs sm:text-sm leading-tight whitespace-normal pointer-events-none"
        >
          Участникам СВО и их семьям —<br />
          <b>скидка 10%</b> на ремонт и строительство
        </span>
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Закрыть"
        style={{
          opacity: expanded ? 1 : 0,
          transform: expanded ? "scale(1)" : "scale(0.6)",
          transition: `opacity 500ms ${EASE} ${expanded ? "500ms" : "0ms"}, transform 500ms ${EASE} ${expanded ? "500ms" : "0ms"}`,
          pointerEvents: expanded ? "auto" : "none",
        }}
        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background text-foreground border border-border shadow flex items-center justify-center hover:bg-muted"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
