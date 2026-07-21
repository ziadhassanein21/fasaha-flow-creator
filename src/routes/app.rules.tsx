import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { grammarRules } from "@/lib/mock/data";

export const Route = createFileRoute("/app/rules")({
  head: () => ({ meta: [{ title: "قواعد اللغة · فصاحة" }] }),
  component: Rules,
});

const categories = ["الكل", "النحو", "الإملاء", "الأسلوب"];

function Rules() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("الكل");

  const filtered = grammarRules.filter(
    (r) =>
      (cat === "الكل" || r.category === cat) &&
      (q.trim() === "" || r.title.includes(q) || r.summary.includes(q)),
  );

  return (
    <div className="container-page py-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">مكتبة القواعد</h1>
        <p className="mt-1 text-muted-foreground">
          قواعد الفصحى مشروحةً بلغةٍ واضحة، مع أمثلةٍ من السياق المهنيّ.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن قاعدة…"
            className="rounded-full bg-secondary/60 pe-9"
          />
        </div>
        <div className="flex gap-1.5">
          {categories.map((c) => (
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
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <article
            key={r.slug}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lifted"
          >
            <div className="flex items-center justify-between">
              <Badge className="rounded-full bg-primary-soft text-primary" variant="secondary">
                {r.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{r.common.toLocaleString("ar")}</span>
            </div>
            <h3 className="mt-3 text-lg font-bold">{r.title}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-7 text-muted-foreground">{r.summary}</p>
            <button className="mt-4 self-start text-sm font-medium text-primary transition group-hover:underline">
              اقرأ القاعدة
            </button>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center text-sm text-muted-foreground">
            لا نتائج مطابقة لبحثك.
          </div>
        )}
      </div>
    </div>
  );
}
