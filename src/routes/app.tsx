import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import {
  Wand2,
  LayoutDashboard,
  BookOpenText,
  BarChart3,
  History,
  User,
  BookmarkCheck,
  Flame,
  Bell,
  Search,
  MessageSquareQuote,
  Library,
  Swords,
} from "lucide-react";


import { Logo } from "@/components/brand/Logo";
import { LevelBadge } from "@/components/level/LevelBadge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "فصاحة — لوحة التحكم" }] }),
  component: AppLayout,
});

const items = [
  { title: "الرئيسية", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "التحديات", url: "/app/challenges", icon: Swords },
  { title: "تفصيح", url: "/app/tafsih", icon: Wand2 },
  { title: "المكتبة", url: "/app/library", icon: Library },
  { title: "التشخيص", url: "/app/diagnostics", icon: BarChart3 },
  { title: "قواعد اللغة", url: "/app/rules", icon: BookOpenText },
  { title: "الأرشيف", url: "/app/history", icon: History },
  { title: "الملف الشخصي", url: "/app/profile", icon: User },
] as const;

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar side="right" collapsible="icon" className="border-l border-border">
          <SidebarHeader className="px-3 py-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>التنقّل</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((it) => {
                    const active = pathname.startsWith(it.url);
                    return (
                      <SidebarMenuItem key={it.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={it.title}
                          className="gap-3"
                        >
                          <Link to={it.url}>
                            <it.icon className="h-4 w-4" />
                            <span>{it.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-3 py-4 group-data-[state=collapsed]:hidden">
            <div className="space-y-2 rounded-2xl border border-border bg-secondary/60 p-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Flame className="h-4 w-4 text-accent" /> ٧ أيام
                </div>
                <LevelBadge score={64} />
              </div>
              <p className="text-muted-foreground">استمرّ لتحافظ على السلسلة.</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
            <SidebarTrigger className="rounded-full" />
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ابحث في القواعد أو الأرشيف…"
                className="rounded-full bg-secondary/60 pe-9"
              />
            </div>
            <div className="ms-auto flex items-center gap-2">
              <ThemeToggle />

              <button
                type="button"
                aria-label="الإشعارات"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary"
              >
                <Bell className="h-4 w-4" />
              </button>

              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-primary-soft text-sm font-bold text-primary">
                  م
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
