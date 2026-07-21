import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
  BookOpenText,
  ChevronLeft,
  X,
  Check,
  PartyPopper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { recentDocuments, weaknesses, todayReview } from "@/lib/mock/data";
import { sayings } from "@/lib/mock/sayings";
import { LevelBadge } from "@/components/level/LevelBadge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "لوحة التحكم · فصاحة" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeSelected, setChallengeSelected] = useState<number | null>(null);
  const [challengeDone, setChallengeDone] = useState(false);
  const [challengeCorrect, setChallengeCorrect] = useState(0);
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    setTodayLabel(
      new Intl.DateTimeFormat("ar-SA", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date()),
    );
  }, []);

  const currentQ = todayReview[challengeIdx];

  const handleNextChallenge = () => {

    if (challengeSelected === currentQ.answer) {
      setChallengeCorrect((c) => c + 1);
    }

    setChallengeSelected(null);
    if (challengeIdx + 1 < todayReview.length) {
      setChallengeIdx(challengeIdx + 1);
    } else {
      setChallengeDone(true);
    }
  };

  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const startIndex = (daysSinceEpoch * 3) % sayings.length;
  const dailySayings = [
    sayings[startIndex % sayings.length],
    sayings[(startIndex + 1) % sayings.length],
    sayings[(startIndex + 2) % sayings.length],
  ];

  return (
    <div className="container-page py-8 max-w-6xl">
      {/* Greeting */}
      <div className="flex flex-col gap-4 border-b border-border/50 pb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="min-h-[1.25rem] text-sm font-medium tracking-wide text-muted-foreground">
            {todayLabel || "\u00A0"}
          </p>
          <h1 className="mt-2 flex flex-wrap items-center gap-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span>صباحُ الفصاحة، محمد</span>
            <LevelBadge score={64} size="md" />
          </h1>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            جلسةٌ قصيرة اليوم تكفي للحفاظ على تقدّمك.
          </p>
        </div>
        <Button asChild size="lg" className="rounded-none shadow-float h-12 w-full px-8 sm:w-auto">
          <Link to="/app/tafsih">
            <Wand2 className="ms-2 h-4 w-4" />
            تفصيح جديد
          </Link>

        </Button>
      </div>

      {/* Stat Hero */}
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <div className="flex-1 rounded-[1.5rem] border border-primary/20 bg-primary p-8 md:p-10 relative overflow-hidden group shadow-md">
          <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-white/70 uppercase tracking-widest">مستوى الإتقان العام</h2>
            <div className="mt-6 flex items-end gap-6">
              <span className="text-7xl font-extrabold tracking-tight text-white leading-none">٦٤٪</span>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-sm font-bold text-success">
                <TrendingUp className="h-4 w-4" />
                +٦٪ هذا الأسبوع
              </span>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 opacity-[0.03] text-white">
            <Target className="h-64 w-64 -mb-16 -ml-16" />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-6">
           <StatCard icon={Flame} label="سلسلتك" value="٧ أيام" hint="أطول سلسلة: ١٢" />
           <StatCard icon={Sparkles} label="تفصيحات اليوم" value="٣" hint="من أصل ٥ مجانية" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Left: Sayings + Continue + Recent */}
        <div className="space-y-8 lg:col-span-8">
          
          {/* Daily Sayings Carousel */}
          <div className="rounded-[1.5rem] border border-border bg-card p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">نصيحة اليوم: قُل ولا تقُل</h3>
                <p className="mt-1 text-sm text-muted-foreground">أخطاء شائعة في الفصحى وصيغها الصحيحة.</p>
              </div>
            </div>
            <div className="px-10">
              <Carousel className="w-full" opts={{ direction: "rtl", loop: true }}>
                <CarouselContent>
                  {dailySayings.map((s) => (
                    <CarouselItem key={s.id}>
                      <div className="flex flex-col overflow-hidden rounded-[1.25rem] border border-border bg-background">
                        <div className="grid grid-cols-2 divide-x divide-x-reverse divide-border">
                          <div className="bg-destructive/5 p-6">
                            <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-destructive uppercase tracking-widest">
                              <X className="h-4 w-4" /> لا تقُل
                            </div>
                            <p className="text-lg font-bold leading-relaxed text-destructive/90">
                              {s.wrong}
                            </p>
                          </div>
                          <div className="bg-success/5 p-6">
                            <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-success uppercase tracking-widest">
                              <Check className="h-4 w-4" /> قُل
                            </div>
                            <p className="text-lg font-bold leading-relaxed text-success">
                              {s.right}
                            </p>
                          </div>
                        </div>
                        <div className="p-6 border-t border-border">
                          <p className="text-base leading-relaxed text-foreground/80 mb-4">{s.explanation}</p>
                          <Badge variant="secondary" className="rounded-sm font-medium">
                            {s.category}
                          </Badge>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border-border bg-card hover:bg-secondary h-12 w-12" />
                <CarouselNext className="border-border bg-card hover:bg-secondary h-12 w-12" />
              </Carousel>
            </div>
          </div>

          {/* Continue where you left off - Premium treatment */}
          <div>
            <div className="mb-4 flex justify-between items-end">
              <h3 className="text-xl font-bold">تابع من حيث توقّفت</h3>
              <Link to="/app/tafsih" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                فتح المحرر <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-secondary/30 p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">المسودة الأخيرة</div>
                  <p className="text-base leading-loose text-foreground/70 opacity-50 blur-[1px]">
                    السلامُ عليكم، انا حابب أبلغكم ان الاجتماع راح يتأجل لبكرة الصبح. لو عندكم اي ملاحظات...
                  </p>
                </div>
                <div className="flex-1">
                   <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 flex items-center gap-1.5">
                     <Wand2 className="h-3.5 w-3.5" /> التصحيح المقترح
                   </div>
                   <p className="text-base leading-loose text-foreground font-medium">
                    السلامُ عليكم، <span className="text-primary underline underline-offset-4 decoration-primary/30">أودّ إعلامَكم بأنّ</span> الاجتماعَ <span className="text-primary underline underline-offset-4 decoration-primary/30">سيُؤجَّل</span> إلى <span className="text-primary underline underline-offset-4 decoration-primary/30">صباحِ الغد</span>...
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-border/50">
                <Badge variant="outline" className="rounded-sm bg-background">بريد العمل</Badge>
                <span className="text-sm text-muted-foreground font-medium">٥ تعديلات مُقترحة</span>
                <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 ms-auto">
                  منذ ساعتين
                </span>
              </div>
            </div>
          </div>

          {/* Recent Archives */}
          <div>
            <div className="mb-4 flex justify-between items-end">
              <h3 className="text-xl font-bold">أرشيفك الأخير</h3>
              <Link to="/app/history" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                عرض السجل الكامل <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-3">
              {recentDocuments.slice(0, 3).map((d) => (
                <li key={d.id}>
                  <Link to={`/app/history`} className="group flex items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-card px-6 py-5 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary-soft/50 transition-colors">
                        <BookOpenText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-base font-bold group-hover:text-primary transition-colors">{d.title}</p>
                          {d.favorite && <Bookmark className="h-3.5 w-3.5 fill-accent text-accent" />}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground font-medium">
                          {d.category} · <span className="opacity-70">{d.createdAt}</span>
                        </p>
                      </div>
                    </div>
                    <ArrowLeft className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: today's challenge + weaknesses */}
        <div className="space-y-8 lg:col-span-4">
          
          {/* Daily Challenge Card - Interactive */}
          <div className="relative rounded-[1.5rem] border border-primary/20 bg-primary text-primary-foreground p-8 overflow-hidden shadow-float">
            <div className="absolute -end-24 -top-24 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10">
              {!challengeDone ? (
                <>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-primary-soft mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" /> تحدّي اليوم
                    </span>
                    <span>
                      البطاقة {challengeIdx + 1} من {todayReview.length}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">{currentQ.prompt}</h3>
                  {currentQ.context && (
                    <div className="mt-4 rounded-xl bg-white/10 p-4 text-base font-semibold leading-relaxed border border-white/5">
                      {currentQ.context}
                    </div>
                  )}
                  <div className="mt-6 space-y-2">
                    {currentQ.options.map((opt, idx) => {
                      const isSel = challengeSelected === idx;
                      const isRight = challengeSelected !== null && idx === currentQ.answer;
                      const isWrong = isSel && idx !== currentQ.answer;
                      return (
                        <button
                          key={idx}
                          disabled={challengeSelected !== null}
                          onClick={() => setChallengeSelected(idx)}
                          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-start text-sm font-medium transition cursor-pointer ${
                            isRight
                              ? "border-success/50 bg-success/15 text-white"
                              : isWrong
                              ? "border-destructive/50 bg-destructive/15 text-white"
                              : isSel
                              ? "border-white/40 bg-white/15 text-white"
                              : "border-white/20 hover:border-white/50 bg-white/5 text-white/95"
                          }`}
                        >
                          <span>{opt}</span>
                          {isRight && <Check className="h-4 w-4 text-success" />}
                          {isWrong && <X className="h-4 w-4 text-destructive" />}
                        </button>
                      );
                    })}
                  </div>

                  {challengeSelected !== null && (
                    <div className="mt-4 rounded-xl bg-white/5 p-4 text-xs leading-relaxed border border-white/10 text-white/90">
                      <span className="font-bold">شرح: </span>
                      {currentQ.explanation}
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleNextChallenge}
                      disabled={challengeSelected === null}
                      variant="secondary"
                      className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-6 py-2 h-10 text-sm"
                    >
                      {challengeIdx + 1 === todayReview.length ? "إنهاء التحدي" : "التالية"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white mb-4">
                    <PartyPopper className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2">أحسنت!</h3>
                  <p className="text-sm text-white/80 leading-relaxed max-w-xs mx-auto">
                    أجبت بشكل صحيح على {challengeCorrect} من {todayReview.length}. سلسلتك الآن ٨ أيام!
                  </p>
                  <Button
                    onClick={() => {
                      setChallengeIdx(0);
                      setChallengeSelected(null);
                      setChallengeDone(false);
                      setChallengeCorrect(0);
                    }}
                    variant="secondary"
                    className="mt-6 rounded-full bg-white text-primary hover:bg-white/90 font-bold px-6 text-sm"
                  >
                    إعادة المحاولة
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card p-8">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold">نقاط ضعفك</h3>
                <p className="text-sm text-muted-foreground mt-1">ركّز عليها في مراجعاتك القادمة.</p>
              </div>
            </div>
            <div className="space-y-6">
              {weaknesses.slice(0, 3).map((w) => (
                <div key={w.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">{w.label}</span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {w.score}٪
                    </span>
                  </div>
                  <Progress value={w.score} className="h-2" />
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-8 rounded-none border-border">
              <Link to="/app/diagnostics">التشخيص الكامل</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* helpers */

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/20 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-bold text-muted-foreground">{label}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary/70">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div>
        <div className="text-4xl font-extrabold tracking-tight">{value}</div>
        <div className="mt-2 text-sm font-medium text-muted-foreground">{hint}</div>
      </div>
    </div>
  );
}
