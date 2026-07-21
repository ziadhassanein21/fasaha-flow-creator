import { Sparkles } from "lucide-react";
import { getLevel } from "@/lib/levels";

export function LevelBadge({
  score,
  size = "sm",
}: {
  score: number;
  size?: "sm" | "md";
}) {
  const level = getLevel(score);
  const isMd = size === "md";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${
        isMd ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs"
      }`}
      style={{
        borderColor: level.color,
        color: level.color,
        background: `color-mix(in oklch, ${level.color} 10%, transparent)`,
      }}
    >
      <Sparkles className={isMd ? "h-3.5 w-3.5" : "h-3 w-3"} />
      {level.name}
    </span>
  );
}
