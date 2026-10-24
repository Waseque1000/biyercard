"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F4] border-t border-[#E8E2D8] px-6 lg:px-12 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand identity column */}
        <div className="md:col-span-1 space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow-sm">
              <span className="font-serif italic font-bold text-lg">W</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl text-[#173D32] font-semibold leading-none">
                Wedly AI
              </span>
              <span className="font-sans text-[9px] uppercase text-[#C6A66B] tracking-[0.2em] font-bold mt-1">
                Artisanal Atelier
              </span>
            </div>
          </Link>
          <p className="font-sans text-xs text-[#77766F] leading-relaxed">
            Your love story, beautifully invited. AI-powered bespoke wedding stationery powered by Google Gemini.
          </p>
        </div>

        {/* Column 2: Product */}
        <div className="space-y-3">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#173D32]">
            Product
          </h4>
          <ul className="space-y-2 font-sans text-xs text-[#77766F]">
            <li>
              <Link href="/create" className="hover:text-[#173D32] transition-colors">
                AI Invitation Generator
              </Link>
            </li>
            <li>
              <Link href="#featured-collection" className="hover:text-[#173D32] transition-colors">
                Templates & Styles
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-[#173D32] transition-colors">
                User Dashboard
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="hover:text-[#173D32] transition-colors">
                How It Works
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Traditions */}
        <div className="space-y-3">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#173D32]">
            Cultural Styles
          </h4>
          <ul className="space-y-2 font-sans text-xs text-[#77766F]">
            <li>
              <Link href="/create?cultural=bangladeshi" className="hover:text-[#173D32] transition-colors">
                Bangladeshi Weddings (বাংলা)
              </Link>
            </li>
            <li>
              <Link href="/create?cultural=islamic" className="hover:text-[#173D32] transition-colors">
                Nikah & Walima Suites
              </Link>
            </li>
            <li>
              <Link href="/create?style=luxury" className="hover:text-[#173D32] transition-colors">
                Emerald & Gold Royalty
              </Link>
            </li>
            <li>
              <Link href="/create?style=minimalist" className="hover:text-[#173D32] transition-colors">
                Modern Editorial Minimal
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal & Security */}
        <div className="space-y-3">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#173D32]">
            Security & Privacy
          </h4>
          <ul className="space-y-2 font-sans text-xs text-[#77766F]">
            <li>
              <span>Firebase Auth & Supabase RLS</span>
            </li>
            <li>
              <span>Server-Side Token Verification</span>
            </li>
            <li>
              <span>300 DPI Vector PDF Export</span>
            </li>
            <li>
              <span>Gemini Structured Output</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77766F] gap-4">
        <div>
          © 2027 Wedly AI. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#C6A66B] fill-[#C6A66B]" />
          <span>for love stories worldwide</span>
        </div>
      </div>
    </footer>
  );
}
