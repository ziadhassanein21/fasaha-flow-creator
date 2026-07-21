import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ArrowLeft } from "lucide-react";
import { books } from "@/lib/mock/library";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/library")({
  head: () => ({ meta: [{ title: "المكتبة · فصاحة" }] }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <div className="container-page py-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">مكتبة القراءة</h1>
        <p className="mt-1 text-muted-foreground">
          نخبةٌ من كتب التراث العربيّ، اقرأها داخل فصاحة لترتقي بلغتك.
        </p>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((b) => (
          <li
            key={b.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:shadow-lifted"
          >
            <div
              className="relative flex aspect-[4/3] items-end p-5 text-white"
              style={{ background: b.gradient }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25),_transparent_60%)]" />
              <div className="relative">
                <div className="text-[10px] font-semibold uppercase tracking-widest opacity-80">
                  {b.era}
                </div>
                <div className="mt-1 font-display text-2xl font-extrabold leading-tight">
                  {b.title}
                </div>
                <div className="mt-1 text-sm opacity-90">{b.author}</div>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-center justify-between">
                <Badge variant="secondary" className="rounded-full text-[10px]">
                  {b.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {b.pages} صفحة
                </span>
              </div>
              <p className="line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                {b.description}
              </p>
              <Link
                to="/app/library/$bookId"
                params={{ bookId: b.id }}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
              >
                <BookOpen className="h-4 w-4" />
                افتح الكتاب
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
