"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, enableDemoUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back to Wedly AI!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Signed in with Google!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Google sign in error:", err);
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    enableDemoUser();
    toast.success("Signed in with Demo Wedding Account!");
    router.push("/dashboard");
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
          Welcome to Your Atelier
        </h2>
        <p className="font-sans text-xs text-[#77766F]">
          Sign in to view, edit, and export your bespoke wedding suites.
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
              <div className="flex items-center justify-between">
                <label className="font-sans text-xs font-semibold text-[#173D32]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-sans text-[#9A7C43] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77766F] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#C6A66B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-bold uppercase tracking-widest shadow transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In to Studio"}
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#E8E2D8]" />
            <span className="flex-shrink mx-3 font-sans text-[11px] uppercase tracking-wider text-[#77766F]">
              Or continue with
            </span>
            <div className="flex-grow border-t border-[#E8E2D8]" />
          </div>

          <div className="space-y-2">
            <button
              onClick={handleGoogle}
              type="button"
              className="w-full py-2.5 rounded border border-[#E8E2D8] bg-white hover:bg-[#FAF8F4] text-xs font-semibold text-[#173D32] flex items-center justify-center gap-2 transition-colors"
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
              <span>Continue with Google</span>
            </button>

            {/* Quick Demo Access Button */}
            <button
              onClick={handleDemo}
              type="button"
              className="w-full py-2.5 rounded border border-[#C6A66B]/50 bg-[#F1E9DA] hover:bg-[#eae0cd] text-xs font-semibold text-[#173D32] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>Instant Demo Account (One-Click)</span>
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-[#77766F]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#173D32] hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
