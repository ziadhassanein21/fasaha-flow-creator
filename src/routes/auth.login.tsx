import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول · فصاحة" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">مرحبًا بعودتك</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        سجّل الدخول لمتابعة رحلتك مع الفصحى.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => navigate({ to: "/app/dashboard" }), 500);
        }}
      >
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" required />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">كلمة المرور</Label>
            <Link
              to="/auth/forgot"
              className="text-xs font-medium text-primary hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" required />
        </div>
        <Button type="submit" className="w-full rounded-full" disabled={loading}>
          {loading ? "جارٍ الدخول…" : "تسجيل الدخول"}
        </Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> أو <div className="h-px flex-1 bg-border" />
      </div>
      <Button variant="outline" className="w-full rounded-full">
        المتابعة عبر Google
      </Button>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        ليس لديك حساب؟{" "}
        <Link to="/auth/register" className="font-semibold text-primary hover:underline">
          أنشئ حسابًا مجانيًا
        </Link>
      </p>
    </div>
  );
}
