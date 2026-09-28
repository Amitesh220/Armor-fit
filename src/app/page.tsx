import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArmorLogo } from "@/components/ArmorLogo";
import { MobileQuickBar } from "@/components/MobileQuickBar";
import { gymConfig } from "@/config/gymConfig";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="w-full pt-16 sm:pt-20 bg-[#050505] min-h-screen text-[#f4f4f5] overflow-x-hidden">
        {/* ==================================================
            SECTION 1: HERO
        ================================================== */}
        <section className="relative w-full -mt-16 sm:-mt-20 overflow-hidden bg-[#050505] min-h-[92vh] sm:min-h-[95vh] flex flex-col justify-between">
          {/* Atmospheric Ambient Background with Contrast Scrim */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-35 scale-105 transform duration-1000 ease-out"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDb3EH3yl-ocACs206pbcxeYwnz8HAtyZ3Qc6FehcS1ZqQSrg8yWtqgXR7sX0e-YRti12AjW9gDqbR-ooRntQJ3AbjpXYs2TTZIit_TyS5mn5ntYBaKqUPqAAwzhLHRNLrArk90yh8QaddWznmAHOn0Jw3crj5tzGkI7195toqtMITQRzu1RDx07zB40NIEFIThVG6F170nDdFwOR5zMiNr1SBhr9OAB62wL5teiR7ism4j7idoDZ_N9w')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_70%)] pointer-events-none" />

          {/* Main Hero Container */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 flex-1 flex flex-col justify-between w-full">
            {/* Tagline Eyebrow */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#121417] text-[#a1a1aa] font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest border border-[#23272e]">
                <span className="w-1.5 h-1.5 bg-white inline-block"></span>
                ARMOR FIT • GORAKHPUR • ATHLETICS
              </span>
              <span className="hidden sm:inline-block w-4 h-[1px] bg-[#262b33]"></span>
              <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#d4d4d8] font-semibold">
                SAVITRI COMPLEX • GREEN CITY ROAD
              </span>
            </div>

            {/* Main Headline */}
            <div className="max-w-5xl my-auto py-4 sm:py-6">
              <div className="mb-3">
                <p className="font-label-lg uppercase tracking-widest text-white font-bold text-[12px] sm:text-[13px]">
                  {gymConfig.tagline}
                </p>
              </div>

              <h1 className="font-headline-xl text-white font-black max-w-4xl tracking-tighter">
                BUILD YOUR <span className="text-white">STRENGTH.</span>
                <br />
                BECOME YOUR{" "}
                <span className="text-white underline decoration-white decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">
                  ARMOR.
                </span>
              </h1>

              <p className="font-body-lg text-[#a1a1aa] max-w-2xl mt-4 sm:mt-6 leading-relaxed">
                An uncompromising strength and conditioning sanctuary in Gorakhnath, Gorakhpur.
                Pure steel, Olympic platforms, structured functional methodology, and genuine athletic work.
                No fads. No distractions.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Link
                  href="/enquire"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-label-md text-[12px] sm:text-[13px] uppercase tracking-widest font-black rounded-[2px] hover:bg-[#e4e4e7] transition-all shadow-lg active:scale-98"
                >
                  <span>JOIN ARMOR FIT</span>
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </Link>

                <Link
                  href="#memberships"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#121417] border border-[#23272e] text-white font-label-md text-[12px] sm:text-[13px] uppercase tracking-widest font-semibold rounded-[2px] hover:bg-[#1c2026] hover:border-[#474c56] transition-colors"
                >
                  <span>VIEW MEMBERSHIPS</span>
                  <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]">arrow_downward</span>
                </Link>
              </div>
            </div>

            {/* Live Info Strip */}
            <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-[#23272e] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px] flex items-center gap-3.5">
                <span className="material-symbols-outlined text-white text-[24px] sm:text-[28px] shrink-0">pin_drop</span>
                <div className="min-w-0">
                  <span className="block font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest text-[#71717a]">
                    Location
                  </span>
                  <span className="font-label-md text-[12px] sm:text-[13px] uppercase text-white font-semibold tracking-wider truncate block">
                    {gymConfig.address.short}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px] flex items-center gap-3.5">
                <span className="material-symbols-outlined text-white text-[24px] sm:text-[28px] shrink-0">call</span>
                <div className="min-w-0">
                  <span className="block font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest text-[#71717a]">
                    Direct Intake Desk
                  </span>
                  <a
                    href={`tel:${gymConfig.phoneRaw}`}
                    className="font-label-md text-[12px] sm:text-[13px] uppercase text-white hover:text-[#d4d4d8] font-semibold tracking-wider truncate block"
                  >
                    {gymConfig.phone}
                  </a>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px] flex items-center gap-3.5">
                <span className="material-symbols-outlined text-white text-[24px] sm:text-[28px] shrink-0">schedule</span>
                <div className="min-w-0">
                  <span className="block font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest text-[#71717a]">
                    Daily Timings
                  </span>
                  <span className="font-label-md text-[12px] sm:text-[13px] uppercase text-white font-semibold tracking-wider truncate block">
                    {gymConfig.hours.weekdays}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 2: THE GYM / FACILITY STATEMENT
        ================================================== */}
        <section className="w-full bg-[#050505] py-16 sm:py-24 border-t border-[#23272e]" id="the-gym">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Visual Materiality */}
              <div className="lg:col-span-6 relative">
                <div className="relative bg-[#121417] border border-[#23272e] rounded-[2px] overflow-hidden shadow-xl">
                  <div
                    className="w-full h-[320px] sm:h-[440px] lg:h-[500px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcRFGUjMcNYsVdqPuPzuvEoVXQZmk79j8hkx408MBotf-Zd9EtwubwQny2X5SgbeGvbFCli-Uzoyjxil5qDljrSrPYNXobXBN61V2bhZdr6-0E8A504zWH6Z3gGn-jAJOsvpNxAbGSt9rPsbYuf89t_PkQuO_f_VaUOhNUW8lEycLJw5rZgE3nsxDgBsAcKTTVQNkmPZWd9kC71RKvORsrKVeOmdLUz5Qkitnu4EA-nKOSjkI5Pw7RKA')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                  {/* Structural Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 bg-[#0e1013]/95 backdrop-blur-md border border-[#23272e] rounded-[2px] flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest text-[#a1a1aa] block font-semibold">
                        Gorakhpur Iron Sanctum
                      </span>
                      <span className="font-headline-sm text-[14px] sm:text-[16px] text-white uppercase tracking-wide font-bold">
                        Authentic Load-Bearing Floor
                      </span>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1c2026] border border-[#23272e] rounded-[2px] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-white text-[18px] sm:text-[20px]">
                        architecture
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Statement Text */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-5 lg:pl-4">
                <div className="space-y-2">
                  <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-white font-bold block">
                    THE FACILITY STATEMENT
                  </span>
                  <h2 className="font-headline-lg uppercase text-white tracking-tight leading-tight font-black">
                    BUILT FOR PEOPLE WHO ARE SERIOUS ABOUT STRENGTH.
                  </h2>
                </div>

                <p className="font-body-md text-[#e4e4e7] leading-relaxed">
                  Armor Fit was engineered to eliminate commercial gym friction. We do not sell illusions or trendy distractions. We provide elite barbells, rigid power cages, high-tensile chalk, and structured coaching designed to systematically increase your force output and work capacity.
                </p>

                <p className="font-body-sm text-[#a1a1aa] leading-relaxed">
                  Whether you are testing heavy singles on competition platforms, grinding through metabolic intervals on air bikes, or rehabilitating structural movement patterns, this space demands and rewards genuine effort.
                </p>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-[#23272e]">
                  <div className="p-3 bg-[#0e1013] border border-[#23272e] text-center sm:text-left">
                    <span className="font-headline-md text-[20px] sm:text-[24px] font-black text-white block">
                      100%
                    </span>
                    <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#71717a] tracking-wider">
                      Cast Iron
                    </span>
                  </div>
                  <div className="p-3 bg-[#0e1013] border border-[#23272e] text-center sm:text-left">
                    <span className="font-headline-md text-[20px] sm:text-[24px] font-black text-white block">
                      ZERO
                    </span>
                    <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#71717a] tracking-wider">
                      Gimmicks
                    </span>
                  </div>
                  <div className="p-3 bg-[#0e1013] border border-[#23272e] text-center sm:text-left">
                    <span className="font-headline-md text-[20px] sm:text-[24px] font-black text-white block">
                      DAILY
                    </span>
                    <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#71717a] tracking-wider">
                      Coaching
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 3: TRAINING DISCIPLINES
        ================================================== */}
        <section className="w-full bg-[#08090a] py-16 sm:py-24 border-t border-[#23272e]" id="training">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-[#23272e]">
              <div>
                <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a1a1aa] font-bold block mb-1.5">
                  SYSTEMATIC PROTOCOLS
                </span>
                <h2 className="font-headline-lg uppercase text-white font-black tracking-tight">
                  CORE TRAINING DISCIPLINES
                </h2>
              </div>
              <p className="font-body-md text-[#a1a1aa] max-w-md">
                Engineered athletic progressions that forge physical resilience, joint durability, and unshakeable work capacity.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {gymConfig.disciplines.map((d) => (
                <div
                  key={d.number}
                  className="group bg-[#121417] hover:bg-[#181b20] border border-[#23272e] hover:border-[#474c56] transition-all p-4 sm:p-6 lg:p-8 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-headline-lg text-[26px] sm:text-[32px] text-[#474c56] group-hover:text-white font-black transition-colors tracking-tighter shrink-0">
                      {d.number}
                    </span>
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-headline-md text-[18px] sm:text-[22px] text-white uppercase tracking-wide font-bold">
                          {d.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-[#1c2026] border border-[#23272e] text-[#d4d4d8] font-label-sm text-[9px] sm:text-[10px] uppercase tracking-wider">
                          {d.category}
                        </span>
                      </div>
                      <p className="font-body-md text-[#a1a1aa] leading-relaxed text-[13px] sm:text-[14px]">
                        {d.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#23272e]">
                    <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#71717a]">
                      {d.tagline}
                    </span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[2px] bg-[#1c2026] border border-[#23272e] flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-colors shrink-0">
                      <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                        {d.icon}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 4: MEMBERSHIP PLANS & TIERS
        ================================================== */}
        <section className="w-full bg-[#050505] py-16 sm:py-24 border-t border-[#23272e]" id="memberships">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a1a1aa] font-bold block mb-1.5">
                  TRANSPARENT VALUE
                </span>
                <h2 className="font-headline-lg uppercase text-white font-black tracking-tight">
                  MEMBERSHIP PASSES
                </h2>
              </div>
              <p className="font-body-md text-[#a1a1aa] max-w-md">
                Direct access to high-spec iron and functional flooring. No hidden initiation fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gymConfig.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-[2px] transition-all border ${
                    plan.featured
                      ? "bg-[#121417] border-white shadow-2xl ring-1 ring-white/20"
                      : "bg-[#0e1013] border-[#23272e] hover:border-[#474c56]"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-white text-black font-label-sm text-[9px] uppercase font-black tracking-widest rounded-[2px]">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#71717a] block font-bold">
                        {plan.tier}
                      </span>
                      <h3 className="font-headline-md text-[22px] sm:text-[24px] uppercase text-white font-black tracking-wide mt-1">
                        {plan.name}
                      </h3>
                      <p className="font-body-sm text-[12px] sm:text-[13px] text-[#a1a1aa] mt-1">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="py-4 border-y border-[#23272e]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline-lg text-[32px] sm:text-[38px] font-black text-white">
                          {plan.price}
                        </span>
                        <span className="font-label-sm text-[11px] text-[#71717a] uppercase tracking-wider">
                          {plan.period}
                        </span>
                      </div>
                      <span className="font-label-sm text-[10px] uppercase text-[#a1a1aa] tracking-widest block mt-0.5">
                        Duration: {plan.duration}
                      </span>
                    </div>

                    <ul className="space-y-2.5 pt-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[13px] text-[#d4d4d8]">
                          <span className="material-symbols-outlined text-white text-[16px] mt-0.5 shrink-0">
                            check
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link
                      href={`/enquire?tier=${encodeURIComponent(plan.tier)}`}
                      className={`w-full py-3.5 px-4 font-label-md text-[12px] uppercase tracking-widest font-black rounded-[2px] transition-all flex items-center justify-center gap-2 ${
                        plan.featured
                          ? "bg-white text-black hover:bg-[#e4e4e7] shadow-md"
                          : "bg-[#1c2026] text-white border border-[#23272e] hover:bg-[#23272e] hover:border-white"
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 5: SCHEDULE & TIMETABLE
        ================================================== */}
        <section className="w-full bg-[#08090a] py-16 sm:py-24 border-t border-[#23272e]" id="schedule">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a1a1aa] font-bold block mb-1.5">
                  FACILITY TIMETABLE
                </span>
                <h2 className="font-headline-lg uppercase text-white font-black tracking-tight">
                  WEEKLY TRAINING SLOTS
                </h2>
              </div>
              <p className="font-body-md text-[#a1a1aa] max-w-md">
                Coached group sessions, barbell platforms, and open gym floor availability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gymConfig.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#121417] border border-[#23272e] p-6 rounded-[2px] space-y-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#23272e]">
                    <h3 className="font-headline-sm text-[16px] text-white uppercase font-bold tracking-wider">
                      {item.day}
                    </h3>
                    <span className="w-1.5 h-1.5 bg-white"></span>
                  </div>

                  <div className="space-y-2">
                    <span className="font-label-sm text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">
                      Morning Sessions
                    </span>
                    <ul className="space-y-1.5">
                      {item.morningSlots.map((slot, sIdx) => (
                        <li key={sIdx} className="text-[12px] sm:text-[13px] text-[#e4e4e7] flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#474c56] rounded-full shrink-0"></span>
                          <span>{slot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#23272e]">
                    <span className="font-label-sm text-[9px] uppercase tracking-widest text-[#71717a] block font-bold">
                      Evening Sessions
                    </span>
                    <ul className="space-y-1.5">
                      {item.eveningSlots.map((slot, sIdx) => (
                        <li key={sIdx} className="text-[12px] sm:text-[13px] text-[#e4e4e7] flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#474c56] rounded-full shrink-0"></span>
                          <span>{slot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#23272e]">
                    <span className="font-label-sm text-[9px] uppercase tracking-widest text-[#71717a] block">
                      Program Focus
                    </span>
                    <p className="font-body-sm text-[12px] text-[#a1a1aa] mt-0.5">
                      {item.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 6: AMENITIES & INFRASTRUCTURE
        ================================================== */}
        <section className="w-full bg-[#050505] py-16 sm:py-24 border-t border-[#23272e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div>
              <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a1a1aa] font-bold block mb-1.5">
                FACILITY CAPABILITIES
              </span>
              <h2 className="font-headline-lg uppercase text-white font-black tracking-tight">
                AMENITIES &amp; INFRASTRUCTURE
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {gymConfig.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e1013] border border-[#23272e] p-4 sm:p-5 rounded-[2px] flex flex-col justify-between space-y-3 hover:border-[#474c56] transition-colors"
                >
                  <div className="w-9 h-9 bg-[#1c2026] border border-[#23272e] rounded-[2px] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-[13px] sm:text-[14px] text-white uppercase font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-[11px] text-[#71717a] mt-1 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 7: FOUNDATIONAL PRINCIPLES
        ================================================== */}
        <section className="w-full bg-[#08090a] py-16 sm:py-24 border-t border-[#23272e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div>
              <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a1a1aa] font-bold block mb-1.5">
                THE ARMOR CODE
              </span>
              <h2 className="font-headline-lg uppercase text-white font-black tracking-tight">
                FOUNDATIONAL PRINCIPLES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {gymConfig.ethos.map((item) => (
                <div
                  key={item.number}
                  className="bg-[#0e1013] border border-[#23272e] p-5 sm:p-6 rounded-[2px] space-y-3 hover:border-[#474c56] transition-colors"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#23272e]">
                    <span className="font-label-sm text-[10px] text-[#71717a] uppercase font-bold tracking-widest">
                      PRIN • {item.number}
                    </span>
                    <span className="w-1.5 h-1.5 bg-white"></span>
                  </div>
                  <h3 className="font-headline-sm text-[16px] sm:text-[18px] text-white uppercase font-bold tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-[12px] sm:text-[13px] text-[#a1a1aa] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 8: TRAINING FLOOR BLUEPRINT
        ================================================== */}
        <section className="w-full bg-[#050505] py-16 sm:py-24 border-t border-[#23272e]" id="facility">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a1a1aa] font-bold block mb-1.5">
                  FACILITY BLUEPRINT
                </span>
                <h2 className="font-headline-lg uppercase text-white font-black tracking-tight">
                  THE TRAINING FLOOR
                </h2>
              </div>
              <p className="font-body-sm text-[12px] sm:text-[13px] text-[#71717a] uppercase tracking-wider">
                Heavy Barbell Racks • Calibrated Iron • High Lactic Conditioning
              </p>
            </div>

            {/* Asymmetrical Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              {gymConfig.zones.map((zone) => (
                <div
                  key={zone.id}
                  className={`${zone.colSpan} relative group overflow-hidden bg-[#121417] border border-[#23272e] rounded-[2px] shadow-lg min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${zone.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-white text-black font-label-sm text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest rounded-[2px]">
                        {zone.number}
                      </span>
                      <h3 className="font-headline-md text-[18px] sm:text-[20px] uppercase text-white font-bold tracking-wide mt-2">
                        {zone.name}
                      </h3>
                      <p className="font-body-sm text-[12px] sm:text-[13px] text-[#a1a1aa] mt-1 max-w-md">
                        {zone.description}
                      </p>
                    </div>
                    <div className="hidden sm:flex w-9 h-9 bg-[#1c2026] border border-[#23272e] rounded-[2px] items-center justify-center text-white shrink-0">
                      <span className="material-symbols-outlined text-[18px]">
                        {zone.icon}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 9: MEMBERSHIP INTAKE CALLOUT
        ================================================== */}
        <section className="w-full bg-[#08090a] py-16 sm:py-24 border-t border-[#23272e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#121417] border border-[#23272e] rounded-[2px] p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <ArmorLogo className="h-6 w-auto object-contain opacity-90" />
                    <span className="w-1.5 h-1.5 bg-white"></span>
                    <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-white font-bold">
                      MEMBERSHIP INTAKE
                    </span>
                  </div>

                  <h2 className="font-headline-lg uppercase text-white tracking-tight leading-tight font-black">
                    READY TO COMMENCE TRAINING?
                  </h2>

                  <p className="font-body-md text-[#a1a1aa] max-w-xl leading-relaxed">
                    Tell us what you are aiming for. The Armor Fit coaching team will reach out directly with training availability, workout formats, and scheduled walkthrough times.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
                    <Link
                      href="/enquire"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-label-md text-[12px] sm:text-[13px] uppercase tracking-widest font-extrabold rounded-[2px] hover:bg-[#e4e4e7] transition-colors shadow-lg active:scale-98"
                    >
                      <span>ENQUIRE NOW</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>

                    <a
                      href={`tel:${gymConfig.phoneRaw}`}
                      className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#1c2026] border border-[#23272e] text-white font-label-md text-[12px] sm:text-[13px] uppercase tracking-widest hover:border-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      <span>CALL INTAKE DESK</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#0e1013] border border-[#23272e] p-5 sm:p-6 space-y-4">
                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#71717a] block font-bold">
                    Walkthrough Schedule
                  </span>
                  <div className="space-y-3 text-[13px]">
                    <div className="flex justify-between pb-2 border-b border-[#23272e]">
                      <span className="text-[#a1a1aa]">Mon – Sat</span>
                      <span className="text-white font-semibold">{gymConfig.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#23272e]">
                      <span className="text-[#a1a1aa]">Sunday</span>
                      <span className="text-white font-semibold">{gymConfig.hours.sunday}</span>
                    </div>
                  </div>
                  <p className="font-body-sm text-[11px] sm:text-[12px] text-[#71717a] pt-1">
                    Walk-ins welcome during operational hours at Savitri Complex, Green City Road.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            SECTION 10: LOCATION & INTERACTIVE MAP EMBED
        ================================================== */}
        <section className="w-full bg-[#050505] py-16 sm:py-24 border-t border-[#23272e]" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div>
              <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest text-[#a1a1aa] font-bold block mb-1.5">
                CAMPUS &amp; SPECIFICATIONS
              </span>
              <h2 className="font-headline-lg uppercase text-white font-black tracking-tight">
                FIND ARMOR FIT GORAKHPUR
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Location details card */}
              <div className="lg:col-span-6 bg-[#121417] border border-[#23272e] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest block font-bold">
                      Complete Address
                    </span>
                    <h3 className="font-headline-sm text-[18px] sm:text-[20px] text-white uppercase font-bold">
                      {gymConfig.address.full}
                    </h3>
                    <p className="font-body-sm text-[13px] sm:text-[14px] text-[#a1a1aa]">
                      Prominently situated near MP Polytechnic on Green City Road, providing swift connectivity across Gorakhnath and northern Gorakhpur.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#23272e]">
                    <div className="space-y-1">
                      <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#71717a] tracking-wider block">
                        Direct Athletics Line
                      </span>
                      <a
                        href={`tel:${gymConfig.phoneRaw}`}
                        className="font-headline-sm text-[16px] sm:text-[18px] text-white font-bold hover:underline block"
                      >
                        {gymConfig.phone}
                      </a>
                    </div>
                    <div className="space-y-1">
                      <span className="font-label-sm text-[9px] sm:text-[10px] uppercase text-[#71717a] tracking-wider block">
                        Official Inquiries
                      </span>
                      <a
                        href={`mailto:${gymConfig.email}`}
                        className="font-headline-sm text-[14px] sm:text-[16px] text-white font-semibold hover:underline block truncate"
                      >
                        {gymConfig.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href={gymConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-label-md text-[11px] sm:text-[12px] uppercase tracking-widest font-extrabold rounded-[2px] hover:bg-[#e4e4e7] transition-colors"
                  >
                    <span>OPEN IN GOOGLE MAPS</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                  </a>
                  <a
                    href={`https://wa.me/${gymConfig.phoneRaw.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-[#1c2026] border border-[#23272e] text-white font-label-md text-[11px] sm:text-[12px] uppercase tracking-widest hover:border-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="lg:col-span-6 bg-[#121417] border border-[#23272e] rounded-[2px] overflow-hidden min-h-[300px] sm:min-h-[380px] relative">
                <iframe
                  title="Armor Fit Gym Location Map"
                  src={gymConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "320px", filter: "invert(90%) hue-rotate(180deg) contrast(120%) brightness(85%)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileQuickBar />
    </>
  );
}
