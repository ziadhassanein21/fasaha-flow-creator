import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Crown,
  Feather,
  Lock,
  Moon,
  ScrollText,
  Sparkles,
  Star,
  Swords,
  Trophy,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { CHALLENGE_LEVELS, ChallengeLevel, Milestone, Q_TYPE_META } from "@/lib/mock/challenges";
import {
  isMilestoneUnlocked,
  levelCompletion,
  nextMilestone,
  progressSummary,
  useChallengeProgress,
} from "@/lib/challenges/progress";
import { LevelBadge } from "@/components/level/LevelBadge";

export const Route = createFileRoute("/app/challenges")({
  head: () => ({
    meta: [
      { title: "التحديات · فصاحة" },
      { name: "description", content: "رحلة معالم تفاعليّة لإتقان الفصحى عبر خمس مهارات." },
    ],
  }),
  component: ChallengesMap,
});

const BADGE_ICON = { scroll: ScrollText, feather: Feather, crown: Crown, star: Star, moon: Moon } as const;

function ChallengesMap() {
  const { state, ready } = useChallengeProgress();
  const summary = progressSummary(state);
  const upcoming = nextMilestone(state);

  return (
    <div className="container-page py-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Swords className="h-4 w-4" /> رحلة التحديات
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            معالم على درب الفصاحة
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            كلّ معلم خمسة أسئلة، سؤالٌ لكلّ مهارة: مفردات، إعراب، قراءة، تشكيل، وكتابة.
            أتمّ المعلم لتفتح الذي يليه وتنال شارتك.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LevelBadge score={Math.min(100, 40 + summary.xp / 40)} size="md" />
          <Link
            to="/app/challenges/$milestoneId"
            params={{ milestoneId: upcoming.m.id }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-float hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4" />
            تابع من {upcoming.m.title}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="معالم مكتملة" value={`${summary.done} / ${summary.total}`} icon={CheckCircle2} />
        <Stat label="شارات نلتها" value={String(summary.badges)} icon={Trophy} />
        <Stat label="نقاط الخبرة" value={`${summary.xp} XP`} icon={Sparkles} />
        <Stat label="المستوى الحاليّ" value={upcoming.l.name} icon={Star} />
      </div>

      {/* Levels */}
      <div className="mt-14 space-y-16">
        {CHALLENGE_LEVELS.map((level, li) => (
          <LevelBlock
            key={level.id}
            level={level}
            index={li}
            state={state}
            ready={ready}
          />
        ))}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Sparkles;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-2 text-2xl font-extrabold">{value}</div>
    </div>
  );
}

function LevelBlock({
  level,
  index,
  state,
  ready,
}: {
  level: ChallengeLevel;
  index: number;
  state: ReturnType<typeof useChallengeProgress>["state"];
  ready: boolean;
}) {
  const completion = levelCompletion(level.id, state);
  const prev = index > 0 ? CHALLENGE_LEVELS[index - 1] : null;
  const prevComp = prev ? levelCompletion(prev.id, state) : null;
  const levelLocked = prevComp ? prevComp.pct < 80 : false;

  return (
    <section>
      <header
        className="relative overflow-hidden rounded-3xl border border-border p-6 md:p-8"
        style={{
          background: `linear-gradient(135deg, ${level.palette.from}, ${level.palette.to})`,
          color: level.palette.ink,
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-widest opacity-70">
              المستوى {toArabic(index + 1)}
            </div>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{level.name}</h2>
            <p className="mt-1 text-sm opacity-80">{level.tagline}</p>
          </div>
          <div className="inline-flex flex-wrap items-center gap-2 self-start rounded-full bg-white/50 px-4 py-2 text-sm font-bold backdrop-blur sm:self-auto">
            <span>{completion.done} / {completion.total} معالم</span>
            {levelLocked && (
              <span className="inline-flex items-center gap-1 text-xs opacity-80">
                <Lock className="h-3 w-3" /> ٨٠٪ من السابق لفتحه
              </span>
            )}
          </div>
        </div>

        {/* subtle ornament */}
        <svg
          className="pointer-events-none absolute -end-8 -bottom-10 opacity-20"
          width="180"
          height="180"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M50 5 L61 39 H97 L68 60 L79 95 L50 74 L21 95 L32 60 L3 39 H39 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </header>

      {/* Milestone grid */}
      <ol className="relative mt-6 grid gap-4 md:grid-cols-2">
        {level.milestones.map((ms, mi) => {
          const done = state.completed[ms.id]?.passed;
          const unlocked = ready ? isMilestoneUnlocked(ms.id, state.completed) && !levelLocked : mi === 0;
          return (
            <MilestoneCard
              key={ms.id}
              level={level}
              m={ms}
              done={Boolean(done)}
              unlocked={unlocked}
              index={mi}
            />
          );
        })}
      </ol>
    </section>
  );
}

function MilestoneCard({
  level,
  m,
  done,
  unlocked,
  index,
}: {
  level: ChallengeLevel;
  m: Milestone;
  done: boolean;
  unlocked: boolean;
  index: number;
}) {
  const BadgeIcon = m.badge ? BADGE_ICON[m.badge.icon] : Star;
  const inner = (
    <motion.div
      whileHover={unlocked ? { y: -3 } : undefined}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition ${
        done
          ? "border-primary/40 bg-primary-soft/40"
          : unlocked
            ? "border-border bg-card hover:border-primary/40"
            : "border-dashed border-border bg-muted/30"
      }`}
    >
      {m.bonus && (
        <span className="absolute end-4 top-4 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
          تحدٍّ إضافيّ
        </span>
      )}
      <div className="flex items-start gap-4">
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border text-lg font-black"
          style={{
            borderColor: level.palette.ink,
            color: unlocked ? level.palette.ink : "hsl(var(--muted-foreground))",
            background: unlocked ? `color-mix(in oklch, ${level.palette.from} 60%, white)` : "transparent",
          }}
        >
          {done ? <CheckCircle2 className="h-6 w-6" /> : unlocked ? toArabic(index + 1) : <Lock className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold leading-tight">{m.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{m.theme}</p>
        </div>
      </div>

      {/* Skill icons */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {m.questions.map((q, i) => (
          <span
            key={i}
            className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
          >
            {Q_TYPE_META[q.type].label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="font-bold">{m.xp} XP</span>
          {m.badge && (
            <span className="ms-2 inline-flex items-center gap-1 text-muted-foreground">
              <BadgeIcon className="h-3.5 w-3.5" /> {m.badge.name}
            </span>
          )}
        </div>
        {unlocked ? (
          <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
            {done ? "أعِد" : "ابدأ"}
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:translate-x-[-4px]" />
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">مقفل</span>
        )}

      </div>
    </motion.div>
  );

  return (
    <li>
      {unlocked ? (
        <Link
          to="/app/challenges/$milestoneId"
          params={{ milestoneId: m.id }}
          className="block h-full"
        >
          {inner}
        </Link>
      ) : (
        <div className="block h-full cursor-not-allowed opacity-70">{inner}</div>
      )}
    </li>
  );
}

function toArabic(n: number) {
  return n.toLocaleString("ar-EG");
}
