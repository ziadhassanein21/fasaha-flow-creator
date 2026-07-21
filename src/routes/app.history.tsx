import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, Download, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { recentDocuments } from "@/lib/mock/data";

export const Route = createFileRoute("/app/history")({
  head: () => ({ meta: [{ title: "الأرشيف · فصاحة" }] }),
  component: HistoryPage,
});

const cats = ["الكل", "بريد", "منشور", "تقرير", "رسالة"];

function HistoryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("الكل");
  const [onlyFav, setOnlyFav] = useState(false);

  const items = recentDocuments.filter(
    (d) =>
      (cat === "الكل" || d.category === cat) &&
      (!onlyFav || d.favorite) &&
      (q.trim() === "" || d.title.includes(q) || d.original.includes(q)),
  );

  return (
    <div className="container-page py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">الأرشيف</h1>
          <p className="mt-1 text-muted-foreground">جميع نصوصك المُصحَّحة في مكانٍ واحد.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
          <Download className="h-4 w-4" /> تصدير الكلّ
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث في نصوصك…"
            className="rounded-full bg-secondary/60 pe-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
          <button
            onClick={() => setOnlyFav((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              onlyFav
                ? "bg-accent text-accent-foreground"
                : "border border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" /> المفضّلة
          </button>
        </div>
      </div>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {items.map((d) => (
          <li key={d.id} className="group flex items-center gap-4 p-5 transition hover:bg-secondary/50">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-semibold">{d.title}</p>
                {d.favorite && <Bookmark className="h-4 w-4 fill-accent text-accent" />}
                <Badge variant="secondary" className="rounded-full">{d.category}</Badge>
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{d.original}</p>
            </div>
            <span className="hidden text-xs text-muted-foreground md:inline">{d.createdAt}</span>
            <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
              <button className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-background">
                <Download className="h-4 w-4" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-background hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <li className="p-10 text-center text-sm text-muted-foreground">لا توجد نصوص مطابقة.</li>
        )}
      </ul>
    </div>
  );
}
