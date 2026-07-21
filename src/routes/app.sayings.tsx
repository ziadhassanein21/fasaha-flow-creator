import { createFileRoute, Link } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { ChevronRight, ChevronLeft, X, Check } from "lucide-react";
import { sayings } from "@/lib/mock/sayings";
import { Badge } from "@/components/ui/badge";

const PER_PAGE = 9;

const schema = z.object({
  page: fallback(z.number().int(), 1).default(1),
  cat: fallback(z.string(), "الكل").default("الكل"),
});

export const Route = createFileRoute("/app/sayings")({
  head: () => ({ meta: [{ title: "قل ولا تقل · فصاحة" }] }),
  validateSearch: zodValidator(schema),
  component: SayingsPage,
});

const CATEGORIES = ["الكل", "نحو", "صرف", "إملاء", "أسلوب", "عاميّة", "دخيل"] as const;

function SayingsPage() {
  const { page, cat } = Route.useSearch();

  const filtered =
    cat === "الكل" ? sayings : sayings.filter((s) => s.category === cat);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * PER_PAGE;
  const items = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="container-page py-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">قُل ولا تقُل</h1>
        <p className="mt-1 text-muted-foreground">
          أخطاء شائعة في الفصحى، وصيغُها الصحيحة، مع شرحٍ موجز.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            to="/app/sayings"
            search={{ page: 1, cat: c }}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/80 hover:bg-secondary"
            }`}
          >
            {c}
          </Link>
        ))}
        <span className="ms-auto text-xs text-muted-foreground">
          {filtered.length} نصيحة
        </span>
      </div>

      <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((s) => (
          <li
            key={s.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
          >
            <div className="grid grid-cols-2 divide-x divide-x-reverse divide-border">
              <div className="bg-destructive/5 p-4">
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                  <X className="h-3 w-3" /> لا تقُل
                </div>
                <p className="text-base font-semibold leading-8 text-destructive/90">
                  {s.wrong}
                </p>
              </div>
              <div className="bg-success/5 p-4">
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                  <Check className="h-3 w-3" /> قُل
                </div>
                <p className="text-base font-semibold leading-8 text-success">
                  {s.right}
                </p>
              </div>
            </div>
            <div className="flex-1 p-4">
              <p className="text-sm leading-7 text-foreground/80">{s.explanation}</p>
              <div className="mt-3">
                <Badge variant="secondary" className="rounded-full text-[10px]">
                  {s.category}
                </Badge>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <nav className="mt-8 flex items-center justify-center gap-2">
        <Link
          to="/app/sayings"
          search={{ page: Math.max(1, safePage - 1), cat }}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-sm transition hover:bg-secondary ${
            safePage === 1 ? "pointer-events-none opacity-40" : ""
          }`}
          aria-label="السابق"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            to="/app/sayings"
            search={{ page: p, cat }}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
              p === safePage
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card hover:bg-secondary"
            }`}
          >
            {p}
          </Link>
        ))}
        <Link
          to="/app/sayings"
          search={{ page: Math.min(totalPages, safePage + 1), cat }}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-sm transition hover:bg-secondary ${
            safePage === totalPages ? "pointer-events-none opacity-40" : ""
          }`}
          aria-label="التالي"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </nav>
    </div>
  );
}
