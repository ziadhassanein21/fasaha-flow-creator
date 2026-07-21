import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { label: "المنهجية", href: "#how" },
  { label: "الأدوات", href: "#features" },
  { label: "الأسعار", href: "#pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center transition-all duration-300 ${
        scrolled
          ? "h-16 bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm"
          : "h-24 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page w-full flex items-center justify-between">
        <Logo />
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-6 pe-6 border-e border-border/60">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/auth/login" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              دخول
            </Link>
            <Button asChild className="rounded-none shadow-float hover:shadow-none transition-shadow">
              <Link to="/auth/register">ابدأ رحلتك</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle variant="ghost" />

          {/* Mobile Nav Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center text-foreground"
            aria-label="القائمة"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 border-b border-border bg-background p-6 shadow-float md:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-semibold text-foreground py-2 border-b border-border/30"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/auth/login"
                onClick={() => setOpen(false)}
                className="text-center text-lg font-semibold text-foreground py-3 border border-border"
              >
                دخول
              </Link>
              <Button asChild size="lg" className="rounded-none w-full text-lg">
                <Link to="/auth/register" onClick={() => setOpen(false)}>ابدأ رحلتك</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
