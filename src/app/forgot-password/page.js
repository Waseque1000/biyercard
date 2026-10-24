"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Mail, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err) {
      console.error("Password reset error:", err);
      setError(err.message || "Failed to send reset email.");
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
          Reset Your Password
        </h2>
        <p className="font-sans text-xs text-[#77766F]">
          Enter your registered email address to receive password reset instructions.
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

          {submitted ? (
            <div className="py-6 flex flex-col items-center text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-[#285C49]" />
              <h4 className="font-serif text-xl font-semibold text-[#173D32]">
                Reset Email Dispatched
              </h4>
              <p className="font-sans text-xs text-[#77766F]">
                If an account exists for {email}, a recovery email has been sent. Please check your inbox.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#173D32] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-bold uppercase tracking-widest shadow transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Password Reset Link"}
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#77766F] hover:text-[#173D32]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
