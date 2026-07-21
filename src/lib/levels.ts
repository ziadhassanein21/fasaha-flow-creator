export type Level = {
  key: string;
  name: string;
  min: number;
  max: number;
  desc: string;
  color: string;
};

export const LEVELS: Level[] = [
  {
    key: "beginner",
    name: "مبتدئ",
    min: 0,
    max: 25,
    desc: "تبني أساسك في الفصحى وتتعرّف على القواعد الجوهريّة.",
    color: "oklch(0.7 0.12 25)",
  },
  {
    key: "practicing",
    name: "متمرّس",
    min: 25,
    max: 50,
    desc: "تكتب بثقةٍ متزايدة، وتُميّز أخطاءك الشائعة.",
    color: "oklch(0.75 0.14 70)",
  },
  {
    key: "advanced",
    name: "متقدّم",
    min: 50,
    max: 70,
    desc: "أسلوبُك يتّسق، وتتجنّب معظم أخطاء العاميّة والإملاء.",
    color: "oklch(0.62 0.14 220)",
  },
  {
    key: "proficient",
    name: "متمكّن",
    min: 70,
    max: 88,
    desc: "لغتُك سليمة، وتتحكّم في التراكيب والأسلوب.",
    color: "oklch(0.55 0.1 180)",
  },
  {
    key: "fasih",
    name: "فصيح",
    min: 88,
    max: 101,
    desc: "تكتب بفصاحةٍ رفيعة، وتُلهم غيرك.",
    color: "oklch(0.5 0.15 300)",
  },
];

export function getLevel(score: number): Level {
  return (
    LEVELS.find((l) => score >= l.min && score < l.max) ?? LEVELS[LEVELS.length - 1]
  );
}

export function levelProgress(score: number) {
  const level = getLevel(score);
  const idx = LEVELS.indexOf(level);
  const next = LEVELS[idx + 1];
  const span = level.max - level.min;
  const filled = Math.max(0, Math.min(score - level.min, span));
  const pct = Math.round((filled / span) * 100);
  return { level, next, pct, idx };
}
