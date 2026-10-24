"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Eye,
  ArrowRight,
  X,
  Smartphone,
  Monitor,
  Check,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Palette,
  Layers,
  Flame,
  Star,
  CheckCircle2,
} from "lucide-react";
import {
  READY_TEMPLATES,
  TEMPLATE_CATEGORIES,
  TEMPLATE_STYLES,
  TEMPLATE_COLORS,
  COLOR_PALETTES,
  filterReadyTemplates,
} from "@/data/readyTemplates";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import { toast } from "sonner";

export default function TemplatesGallery() {
  const router = useRouter();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");

  // Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewDevice, setPreviewDevice] = useState("desktop");

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    return filterReadyTemplates({
      category: selectedCategory,
      style: selectedStyle,
      language: selectedLanguage,
      colorTheme: selectedColor,
      search: searchQuery,
    });
  }, [selectedCategory, selectedStyle, selectedLanguage, selectedColor, searchQuery]);

  // Use Template Handler: Instantly create a new draft and open in Editor
  const handleUseTemplate = (template) => {
    const newId = crypto.randomUUID();
    const draftData = {
      title: template.title,
      bride_name: template.design.content.brideName,
      groom_name: template.design.content.groomName || "",
      design_json: template.design,
      status: "draft",
    };

    try {
      sessionStorage.setItem(`wedly_draft_${newId}`, JSON.stringify(draftData));
    } catch (err) {
      console.warn("Could not save to sessionStorage", err);
    }

    toast.success("Template Loaded!", {
      description: `Opening "${template.title}" in Wedly Studio...`,
    });

    router.push(`/editor/${newId}`);
  };

  // Customize in Wizard Handler
  const handleCustomizeInWizard = (template) => {
    router.push(`/create?preset=${template.id}&template=${template.design.template}`);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
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
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedStyle !== "all" ||
    selectedLanguage !== "all" ||
    selectedColor !== "all" ||
    searchQuery.trim().length > 0;

  return (
    <div className="relative min-h-screen bg-[#FAF8F4] pt-24 pb-20 overflow-hidden">
      {/* Colorful Atmospheric Ambient Orbs */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-32 right-10 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center pt-8 pb-10">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#173D32]/10 via-[#C6A66B]/20 to-[#881337]/10 border border-[#C6A66B]/30 text-[#173D32] text-xs font-semibold tracking-wide mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#C6A66B] animate-pulse" />
          <span>১০৮+ প্রস্তুতকৃত রেডিমেড রাজকীয় ও কালারফুল কালেকশন</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-normal tracking-tight mb-4 leading-tight">
          Curated Atelier Collection
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#555E57] max-w-3xl mx-auto leading-relaxed">
          ব্রাউজ করুন মুঘল ভেলভেট মেরুন, হলুদ ও মেহেন্দির প্রাণবন্ত জাফরান, রাজকীয় পান্না সবুজ,
          ওয়ালিমা নীল ও ব্লাশ রোজের অসাধারণ ১০৮+ প্রিমিয়াম ইনভিটেশন।
          যেকোনো কার্ডে ক্লিক করে প্রিভিউ দেখুন বা সরাসরি স্টুডিওতে আপনার তথ্য দিয়ে এডিট করুন।
        </p>

        {/* Feature Highlights Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E2D8] text-[#173D32] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#881337]" />
            মুঘল মেরুন ও লাল
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E2D8] text-[#173D32] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            হলুদ ও জাফরান
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E2D8] text-[#173D32] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#065F46]" />
            পান্না সবুজ
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E2D8] text-[#173D32] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
            ওয়ালিমা নীল
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E2D8] text-[#173D32] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#BE185D]" />
            রোমান্টিক ব্লাশ
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#E8E2D8] text-[#173D32] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#B45309]" />
            ২৪ ক্যারেট গোল্ড
          </span>
        </div>

        {/* Search Input Bar */}
        <div className="mt-7 max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#888A85] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event (Wedding, Holud, Birthday), bride/groom name, venue, city, or style..."
              className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border border-[#E8E2D8] text-sm text-[#173D32] placeholder:text-[#9A9890] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C6A66B]/50 focus:border-[#C6A66B] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-xs bg-[#FAF8F4] text-[#77766F] hover:text-[#173D32] p-1.5 rounded-full transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills - Perfectly wrapping, fully accessible without horizontal clipping */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto px-2">
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#173D32] text-white shadow-md ring-2 ring-[#C6A66B]/50 font-semibold scale-[1.02]"
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

        {/* COLOR THEME SELECTOR - High Impact Colorful Filter with clean wrapping */}
        <div className="mt-6 bg-white/90 backdrop-blur-md border border-[#E8E2D8] rounded-2xl p-4 max-w-5xl mx-auto shadow-xs">
          <div className="flex items-center justify-between mb-3 px-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#173D32]">
              <Palette className="w-4 h-4 text-[#C6A66B]" />
              <span>কালার থিম ফিল্টার (Color Palette):</span>
            </div>
            {selectedColor !== "all" && (
              <button
                onClick={() => setSelectedColor("all")}
                className="text-[11px] text-[#C6A66B] hover:text-[#173D32] underline font-medium"
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
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
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
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
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
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
              className="ml-2 font-semibold underline text-[#C6A66B] hover:text-[#173D32] transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <Layers className="w-12 h-12 text-[#C6A66B] mx-auto mb-4 opacity-60" />
            <h3 className="font-serif text-lg text-[#173D32] mb-1 font-semibold">No templates found</h3>
            <p className="text-xs text-[#77766F] mb-6">
              Try adjusting your search keywords, color theme, or category filter to discover more templates.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] transition-all shadow-sm"
            >
              Show All 108 Templates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTemplates.map((template) => {
              const content = template.design.content;
              const pal = template.design?.palette;
              const accentColor = pal?.accent || "#C6A66B";
              const primaryColor = pal?.primary || "#173D32";
              const cardBg = pal?.cardBg || "#FAF8F5";

              return (
                <div
                  key={template.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#C6A66B]/60 transition-all duration-300 flex flex-col"
                >
                  {/* Card Mini Preview Canvas - Luxurious Ambient Exhibition Plinth */}
                  <div
                    className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center p-3 sm:p-4 border-b border-[#E8E2D8]/60 transition-colors duration-300"
                    style={{
                      background: `radial-gradient(ellipse at 50% 38%, ${accentColor}25 0%, ${cardBg}18 45%, #F4EFE6 100%)`,
                    }}
                  >
                    {/* Atmospheric Glow Aura behind the card */}
                    <div
                      className="absolute w-44 h-44 rounded-full blur-2xl pointer-events-none opacity-40 transition-transform duration-500 group-hover:scale-125"
                      style={{ backgroundColor: accentColor }}
                    />

                    {/* Scale wrapper for miniature live card rendering */}
                    <div
                      className="w-[350px] h-[490px] transform scale-[0.62] sm:scale-[0.66] origin-center rounded-[6px] overflow-hidden pointer-events-none select-none transition-transform duration-300 group-hover:scale-[0.68]"
                      style={{
                        boxShadow: `0 24px 55px -12px ${
                          cardBg === "#FFFFFF" || cardBg === "#FAF8F4" ? "rgba(0,0,0,0.3)" : cardBg + "77"
                        }, 0 10px 25px -8px rgba(0,0,0,0.2), 0 0 0 1px ${accentColor}40`,
                      }}
                    >
                      <InvitationRenderer design={template.design} isMobile={false} />
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase text-white shadow-md backdrop-blur-md"
                        style={{
                          backgroundColor: cardBg.length === 7 && cardBg !== "#FFFFFF" ? cardBg : primaryColor,
                          border: `1px solid ${accentColor}77`,
                        }}
                      >
                        {template.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-[#173D32] border border-[#E8E2D8] shadow-2xs backdrop-blur-md">
                        {template.language === "bn" ? "বাংলা" : "English"}
                      </span>
                    </div>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0F261F]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="px-3.5 py-2 rounded-xl bg-white text-[#173D32] text-xs font-semibold shadow-lg flex items-center gap-1.5 hover:bg-[#FAF8F4] transform hover:scale-105 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C6A66B] to-[#D4AF37] text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 hover:brightness-110 transform hover:scale-105 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Use Template</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Information Footer */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#888A85] font-semibold tracking-wide uppercase text-[10px]">
                          {template.categoryLabel}
                        </span>

                        {/* Rich Color Swatches */}
                        <div className="flex items-center gap-1.5" title={pal?.name || "Card Palette"}>
                          {(pal?.cardBg
                            ? [pal.cardBg, pal.accent || pal.secondary, pal.primary]
                            : template.colorSummary
                          ).map((color, idx) => (
                            <span
                              key={idx}
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs transition-transform hover:scale-125"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                      <h3 className="font-serif text-lg text-[#173D32] font-semibold leading-snug group-hover:text-[#285C49] transition-colors">
                        {template.banglaTitle}
                      </h3>
                      <p className="text-xs text-[#77766F] font-sans mt-0.5 line-clamp-1">
                        {template.title}
                      </p>

                      <div className="mt-3 pt-3 border-t border-[#F0EBE1] text-xs text-[#555E57] space-y-1">
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
                    <div className="mt-4 pt-3 flex items-center gap-2">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="flex-1 py-2 px-3 rounded-xl border border-[#E8E2D8] bg-[#FAF8F4] text-[#173D32] text-xs font-medium hover:bg-white hover:border-[#173D32]/30 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#77766F]" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>Use Design</span>
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
                    className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
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
                    className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
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
                  className="w-9 h-9 rounded-full bg-[#FAF8F4] text-[#77766F] hover:text-[#173D32] hover:bg-[#E8E2D8] flex items-center justify-center transition-colors"
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
                    design={previewTemplate.design}
                    isMobile={previewDevice === "mobile"}
                  />
                </div>
              </div>

              {/* Specs & Customization Panel */}
              <div className="w-full md:w-80 bg-white rounded-2xl p-5 border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base text-[#173D32] font-semibold mb-2">
                    Design Specifications
                  </h4>
                  <p className="text-xs text-[#77766F] mb-4">
                    {previewTemplate.title} — ready to customize with your own text, venue, date, and colors.
                  </p>

                  <div className="space-y-2.5 text-xs text-[#555E57] pb-4 border-b border-[#E8E2D8]">
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
                      <span className="text-[#888A85]">Layout Engine:</span>
                      <span className="font-medium text-[#173D32]">
                        {previewTemplate.design.template}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#888A85]">Color Theme:</span>
                      <span className="font-semibold text-[#173D32]">
                        {previewTemplate.design?.palette?.name || "Curated Suite"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[#888A85]">Swatches:</span>
                      <div className="flex items-center gap-1.5">
                        {(previewTemplate.design?.palette?.cardBg
                          ? [
                              previewTemplate.design.palette.cardBg,
                              previewTemplate.design.palette.accent || previewTemplate.design.palette.secondary,
                              previewTemplate.design.palette.primary,
                            ]
                          : previewTemplate.colorSummary
                        ).map((c, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-black/20 shadow-2xs"
                            style={{ backgroundColor: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FAF8F4] border border-[#E8E2D8]">
                      <span className="font-semibold text-[#173D32] block mb-0.5">
                        {previewTemplate.design.content.brideName}
                        {previewTemplate.design.content.groomName && ` & ${previewTemplate.design.content.groomName}`}
                      </span>
                      <span className="text-[11px] text-[#77766F] block">
                        {previewTemplate.design.content.weddingDate}
                      </span>
                      <span className="text-[11px] text-[#77766F] block truncate">
                        {previewTemplate.design.content.venue}, {previewTemplate.design.content.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2 pt-4 border-t border-[#E8E2D8]">
                  <button
                    onClick={() => handleUseTemplate(previewTemplate)}
                    className="w-full py-3 px-4 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#C6A66B]" />
                    <span>Open in Studio & Edit</span>
                  </button>
                  <button
                    onClick={() => handleCustomizeInWizard(previewTemplate)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#E8E2D8] bg-[#FAF8F4] text-[#173D32] text-xs font-medium hover:bg-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Customize via 4-Step Wizard</span>
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
