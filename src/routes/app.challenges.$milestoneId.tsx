import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CaseSensitive,
  Check,
  ChevronLeft,
  Languages,
  PartyPopper,
  PenTool,
  Sparkles,
  SpellCheck,
  Trophy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { findMilestone, getAllMilestones, Q_TYPE_META, Question } from "@/lib/mock/challenges";
import { isCorrect, scoreWriting, useChallengeProgress } from "@/lib/challenges/progress";

export const Route = createFileRoute("/app/challenges/$milestoneId")({
  head: ({ params }) => {
    const found = findMilestone(params.milestoneId);
    return {
      meta: [{ title: found ? `${found.m.title} · التحديات` : "تحدٍّ · فصاحة" }],
    };
  },
  loader: ({ params }) => {
    const found = findMilestone(params.milestoneId);
    if (!found) throw notFound();
    return { milestoneId: params.milestoneId };
  },
  component: MilestonePlay,
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <p className="text-muted-foreground">المعلم غير موجود.</p>
      <Link to="/app/challenges" className="mt-4 inline-block text-primary underline">
        العودة للخارطة
      </Link>
    </div>
  ),
});

const TYPE_ICON = {
  vocab: CaseSensitive,
  irab: SpellCheck,
  read: BookOpen,
  tashkeel: Languages,
  write: PenTool,
} as const;

function MilestonePlay() {
  const { milestoneId } = Route.useLoaderData() as { milestoneId: string };

  const found = findMilestone(milestoneId)!;
  const { m, l } = found;
  const navigate = useNavigate();
  const { finishMilestone } = useChallengeProgress();

  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | string | null)[]>(
    () => m.questions.map(() => null),
  );
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState<{ correct: number; xp: number; passed: boolean } | null>(null);

  const q = m.questions[i];
  const total = m.questions.length;
  const current = answers[i];

  const submit = () => {
    if (current === null || current === "") return;
    setRevealed(true);
  };

  const next = () => {
    setRevealed(false);
    if (i + 1 < total) {
      setI(i + 1);
    } else {
      // Finish
      let correct = 0;
      const wrong: number[] = [];
      m.questions.forEach((qq, idx) => {
        const a = answers[idx];
        if (a !== null && isCorrect(qq, a as never)) correct++;
        else wrong.push(idx);
      });
      const res = finishMilestone(m.id, correct, wrong, m.xp, m.badge?.name);
      setSummary({ correct, xp: res.xpEarned, passed: res.passed });
      setDone(true);
    }
  };

  const setAnswer = (v: number | string) => {
    setAnswers((prev) => {
      const cp = [...prev];
      cp[i] = v;
      return cp;
    });
  };

  // Success/close state for write
  const writeScore = useMemo(() => {
    if (q.type !== "write" || current === null) return null;
    return scoreWriting(String(current), String(q.answer));
  }, [q, current]);

  const answered = current !== null && current !== "";
  const showCorrect = revealed && isCorrect(q, current as never);

  if (done && summary) {
    return <FinishScreen milestone={m} level={l} summary={summary} />;
  }

  const Icon = TYPE_ICON[q.type];

  return (
    <div className="container-page py-8 max-w-3xl">
      {/* Top bar */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <button
          type="button"
          aria-label="العودة إلى خارطة التحديات"
          onClick={() => navigate({ to: "/app/challenges" })}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">الخارطة</span>
        </button>
        <div className="min-w-0 text-center">
          <div className="text-xs font-semibold text-muted-foreground">{l.name}</div>
          <div className="truncate text-sm font-bold">{m.title}</div>
        </div>
        <div className="shrink-0 text-xs font-bold text-muted-foreground">
          {toArabic(i + 1)} / {toArabic(total)}
        </div>
      </div>


      <div className="mt-4">
        <Progress value={((i + (revealed ? 1 : 0)) / total) * 100} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft"
        >
          <div className="mb-5 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold"
              style={{ borderColor: l.palette.ink, color: l.palette.ink }}
            >
              <Icon className="h-3.5 w-3.5" />
              {Q_TYPE_META[q.type].label}
            </span>
            <span className="text-xs text-muted-foreground">
              مهارة: {Q_TYPE_META[q.type].skill}
            </span>
          </div>

          <p className="text-lg font-bold leading-relaxed">{q.prompt}</p>
          {q.context && (
            <div className="mt-4 rounded-2xl bg-secondary/60 p-4 text-lg leading-9 border border-border/60">
              {q.context}
            </div>
          )}

          {/* MCQ */}
          {q.type !== "write" && q.options && (
            <div className="mt-6 grid gap-2.5">
              {q.options.map((opt, idx) => {
                const isSel = current === idx;
                const isRight = revealed && idx === q.answer;
                const isWrong = revealed && isSel && idx !== q.answer;
                return (
                  <button
                    key={idx}
                    disabled={revealed}
                    onClick={() => setAnswer(idx)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-start text-[15px] transition ${
                      isRight
                        ? "border-success bg-success/10"
                        : isWrong
                          ? "border-destructive bg-destructive/10"
                          : isSel
                            ? "border-primary bg-primary-soft/40"
                            : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="font-medium">{opt}</span>
                    {isRight && <Check className="h-5 w-5 text-success" />}
                    {isWrong && <X className="h-5 w-5 text-destructive" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Write */}
          {q.type === "write" && (
            <div className="mt-6 space-y-3">
              <Textarea
                dir="rtl"
                rows={4}
                placeholder="اكتب صياغتك الفصيحة هنا…"
                value={(current as string) ?? ""}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={revealed}
                className="text-base leading-loose"
              />
              {revealed && (
                <div className="rounded-2xl border border-border bg-secondary/50 p-4 text-sm">
                  <div className="mb-1 text-xs font-bold text-muted-foreground">الإجابة النموذجيّة</div>
                  <p className="text-base font-semibold leading-loose">{q.answer as string}</p>
                  {writeScore && (
                    <div className="mt-2 text-xs">
                      {writeScore.match ? (
                        <span className="text-success font-bold">مطابقٌ ممتاز.</span>
                      ) : writeScore.close ? (
                        <span className="text-accent-foreground font-bold">قريبٌ جدًّا.</span>
                      ) : (
                        <span className="text-destructive font-bold">حاول مقاربة النموذج أكثر.</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Explanation */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-5 rounded-2xl border p-4 text-sm leading-7 ${
                  showCorrect
                    ? "border-success/40 bg-success/5"
                    : "border-accent/40 bg-accent/5"
                }`}
              >
                <span className="font-bold">
                  {showCorrect ? "أحسنت — " : "الصواب: "}
                </span>
                {q.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {i + 1 < total ? "السؤال التالي يفتح بعد التصحيح." : "السؤال الأخير."}
            </span>
            {!revealed ? (
              <Button onClick={submit} disabled={!answered} className="rounded-full px-6">
                تصحيح
              </Button>
            ) : (
              <Button onClick={next} className="rounded-full px-6">
                {i + 1 < total ? "التالي" : "إنهاء المعلم"}
                <ChevronLeft className="ms-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FinishScreen({
  milestone,
  level,
  summary,
}: {
  milestone: { id: string; title: string; xp: number; badge?: { name: string } };
  level: { name: string };
  summary: { correct: number; xp: number; passed: boolean };
}) {
  const m = milestone;
  const l = level;
  const all = getAllMilestones();
  const idx = all.findIndex((x) => x.m.id === m.id);
  const nxt = all.slice(idx + 1).find((x) => !x.m.bonus) ?? all[0];


  return (
    <div className="container-page py-16 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-primary/15 bg-card p-10 text-center shadow-lifted"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft text-primary">
          {summary.passed ? <Trophy className="h-8 w-8" /> : <PartyPopper className="h-8 w-8" />}
        </div>
        <h2 className="mt-5 text-3xl font-extrabold">
          {summary.passed ? "أتممتَ المعلم!" : "جولة جيّدة"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {l.name} — {m.title}
        </p>

        <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-3">
          <StatChip label="إجابات صحيحة" value={`${toArabic(summary.correct)} / ٥`} />
          <StatChip label="XP مكتسبة" value={`+${toArabic(summary.xp)}`} />
          <StatChip label="النتيجة" value={summary.passed ? "نجاح" : "مراجعة"} />
        </div>

        {m.badge && summary.passed && (
          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-bold">
            <Sparkles className="h-4 w-4 text-accent" />
            نلت شارة: {m.badge.name}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Button asChild className="rounded-full">
            <Link
              to="/app/challenges/$milestoneId"
              params={{ milestoneId: nxt.m.id }}
            >
              المعلم التالي
              <ChevronLeft className="ms-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/app/challenges">الخارطة</Link>
          </Button>
          {!summary.passed && (
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/app/challenges/$milestoneId" params={{ milestoneId: m.id }}>
                إعادة
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-extrabold">{value}</div>
    </div>
  );
}

function toArabic(n: number) {
  return n.toLocaleString("ar-EG");
}
