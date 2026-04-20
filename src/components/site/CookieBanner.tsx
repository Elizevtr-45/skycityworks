import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "skycity_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    window.localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[90] animate-in slide-in-from-bottom-5">
      <div
        className="bg-dark text-white border border-primary/30 shadow-2xl p-5 md:p-6"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex items-start gap-3 mb-3">
          <Cookie className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div className="flex-1">
            <div className="font-display font-bold uppercase text-sm tracking-wider">Мы используем cookie</div>
          </div>
          <button onClick={decline} aria-label="Закрыть" className="text-white/50 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-white/70 leading-relaxed mb-4">
          Используя сайт, вы соглашаетесь с обработкой файлов cookie и пользовательских данных
          в соответствии с{" "}
          <a href="#" className="text-primary underline underline-offset-2">политикой конфиденциальности</a>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 px-4 py-2.5 bg-primary text-white font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-accent transition-colors"
          >
            Принять
          </button>
          <button
            onClick={decline}
            className="px-4 py-2.5 border border-white/20 text-white/80 font-semibold uppercase tracking-wider text-xs rounded-sm hover:bg-white/5 transition-colors"
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
}
