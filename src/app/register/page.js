"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, User, Lock, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, enableDemoUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, fullName);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow">
            <span className="font-serif italic font-bold text-xl">W</span>
          </div>
          <span className="font-serif text-2xl text-[#173D32] font-semibold">
            Wedly AI
          </span>
        </Link>
        <h2 className="font-serif text-3xl font-normal text-[#173D32]">
          Create Your Studio Account
        </h2>
        <p className="font-sans text-xs text-[#77766F]">
          Join thousands of couples creating bespoke invitations with Gemini AI.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-xl border border-[#E8E2D8] shadow-sm space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Couple / Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#77766F] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ayesha & Rafid"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#77766F] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77766F] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77766F] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-bold uppercase tracking-widest shadow transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#77766F]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#173D32] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
