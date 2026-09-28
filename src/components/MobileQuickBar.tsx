"use client";

import React from "react";
import Link from "next/link";
import { gymConfig } from "@/config/gymConfig";

export function MobileQuickBar() {
  return (
    <aside
      aria-label="Mobile quick action bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0c0e]/95 backdrop-blur-md border-t border-[#23272e] md:hidden px-3 py-2"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1.5 items-center">
        {/* Call Now */}
        <a
          href={`tel:${gymConfig.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-[2px] bg-[#121417] border border-[#23272e] text-[#a1a1aa] active:text-white active:bg-[#1c2026] transition-colors"
          aria-label="Call Armor Fit Desk"
        >
          <span className="material-symbols-outlined text-[19px]">call</span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider mt-0.5 font-bold">
            Call
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${gymConfig.phoneRaw.replace("+", "")}?text=Hi%20Armor%20Fit%2C%20I%20am%20interested%20in%20membership%20and%20coaching.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-[2px] bg-[#121417] border border-[#23272e] text-[#a1a1aa] active:text-white active:bg-[#1c2026] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <span className="material-symbols-outlined text-[19px]">chat</span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider mt-0.5 font-bold">
            Chat
          </span>
        </a>

        {/* Directions / Map */}
        <a
          href={gymConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-[2px] bg-[#121417] border border-[#23272e] text-[#a1a1aa] active:text-white active:bg-[#1c2026] transition-colors"
          aria-label="Gym Directions in Maps"
        >
          <span className="material-symbols-outlined text-[19px]">pin_drop</span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider mt-0.5 font-bold">
            Map
          </span>
        </a>

        {/* Join / Enquire */}
        <Link
          href="/enquire"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-[2px] bg-white text-black font-extrabold active:bg-[#e4e4e7] transition-all shadow-sm"
          aria-label="Join Armor Fit"
        >
          <span className="material-symbols-outlined text-[19px]">bolt</span>
          <span className="font-label-sm text-[9px] uppercase tracking-wider mt-0.5">
            Join
          </span>
        </Link>
      </div>
    </aside>
  );
}
