import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative flex flex-col p-8 lg:p-12">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:bg-secondary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            العودة إلى الرئيسية
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
          <Outlet />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} فصاحة
        </p>
      </div>

      <aside className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -end-24 top-16 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 -start-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
        </div>
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div className="text-sm opacity-80">فصاحة · للناطقين بالعربية</div>
          <div>
            <p className="font-display text-3xl font-bold leading-relaxed">
              «أعادت لي فصاحة ثقتي بلغتي. أكتبُ رسائل العمل الآن دون تردّد.»
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm opacity-90">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 font-bold">
                س
              </span>
              <div>
                <div className="font-semibold">سارة العتيبي</div>
                <div className="opacity-80">مديرة تسويق</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
