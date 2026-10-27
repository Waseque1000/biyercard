"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Sparkles,
  Eye,
  ArrowRight,
  X,
  Smartphone,
  Monitor,
  Check,
  Calendar,
  MapPin,
  Heart,
  Palette,
  Layers,
  Download,
  Lock,
} from "lucide-react";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_STYLES,
  TEMPLATE_COLORS,
  COLOR_PALETTES,
  filterReadyTemplates,
} from "@/data/readyTemplates";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import { saveLocalInvitation } from "@/lib/localInvitations";
import { toast } from "sonner";

const QUICK_PALETTE_SWATCHES = [
  { key: "default", label: "Original", palette: null },
  { key: "emeraldGold", label: "Emerald", swatch: "#09261C", palette: COLOR_PALETTES.emeraldGold },
  { key: "mughalRuby", label: "Mughal Ruby", swatch: "#420B13", palette: COLOR_PALETTES.mughalRuby },
  { key: "mustardMarigold", label: "Holud Gold", swatch: "#FFF9E6", palette: COLOR_PALETTES.mustardMarigold },
  { key: "celestialMidnight", label: "Sapphire", swatch: "#081324", palette: COLOR_PALETTES.celestialMidnight },
  { key: "ivorySage", label: "Ivory Sage", swatch: "#F6F8F5", palette: COLOR_PALETTES.ivorySage },
];

export default function TemplatesGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Per-card live color override & favorites shortlist
  const [cardPaletteOverrides, setCardPaletteOverrides] = useState({});
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewDevice, setPreviewDevice] = useState("desktop");

  // Sync category from URL param if provided (e.g., /templates?cat=holud)
  useEffect(() => {
    const catParam = searchParams?.get("cat");
    if (catParam && TEMPLATE_CATEGORIES.some((c) => c.id === catParam)) {
      setSelectedCategory(catParam);
    }
  }, [searchParams]);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Helper to get effective design with any user-selected live palette override
  const getEffectiveDesign = (template) => {
    const overrideKey = cardPaletteOverrides[template.id];
    if (!overrideKey || overrideKey === "default") return template.design;
    const found = QUICK_PALETTE_SWATCHES.find((s) => s.key === overrideKey);
    if (!found || !found.palette) return template.design;
    return {
      ...template.design,
      palette: found.palette,
    };
  };

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    const base = filterReadyTemplates({
      category: selectedCategory,
      style: selectedStyle,
      language: selectedLanguage,
      colorTheme: selectedColor,
      search: searchQuery,
    });
    if (showFavoritesOnly) {
      return base.filter((t) => favoriteIds.includes(t.id));
    }
    return base;
  }, [
    selectedCategory,
    selectedStyle,
    selectedLanguage,
    selectedColor,
    searchQuery,
    showFavoritesOnly,
    favoriteIds,
  ]);

  // Use Template Handler: Instantly create a new draft and open in Editor
  const handleUseTemplate = (template) => {
    const effectiveDesign = getEffectiveDesign(template);
    const newId = crypto.randomUUID();
    const draftData = {
      id: newId,
      title: template.title,
      bride_name: effectiveDesign.content.brideName,
      groom_name: effectiveDesign.content.groomName || "",
      wedding_date: effectiveDesign.content.weddingDate || "",
      venue: effectiveDesign.content.venue || "",
      theme: effectiveDesign.template || "emerald-royal",
      design_json: effectiveDesign,
      status: "draft",
    };

    try {
      sessionStorage.setItem(`wedly_draft_${newId}`, JSON.stringify(draftData));
      saveLocalInvitation(draftData);
    } catch (err) {
      console.warn("Could not save to sessionStorage", err);
    }

    toast.success("Card Selected!", {
      description: `Opening "${template.title}" in Wedly Studio...`,
    });

    router.push(`/editor/${newId}`);
  };

  // Customize in Wizard Handler
  const handleCustomizeInWizard = (template) => {
    router.push(`/create?preset=${template.id}&template=${template.design.template}`);
  };

  // Download Final Card Handler (Enforces Login / Register if unauthenticated)
  const handleDownloadTemplate = (template) => {
    const effectiveDesign = getEffectiveDesign(template);
    const newId = crypto.randomUUID();
    const draftData = {
      id: newId,
      title: template.title,
      bride_name: effectiveDesign.content.brideName,
      groom_name: effectiveDesign.content.groomName || "",
      wedding_date: effectiveDesign.content.weddingDate || "",
      venue: effectiveDesign.content.venue || "",
      theme: effectiveDesign.template || "emerald-royal",
      design_json: effectiveDesign,
      status: "draft",
    };

    try {
      sessionStorage.setItem(`wedly_draft_${newId}`, JSON.stringify(draftData));
      saveLocalInvitation(draftData, user?.uid || null);
    } catch (err) {
      console.warn("Could not save to sessionStorage", err);
    }

    if (!user) {
      toast.info("Please Log In or Register to download your final card.");
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/editor/${newId}?download=pdf`
        )}&reason=download`
      );
      return;
    }

    router.push(`/editor/${newId}?download=pdf`);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setShowFavoritesOnly(false);
    if (selectedColor !== "all") {
      const testMatches = filterReadyTemplates({
        category: catId,
        style: selectedStyle,
        language: selectedLanguage,
        colorTheme: selectedColor,
        search: searchQuery,
      });
      if (testMatches.length === 0) {
        setSelectedColor("all");
      }
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedStyle("all");
    setSelectedLanguage("all");
    setSelectedColor("all");
    setSearchQuery("");
    setShowFavoritesOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedStyle !== "all" ||
    selectedLanguage !== "all" ||
    selectedColor !== "all" ||
    showFavoritesOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="relative min-h-screen bg-[#FAF8F4] pt-24 pb-20 overflow-hidden">
      {/* Colorful Atmospheric Ambient Orbs */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-32 right-10 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center pt-6 pb-8">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#173D32]/10 via-[#C6A66B]/25 to-[#881337]/10 border border-[#C6A66B]/40 text-[#173D32] text-xs font-semibold tracking-wide mb-3 shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#C6A66B]" />
          <span>১০৮+ প্রস্তুতকৃত রাজকীয় ও কালারফুল কার্ড কালেকশন • Interactive Chooser</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-normal tracking-tight mb-3 leading-tight">
          Choose Your Perfect Celebration Card
        </h1>

        <p className="font-sans text-sm sm:text-base text-[#555E57] max-w-3xl mx-auto leading-relaxed">
          যেকোনো কার্ডের নিচে কালার ডটে ক্লিক করে সরাসরি রঙ পরিবর্তন করে দেখুন, হার্ট (♥) আইকনে ক্লিক করে পছন্দের তালিকায় রাখুন, এবং{" "}
          <strong className="text-[#173D32]">Choose Card</strong> বাটনে ক্লিক করে আপনার নাম ও তথ্য দিয়ে সাজিয়ে নিন।
        </p>

        {/* Search Input Bar & Shortlist Button */}
        <div className="mt-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-[#888A85] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event (Wedding, Holud, Birthday), bride/groom name, venue, or style..."
              className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-[#E8E2D8] text-sm text-[#173D32] placeholder:text-[#9A9890] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C6A66B]/50 focus:border-[#C6A66B] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 text-xs bg-[#FAF8F4] text-[#77766F] hover:text-[#173D32] p-1.5 rounded-full transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFavoritesOnly((v) => !v)}
            className={`px-4 py-3.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer shrink-0 ${
              showFavoritesOnly
                ? "bg-rose-600 text-white border-rose-600 shadow-md"
                : "bg-white text-[#173D32] border-[#E8E2D8] hover:border-rose-300 shadow-xs"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                showFavoritesOnly ? "fill-white text-white" : "text-rose-500 fill-rose-500/20"
              }`}
            />
            <span>Shortlisted ({favoriteIds.length})</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto px-1">
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id && !showFavoritesOnly;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#173D32] text-white shadow-md ring-2 ring-[#C6A66B]/60 font-semibold scale-[1.02]"
                    : "bg-white text-[#555E57] hover:bg-[#F2ECE1] hover:text-[#173D32] border border-[#E8E2D8] shadow-2xs"
                }`}
              >
                <span>{cat.banglaName}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#FAF8F4] text-[#888A85]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* COLOR THEME SELECTOR */}
        <div className="mt-5 bg-white/90 backdrop-blur-md border border-[#E8E2D8] rounded-2xl p-3.5 max-w-5xl mx-auto shadow-xs">
          <div className="flex items-center justify-between mb-2.5 px-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#173D32]">
              <Palette className="w-4 h-4 text-[#C6A66B]" />
              <span>কালার থিম অনুযায়ী কার্ড খুঁজুন (Filter by Color):</span>
            </div>
            {selectedColor !== "all" && (
              <button
                onClick={() => setSelectedColor("all")}
                className="text-[11px] text-[#C6A66B] hover:text-[#173D32] underline font-medium cursor-pointer"
              >
                সব কালার দেখুন (Reset Color)
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {TEMPLATE_COLORS.map((col) => {
              const isSelected = selectedColor === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => setSelectedColor(col.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#173D32] text-white shadow-sm ring-2 ring-[#C6A66B] font-semibold"
                      : "bg-[#FAF8F4] text-[#555E57] hover:bg-white border border-[#E8E2D8]"
                  }`}
                >
                  {col.id !== "all" ? (
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-[#C6A66B] shrink-0" />
                  )}
                  <span className="whitespace-nowrap">{col.banglaName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters: Language & Style */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs max-w-5xl mx-auto">
          <div className="flex items-center gap-1.5 bg-white border border-[#E8E2D8] rounded-xl px-3 py-1.5 shadow-xs">
            <span className="text-[#888A85] font-medium">ভাষা:</span>
            {["all", "bn", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedLanguage === lang
                    ? "bg-[#173D32] text-white shadow-2xs font-semibold"
                    : "text-[#555E57] hover:bg-[#FAF8F4]"
                }`}
              >
                {lang === "all" ? "সকল (All)" : lang === "bn" ? "বাংলা" : "English"}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-white border border-[#E8E2D8] rounded-xl px-3 py-1.5 shadow-xs">
            <span className="text-[#888A85] font-medium mr-1">স্টাইল:</span>
            {TEMPLATE_STYLES.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStyle(st.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedStyle === st.id
                    ? "bg-[#C6A66B] text-white shadow-2xs font-semibold"
                    : "text-[#555E57] hover:bg-[#FAF8F4]"
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Info & Reset Filter */}
        <div className="mt-4 text-xs text-[#888A85]">
          Showing <span className="font-bold text-[#173D32]">{filteredTemplates.length}</span> of 108 ready design templates
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="ml-2 font-semibold underline text-[#C6A66B] hover:text-[#173D32] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <Layers className="w-12 h-12 text-[#C6A66B] mx-auto mb-4 opacity-60" />
            <h3 className="font-serif text-lg text-[#173D32] mb-1 font-semibold">
              {showFavoritesOnly ? "No Shortlisted Cards Yet" : "No matching cards found"}
            </h3>
            <p className="text-xs text-[#77766F] mb-6">
              {showFavoritesOnly
                ? "Click the heart (♥) icon on any card to save it to your shortlist for easy comparison."
                : "Try adjusting your search keywords, color theme, or category filter to discover more templates."}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] transition-all shadow-sm cursor-pointer"
            >
              Show All 108 Templates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredTemplates.map((template) => {
              const effectiveDesign = getEffectiveDesign(template);
              const content = effectiveDesign.content;
              const pal = effectiveDesign.palette;
              const accentColor = pal?.accent || "#C6A66B";
              const primaryColor = pal?.primary || "#173D32";
              const cardBg = pal?.cardBg || "#FAF8F5";
              const isFav = favoriteIds.includes(template.id);
              const activeOverride = cardPaletteOverrides[template.id] || "default";

              return (
                <div
                  key={template.id}
                  className="group bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#C6A66B] transition-all duration-300 flex flex-col"
                >
                  {/* Card Mini Preview Canvas - Luxurious Ambient Exhibition Plinth */}
                  <div
                    className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center p-3 sm:p-4 border-b border-[#E8E2D8]/60 transition-colors duration-300"
                    style={{
                      background: `radial-gradient(ellipse at 50% 40%, ${accentColor}30 0%, ${cardBg}20 48%, #EFE9DC 100%)`,
                    }}
                  >
                    {/* Atmospheric Glow Aura behind the card */}
                    <div
                      className="absolute w-48 h-48 rounded-full blur-2xl pointer-events-none opacity-45 transition-transform duration-500 group-hover:scale-125"
                      style={{ backgroundColor: accentColor }}
                    />

                    {/* Scale wrapper for miniature live card rendering */}
                    <div
                      onClick={() => setPreviewTemplate(template)}
                      className="w-[350px] h-[490px] transform scale-[0.64] sm:scale-[0.67] origin-center rounded-[6px] overflow-hidden cursor-pointer select-none transition-transform duration-500 group-hover:scale-[0.70]"
                      style={{
                        boxShadow: `0 26px 55px -12px rgba(15, 23, 42, 0.38), 0 10px 25px -8px rgba(0,0,0,0.22), 0 0 0 1px ${accentColor}50`,
                      }}
                    >
                      <InvitationRenderer design={effectiveDesign} showShadow={false} />
                    </div>

                    {/* Floating Top Badges & Shortlist Heart */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase text-white shadow-md backdrop-blur-md"
                          style={{
                            backgroundColor:
                              cardBg === "#FFFFFF" ||
                              cardBg === "#FAF8F4" ||
                              cardBg === "#FFF9E6" ||
                              cardBg === "#FFF1F2" ||
                              cardBg === "#F6F8F5"
                                ? "#173D32"
                                : cardBg,
                            border: `1px solid ${accentColor}85`,
                          }}
                        >
                          {template.badge}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 text-[#173D32] border border-[#E8E2D8] shadow-2xs backdrop-blur-md">
                          {template.language === "bn" ? "বাংলা" : "English"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(template.id, e)}
                        title={isFav ? "Remove from Shortlist" : "Add to Shortlist"}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                          isFav
                            ? "bg-rose-600 text-white scale-110"
                            : "bg-white/90 text-[#77766F] hover:text-rose-600 hover:bg-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                      </button>
                    </div>

                    {/* Quick Preview Hover Bar */}
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template)}
                        className="px-3.5 py-2 rounded-xl bg-white/95 text-[#173D32] text-xs font-semibold shadow-lg flex items-center gap-1.5 hover:bg-[#FAF8F4] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                        <span>Quick View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUseTemplate(template)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C6A66B] to-[#D4AF37] text-[#173D32] text-xs font-bold shadow-lg flex items-center gap-1.5 hover:brightness-105 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Choose Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Information Footer */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      {/* Interactive Live Color Switcher Row */}
                      <div className="flex items-center justify-between text-xs mb-2.5 bg-[#FAF8F4] px-2.5 py-1.5 rounded-xl border border-[#E8E2D8]">
                        <span className="text-[#686D68] font-semibold text-[10px] uppercase tracking-wider">
                          {template.categoryLabel.split("/")[0]}
                        </span>

                        <div className="flex items-center gap-1.5" title="Click to test color themes on this card">
                          <span className="text-[10px] text-[#888A85] mr-0.5">Try Colors:</span>
                          {QUICK_PALETTE_SWATCHES.map((sw) => {
                            const isSelected = activeOverride === sw.key;
                            const swatchColor =
                              sw.key === "default"
                                ? template.design?.palette?.cardBg || template.colorSummary[2] || "#173D32"
                                : sw.swatch;
                            return (
                              <button
                                key={sw.key}
                                type="button"
                                onClick={() =>
                                  setCardPaletteOverrides((prev) => ({
                                    ...prev,
                                    [template.id]: sw.key,
                                  }))
                                }
                                title={`Preview in ${sw.label}`}
                                className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                                  isSelected
                                    ? "ring-2 ring-[#C6A66B] scale-120 border-white shadow-xs"
                                    : "border-black/20 hover:scale-115 opacity-80 hover:opacity-100"
                                }`}
                                style={{ backgroundColor: swatchColor }}
                              />
                            );
                          })}
                        </div>
                      </div>

                      <h3 className="font-serif text-lg text-[#173D32] font-semibold leading-snug group-hover:text-[#285C49] transition-colors">
                        {template.banglaTitle}
                      </h3>
                      <p className="text-xs text-[#77766F] font-sans mt-0.5 line-clamp-1">
                        {template.title}
                      </p>

                      <div className="mt-2.5 pt-2.5 border-t border-[#F0EBE1] text-xs text-[#555E57] space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#77766F]">
                          <Calendar className="w-3 h-3 text-[#C6A66B] shrink-0" />
                          <span className="truncate">{content.weddingDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#77766F]">
                          <MapPin className="w-3 h-3 text-[#C6A66B] shrink-0" />
                          <span className="truncate">
                            {content.venue}, {content.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template)}
                        className="py-2.5 px-3.5 rounded-xl border border-[#E8E2D8] bg-[#FAF8F4] text-[#173D32] text-xs font-semibold hover:bg-[#F1E9DA] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                        <span>Preview</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <span>Choose This Card</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C6A66B]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fullscreen High-Fidelity Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E8E2D8] overflow-hidden my-auto flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A66B]">
                  {previewTemplate.categoryLabel}
                </span>
                <h3 className="font-serif text-xl text-[#173D32] font-semibold">
                  {previewTemplate.banglaTitle}
                </h3>
              </div>

              {/* View Switcher & Close */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1 bg-[#FAF8F4] p-1 rounded-xl border border-[#E8E2D8]">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                      previewDevice === "desktop"
                        ? "bg-white text-[#173D32] shadow-xs"
                        : "text-[#77766F] hover:text-[#173D32]"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                      previewDevice === "mobile"
                        ? "bg-white text-[#173D32] shadow-xs"
                        : "text-[#77766F] hover:text-[#173D32]"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>

                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="w-9 h-9 rounded-full bg-[#FAF8F4] text-[#77766F] hover:text-[#173D32] hover:bg-[#E8E2D8] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Card Preview & Details */}
            <div className="p-4 sm:p-8 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8 items-center justify-center bg-[#F3EFE6]">
              {/* Card Canvas */}
              <div className="flex-1 flex items-center justify-center py-2">
                <div
                  className="transition-all duration-300 rounded-[4px] overflow-hidden flex-shrink-0"
                  style={{
                    boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)",
                  }}
                >
                  <InvitationRenderer
                    design={getEffectiveDesign(previewTemplate)}
                    isMobile={previewDevice === "mobile"}
                  />
                </div>
              </div>

              {/* Specs & Customization Panel */}
              <div className="w-full md:w-80 bg-white rounded-2xl p-5 border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base text-[#173D32] font-semibold mb-1">
                    {previewTemplate.title}
                  </h4>
                  <p className="text-xs text-[#77766F] mb-4">
                    Test different royal color palettes below or open directly in Studio to customize all text.
                  </p>

                  {/* Interactive Color Switcher inside Modal */}
                  <div className="mb-4 p-3 rounded-xl bg-[#FAF8F4] border border-[#E8E2D8]">
                    <span className="text-[11px] font-semibold text-[#173D32] block mb-2">
                      Try Color Palettes:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_PALETTE_SWATCHES.map((sw) => {
                        const activeOverride = cardPaletteOverrides[previewTemplate.id] || "default";
                        const isSelected = activeOverride === sw.key;
                        const swatchColor =
                          sw.key === "default"
                            ? previewTemplate.design?.palette?.cardBg || "#173D32"
                            : sw.swatch;
                        return (
                          <button
                            key={sw.key}
                            type="button"
                            onClick={() =>
                              setCardPaletteOverrides((prev) => ({
                                ...prev,
                                [previewTemplate.id]: sw.key,
                              }))
                            }
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#173D32] text-white border-[#173D32] shadow-2xs"
                                : "bg-white text-[#555E57] border-[#E8E2D8]"
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: swatchColor }}
                            />
                            <span>{sw.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-[#555E57] pb-4 border-b border-[#E8E2D8]">
                    <div className="flex justify-between">
                      <span className="text-[#888A85]">Aesthetic Style:</span>
                      <span className="font-medium text-[#173D32] capitalize">
                        {previewTemplate.styleKey}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#888A85]">Language Script:</span>
                      <span className="font-medium text-[#173D32]">
                        {previewTemplate.language === "bn" ? "বাংলা (Bengali)" : "English (Latin)"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#888A85]">Color Theme:</span>
                      <span className="font-semibold text-[#173D32]">
                        {getEffectiveDesign(previewTemplate)?.palette?.name || "Curated Suite"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => handleUseTemplate(previewTemplate)}
                    className="w-full py-3 px-4 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C6A66B]" />
                    <span>Choose & Edit in Studio</span>
                  </button>
                  <button
                    onClick={() => handleDownloadTemplate(previewTemplate)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#C6A66B] bg-[#F1E9DA] text-[#173D32] text-xs font-bold hover:bg-[#e6dcc8] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {!user ? (
                      <Lock className="w-3.5 h-3.5 text-[#9A7C43]" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-[#9A7C43]" />
                    )}
                    <span>
                      {user
                        ? "Download Final Card (PDF)"
                        : "Log In / Register to Download Card"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleCustomizeInWizard(previewTemplate)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#E8E2D8] bg-[#FAF8F4] text-[#173D32] text-xs font-medium hover:bg-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Customize via AI Wizard</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
