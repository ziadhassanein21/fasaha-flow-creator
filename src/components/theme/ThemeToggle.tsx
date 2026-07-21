import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type Props = {
  className?: string;
  variant?: "ghost" | "bordered";
};

export function ThemeToggle({ className = "", variant = "bordered" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const base =
    "group relative grid h-9 w-9 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const style =
    variant === "ghost"
      ? "text-muted-foreground hover:bg-secondary hover:text-foreground"
      : "border border-border bg-background/60 text-foreground hover:bg-secondary";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
      className={`${base} ${style} ${className}`}
    >
      <Sun
        className={`h-4 w-4 transition-all duration-300 ${
          isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
