import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  weaknesses,
  skillsTimeline,
  skillsMeta,
  skillsCurrent,
} from "@/lib/mock/data";
import { getLevel } from "@/lib/levels";

export const Route = createFileRoute("/app/diagnostics")({
  head: () => ({ meta: [{ title: "التشخيص · فصاحة" }] }),
  component: Diagnostics,
});

const OVERALL = 64;

function Diagnostics() {
  return (
    <div className="container-page py-8 max-w-6xl">
      <div className="mb-10 border-b border-border/50 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">تشخيصك اللغويّ</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
          صورةٌ واضحة عن مستواك ونقاط قوّتك وضعفك، مبنيّة على تحليل عميق لنصوصك الأخيرة.
        </p>
      </div>

      {/* Hero Section: Radar + Main Score */}
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        
        {/* Main Score & Secondary Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 rounded-[1.5rem] bg-primary text-white p-8 relative overflow-hidden flex flex-col justify-center border border-primary/20 shadow-md">
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-sm font-bold tracking-widest text-primary-foreground/70 uppercase mb-4">مستوى الإتقان العام</span>
              <div className="relative w-48 h-48 mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-md">
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeOpacity="0.1" strokeWidth="8" fill="none" />
                  <circle
                    cx="50" cy="50" r="42"
                    stroke="var(--color-primary-soft)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={(2 * Math.PI * 42) - (OVERALL / 100) * (2 * Math.PI * 42)}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-white">{OVERALL}٪</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                <TrendingUp className="h-3.5 w-3.5" /> +٦٪ هذا الأسبوع
              </div>
            </div>
            <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="rounded-[1.25rem] border border-border bg-card p-6 flex flex-col justify-center">
                <span className="text-sm font-semibold text-muted-foreground mb-2">ثقة الكتابة</span>
                <div className="text-3xl font-extrabold text-foreground mb-1">٧١٪</div>
                <span className="text-xs font-bold text-success">+٩٪</span>
             </div>
             <div className="rounded-[1.25rem] border border-border bg-card p-6 flex flex-col justify-center">
                <span className="text-sm font-semibold text-muted-foreground mb-2">اتّساق الأسلوب</span>
                <div className="text-3xl font-extrabold text-foreground mb-1">٥٨٪</div>
                <span className="text-xs font-bold text-success">+٣٪</span>
             </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-7 rounded-[1.5rem] border border-border bg-card p-8 shadow-soft flex flex-col">
          <div className="mb-2">
            <h3 className="text-xl font-bold">خريطة المهارات</h3>
            <p className="text-sm text-muted-foreground mt-1">توزيع قدراتك اللغوية عبر مختلف التصنيفات الأساسية.</p>
          </div>
          <div className="flex-1 min-h-[300px] -mx-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skillsCurrent}>
                <PolarGrid stroke="var(--color-border)" strokeDasharray="4 4" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-foreground)", fontSize: 13, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="مستواك"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  fill="var(--color-primary)"
                  fillOpacity={0.15}
                />
                <Tooltip 
                  contentStyle={{
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    boxShadow: "var(--shadow-float)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: "bold"
                  }}
                  itemStyle={{ color: "var(--color-primary)" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Progress Timeline */}
      <div className="mt-8 rounded-[1.5rem] border border-border bg-card p-8 shadow-soft">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">تطور المهارات زمنياً</h3>
            <p className="text-base text-muted-foreground mt-2">
              مسار تقدمك التفصيلي خلال الأشهر الستة الماضية.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold">
            <ArrowUpRight className="h-4 w-4 text-success" /> الاتجاه العام صاعد
          </span>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={skillsTimeline} margin={{ top: 20, right: 0, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--color-muted-foreground)"
                fontSize={13}
                tickLine={false}
                axisLine={false}
                dy={10}
                reversed
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={13}
                tickLine={false}
                axisLine={false}
                dx={-10}
                orientation="right"
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-float)",
                  fontFamily: "var(--font-sans)",
                }}
              />
              <Legend
                wrapperStyle={{ fontFamily: "var(--font-sans)", fontSize: 13, paddingTop: "20px" }}
                iconType="circle"
              />
              {skillsMeta.map((m) => (
                <Line
                  key={m.key}
                  type="monotone"
                  dataKey={m.key}
                  stroke={m.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: m.color, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Per-skill grid */}
        <div className="lg:col-span-8 rounded-[1.5rem] border border-border bg-card p-8 shadow-soft">
          <div className="mb-6">
            <h3 className="text-xl font-bold">التصنيفات الدقيقة</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {skillsCurrent.map((s) => {
              const lvl = getLevel(s.score);
              return (
                <div
                  key={s.skill}
                  className="rounded-xl border border-border p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="text-sm font-semibold text-muted-foreground mb-3">{s.skill}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-extrabold text-foreground">{s.score}٪</div>
                    <div
                      className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide"
                      style={{
                        background: `color-mix(in oklch, ${lvl.color} 10%, transparent)`,
                        color: lvl.color,
                      }}
                    >
                      {lvl.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="lg:col-span-4 rounded-[1.5rem] border border-border bg-card p-8 shadow-soft">
          <div className="mb-6">
            <h3 className="text-xl font-bold">بؤر التركيز القادمة</h3>
            <p className="text-sm text-muted-foreground mt-1">تستند إلى أكثر الأخطاء تكراراً.</p>
          </div>
          <div className="flex flex-col gap-6">
            {weaknesses.map((w) => (
              <div key={w.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold text-foreground">{w.label}</span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {w.score}٪
                  </span>
                </div>
                <Progress value={w.score} className="h-2.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
