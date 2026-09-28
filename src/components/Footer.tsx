import React from "react";
import Link from "next/link";
import { ArmorLogo } from "./ArmorLogo";
import { gymConfig } from "@/config/gymConfig";

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-[#23272e] pt-16 pb-12 text-[#a1a1aa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#23272e]">
          {/* Col 1: Brand & Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block" aria-label="Armor Fit Home">
              <ArmorLogo className="h-8 w-auto object-contain" />
            </Link>
            <p className="font-label-sm text-[11px] uppercase tracking-widest text-white font-semibold pt-1">
              {gymConfig.tagline}
            </p>
            <p className="font-body-sm text-[13px] text-[#a1a1aa] leading-relaxed max-w-sm">
              An architectural strength and conditioning sanctuary in Gorakhpur. Pure calibrated steel, Olympic deadlift platforms, and uncompromising athletic methodology.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[11px] font-label-sm uppercase tracking-wider text-[#71717a]">
              <span>Est. 2024</span>
              <span>•</span>
              <span>Gorakhpur, UP</span>
            </div>
          </div>

          {/* Col 2: Training Disciplines */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-white font-semibold block">
              Disciplines
            </span>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/#training" className="hover:text-white transition-colors">
                  Barbell Strength
                </Link>
              </li>
              <li>
                <Link href="/#training" className="hover:text-white transition-colors">
                  Conditioning
                </Link>
              </li>
              <li>
                <Link href="/#training" className="hover:text-white transition-colors">
                  Mobility &amp; Longevity
                </Link>
              </li>
              <li>
                <Link href="/#training" className="hover:text-white transition-colors">
                  Functional Rig
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-white transition-colors">
                  Coached 1-on-1 PT
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-white font-semibold block">
              Facility Portals
            </span>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/enquire" className="hover:text-white transition-colors">
                  Customer Intake &amp; Walkthrough
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors">
                  Existing Member Feedback
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Location &amp; Timings
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Staff Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Facility Specs & Location */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="font-label-sm text-[11px] uppercase tracking-widest text-white font-semibold block">
                Facility Location
              </span>
              <p className="font-body-sm text-[13px] text-white leading-relaxed">
                {gymConfig.address.full}
              </p>
              <div className="pt-2">
                <span className="font-label-sm text-[10px] uppercase text-[#71717a] block tracking-wider">
                  Front Desk Line
                </span>
                <a
                  href={`tel:${gymConfig.phoneRaw}`}
                  className="font-label-md text-[14px] text-white font-semibold tracking-wider hover:underline"
                >
                  {gymConfig.phone}
                </a>
              </div>
            </div>

            <div>
              <a
                href={gymConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#3a3f47] px-4 py-2 font-label-md text-[11px] uppercase tracking-wider text-white hover:bg-[#16181d] hover:border-white transition-colors"
              >
                <span>GET DIRECTIONS</span>
                <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px]">
          <p className="font-label-sm uppercase tracking-widest text-[#71717a]">
            &copy; {new Date().getFullYear()} ARMOR FIT GORAKHPUR. STRENGTH &amp; CONDITIONING. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-label-sm uppercase text-[#71717a] tracking-widest">
              RAW DISCIPLINE
            </span>
            <span className="w-1 h-1 bg-[#3a3f47] inline-block"></span>
            <span className="font-label-sm uppercase text-[#71717a] tracking-widest">
              AUTHENTIC IRON
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
