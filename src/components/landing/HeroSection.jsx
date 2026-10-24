"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, CheckCircle } from "lucide-react";
import EmeraldRoyal from "@/components/invitation-templates/EmeraldRoyal";

const SAMPLE_HERO_DESIGN = {
  template: "emerald-royal",
  language: "en",
  culturalStyle: "classic",
  orientation: "portrait",
  palette: {
    name: "Emerald & Gold",
    background: "#FAF8F4",
    primary: "#173D32",
    secondary: "#285C49",
    accent: "#C6A66B",
    cardBg: "#FFFFFF",
    textPrimary: "#173D32",
    textMuted: "#6B756E",
    borderColor: "#E8E2D8",
  },
  typography: {
    headingFont: "Playfair Display",
    bodyFont: "DM Sans",
    bengaliFont: "Hind Siliguri",
    headingSize: "lg",
    textAlign: "center",
    letterSpacing: "wide",
  },
  decorations: {
    hasFloralCorners: true,
    hasGoldBorder: true,
    hasWaxSeal: true,
    hasInnerFrame: true,
    monogram: "E&A",
  },
  content: {
    title: "THE HONOUR OF YOUR PRESENCE",
    subtitle: "Together with their loving families",
    brideName: "Eleanor Vance",
    groomName: "Arthur Pendelton",
    weddingDate: "Saturday • June 21, 2027",
    weddingTime: "Five O'Clock in the Evening",
    venue: "Villa Balbiano",
    city: "Lake Como, Italy",
    message: "Invite you to celebrate their union amidst the waters and olive terraces.",
    rsvpDetails: "Reception to follow under the stars • RSVP Online",
    bilingualBrideName: "",
    bilingualGroomName: "",
    bilingualMessage: "",
  },
};

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden px-6 lg:px-12 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Editorial Column */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 lg:space-y-8 z-10">
          {/* Atelier Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F1E9DA] px-3.5 py-1.5 rounded-full shadow-sm border border-[#E8E2D8]">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.14em]">
              AI-Powered Wedding Design
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#173D32] tracking-tight leading-[1.12]">
            Your Love Story, <br />
            <span className="italic font-normal text-[#285C49]">Beautifully Invited.</span>
          </h1>

          {/* Supporting Editorial Copy */}
          <p className="font-sans text-base sm:text-lg text-[#77766F] max-w-xl leading-relaxed">
            Create breathtaking wedding invitations in minutes with the nuanced artistry of Gemini AI.
            Tailored faithfully to your love story, cherished cultural traditions, and signature aesthetic.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <Link
              href="/create"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#173D32] text-[#FAF8F4] font-sans text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded shadow-md hover:bg-[#285C49] transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Build Any Card With AI</span>
              <ArrowRight className="w-4 h-4 text-[#C6A66B] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#featured-collection"
              className="inline-flex items-center justify-center bg-white text-[#173D32] font-sans text-xs uppercase tracking-wider font-semibold px-7 py-4 rounded shadow-sm border border-[#E8E2D8] hover:bg-[#F1E9DA] transition-all hover:-translate-y-0.5"
            >
              Explore Designs
            </Link>
          </div>

          {/* Quick Purpose Selector Pills */}
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#9A7C43]">
              Choose Purpose:
            </span>
            {[
              { id: "wedding", label: "💍 Wedding", href: "/create?purpose=wedding" },
              { id: "birthday", label: "🎂 Birthday", href: "/create?purpose=birthday" },
              { id: "invitation", label: "✉️ Invitation", href: "/create?purpose=invitation" },
              { id: "corporate", label: "🏢 Corporate", href: "/create?purpose=corporate" },
              { id: "other", label: "✨ Custom", href: "/create?purpose=other" },
            ].map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="px-3 py-1 rounded-full bg-white border border-[#E8E2D8] hover:border-[#C6A66B] hover:bg-[#F1E9DA] text-xs font-medium text-[#252923] shadow-2xs transition-all hover:-translate-y-0.5"
              >
                {p.label}
              </Link>
            ))}
          </div>

          {/* Trust & Social Proof Micro-Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-[#77766F]">
            <div className="flex items-center gap-1.5">
              <div className="flex text-[#C6A66B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C6A66B]" />
                ))}
              </div>
              <span className="font-sans text-xs font-bold text-[#252923] ml-1">4.9 / 5</span>
            </div>

            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#E8E2D8]" />
            <span className="font-sans text-xs">Wedding, Birthday & Gala cards</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#E8E2D8]" />
            <span className="font-sans text-xs">300 DPI high-res export</span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#E8E2D8]" />
            <span className="font-sans text-xs">Bangla & English native script</span>
          </div>
        </div>

        {/* Right Physical Stationery Stage */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#C6A66B]/15 blur-3xl -z-10 pointer-events-none" />

          {/* 3D Elevated Physical Card Showcase */}
          <div className="relative w-full max-w-[370px] sm:max-w-[390px] transition-transform duration-500 ease-out hover:scale-[1.02]">
            <div
              className="w-full rounded-sm p-2 sm:p-3 bg-[#FAF8F4]"
              style={{
                boxShadow:
                  "0 25px 60px -15px rgba(23, 61, 50, 0.22), 0 10px 25px -5px rgba(37, 41, 35, 0.12)",
              }}
            >
              <div className="w-full h-[510px]">
                <EmeraldRoyal design={SAMPLE_HERO_DESIGN} />
              </div>
            </div>

            {/* Floating Live Generation Badge */}
            <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded border border-[#E8E2D8] shadow-xl flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#285C49] animate-pulse" />
              <div>
                <div className="font-sans text-[10px] uppercase font-bold text-[#77766F] tracking-widest">
                  Live Generation Proof
                </div>
                <div className="font-sans text-xs text-[#173D32] font-semibold">
                  Gemini 2.5 Pro • 300 DPI Vector
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
