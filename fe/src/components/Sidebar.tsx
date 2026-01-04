/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

type IconName =
  | "layout-dashboard"
  | "users"
  | "sprout"
  | "bean"
  | "credit-card"
  | "chart-bar"
  | "menu"
  | "x";

const menuItems: {
  href: string;
  icon: IconName;
  label: string;
}[] = [
  { href: "/", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/customers", label: "Customers", icon: "users" },
  { href: "/garlic-entry", label: "Garlic Entry", icon: "sprout" },
  { href: "/green-peas-entry", label: "Green Peas Entry", icon: "bean" },
  { href: "/payments", label: "Payments", icon: "credit-card" },
  { href: "/monthly-summary", label: "Monthly Summary", icon: "chart-bar" },
];

const Icon = ({ name }: { name: IconName }): JSX.Element => {
  const icons: Record<IconName, JSX.Element> = {
    "layout-dashboard": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    users: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    sprout: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 21C12 21 7 16 7 11.5C7 8.5 9 6 12 6C12 6 12 3 15 3C18 3 19 5 19 7C19 9 17 11 15 11C15 11 17 13 17 15.5C17 18 15 21 12 21Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    bean: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="9" cy="9" r="2" strokeWidth={2} />
        <circle cx="15" cy="15" r="2" strokeWidth={2} />
        <path
          d="M6 6C6 4 8 2 12 2C16 2 18 4 18 6C18 8 16 10 12 10C8 10 6 8 6 6Z M6 18C6 16 8 14 12 14C16 14 18 16 18 18C18 20 16 22 12 22C8 22 6 20 6 18Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    "credit-card": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect height="14" rx="2" strokeWidth={2} width="20" x="2" y="5" />
        <path d="M2 10h20" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    ),
    "chart-bar": (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    menu: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M4 6h16M4 12h16M4 18h16"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
    x: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M6 18L18 6M6 6l12 12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    ),
  };

  return icons[`${name}`];
};

const Sidebar = (): JSX.Element => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Icon name={isMobileOpen ? "x" : "menu"} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-linear-to-b from-[oklch(0.18_0.04_265)] to-[oklch(0.14_0.03_265)] border-r border-border/50 z-40 transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Brand */}
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              🧄 <span className="text-balance">Garlic Admin</span>
            </h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon name={item.icon} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
