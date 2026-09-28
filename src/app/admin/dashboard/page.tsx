"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

interface DashboardStats {
  enquiries: {
    total: number;
    new: number;
    contacted: number;
    converted: number;
  };
  feedback: {
    total: number;
    new: number;
    averageRating: number;
  };
  recentEnquiries: Array<{
    _id: string;
    fullName: string;
    phone: string;
    fitnessGoal: string;
    preferredTraining: string;
    status: string;
    createdAt: string;
  }>;
  recentFeedback: Array<{
    _id: string;
    name?: string;
    feedbackType: string;
    rating: number;
    feedback: string;
    contactPermission: boolean;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/dashboard/stats");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load stats");
      setStats(data.stats);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col">
      <AdminNav />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Page Title & Quick Links */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#23272e]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#121417] text-[#a1a1aa] font-label-sm text-[10px] uppercase tracking-widest border border-[#23272e] mb-2">
              <span className="w-1.5 h-1.5 bg-white"></span>
              OVERVIEW
            </div>
            <h1 className="font-headline-lg text-[28px] sm:text-[36px] uppercase text-white font-black tracking-tight">
              ATHLETICS OPERATIONS CONSOLE
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/enquiries"
              className="px-4 py-2.5 bg-white text-black font-label-md text-[12px] uppercase font-bold tracking-wider rounded-[2px] hover:bg-[#e4e4e7] transition-colors"
            >
              Manage Enquiries
            </Link>
            <Link
              href="/admin/feedback"
              className="px-4 py-2.5 bg-[#16181d] border border-[#23272e] text-white font-label-md text-[12px] uppercase tracking-wider rounded-[2px] hover:border-white transition-colors"
            >
              Review Feedback
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#71717a] font-label-md text-[13px] uppercase tracking-widest">
            Aggregating Operational Metrics...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-950/60 border border-red-800 text-red-200 text-[13px] rounded-[2px]">
            {error}
          </div>
        ) : stats ? (
          <>
            {/* 4 Stats Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Enquiries */}
              <div className="bg-[#121417] border border-[#23272e] p-5 rounded-[2px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#a1a1aa]">
                    Total Enquiries
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-[#71717a]">
                    inbox
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-headline-xl text-[36px] font-black text-white">
                    {stats.enquiries.total}
                  </span>
                  {stats.enquiries.new > 0 && (
                    <span className="px-2 py-0.5 bg-white text-black font-label-sm text-[10px] uppercase font-bold rounded-[2px]">
                      {stats.enquiries.new} NEW
                    </span>
                  )}
                </div>
                <p className="font-body-sm text-[12px] text-[#71717a]">
                  Prospective athletes requesting intake
                </p>
              </div>

              {/* Card 2: Contacted */}
              <div className="bg-[#121417] border border-[#23272e] p-5 rounded-[2px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#a1a1aa]">
                    Contacted
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-[#71717a]">
                    phone_in_talk
                  </span>
                </div>
                <div className="font-headline-xl text-[36px] font-black text-white">
                  {stats.enquiries.contacted}
                </div>
                <p className="font-body-sm text-[12px] text-[#71717a]">
                  Walkthroughs scheduled or in dialogue
                </p>
              </div>

              {/* Card 3: Converted */}
              <div className="bg-[#121417] border border-[#23272e] p-5 rounded-[2px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#a1a1aa]">
                    Converted Athletes
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-[#71717a]">
                    verified
                  </span>
                </div>
                <div className="font-headline-xl text-[36px] font-black text-white">
                  {stats.enquiries.converted}
                </div>
                <p className="font-body-sm text-[12px] text-[#71717a]">
                  Active gym roster additions
                </p>
              </div>

              {/* Card 4: Member Feedback */}
              <div className="bg-[#121417] border border-[#23272e] p-5 rounded-[2px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#a1a1aa]">
                    Member Feedback
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-[#71717a]">
                    grade
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-headline-xl text-[36px] font-black text-white">
                    {stats.feedback.total}
                  </span>
                  <span className="text-[14px] font-bold text-white">
                    {stats.feedback.averageRating}★ Avg
                  </span>
                </div>
                <p className="font-body-sm text-[12px] text-[#71717a]">
                  {stats.feedback.new} pending review
                </p>
              </div>
            </div>

            {/* Two Column Layout: Recent Enquiries & Recent Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Recent Enquiries */}
              <div className="lg:col-span-7 bg-[#121417] border border-[#23272e] rounded-[2px] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#23272e]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-[18px]">inbox</span>
                    <h2 className="font-headline-sm text-[16px] uppercase text-white font-bold tracking-wide">
                      Recent Inquiries
                    </h2>
                  </div>
                  <Link
                    href="/admin/enquiries"
                    className="font-label-sm text-[11px] uppercase text-[#a1a1aa] hover:text-white tracking-wider"
                  >
                    View All &rarr;
                  </Link>
                </div>

                {stats.recentEnquiries.length === 0 ? (
                  <p className="text-[13px] text-[#71717a] py-6 text-center">
                    No inquiries recorded yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats.recentEnquiries.map((enq) => (
                      <div
                        key={enq._id}
                        className="p-3 bg-[#0e1013] border border-[#23272e] rounded-[2px] flex items-center justify-between gap-4"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-[14px] text-white font-semibold">
                              {enq.fullName}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 text-[9px] font-label-sm uppercase font-bold rounded-[2px] ${
                                enq.status === "NEW"
                                  ? "bg-white text-black"
                                  : enq.status === "CONVERTED"
                                  ? "bg-zinc-700 text-white"
                                  : "bg-[#1c2026] text-[#a1a1aa] border border-[#23272e]"
                              }`}
                            >
                              {enq.status}
                            </span>
                          </div>
                          <div className="text-[12px] text-[#71717a] flex items-center gap-3">
                            <span>{enq.phone}</span>
                            <span>•</span>
                            <span>{enq.fitnessGoal}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-label-sm text-[10px] text-[#71717a] block">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </span>
                          <Link
                            href="/admin/enquiries"
                            className="text-[11px] font-label-sm uppercase text-white hover:underline"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Recent Feedback */}
              <div className="lg:col-span-5 bg-[#121417] border border-[#23272e] rounded-[2px] p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#23272e]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-[18px]">reviews</span>
                    <h2 className="font-headline-sm text-[16px] uppercase text-white font-bold tracking-wide">
                      Recent Feedback
                    </h2>
                  </div>
                  <Link
                    href="/admin/feedback"
                    className="font-label-sm text-[11px] uppercase text-[#a1a1aa] hover:text-white tracking-wider"
                  >
                    View All &rarr;
                  </Link>
                </div>

                {stats.recentFeedback.length === 0 ? (
                  <p className="text-[13px] text-[#71717a] py-6 text-center">
                    No member feedback recorded yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats.recentFeedback.map((fb) => (
                      <div
                        key={fb._id}
                        className="p-3 bg-[#0e1013] border border-[#23272e] rounded-[2px] space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-label-sm text-[11px] uppercase text-white font-bold">
                              {fb.feedbackType}
                            </span>
                            <span className="text-[11px] font-bold text-white">
                              {fb.rating}★
                            </span>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-label-sm uppercase font-bold rounded-[2px] ${
                              fb.status === "NEW" ? "bg-white text-black" : "bg-[#1c2026] text-[#a1a1aa]"
                            }`}
                          >
                            {fb.status}
                          </span>
                        </div>
                        <p className="font-body-sm text-[12px] text-[#a1a1aa] line-clamp-2">
                          &ldquo;{fb.feedback}&rdquo;
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-label-sm uppercase text-[#71717a] pt-1">
                          <span>{fb.name || "Anonymous"}</span>
                          <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
