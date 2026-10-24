"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Sparkles,
  Mail,
  Compass,
  Bookmark,
  Settings,
  CreditCard,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Bell,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Create Invitation", href: "/create", icon: Sparkles },
    { label: "My Invitations", href: "/dashboard/invitations", icon: Mail },
    { label: "Explore Designs", href: "/#featured-collection", icon: Compass },
    { label: "Favorites", href: "/dashboard/invitations?tab=favorites", icon: Bookmark },
  ];

  const settingsItems = [
    { label: "Account Settings", href: "/dashboard/settings", icon: Settings },
    { label: "Billing & Plan", href: "/dashboard/settings?tab=billing", icon: CreditCard },
    { label: "Help & Support", href: "/dashboard/settings?tab=support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col md:flex-row antialiased">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-[#F5F3EF] border-r border-[#E8E2D8] fixed top-0 bottom-0 left-0 z-40 py-6 px-4 justify-between">
        <div className="space-y-6">
          {/* Logo & Brand Hallmark */}
          <Link href="/" className="flex items-center gap-3 px-2 group">
            <div className="w-9 h-9 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow-sm">
              <span className="font-serif italic font-bold text-lg">W</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl text-[#173D32] font-semibold leading-none">
                Wedly AI
              </span>
              <span className="font-sans text-[9px] uppercase text-[#C6A66B] tracking-[0.2em] font-bold mt-1">
                Studio Workbench
              </span>
            </div>
          </Link>

          {/* Navigation Section */}
          <div className="space-y-1">
            <span className="px-3 font-sans text-[10px] font-bold uppercase text-[#77766F] tracking-widest block mb-2">
              Navigation
            </span>
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#173D32] text-white shadow-sm"
                      : "text-[#77766F] hover:bg-[#EAE4D7] hover:text-[#173D32]"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Settings Section */}
          <div className="space-y-1 pt-2 border-t border-[#E8E2D8]">
            <span className="px-3 font-sans text-[10px] font-bold uppercase text-[#77766F] tracking-widest block mb-2">
              Settings & Account
            </span>
            {settingsItems.map((item) => {
              const IconComp = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#173D32] text-white shadow-sm"
                      : "text-[#77766F] hover:bg-[#EAE4D7] hover:text-[#173D32]"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Print Concierge Banner */}
        <div className="bg-[#FAF8F4] p-4 rounded border border-[#E8E2D8] space-y-2">
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#9A7C43] block">
            Print Concierge
          </span>
          <p className="font-sans text-[11px] text-[#77766F] leading-snug">
            Need custom hot-foil stamping, wax seal pouring or 450gsm cotton rag stock?
          </p>
          <Link
            href="/dashboard/settings?tab=support"
            className="font-sans text-[11px] font-bold text-[#173D32] hover:underline inline-flex items-center gap-1 pt-1"
          >
            <span>Talk to Master Printer</span>
            <ArrowRight className="w-3 h-3 text-[#C6A66B]" />
          </Link>
        </div>
      </aside>

      {/* Main Body Area */}
      <div className="flex-1 md:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#E8E2D8] px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-[#173D32] hover:bg-[#FAF8F4] rounded"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* AI Credits Pill */}
            <div className="inline-flex items-center gap-2 bg-[#FAF8F4] px-3.5 py-1.5 rounded-full border border-[#E8E2D8] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="font-sans text-xs font-semibold text-[#173D32]">
                12 AI Credits remaining
              </span>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <Link
              href="/create"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>New Invitation</span>
            </Link>

            <div className="flex items-center gap-3 pl-3 border-l border-[#E8E2D8]">
              <div className="w-8 h-8 rounded-full bg-[#173D32] text-[#FAF8F4] font-serif font-bold flex items-center justify-center text-xs shadow-sm">
                {user?.displayName?.[0] || "U"}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-sans text-xs font-bold text-[#173D32] leading-tight">
                  {user?.displayName || "Wedding Couple"}
                </span>
                <span className="font-sans text-[10px] text-[#77766F] leading-tight">
                  Artisan Tier
                </span>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  router.push("/");
                }}
                className="p-1.5 text-[#77766F] hover:text-red-700 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-xs bg-[#FAF8F4] h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow-sm">
                    <span className="font-serif italic font-bold text-sm">W</span>
                  </div>
                  <span className="font-serif text-lg text-[#173D32] font-semibold">
                    Wedly AI
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-[#77766F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#173D32] hover:bg-[#F1E9DA]"
                    >
                      <IconComp className="w-4 h-4 text-[#C6A66B]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-1 pt-4 border-t border-[#E8E2D8]">
                {settingsItems.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#77766F] hover:bg-[#F1E9DA]"
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <button
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="flex items-center gap-2 text-xs font-semibold text-red-600 pt-4 border-t border-[#E8E2D8]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
