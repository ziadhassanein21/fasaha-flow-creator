import { useEffect, useState, useCallback } from "react";
import { CHALLENGE_LEVELS, getAllMilestones, Question } from "@/lib/mock/challenges";

const KEY = "fasaha.challenges.v1";

export type ChallengeResult = {
  milestoneId: string;
  correct: number; // 0..5
  xpEarned: number;
  passed: boolean; // >=4/5
  at: number;
};

export type ChallengeState = {
  completed: Record<string, ChallengeResult>;
  badges: string[];
  xp: number;
  mistakes: Array<{ milestoneId: string; qIndex: number }>;
};

const initial: ChallengeState = {
  completed: {},
  badges: [],
  xp: 0,
  mistakes: [],
};

function read(): ChallengeState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...(JSON.parse(raw) as ChallengeState) };
  } catch {
    return initial;
  }
}

function write(s: ChallengeState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("fasaha:challenges"));
}

export function useChallengeProgress() {
  const [state, setState] = useState<ChallengeState>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
    const on = () => setState(read());
    window.addEventListener("fasaha:challenges", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("fasaha:challenges", on);
      window.removeEventListener("storage", on);
    };
  }, []);

  const finishMilestone = useCallback(
    (
      milestoneId: string,
      correctCount: number,
      wrongIdx: number[],
      xp: number,
      badge?: string,
    ) => {
      const passed = correctCount >= 4;
      const next = read();
      const already = next.completed[milestoneId];
      const xpEarned = passed && !already?.passed ? xp : 0;
      next.completed[milestoneId] = {
        milestoneId,
        correct: correctCount,
        xpEarned: (already?.xpEarned ?? 0) + xpEarned,
        passed: passed || Boolean(already?.passed),
        at: Date.now(),
      };
      next.xp += xpEarned;
      if (badge && passed && !next.badges.includes(badge)) next.badges.push(badge);
      // Track mistakes for review
      next.mistakes = next.mistakes.filter((m) => m.milestoneId !== milestoneId);
      wrongIdx.forEach((qi) =>
        next.mistakes.push({ milestoneId, qIndex: qi }),
      );
      write(next);
      setState(next);
      return { xpEarned, passed };
    },
    [],
  );

  const reset = useCallback(() => {
    write(initial);
    setState(initial);
  }, []);

  return { state, ready, finishMilestone, reset };
}

export function isMilestoneUnlocked(
  milestoneId: string,
  completed: ChallengeState["completed"],
): boolean {
  const all = getAllMilestones();
  const idx = all.findIndex((x) => x.m.id === milestoneId);
  if (idx <= 0) return true;
  // Bonus milestones unlock alongside their level's first non-bonus completion
  const current = all[idx];
  if (current.m.bonus) {
    return current.l.milestones.some(
      (m) => !m.bonus && completed[m.id]?.passed,
    );
  }
  // Walk back to the previous non-bonus milestone
  for (let i = idx - 1; i >= 0; i--) {
    if (all[i].m.bonus) continue;
    return Boolean(completed[all[i].m.id]?.passed);
  }
  return true;
}

export function progressSummary(state: ChallengeState) {
  const all = getAllMilestones();
  const done = all.filter((x) => state.completed[x.m.id]?.passed).length;
  return {
    done,
    total: all.length,
    badges: state.badges.length,
    xp: state.xp,
  };
}

export function nextMilestone(state: ChallengeState) {
  const all = getAllMilestones();
  return (
    all.find(
      (x) => !x.m.bonus && !state.completed[x.m.id]?.passed && isMilestoneUnlocked(x.m.id, state.completed),
    ) ?? all[0]
  );
}

export function levelCompletion(levelId: string, state: ChallengeState) {
  const level = CHALLENGE_LEVELS.find((l) => l.id === levelId)!;
  const core = level.milestones.filter((m) => !m.bonus);
  const done = core.filter((m) => state.completed[m.id]?.passed).length;
  return { done, total: core.length, pct: Math.round((done / core.length) * 100) };
}

// Simple normalized string comparison for the "write" question type
export function normalizeArabic(s: string) {
  return s
    .replace(/[\u064B-\u0652]/g, "") // diacritics
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function scoreWriting(userAnswer: string, model: string) {
  const a = normalizeArabic(userAnswer);
  const b = normalizeArabic(model);
  if (!a) return { match: false, close: false };
  if (a === b) return { match: true, close: true };
  // token overlap
  const at = new Set(a.split(" "));
  const bt = b.split(" ");
  const hit = bt.filter((t) => at.has(t)).length;
  const ratio = hit / bt.length;
  return { match: ratio >= 0.9, close: ratio >= 0.6 };
}

export function isCorrect(q: Question, ans: number | string): boolean {
  if (q.type === "write") {
    return scoreWriting(String(ans), String(q.answer)).match;
  }
  return typeof ans === "number" && ans === q.answer;
}
