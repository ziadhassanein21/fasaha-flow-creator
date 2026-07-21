import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "إعادة تعيين كلمة المرور · فصاحة" }] }),
  component: Forgot,
});

function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">استعادة كلمة المرور</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        أدخل بريدك، وسنُرسل إليك رابطًا لإعادة التعيين.
      </p>
      {sent ? (
        <div className="mt-8 rounded-2xl border border-success/20 bg-success/10 p-5 text-sm">
          <CheckCircle2 className="mb-2 h-5 w-5 text-success" />
          <p className="font-semibold text-foreground">تم الإرسال</p>
          <p className="mt-1 leading-7 text-muted-foreground">
            راجع بريدك الإلكتروني. إن لم تجد الرسالة، تحقّق من مجلّد الرسائل غير المرغوب فيها.
          </p>
        </div>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" required />
          </div>
          <Button className="w-full rounded-full">إرسال رابط الاستعادة</Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        تذكّرتَها؟{" "}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          العودة لتسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
