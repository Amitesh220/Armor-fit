"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArmorLogo } from "@/components/ArmorLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid login credentials.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <Link href="/" aria-label="Armor Fit Homepage">
            <ArmorLogo className="h-10 w-auto object-contain" />
          </Link>
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#121417] text-[#a1a1aa] font-label-sm text-[10px] uppercase tracking-widest border border-[#23272e]">
              <span className="w-1.5 h-1.5 bg-white inline-block"></span>
              SECURE STAFF CONSOLE
            </span>
          </div>
          <h1 className="font-headline-sm text-[22px] uppercase text-white font-black tracking-wide">
            ADMINISTRATIVE ACCESS
          </h1>
          <p className="font-body-sm text-[13px] text-[#71717a]">
            Access restricted to authorized Armor Fit staff and coaching leadership.
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#121417] border border-[#23272e] p-8 rounded-[2px] shadow-2xl space-y-6">
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-[13px] rounded-[2px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                Staff Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@armorfit.com"
                className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-label-sm text-[11px] uppercase tracking-wider text-white font-bold block">
                Security Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-4 py-3 text-[14px] text-white placeholder-[#71717a] outline-none rounded-[2px] transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-white text-black font-label-md text-[13px] uppercase tracking-widest font-extrabold rounded-[2px] hover:bg-[#e4e4e7] disabled:opacity-50 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>VERIFYING SESSION...</span>
                  </>
                ) : (
                  <>
                    <span>AUTHENTICATE</span>
                    <span className="material-symbols-outlined text-[18px]">lock_open</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Dev Hint Box */}
          <div className="p-3 bg-[#0e1013] border border-[#23272e] rounded-[2px] text-[11px] space-y-1 text-[#71717a]">
            <span className="font-label-sm uppercase font-bold text-[#a1a1aa] block">
              Default Development Credentials:
            </span>
            <div>Email: <code className="text-white">admin@armorfit.com</code></div>
            <div>Password: <code className="text-white">ArmorFitStaff2025!</code></div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="font-label-sm text-[11px] uppercase tracking-wider text-[#71717a] hover:text-white transition-colors"
          >
            &larr; Return to Armor Fit Public Site
          </Link>
        </div>
      </div>
    </main>
  );
}
