import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, PartyPopper, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { todayReview } from "@/lib/mock/data";

export const Route = createFileRoute("/app/review")({
  head: () => ({ meta: [{ title: "المراجعة اليومية · فصاحة" }] }),
  component: Review,
});

function Review() {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(0);

  const q = todayReview[i];

  const next = () => {
    if (selected === q.answer) setCorrect((c) => c + 1);
    setSelected(null);
    if (i + 1 < todayReview.length) setI(i + 1);
    else setDone(true);
  };

  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-2xl">
        {!done ? (
          <>
            <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                البطاقة {i + 1} من {todayReview.length}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-accent" /> مراجعة اليوم
              </span>
            </div>
            <Progress value={((i + (selected !== null ? 1 : 0)) / todayReview.length) * 100} />

            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-soft"
              >
                <p className="text-sm text-muted-foreground">{q.prompt}</p>
                {q.context && (
                  <p className="mt-3 rounded-2xl bg-secondary/60 p-4 text-lg leading-9">
                    {q.context}
                  </p>
                )}
                <div className="mt-6 space-y-2.5">
                  {q.options.map((opt, idx) => {
                    const isSel = selected === idx;
                    const isRight = selected !== null && idx === q.answer;
                    const isWrong = isSel && idx !== q.answer;
                    return (
                      <button
                        key={idx}
                        disabled={selected !== null}
                        onClick={() => setSelected(idx)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-start text-[15px] transition ${
                          isRight
                            ? "border-success bg-success/10 text-foreground"
                            : isWrong
                            ? "border-destructive bg-destructive/10 text-foreground"
                            : isSel
                            ? "border-primary bg-primary-soft/40"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <span>{opt}</span>
                        {isRight && <Check className="h-5 w-5 text-success" />}
                        {isWrong && <X className="h-5 w-5 text-destructive" />}
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-2xl border border-border bg-secondary/50 p-4 text-sm leading-7"
                  >
                    <span className="font-semibold">شرح: </span>
                    {q.explanation}
                  </motion.div>
                )}

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={next}
                    disabled={selected === null}
                    className="rounded-full px-6"
                  >
                    {i + 1 === todayReview.length ? "إنهاء الجلسة" : "التالية"}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-primary/15 bg-card p-10 text-center shadow-lifted"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary">
              <PartyPopper className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold">أحسنت!</h2>
            <p className="mt-2 text-muted-foreground">
              أجبت بشكل صحيح على {correct} من {todayReview.length}. سلسلتك الآن ٨ أيام.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button asChild className="rounded-full">
                <Link to="/app/dashboard">العودة للوحة التحكم</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/app/tafsih">تفصيح جديد</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
