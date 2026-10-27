"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  User,
  Lock,
  Mail,
  AlertCircle,
  Download,
  LayoutDashboard,
  Compass,
  Home,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

function formatFirebaseRegisterError(err) {
  const code = err?.code || "";
  if (code === "auth/email-already-in-use") {
    return "This email address is already registered. Please sign in instead.";
  }
  if (code === "auth/invalid-email") {
    return "Please enter a valid email address.";
  }
  if (code === "auth/weak-password") {
    return "Password is too weak. Please use at least 6 characters.";
  }
  if (code === "auth/popup-closed-by-user") {
    return "Google sign-in popup was closed before completing.";
  }
  return err?.message || "Failed to create account. Please try again.";
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, loginWithGoogle } = useAuth();

  const redirectParam = searchParams.get("redirect") || "";
  const reasonParam = searchParams.get("reason") || "";
  const isDownloadGate =
    reasonParam === "download" || redirectParam.includes("download=");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [destination, setDestination] = useState(
    redirectParam || "/dashboard"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (redirectParam) {
      setDestination(redirectParam);
    }
  }, [redirectParam]);

  const destinationOptions = [
    ...(redirectParam
      ? [
          {
            id: redirectParam,
            label: isDownloadGate
              ? "Return to Card & Download Final Copy"
              : "Return to Previous Page",
            sub: redirectParam,
            icon: Download,
          },
        ]
      : []),
    {
      id: "/dashboard",
      label: "My User Dashboard",
      sub: "View profile & manage all saved cards",
      icon: LayoutDashboard,
    },
    {
      id: "/templates",
      label: "108+ Ready Templates Gallery",
      sub: "Browse & customize ready cards",
      icon: Compass,
    },
    {
      id: "/create",
      label: "AI Card Creator Studio",
      sub: "Design a brand new invitation",
      icon: Sparkles,
    },
    {
      id: "/",
      label: "Home Page",
      sub: "Return to main landing page",
      icon: Home,
    },
  ];

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
      await register(email.trim(), password, fullName.trim());
      const target = destination || redirectParam || "/dashboard";
      toast.success(
        isDownloadGate
          ? "Account created! Redirecting to download your card..."
          : "Account created successfully! Welcome to Wedly AI."
      );
      router.push(target);
    } catch (err) {
      console.error("Register error:", err);
      setError(formatFirebaseRegisterError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      const target = destination || redirectParam || "/dashboard";
      toast.success(
        isDownloadGate
          ? "Registered with Google! Redirecting to download your card..."
          : "Signed in with Google!"
      );
      router.push(target);
    } catch (err) {
      console.error("Google register error:", err);
      setError(formatFirebaseRegisterError(err));
    } finally {
      setLoading(false);
    }
  };

  const loginHref = `/login${
    redirectParam || reasonParam
      ? `?${new URLSearchParams({
          ...(redirectParam ? { redirect: redirectParam } : {}),
          ...(reasonParam ? { reason: reasonParam } : {}),
        }).toString()}`
      : ""
  }`;

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C6A66B]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2.5 z-10 px-4">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow">
            <span className="font-serif italic font-bold text-xl">W</span>
          </div>
          <span className="font-serif text-2xl text-[#173D32] font-semibold">
            Wedly AI
          </span>
        </Link>
        <h1 className="font-serif text-3xl font-normal text-[#173D32]">
          {isDownloadGate
            ? "Create Account to Download Card"
            : "Create Your Studio Account"}
        </h1>
        <p className="font-sans text-xs text-[#77766F]">
          {isDownloadGate
            ? "Register a free account to download your high-res card and save it to your dashboard."
            : "Join couples crafting bespoke invitations with 300 DPI print-ready exports."}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4 z-10">
        <div className="bg-white py-7 px-6 sm:px-9 rounded-2xl border border-[#E8E2D8] shadow-xl space-y-5">
          {isDownloadGate && (
            <div className="p-3.5 rounded-xl bg-[#173D32] text-[#FAF8F4] border border-[#C6A66B]/40 flex items-start gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#C6A66B]/20 border border-[#C6A66B]/40 flex items-center justify-center shrink-0 mt-0.5">
                <Download className="w-4 h-4 text-[#C6A66B]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#F5E6C8] block">
                  Your Card Design is Ready for Download!
                </span>
                <p className="text-[11px] text-[#D8E2DC] leading-relaxed">
                  Complete registration below (or{" "}
                  <Link
                    href={loginHref}
                    className="underline font-semibold text-[#C6A66B]"
                  >
                    sign in here
                  </Link>
                  ) to immediately download your card and keep it in your User Dashboard.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Your Name / Couple Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#77766F] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ayesha & Rafid"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/60 focus:bg-white focus:outline-none focus:border-[#173D32]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#77766F] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/60 focus:bg-white focus:outline-none focus:border-[#173D32]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-[#173D32]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#77766F] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/60 focus:bg-white focus:outline-none focus:border-[#173D32]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold text-[#173D32]">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#77766F] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/60 focus:bg-white focus:outline-none focus:border-[#173D32]"
                  />
                </div>
              </div>
            </div>

            {/* Destination Selector */}
            <div className="pt-1 space-y-2">
              <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#9A7C43] block">
                Where would you like to go after registration? (রেজিস্ট্রেশন করার পর কোথায় যাবেন?)
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {destinationOptions.map((opt) => {
                  const IconComp = opt.icon;
                  const isSelected = destination === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDestination(opt.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg border flex items-center justify-between transition-all ${
                        isSelected
                          ? "bg-[#FAF8F4] border-[#173D32] ring-1 ring-[#173D32]"
                          : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <IconComp
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? "text-[#173D32]" : "text-[#C6A66B]"
                          }`}
                        />
                        <div className="truncate">
                          <span className="font-sans text-xs font-semibold text-[#173D32] block truncate">
                            {opt.label}
                          </span>
                          <span className="font-sans text-[10px] text-[#77766F] block truncate">
                            {opt.sub}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-bold uppercase tracking-widest shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>
                {loading
                  ? "Creating Account..."
                  : isDownloadGate
                  ? "Register & Download Card"
                  : "Create Account & Continue"}
              </span>
              <ArrowRight className="w-4 h-4 text-[#C6A66B]" />
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#E8E2D8]" />
            <span className="flex-shrink mx-3 font-sans text-[11px] uppercase tracking-wider text-[#77766F]">
              Or sign up with
            </span>
            <div className="flex-grow border-t border-[#E8E2D8]" />
          </div>

          <button
            onClick={handleGoogle}
            type="button"
            disabled={loading}
            className="w-full py-2.5 rounded-lg border border-[#E8E2D8] bg-white hover:bg-[#FAF8F4] text-xs font-semibold text-[#173D32] flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign Up with Google</span>
          </button>

          <div className="pt-2 border-t border-[#FAF8F4] text-center text-xs text-[#77766F]">
            Already have an account?{" "}
            <Link
              href={loginHref}
              className="font-bold text-[#173D32] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center font-serif text-[#173D32]">
          Loading Registration...
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
