import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpenText,
  Check,
  Feather,
  GraduationCap,
  LineChart,
  Mail,
  PenLine,
  Target,
  Wand2,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { demoDocument } from "@/lib/mock/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "فصاحة — استعد ثقتك في العربية الفصحى" },
      {
        name: "description",
        content:
          "منصة ذكية تُصحّح كتاباتك اليومية وتحوّلها إلى فصحى احترافية، وتبني لك مسار تعلّم شخصيًا من أخطائك.",
      },
      { property: "og:title", content: "فصاحة — استعد ثقتك في العربية الفصحى" },
      {
        property: "og:description",
        content:
          "منصة ذكية تُصحّح كتاباتك اليومية وتحوّلها إلى فصحى احترافية، وتبني لك مسار تعلّم شخصيًا من أخطائك.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary-soft selection:text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <TafsihShowcase />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };
  const itemVars = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  } as const;



  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-32 md:pb-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-[800px] bg-grid opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)" />
      
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
        {/* Copy (Right side in RTL) */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1 
            variants={itemVars}
            className="text-balance text-5xl font-extrabold tracking-tight text-foreground md:text-7xl leading-[1.15]"
          >
            استعد ثقتك في<br />
            <span className="text-primary">العربية الفصحى.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVars}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            حوّل مسوداتك اليومية إلى نصوص احترافية في ثوانٍ. تعلّم من أخطائك، حسّن أسلوبك، واكتب بثقة تامة في عملك ومراسلاتك.
          </motion.p>
          
          <motion.div variants={itemVars} className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-none px-8 py-6 text-base shadow-float hover:shadow-none transition-shadow">
              <Link to="/auth/register">
                ابدأ رحلتك
                <ArrowLeft className="me-2 h-4 w-4" />
              </Link>
            </Button>
            <a href="#how" className="inline-flex h-12 items-center justify-center px-6 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              اكتشف الطريقة
            </a>
          </motion.div>
        </motion.div>

        {/* Visual (Left side in RTL) */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative lg:ms-auto w-full max-w-[540px]"
        >
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-transparent blur-2xl" />
          <div className="relative rounded-[1.5rem] border border-border/50 bg-background/50 p-2 shadow-float backdrop-blur-xl">
            <HeroPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-secondary/30 px-4 py-3 text-xs font-semibold text-muted-foreground flex items-center justify-between">
        <span className="flex items-center gap-2"><Wand2 className="h-3.5 w-3.5" /> مسودة البريد الإلكتروني</span>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
      </div>
      <div className="p-6">
        <p className="text-[15px] leading-10 text-foreground/90 font-medium">
          السلامُ عليكم،{" "}
          <mark className="rounded-[4px] bg-diff-changed-bg px-1.5 py-0.5 text-diff-changed-fg shadow-sm transition-all hover:bg-diff-changed-fg hover:text-white cursor-help">
            أودّ إعلامَكم بأنّ
          </mark>{" "}
          الاجتماعَ{" "}
          <mark className="rounded-[4px] bg-diff-changed-bg px-1.5 py-0.5 text-diff-changed-fg shadow-sm transition-all hover:bg-diff-changed-fg hover:text-white cursor-help">
            سيُؤجَّل
          </mark>{" "}
          إلى{" "}
          <mark className="rounded-[4px] bg-diff-added-bg px-1.5 py-0.5 text-diff-added-fg shadow-sm transition-all hover:bg-diff-added-fg hover:text-white cursor-help">
            صباحِ الغد
          </mark>
          .
        </p>
        <div className="mt-8 flex justify-end">
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-bold text-success">
            <Check className="h-3.5 w-3.5" /> ٣ تعديلات لغوية
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROBLEM ---------------- */

function Problem() {
  const points = [
    "«أكتب رسالةً مهنية فأتردّد في كلِّ جملة.»",
    "«أنشرُ على لينكدإن فأخشى أن يظهر ركاكة الأسلوب.»",
    "«أرسل تقريرًا لمديري فأشكّ في ضبط الحركات.»",
    "«أتحدّث الفصحى فأخلطها بالعامية دون أن أشعر.»",
  ];
  return (
    <section className="border-t border-border bg-card">
      <div className="container-page py-24 md:py-32 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl leading-tight">
              تتقن العربية…<br />لكنك تفقد ثقتك<br />حين تكتبها.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-md">
              لست وحدك. كثيرٌ من الناطقين بالعربية يعيشون هذا التردّد كلَّ يوم في العمل والدراسة والتواصل الرسمي.
            </p>
          </div>
          
          <div className="mt-12 lg:mt-0 border-s-2 border-primary/30 ps-6">
            <p className="text-2xl font-bold text-foreground">٨٣٪</p>
            <p className="mt-1 text-sm text-muted-foreground font-medium">
              ممن جرّبوا فصاحة لاحظوا تحسنًا في ثقتهم الكتابية خلال أسبوع واحد فقط.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-4 justify-center">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`text-xl md:text-2xl font-medium leading-relaxed ${i % 2 === 0 ? "text-foreground" : "text-muted-foreground ms-0 md:ms-12"}`}
            >
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TAFSIH SHOWCASE ---------------- */

function TafsihShowcase() {
  return (
    <section id="tafsih" className="bg-primary py-24 md:py-32 text-primary-foreground border-y border-primary/10">
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl text-white">
            ليس مجرد تدقيق إملائي.<br />
            <span className="text-primary-foreground/80">إنه إعادة صياغة احترافية.</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="space-y-8">
              <div className="border-s border-primary-foreground/30 ps-6 pb-8">
                <h3 className="text-xl font-bold text-white mb-2">الفهم السياقي</h3>
                <p className="text-white/80 leading-relaxed">يدرك تفصيح سياق حديثك، سواء أكان بريدًا لمديرك أو تغريدة لجمهورك، ويضبط نبرة النص بما يناسب المقام.</p>
              </div>
              <div className="border-s border-primary-foreground/60 ps-6 pb-8">
                <h3 className="text-xl font-bold text-white mb-2">التعليل النحوي</h3>
                <p className="text-white/80 leading-relaxed">لا نكتفي بتصحيح خطئك، بل نشرح لك القاعدة بأسلوب مبسط ومباشر لتتفادى تكراره مستقبلاً.</p>
              </div>
              <div className="border-s border-primary-foreground/30 ps-6">
                <h3 className="text-xl font-bold text-white mb-2">الارتقاء بالأسلوب</h3>
                <p className="text-background/70 leading-relaxed">يستبدل التراكيب الركيكة والترجمات الحرفية بصياغات عربية أصيلة وأكثر فصاحة.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 mb-10 lg:mb-0">
             <div className="rounded-[1.5rem] bg-background/5 p-6 md:p-8 backdrop-blur-md border border-white/10 shadow-2xl">
                <div className="mb-4 text-xs font-semibold tracking-widest text-primary-soft uppercase">المسودة</div>
                <p className="text-lg leading-relaxed text-white/60 mb-8 pb-8 border-b border-white/10">
                  السلام عليكم، انا حابب أبلغكم ان الاجتماع راح يتأجل لبكرة الصبح. لو عندكم اي ملاحظات ياريت تبعتوها قبل الاجتماع عشان نناقشها.
                </p>
                <div className="mb-4 text-xs font-semibold tracking-widest text-success uppercase flex items-center gap-2">
                  <Wand2 className="h-3.5 w-3.5" /> النتيجة
                </div>
                <p className="text-lg leading-relaxed text-white font-medium">
                  السلامُ عليكم، <span className="text-primary-soft">أودّ إعلامَكم بأنّ</span> الاجتماعَ <span className="text-primary-soft">سيُؤجَّل</span> إلى <span className="text-primary-soft">صباحِ الغد</span>. إن كانت لديكم أيُّ ملاحظات، <span className="text-primary-soft">فيُرجى إرسالُها</span> قبل الاجتماع <span className="text-primary-soft">لمناقشتها</span>.
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS (Editorial Steps) ---------------- */

function HowItWorks() {
  const steps = [
    {
      num: "٠١",
      title: "اكتب بعفويتك المعتادة",
      body: "لا تكلّف نفسك عناء التفكير في القواعد. اكتب مسودتك بالسرعة التي تناسب أفكارك، سواء في العمل أو أثناء كتابة المحتوى.",
    },
    {
      num: "٠٢",
      title: "دع تفصيح يرتقي بالنص",
      body: "بنقرة واحدة، يقوم المحرك الذكي بتحليل جملك، تنقيح تراكيبها، وضبط حركاتها لتخرج في أبهى حلة فصيحة.",
    },
    {
      num: "٠٣",
      title: "افهم سبب التغيير",
      body: "اضغط على أي تعديل لتقرأ تعليلاً نجوياً واضحاً. هكذا تكتسب المعرفة بالممارسة، لا بالتنظير الأكاديمي.",
    },
    {
      num: "٠٤",
      title: "شاهد منحنى تطورك",
      body: "يتتبع النظام أنماط أخطائك، ويزودك ببطاقات مراجعة يومية مركزة تسد الفجوات في لغتك وتنمي حصيلتك.",
    },
  ];
  return (
    <section id="how" className="container-page py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl mb-16 text-center">
          المنهجية.
        </h2>
        
        <div className="relative">
          <div className="absolute top-0 bottom-0 right-[28px] w-px bg-border md:right-1/2" />
          
          <div className="space-y-12 md:space-y-24">
            {steps.map((s, i) => (
              <div key={s.num} className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                
                {/* Number Circle */}
                <div className="absolute right-0 md:right-1/2 md:translate-x-1/2 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-background border-4 border-card shadow-sm z-10 text-lg font-bold text-primary">
                  {s.num}
                </div>

                <div className={`w-full md:w-1/2 pt-2 md:pt-4 ps-20 pe-4 md:px-16 ${i % 2 === 0 ? "md:text-end" : "md:text-start"}`}>
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES (Bento Grid) ---------------- */

function Features() {
  return (
    <section id="features" className="bg-secondary/30 py-24 md:py-32 border-y border-border">
      <div className="container-page">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            أدوات متكاملة لكاتب واثق.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px]">
          {/* Main Feature - Spans 2 cols, 2 rows */}
          <div className="md:col-span-2 md:row-span-2 rounded-[1.5rem] bg-card border border-border p-8 md:p-12 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary">
              <Wand2 className="h-6 w-6" />
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 z-10">المحرر الذكي</h3>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-md z-10">
              مساحة كتابة هادئة وخالية من المشتتات. ترصد الأخطاء سياقياً، وتقترح بدائل فصيحة ترتقي بنبرة النص مع الحفاظ على روح الفكرة الأصلية.
            </p>
            <div className="mt-auto pt-8 z-10">
              <div className="w-full h-32 rounded-t-xl bg-secondary/50 border-x border-t border-border p-4 mask-image:linear-gradient(to_bottom,black,transparent)">
                <div className="w-3/4 h-3 bg-border rounded-full mb-3" />
                <div className="w-1/2 h-3 bg-border rounded-full mb-3" />
                <div className="w-5/6 h-3 bg-border rounded-full" />
              </div>
            </div>
          </div>

          {/* Diagnostic Feature */}
          <div className="rounded-[1.5rem] bg-card border border-border p-8 flex flex-col hover:border-primary/30 transition-colors">
            <Target className="h-8 w-8 text-foreground mb-6" />
            <h3 className="text-xl font-bold mb-3">محرّك التشخيص</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              يُحلل نصوصك ويرسم خريطة دقيقة لنقاط ضعفك في النحو، الصرف، والإملاء لتوجيه تعلمك.
            </p>
          </div>

          {/* Review Feature */}
          <div className="rounded-[1.5rem] bg-card border border-border p-8 flex flex-col hover:border-primary/30 transition-colors">
            <GraduationCap className="h-8 w-8 text-foreground mb-6" />
            <h3 className="text-xl font-bold mb-3">المراجعة المتباعدة</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              بطاقات يومية ذكية مبنية على أخطائك السابقة، تثبت القواعد في ذاكرتك بأقل مجهود.
            </p>
          </div>

          {/* Library Feature */}
          <div className="rounded-[1.5rem] bg-card border border-border p-8 flex flex-col hover:border-primary/30 transition-colors">
            <BookOpenText className="h-8 w-8 text-foreground mb-6" />
            <h3 className="text-xl font-bold mb-3">مكتبة القواعد</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              تفسير مبسط لأعقد قواعد العربية، مدعوم بأمثلة من واقع بيئة العمل المعاصرة.
            </p>
          </div>

          {/* Tracking Feature - Spans 2 cols */}
          <div className="md:col-span-2 rounded-[1.5rem] bg-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden border border-primary/20 shadow-md">
            <div className="absolute right-0 bottom-0 opacity-10">
              <LineChart className="h-64 w-64 -mb-16 -mr-16" />
            </div>
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-white">تقدّم يمكن قياسه</h3>
              <p className="text-white/80 leading-relaxed">
                شاهد تطورك أسبوعاً بعد أسبوع. لوحة تحكم تمنحك مقياساً لدرجة إتقانك وتطور ثقتك الكتابية بناءً على تحليلات دقيقة.
              </p>
            </div>
            <div className="relative z-10 text-5xl font-extrabold text-primary-foreground">
              ٦٤٪
              <div className="text-sm font-medium text-white/60 mt-2 text-center">مستوى الإتقان</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS (Pull Quotes) ---------------- */

function Testimonials() {
  return (
    <section className="container-page py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-16 text-muted-foreground">صوت من يكتبون</h2>
        
        {/* Featured Pull Quote */}
        <div className="mb-20">
          <div className="flex gap-4">
            <span className="text-6xl text-primary font-serif leading-none mt-2">”</span>
            <div>
              <blockquote className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground text-balance mb-8">
                أصبحتُ أكتب رسائل العمل خلال دقائق دون تردّد. أشعرُ أنّ لغتي عادت إليّ.
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center font-bold text-lg">س</div>
                <div>
                  <div className="font-bold text-lg">سارة العتيبي</div>
                  <div className="text-muted-foreground">مديرة تسويق</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Quotes */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-border pt-12">
          <div>
            <blockquote className="text-xl leading-relaxed text-foreground/80 mb-6">
              "الشروحُ قصيرة ومركّزة، والأمثلةُ تلتصقُ بالذاكرة. إنها أبعد ما تكون عن الأسلوب المدرسي التقليدي."
            </blockquote>
            <div>
              <div className="font-bold">خالد المنصور</div>
              <div className="text-sm text-muted-foreground">صانع محتوى</div>
            </div>
          </div>
          <div>
            <blockquote className="text-xl leading-relaxed text-foreground/80 mb-6">
              "الجميل في المنصة أنها لا تصحح فقط، بل تُهذب الأسلوب. مسوداتي أصبحت أكثر احترافية ووقاراً."
            </blockquote>
            <div>
              <div className="font-bold">ليلى بن سعيد</div>
              <div className="text-sm text-muted-foreground">مستشارة قانونية</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */

function Pricing() {
  const plans = [
    {
      name: "أساسي",
      price: "مجاني",
      period: "دائماً",
      features: [
        "٥ نصوص يومياً",
        "توضيح القواعد الأساسية",
        "أرشيف ٧ أيام",
      ],
      cta: "ابدأ رحلتك",
      highlighted: false,
    },
    {
      name: "الكاتب",
      price: "٣٩",
      period: "ر.س / شهرياً",
      features: [
        "نصوص غير محدودة",
        "تحليل الأسلوب والتشخيص الدقيق",
        "مراجعة متباعدة يومية",
        "أرشيف دائم وتصدير",
      ],
      cta: "تفعيل الخطة",
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
            
            <div className="md:w-1/2">
              <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-6">
                استثمار حقيقي في لغتك.
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                اختر الخطة التي تناسب غزارة إنتاجك. يمكنك البدء بتجربة مجانية، والترقية عندما تشعر بأن احترافية لغتك تستحق المزيد.
              </p>
            </div>

            <div className="md:w-1/2 w-full grid gap-6">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={`flex items-center justify-between p-6 rounded-[1.25rem] transition-all ${
                    p.highlighted
                      ? "bg-foreground text-background shadow-float"
                      : "bg-secondary/50 border border-border hover:bg-secondary"
                  }`}
                >
                  <div>
                    <h3 className={`text-lg font-bold ${p.highlighted ? "text-white" : "text-foreground"}`}>{p.name}</h3>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className={`text-2xl font-extrabold ${p.highlighted ? "text-primary-soft" : "text-foreground"}`}>{p.price}</span>
                      {p.period && <span className={`text-xs ${p.highlighted ? "text-background/70" : "text-muted-foreground"}`}>{p.period}</span>}
                    </div>
                  </div>
                  <Button
                    asChild
                    variant={p.highlighted ? "secondary" : "default"}
                    className={`rounded-none px-6 ${p.highlighted ? "bg-white text-foreground hover:bg-white/90" : "rounded-none"}`}
                  >
                    <Link to="/auth/register">{p.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const items = [
    {
      q: "أليست هذه منصة لتعليم اللغة للأجانب؟",
      a: "إطلاقاً. صُممت فصاحة خصيصاً للناطقين بالعربية الذين يتعاملون بها يومياً في بيئات العمل، ويبحثون عن صقل أسلوبهم المهني بعيداً عن الركاكة.",
    },
    {
      q: "بماذا تختلف عن أدوات التصحيح الإملائي المعتادة؟",
      a: "أدوات التدقيق التقليدية تبحث عن الأخطاء الإملائية المعزولة. فصاحة تعيد بناء الجملة، ترتقي بالأسلوب، تشرح لك القاعدة، وتبني اختبارات لتضمن عدم تكرار الخطأ.",
    },
    {
      q: "هل بياناتي ونصوصي محمية؟",
      a: "نعم وبشكل صارم. لا نستخدم مسوداتك لتدريب أي نماذج خارجية، وتُحذف من خوادمنا إن اخترت ذلك من إعدادات حسابك.",
    },
  ];
  return (
    <section id="faq" className="container-page py-24 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">الأسئلة المتكررة</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`i-${i}`} className="border border-border rounded-xl px-6 bg-card data-[state=open]:border-primary/30">
              <AccordionTrigger className="text-start text-lg font-bold hover:no-underline py-6">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground pb-6">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */

function CTA() {
  return (
    <section className="bg-primary text-primary-foreground py-32 mt-12 border-t border-primary/10">
      <div className="container-page">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-8">
            الكتابة الجيدة <span className="text-primary-foreground/80">ميزة تنافسية.</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            ارتقِ بأسلوبك، استعد ثقتك بلُغتك، وانضم لمن يكتبون بفصاحة في العصر الرقمي.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-none bg-white hover:bg-white/90 text-[#0F766E] px-12 py-8 text-lg font-bold shadow-md transition-all duration-300"
          >
            <Link to="/auth/register">
              ابدأ الآن — مجاناً
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
