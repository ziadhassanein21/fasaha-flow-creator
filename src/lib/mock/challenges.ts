export type QType = "vocab" | "irab" | "read" | "tashkeel" | "write";

export type Question = {
  type: QType;
  prompt: string;
  context?: string;
  options?: string[]; // MCQ
  answer: number | string; // index or model text
  explanation: string;
};

export type Milestone = {
  id: string;
  title: string;
  theme: string; // short subtitle
  xp: number;
  bonus?: boolean; // optional side milestone
  badge?: { name: string; icon: "scroll" | "feather" | "crown" | "star" | "moon" };
  questions: [Question, Question, Question, Question, Question];
};

export type ChallengeLevel = {
  id: string;
  name: string;
  tagline: string;
  palette: { from: string; to: string; ink: string };
  milestones: Milestone[];
};

export const Q_TYPE_META: Record<
  QType,
  { label: string; skill: string; icon: "pen" | "book" | "case" | "spell" | "lang" }
> = {
  vocab: { label: "مفردات", skill: "المفردات", icon: "case" },
  irab: { label: "إعراب", skill: "النحو", icon: "spell" },
  read: { label: "قراءة", skill: "الأسلوب", icon: "book" },
  tashkeel: { label: "تشكيل", skill: "الإملاء", icon: "lang" },
  write: { label: "كتابة", skill: "الأسلوب", icon: "pen" },
};

// Helper to keep data compact & typed
const m = (
  id: string,
  title: string,
  theme: string,
  xp: number,
  badge: Milestone["badge"],
  qs: Question[],
  bonus = false,
): Milestone => ({
  id,
  title,
  theme,
  xp,
  bonus,
  badge,
  questions: qs as Milestone["questions"],
});

export const CHALLENGE_LEVELS: ChallengeLevel[] = [
  {
    id: "l1",
    name: "واحة الحروف",
    tagline: "أساسيات الجملة والكلمة",
    palette: { from: "#F5E6D3", to: "#E8C89A", ink: "oklch(0.45 0.12 60)" },
    milestones: [
      m("l1-m1", "أول الطريق", "جملة اسمية وفعليّة", 50, { name: "قنديل البداية", icon: "star" }, [
        { type: "vocab", prompt: "اختر الكلمة المناسبة", context: "الطالبُ ___ دروسه بانتظام.", options: ["يذاكرَ", "يذاكرُ", "مذاكر", "يذاكرْ"], answer: 1, explanation: "مضارع مرفوع بالضمة إذ لم يسبقه ناصب أو جازم." },
        { type: "irab", prompt: "ما إعراب (الطالبُ)؟", context: "الطالبُ يذاكرُ دروسه.", options: ["مبتدأ مرفوع", "فاعل مرفوع", "خبر مرفوع", "بدل"], answer: 0, explanation: "مبتدأ مرفوع بالضمة الظاهرة." },
        { type: "read", prompt: "إلى أين ذهبت العائلة؟", context: "كان يومًا مشرقًا، ذهبت العائلة إلى الحديقة واستمتع الأطفال باللعب.", options: ["السوق", "الحديقة", "المدرسة", "النادي"], answer: 1, explanation: "ورد صراحة في النص." },
        { type: "tashkeel", prompt: "اختر التشكيل الصحيح لكلمة (الحليب)", context: "شربَ الطفلُ الحليبَ.", options: ["الحليبَ", "الحليبُ", "الحليبِ", "الحليبْ"], answer: 0, explanation: "مفعول به منصوب بالفتحة." },
        { type: "write", prompt: "أعد صياغة الجملة بالفصحى", context: "الولد راح المدرسة بدري.", answer: "ذهب الولد إلى المدرسة مبكرًا.", explanation: "استبدل العاميّ (راح، بدري) بالفصيح (ذهب، مبكرًا)." },
      ]),
      m("l1-m2", "أسرار الفعل", "الأزمنة والإسناد", 60, { name: "قلم القصب", icon: "feather" }, [
        { type: "vocab", prompt: "أكمل الجملة", context: "___ العصفور فوق الغصن.", options: ["يغرّد", "ينبح", "يزأر", "يعوي"], answer: 0, explanation: "التغريد صوت العصافير." },
        { type: "irab", prompt: "إعراب (البنتُ)", context: "كتبت البنتُ الدرس.", options: ["فاعل مرفوع", "مبتدأ", "مفعول به", "نائب فاعل"], answer: 0, explanation: "من قامت بالفعل ⇐ فاعل مرفوع بالضمة." },
        { type: "read", prompt: "الشمس في النص هي:", context: "الشمس نجم مضيء ينقل لنا الحرارة والضوء، وأقرب النجوم إلى الأرض.", options: ["كوكب", "نجم", "قمر", "مجرة"], answer: 1, explanation: "ذكر النص أنها نجم." },
        { type: "tashkeel", prompt: "تشكيل (السماء)", context: "في السماءِ نجومٌ كثيرة.", options: ["السماءَ", "السماءُ", "السماءِ", "السماءْ"], answer: 2, explanation: "مجرور بحرف الجر (في)." },
        { type: "write", prompt: "حوّل إلى الفصحى", context: "أنا عايز آكل تفاحة.", answer: "أريد أن آكل تفاحة.", explanation: "استبدال (عايز) بـ (أريد أن)." },
      ]),
      m("l1-m3", "مروج الإملاء", "التاء والهمزة", 70, { name: "درع الهجاء", icon: "scroll" }, [
        { type: "vocab", prompt: "المرادف الأقرب لـ (حازم)", options: ["لطيف", "صارم", "متردد", "سعيد"], answer: 1, explanation: "حازم = صارم قوي الإرادة." },
        { type: "irab", prompt: "إعراب (السماءَ)", context: "إنّ السماءَ صافيةٌ.", options: ["اسم إنّ منصوب", "خبر مرفوع", "مبتدأ", "فاعل"], answer: 0, explanation: "اسم (إنّ) منصوب بالفتحة." },
        { type: "read", prompt: "ما الفكرة الرئيسة؟", context: "العلم نور يضيء دروب الحياة، والجهل ظلامٌ يتيه فيه الإنسان.", options: ["العلم كنز", "العلم نور", "العلم قوة", "العلم مالٌ"], answer: 1, explanation: "التشبيه المباشر في النص." },
        { type: "tashkeel", prompt: "تشكيل (أحمد)", context: "ذهب أحمدُ إلى المكتبة.", options: ["أحمدُ", "أحمدَ", "أحمدِ", "أحمدْ"], answer: 0, explanation: "فاعل مرفوع، ممنوع من الصرف فلا ينوَّن." },
        { type: "write", prompt: "صحّح الأخطاء الإملائيّة", context: "السياره سريعه جدا.", answer: "السيارة سريعة جدًّا.", explanation: "التاء المربوطة بدل الهاء + تنوين الفتح." },
      ]),
      m("l1-m4", "كنز الحروف", "تحدٍّ إضافيّ", 90, { name: "نجمة سهيل", icon: "star" }, [
        { type: "vocab", prompt: "أيّها ليس من معاني (الفصاحة)؟", options: ["البيان", "البلاغة", "الإبانة", "الغموض"], answer: 3, explanation: "الفصاحة نقيض الغموض." },
        { type: "irab", prompt: "إعراب (كتابين)", context: "قرأتُ كتابين مفيدين.", options: ["مفعول به منصوب بالياء", "مفعول مطلق", "مبتدأ", "خبر"], answer: 0, explanation: "مثنّى منصوب بالياء." },
        { type: "read", prompt: "استنتج", context: "من جدَّ وجد ومن زرع حصد.", options: ["السعي مذموم", "الجدّ يثمر", "الحصاد أولاً", "الزرع صعب"], answer: 1, explanation: "المعنى: من اجتهد نال." },
        { type: "tashkeel", prompt: "تشكيل (الكتابَ)", context: "قرأتُ الكتابَ كاملاً.", options: ["الكتابَ", "الكتابُ", "الكتابِ", "الكتابْ"], answer: 0, explanation: "مفعول به منصوب بالفتحة." },
        { type: "write", prompt: "صغْ الجملة بأسلوبٍ فصيح", context: "أنا بشكرك جدا على المساعدة.", answer: "أشكرك جزيلَ الشكر على مساعدتك.", explanation: "تخلَّص من (أنا بـ) وأضف مفعولاً مطلقًا مؤكِّدًا." },
      ], true),
    ],
  },
  {
    id: "l2",
    name: "رياض النحو",
    tagline: "المرفوعات والمنصوبات",
    palette: { from: "#DCEEE3", to: "#9CC8AE", ink: "oklch(0.42 0.1 160)" },
    milestones: [
      m("l2-m1", "مقام الرفع", "الفاعل ونائبه", 90, { name: "غصن الزيتون", icon: "feather" }, [
        { type: "vocab", prompt: "اختر الكلمة", context: "العلماء ___ في أبحاثهم.", options: ["مجتهدون", "مجتهدين", "يجتهدون", "مجتهدات"], answer: 0, explanation: "خبر مرفوع بالواو (جمع مذكر سالم)." },
        { type: "irab", prompt: "إعراب (بارداً)", context: "أصبح الجوُّ بارداً.", options: ["خبر (أصبح) منصوب", "اسم (أصبح)", "مفعول به", "حال"], answer: 0, explanation: "من أخوات (كان) ⇐ خبرها منصوب." },
        { type: "read", prompt: "معنى (استرعى الانتباه)", context: "تألق الشاعر فاسترعى انتباه الحاضرين.", options: ["أزعج", "جذب", "شتّت", "تجاهل"], answer: 1, explanation: "استرعى = جذب." },
        { type: "tashkeel", prompt: "تشكيل (بيوت)", context: "بنى العلمُ بيوتاً لا عمادَ لها.", options: ["بيوتاً", "بيوتٌ", "بيوتٍ", "بيوتْ"], answer: 0, explanation: "مفعول به منصوب بتنوين الفتح." },
        { type: "write", prompt: "صحّح الجملة", context: "المدير كافأ الموظفين المجتهدون.", answer: "كافأ المديرُ الموظفين المجتهدين.", explanation: "النعت يتبع منعوته في الإعراب (منصوب بالياء)." },
      ]),
      m("l2-m2", "أسرار النصب", "المفاعيل والحال", 100, { name: "ريشة الطاووس", icon: "feather" }, [
        { type: "vocab", prompt: "المفعول المطلق يبيّن:", options: ["الفاعل", "نوع الفعل أو عدده", "المكان", "الزمان"], answer: 1, explanation: "لبيان النوع أو العدد أو التوكيد." },
        { type: "irab", prompt: "إعراب (احتراماً)", context: "احترمتُ المعلمَ احتراماً شديداً.", options: ["مفعول به", "مفعول لأجله", "مفعول مطلق", "حال"], answer: 2, explanation: "من لفظ الفعل ⇐ مفعول مطلق." },
        { type: "read", prompt: "الحال في الجملة", context: "عاد الجيش منتصراً بعد معركة طاحنة.", options: ["الجيش", "منتصراً", "معركة", "طاحنة"], answer: 1, explanation: "بيّنت هيئة الفاعل." },
        { type: "tashkeel", prompt: "تشكيل (إجلالاً)", context: "أقفُ إجلالاً للمعلمِ.", options: ["إجلالاً", "إجلالٌ", "إجلالٍ", "إجلالْ"], answer: 0, explanation: "مفعول لأجله منصوب." },
        { type: "write", prompt: "حوّل للفصحى", context: "الجو برد جدا النهارده.", answer: "الطقس باردٌ جدًّا اليوم.", explanation: "استبدال العاميّة بالفصيح." },
      ]),
      m("l2-m3", "بستان الجرّ", "حروف الجرّ والإضافة", 110, { name: "زهرة الآس", icon: "moon" }, [
        { type: "vocab", prompt: "أيّها ليس حرف جرّ؟", options: ["على", "إلى", "قد", "من"], answer: 2, explanation: "(قد) حرف تحقيق أو تقليل، لا جرّ." },
        { type: "irab", prompt: "إعراب (المدرسةِ)", context: "ذهبتُ إلى المدرسةِ.", options: ["اسم مجرور بالكسرة", "مضاف إليه", "فاعل", "بدل"], answer: 0, explanation: "بحرف الجرّ (إلى)." },
        { type: "read", prompt: "الغرض من الاستفهام", context: "هل يستوي الذين يعلمون والذين لا يعلمون؟", options: ["التقرير", "النفي", "التعجّب", "التمنّي"], answer: 1, explanation: "استفهام إنكاريّ للنفي." },
        { type: "tashkeel", prompt: "تشكيل (بابِ)", context: "وقفتُ عند بابِ الدارِ.", options: ["بابَ", "بابُ", "بابِ", "بابْ"], answer: 2, explanation: "مجرور بـ(عند)." },
        { type: "write", prompt: "صغْ فصيحاً", context: "الكتاب بتاع أحمد ضاع.", answer: "ضاع كتابُ أحمدَ.", explanation: "احذف (بتاع) واستعمل الإضافة." },
      ]),
      m("l2-m4", "قنطرة النواسخ", "كان وأخواتها", 120, { name: "قنطرة الفجر", icon: "moon" }, [
        { type: "vocab", prompt: "من أخوات (كان)", options: ["ليس", "لعلّ", "كأنّ", "لكنّ"], answer: 0, explanation: "(ليس) من الأفعال الناقصة." },
        { type: "irab", prompt: "إعراب (مجتهداً)", context: "كان الطالبُ مجتهداً.", options: ["اسم كان", "خبر كان", "حال", "مفعول"], answer: 1, explanation: "خبر (كان) منصوب بالفتحة." },
        { type: "read", prompt: "ما دلالة (أصبح) هنا؟", context: "أصبحَ الجوُّ صحواً.", options: ["الاستمرار", "تحوّل في الصباح", "النفي", "التمنّي"], answer: 1, explanation: "أفاد التحوّل وقت الصباح." },
        { type: "tashkeel", prompt: "تشكيل (بارداً)", context: "أمسى الجوُّ بارداً.", options: ["بارداً", "باردٌ", "باردٍ", "باردْ"], answer: 0, explanation: "خبر أمسى منصوب." },
        { type: "write", prompt: "استعمل (ما زال) في جملة تامّة", answer: "ما زال الطالبُ مجتهداً في دروسه.", explanation: "اسمها مرفوع وخبرها منصوب." },
      ]),
    ],
  },
  {
    id: "l3",
    name: "بيداء البلاغة",
    tagline: "الأساليب والصور البيانيّة",
    palette: { from: "#E8DDF3", to: "#B79AD9", ink: "oklch(0.45 0.14 300)" },
    milestones: [
      m("l3-m1", "التشبيه", "أدواته وأركانه", 130, { name: "قلادة الدرّ", icon: "star" }, [
        { type: "vocab", prompt: "أداة تشبيه", options: ["كأنّ", "لأنّ", "ليت", "لعلّ"], answer: 0, explanation: "(كأنّ) من أدوات التشبيه." },
        { type: "irab", prompt: "إعراب (الأسدُ)", context: "الجنديُّ كالأسدِ شجاعةً.", options: ["مشبَّه به مجرور", "فاعل", "مبتدأ", "خبر"], answer: 0, explanation: "مجرور بالكاف." },
        { type: "read", prompt: "نوع التشبيه", context: "علمُهُ بحرٌ لا ساحل له.", options: ["بليغ", "مرسل مفصّل", "تمثيل", "ضمنيّ"], answer: 0, explanation: "حذف الأداة ووجه الشبه ⇐ بليغ." },
        { type: "tashkeel", prompt: "تشكيل (شجاعةً)", context: "الجنديُّ كالأسدِ شجاعةً.", options: ["شجاعةً", "شجاعةٌ", "شجاعةٍ", "شجاعةْ"], answer: 0, explanation: "تمييز منصوب." },
        { type: "write", prompt: "صغ تشبيهاً بليغاً للكرم", answer: "الكريمُ بحرٌ.", explanation: "المشبَّه + المشبَّه به دون أداة." },
      ]),
      m("l3-m2", "الاستعارة", "المكنيّة والتصريحيّة", 140, { name: "خاتم الفصاحة", icon: "crown" }, [
        { type: "vocab", prompt: "الاستعارة المكنيّة", options: ["ذُكر المشبَّه به", "حُذف المشبَّه به وذُكر شيء من لوازمه", "ذُكرا معاً", "لا مشبَّه فيها"], answer: 1, explanation: "يُحذف المشبَّه به ويُرمز إليه بلازم." },
        { type: "irab", prompt: "إعراب (الحياةَ)", context: "ابتسمت الحياةُ للمجتهدِ.", options: ["فاعل مرفوع", "مفعول به", "مبتدأ", "خبر"], answer: 0, explanation: "الفعل (ابتسم) أُسند إلى الحياة ⇒ فاعل." },
        { type: "read", prompt: "الصورة في: (أنارت الشمسُ عقلي)", options: ["استعارة مكنيّة", "استعارة تصريحيّة", "كناية", "مجاز مرسل"], answer: 1, explanation: "شبّه العلم بالشمس وصرّح بالمشبَّه به." },
        { type: "tashkeel", prompt: "تشكيل (للمجتهدِ)", options: ["للمجتهدَ", "للمجتهدُ", "للمجتهدِ", "للمجتهدْ"], answer: 2, explanation: "مجرور باللام." },
        { type: "write", prompt: "صغ استعارة مكنيّة عن الزمان", answer: "عضّني الدهرُ بنابه.", explanation: "شبّه الدهر بحيوانٍ مفترس وحذفه ورمز بـ(النَّاب)." },
      ]),
      m("l3-m3", "الكناية", "لطائف التلميح", 150, { name: "صولجان البيان", icon: "crown" }, [
        { type: "vocab", prompt: "الكناية أبلغ من التصريح لأنّها:", options: ["أقصر", "تُقدّم الدليل مع المعنى", "أسهل", "أوضح"], answer: 1, explanation: "لأنّها كالدعوى مصحوبة بدليل." },
        { type: "irab", prompt: "إعراب (الرمادِ)", context: "فلانٌ كثيرُ الرمادِ.", options: ["مضاف إليه مجرور", "فاعل", "مفعول", "حال"], answer: 0, explanation: "مضاف إليه لكثير." },
        { type: "read", prompt: "دلالة (كثير الرماد)", options: ["فقير", "بخيل", "كريم", "غاضب"], answer: 2, explanation: "كناية عن الكرم (كثرة الطبخ)." },
        { type: "tashkeel", prompt: "تشكيل (النجادِ)", context: "طويلُ النجادِ.", options: ["النجادَ", "النجادُ", "النجادِ", "النجادْ"], answer: 2, explanation: "مضاف إليه مجرور." },
        { type: "write", prompt: "كنّي عن الشجاعة", answer: "فلانٌ يضربُ بسيفٍ لا يفلّ.", explanation: "كناية عن قوّته وشجاعته." },
      ]),
      m("l3-m4", "لؤلؤة البلاغة", "تحدّي إضافي", 180, { name: "لؤلؤة نادرة", icon: "star" }, [
        { type: "vocab", prompt: "الجناس الناقص:", options: ["اتّفاق تامّ", "اختلاف في حرف", "اختلاف في المعنى فقط", "لا صلة"], answer: 1, explanation: "اختلاف في نوع أو ترتيب الحروف." },
        { type: "irab", prompt: "إعراب (ناراً)", context: "أوقدَ ناراً هادئةً.", options: ["مفعول به منصوب", "حال", "تمييز", "مفعول مطلق"], answer: 0, explanation: "وقع عليه فعل الإيقاد." },
        { type: "read", prompt: "المحسّن البديعيّ في (الحقّ أبلج والباطل لجلج)", options: ["طباق", "جناس", "سجع", "مقابلة"], answer: 0, explanation: "بين (الحقّ) و(الباطل) طباقٌ ظاهر." },
        { type: "tashkeel", prompt: "تشكيل (هادئةً)", options: ["هادئةً", "هادئةٌ", "هادئةٍ", "هادئةْ"], answer: 0, explanation: "نعت لـ(ناراً) منصوب." },
        { type: "write", prompt: "اكتب جملة فيها طباق بين (النور) و(الظلام)", answer: "في النورِ حياةٌ وفي الظلامِ موتٌ.", explanation: "الطباق بين المتضادين." },
      ], true),
    ],
  },
  {
    id: "l4",
    name: "قصر البيان",
    tagline: "الأساليب النحويّة العليا",
    palette: { from: "#DDEAF7", to: "#8FB3D9", ink: "oklch(0.42 0.12 240)" },
    milestones: [
      m("l4-m1", "التوكيد والبدل", "التوابع الدقيقة", 160, { name: "درع الحكمة", icon: "crown" }, [
        { type: "vocab", prompt: "من ألفاظ التوكيد", options: ["نفس، عين", "غير، سوى", "مثل، شبه", "قبل، بعد"], answer: 0, explanation: "المعنويّ: نفس/عين/كلّ/جميع." },
        { type: "irab", prompt: "إعراب (نفسُه)", context: "جاء الأميرُ نفسُه.", options: ["توكيد مرفوع", "بدل", "نعت", "حال"], answer: 0, explanation: "توكيد معنويّ يتبع المؤكَّد." },
        { type: "read", prompt: "نوع البدل", context: "أعجبني عمرُ عدلُه.", options: ["مطابق", "بعض من كلّ", "اشتمال", "مباين"], answer: 2, explanation: "العدل من صفات عمر ⇐ بدل اشتمال." },
        { type: "tashkeel", prompt: "تشكيل (كلَّهم)", context: "قابلتُ الطلابَ كلَّهم.", options: ["كلَّهم", "كلُّهم", "كلِّهم", "كلْهم"], answer: 0, explanation: "توكيد للمنصوب فينصب مثله." },
        { type: "write", prompt: "استعمل بدل بعض من كلّ في جملة", answer: "قرأتُ الكتابَ نصفَه.", explanation: "(نصفه) بعض من الكتاب." },
      ]),
      m("l4-m2", "الشرط والجواب", "أدوات الشرط الجازمة", 170, { name: "مفتاح البيان", icon: "crown" }, [
        { type: "vocab", prompt: "من أدوات الشرط الجازمة", options: ["إذا", "لولا", "إنْ", "لمّا"], answer: 2, explanation: "(إنْ) حرف شرط جازم." },
        { type: "irab", prompt: "إعراب (تجدْ)", context: "من يجتهدْ يجدْ.", options: ["مجزوم لأنّه جواب الشرط", "مرفوع", "منصوب", "مبنيّ"], answer: 0, explanation: "فعل الشرط وجوابه مجزومان." },
        { type: "read", prompt: "معنى (لولا) في: لولا العلمُ لهلكَ الناس", options: ["حرف شرط غير جازم يفيد امتناع الجواب لوجود الشرط", "حرف نفي", "حرف استفهام", "حرف نداء"], answer: 0, explanation: "امتناع (الهلاك) لوجود (العلم)." },
        { type: "tashkeel", prompt: "تشكيل (يذاكرْ)", context: "إنْ تذاكرْ تنجحْ.", options: ["تذاكرَ", "تذاكرُ", "تذاكرِ", "تذاكرْ"], answer: 3, explanation: "مجزوم بالسكون فعل الشرط." },
        { type: "write", prompt: "صغ جملة شرطيّة بأداة (مَن)", answer: "من يزرعْ يحصدْ.", explanation: "(مَن) اسم شرط جازم يجزم فعلين." },
      ]),
      m("l4-m3", "الاختصاص والنداء", "أساليب فصيحة", 180, { name: "وسام النداء", icon: "crown" }, [
        { type: "vocab", prompt: "أداة نداء للبعيد", options: ["يا", "أيْ", "الهمزة", "أيا"], answer: 3, explanation: "(أيا، هيا) للبعيد." },
        { type: "irab", prompt: "إعراب (طالبَ)", context: "يا طالبَ العلمِ اجتهدْ.", options: ["منادى مضاف منصوب", "مبتدأ", "فاعل", "مفعول"], answer: 0, explanation: "منادى مضاف ⇒ منصوب." },
        { type: "read", prompt: "الغرض من (يا ليتَ الشبابَ يعودُ يوماً)", options: ["نداء حقيقيّ", "تمنٍّ", "استغاثة", "تعجّب"], answer: 1, explanation: "(ليت) للتمنّي." },
        { type: "tashkeel", prompt: "تشكيل (محمدُ)", context: "يا محمدُ أقبِلْ.", options: ["محمدَ", "محمدُ", "محمدِ", "محمدْ"], answer: 1, explanation: "منادى مفرد علم مبنيّ على الضمّ." },
        { type: "write", prompt: "استعمل أسلوب اختصاص", answer: "نحنُ ــ الطلابَ ــ نجتهدُ.", explanation: "(الطلابَ) اسم منصوب على الاختصاص." },
      ]),
    ],
  },
  {
    id: "l5",
    name: "قمّة الفصاحة",
    tagline: "الذوق والفصاحة العليا",
    palette: { from: "#F7E4CE", to: "#D9A76B", ink: "oklch(0.42 0.14 40)" },
    milestones: [
      m("l5-m1", "لآلئ الشعر", "بيت وتقطيع بسيط", 200, { name: "تاج البيان", icon: "crown" }, [
        { type: "vocab", prompt: "معنى (السجايا)", options: ["الأخلاق والطباع", "الأموال", "الأسفار", "الأمراض"], answer: 0, explanation: "السجيّة: الطبيعة والخلق." },
        { type: "irab", prompt: "إعراب (المرءُ)", context: "المرءُ بأصغرَيْه: قلبِه ولسانِه.", options: ["مبتدأ مرفوع", "خبر", "فاعل", "بدل"], answer: 0, explanation: "مبتدأ مرفوع بالضمة." },
        { type: "read", prompt: "شرح البيت: (وما نيلُ المطالبِ بالتمنّي…)", options: ["المطالب تنال بالتمنّي", "المطالب لا تُنال إلاّ بالسعي", "المطالب مستحيلة", "لا معنى للسعي"], answer: 1, explanation: "الشطر الثاني: (ولكن تؤخذ الدنيا غلابا)." },
        { type: "tashkeel", prompt: "تشكيل (المطالبِ)", options: ["المطالبَ", "المطالبُ", "المطالبِ", "المطالبْ"], answer: 2, explanation: "مضاف إليه مجرور." },
        { type: "write", prompt: "أعد صياغة بأسلوب أدبيّ رفيع", context: "الحياة صعبة وأنا تعبان.", answer: "أثقلت الحياةُ كاهلي حتى أوهنت عزمي.", explanation: "استعارة + أسلوب فصيح." },
      ]),
      m("l5-m2", "ديوان الفصاحة", "تحدّي الختام", 250, { name: "تاج الفصاحة", icon: "crown" }, [
        { type: "vocab", prompt: "المرادف الأدقّ لـ (الفصاحة)", options: ["البيان الخالي من العيب", "الكثرة في الكلام", "الحفظ", "الخطابة"], answer: 0, explanation: "الفصاحة: خلو الكلام من العيوب." },
        { type: "irab", prompt: "إعراب (كتاباً)", context: "ما قرأتُ كتاباً أنفعَ من هذا.", options: ["مفعول به", "تمييز", "حال", "مبتدأ"], answer: 0, explanation: "مفعول به منصوب." },
        { type: "read", prompt: "دلالة تقديم (إيّاك) في: إيّاك نعبدُ", options: ["الحصر", "التوكيد فقط", "التعظيم", "التنبيه"], answer: 0, explanation: "تقديم المعمول يفيد الحصر." },
        { type: "tashkeel", prompt: "تشكيل (أنفعَ)", options: ["أنفعَ", "أنفعُ", "أنفعِ", "أنفعْ"], answer: 0, explanation: "نعت لـ(كتاباً) منصوب، ممنوع من الصرف." },
        { type: "write", prompt: "اكتب جملة تجمع: طباقاً + مفعولاً مطلقاً", answer: "أحبَبْتُ الحقَّ حبًّا وكرهتُ الباطلَ كرهاً.", explanation: "طباق (أحببت/كرهت) + مفعول مطلق (حبًّا، كرهاً)." },
      ]),
    ],
  },
];

// Flatten helpers
export function getAllMilestones(): { m: Milestone; l: ChallengeLevel }[] {
  return CHALLENGE_LEVELS.flatMap((l) => l.milestones.map((m) => ({ m, l })));
}

export function findMilestone(id: string) {
  return getAllMilestones().find((x) => x.m.id === id);
}
