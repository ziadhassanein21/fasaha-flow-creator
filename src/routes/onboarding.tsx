import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "لنبدأ · فصاحة" }] }),
  component: Onboarding,
});

const goals = [
  "كتابة رسائل مهنيّة أفضل",
  "نشرُ محتوى راقٍ على لينكدإن",
  "إعداد تقارير رسميّة واثقة",
  "التحدّث بالفصحى في اجتماعات",
  "تحسين لغتي الأكاديمية",
];

const fields = [
  "الأعمال والإدارة",
  "التعليم",
  "الإعلام والمحتوى",
  "الحكومة والقطاع العام",
  "الهندسة والتقنية",
  "طالب / خرّيج حديث",
  "أخرى",
];

const levels = [
  { key: "low", title: "أتردّد كثيرًا", body: "أفضّل تجنّب الكتابة الرسمية قدر الإمكان." },
  { key: "mid", title: "أكتب لكن بشكّ", body: "أنجز المطلوب لكن أخشى الوقوع في أخطاء نحوية." },
  { key: "high", title: "أكتب بثقة", body: "أريد صقلَ أسلوبي للارتقاء به لمستوى احترافي." },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<string | null>(null);
  const [field, setField] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const navigate = useNavigate();

  const steps = [
    { title: "أهلًا بك", canNext: true },
    { title: "ما اسمك؟", canNext: name.trim().length > 1 },
    { title: "ما هدفك الأساسي؟", canNext: !!goal },
    { title: "ما مجالك؟", canNext: !!field },
    { title: "ما مستوى ثقتك حاليًا؟", canNext: !!level },
    { title: "خطتك جاهزة", canNext: true },
  ];

  const total = steps.length;

  return (
    <div className="flex min-h-screen bg-background">
      
      {/* Left Panel (Brand Context) */}
      <div className="hidden lg:flex w-[40%] bg-gradient-to-b from-[#0F766E] to-[#083b37] text-white p-16 flex-col justify-between relative overflow-hidden border-e border-primary/10">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent opacity-50" />
        
        <div className="relative z-10">
          <Logo className="text-white [&_svg]:fill-white" />
        </div>

        <div className="relative z-10 space-y-6 max-w-sm">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-white leading-snug">
              {step === 0 && "مرحلة التأسيس"}
              {step === 1 && "اللمسة الشخصية"}
              {step === 2 && "تحديد الوجهة"}
              {step === 3 && "السياق المهني"}
              {step === 4 && "نقطة الانطلاق"}
              {step === total - 1 && "مسارك جاهز"}
            </h2>
            <p className="mt-4 text-lg text-white/60 leading-relaxed">
              {step === 0 && "نحن لا نؤمن بالقوالب الجاهزة. كل كاتب يمتلك تحديات مختلفة."}
              {step === 1 && "نريد أن نخصص تجربتك منذ اللحظة الأولى."}
              {step === 2 && "معرفة هدفك تساعدنا في اقتراح التراكيب الأنسب لسياقك."}
              {step === 3 && "كل قطاع يمتلك مفرداته وأسلوبه. سنضبط المحرك ليناسب مجالك."}
              {step === 4 && "سنبدأ معك من حيث أنت، لنبني ثقتك خطوة بخطوة."}
              {step === total - 1 && "الآن، كل شيء مُعدّ خصيصاً لرحلتك."}
            </p>
          </motion.div>
        </div>

        {/* Minimal Step Dots */}
        <div className="relative z-10 flex gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-white/40" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Panel (Content) */}
      <div className="flex-1 flex flex-col pt-8 px-6 lg:px-20 pb-16 h-screen overflow-y-auto">
        <div className="flex lg:hidden justify-between items-center mb-12">
          <Logo />
          <div className="text-sm font-bold text-muted-foreground">{step + 1} / {total}</div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              {step === 0 && (
                <div className="space-y-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-secondary text-primary mb-4">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight">نصمم لك مساراً يليق بطموحك.</h1>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    لكي تكون فصاحة أداة مساعدة حقيقية، نحتاج لبضع إجابات قصيرة نضبط بها محركنا الذكي ليناسب نبرتك وأهدافك.
                  </p>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-3xl font-extrabold mb-8">كيف تفضل أن نناديك؟</h2>
                  <Input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="الاسم الأول..."
                    className="h-16 text-xl px-6 rounded-none border-b-2 border-t-0 border-x-0 border-border bg-transparent focus-visible:ring-0 focus-visible:border-primary shadow-none"
                    onKeyDown={(e) => {
                       if (e.key === "Enter" && name.trim().length > 1) {
                         setStep((s) => s + 1);
                       }
                    }}
                  />
                </div>
              )}

              {step === 2 && (
                <ChoiceGrid title="ما هدفك الأساسي من فصاحة؟" options={goals} value={goal} onChange={(v) => { setGoal(v); setTimeout(() => setStep((s) => s + 1), 300); }} />
              )}
              
              {step === 3 && (
                <ChoiceGrid title="في أيّ مجالٍ تعمل أو تدرس؟" options={fields} value={field} onChange={(v) => { setField(v); setTimeout(() => setStep((s) => s + 1), 300); }} />
              )}
              
              {step === 4 && (
                <div>
                  <h2 className="text-3xl font-extrabold mb-8">أين تقف ثقتك بنفسك اليوم؟</h2>
                  <div className="grid gap-4">
                    {levels.map((l) => (
                      <button
                        key={l.key}
                        onClick={() => { setLevel(l.key); setTimeout(() => setStep((s) => s + 1), 300); }}
                        className={`group relative flex flex-col border p-6 text-start transition-all duration-300 overflow-hidden ${
                          level === l.key
                            ? "border-primary bg-primary-soft/10 rounded-[1.5rem]"
                            : "border-border bg-transparent rounded-none hover:border-foreground"
                        }`}
                      >
                        <div className="text-xl font-bold text-foreground mb-2">{l.title}</div>
                        <div className="text-sm text-muted-foreground">{l.body}</div>
                        {level === l.key && (
                          <motion.div layoutId="level-check" className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
                            <Check className="h-6 w-6" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === total - 1 && (
                <div>
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-8">
                    <Check className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold mb-4">
                    أهلاً بك يا {name} في فصاحة.
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                    جهزنا لك مسودة تجريبية لتختبر المحرك الذكي.
                  </p>
                  <ul className="space-y-4 mb-12">
                    <PlanItem>التصحيح بضغطة زر وتوضيح الأخطاء</PlanItem>
                    <PlanItem>اقتراح صياغات أكثر احترافية لمجالك</PlanItem>
                    <PlanItem>لوحة تشخيص دقيقة لتتبع التطور</PlanItem>
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-border/30 max-w-xl mx-auto w-full">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`rounded-none px-6 h-12 text-muted-foreground hover:text-foreground ${step === 0 ? "invisible" : ""}`}
          >
            <ArrowRight className="ms-2 h-4 w-4" /> العودة
          </Button>
          
          {step === total - 1 ? (
            <Button
              className="rounded-none px-8 h-12 shadow-float hover:shadow-none transition-shadow"
              onClick={() => navigate({ to: "/app/dashboard" })}
            >
              دخول لوحة التحكم <ArrowLeft className="me-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="rounded-none px-8 h-12"
              disabled={!steps[step].canNext}
              onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            >
              متابعة <ArrowLeft className="me-2 h-4 w-4" />
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}

function ChoiceGrid({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold mb-8">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`flex items-center justify-between border p-5 text-start text-base font-medium transition-all duration-300 ${
              value === o
                ? "border-primary bg-primary-soft/10 rounded-[1.5rem]"
                : "border-border hover:border-foreground rounded-none"
            }`}
          >
            {o}
            {value === o && <Check className="h-5 w-5 text-primary" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function PlanItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 border-b border-border/50 pb-4 last:border-0 last:pb-0">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground flex-none">
        <Check className="h-4 w-4" />
      </span>
      <span className="font-semibold text-foreground/90">{children}</span>
    </li>
  );
}
