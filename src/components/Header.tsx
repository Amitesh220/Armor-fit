"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArmorLogo } from "./ArmorLogo";
import { gymConfig } from "@/config/gymConfig";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Training", href: "/#training" },
    { label: "The Gym", href: "/#the-gym" },
    { label: "Schedule", href: "/#schedule" },
    { label: "Memberships", href: "/#memberships" },
    { label: "Enquiry", href: "/enquire" },
    { label: "Member Feedback", href: "/feedback" },
    { label: "Contact", href: "/contact" },
  ];

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-[#23272e] transition-all">
        <div className="h-16 sm:h-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
              aria-label="Armor Fit Homepage"
            >
              <ArmorLogo className="h-7 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]" />
            </Link>
          </div>

          {/* Desktop Navigation (>= 1180px) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-6 h-full">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-label-md uppercase tracking-wider text-[11px] 2xl:text-[12px] py-2 transition-colors border-b-2 ${
                    active
                      ? "text-white font-bold border-white"
                      : "text-[#a1a1aa] hover:text-white border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA & Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Phone link on tablet/desktop */}
            <a
              href={`tel:${gymConfig.phoneRaw}`}
              className="hidden lg:flex flex-col text-right group pr-1"
            >
              <span className="font-label-sm uppercase tracking-widest text-[9px] text-[#71717a]">
                Direct Desk
              </span>
              <span className="font-label-md text-[12px] text-white tracking-wider font-semibold group-hover:text-white transition-colors">
                {gymConfig.phone}
              </span>
            </a>

            {/* Responsive Join Button */}
            <Link
              href="/enquire"
              className="inline-flex items-center justify-center bg-white text-black font-label-md text-[11px] sm:text-[12px] uppercase px-3 sm:px-5 py-2 sm:py-2.5 rounded-[2px] tracking-wider sm:tracking-widest font-black hover:bg-[#e4e4e7] transition-all shadow-sm active:scale-95"
            >
              <span className="hidden xs:inline">JOIN ARMOR FIT</span>
              <span className="xs:hidden">JOIN</span>
            </Link>

            {/* Admin Portal Key */}
            <Link
              href="/admin/login"
              className="w-8 h-8 rounded-[2px] bg-[#1c2026] border border-[#23272e] flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-[#474c56] transition-colors shrink-0"
              title="Staff Admin Portal"
              aria-label="Staff Admin Portal"
            >
              <span className="material-symbols-outlined text-[17px]">lock</span>
            </Link>

            {/* Mobile Menu Toggle (XL and below) */}
            <button
              type="button"
              className="xl:hidden w-9 h-9 flex items-center justify-center text-[#d4d4d8] hover:text-white bg-[#121417] border border-[#23272e] rounded-[2px] transition-colors focus:outline-none shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm xl:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-16 sm:top-20 right-0 bottom-0 z-40 w-[85%] max-w-sm bg-[#0e1013] border-l border-[#23272e] p-5 flex flex-col justify-between overflow-y-auto transform transition-transform duration-200 ease-out xl:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#23272e]">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#71717a]">
              FACILITY NAVIGATION
            </span>
            <span className="w-1.5 h-1.5 bg-white"></span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-label-md text-[13px] uppercase py-3 px-3 tracking-wider rounded-[2px] transition-all flex items-center justify-between ${
                    active
                      ? "text-white bg-[#1c2026] font-bold border-l-2 border-white pl-4"
                      : "text-[#a1a1aa] hover:text-white hover:bg-[#16181d]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="material-symbols-outlined text-[16px] opacity-60">
                    chevron_right
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Footer Actions */}
        <div className="pt-6 border-t border-[#23272e] space-y-3 pb-safe">
          <div className="p-3 bg-[#121417] border border-[#23272e] rounded-[2px] space-y-1">
            <span className="font-label-sm text-[9px] uppercase text-[#71717a] tracking-widest block">
              Direct Phone Support
            </span>
            <a
              href={`tel:${gymConfig.phoneRaw}`}
              className="font-headline-sm text-[14px] text-white font-bold tracking-wider hover:underline block"
            >
              {gymConfig.phone}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`https://wa.me/${gymConfig.phoneRaw.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#1c2026] border border-[#23272e] text-white text-[11px] font-label-sm uppercase tracking-wider rounded-[2px] hover:border-white transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp</span>
            </a>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#1c2026] border border-[#23272e] text-[#a1a1aa] text-[11px] font-label-sm uppercase tracking-wider rounded-[2px] hover:text-white hover:border-white transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

