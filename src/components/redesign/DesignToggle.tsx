import { Sparkles, RotateCcw } from "lucide-react";

export function DesignToggle({
  isV2,
  onToggle,
}: {
  isV2: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`fixed bottom-6 left-6 z-[60] inline-flex items-center gap-2 px-4 h-11 rounded-full shadow-lg text-sm font-semibold transition-colors ${
        isV2
          ? "bg-white text-black hover:bg-white/90"
          : "bg-[#FF6A00] text-white hover:bg-[#ff7a1f]"
      }`}
      aria-label={isV2 ? "Вернуть старый дизайн" : "Включить новый дизайн"}
    >
      {isV2 ? (
        <>
          <RotateCcw className="h-4 w-4" />
          Вернуть старый дизайн
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Новый дизайн
        </>
      )}
    </button>
  );
}
