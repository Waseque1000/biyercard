"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, ArrowRight, X, Sparkles } from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";

const SUITES = [
  {
    id: "emerald-royal",
    title: "Emerald Royal",
    badge: "Cotton 450gsm",
    desc: "Deep botanical hues with hot-stamped gold flourish and royal monogram.",
    styleKey: "luxury",
    palette: ["#173D32", "#C6A66B", "#FAF8F4"],
    design: {
      template: "emerald-royal",
      language: "en",
      culturalStyle: "classic",
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
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasFloralCorners: true, hasGoldBorder: true, hasWaxSeal: true, hasInnerFrame: true, monogram: "A&R" },
      content: {
        title: "THE HONOUR OF YOUR PRESENCE",
        subtitle: "Together with our families",
        brideName: "Ayesha Rahman",
        groomName: "Rafid Chowdhury",
        weddingDate: "Friday, November 26, 2027",
        weddingTime: "6:00 PM",
        venue: "The Palace Grand Ballroom",
        city: "Dhaka, Bangladesh",
        message: "Request the pleasure of your company to celebrate our holy union.",
        rsvpDetails: "RSVP to family by November 1st",
      },
    },
  },
  {
    id: "ivory-floral",
    title: "Ivory Floral",
    badge: "Deckle Edge",
    desc: "Hand-drawn watercolor foliage with deckled paper and delicate botanical romance.",
    styleKey: "floral",
    palette: ["#2C402E", "#556B58", "#FAF8F4"],
    design: {
      template: "ivory-floral",
      language: "en",
      culturalStyle: "botanical",
      palette: {
        name: "Ivory & Sage",
        background: "#FAF8F4",
        primary: "#2C402E",
        secondary: "#556B58",
        accent: "#B8A375",
        cardBg: "#FAF8F4",
        textPrimary: "#243326",
        textMuted: "#6D7B70",
        borderColor: "#E2E5E0",
      },
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasFloralCorners: false, hasBotanicalBranch: true, hasWaxSeal: true, monogram: "C&L" },
      content: {
        title: "WE INVITE YOU TO CELEBRATE",
        subtitle: "In loving presence",
        brideName: "Charlotte Miller",
        groomName: "Lucas Bennett",
        weddingDate: "Saturday, September 18, 2027",
        weddingTime: "4:30 PM",
        venue: "Rosewood Botanical Gardens",
        city: "Napa Valley, CA",
        message: "Join us under the olive groves as we exchange lifelong vows.",
        rsvpDetails: "Reception & Dancing to follow",
      },
    },
  },
  {
    id: "modern-minimal",
    title: "Modern Minimal",
    badge: "Smooth Alabaster",
    desc: "Sculptural blind debossing and pure editorial asymmetric spacing.",
    styleKey: "minimalist",
    palette: ["#1B1C1A", "#C6A66B", "#FFFFFF"],
    design: {
      template: "modern-minimal",
      language: "en",
      culturalStyle: "minimal",
      palette: {
        name: "Monochrome Editorial",
        background: "#FAF8F4",
        primary: "#1B1C1A",
        secondary: "#3A3D39",
        accent: "#C6A66B",
        cardBg: "#FFFFFF",
        textPrimary: "#1B1C1A",
        textMuted: "#77766F",
        borderColor: "#E8E2D8",
      },
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasFloralCorners: false, hasWaxSeal: false },
      content: {
        title: "WEDDING INVITATION",
        subtitle: "A modern ceremony",
        brideName: "Sienna",
        groomName: "Oliver",
        weddingDate: "15 • 05 • 2027",
        weddingTime: "Seven O'Clock",
        venue: "The Modern Art Pavilion",
        city: "New York City",
        message: "Invite you to witness and celebrate their marriage.",
        rsvpDetails: "Cocktails & Dinner to follow",
      },
    },
  },
  {
    id: "traditional-celebration",
    title: "Traditional Vow",
    badge: "Gold Foil Board",
    desc: "Rich cultural motifs with multi-layered gilding, paisley art, and Bangla typography.",
    styleKey: "traditional",
    palette: ["#5A1827", "#D4AF37", "#FAF7F5"],
    design: {
      template: "traditional-celebration",
      language: "bilingual",
      culturalStyle: "bangladeshi",
      palette: {
        name: "Burgundy & Champagne",
        background: "#FAF7F5",
        primary: "#5A1827",
        secondary: "#83283B",
        accent: "#D4AF37",
        cardBg: "#FAF7F5",
        textPrimary: "#42121C",
        textMuted: "#7A6367",
        borderColor: "#EADFD9",
      },
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasTraditionalMotif: true, hasGoldBorder: true, hasInnerFrame: true },
      content: {
        title: "মাঙ্গলিক শুভ পরিণয়",
        subtitle: "পারিবারিক সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব",
        brideName: "তানজিলা হক",
        groomName: "ফারহান আহমেদ",
        weddingDate: "শুক্রবার • ১২ই ডিসেম্বর ২০২৭",
        weddingTime: "সন্ধ্যা ৭:৩০ মিনিট",
        venue: "গ্র্যান্ড বলরুম, প্যান প্যাসিফিক সোনারগাঁও",
        city: "ঢাকা, বাংলাদেশ",
        message: "আমাদের জীবনের এই আনন্দঘন শুভলগ্নে আপনাদের সপরিবারে আমন্ত্রণ জানাচ্ছি।",
        bilingualBrideName: "Tanjila",
        bilingualGroomName: "Farhan",
        bilingualMessage: "Request the pleasure of your company at our wedding feast.",
        rsvpDetails: "শুভেচ্ছান্তে: উভয় পরিবার",
      },
    },
  },
  {
    id: "romantic-blush",
    title: "Romantic Blush",
    badge: "Vellum & Rag",
    desc: "Tender rose undertones accompanied by vellum sash layering and gold foil script.",
    styleKey: "blush",
    palette: ["#6B3B48", "#C6A66B", "#FCF8F7"],
    design: {
      template: "romantic-blush",
      language: "en",
      culturalStyle: "romantic",
      palette: {
        name: "Blush & Cream",
        background: "#FCF8F7",
        primary: "#6B3B48",
        secondary: "#9C6272",
        accent: "#C6A66B",
        cardBg: "#FCF8F7",
        textPrimary: "#4A2731",
        textMuted: "#876F76",
        borderColor: "#EEDEE0",
      },
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasFloralCorners: true, hasWaxSeal: true, monogram: "E&M" },
      content: {
        title: "TOGETHER WITH THEIR FAMILIES",
        subtitle: "A story of eternal love",
        brideName: "Emma Rose",
        groomName: "Matthew Noah",
        weddingDate: "Sunday, August 22, 2027",
        weddingTime: "5:00 PM",
        venue: "Whispering Pines Estate",
        city: "Savannah, Georgia",
        message: "Invite you to share in their joy as they become husband and wife.",
        rsvpDetails: "RSVP by July 15th",
      },
    },
  },
  {
    id: "mogul-heritage",
    title: "Mogul Heritage",
    badge: "Mughal Arch Foil",
    desc: "Authentic cusped Mughal arches, imperial ruby foil, and intricate jaali lattice fretwork.",
    styleKey: "traditional",
    palette: ["#4A0E17", "#D4AF37", "#FCFAF7"],
    design: {
      template: "mogul-heritage",
      language: "bn",
      culturalStyle: "bangladeshi",
      palette: {
        name: "Mogul Ruby & Gold",
        background: "#FAF7F5",
        primary: "#4A0E17",
        secondary: "#7A1C2A",
        accent: "#D4AF37",
        cardBg: "#FCFAF7",
        textPrimary: "#4A0E17",
        textMuted: "#6D585B",
        borderColor: "#E8E2D8",
      },
      decorations: { hasFloralCorners: true, hasGoldBorder: true, hasWaxSeal: true, monogram: "ন&ফ" },
      content: {
        title: "মাঙ্গলিক শুভ পরিণয়",
        subtitle: "পরিবারের সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব",
        brideName: "নুসরাত জাহান",
        groomName: "ফারহান আহমেদ",
        weddingDate: "শুক্রবার • ১২ই ডিসেম্বর ২০২৭",
        weddingTime: "সন্ধ্যা ৭:৩০ মিনিট",
        venue: "গ্র্যান্ড বলরুম, প্যান প্যাসিফিক সোনারগাঁও",
        city: "ঢাকা, বাংলাদেশ",
        message: "আমাদের এই আনন্দঘন শুভলগ্নে আপনাদের সানন্দ উপস্থিতি ও প্রাণঢালা আশীর্বাদ একান্তভাবে কামনা করছি।",
        bilingualBrideName: "Nusrat",
        bilingualGroomName: "Farhan",
        rsvpDetails: "যোগাযোগ: ০১৭১২-৩৪৫৬৭৮",
      },
    },
  },
  {
    id: "celestial-sapphire",
    title: "Celestial Sapphire",
    badge: "Midnight 450gsm",
    desc: "Midnight navy blue night-sky with golden constellation dust, starlight cluster, and celestial poise.",
    styleKey: "modern",
    palette: ["#0C1829", "#D4AF37", "#F5E6CA"],
    design: {
      template: "celestial-sapphire",
      language: "en",
      culturalStyle: "classic",
      palette: {
        name: "Midnight & Starlight",
        background: "#080F1A",
        primary: "#F5E6CA",
        secondary: "#9BB0C7",
        accent: "#D4AF37",
        cardBg: "#0C1829",
        textPrimary: "#F5E6CA",
        textMuted: "#9BB0C7",
        borderColor: "#203047",
      },
      decorations: { hasFloralCorners: false, hasWaxSeal: true, monogram: "Z&A" },
      content: {
        title: "UNDER THE STARS • CELEBRATION",
        subtitle: "Together with their loving families",
        brideName: "Zoya Rahman",
        groomName: "Aryan Khan",
        weddingDate: "Saturday • October 23, 2027",
        weddingTime: "6:30 PM",
        venue: "The Starlight Observatory Pavilion",
        city: "Dhaka, Bangladesh",
        message: "Request the joy of your presence under a canopy of stars as we celebrate love and friendship.",
        rsvpDetails: "Cocktails & Dinner to follow",
      },
    },
  },
  {
    id: "vintage-botanical",
    title: "Vintage Botanical",
    badge: "Deckled Linen",
    desc: "Warm deckled linen paper with engraved olive medallion, dashed gold borders, and old-money poise.",
    styleKey: "floral",
    palette: ["#304033", "#B89B60", "#FAF7F2"],
    design: {
      template: "vintage-botanical",
      language: "en",
      culturalStyle: "botanical",
      palette: {
        name: "Vintage Olive & Gold",
        background: "#F5F2EC",
        primary: "#304033",
        secondary: "#5E705F",
        accent: "#B89B60",
        cardBg: "#FAF7F2",
        textPrimary: "#304033",
        textMuted: "#6B7A6C",
        borderColor: "#E5DEC9",
      },
      decorations: { hasFloralCorners: false, hasWaxSeal: true, monogram: "G&A" },
      content: {
        title: "TOGETHER WITH THEIR FAMILIES",
        subtitle: "A lifetime of quiet elegance",
        brideName: "Genevieve Claire",
        groomName: "Alexander Rhodes",
        weddingDate: "Saturday • September 11, 2027",
        weddingTime: "5:00 PM",
        venue: "The Heritage Olive Grove Estate",
        city: "Sonoma Valley, CA",
        message: "Warmly invite you to join us in an intimate gathering of love, laughter, and lifelong devotion.",
        rsvpDetails: "RSVP by August 1st",
      },
    },
  },
  {
    id: "golden-glamour",
    title: "Golden Glamour",
    badge: "Art Deco 24K",
    desc: "Opulent 1920s Art Deco fan chevrons, obsidian black, and champagne gold foil luxury.",
    styleKey: "glamour",
    palette: ["#1C1D1F", "#C89D46", "#FFFFFF"],
    design: {
      template: "golden-glamour",
      language: "en",
      culturalStyle: "classic",
      palette: {
        name: "Art Deco Gold",
        background: "#FAF8F4",
        primary: "#1C1D1F",
        secondary: "#707379",
        accent: "#C89D46",
        cardBg: "#FFFFFF",
        textPrimary: "#1C1D1F",
        textMuted: "#707379",
        borderColor: "#E8E2D8",
      },
      decorations: { hasFloralCorners: false, hasWaxSeal: true, monogram: "V&D" },
      content: {
        title: "CORDIALLY REQUESTS THE PLEASURE",
        subtitle: "Black-tie evening celebration",
        brideName: "Vivienne Vance",
        groomName: "Dominic Sterling",
        weddingDate: "Saturday • November 20, 2027",
        weddingTime: "7:00 PM",
        venue: "The Grand Chrysler Ballroom",
        city: "New York City",
        message: "To join them for an extraordinary black-tie evening of cocktails, dining, and celebratory vows.",
        rsvpDetails: "Black Tie Required",
      },
    },
  },
];

export default function FeaturedSuites() {
  const [activePreview, setActivePreview] = useState(null);
  const [suiteFilter, setSuiteFilter] = useState("all");

  const filteredSuites = SUITES.filter((suite) => {
    if (suiteFilter === "all") return true;
    if (suiteFilter === "traditional") return suite.styleKey === "traditional" || suite.id === "emerald-royal" || suite.id === "mogul-heritage";
    if (suiteFilter === "modern") return suite.styleKey === "modern" || suite.styleKey === "minimalist" || suite.styleKey === "glamour";
    if (suiteFilter === "floral") return suite.styleKey === "floral" || suite.styleKey === "blush";
    return true;
  });

  return (
    <section className="w-full bg-[#F1E9DA]/50 px-6 lg:px-12 py-20" id="featured-collection">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.2em] block mb-2">
              Curated Atelier Specimens
            </span>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32]">
                Featured Invitation Suites
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#173D32]/10 text-[#173D32]">
                ৯টি স্পেশাল ডেমো ডিজাইন
              </span>
            </div>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#77766F] max-w-md">
            Explore artisanal suites calibrated across tactile paper weights, bespoke Bengali and English typography, and generative botanical linework.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All Suites (৯টি ডিজাইন)" },
            { id: "traditional", label: "Royal & Traditional (মুঘল ও রাজকীয়)" },
            { id: "modern", label: "Modern & Celestial (আধুনিক ও তারাভরা)" },
            { id: "floral", label: "Floral & Romantic (বোটানিক্যাল ও ভিন্টেজ)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSuiteFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                suiteFilter === cat.id
                  ? "bg-[#173D32] text-white shadow-sm"
                  : "bg-white text-[#77766F] hover:text-[#173D32] border border-[#E8E2D8]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 9 Showcase Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              className="group bg-white rounded-lg overflow-hidden border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Card Stage Preview */}
                <div className="relative h-64 overflow-hidden bg-[#FAF8F4] flex items-center justify-center p-3 border-b border-[#E8E2D8]">
                  <div className="transform scale-[0.45] pointer-events-none origin-center">
                    <InvitationRenderer design={suite.design} showShadow={false} />
                  </div>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[#252923] font-sans text-[10px] font-semibold uppercase tracking-wider border border-[#E8E2D8]">
                    {suite.badge}
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5">
                    {suite.palette.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#173D32]">
                    {suite.title}
                  </h3>

                  <p className="font-sans text-xs text-[#77766F] leading-relaxed line-clamp-2">
                    {suite.desc}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => setActivePreview(suite)}
                  className="w-full py-2 bg-[#FAF8F4] hover:bg-[#F1E9DA] text-[#173D32] font-sans text-xs font-semibold uppercase tracking-wider rounded border border-[#E8E2D8] transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Preview Suite</span>
                </button>

                <Link
                  href={`/create?style=${suite.styleKey}&template=${suite.id}`}
                  className="w-full py-2 bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1"
                >
                  <span>Select & Create</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 108+ Templates Catalog Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#173D32] via-[#20493C] to-[#173D32] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C6A66B]/30 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#C6A66B]/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A66B]/20 text-[#E5C88A] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>১০৮টি সম্পূর্ণ রেডিমেড ডিজাইন লাইব্রেরি</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
              Want more choices? Browse 108+ Pre-made Templates
            </h3>
            <p className="font-sans text-sm text-[#DFE7E2] max-w-xl mt-2 leading-relaxed">
              Explore authentic wedding, Gaye Holud, Boubhat, birthday, and anniversary suites in both বাংলা and English.
              Filter by occasion and style, preview in high-res, and customize with 1-click.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-3">
            <Link
              href="/templates"
              className="px-6 py-3.5 rounded-2xl bg-[#C6A66B] text-[#173D32] hover:bg-[#D4B77D] font-semibold text-sm shadow-md transition-all flex items-center gap-2 group"
            >
              <span>Explore All 108 Templates</span>
              <ArrowRight className="w-4 h-4 text-[#173D32] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Full Specimen Preview */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative bg-[#FAF8F4] rounded-lg max-w-lg w-full p-6 sm:p-8 flex flex-col items-center border border-[#E8E2D8] shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 p-2 text-[#77766F] hover:text-[#173D32] rounded-full hover:bg-[#E8E2D8]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#173D32] mb-1">
              {activePreview.title} Suite
            </h3>
            <p className="font-sans text-xs text-[#77766F] mb-6">
              Full 5×7 Inch High-Fidelity Atelier Rendering
            </p>

            <div className="transform scale-90 sm:scale-100 origin-center my-2">
              <InvitationRenderer design={activePreview.design} />
            </div>

            <div className="mt-8 flex items-center gap-4 w-full justify-center">
              <button
                onClick={() => setActivePreview(null)}
                className="px-5 py-2.5 rounded border border-[#E8E2D8] text-xs font-semibold uppercase tracking-wider text-[#77766F] hover:bg-[#F1E9DA]"
              >
                Close Preview
              </button>
              <Link
                href={`/create?style=${activePreview.styleKey}&template=${activePreview.id}`}
                className="px-6 py-2.5 rounded bg-[#173D32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#285C49] shadow"
              >
                Use This Design
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
