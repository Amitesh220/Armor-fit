"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArmorLogo } from "@/components/ArmorLogo";
import { MobileQuickBar } from "@/components/MobileQuickBar";

const SECTORS = [
  "Equipment",
  "Cleanliness",
  "Training",
  "Staff",
  "Personal Training",
  "Classes",
  "Environment",
  "Membership Experience",
  "Other",
];

const RATINGS = [
  { value: 1, label: "Unsatisfactory", desc: "Critical deficit" },
  { value: 2, label: "Needs Improvement", desc: "Below standard" },
  { value: 3, label: "Meets Standards", desc: "Functional" },
  { value: 4, label: "Strong Execution", desc: "Commendable" },
  { value: 5, label: "Benchmark", desc: "Elite standard" },
];

export default function MemberFeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    memberIdentifier: "",
    isAnonymous: false,
    feedbackType: "Equipment",
    rating: 5,
    feedback: "",
    contactPermission: false,
    contactDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!formData.feedback.trim() || formData.feedback.trim().length < 5) {
      errors.feedback = "Please provide at least 5 characters of feedback details.";
    }

    if (formData.contactPermission && !formData.contactDetails.trim()) {
      errors.contactDetails = "Please provide your phone or email for follow-up.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.isAnonymous ? "Anonymous Member" : formData.name,
          memberIdentifier: formData.isAnonymous ? undefined : formData.memberIdentifier,
          feedbackType: formData.feedbackType,
          rating: formData.rating,
          feedback: formData.feedback,
          contactPermission: formData.contactPermission,
          contactDetails: formData.contactPermission ? formData.contactDetails : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        throw new Error(data.message || "Failed to submit feedback.");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        memberIdentifier: "",
        isAnonymous: false,
        feedbackType: "Equipment",
        rating: 5,
        feedback: "",
        contactPermission: false,
        contactDetails: "",
      });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="w-full pt-20 sm:pt-28 pb-24 sm:pb-20 bg-[#050505] min-h-screen text-[#f4f4f5] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Mission & Facility Benchmarks */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-28">
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#121417] text-[#a1a1aa] font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest border border-[#23272e]">
                  <span className="w-1.5 h-1.5 bg-white inline-block"></span>
                  EXISTING MEMBERS ONLY
                </div>

                <h1 className="font-headline-lg uppercase text-white tracking-tight leading-tight font-black">
                  MEMBER INTELLIGENCE &amp; AUDIT.
                </h1>

                <p className="font-body-md text-[#a1a1aa] leading-relaxed text-[15px]">
                  Direct operational feedback for current Armor Fit athletes. Help us optimize barbell knurling, facility hygiene, coaching standards, and training environment.
                </p>
              </div>

              {/* Live Facility Benchmarks */}
              <div className="space-y-3 pt-2">
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#71717a] block font-bold">
                  Operational Standards
                </span>

                <div className="p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white text-[20px]">sanitizer</span>
                    <span className="font-label-md text-[13px] uppercase text-white font-semibold tracking-wider">
                      Cleanliness Protocol
                    </span>
                  </div>
                  <span className="font-headline-sm text-[18px] text-white font-bold">98.4%</span>
                </div>

                <div className="p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white text-[20px]">build</span>
                    <span className="font-label-md text-[13px] uppercase text-white font-semibold tracking-wider">
                      Equipment Uptime
                    </span>
                  </div>
                  <span className="font-headline-sm text-[18px] text-white font-bold">99.1%</span>
                </div>

                <div className="p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white text-[20px]">task_alt</span>
                    <span className="font-label-md text-[13px] uppercase text-white font-semibold tracking-wider">
                      Issue Resolution
                    </span>
                  </div>
                  <span className="font-headline-sm text-[18px] text-white font-bold">94.7%</span>
                </div>
              </div>

              {/* Reassurance */}
              <div className="flex items-center gap-3 px-2 text-[#71717a]">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <p className="font-label-sm text-[11px] uppercase tracking-widest">
                  Feedback recorded strictly for facility governance and continuous optimization.
                </p>
              </div>
            </div>

            {/* Right Column: Member Feedback Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#121417] border border-[#23272e] p-6 sm:p-8 lg:p-10 rounded-[2px] shadow-xl relative">
                {/* Form Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#23272e]">
                  <ArmorLogo className="h-6 w-auto object-contain" />
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white"></span>
                    <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#a1a1aa]">
                      Facility Audit
                    </span>
                  </div>
                </div>

                {/* Success Notification */}
                {isSuccess && (
                  <div className="bg-[#16181d] border border-white p-6 my-6 rounded-[2px] animate-in fade-in duration-200">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-white text-black flex items-center justify-center shrink-0 rounded-[2px]">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="font-headline-sm text-[18px] uppercase text-white font-bold tracking-wider">
                          THANK YOU FOR THE FEEDBACK.
                        </span>
                        <p className="font-body-md text-[14px] text-[#a1a1aa] leading-relaxed">
                          Your feedback has been received and will be reviewed by the Armor Fit leadership team.
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsSuccess(false)}
                          className="font-label-sm text-[11px] uppercase tracking-widest text-white hover:underline pt-2 text-left"
                        >
                          Submit additional feedback &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* General Error Banner */}
                {errorMsg && (
                  <div className="p-4 mb-6 bg-red-950/60 border border-red-800 text-red-200 text-[13px] rounded-[2px]">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Anonymous toggle */}
                  <div className="p-4 bg-[#0e1013] border border-[#23272e] flex items-center justify-between rounded-[2px]">
                    <div>
                      <span className="font-label-md text-[12px] uppercase text-white font-bold block">
                        Anonymous Submission
                      </span>
                      <span className="font-body-sm text-[12px] text-[#71717a]">
                        Omit identity data from public logs
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, isAnonymous: !prev.isAnonymous }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                        formData.isAnonymous ? "bg-white" : "bg-[#23272e]"
                      }`}
                      aria-label="Toggle Anonymous Submission"
                    >
                      <span
                        className={`w-4 h-4 rounded-full transition-transform ${
                          formData.isAnonymous ? "bg-black translate-x-6" : "bg-[#71717a] translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Name and Member ID (hidden if anonymous) */}
                  {!formData.isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                          Athlete Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="e.g. Rahul Verma"
                          className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                          Member ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.memberIdentifier}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, memberIdentifier: e.target.value }))
                          }
                          placeholder="AF-1042"
                          className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Sector Selection */}
                  <div className="space-y-2">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                      Facility Sector / Category <span className="text-white">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SECTORS.map((sector) => {
                        const isSelected = formData.feedbackType === sector;
                        return (
                          <button
                            key={sector}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, feedbackType: sector }))
                            }
                            className={`px-3 py-2 text-[12px] font-label-md uppercase tracking-wider rounded-[2px] border transition-colors ${
                              isSelected
                                ? "bg-white text-black font-bold border-white"
                                : "bg-[#0e1013] text-[#a1a1aa] border-[#23272e] hover:border-[#474c56] hover:text-white"
                            }`}
                          >
                            {sector}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5-tier Rating */}
                  <div className="space-y-2">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                      Operational Rating <span className="text-white">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {RATINGS.map((r) => {
                        const isSelected = formData.rating === r.value;
                        return (
                          <button
                            key={r.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, rating: r.value }))
                            }
                            className={`p-3 text-center border rounded-[2px] transition-all flex flex-col items-center justify-center ${
                              isSelected
                                ? "bg-white text-black border-white font-bold"
                                : "bg-[#0e1013] text-[#a1a1aa] border-[#23272e] hover:border-[#474c56]"
                            }`}
                          >
                            <span className="font-headline-sm text-[18px]">{r.value}★</span>
                            <span className="font-label-sm text-[9px] uppercase tracking-wider mt-1 block">
                              {r.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Details */}
                  <div className="space-y-1.5">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                      Detailed Observation <span className="text-white">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.feedback}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, feedback: e.target.value }))
                      }
                      placeholder="Please be specific. e.g. Deadlift jack wheels need maintenance, platform 3 chalk box low, squat rack knurling condition, etc."
                      className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white p-4 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                    />
                    {fieldErrors.feedback && (
                      <p className="text-red-400 text-[11px]">{fieldErrors.feedback}</p>
                    )}
                  </div>

                  {/* Follow-up Permission */}
                  <div className="space-y-3 pt-2 border-t border-[#23272e]">
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                      Coaching Follow-up Preference
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, contactPermission: true }))
                        }
                        className={`p-3 text-left border rounded-[2px] transition-all ${
                          formData.contactPermission
                            ? "bg-[#1c2026] text-white border-white"
                            : "bg-[#0e1013] text-[#a1a1aa] border-[#23272e]"
                        }`}
                      >
                        <div className="font-label-md text-[12px] uppercase font-bold text-white">
                          Yes, Contact Me
                        </div>
                        <div className="font-body-sm text-[11px] text-[#71717a] mt-0.5">
                          Reach out directly regarding this insight
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, contactPermission: false }))
                        }
                        className={`p-3 text-left border rounded-[2px] transition-all ${
                          !formData.contactPermission
                            ? "bg-[#1c2026] text-white border-white"
                            : "bg-[#0e1013] text-[#a1a1aa] border-[#23272e]"
                        }`}
                      >
                        <div className="font-label-md text-[12px] uppercase font-bold text-white">
                          No Follow-up Required
                        </div>
                        <div className="font-body-sm text-[11px] text-[#71717a] mt-0.5">
                          Record insight into facility log only
                        </div>
                      </button>
                    </div>

                    {formData.contactPermission && (
                      <div className="space-y-1.5 pt-2">
                        <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                          Phone or Email for Follow-up <span className="text-white">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.contactDetails}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, contactDetails: e.target.value }))
                          }
                          placeholder="+91 98765 43210 or athlete@example.com"
                          className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                        />
                        {fieldErrors.contactDetails && (
                          <p className="text-red-400 text-[11px]">{fieldErrors.contactDetails}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 bg-white text-black font-label-md text-[13px] uppercase tracking-widest font-extrabold rounded-[2px] hover:bg-[#e4e4e7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                          <span>TRANSMITTING INSIGHT...</span>
                        </>
                      ) : (
                        <>
                          <span>TRANSMIT OPERATIONAL FEEDBACK</span>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileQuickBar />
    </>
  );
}
