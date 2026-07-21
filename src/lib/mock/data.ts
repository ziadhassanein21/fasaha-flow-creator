// Shared mock data used across the app screens (frontend MVP).

export type Correction = {
  id: string;
  type: "grammar" | "spelling" | "style" | "punctuation";
  original: string;
  suggestion: string;
  rule: string;
  explanation: string;
  examples: string[];
};

export type CorrectedDocument = {
  id: string;
  title: string;
  createdAt: string;
  category: "بريد" | "منشور" | "تقرير" | "رسالة" | "أخرى";
  favorite?: boolean;
  original: string;
  corrected: string;
  corrections: Correction[];
};

export const demoDocument: CorrectedDocument = {
  id: "demo-1",
  title: "بريد إلى العميل",
  category: "بريد",
  createdAt: "قبل ساعتين",
  original:
    "السلام عليكم، حبيت اخبركم انو الاجتماع راح يتاجل لبكرا الصبح. اذا في اي ملاحظات ياريت ترسلوها قبل الاجتماع عشان نناقشها.",
  corrected:
    "السلامُ عليكم، أودّ إعلامَكم بأنّ الاجتماعَ سيُؤجَّل إلى صباحِ الغد. إن كانت لديكم أيُّ ملاحظات، فيُرجى إرسالُها قبل الاجتماع لمناقشتها.",
  corrections: [
    {
      id: "c1",
      type: "style",
      original: "حبيت اخبركم انو",
      suggestion: "أودّ إعلامَكم بأنّ",
      rule: "المستوى اللغوي — الانتقال من العامية إلى الفصحى",
      explanation:
        "التعبير «حبيت اخبركم انو» عاميّ. في السياق المهني نستخدم «أودّ إعلامَكم بأنّ» لأنها أوضحُ وأدقّ.",
      examples: [
        "أودّ إعلامَكم بأنّ التقرير جاهز للمراجعة.",
        "يسرّني إبلاغُكم بأنّ الطلب قد اعتُمِد.",
      ],
    },
    {
      id: "c2",
      type: "grammar",
      original: "راح يتاجل",
      suggestion: "سيُؤجَّل",
      rule: "بناء الفعل للمجهول + السين للاستقبال",
      explanation:
        "«راح» أداةُ استقبالٍ عاميّة، وبديلها في الفصحى السين أو «سوف». كما نبني الفعلَ للمجهول لأنّ الفاعلَ غيرُ مذكور.",
      examples: ["سيُعقد المؤتمرُ الأسبوعَ القادم.", "سوف تُرسَل الدعوةُ قريبًا."],
    },
    {
      id: "c3",
      type: "spelling",
      original: "لبكرا الصبح",
      suggestion: "إلى صباحِ الغد",
      rule: "استخدام حروف الجر ومفردات الزمن الفصيحة",
      explanation:
        "«لبكرا الصبح» تركيبٌ عاميّ. الأدقّ في الفصحى «إلى صباحِ الغد» مع حرف الجر «إلى» للدلالة على انتهاء الغاية.",
      examples: ["أُجِّل الموعدُ إلى صباح الغد.", "سنلتقي في صباح يوم الأحد."],
    },
    {
      id: "c4",
      type: "style",
      original: "اذا في اي ملاحظات ياريت ترسلوها",
      suggestion: "إن كانت لديكم أيُّ ملاحظات، فيُرجى إرسالُها",
      rule: "أسلوب الشرط والطلب في السياق الرسمي",
      explanation:
        "«اذا في … ياريت» تعبيرٌ عاميّ. الصياغة الفصيحة المهنية هي «إن كانت لديكم … فيُرجى …» مع فاء الجواب.",
      examples: [
        "إن كانت لديكم استفسارات، فيُرجى التواصلُ معنا.",
        "إن رغبتم في التعديل، فتفضّلوا بإخبارنا.",
      ],
    },
    {
      id: "c5",
      type: "grammar",
      original: "عشان نناقشها",
      suggestion: "لمناقشتها",
      rule: "لام التعليل مع المصدر بديلًا عن «عشان»",
      explanation:
        "«عشان» أداةُ تعليل عاميّة. الفصحى تستخدم لامَ التعليل «لـِ» متبوعةً بالمصدر أو بالفعل المضارع منصوبًا.",
      examples: ["اجتمعنا لمراجعة الخطة.", "تواصلنا لنُحدّد الموعدَ المناسب."],
    },
  ],
};

export const recentDocuments: CorrectedDocument[] = [
  {
    ...demoDocument,
    id: "d1",
    title: "بريد إلى فريق التسويق",
    category: "بريد",
    createdAt: "قبل ساعتين",
    favorite: true,
  },
  {
    ...demoDocument,
    id: "d2",
    title: "منشور لينكدإن — إطلاق منتج",
    category: "منشور",
    createdAt: "أمس",
  },
  {
    ...demoDocument,
    id: "d3",
    title: "تقرير الأداء الشهري",
    category: "تقرير",
    createdAt: "قبل ٣ أيام",
  },
  {
    ...demoDocument,
    id: "d4",
    title: "رسالة اعتذار للعميل",
    category: "رسالة",
    createdAt: "الأسبوع الماضي",
    favorite: true,
  },
];

export const weaknesses = [
  { label: "الانتقال من العامية إلى الفصحى", score: 42, delta: +8 },
  { label: "الهمزات (المتوسطة والمتطرفة)", score: 61, delta: +5 },
  { label: "علامات الترقيم", score: 74, delta: +12 },
  { label: "بناء الفعل للمجهول", score: 55, delta: +3 },
  { label: "أدوات الشرط والجواب", score: 48, delta: +6 },
  { label: "التاء المربوطة والمفتوحة", score: 82, delta: +2 },
];

export const skillTimeline = [
  { month: "يناير", score: 38 },
  { month: "فبراير", score: 45 },
  { month: "مارس", score: 51 },
  { month: "أبريل", score: 58 },
  { month: "مايو", score: 64 },
  { month: "يونيو", score: 71 },
];

// Per-skill progress over time. Keys must match skill names below.
export const skillsTimeline = [
  { month: "يناير", "النحو": 32, "الإملاء": 45, "الأسلوب": 28, "الترقيم": 55, "المفردات": 40 },
  { month: "فبراير", "النحو": 39, "الإملاء": 52, "الأسلوب": 34, "الترقيم": 60, "المفردات": 46 },
  { month: "مارس", "النحو": 44, "الإملاء": 58, "الأسلوب": 41, "الترقيم": 66, "المفردات": 52 },
  { month: "أبريل", "النحو": 50, "الإملاء": 64, "الأسلوب": 48, "الترقيم": 71, "المفردات": 58 },
  { month: "مايو", "النحو": 56, "الإملاء": 70, "الأسلوب": 55, "الترقيم": 76, "المفردات": 64 },
  { month: "يونيو", "النحو": 62, "الإملاء": 76, "الأسلوب": 61, "الترقيم": 81, "المفردات": 70 },
];

export const skillsMeta = [
  { key: "النحو", color: "var(--color-chart-1)" },
  { key: "الإملاء", color: "var(--color-chart-2)" },
  { key: "الأسلوب", color: "var(--color-chart-3)" },
  { key: "الترقيم", color: "var(--color-chart-4)" },
  { key: "المفردات", color: "var(--color-chart-5)" },
] as const;

// Latest score per skill (mirror last row of skillsTimeline).
export const skillsCurrent: { skill: string; score: number }[] = [
  { skill: "النحو", score: 62 },
  { skill: "الإملاء", score: 76 },
  { skill: "الأسلوب", score: 61 },
  { skill: "الترقيم", score: 81 },
  { skill: "المفردات", score: 70 },
];

export const grammarRules = [
  {
    slug: "hamzah-mutawassitah",
    title: "الهمزة المتوسطة",
    category: "الإملاء",
    summary: "تُكتب الهمزة المتوسطة على حرفٍ يناسب أقوى الحركتين: حركتها وحركة ما قبلها.",
    common: 3421,
  },
  {
    slug: "tanween-fath",
    title: "تنوين الفتح",
    category: "الإملاء",
    summary: "يُرسم تنوين الفتح على الألف إلا في الكلمات المنتهية بتاء مربوطة أو همزة.",
    common: 2890,
  },
  {
    slug: "mabni-lil-majhul",
    title: "بناء الفعل للمجهول",
    category: "النحو",
    summary: "يُبنى الفعل للمجهول عند حذف الفاعل أو لغرضٍ بلاغيّ، ويُغيَّر ضبط الحروف.",
    common: 2103,
  },
  {
    slug: "adawat-shart",
    title: "أدوات الشرط الجازمة",
    category: "النحو",
    summary: "تجزم أدوات الشرط فعلَين: فعل الشرط وجوابه. من أشهرها: إنْ، مَنْ، ما، متى.",
    common: 1876,
  },
  {
    slug: "taa-marbutah",
    title: "التاء المربوطة والمفتوحة",
    category: "الإملاء",
    summary: "التاء المربوطة تُلفظ هاءً عند الوقف، والمفتوحة تبقى تاءً في الوصل والوقف.",
    common: 1642,
  },
  {
    slug: "punctuation",
    title: "علامات الترقيم",
    category: "الأسلوب",
    summary: "استخدامٌ صحيح للفاصلة والنقطة والنقطتين يجعل النصَّ أوضحَ وأسهلَ في القراءة.",
    common: 1580,
  },
];

export const todayReview = [
  {
    id: "r1",
    prompt: "اختر الصياغة الفصيحة الصحيحة:",
    context: "أريد أن أخبركم _____ الموعد قد تغيّر.",
    options: ["إنّ", "أنّ", "إنَّما", "لكِنَّ"],
    answer: 1,
    explanation: "بعد «أخبر» يأتي المصدر المؤوّل بأنّ المفتوحة لأنه في محل مفعول به.",
  },
  {
    id: "r2",
    prompt: "أيّ الجُمَل مضبوطةٌ إملائيًا؟",
    context: "",
    options: [
      "قرأتُ كتابًا رائع.",
      "قرأتُ كتاباً رائعًا.",
      "قرأتُ كتابًا رائعًا.",
      "قرأتُ كتابا رائعًا.",
    ],
    answer: 2,
    explanation: "تنوين الفتح يُرسم على ألفٍ زائدة إلا في مواضع محددة.",
  },
  {
    id: "r3",
    prompt: "أعد صياغة الجملة بالفصحى:",
    context: "«لازم نخلص التقرير قبل بكرا.»",
    options: [
      "يجب علينا إنهاء التقرير قبل الغد.",
      "لازم نخلّص التقرير قبل بكرا.",
      "يجب أن نخلص التقرير قبل يوم غد.",
      "يجب علينا أن ننهي التقرير قبل غدٍ.",
    ],
    answer: 3,
    explanation:
      "الصياغة الأدقّ تستخدم «أن ننهي» و«غدٍ» بتنوين الكسر لأنها مضاف إليه محذوف.",
  },
];
