import { LEVELS, levelProgress } from "@/lib/levels";

export function LevelProgress({ score }: { score: number }) {
  const { level, next, pct } = levelProgress(score);
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="text-xs text-muted-foreground">مستواك الحاليّ</div>
          <div className="mt-0.5 flex items-center gap-2">
            <span
              className="text-2xl font-extrabold"
              style={{ color: level.color }}
            >
              {level.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {score}٪ من ١٠٠
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{level.desc}</p>
        </div>
        {next && (
          <div className="text-end text-xs text-muted-foreground">
            المستوى التالي
            <div className="text-sm font-semibold text-foreground">
              {next.name}
            </div>
            <div>يبعد {next.min - score}٪</div>
          </div>
        )}
      </div>

      <div
        className="relative mt-5 h-2 overflow-hidden rounded-full bg-secondary"
        dir="rtl"
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: level.color }}
        />
      </div>

      <ol className="mt-5 grid grid-cols-5 gap-2">
        {LEVELS.map((l) => {
          const reached = score >= l.min;
          const current = l.key === level.key;
          return (
            <li
              key={l.key}
              className={`rounded-2xl border p-2.5 text-center text-xs transition ${
                current
                  ? "border-transparent shadow-soft"
                  : reached
                  ? "border-border bg-secondary/60"
                  : "border-dashed border-border/70 text-muted-foreground/70"
              }`}
              style={
                current
                  ? {
                      background: `color-mix(in oklch, ${l.color} 12%, var(--color-card))`,
                      color: l.color,
                    }
                  : undefined
              }
            >
              <div className="font-bold">{l.name}</div>
              <div className="mt-0.5 text-[10px] opacity-80">
                {l.min}٪–{l.max === 101 ? "١٠٠" : l.max}٪
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
