import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background border-t border-foreground">
      <div className="container-page py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <Logo className="scale-150 mb-10 text-white [&_svg]:fill-white" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            استعد ثقتك في العربية.
          </h2>
          <p className="max-w-md text-lg text-background/60 leading-relaxed mb-16">
            فصاحة ليست مجرد أداة تصحيح، بل هي رفيقك اليومي لصقل لغتك المهنية وبناء أسلوبك بثقة.
          </p>

          <div className="w-full max-w-2xl border-t border-white/10 pt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#features" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">الأدوات</a>
            <a href="#how" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">المنهجية</a>
            <a href="#pricing" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">الأسعار</a>
            <a href="#" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">الأسئلة الشائعة</a>
            <a href="#" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">تواصل معنا</a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-sm text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} فصاحة. صُنع بعناية.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">الشروط</a>
            <a href="#" className="hover:text-white transition-colors">الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
