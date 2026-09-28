"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArmorLogo } from "@/components/ArmorLogo";
import { MobileQuickBar } from "@/components/MobileQuickBar";
import { gymConfig } from "@/config/gymConfig";

const GOAL_OPTIONS = [
  "Strength",
  "Muscle Gain",
  "Weight Loss",
  "CrossFit / Functional Training",
  "Personal Training",
  "General Fitness",
  "Other",
];

const TRAINING_FORMATS = [
  {
    value: "Gym",
    title: "Free Weights & Power Area",
    desc: "Heavy barbells, squat racks, dumbbell floor",
  },
  {
    value: "CrossFit",
    title: "CrossFit & High Output",
    desc: "Metabolic conditioning, rig, sprint turf",
  },
  {
    value: "Personal Training",
    title: "1-on-1 Coached PT",
    desc: "Tailored programming with head coaches",
  },
  {
    value: "Not Sure Yet",
    title: "Facility Walkthrough",
    desc: "Discuss options during floor visit",
  },
];

const CONTACT_METHODS = ["WhatsApp", "Phone", "Email"] as const;

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    fitnessGoal: "Strength",
    preferredTraining: "Gym",
    preferredContactMethod: "WhatsApp",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setFieldErrors({});

    // Client validation
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errors.phone = "Valid phone number is required (minimum 8 digits).";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age, 10) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        throw new Error(data.message || "Failed to submit enquiry.");
      }

      setIsSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        age: "",
        fitnessGoal: "Strength",
        preferredTraining: "Gym",
        preferredContactMethod: "WhatsApp",
        message: "",
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
            {/* Left Column: Context & Metadata */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-28">
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#121417] text-[#a1a1aa] font-label-sm text-[10px] sm:text-[11px] uppercase tracking-widest border border-[#23272e]">
                  <span className="w-1.5 h-1.5 bg-white inline-block"></span>
                  ARMOR FIT • INTAKE PORTAL
                </div>

                <h1 className="font-headline-lg text-[32px] sm:text-[40px] uppercase text-white tracking-tight leading-tight font-black">
                  COMMENCE YOUR ATHLETIC PROTOCOL.
                </h1>

                <p className="font-body-md text-[#a1a1aa] leading-relaxed text-[15px]">
                  Step onto a training floor engineered for progressive resistance, barbell clarity, and real physical adaptation.
                </p>
              </div>

              {/* Facility Metadata Modules */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px]">
                  <span className="material-symbols-outlined text-white text-[22px] mt-0.5">
                    pin_drop
                  </span>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#71717a] block">
                      Gorakhpur Facility
                    </span>
                    <p className="font-body-sm text-[13px] text-white mt-1 leading-snug">
                      {gymConfig.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px]">
                  <span className="material-symbols-outlined text-white text-[22px] mt-0.5">
                    sports_gymnastics
                  </span>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#71717a] block">
                      Training Modality
                    </span>
                    <p className="font-body-sm text-[13px] text-white mt-1 leading-snug">
                      Dedicated Strength, Hypertrophy &amp; CrossFit Functional Conditioning
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#0e1013] border border-[#23272e] rounded-[2px]">
                  <span className="material-symbols-outlined text-white text-[22px] mt-0.5">
                    call
                  </span>
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#71717a] block">
                      Direct Athletics Desk
                    </span>
                    <a
                      href={`tel:${gymConfig.phoneRaw}`}
                      className="font-label-md text-[14px] text-white font-semibold tracking-wider hover:underline block mt-0.5"
                    >
                      {gymConfig.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Reassurance */}
              <div className="flex items-center gap-3 px-2 text-[#71717a]">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <p className="font-label-sm text-[11px] uppercase tracking-widest">
                  No spam. No telemarketing. Honest fitness guidance.
                </p>
              </div>
            </div>

            {/* Right Column: The Precision Intake Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#121417] border border-[#23272e] p-6 sm:p-8 lg:p-10 rounded-[2px] shadow-xl relative">
                {/* Form Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#23272e]">
                  <ArmorLogo className="h-6 w-auto object-contain" />
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white"></span>
                    <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#a1a1aa]">
                      Intake Protocol
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
                          ENQUIRY RECEIVED.
                        </span>
                        <p className="font-body-md text-[14px] text-[#a1a1aa] leading-relaxed">
                          Thanks for reaching out. The Armor Fit team will contact you shortly to schedule your facility walkthrough or consultation.
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsSuccess(false)}
                          className="font-label-sm text-[11px] uppercase tracking-widest text-white hover:underline pt-2 text-left"
                        >
                          Submit another inquiry &rarr;
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

                {/* The Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                        Full Name <span className="text-white">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Vikram Pratap"
                        required
                        className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                      />
                      {fieldErrors.fullName && (
                        <p className="text-red-400 text-[11px]">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                        Phone Number <span className="text-white">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                      />
                      {fieldErrors.phone && (
                        <p className="text-red-400 text-[11px]">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#a1a1aa] block">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="vikram@example.com"
                        className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                      />
                      {fieldErrors.email && (
                        <p className="text-red-400 text-[11px]">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#a1a1aa] block">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        min="12"
                        max="99"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="26"
                        className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                      />
                      {fieldErrors.age && (
                        <p className="text-red-400 text-[11px]">{fieldErrors.age}</p>
                      )}
                    </div>
                  </div>

                  {/* Goal Selection Pills */}
                  <div className="space-y-2 pt-2">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                      Primary Fitness Goal <span className="text-white">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {GOAL_OPTIONS.map((goal) => {
                        const isSelected = formData.fitnessGoal === goal;
                        return (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, fitnessGoal: goal }))}
                            className={`p-3 text-left font-label-md text-[11px] uppercase tracking-wider rounded-[2px] border transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-white text-black font-bold border-white"
                                : "bg-[#0e1013] text-[#a1a1aa] border-[#23272e] hover:border-[#474c56] hover:text-white"
                            }`}
                          >
                            <span>{goal}</span>
                            <span
                              className={`w-1.5 h-1.5 ${
                                isSelected ? "bg-black" : "bg-[#3a3f47]"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Training Format */}
                  <div className="space-y-2 pt-2">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                      Preferred Training Format <span className="text-white">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TRAINING_FORMATS.map((tf) => {
                        const isSelected = formData.preferredTraining === tf.value;
                        return (
                          <button
                            key={tf.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, preferredTraining: tf.value }))
                            }
                            className={`p-3.5 text-left rounded-[2px] border transition-all ${
                              isSelected
                                ? "bg-[#1c2026] text-white border-white"
                                : "bg-[#0e1013] text-[#a1a1aa] border-[#23272e] hover:border-[#3a3f47]"
                            }`}
                          >
                            <div className="font-label-md text-[12px] uppercase font-bold text-white">
                              {tf.title}
                            </div>
                            <div className="font-body-sm text-[12px] text-[#71717a] mt-0.5">
                              {tf.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-2 pt-2">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {CONTACT_METHODS.map((method) => {
                        const isSelected = formData.preferredContactMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, preferredContactMethod: method }))
                            }
                            className={`py-2.5 px-3 text-center font-label-md text-[12px] uppercase tracking-wider rounded-[2px] border transition-all ${
                              isSelected
                                ? "bg-white text-black font-bold border-white"
                                : "bg-[#0e1013] text-[#a1a1aa] border-[#23272e] hover:text-white"
                            }`}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 pt-2">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#a1a1aa] block">
                      Current Athletic Background or Specific Inquiries
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="e.g. Previous barbell experience, scheduling questions, or medical considerations."
                      className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white p-4 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
                    />
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
                          <span>SUBMITTING INTAKE...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT ATHLETIC INTAKE</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
