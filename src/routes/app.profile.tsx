import { createFileRoute } from "@tanstack/react-router";
import { Bell, Globe, Moon, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { LevelProgress } from "@/components/level/LevelProgress";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "الملف الشخصي · فصاحة" }] }),
  component: Profile,
});

const achievements = [
  { title: "أوّل تفصيح", desc: "أنجزت أوّل تصحيح.", earned: true },
  { title: "أسبوعٌ متتالٍ", desc: "٧ أيام دون انقطاع.", earned: true },
  { title: "قاعدةٌ مُتقنة", desc: "أتقنت أوّل قاعدة نحويّة.", earned: true },
  { title: "١٠٠ تفصيح", desc: "أوشكت — ٧٤ / ١٠٠.", earned: false },
];

function Profile() {
  return (
    <div className="container-page py-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">الملف الشخصي</h1>
        <p className="mt-1 text-muted-foreground">أدر معلوماتك وتفضيلاتك.</p>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <LevelProgress score={64} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border border-border">
              <AvatarFallback className="bg-primary-soft text-xl font-bold text-primary">م</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">محمد الأحمد</h2>
              <p className="text-sm text-muted-foreground">مديرُ منتج · انضم في يناير ٢٠٢٦</p>
            </div>
            <Button variant="outline" className="ms-auto rounded-full">تعديل الصورة</Button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="fullname">الاسم الكامل</Label>
              <Input id="fullname" defaultValue="محمد الأحمد" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="mail">البريد الإلكتروني</Label>
              <Input id="mail" type="email" defaultValue="mohammed@example.com" className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="goal">هدفي مع فصاحة</Label>
              <Input id="goal" defaultValue="كتابة رسائل مهنيّة أفضل" className="mt-1.5" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="rounded-full">حفظ التغييرات</Button>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-base font-bold">إحصاءاتك</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <Stat label="تفصيحات مكتملة" value="٧٤" />
              <Stat label="قواعد أتقنتها" value="١٩" />
              <Stat label="أطول سلسلة" value="١٢ يومًا" />
              <Stat label="ساعات التعلّم" value="١٧ ساعة" />
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent" />
              <h3 className="text-base font-bold">إنجازات</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {achievements.map((a) => (
                <li key={a.title} className="flex items-start gap-3">
                  <span
                    className={`grid h-8 w-8 flex-none place-items-center rounded-full ${
                      a.earned ? "bg-accent-soft text-accent-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Trophy className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{a.title}</span>
                      {!a.earned && (
                        <Badge variant="secondary" className="rounded-full">قريبًا</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{a.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="text-base font-bold">التفضيلات</h3>
        <div className="mt-5 divide-y divide-border">
          <PrefRow
            icon={Bell}
            title="تذكيرات المراجعة اليومية"
            desc="سنُذكّرك بجلسة مراجعتك القصيرة كل يوم."
            defaultChecked
          />
          <PrefRow
            icon={Globe}
            title="عرض الأمثلة بالفصحى فقط"
            desc="إخفاء الأمثلة العاميّة من الشروحات."
            defaultChecked
          />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold">{value}</span>
    </li>
  );
}

import type { LucideIcon } from "lucide-react";
function PrefRow({
  icon: Icon,
  title,
  desc,
  defaultChecked,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
