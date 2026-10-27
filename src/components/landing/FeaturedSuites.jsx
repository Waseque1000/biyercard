"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, ArrowRight, X, Sparkles, Palette, Check } from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import { toast } from "sonner";

const SUITE_COLOR_VARIANTS = {
  emeraldGold: {
    name: "Imperial Emerald",
    swatch: "#09261C",
    accent: "#E0BE68",
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
  },
  mughalRuby: {
    name: "Mughal Ruby",
    swatch: "#420B13",
    accent: "#E5C158",
    palette: {
      name: "Mughal Ruby & Gold",
      background: "#3A070E",
      primary: "#FDE68A",
      secondary: "#F59E0B",
      accent: "#E5C158",
      cardBg: "#420B13",
      textPrimary: "#FFFDF5",
      textMuted: "#E2D3BE",
      borderColor: "#D4AF37",
    },
  },
  midnightSapphire: {
    name: "Midnight Sapphire",
    swatch: "#0A1526",
    accent: "#E5C072",
    palette: {
      name: "Midnight & Starlight",
      background: "#060E1C",
      primary: "#F8EBD4",
      secondary: "#38BDF8",
      accent: "#E5C072",
      cardBg: "#0A1526",
      textPrimary: "#FFFFFF",
      textMuted: "#B0C4DE",
      borderColor: "#264B78",
    },
  },
  holudSaffron: {
    name: "Holud Saffron",
    swatch: "#FFF8E1",
    accent: "#D97706",
    palette: {
      name: "Gaye Holud Saffron",
      background: "#FFF9E6",
      primary: "#7C2D12",
      secondary: "#D97706",
      accent: "#D97706",
      cardBg: "#FFF9E6",
      textPrimary: "#6B210B",
      textMuted: "#9A4A1A",
      borderColor: "#E5A93C",
    },
  },
  ivoryBotanical: {
    name: "Ivory Sage",
    swatch: "#FAF8F4",
    accent: "#B89B5E",
    palette: {
      name: "Ivory & Sage",
      background: "#FAF8F4",
      primary: "#1C3825",
      secondary: "#3E6B4B",
      accent: "#B89B5E",
      cardBg: "#FAF8F4",
      textPrimary: "#152F1E",
      textMuted: "#5A6E5F",
      borderColor: "#D2DDD4",
    },
  },
  roseBlush: {
    name: "Rose Blush",
    swatch: "#FFF1F2",
    accent: "#BE185D",
    palette: {
      name: "Romantic Rose Blush",
      background: "#FFF1F2",
      primary: "#7A1230",
      secondary: "#BE185D",
      accent: "#D97706",
      cardBg: "#FFF1F2",
      textPrimary: "#6B0D28",
      textMuted: "#8E455B",
      borderColor: "#FECDD3",
    },
  },
  artDecoNoir: {
    name: "24K Gold Noir",
    swatch: "#0D0F14",
    accent: "#E5C158",
    palette: {
      name: "Art Deco Noir & Gold",
      background: "#0A0B0E",
      primary: "#FDE68A",
      secondary: "#E5C158",
      accent: "#E5C158",
      cardBg: "#0D0F14",
      textPrimary: "#FFFFFF",
      textMuted: "#B5BDC9",
      borderColor: "#C89D46",
    },
  },
  vintageOlive: {
    name: "Vintage Olive",
    swatch: "#1C2619",
    accent: "#D4AF37",
    palette: {
      name: "Vintage Olive & Gold",
      background: "#141C12",
      primary: "#FEF9C3",
      secondary: "#84CC16",
      accent: "#D4AF37",
      cardBg: "#1C2619",
      textPrimary: "#FFFDF6",
      textMuted: "#BDCAB4",
      borderColor: "#607452",
    },
  },
  royalAmethyst: {
    name: "Royal Amethyst",
    swatch: "#2B0B3E",
    accent: "#E5C158",
    palette: {
      name: "Imperial Amethyst",
      background: "#1F072D",
      primary: "#FDE68A",
      secondary: "#C084FC",
      accent: "#E5C158",
      cardBg: "#2B0B3E",
      textPrimary: "#FFFDFB",
      textMuted: "#D3BDDF",
      borderColor: "#58237A",
    },
  },
};

const SUITES = [
  {
    id: "emerald-royal",
    title: "Emerald Royal Palace",
    banglaTitle: "রাজকীয় পান্না ও গোল্ড সিল",
    badge: "Bestseller • 24K Foil",
    desc: "Deep imperial emerald velvet with royal crown crest, baroque corner filigree, and embossed wax seal.",
    styleKey: "luxury",
    defaultVariant: "emeraldGold",
    variants: ["emeraldGold", "mughalRuby", "ivoryBotanical", "midnightSapphire"],
    design: {
      template: "emerald-royal",
      language: "en",
      culturalStyle: "classic",
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasFloralCorners: true, hasGoldBorder: true, hasWaxSeal: true, hasInnerFrame: true, monogram: "A&R" },
      content: {
        title: "THE HONOUR OF YOUR PRESENCE",
        subtitle: "Together with our esteemed families",
        brideName: "Ayesha Rahman",
        groomName: "Rafid Chowdhury",
        weddingDate: "Friday, November 26, 2027",
        weddingTime: "7:00 PM",
        venue: "The Palace Grand Ballroom",
        city: "Dhaka, Bangladesh",
        message: "Request the pleasure of your gracious company to celebrate our holy union.",
        rsvpDetails: "RSVP to family by November 1st",
      },
    },
  },
  {
    id: "mogul-heritage",
    title: "Mogul Shahi Heritage",
    banglaTitle: "মুঘল শাহী দরবার ও তোরণ",
    badge: "Mughal Jharokha Arch",
    desc: "Authentic cusped Mughal Darbar arch with hanging Shahi lanterns, ruby velvet, and jaali lattice.",
    styleKey: "mogul",
    defaultVariant: "mughalRuby",
    variants: ["mughalRuby", "emeraldGold", "holudSaffron", "royalAmethyst"],
    design: {
      template: "mogul-heritage",
      language: "bn",
      culturalStyle: "islamic",
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
        rsvpDetails: "যোগাযোগ: ০১৭১২-৩৪৫৬৭৮",
      },
    },
  },
  {
    id: "traditional-celebration",
    title: "Bengali Alpona & Kolka",
    banglaTitle: "ঐতিহ্যবাহী আলপনা ও কলকা",
    badge: "Bangla Heritage",
    desc: "Festive lotus mandala, traditional Bengali Kolka corners, and auspicious crimson & turmeric hues.",
    styleKey: "traditional",
    defaultVariant: "holudSaffron",
    variants: ["holudSaffron", "mughalRuby", "emeraldGold", "roseBlush"],
    design: {
      template: "traditional-celebration",
      language: "bn",
      culturalStyle: "bangladeshi",
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasTraditionalMotif: true, hasGoldBorder: true, hasInnerFrame: true, monogram: "ত&ফ" },
      content: {
        title: "শুভ বিবাহ ও গায়ে হলুদ উৎসব",
        subtitle: "পারিবারিক সান্নিধ্যে আমাদের মাঙ্গলিক আয়োজন",
        brideName: "তানজিলা হক",
        groomName: "ফারহান আহমেদ",
        weddingDate: "শুক্রবার • ১২ই ডিসেম্বর ২০২৭",
        weddingTime: "সন্ধ্যা ৭:৩০ মিনিট",
        venue: "সেনাকুঞ্জ গ্র্যান্ড ব্যাঙ্কুয়েট",
        city: "ঢাকা, বাংলাদেশ",
        message: "আমাদের জীবনের এই আনন্দঘন শুভলগ্নে আপনাদের সপরিবারে সাদর আমন্ত্রণ জানাচ্ছি।",
        rsvpDetails: "শুভেচ্ছান্তে: উভয় পরিবার",
      },
    },
  },
  {
    id: "celestial-sapphire",
    title: "Celestial Starlight",
    banglaTitle: "নীল নক্ষত্র ও চাঁদের আলো",
    badge: "Midnight Starlight",
    desc: "Deep sapphire cosmos with hanging crescent moon, twinkling constellation arch, and golden stardust.",
    styleKey: "celestial",
    defaultVariant: "midnightSapphire",
    variants: ["midnightSapphire", "royalAmethyst", "artDecoNoir", "emeraldGold"],
    design: {
      template: "celestial-sapphire",
      language: "en",
      culturalStyle: "classic",
      decorations: { hasFloralCorners: false, hasWaxSeal: true, monogram: "Z&A" },
      content: {
        title: "UNDER THE CANOPY OF STARS",
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
    id: "ivory-floral",
    title: "Ivory Botanical Arch",
    banglaTitle: "আইভরি ইউক্যালিপটাস আর্চ",
    badge: "Botanical Arch",
    desc: "Sculpted botanical arch sanctuary with blooming rose & eucalyptus garland on soft cotton linen.",
    styleKey: "floral",
    defaultVariant: "ivoryBotanical",
    variants: ["ivoryBotanical", "roseBlush", "emeraldGold", "vintageOlive"],
    design: {
      template: "ivory-floral",
      language: "en",
      culturalStyle: "botanical",
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasFloralCorners: true, hasBotanicalBranch: true, hasWaxSeal: true, monogram: "C&L" },
      content: {
        title: "WE INVITE YOU TO CELEBRATE",
        subtitle: "In loving presence of family & friends",
        brideName: "Charlotte Miller",
        groomName: "Lucas Bennett",
        weddingDate: "Saturday, September 18, 2027",
        weddingTime: "4:30 PM",
        venue: "Rosewood Botanical Gardens",
        city: "Dhaka, Bangladesh",
        message: "Join us under the olive groves as we exchange lifelong vows and celebrate our beginning.",
        rsvpDetails: "Reception & Dancing to follow",
      },
    },
  },
  {
    id: "golden-glamour",
    title: "Golden Glamour 1920s",
    banglaTitle: "স্বর্ণালী আর্ট ডেকো গ্ল্যামার",
    badge: "Art Deco 24K",
    desc: "Opulent Great Gatsby Art Deco sunburst rays, stepped geometric corners, and 24K champagne gold.",
    styleKey: "glamour",
    defaultVariant: "artDecoNoir",
    variants: ["artDecoNoir", "mughalRuby", "midnightSapphire", "ivoryBotanical"],
    design: {
      template: "golden-glamour",
      language: "en",
      culturalStyle: "classic",
      decorations: { hasFloralCorners: false, hasWaxSeal: true, monogram: "V&D" },
      content: {
        title: "A NIGHT OF TIMELESS GLAMOUR",
        subtitle: "Black-tie evening celebration",
        brideName: "Vivienne Vance",
        groomName: "Dominic Sterling",
        weddingDate: "Saturday • November 20, 2027",
        weddingTime: "7:00 PM",
        venue: "The Westin Grand Ballroom",
        city: "Gulshan-1, Dhaka",
        message: "To join them for an extraordinary black-tie evening of cocktails, dining, and celebratory vows.",
        rsvpDetails: "Black Tie Optional",
      },
    },
  },
  {
    id: "romantic-blush",
    title: "Romantic Rose Hoop",
    banglaTitle: "রোমান্টিক ব্লাশ ও গোল্ডেন রিং",
    badge: "Floral Hoop & Silk",
    desc: "Interlocking golden floral hoops, translucent silk vellum sash, and tender peony rose romance.",
    styleKey: "blush",
    defaultVariant: "roseBlush",
    variants: ["roseBlush", "ivoryBotanical", "mughalRuby", "holudSaffron"],
    design: {
      template: "romantic-blush",
      language: "en",
      culturalStyle: "romantic",
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
        city: "Dhaka, Bangladesh",
        message: "Invite you to share in their joy as they exchange vows and become husband and wife.",
        rsvpDetails: "RSVP by July 15th",
      },
    },
  },
  {
    id: "vintage-botanical",
    title: "Vintage Olive Cameo",
    banglaTitle: "ভিন্টেজ অলিভ ও লিনেন",
    badge: "Old-Money Estate",
    desc: "Engraved olive laurel cameo crest, laid linen texture, and classic old-money estate typography.",
    styleKey: "vintage",
    defaultVariant: "vintageOlive",
    variants: ["vintageOlive", "ivoryBotanical", "emeraldGold", "holudSaffron"],
    design: {
      template: "vintage-botanical",
      language: "en",
      culturalStyle: "botanical",
      decorations: { hasFloralCorners: true, hasWaxSeal: true, monogram: "G&A" },
      content: {
        title: "TOGETHER WITH THEIR FAMILIES",
        subtitle: "A lifetime of quiet elegance",
        brideName: "Genevieve Claire",
        groomName: "Alexander Rhodes",
        weddingDate: "Saturday • September 11, 2027",
        weddingTime: "5:00 PM",
        venue: "The Heritage Olive Grove Estate",
        city: "Sylhet, Bangladesh",
        message: "Warmly invite you to join us in an intimate gathering of love, laughter, and lifelong devotion.",
        rsvpDetails: "RSVP by August 1st",
      },
    },
  },
  {
    id: "modern-minimal",
    title: "Vogue Editorial Arch",
    banglaTitle: "মডার্ন আর্কিটেকচারাল আর্চ",
    badge: "High Editorial",
    desc: "Architectural double-arch frame, monogram crest badge, and structured contemporary grid layout.",
    styleKey: "minimalist",
    defaultVariant: "artDecoNoir",
    variants: ["artDecoNoir", "ivoryBotanical", "emeraldGold", "midnightSapphire"],
    design: {
      template: "modern-minimal",
      language: "en",
      culturalStyle: "minimal",
      typography: { headingFont: "Playfair Display", bodyFont: "DM Sans" },
      decorations: { hasFloralCorners: false, hasWaxSeal: false, monogram: "S&O" },
      content: {
        title: "THE EDITORIAL EDITION",
        subtitle: "A modern wedding ceremony",
        brideName: "Sienna",
        groomName: "Oliver",
        weddingDate: "15 • 05 • 2027",
        weddingTime: "7:00 PM",
        venue: "The Glasshouse Art Pavilion",
        city: "Dhaka, Bangladesh",
        message: "Cordially invite you to witness and celebrate their marriage.",
        rsvpDetails: "Cocktails & Dinner to follow",
      },
    },
  },
];

export default function FeaturedSuites() {
  const router = useRouter();
  const [activePreview, setActivePreview] = useState(null);
  const [suiteFilter, setSuiteFilter] = useState("all");
  // Track selected color variant per card so users can interactively test colors!
  const [selectedVariants, setSelectedVariants] = useState({});

  const getSuiteDesign = (suite) => {
    const variantKey = selectedVariants[suite.id] || suite.defaultVariant;
    const variantObj = SUITE_COLOR_VARIANTS[variantKey] || SUITE_COLOR_VARIANTS.emeraldGold;
    return {
      ...suite.design,
      palette: variantObj.palette,
    };
  };

  const handleOpenInStudio = (suite) => {
    const fullDesign = getSuiteDesign(suite);
    const newId = crypto.randomUUID();
    const draftData = {
      title: suite.title,
      bride_name: fullDesign.content.brideName,
      groom_name: fullDesign.content.groomName || "",
      design_json: fullDesign,
      status: "draft",
    };

    try {
      sessionStorage.setItem(`wedly_draft_${newId}`, JSON.stringify(draftData));
    } catch (err) {
      console.warn("Could not save to sessionStorage", err);
    }

    toast.success(`Selected "${suite.title}"!`, {
      description: "Opening your chosen card in Wedly Studio...",
    });

    router.push(`/editor/${newId}`);
  };

  const filteredSuites = SUITES.filter((suite) => {
    if (suiteFilter === "all") return true;
    if (suiteFilter === "traditional")
      return suite.styleKey === "traditional" || suite.id === "emerald-royal" || suite.id === "mogul-heritage";
    if (suiteFilter === "modern")
      return suite.styleKey === "celestial" || suite.styleKey === "minimalist" || suite.styleKey === "glamour";
    if (suiteFilter === "floral")
      return suite.styleKey === "floral" || suite.styleKey === "blush" || suite.styleKey === "vintage";
    return true;
  });

  return (
    <section className="w-full bg-[#F1E9DA]/55 px-6 lg:px-12 py-20" id="featured-collection">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.2em] block mb-2">
              Interactive Card Chooser • সহজেই আপনার পছন্দের কার্ডটি বেছে নিন
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32]">
                Choose Your Signature Card Design
              </h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#173D32] text-[#E5C158] shadow-2xs">
                ৯টি প্রিমিয়াম মাস্টারপিস • Live Color Switcher
              </span>
            </div>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#5E645E] max-w-md">
            Click the color dots on any card below to preview different royal themes live, then click{" "}
            <strong className="text-[#173D32]">Choose This Card</strong> to customize it immediately.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "all", label: "All 9 Masterpieces (সব ডিজাইন)" },
            { id: "traditional", label: "Royal & Traditional (মুঘল ও আলপনা)" },
            { id: "modern", label: "Celestial & Glamour (আধুনিক ও গ্ল্যামার)" },
            { id: "floral", label: "Botanical & Romantic (ফ্লোরাল ও ভিন্টেজ)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSuiteFilter(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                suiteFilter === cat.id
                  ? "bg-[#173D32] text-white shadow-md ring-2 ring-[#C6A66B]/50"
                  : "bg-white text-[#555E57] hover:text-[#173D32] border border-[#E8E2D8]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 9 Showcase Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuites.map((suite) => {
            const activeVariantKey = selectedVariants[suite.id] || suite.defaultVariant;
            const activeVariant = SUITE_COLOR_VARIANTS[activeVariantKey] || SUITE_COLOR_VARIANTS.emeraldGold;
            const liveDesign = getSuiteDesign(suite);
            const cardBg = liveDesign.palette.cardBg;
            const accentColor = liveDesign.palette.accent;

            return (
              <div
                key={suite.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-sm hover:shadow-2xl hover:border-[#C6A66B] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Luxurious Exhibition Stage Preview */}
                  <div
                    className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center p-4 border-b border-[#E8E2D8]/70 transition-colors duration-500"
                    style={{
                      background: `radial-gradient(ellipse at 50% 42%, ${accentColor}28 0%, ${cardBg}18 48%, #EFE9DC 100%)`,
                    }}
                  >
                    {/* Ambient Spotlight Glow Behind Card */}
                    <div
                      className="absolute w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-45 transition-transform duration-500 group-hover:scale-125"
                      style={{ backgroundColor: accentColor }}
                    />

                    {/* Miniature Live Card Rendering */}
                    <div
                      onClick={() => setActivePreview({ suite, design: liveDesign })}
                      className="w-[350px] h-[490px] transform scale-[0.63] sm:scale-[0.66] origin-center rounded-[6px] overflow-hidden cursor-pointer select-none transition-transform duration-500 group-hover:scale-[0.69]"
                      style={{
                        boxShadow:
                          "0 28px 60px -12px rgba(15, 23, 42, 0.38), 0 12px 28px -8px rgba(15, 23, 42, 0.22)",
                      }}
                    >
                      <InvitationRenderer design={liveDesign} showShadow={false} />
                    </div>

                    {/* Top Floating Badge */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md"
                        style={{
                          backgroundColor:
                            cardBg === "#FAF8F4" || cardBg === "#FFF9E6" || cardBg === "#FFF1F2"
                              ? "#173D32"
                              : cardBg,
                          border: `1px solid ${accentColor}90`,
                        }}
                      >
                        {suite.badge}
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 text-[#173D32] border border-[#E8E2D8] shadow-xs">
                        {suite.design.language === "bn" ? "বাংলা" : "English"}
                      </span>
                    </div>

                    {/* Hover Quick Action Overlay */}
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      <button
                        type="button"
                        onClick={() => setActivePreview({ suite, design: liveDesign })}
                        className="px-3.5 py-2 rounded-xl bg-white/95 text-[#173D32] text-xs font-semibold shadow-lg border border-[#E8E2D8] flex items-center gap-1.5 hover:bg-[#FAF8F4] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                        <span>Zoom Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenInStudio(suite)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A66B] to-[#D4AF37] text-[#173D32] text-xs font-bold shadow-lg flex items-center gap-1.5 hover:brightness-105 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Edit in Studio</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Info & Interactive Color Theme Switcher */}
                  <div className="p-5 space-y-3">
                    {/* Interactive Color Swatch Bar */}
                    <div className="flex items-center justify-between bg-[#FAF8F4] px-3 py-2 rounded-xl border border-[#E8E2D8]">
                      <span className="text-[11px] font-semibold text-[#555E57] flex items-center gap-1">
                        <Palette className="w-3.5 h-3.5 text-[#C6A66B]" />
                        <span>{activeVariant.name}</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        {suite.variants.map((vKey) => {
                          const vObj = SUITE_COLOR_VARIANTS[vKey];
                          const isSelected = activeVariantKey === vKey;
                          return (
                            <button
                              key={vKey}
                              type="button"
                              onClick={() =>
                                setSelectedVariants((prev) => ({
                                  ...prev,
                                  [suite.id]: vKey,
                                }))
                              }
                              title={`Try ${vObj.name}`}
                              className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                                isSelected
                                  ? "ring-2 ring-[#C6A66B] scale-115 border-white shadow-xs"
                                  : "border-black/20 hover:scale-110 opacity-85 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: vObj.swatch }}
                            >
                              {isSelected && (
                                <Check
                                  className={`w-2.5 h-2.5 ${
                                    vObj.swatch === "#FAF8F4" ||
                                    vObj.swatch === "#FFF8E1" ||
                                    vObj.swatch === "#FFF1F2"
                                      ? "text-[#173D32]"
                                      : "text-white"
                                  }`}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#173D32] leading-snug">
                        {suite.title}
                      </h3>
                      <p className="text-xs font-medium text-[#9A7C43] mt-0.5">
                        {suite.banglaTitle}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-[#686D68] leading-relaxed line-clamp-2">
                      {suite.desc}
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="px-5 pb-5 pt-1 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActivePreview({ suite, design: liveDesign })}
                    className="py-2.5 px-3.5 bg-[#FAF8F4] hover:bg-[#F1E9DA] text-[#173D32] font-sans text-xs font-semibold rounded-xl border border-[#E8E2D8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenInStudio(suite)}
                    className="flex-1 py-2.5 px-4 bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Choose This Card</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C6A66B]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 108+ Templates Catalog Callout Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#173D32] via-[#20493C] to-[#173D32] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C6A66B]/40 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#C6A66B]/15 blur-2xl pointer-events-none" />
          <div className="relative z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A66B]/20 text-[#E5C88A] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>১০৮টি সম্পূর্ণ রেডিমেড ডিজাইন লাইব্রেরি</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
              Want more choices? Browse 108+ Ready Cards by Event & Color
            </h3>
            <p className="font-sans text-sm text-[#DFE7E2] max-w-xl mt-2 leading-relaxed">
              Explore authentic Wedding, Gaye Holud, Boubhat, Walima, Birthday, and Anniversary cards in both বাংলা and English.
              Filter by color, test live palettes, and customize with 1 click.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-3">
            <Link
              href="/templates"
              className="px-6 py-3.5 rounded-2xl bg-[#C6A66B] text-[#173D32] hover:bg-[#D4B77D] font-bold text-sm shadow-md transition-all flex items-center gap-2 group"
            >
              <span>Browse All 108 Cards</span>
              <ArrowRight className="w-4 h-4 text-[#173D32] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Dialog for Full Specimen Preview */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative bg-[#FAF8F4] rounded-3xl max-w-lg w-full p-6 sm:p-8 flex flex-col items-center border border-[#E8E2D8] shadow-2xl animate-fadeIn my-auto">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 p-2 text-[#77766F] hover:text-[#173D32] rounded-full hover:bg-[#E8E2D8] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7C43]">
              {activePreview.suite.badge}
            </span>
            <h3 className="font-serif text-2xl text-[#173D32] mt-0.5">
              {activePreview.suite.title}
            </h3>
            <p className="font-sans text-xs text-[#77766F] mb-5">
              {activePreview.suite.banglaTitle} • 5×7 Inch Atelier Proof
            </p>

            <div className="transform scale-90 sm:scale-100 origin-center my-1 rounded-[4px] overflow-hidden shadow-2xl">
              <InvitationRenderer design={activePreview.design} />
            </div>

            <div className="mt-6 flex items-center gap-3 w-full justify-center">
              <button
                onClick={() => setActivePreview(null)}
                className="px-5 py-2.5 rounded-xl border border-[#E8E2D8] text-xs font-semibold text-[#77766F] hover:bg-[#F1E9DA] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = activePreview.suite;
                  setActivePreview(null);
                  handleOpenInStudio(s);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
                <span>Choose & Edit This Card</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
