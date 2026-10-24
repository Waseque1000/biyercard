"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  Download,
  Share2,
  Save,
  Undo2,
  Redo2,
  Sparkles,
  Smartphone,
  Monitor,
  ZoomIn,
  ZoomOut,
  Palette,
  Type,
  Layout,
  Sliders,
  Check,
  FileDown,
  Globe,
  Copy,
  ExternalLink,
  Search,
} from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import { exportInvitationAsPng, exportInvitationAsPdf } from "@/lib/exportUtils";
import { READY_TEMPLATES, TEMPLATE_CATEGORIES } from "@/data/readyTemplates";
import { toast } from "sonner";

const PALETTES = [
  { id: "emerald-gold", name: "Imperial Emerald & Gold", primary: "#F5EEDB", accent: "#E0BE68", cardBg: "#09261C", bg: "#082218", textPrimary: "#FFFDF8", textMuted: "#CBD8CE", borderColor: "#C6A66B" },
  { id: "mughal-ruby", name: "Mughal Ruby Velvet", primary: "#FDE68A", accent: "#E5C158", cardBg: "#420B13", bg: "#3A070E", textPrimary: "#FFFDF5", textMuted: "#E2D3BE", borderColor: "#D4AF37" },
  { id: "walima-sapphire", name: "Royal Walima Sapphire", primary: "#FEF3C7", accent: "#E8C26E", cardBg: "#0B1A33", bg: "#071326", textPrimary: "#FFFDF9", textMuted: "#B4C8DF", borderColor: "#30568B" },
  { id: "mustard-marigold", name: "Gaye Holud Marigold", primary: "#853609", accent: "#E09A16", cardBg: "#FFF9E6", bg: "#FFF9E6", textPrimary: "#702A05", textMuted: "#9A501F", borderColor: "#E5A93C" },
  { id: "basanti-yellow", name: "Basanti Saffron Holud", primary: "#78350F", accent: "#D97706", cardBg: "#FEF3C7", bg: "#FEF3C7", textPrimary: "#5B2207", textMuted: "#8C4A19", borderColor: "#D97706" },
  { id: "henna-forest", name: "Henna Mehendi Forest", primary: "#FEF08A", accent: "#F59E0B", cardBg: "#0D2E1E", bg: "#082014", textPrimary: "#FFFDF7", textMuted: "#CFDDD3", borderColor: "#E5B942" },
  { id: "peacock-teal", name: "Peacock Teal & Gold", primary: "#FEF08A", accent: "#E2BF65", cardBg: "#042B28", bg: "#031F1D", textPrimary: "#FFFDF9", textMuted: "#A3D1CE", borderColor: "#19635C" },
  { id: "royal-amethyst", name: "Imperial Amethyst Violet", primary: "#FDE68A", accent: "#E5C158", cardBg: "#2B0B3E", bg: "#1F072D", textPrimary: "#FFFDFB", textMuted: "#D3BDDF", borderColor: "#58237A" },
  { id: "blush-cream", name: "Romantic Rose Blush", primary: "#881337", accent: "#D97706", cardBg: "#FFF1F2", bg: "#FFF1F2", textPrimary: "#6B0D28", textMuted: "#9F4D63", borderColor: "#FECDD3" },
  { id: "art-deco-noir", name: "24K Gold & Obsidian Noir", primary: "#FDE68A", accent: "#F5CE66", cardBg: "#0D0F14", bg: "#0A0B0E", textPrimary: "#FFFFFF", textMuted: "#A3ACB8", borderColor: "#C89D46" },
  { id: "terracotta-beige", name: "Terracotta Bronze", primary: "#FED7AA", accent: "#E29D4E", cardBg: "#541D10", bg: "#3F130A", textPrimary: "#FFFBF7", textMuted: "#DFB5A8", borderColor: "#B85532" },
  { id: "ivory-sage", name: "Ivory & Botanical Sage", primary: "#1C3825", accent: "#B89F60", cardBg: "#F6F8F5", bg: "#FAF8F4", textPrimary: "#152F1E", textMuted: "#536B5B", borderColor: "#D2DDD4" },
];

const TEMPLATES = [
  { id: "emerald-royal", name: "Emerald Royal", banglaName: "রয়্যাল এমারেল্ড", tag: "Imperial Gold", desc: "Regal borders & royal monogram seal" },
  { id: "mogul-heritage", name: "Mogul Heritage", banglaName: "মুঘল রাজকীয় ঐতিহ্য", tag: "Mughal Arch", desc: "Cusped arches, imperial ruby & golden jaali lattice" },
  { id: "celestial-sapphire", name: "Celestial Sapphire", banglaName: "নীল অপেরা ও তারা", tag: "Starlight Gold", desc: "Midnight navy blue night-sky with golden constellation dust" },
  { id: "traditional-celebration", name: "Traditional Vow", banglaName: "ঐতিহ্যবাহী শুভ পরিণয়", tag: "Paisley Kolka", desc: "Cultural paisley, Ashirbad blessing & authentic Bangla script" },
  { id: "ivory-floral", name: "Ivory Floral", banglaName: "আইভরি ফ্লোরাল", tag: "Botanical Wreath", desc: "Botanical watercolor eucalyptus and deckled edges" },
  { id: "vintage-botanical", name: "Vintage Botanical", banglaName: "ভিন্টেজ অলিভ", tag: "Deckled Linen", desc: "Warm deckled linen paper with engraved olive medallion" },
  { id: "golden-glamour", name: "Golden Glamour", banglaName: "স্বর্ণালী গ্ল্যামার", tag: "Art Deco", desc: "Art Deco 1920s fan chevrons, obsidian & gold foil luxury" },
  { id: "romantic-blush", name: "Romantic Blush", banglaName: "রোমান্টিক ব্লাশ", tag: "Vellum Rose", desc: "Soft rose undertones and translucent vellum ribbon sash" },
  { id: "modern-minimal", name: "Modern Minimal", banglaName: "মডার্ন মিনিমাল", tag: "High Editorial", desc: "Architectural negative space & clean editorial balance" },
];

export default function InvitationEditor({ invitationId }) {
  const router = useRouter();
  const { user, getIdToken } = useAuth();
  const cardElementRef = useRef(null);

  // Invitation State
  const [design, setDesign] = useState(null);
  const [title, setTitle] = useState("Wedding Invitation");
  const [status, setStatus] = useState("draft"); // 'draft' | 'published'
  const [saveStatus, setSaveStatus] = useState("saved"); // 'saving' | 'saved' | 'unsaved' | 'error'
  const [activeTab, setActiveTab] = useState("content"); // 'content' | 'typography' | 'colors' | 'templates' | 'decorations' | 'ai'
  const [previewDevice, setPreviewDevice] = useState("desktop"); // 'desktop' | 'mobile'
  const [zoomScale, setZoomScale] = useState(1);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Ready Presets Sub-tab States
  const [templateSubTab, setTemplateSubTab] = useState("presets"); // 'presets' | 'archetypes'
  const [presetSearch, setPresetSearch] = useState("");
  const [presetCategory, setPresetCategory] = useState("all");

  // Undo / Redo history
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load invitation on mount
  useEffect(() => {
    async function loadData() {
      // 1. Instant recovery from local draft cache if just created
      try {
        const cached = sessionStorage.getItem(`wedly_draft_${invitationId}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.design_json) {
            setDesign(parsed.design_json);
            setTitle(parsed.title || "My Bespoke Card");
            setStatus(parsed.status || "draft");
            setHistory([parsed.design_json]);
            setHistoryIndex(0);
          }
        }
      } catch (err) {
        console.warn("Local draft cache miss:", err);
      }

      // 2. Fetch remote saved invitation from API
      try {
        const token = await getIdToken();
        const res = await fetch(`/api/invitations/${invitationId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.design_json) {
            setDesign(json.data.design_json);
            setTitle(json.data.title || "My Bespoke Card");
            setStatus(json.data.status || "draft");
            setHistory([json.data.design_json]);
            setHistoryIndex(0);
            return;
          }
        }
      } catch (e) {
        console.warn("Could not load remote invitation:", e);
      }

      // Default fallback design if loading new or unsaved
      const defaultDesign = {
        template: "emerald-royal",
        language: "en",
        culturalStyle: "classic",
        orientation: "portrait",
        palette: PALETTES[0],
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
          monogram: "A&R",
        },
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
          bilingualBrideName: "আয়েশা",
          bilingualGroomName: "রাফিদ",
          bilingualMessage: "",
        },
      };

      setDesign(defaultDesign);
      setHistory([defaultDesign]);
      setHistoryIndex(0);
    }

    loadData();
  }, [invitationId]);

  // Update Design helper with history
  const updateDesign = (newDesign) => {
    setDesign(newDesign);
    setSaveStatus("unsaved");

    // Add to history
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(newDesign);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setDesign(prev);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setDesign(next);
    }
  };

  // Autosave with debouncing
  useEffect(() => {
    if (!design || saveStatus !== "unsaved") return;

    setSaveStatus("saving");
    const timer = setTimeout(async () => {
      try {
        const token = await getIdToken();
        const res = await fetch("/api/invitations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || "demo-token-user"}`,
          },
          body: JSON.stringify({
            id: invitationId,
            title,
            bride_name: design.content.brideName,
            groom_name: design.content.groomName,
            wedding_date: design.content.weddingDate,
            venue: design.content.venue,
            invitation_message: design.content.message,
            language: design.language,
            design_style: design.template,
            theme: design.template,
            color_palette: design.palette?.name || "custom",
            design_json: design,
            status,
          }),
        });

        if (res.ok) {
          setSaveStatus("saved");
        } else {
          setSaveStatus("error");
        }
      } catch (err) {
        console.error("Autosave error:", err);
        setSaveStatus("error");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [design, title, status, saveStatus, invitationId]);

  // Content field updater
  const handleContentChange = (field, value) => {
    if (!design) return;
    const next = {
      ...design,
      content: { ...design.content, [field]: value },
    };
    updateDesign(next);
  };

  // Quick AI Assistant action
  const handleAiAction = async (actionKey) => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/regenerate-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentDesign: design, action: actionKey }),
      });

      const json = await res.json();
      if (json.data) {
        updateDesign(json.data);
        toast.success("AI refinement applied!");
      }
    } catch (err) {
      console.error("AI refinement failed:", err);
      toast.error("Could not apply refinement");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Export handlers
  const handleExportPng = async () => {
    try {
      toast.loading("Preparing 300 DPI high-resolution PNG...", { id: "export" });
      const el = document.getElementById("wedly-invitation-card");
      await exportInvitationAsPng(el, `${title.replace(/\s+/g, "-").toLowerCase()}.png`);
      toast.success("PNG downloaded successfully!", { id: "export" });
    } catch (e) {
      toast.error("PNG export failed: " + e.message, { id: "export" });
    }
  };

  const handleExportPdf = async () => {
    try {
      toast.loading("Compiling 5×7 inch print-ready PDF...", { id: "export" });
      const el = document.getElementById("wedly-invitation-card");
      await exportInvitationAsPdf(
        el,
        `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`,
        design?.orientation || "portrait"
      );
      toast.success("PDF downloaded successfully!", { id: "export" });
    } catch (e) {
      toast.error("PDF export failed: " + e.message, { id: "export" });
    }
  };

  // Publish / Unpublish
  const togglePublish = async () => {
    const nextStatus = status === "published" ? "draft" : "published";
    setStatus(nextStatus);
    setSaveStatus("unsaved");
    toast.success(
      nextStatus === "published"
        ? "Invitation published! Public link is active."
        : "Invitation moved to private draft."
    );
  };

  if (!design) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center text-[#173D32] font-serif text-xl">
        Opening Wedly Studio...
      </div>
    );
  }

  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/invite/${invitationId}` : `/invite/${invitationId}`;

  return (
    <div className="h-screen flex flex-col bg-[#FAF8F4] overflow-hidden select-none">
      {/* Top Header Workspace Navigation */}
      <header className="h-16 bg-white border-b border-[#E8E2D8] px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 text-[#77766F] hover:text-[#173D32] hover:bg-[#FAF8F4] rounded transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSaveStatus("unsaved");
              }}
              className="font-serif text-base sm:text-lg font-semibold text-[#173D32] bg-transparent border-b border-transparent hover:border-[#E8E2D8] focus:border-[#C6A66B] outline-none max-w-xs transition-colors"
            />
            <div className="flex items-center gap-2 text-[10px] font-sans">
              <span
                className={`w-2 h-2 rounded-full ${
                  saveStatus === "saved"
                    ? "bg-[#285C49]"
                    : saveStatus === "saving"
                    ? "bg-[#C6A66B] animate-pulse"
                    : saveStatus === "error"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              />
              <span className="text-[#77766F] uppercase tracking-wider font-semibold">
                {saveStatus === "saved"
                  ? "Saved to Cloud"
                  : saveStatus === "saving"
                  ? "Saving..."
                  : saveStatus === "error"
                  ? "Save Error"
                  : "Unsaved Changes"}
              </span>
              <span className="text-[#E8E2D8]">|</span>
              <span
                className={`uppercase tracking-wider font-bold ${
                  status === "published" ? "text-[#285C49]" : "text-[#77766F]"
                }`}
              >
                {status === "published" ? "Live / Published" : "Draft"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Undo/Redo, Export, Share */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center border border-[#E8E2D8] rounded bg-[#FAF8F4]">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 text-[#77766F] hover:text-[#173D32] disabled:opacity-30 transition-colors"
              title="Undo"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <span className="w-[1px] h-4 bg-[#E8E2D8]" />
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 text-[#77766F] hover:text-[#173D32] disabled:opacity-30 transition-colors"
              title="Redo"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Export Dropdown / Buttons */}
          <button
            onClick={handleExportPng}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-[#FAF8F4] border border-[#E8E2D8] hover:bg-[#F1E9DA] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>PNG</span>
          </button>

          <button
            onClick={handleExportPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#173D32] hover:bg-[#285C49] shadow-sm transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={() => setShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-[#FAF8F4] border border-[#E8E2D8] hover:bg-[#F1E9DA] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Main 2-Column Desktop Studio Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Editing Controls Panel (380px) */}
        <aside className="w-full md:w-96 lg:w-[420px] bg-white border-r border-[#E8E2D8] flex flex-col shrink-0 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#E8E2D8] bg-[#FAF8F4] overflow-x-auto text-xs font-sans">
            {[
              { id: "content", label: "Text", icon: Type },
              { id: "colors", label: "Palette", icon: Palette },
              { id: "templates", label: "Template", icon: Layout },
              { id: "decorations", label: "Decor", icon: Sliders },
              { id: "ai", label: "AI Magic", icon: Sparkles },
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-3 font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[#173D32] text-[#173D32] bg-white"
                      : "border-transparent text-[#77766F] hover:text-[#173D32]"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* TAB: CONTENT / TEXT */}
            {activeTab === "content" && (
              <div className="space-y-4">
                {/* Language & Script Selector */}
                <div className="p-3 bg-[#FAF8F4] rounded-lg border border-[#E8E2D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                      কার্ডের ভাষা / Script Language
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#9A7C43] border border-[#E8E2D8]">
                      {design.language === "bn"
                        ? "বাংলা"
                        : design.language === "bilingual"
                        ? "দ্বিভাষিক"
                        : "English"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "en", label: "English" },
                      { id: "bn", label: "বাংলা (Bangla)" },
                      { id: "bilingual", label: "Bilingual" },
                    ].map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          const isNowBn = l.id === "bn";
                          updateDesign({
                            ...design,
                            language: l.id,
                            typography: {
                              ...design.typography,
                              headingFont: isNowBn ? "Hind Siliguri" : "Playfair Display",
                              bodyFont: isNowBn ? "Hind Siliguri" : "DM Sans",
                            },
                          });
                        }}
                        className={`py-1.5 px-2 rounded text-xs font-medium transition-all ${
                          design.language === l.id
                            ? "bg-[#173D32] text-white shadow-xs"
                            : "bg-white text-[#77766F] hover:text-[#173D32] border border-[#E8E2D8]"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>

                  {/* Cultural Tradition Archetype */}
                  <div className="pt-2 border-t border-[#E8E2D8] space-y-1">
                    <label className="text-[10px] font-sans font-semibold text-[#77766F] uppercase">
                      সাংস্কৃতিক ধারা / Cultural Tradition
                    </label>
                    <select
                      value={design.culturalStyle || "classic"}
                      onChange={(e) => {
                        updateDesign({
                          ...design,
                          culturalStyle: e.target.value,
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded border border-[#E8E2D8] text-xs bg-white text-[#252923] outline-none"
                    >
                      <option value="classic">Classic Western / Royal</option>
                      <option value="islamic">Islamic (বিসমিল্লাহ্ / Nikah)</option>
                      <option value="bangladeshi">Traditional Bengali (মাঙ্গলিক পরিণয়)</option>
                      <option value="hindu">Traditional Hindu (॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    {design.content.cardPurpose === "birthday"
                      ? "Birthday Person's Name"
                      : design.content.cardPurpose === "corporate"
                      ? "Event / Gala Title"
                      : design.content.cardPurpose === "invitation"
                      ? "Host / Honoree Name"
                      : "Bride's Name"}
                  </label>
                  <input
                    type="text"
                    value={design.content.brideName}
                    onChange={(e) => handleContentChange("brideName", e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:border-[#C6A66B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    {design.content.cardPurpose === "birthday"
                      ? "Co-Celebrant / Subtitle (Optional)"
                      : design.content.cardPurpose === "corporate"
                      ? "Organization / Company Name"
                      : design.content.cardPurpose === "invitation"
                      ? "Partner / Co-Host (Optional)"
                      : "Groom's Name"}
                  </label>
                  <input
                    type="text"
                    value={design.content.groomName || ""}
                    onChange={(e) => handleContentChange("groomName", e.target.value)}
                    placeholder="Leave blank if single host"
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:border-[#C6A66B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    Occasion / Milestone Tag (e.g. Turning 5, 25th Jubilee)
                  </label>
                  <input
                    type="text"
                    value={design.content.eventMilestone || ""}
                    onChange={(e) => handleContentChange("eventMilestone", e.target.value)}
                    placeholder="Optional milestone note"
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:border-[#C6A66B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    Card Heading Title
                  </label>
                  <input
                    type="text"
                    value={design.content.title}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:border-[#C6A66B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    Subtitle / Verse
                  </label>
                  <input
                    type="text"
                    value={design.content.subtitle}
                    onChange={(e) => handleContentChange("subtitle", e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:border-[#C6A66B] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                      Date
                    </label>
                    <input
                      type="text"
                      value={design.content.weddingDate}
                      onChange={(e) => handleContentChange("weddingDate", e.target.value)}
                      className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-xs text-[#252923] focus:border-[#C6A66B] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                      Time
                    </label>
                    <input
                      type="text"
                      value={design.content.weddingTime || ""}
                      onChange={(e) => handleContentChange("weddingTime", e.target.value)}
                      className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-xs text-[#252923] focus:border-[#C6A66B] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={design.content.venue}
                    onChange={(e) => handleContentChange("venue", e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:border-[#C6A66B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    City & Country
                  </label>
                  <input
                    type="text"
                    value={design.content.city || ""}
                    onChange={(e) => handleContentChange("city", e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:border-[#C6A66B] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    Invitation Message
                  </label>
                  <textarea
                    rows={3}
                    value={design.content.message}
                    onChange={(e) => handleContentChange("message", e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-xs text-[#252923] focus:border-[#C6A66B] outline-none resize-none"
                  />
                </div>

                {/* Bilingual Bengali Fields */}
                <div className="pt-2 border-t border-[#E8E2D8] space-y-3">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#C6A66B] block">
                    Bilingual / Bangla Content
                  </span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-semibold text-[#77766F]">
                      বাংলা বর ও কনের নাম
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={design.content.bilingualBrideName || ""}
                        onChange={(e) => handleContentChange("bilingualBrideName", e.target.value)}
                        placeholder="কনের নাম"
                        className="w-full px-2.5 py-1.5 rounded border border-[#E8E2D8] text-xs"
                      />
                      <input
                        type="text"
                        value={design.content.bilingualGroomName || ""}
                        onChange={(e) => handleContentChange("bilingualGroomName", e.target.value)}
                        placeholder="বরের নাম"
                        className="w-full px-2.5 py-1.5 rounded border border-[#E8E2D8] text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-semibold text-[#77766F]">
                      বাংলা নিমন্ত্রণ বার্তা
                    </label>
                    <textarea
                      rows={2}
                      value={design.content.bilingualMessage || ""}
                      onChange={(e) => handleContentChange("bilingualMessage", e.target.value)}
                      placeholder="বাংলা বার্তা..."
                      className="w-full px-2.5 py-1.5 rounded border border-[#E8E2D8] text-xs resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COLOR PALETTE */}
            {activeTab === "colors" && (
              <div className="space-y-4">
                <span className="font-sans text-xs font-semibold text-[#173D32] block">
                  Select Preset Color Scheme
                </span>
                <div className="space-y-2">
                  {PALETTES.map((pal) => (
                    <div
                      key={pal.id}
                      onClick={() => {
                        const next = {
                          ...design,
                          palette: {
                            ...design.palette,
                            name: pal.name,
                            background: pal.bg,
                            primary: pal.primary,
                            accent: pal.accent,
                            cardBg: pal.cardBg,
                            textPrimary: pal.primary,
                          },
                        };
                        updateDesign(next);
                      }}
                      className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        design.palette?.name === pal.name
                          ? "bg-[#FAF8F4] border-[#C6A66B] ring-1 ring-[#C6A66B]"
                          : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <span
                            className="w-6 h-6 rounded-full border border-black/10"
                            style={{ backgroundColor: pal.primary }}
                          />
                          <span
                            className="w-6 h-6 rounded-full border border-black/10"
                            style={{ backgroundColor: pal.accent }}
                          />
                        </div>
                        <span className="font-sans text-xs font-medium text-[#252923]">
                          {pal.name}
                        </span>
                      </div>
                      {design.palette?.name === pal.name && <Check className="w-4 h-4 text-[#173D32]" />}
                    </div>
                  ))}
                </div>

                {/* Custom Pickers */}
                <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
                  <span className="font-sans text-xs font-semibold text-[#173D32] block">
                    Custom Ink Colors
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#77766F]">Primary Typography</span>
                    <input
                      type="color"
                      value={design.palette?.primary || "#173D32"}
                      onChange={(e) => {
                        updateDesign({
                          ...design,
                          palette: {
                            ...design.palette,
                            primary: e.target.value,
                            textPrimary: e.target.value,
                          },
                        });
                      }}
                      className="w-8 h-8 rounded border border-[#E8E2D8] cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#77766F]">Metallic Foil Accent</span>
                    <input
                      type="color"
                      value={design.palette?.accent || "#C6A66B"}
                      onChange={(e) => {
                        updateDesign({
                          ...design,
                          palette: { ...design.palette, accent: e.target.value },
                        });
                      }}
                      className="w-8 h-8 rounded border border-[#E8E2D8] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TEMPLATES */}
            {activeTab === "templates" && (
              <div className="space-y-4">
                {/* Sub-tab navigation */}
                <div className="flex items-center gap-1 bg-[#FAF8F4] p-1 rounded-xl border border-[#E8E2D8]">
                  <button
                    type="button"
                    onClick={() => setTemplateSubTab("presets")}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      templateSubTab === "presets"
                        ? "bg-[#173D32] text-white shadow-xs"
                        : "text-[#77766F] hover:text-[#173D32]"
                    }`}
                  >
                    108+ Presets (১০৮টি)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplateSubTab("archetypes")}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      templateSubTab === "archetypes"
                        ? "bg-[#173D32] text-white shadow-xs"
                        : "text-[#77766F] hover:text-[#173D32]"
                    }`}
                  >
                    Base Engines (৯টি)
                  </button>
                </div>

                {templateSubTab === "presets" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-semibold text-[#173D32]">
                        108+ Ready Design Presets
                      </span>
                      <Link
                        href="/templates"
                        target="_blank"
                        className="text-[11px] text-[#C6A66B] hover:text-[#173D32] font-semibold underline flex items-center gap-0.5"
                      >
                        <span>Full Gallery</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Search & Category Filter */}
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <Search className="w-3.5 h-3.5 text-[#888A85] absolute left-3 pointer-events-none" />
                        <input
                          type="text"
                          value={presetSearch}
                          onChange={(e) => setPresetSearch(e.target.value)}
                          placeholder="Search 108 presets..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-[#E8E2D8] text-[#173D32] placeholder:text-[#9A9890] outline-none focus:border-[#173D32]"
                        />
                      </div>

                      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                        {TEMPLATE_CATEGORIES.slice(0, 6).map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setPresetCategory(c.id)}
                            className={`px-2 py-0.5 rounded-md text-[11px] whitespace-nowrap transition-colors ${
                              presetCategory === c.id
                                ? "bg-[#173D32] text-white"
                                : "bg-white text-[#77766F] border border-[#E8E2D8] hover:bg-[#FAF8F4]"
                            }`}
                          >
                            {c.name.split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Presets List */}
                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {READY_TEMPLATES.filter((p) => {
                        const matchCat = presetCategory === "all" || p.category === presetCategory;
                        const matchQ =
                          !presetSearch.trim() ||
                          p.title.toLowerCase().includes(presetSearch.toLowerCase()) ||
                          p.banglaTitle.includes(presetSearch) ||
                          p.categoryLabel.toLowerCase().includes(presetSearch.toLowerCase());
                        return matchCat && matchQ;
                      })
                        .slice(0, 30)
                        .map((preset) => {
                          const isActive = design.template === preset.design.template;
                          return (
                            <div
                              key={preset.id}
                              className={`p-2.5 rounded-xl border transition-all ${
                                isActive
                                  ? "bg-[#FAF8F4] border-[#C6A66B] ring-1 ring-[#C6A66B]"
                                  : "bg-white border-[#E8E2D8] hover:border-[#C6A66B]/50"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-serif text-xs font-semibold text-[#173D32]">
                                  {preset.banglaTitle}
                                </span>
                                <div className="flex items-center gap-1">
                                  {preset.colorSummary.map((c, i) => (
                                    <span
                                      key={i}
                                      className="w-2 h-2 rounded-full border border-black/10"
                                      style={{ backgroundColor: c }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <span className="text-[10px] text-[#77766F] block truncate mb-2">
                                {preset.title} • {preset.badge}
                              </span>

                              <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#F0EBE1]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Apply style & palette while preserving user's event content
                                    updateDesign({
                                      ...design,
                                      template: preset.design.template,
                                      palette: preset.design.palette,
                                      culturalStyle: preset.design.culturalStyle,
                                      decorations: preset.design.decorations,
                                    });
                                    toast.success(`Theme Applied: ${preset.banglaTitle}`, {
                                      description: "Updated colors, layout & ornamentation while preserving your text.",
                                    });
                                  }}
                                  className="flex-1 py-1 px-2 rounded text-[10px] font-semibold bg-[#173D32] text-white hover:bg-[#285C49] transition-colors"
                                >
                                  Apply Theme
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Load entire preset including content
                                    updateDesign(preset.design);
                                    toast.success(`Loaded Preset: ${preset.banglaTitle}`, {
                                      description: "Full design and specimen details loaded.",
                                    });
                                  }}
                                  className="py-1 px-2 rounded text-[10px] font-medium bg-[#FAF8F4] text-[#173D32] border border-[#E8E2D8] hover:bg-white transition-colors"
                                >
                                  Load Demo
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {templateSubTab === "archetypes" && (
                  <div className="space-y-2.5">
                    <span className="font-sans text-xs font-semibold text-[#173D32] block mb-1">
                      Choose Layout Structure
                    </span>
                    {TEMPLATES.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => {
                          updateDesign({ ...design, template: tmpl.id });
                        }}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          design.template === tmpl.id
                            ? "bg-[#FAF8F4] border-[#C6A66B] ring-2 ring-[#C6A66B]/50 shadow-sm"
                            : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4] hover:border-[#C6A66B]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-semibold text-[#173D32]">
                              {tmpl.name}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#9A7C43]/10 text-[#9A7C43]">
                              {tmpl.tag}
                            </span>
                          </div>
                          {design.template === tmpl.id && <Check className="w-4 h-4 text-[#173D32]" />}
                        </div>
                        {tmpl.banglaName && (
                          <span className="font-sans text-[11px] text-[#9A7C43] font-medium block">
                            {tmpl.banglaName}
                          </span>
                        )}
                        <p className="font-sans text-[11px] text-[#77766F] mt-0.5 leading-snug">
                          {tmpl.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-[#E8E2D8] space-y-2">
                  <span className="font-sans text-xs font-semibold text-[#173D32] block">
                    Card Orientation
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {["portrait", "landscape"].map((orient) => (
                      <button
                        key={orient}
                        type="button"
                        onClick={() => updateDesign({ ...design, orientation: orient })}
                        className={`py-2 px-3 rounded text-xs font-semibold uppercase tracking-wider border ${
                          design.orientation === orient
                            ? "bg-[#173D32] text-white border-[#173D32]"
                            : "bg-[#FAF8F4] text-[#252923] border-[#E8E2D8]"
                        }`}
                      >
                        {orient}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DECORATIONS */}
            {activeTab === "decorations" && (
              <div className="space-y-4">
                <span className="font-sans text-xs font-semibold text-[#173D32] block">
                  Embossed Accents & Filigree
                </span>
                <div className="space-y-2.5">
                  {[
                    { key: "hasFloralCorners", label: "Gilded Floral Corners" },
                    { key: "hasInnerFrame", label: "Dual Inset Border Frame" },
                    { key: "hasWaxSeal", label: "Wax Seal Monogram Stamp" },
                    { key: "hasBotanicalBranch", label: "Botanical Eucalyptus Branch" },
                    { key: "hasTraditionalMotif", label: "Traditional Paisley / Arabesque" },
                  ].map((dec) => {
                    const isChecked = Boolean(design.decorations?.[dec.key]);
                    return (
                      <div
                        key={dec.key}
                        onClick={() => {
                          updateDesign({
                            ...design,
                            decorations: {
                              ...design.decorations,
                              [dec.key]: !isChecked,
                            },
                          });
                        }}
                        className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? "bg-[#FAF8F4] border-[#C6A66B]"
                            : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4]"
                        }`}
                      >
                        <span className="font-sans text-xs text-[#252923]">
                          {dec.label}
                        </span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? "bg-[#173D32] border-[#173D32] text-white"
                              : "border-[#77766F]"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-[#E8E2D8] space-y-1">
                  <label className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#173D32]">
                    Monogram Initials
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={design.decorations?.monogram || ""}
                    onChange={(e) => {
                      updateDesign({
                        ...design,
                        decorations: {
                          ...design.decorations,
                          monogram: e.target.value.toUpperCase(),
                        },
                      });
                    }}
                    placeholder="e.g. A&R"
                    className="w-full px-3 py-2 rounded border border-[#E8E2D8] text-sm text-[#252923] uppercase"
                  />
                </div>
              </div>
            )}

            {/* TAB: QUICK AI ACTIONS */}
            {activeTab === "ai" && (
              <div className="space-y-4">
                <div className="bg-[#FAF8F4] p-3.5 rounded border border-[#E8E2D8] space-y-1">
                  <span className="font-sans text-xs font-bold text-[#173D32] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
                    <span>Gemini AI Art Director</span>
                  </span>
                  <p className="font-sans text-[11px] text-[#77766F] leading-relaxed">
                    Click any quick direction below to have Gemini adjust the composition while preserving your couple details.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { action: "more-luxurious", label: "Make it more luxurious", desc: "Emerald & gold tones, royal borders, seal stamp" },
                    { action: "floral-style", label: "Try a different floral style", desc: "Ivory botanical wash, wild olive branch details" },
                    { action: "more-minimal", label: "Make it more minimal", desc: "Clean lines, generous negative space, sleek fonts" },
                    { action: "traditional", label: "Use traditional cultural styling", desc: "Burgundy gold, paisley arabesque, bilingual script" },
                    { action: "improve-wording", label: "Improve invitation wording", desc: "Polished romantic ceremonial poetry" },
                  ].map((btn) => (
                    <button
                      key={btn.action}
                      disabled={isAiLoading}
                      onClick={() => handleAiAction(btn.action)}
                      className="w-full text-left p-3.5 rounded bg-white border border-[#E8E2D8] hover:border-[#C6A66B] hover:bg-[#FAF8F4] transition-all shadow-sm group disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs font-bold text-[#173D32] group-hover:text-[#285C49]">
                          {btn.label}
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
                      </div>
                      <p className="font-sans text-[11px] text-[#77766F] mt-0.5">
                        {btn.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Interactive Stationery Stage */}
        <main className="flex-1 bg-[#FAF8F4] flex flex-col overflow-hidden relative">
          {/* Top Stage Bar: Zoom Controls & Device Switcher */}
          <div className="h-12 bg-white/70 backdrop-blur-md border-b border-[#E8E2D8] px-6 flex items-center justify-between z-10 shrink-0">
            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-[#FAF8F4] p-1 rounded border border-[#E8E2D8]">
              <button
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded transition-colors ${
                  previewDevice === "desktop"
                    ? "bg-white text-[#173D32] shadow-sm"
                    : "text-[#77766F] hover:text-[#173D32]"
                }`}
                title="Desktop Canvas"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded transition-colors ${
                  previewDevice === "mobile"
                    ? "bg-white text-[#173D32] shadow-sm"
                    : "text-[#77766F] hover:text-[#173D32]"
                }`}
                title="Mobile Screen Frame"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomScale((s) => Math.max(0.6, s - 0.1))}
                className="p-1.5 rounded text-[#77766F] hover:text-[#173D32] hover:bg-[#FAF8F4]"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-sans text-xs text-[#77766F] w-12 text-center font-medium">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale((s) => Math.min(1.4, s + 0.1))}
                className="p-1.5 rounded text-[#77766F] hover:text-[#173D32] hover:bg-[#FAF8F4]"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas Stage Viewport */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-6 sm:p-12 relative">
            {/* Ambient Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#C6A66B 0.75px, transparent 0.75px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Mobile Device Mockup Frame (if mobile selected) */}
            {previewDevice === "mobile" ? (
              <div className="relative rounded-[40px] p-3 bg-[#252923] shadow-2xl border-4 border-[#3A3D39] max-w-[380px] w-full">
                {/* Notch */}
                <div className="w-24 h-4 bg-[#252923] rounded-full mx-auto mb-2" />
                <div className="rounded-[30px] overflow-hidden bg-[#FAF8F4] p-3 flex items-center justify-center min-h-[520px]">
                  <div className="transform scale-[0.75] origin-center">
                    <InvitationRenderer design={design} scale={1} />
                  </div>
                </div>
              </div>
            ) : (
              /* Desktop Clean Canvas */
              <div
                className="transition-transform duration-200"
                style={{ transform: `scale(${zoomScale})` }}
              >
                <InvitationRenderer design={design} scale={1} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* SHARE / PUBLISH MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 border border-[#E8E2D8] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF8F4]">
              <div className="space-y-0.5">
                <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                  Public Invitation Sharing
                </span>
                <h3 className="font-serif text-2xl text-[#173D32]">
                  Share Your Celebration
                </h3>
              </div>
              <button
                onClick={() => setShareModalOpen(false)}
                className="p-1 text-[#77766F] hover:text-[#173D32]"
              >
                ✕
              </button>
            </div>

            {/* Toggle Published Status */}
            <div className="bg-[#FAF8F4] p-4 rounded-lg border border-[#E8E2D8] flex items-center justify-between">
              <div>
                <span className="font-sans text-xs font-semibold text-[#173D32] block">
                  Public Link Visibility
                </span>
                <span className="font-sans text-[11px] text-[#77766F]">
                  {status === "published"
                    ? "Invitation is live and viewable via public link."
                    : "Invitation is currently private to your account."}
                </span>
              </div>
              <button
                onClick={togglePublish}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  status === "published"
                    ? "bg-[#285C49] text-white"
                    : "bg-[#E8E2D8] text-[#77766F] hover:bg-[#173D32] hover:text-white"
                }`}
              >
                {status === "published" ? "Published" : "Make Live"}
              </button>
            </div>

            {/* Link Copy Box */}
            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold text-[#173D32]">
                Unique Invitation URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={publicUrl}
                  className="flex-1 px-3 py-2 rounded border border-[#E8E2D8] text-xs text-[#252923] bg-[#FAF8F4]"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(publicUrl);
                    toast.success("Invitation link copied to clipboard!");
                  }}
                  className="p-2 bg-[#173D32] text-white rounded hover:bg-[#285C49] transition-colors"
                  title="Copy Link"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={`/invite/${invitationId}`}
                target="_blank"
                className="flex-1 py-2.5 rounded bg-[#FAF8F4] border border-[#E8E2D8] text-xs font-semibold uppercase tracking-wider text-[#173D32] hover:bg-[#F1E9DA] transition-colors flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C6A66B]" />
                <span>Open Live Page</span>
              </Link>
              <button
                onClick={() => setShareModalOpen(false)}
                className="px-5 py-2.5 rounded bg-[#173D32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#285C49] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
