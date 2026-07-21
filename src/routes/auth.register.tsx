import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "إنشاء حساب · فصاحة" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">أنشئ حسابك</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        دقيقتان فقط، وستبدأ أوّل جلسة تفصيح.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => navigate({ to: "/auth/otp" }), 500);
        }}
      >
        <div>
          <Label htmlFor="name">الاسم الكامل</Label>
          <Input id="name" placeholder="محمد الأحمد" className="mt-1.5" required />
        </div>
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" required />
        </div>
        <div>
          <Label htmlFor="password">كلمة المرور</Label>
          <Input id="password" type="password" placeholder="على الأقل ٨ أحرف" className="mt-1.5" required />
        </div>
        <Button type="submit" className="w-full rounded-full" disabled={loading}>
          {loading ? "…جارٍ الإنشاء" : "إنشاء الحساب"}
        </Button>
        <p className="text-center text-xs leading-6 text-muted-foreground">
          بإنشائك حسابًا فأنت توافق على{" "}
          <a className="underline hover:text-foreground" href="#">الشروط</a> و
          <a className="underline hover:text-foreground" href="#"> سياسة الخصوصية</a>.
        </p>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        لديك حساب بالفعل؟{" "}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          سجّل الدخول
        </Link>
      </p>
    </div>
  );
}
