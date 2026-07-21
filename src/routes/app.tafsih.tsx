import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpenText,
  Copy,
  Download,
  History,
  Mic,
  Save,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { demoDocument, type Correction } from "@/lib/mock/data";

export const Route = createFileRoute("/app/tafsih")({
  head: () => ({ meta: [{ title: "تفصيح · فصاحة" }] }),
  component: Tafsih,
});

const samples = [
  {
    label: "بريد للعميل",
    text: demoDocument.original,
  },
  {
    label: "منشور لينكدإن",
    text: "اليوم بشارككم انجاز جديد حققه فريقنا. الحمدلله وصلنا لنسبه نمو ٤٠٪ خلال ٦ اشهر بس. شكرا لكل شخص كان معنا بالرحله.",
  },
  {
    label: "رسالة اعتذار",
    text: "اعتذر منك على التاخير في الرد، كان في شغل واجد وما قدرت اتواصل معك. اذا بتحب نتفق على موعد جديد ياريت تخبرني.",
  },
];

function Tafsih() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<typeof demoDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [openC, setOpenC] = useState<Correction | null>(null);

  const run = () => {
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(demoDocument);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="container-page py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" /> تفصيح
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
            حوّل نصّك إلى فصحى مهنيّة
          </h1>
          <p className="mt-1 text-muted-foreground">
            الصق أو اكتب. اضغط «صحّح»، ثم انقر على أيّ تعديلٍ لتفهمه.
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <Button variant="outline" className="rounded-full">
            <History className="ms-2 h-4 w-4" />
            السجل
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">النصّ الأصليّ</span>
            <div className="flex flex-wrap gap-1.5">
              {samples.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setText(s.text)}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="الصق رسالتك، منشورك، أو أيّ نصٍّ عربيٍّ تريد أن تُحوّله إلى فصحى مهنيّة…"
            className="min-h-[300px] resize-none rounded-2xl border-border bg-background text-[15px] leading-9"
            dir="rtl"
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <button className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary">
                <Mic className="h-4 w-4" />
              </button>
              <span>{text.trim() ? `${text.trim().split(/\s+/).length} كلمة` : "ابدأ الكتابة"}</span>
            </div>
            <Button onClick={run} disabled={loading || !text.trim()} className="rounded-full px-6">
              <Wand2 className="ms-2 h-4 w-4" />
              {loading ? "…جارٍ التفصيح" : "صحّح النصّ"}
            </Button>
          </div>
        </div>

        {/* Result */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-primary">النسخة الفصيحة</span>
            {result && (
              <div className="flex items-center gap-1">
                <IconBtn label="نسخ" onClick={() => {
                  navigator.clipboard.writeText(result.corrected);
                  toast.success("تمّ نسخ النص");
                }}>
                  <Copy className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="حفظ" onClick={() => toast.success("تم الحفظ في الأرشيف")}>
                  <Save className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="تصدير">
                  <Download className="h-4 w-4" />
                </IconBtn>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <SkeletonResult key="s" />
            ) : result ? (
              <motion.div
                key="r"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <RenderedCorrection doc={result} onClickCorrection={setOpenC} />
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                  <StatBadge>
                    {result.corrections.length} تعديلات
                  </StatBadge>
                  <StatBadge tone="accent">
                    {new Set(result.corrections.map((c) => c.rule)).size} قواعد
                  </StatBadge>
                  <StatBadge tone="muted">مستوى مهنيّ</StatBadge>
                </div>
              </motion.div>
            ) : (
              <EmptyState key="e" />
            )}
          </AnimatePresence>
        </div>
      </div>

      <Sheet open={!!openC} onOpenChange={(o) => !o && setOpenC(null)}>
        <SheetContent side="left" className="w-full sm:max-w-md">
          {openC && (
            <>
              <SheetHeader className="text-start">
                <div className="flex items-center gap-2 text-xs text-primary">
                  <BookOpenText className="h-4 w-4" /> شرح التعديل
                </div>
                <SheetTitle className="text-start text-xl">{openC.rule}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-border bg-secondary/50 p-4">
                  <div className="mb-2 text-xs text-muted-foreground">قبل</div>
                  <p className="text-[15px] font-semibold text-diff-removed-fg line-through decoration-diff-removed-fg/40">
                    {openC.original}
                  </p>
                  <div className="mb-2 mt-3 text-xs text-muted-foreground">بعد</div>
                  <p className="text-[15px] font-semibold text-primary">{openC.suggestion}</p>
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                    لماذا؟
                  </div>
                  <p className="text-[15px] leading-8 text-foreground/90">{openC.explanation}</p>
                </div>
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                    أمثلة
                  </div>
                  <ul className="space-y-2">
                    {openC.examples.map((e, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-border bg-card px-4 py-2.5 text-[14.5px] leading-7"
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-primary-soft/50 p-4 text-sm">
                  <p className="font-semibold text-primary">
                    ستُضاف هذه القاعدة إلى مراجعتك القادمة.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    سنُذكّرك بها ضمن جلسة المراجعة اليومية.
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function RenderedCorrection({
  doc,
  onClickCorrection,
}: {
  doc: typeof demoDocument;
  onClickCorrection: (c: Correction) => void;
}) {
  const toneFor = (t: Correction["type"]) => {
    switch (t) {
      case "grammar":
        return "bg-diff-changed-bg text-diff-changed-fg";
      case "spelling":
        return "bg-diff-added-bg text-diff-added-fg";
      case "style":
        return "bg-diff-changed-bg text-diff-changed-fg";
      case "punctuation":
        return "bg-diff-added-bg text-diff-added-fg";
    }
  };

  // Rebuild the corrected text with clickable spans around each suggestion.
  let rendered: React.ReactNode[] = [doc.corrected];
  for (const c of doc.corrections) {
    const next: React.ReactNode[] = [];
    for (const chunk of rendered) {
      if (typeof chunk !== "string" || !chunk.includes(c.suggestion)) {
        next.push(chunk);
        continue;
      }
      const parts = chunk.split(c.suggestion);
      parts.forEach((p, i) => {
        if (p) next.push(p);
        if (i < parts.length - 1) {
          next.push(
            <button
              key={`${c.id}-${i}`}
              onClick={() => onClickCorrection(c)}
              className={`mx-0.5 rounded-md px-1.5 py-0.5 text-inherit underline-offset-4 hover:underline ${toneFor(c.type)}`}
            >
              {c.suggestion}
            </button>,
          );
        }
      });
    }
    rendered = next;
  }

  return (
    <p className="text-[15.5px] leading-[2.1] text-foreground">
      {rendered.map((n, i) => (
        <span key={i}>{n}</span>
      ))}
    </p>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background/60 p-8 text-center"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Wand2 className="h-5 w-5" />
      </span>
      <p className="mt-4 text-base font-semibold">نتيجتك ستظهر هنا</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        اكتب أو الصق نصًّا، ثم اضغط «صحّح» لتحصل على نسخة فصيحة مع شرحٍ لكلِّ تعديل.
      </p>
    </motion.div>
  );
}

function SkeletonResult() {
  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3 rounded-2xl border border-border bg-background p-5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-4 animate-pulse rounded-md bg-secondary"
          style={{ width: `${70 + Math.random() * 30}%` }}
        />
      ))}
    </motion.div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
    >
      {children}
    </button>
  );
}

function StatBadge({
  children,
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: "primary" | "accent" | "muted";
}) {
  const cls =
    tone === "primary"
      ? "bg-primary-soft text-primary"
      : tone === "accent"
      ? "bg-accent-soft text-accent-foreground"
      : "bg-secondary text-muted-foreground";
  return <Badge className={`rounded-full ${cls} border-transparent`}>{children}</Badge>;
}

// suppress unused import warning
void X;
