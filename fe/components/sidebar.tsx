"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, ClipboardList, Calendar, CreditCard, Sprout } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Daily Entries",
    href: "/daily-entries",
    icon: ClipboardList,
  },
  {
    title: "Monthly Summary",
    href: "/monthly-summary",
    icon: Calendar,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <Sprout className="h-6 w-6 text-primary" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-sidebar-foreground">GreenBiz</span>
          <span className="text-xs text-muted-foreground">Wholesale Manager</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="text-xs text-muted-foreground">© 2026 GreenBiz Admin</div>
      </div>
    </div>
  );
}
