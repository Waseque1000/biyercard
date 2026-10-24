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
} from "lucide-react";
import {
  READY_TEMPLATES,
  TEMPLATE_CATEGORIES,
  TEMPLATE_STYLES,
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

  // Preview Modal State
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [previewDevice, setPreviewDevice] = useState("desktop");

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    return filterReadyTemplates({
      category: selectedCategory,
      style: selectedStyle,
      language: selectedLanguage,
      search: searchQuery,
    });
  }, [selectedCategory, selectedStyle, selectedLanguage, searchQuery]);

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

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-24 pb-20">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center pt-8 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#173D32]/5 border border-[#173D32]/15 text-[#173D32] text-xs font-medium tracking-wide mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
          <span>১০৮+ প্রস্তুতকৃত রেডিমেড ডিজাইন কালেকশন</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] font-normal tracking-tight mb-4">
          Curated Atelier Collection
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#555E57] max-w-2xl mx-auto leading-relaxed">
          Browse over 100+ fully-designed, authentic Bengali & English invitation suites.
          Click any card to preview or open instantly in the studio to customize with your own event details.
        </p>

        {/* Search & Main Filter Controls */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#888A85] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event (Wedding, Holud, Birthday), name, venue, city, or style..."
              className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border border-[#E8E2D8] text-sm text-[#173D32] placeholder:text-[#9A9890] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#173D32]/20 focus:border-[#173D32] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-xs bg-[#FAF8F4] text-[#77766F] hover:text-[#173D32] p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-[#173D32] text-white shadow-sm ring-1 ring-[#173D32]"
                    : "bg-white text-[#555E57] hover:bg-[#F2ECE1] border border-[#E8E2D8]"
                }`}
              >
                <span>{cat.banglaName}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#FAF8F4] text-[#888A85]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Style & Language Secondary Filters */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-white border border-[#E8E2D8] rounded-xl px-3 py-1.5 shadow-xs">
            <span className="text-[#888A85]">ভাষা:</span>
            {["all", "bn", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2 py-0.5 rounded-md text-xs font-medium transition-colors ${
                  selectedLanguage === lang
                    ? "bg-[#173D32] text-white"
                    : "text-[#555E57] hover:bg-[#FAF8F4]"
                }`}
              >
                {lang === "all" ? "সকল (All)" : lang === "bn" ? "বাংলা" : "English"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#E8E2D8] rounded-xl px-3 py-1.5 shadow-xs overflow-x-auto">
            <span className="text-[#888A85]">স্টাইল:</span>
            {TEMPLATE_STYLES.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStyle(st.id)}
                className={`px-2 py-0.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedStyle === st.id
                    ? "bg-[#C6A66B] text-white"
                    : "text-[#555E57] hover:bg-[#FAF8F4]"
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Info */}
        <div className="mt-4 text-xs text-[#888A85]">
          Showing <span className="font-semibold text-[#173D32]">{filteredTemplates.length}</span> of 108 ready design templates
          {(selectedCategory !== "all" || selectedStyle !== "all" || selectedLanguage !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedStyle("all");
                setSelectedLanguage("all");
                setSearchQuery("");
              }}
              className="ml-2 underline text-[#C6A66B] hover:text-[#173D32]"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] p-12 text-center max-w-md mx-auto my-12">
            <Layers className="w-12 h-12 text-[#C6A66B] mx-auto mb-4 opacity-60" />
            <h3 className="font-serif text-lg text-[#173D32] mb-1">No templates found</h3>
            <p className="text-xs text-[#77766F] mb-6">
              Try adjusting your search keywords or switching category filters to view more templates.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedStyle("all");
                setSelectedLanguage("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-[#173D32] text-white text-xs font-medium"
            >
              Show All 108 Templates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTemplates.map((template) => {
              const content = template.design.content;
              return (
                <div
                  key={template.id}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#C6A66B]/50 transition-all duration-300 flex flex-col"
                >
                  {/* Card Mini Preview Canvas */}
                  <div className="relative w-full aspect-[4/5] bg-[#F5F2EB] overflow-hidden flex items-center justify-center p-3 sm:p-4 border-b border-[#E8E2D8]/60">
                    {/* Scale wrapper for miniature live card rendering */}
                    <div className="w-[380px] h-[540px] transform scale-[0.58] sm:scale-[0.62] origin-center shadow-lg rounded-xl overflow-hidden pointer-events-none select-none transition-transform duration-300 group-hover:scale-[0.64]">
                      <InvitationRenderer design={template.design} isMobile={false} />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#173D32]/90 text-white backdrop-blur-md shadow-xs">
                        {template.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 text-[#173D32] border border-[#E8E2D8] backdrop-blur-md">
                        {template.language === "bn" ? "বাংলা" : "English"}
                      </span>
                    </div>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-[#173D32]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="px-3.5 py-2 rounded-xl bg-white text-[#173D32] text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-[#FAF8F4] transform hover:scale-105 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="px-3.5 py-2 rounded-xl bg-[#C6A66B] text-white text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-[#B39355] transform hover:scale-105 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Use Template</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Information Footer */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#888A85] font-medium">{template.categoryLabel}</span>
                        {/* Color Dots */}
                        <div className="flex items-center gap-1">
                          {template.colorSummary.map((color, idx) => (
                            <span
                              key={idx}
                              className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
                              style={{ backgroundColor: color }}
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
                          <span className="truncate">{content.venue}, {content.city}</span>
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
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
              <div
                className={`transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden flex-shrink-0 ${
                  previewDevice === "mobile" ? "w-[360px]" : "w-[440px] sm:w-[480px]"
                }`}
              >
                <InvitationRenderer
                  design={previewTemplate.design}
                  isMobile={previewDevice === "mobile"}
                />
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
                      <span className="text-[#888A85]">Color Palette:</span>
                      <div className="flex items-center gap-1">
                        {previewTemplate.colorSummary.map((c, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full border border-black/10"
                            style={{ backgroundColor: c }}
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
                    className="w-full py-3 px-4 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#285C49] shadow-sm flex items-center justify-center gap-2 transition-all"
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
