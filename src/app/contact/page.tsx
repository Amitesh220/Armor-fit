import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileQuickBar } from "@/components/MobileQuickBar";
import { gymConfig } from "@/config/gymConfig";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 sm:pt-28 pb-16 sm:pb-20 bg-[#050505] min-h-screen text-[#f4f4f5] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#121417] text-[#a1a1aa] font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest border border-[#23272e]">
              <span className="w-1.5 h-1.5 bg-white inline-block"></span>
              LOCATION &amp; OPERATIONAL RECEPTION
            </div>
            <h1 className="font-headline-lg uppercase text-white font-black tracking-tight">
              CONNECT WITH ARMOR FIT.
            </h1>
            <p className="font-body-md text-[#a1a1aa] max-w-2xl leading-relaxed">
              Located on Green City Road near MP Polytechnic. Walk-ins and scheduled facility walkthroughs welcome during all operational hours.
            </p>
          </div>

          {/* 3-Column Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#121417] border border-[#23272e] p-5 sm:p-6 space-y-4 rounded-[2px]">
              <span className="material-symbols-outlined text-white text-[24px] sm:text-[28px]">pin_drop</span>
              <div className="space-y-1">
                <span className="font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest block font-bold">
                  Facility Address
                </span>
                <h3 className="font-headline-sm text-[15px] sm:text-[16px] text-white uppercase font-bold">
                  {gymConfig.address.full}
                </h3>
              </div>
              <div className="pt-1">
                <a
                  href={gymConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-label-md uppercase tracking-wider text-white hover:underline"
                >
                  <span>Open In Google Maps</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>

            <div className="bg-[#121417] border border-[#23272e] p-5 sm:p-6 space-y-4 rounded-[2px]">
              <span className="material-symbols-outlined text-white text-[24px] sm:text-[28px]">call</span>
              <div className="space-y-1">
                <span className="font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest block font-bold">
                  Direct Inquiries
                </span>
                <a
                  href={`tel:${gymConfig.phoneRaw}`}
                  className="font-headline-sm text-[16px] sm:text-[18px] text-white font-bold block hover:underline"
                >
                  {gymConfig.phone}
                </a>
                <p className="font-body-sm text-[12px] sm:text-[13px] text-[#a1a1aa]">
                  Inquiries, coach scheduling &amp; member support
                </p>
              </div>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${gymConfig.phoneRaw.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-label-md uppercase tracking-wider text-white hover:underline"
                >
                  <span>WhatsApp Athletics Desk</span>
                  <span className="material-symbols-outlined text-[14px]">chat</span>
                </a>
              </div>
            </div>

            <div className="bg-[#121417] border border-[#23272e] p-5 sm:p-6 space-y-4 rounded-[2px]">
              <span className="material-symbols-outlined text-white text-[24px] sm:text-[28px]">schedule</span>
              <div className="space-y-1">
                <span className="font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest block font-bold">
                  Operational Schedule
                </span>
                <div className="space-y-1.5 text-[12px] sm:text-[13px] pt-1">
                  <div className="flex justify-between border-b border-[#23272e] pb-1">
                    <span className="text-[#a1a1aa]">Monday – Saturday</span>
                    <span className="text-white font-bold">{gymConfig.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#23272e] pb-1">
                    <span className="text-[#a1a1aa]">Sunday</span>
                    <span className="text-white font-bold">{gymConfig.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="bg-[#121417] border border-[#23272e] rounded-[2px] overflow-hidden min-h-[320px] sm:min-h-[420px] relative">
            <iframe
              title="Armor Fit Gym Location Map"
              src={gymConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", filter: "invert(90%) hue-rotate(180deg) contrast(120%) brightness(85%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Quick Action Navigation */}
          <div className="bg-[#0e1013] border border-[#23272e] p-6 sm:p-8 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-headline-sm text-[18px] sm:text-[20px] text-white uppercase font-bold tracking-wide">
                Looking to Start Training?
              </h2>
              <p className="font-body-md text-[#a1a1aa] mt-1 text-[13px] sm:text-[14px]">
                Complete our intake form to schedule coach consultation and walkthrough.
              </p>
            </div>
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-label-md text-[12px] uppercase tracking-widest font-extrabold rounded-[2px] hover:bg-[#e4e4e7] transition-colors shrink-0 text-center"
            >
              COMPLETE ATHLETIC INTAKE
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileQuickBar />
    </>
  );
}
