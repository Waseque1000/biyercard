"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Menu, X, ArrowRight, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FAF8F4]/90 backdrop-blur-xl border-b border-[#E8E2D8] transition-all">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Hallmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow-sm group-hover:scale-105 transition-transform">
            <span className="font-serif italic font-bold text-xl">W</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl text-[#173D32] font-semibold leading-none tracking-tight">
              Wedly AI
            </span>
            <span className="font-sans text-[10px] uppercase text-[#C6A66B] tracking-[0.2em] font-bold mt-1">
              Artisanal Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-[#173D32] hover:text-[#285C49] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#173D32] hover:text-[#285C49] transition-colors"
          >
            <span>Templates</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C6A66B]/20 text-[#8B6B2B] border border-[#C6A66B]/30">
              108+
            </span>
          </Link>
          <Link
            href="/#featured-collection"
            className="text-sm font-medium text-[#77766F] hover:text-[#173D32] transition-colors"
          >
            Explore Designs
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-[#77766F] hover:text-[#173D32] transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#popular-styles"
            className="text-sm font-medium text-[#77766F] hover:text-[#173D32] transition-colors"
          >
            Styles
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium text-[#77766F] hover:text-[#173D32] transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Right CTA / Auth Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-xs font-semibold uppercase tracking-wider text-[#173D32] hover:text-[#285C49] px-3 py-2 border border-[#E8E2D8] rounded bg-white hover:bg-[#F1E9DA] transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-[#77766F] hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-[#77766F] hover:text-[#173D32] transition-colors px-2 py-1"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-[#173D32] text-[#FAF8F4] text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded shadow-md hover:bg-[#285C49] transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Create Invitation</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#173D32] hover:bg-[#F1E9DA] rounded transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F4] border-b border-[#E8E2D8] px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#173D32]"
          >
            Home
          </Link>
          <Link
            href="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-semibold text-[#173D32]"
          >
            <span>Ready Templates (১০৮টি)</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6A66B]/20 text-[#8B6B2B]">
              108+
            </span>
          </Link>
          <Link
            href="/#featured-collection"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#77766F]"
          >
            Explore Designs
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#77766F]"
          >
            How It Works
          </Link>
          <Link
            href="#popular-styles"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#77766F]"
          >
            Styles
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#77766F]"
          >
            FAQ
          </Link>

          <div className="pt-3 border-t border-[#E8E2D8] flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[#173D32]"
                >
                  My Dashboard ({user.displayName || "User"})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm text-left text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#173D32]"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-[#173D32] text-[#FAF8F4] text-xs font-semibold uppercase tracking-wider py-3 rounded shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>Create Invitation</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
