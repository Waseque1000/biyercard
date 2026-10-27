"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, Palette, Eye, Check } from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";

const HERO_SHOWCASE_CARDS = [
  {
    id: "emerald-royal",
    label: "Imperial Emerald",
    banglaLabel: "রাজকীয় পান্না",
    swatch: "#09261C",
    accent: "#E0BE68",
    styleKey: "luxury",
    design: {
      template: "emerald-royal",
      language: "en",
      culturalStyle: "classic",
      orientation: "portrait",
      palette: {
        name: "Imperial Emerald & Gold",
        background: "#082218",
        primary: "#F5EEDB",
        secondary: "#34D399",
        accent: "#E0BE68",
        cardBg: "#09261C",
        textPrimary: "#FFFDF8",
        textMuted: "#CBD8CE",
        borderColor: "#C6A66B",
      },
      decorations: {
        hasFloralCorners: true,
        hasGoldBorder: true,
        hasWaxSeal: true,
        hasInnerFrame: true,
        monogram: "A&R",
      },
      content: {
        title: "THE HONOUR OF YOUR PRESENCE",
        subtitle: "Together with their loving families",
        brideName: "Ayesha Rahman",
        groomName: "Rafid Chowdhury",
        weddingDate: "Friday • Nov 26, 2027",
        weddingTime: "7:00 PM",
        venue: "The Palace Grand Ballroom",
        city: "Gulshan-2, Dhaka",
        message: "Invite you to celebrate their sacred union with prayers, joy, and royal festivities.",
        rsvpDetails: "Dinner & Celebration to follow • RSVP Online",
      },
    },
  },
  {
    id: "mogul-heritage",
    label: "Mughal Shahi Ruby",
    banglaLabel: "মুঘল শাহী মেরুন",
    swatch: "#420B13",
    accent: "#E5C158",
    styleKey: "mogul",
    design: {
      template: "mogul-heritage",
      language: "bn",
      culturalStyle: "islamic",
      orientation: "portrait",
      palette: {
        name: "Mughal Ruby Velvet & Gold",
        background: "#3A070E",
        primary: "#FDE68A",
        secondary: "#F59E0B",
        accent: "#E5C158",
        cardBg: "#420B13",
        textPrimary: "#FFFDF5",
        textMuted: "#E2D3BE",
        borderColor: "#D4AF37",
      },
      decorations: {
        hasFloralCorners: true,
        hasGoldBorder: true,
        hasWaxSeal: true,
        hasInnerFrame: true,
        monogram: "আ&রা",
      },
      content: {
        title: "মাঙ্গলিক শুভ পরিণয়",
        subtitle: "পরিবারের সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব",
        brideName: "আয়েশা রহমান",
        groomName: "রাফিদ চৌধুরী",
        weddingDate: "শুক্রবার • ২৬ নভেম্বর ২০২৭",
        weddingTime: "সন্ধ্যা ৭:০০ ঘটিকা",
        venue: "দ্য প্যালেস গ্র্যান্ড বলরুম",
        city: "গুলশান-২, ঢাকা",
        message: "পরম করুণাময়ের অশেষ কৃপায় আমাদের শুভ পরিণয় উপলক্ষে আপনার আন্তরিক উপস্থিতি ও দোয়া প্রার্থনা করছি।",
        rsvpDetails: "বিনীত: রহমান ও চৌধুরী পরিবার",
      },
    },
  },
  {
    id: "celestial-sapphire",
    label: "Midnight Sapphire",
    banglaLabel: "নীল নক্ষত্র",
    swatch: "#0A1526",
    accent: "#E5C072",
    styleKey: "celestial",
    design: {
      template: "celestial-sapphire",
      language: "en",
      culturalStyle: "classic",
      orientation: "portrait",
      palette: {
        name: "Midnight Sapphire & Starlight",
        background: "#060E1C",
        primary: "#F8EBD4",
        secondary: "#38BDF8",
        accent: "#E5C072",
        cardBg: "#0A1526",
        textPrimary: "#FFFFFF",
        textMuted: "#B0C4DE",
        borderColor: "#264B78",
      },
      decorations: {
        hasGoldBorder: true,
        hasWaxSeal: true,
        monogram: "Z&A",
      },
      content: {
        title: "UNDER THE CANOPY OF STARS",
        subtitle: "Together with our esteemed families",
        brideName: "Zoya Rahman",
        groomName: "Aryan Khan",
        weddingDate: "Saturday • Oct 23, 2027",
        weddingTime: "6:30 PM",
        venue: "Radisson Blu Grand Ballroom",
        city: "Dhaka, Bangladesh",
        message: "Request the joy of your company under a canopy of stars as we exchange lifelong vows.",
        rsvpDetails: "Reception & Dinner to follow",
      },
    },
  },
  {
    id: "traditional-celebration",
    label: "Gaye Holud Gold",
    banglaLabel: "গায়ে হলুদ ও আলপনা",
    swatch: "#FFF8E7",
    accent: "#D97706",
    styleKey: "traditional",
    design: {
      template: "traditional-celebration",
      language: "bn",
      culturalStyle: "bengali",
      orientation: "portrait",
      palette: {
        name: "Gaye Holud Marigold & Saffron",
        background: "#FFF9E6",
        primary: "#7C2D12",
        secondary: "#D97706",
        accent: "#D97706",
        cardBg: "#FFF9E6",
        textPrimary: "#6B210B",
        textMuted: "#9A4A1A",
        borderColor: "#E5A93C",
      },
      decorations: {
        hasKolkaBorder: true,
        hasWaxSeal: true,
        monogram: "অ&ত",
      },
      content: {
        title: "গায়ে হলুদ ও মেহেন্দি সন্ধ্যা",
        subtitle: "রঙিন আলপনা ও উৎসবের আমন্ত্রণ",
        brideName: "অনন্যা রায়",
        groomName: "তন্ময় সেনগুপ্ত",
        weddingDate: "বৃহস্পতিবার • ১১ ডিসেম্বর ২০২৭",
        weddingTime: "সন্ধ্যা ৬:৩০ মিনিট",
        venue: "সেনাকুঞ্জ গ্র্যান্ড প্যাভিলিয়ন",
        city: "ঢাকা সেনানিবাস",
        message: "হলুদের ছোঁয়ায় ও গানের সুরে আমাদের আনন্দঘন গায়ে হলুদ সন্ধ্যায় আপনার সপরিবারে উপস্থিতি কাম্য।",
        rsvpDetails: "আমন্ত্রণে: রায় ও সেনগুপ্ত পরিবার",
      },
    },
  },
  {
    id: "ivory-floral",
    label: "Botanical Arch",
    banglaLabel: "আইভরি ফ্লোরাল",
    swatch: "#FAF8F4",
    accent: "#B89B5E",
    styleKey: "floral",
    design: {
      template: "ivory-floral",
      language: "en",
      culturalStyle: "botanical",
      orientation: "portrait",
      palette: {
        name: "Ivory Linen & Sage Botanical",
        background: "#FAF8F4",
        primary: "#1C3825",
        secondary: "#3E6B4B",
        accent: "#B89B5E",
        cardBg: "#FAF8F4",
        textPrimary: "#152F1E",
        textMuted: "#5A6E5F",
        borderColor: "#D2DDD4",
      },
      decorations: {
        hasBotanicalBranch: true,
        hasWaxSeal: true,
        monogram: "S&F",
      },
      content: {
        title: "TWO SOULS, ONE BEAUTIFUL JOURNEY",
        subtitle: "In the warm presence of our loved ones",
        brideName: "Samira Haque",
        groomName: "Farhan Hossain",
        weddingDate: "Sunday • Jan 23, 2028",
        weddingTime: "4:30 PM",
        venue: "Rosewood Botanical Lawn",
        city: "Dhaka, Bangladesh",
        message: "We cordially invite you to share our joy under sunlit olive groves as we begin our forever.",
        rsvpDetails: "Sunset Soirée & Dinner to follow",
      },
    },
  },
];

export default function HeroSection() {
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const activeCard = HERO_SHOWCASE_CARDS[selectedCardIdx] || HERO_SHOWCASE_CARDS[0];

  return (
    <section className="relative w-full overflow-hidden px-6 lg:px-12 py-10 lg:py-16">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-[#C6A66B]/12 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[440px] h-[440px] bg-[#173D32]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Editorial Column */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 z-10">
          {/* Atelier Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#173D32]/10 via-[#F1E9DA] to-[#C6A66B]/20 px-4 py-1.5 rounded-full shadow-2xs border border-[#C6A66B]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="font-sans text-[11px] font-bold uppercase text-[#173D32] tracking-[0.14em]">
              AI-Powered Luxury Card Atelier • ১০৮+ রেডি ডিজাইন
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#173D32] tracking-tight leading-[1.12]">
            Your Love Story, <br />
            <span className="italic font-normal text-[#285C49]">Beautifully Invited.</span>
          </h1>

          {/* Supporting Editorial Copy */}
          <p className="font-sans text-base sm:text-lg text-[#5E645E] max-w-xl leading-relaxed">
            Pick an eye-catching royal card in seconds or craft your own with Gemini AI.
            Designed with authentic Mughal arches, Bengali Alpona, 24K gold filigree, and botanical artistry.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-1">
            <Link
              href="/templates"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#173D32] text-[#FAF8F4] font-sans text-xs uppercase tracking-wider font-semibold px-7 py-4 rounded-xl shadow-lg hover:bg-[#285C49] transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 text-[#C6A66B]" />
              <span>Choose From 108+ Cards</span>
              <ArrowRight className="w-4 h-4 text-[#C6A66B] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/create?style=${activeCard.styleKey}&template=${activeCard.id}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#173D32] font-sans text-xs uppercase tracking-wider font-semibold px-6 py-4 rounded-xl shadow-xs border border-[#C6A66B]/50 hover:bg-[#F1E9DA] transition-all hover:-translate-y-0.5"
            >
              <span>Customize Selected Card</span>
            </Link>
          </div>

          {/* Quick Purpose Selector Pills */}
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#9A7C43]">
              Quick Occasion:
            </span>
            {[
              { id: "wedding", label: "💍 Wedding / বিবাহ", href: "/templates?cat=wedding" },
              { id: "holud", label: "🌼 Gaye Holud", href: "/templates?cat=holud" },
              { id: "boubhat", label: "✨ Walima / বৌভাত", href: "/templates?cat=boubhat" },
              { id: "birthday", label: "🎂 Birthday", href: "/templates?cat=birthday" },
              { id: "corporate", label: "🏢 Gala", href: "/templates?cat=corporate" },
            ].map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="px-3 py-1.5 rounded-full bg-white border border-[#E8E2D8] hover:border-[#C6A66B] hover:bg-[#F1E9DA] text-xs font-medium text-[#252923] shadow-2xs transition-all hover:-translate-y-0.5"
              >
                {p.label}
              </Link>
            ))}
          </div>

          {/* Trust & Social Proof Micro-Bar */}
          <div className="pt-1 flex flex-wrap items-center gap-4 sm:gap-5 text-[#77766F]">
            <div className="flex items-center gap-1.5">
              <div className="flex text-[#C6A66B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C6A66B]" />
                ))}
              </div>
              <span className="font-sans text-xs font-bold text-[#252923] ml-1">4.9 / 5</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-[#C6A66B]" />
            <span className="font-sans text-xs font-medium text-[#173D32]">1-Click Card Chooser</span>
            <span className="w-1 h-1 rounded-full bg-[#C6A66B]" />
            <span className="font-sans text-xs">300 DPI Print & PDF</span>
            <span className="w-1 h-1 rounded-full bg-[#C6A66B]" />
            <span className="font-sans text-xs">বাংলা ও English Script</span>
          </div>
        </div>

        {/* Right Interactive Physical Stationery Stage */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          {/* Dynamic Ambient Aura Matching Selected Card */}
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none transition-colors duration-500 opacity-35"
            style={{ backgroundColor: activeCard.accent }}
          />

          {/* Interactive Card Frame Plinth */}
          <div className="relative flex flex-col items-center">
            <div
              className="relative rounded-2xl p-3 sm:p-4 border border-[#C6A66B]/40 transition-all duration-500"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(241,233,218,0.9) 100%)",
                boxShadow:
                  "0 30px 70px -15px rgba(23, 61, 50, 0.28), 0 12px 30px -8px rgba(37, 41, 35, 0.14)",
              }}
            >
              {/* Top Mini Bar Inside Plinth */}
              <div className="flex items-center justify-between px-1 pb-2.5 mb-1 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: activeCard.swatch }}
                  />
                  <span className="text-xs font-serif font-semibold text-[#173D32]">
                    {activeCard.label}
                  </span>
                  <span className="text-[11px] text-[#9A7C43] font-medium">
                    ({activeCard.banglaLabel})
                  </span>
                </div>
                <Link
                  href={`/create?style=${activeCard.styleKey}&template=${activeCard.id}`}
                  className="text-[11px] font-bold text-[#173D32] hover:text-[#9A7C43] flex items-center gap-1 bg-[#F1E9DA] px-2.5 py-1 rounded-full border border-[#C6A66B]/40 transition-colors"
                >
                  <span>Use This Card</span>
                  <ArrowRight className="w-3 h-3 text-[#C6A66B]" />
                </Link>
              </div>

              {/* Card Renderer */}
              <div className="overflow-hidden rounded-[4px]">
                <InvitationRenderer design={activeCard.design} showShadow={false} />
              </div>
            </div>

            {/* Interactive Live Theme Switcher Bar Below Hero Card */}
            <div className="mt-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-[#E8E2D8] shadow-lg flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-bold text-[#173D32] flex items-center gap-1 mr-1">
                <Palette className="w-3.5 h-3.5 text-[#C6A66B]" />
                <span>Try Card Styles:</span>
              </span>
              {HERO_SHOWCASE_CARDS.map((item, idx) => {
                const isSelected = idx === selectedCardIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCardIdx(idx)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#173D32] text-white shadow-xs ring-2 ring-[#C6A66B] scale-105"
                        : "bg-[#FAF8F4] text-[#555E57] hover:bg-[#F1E9DA] border border-[#E8E2D8]"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/40 shrink-0"
                      style={{ backgroundColor: item.swatch }}
                    />
                    <span className="whitespace-nowrap">{item.label.split(" ")[1] || item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
