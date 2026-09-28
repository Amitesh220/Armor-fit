"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArmorLogo } from "@/components/ArmorLogo";

export function AdminNav({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { label: "Enquiries", href: "/admin/enquiries", icon: "inbox" },
    { label: "Feedback", href: "/admin/feedback", icon: "rate_review" },
  ];

  return (
    <header className="w-full bg-[#0a0a0a] border-b border-[#23272e] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 sm:gap-3">
            <ArmorLogo className="h-5 sm:h-6 w-auto object-contain" />
            <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest text-[#71717a] border-l border-[#23272e] pl-2 sm:pl-3 py-1">
              STAFF
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] font-label-md text-[11px] uppercase tracking-wider transition-colors ${
                    active
                      ? "bg-white text-black font-bold"
                      : "text-[#a1a1aa] hover:text-white hover:bg-[#16181d]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-label-sm uppercase tracking-wider text-[#a1a1aa] hover:text-white"
          >
            <span>Public Site</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </Link>

          {adminEmail && (
            <span className="hidden lg:inline-block text-[11px] font-body-sm text-[#71717a] truncate max-w-[150px]">
              {adminEmail}
            </span>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-[#16181d] border border-[#23272e] hover:border-red-600 hover:text-red-400 text-[#a1a1aa] font-label-md text-[10px] sm:text-[11px] uppercase tracking-wider rounded-[2px] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Tab Navigation (< 768px) */}
      <nav className="flex md:hidden items-center justify-around border-t border-[#23272e] px-2 py-1.5 bg-[#0e1013]">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[2px] font-label-sm text-[10px] uppercase tracking-wider transition-colors ${
                active
                  ? "bg-white text-black font-black"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
