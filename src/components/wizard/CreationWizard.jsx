"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTemplateById } from "@/data/readyTemplates";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Palette,
  Check,
  Languages,
  Layers,
  Wand2,
  AlertCircle,
  FileText,
  Cake,
  Mail,
  Building2,
  PartyPopper,
  Gift,
} from "lucide-react";
import InvitationRenderer from "@/components/invitation-templates/InvitationRenderer";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export const PURPOSE_OPTIONS = [
  {
    id: "wedding",
    name: "Wedding & Reception",
    banglaName: "শুভ বিবাহ ও সংবর্ধনা",
    tag: "Royal Matrimony",
    desc: "Luxury wedding invitations, Walima, Nikah, Gaye Holud & bridal ceremonies.",
    icon: Heart,
    iconColor: "text-rose-600 bg-rose-50 border-rose-200",
    defaultBride: "Ayesha Rahman",
    defaultGroom: "Rafid Chowdhury",
    defaultMilestone: "",
    defaultMessage:
      "Together with our families, we invite you to celebrate our special day with love and blessings.",
    defaultFamily: "Mr. & Mrs. Rahman and Mr. & Mrs. Chowdhury",
    palette: "emerald-gold",
    style: "luxury",
  },
  {
    id: "birthday",
    name: "Birthday Celebration",
    banglaName: "শুভ জন্মদিন উৎসব",
    tag: "Festive & Joyful",
    desc: "Milestone birthdays, kids birthday bashes, sweet 16 & joyful celebration parties.",
    icon: Cake,
    iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    defaultBride: "Ayaan Chowdhury",
    defaultGroom: "",
    defaultMilestone: "Turning 5 Years Old!",
    defaultMessage:
      "Join us for an evening of joyous laughter, delicious cake, fun games, and memorable celebration!",
    defaultFamily: "Hosted with love by the Chowdhury Family",
    palette: "blush-cream",
    style: "floral",
  },
  {
    id: "invitation",
    name: "General Invitation & Party",
    banglaName: "বিশেষ নিমন্ত্রণ ও পার্টি",
    tag: "Warm & Celebratory",
    desc: "Anniversary gatherings, dinner parties, housewarming, baby showers & family reunions.",
    icon: Mail,
    iconColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    defaultBride: "The Rahman Family",
    defaultGroom: "",
    defaultMilestone: "25th Silver Wedding Anniversary",
    defaultMessage:
      "We warmly welcome you to join our family in celebration, heartfelt conversations, and fine dining.",
    defaultFamily: "Hosted by Ayesha & Rafid Rahman",
    palette: "burgundy-champagne",
    style: "luxury",
  },
  {
    id: "corporate",
    name: "Corporate & Formal Gala",
    banglaName: "কর্পোরেট ও আনুষ্ঠানিক ইভেন্ট",
    tag: "Executive Black-Tie",
    desc: "Annual summits, executive gala dinners, grand openings, awards & business banquets.",
    icon: Building2,
    iconColor: "text-blue-700 bg-blue-50 border-blue-200",
    defaultBride: "TechVision Annual Gala 2027",
    defaultGroom: "",
    defaultMilestone: "Executive Banquet & Innovation Summit",
    defaultMessage:
      "Cordially requests the honour of your company for an evening of networking, dinner, and innovation.",
    defaultFamily: "Apex Global Holdings & Partners",
    palette: "navy-gold",
    style: "minimalist",
  },
  {
    id: "other",
    name: "Custom / Something Else",
    banglaName: "অন্যান্য বিশেষ উপলক্ষ্য",
    tag: "Artisanal & Bespoke",
    desc: "Graduation soirée, retirement, religious milestones, or bespoke social affairs.",
    icon: Wand2,
    iconColor: "text-purple-700 bg-purple-50 border-purple-200",
    defaultBride: "Tanvir Hasan",
    defaultGroom: "",
    defaultMilestone: "Class of 2027 Graduation Soirée",
    defaultMessage:
      "Please join us in commemorating this extraordinary milestone and celebrating the exciting road ahead.",
    defaultFamily: "Proudly hosted by the Hasan Family",
    palette: "terracotta-beige",
    style: "minimalist",
  },
];

const BANGLA_DEFAULTS = {
  wedding: {
    brideName: "আয়েশা রহমান",
    groomName: "রাফিদ চৌধুরী",
    eventMilestone: "",
    venue: "দ্য প্যালেস গ্র্যান্ড বলরুম",
    city: "ঢাকা, বাংলাদেশ",
    invitationMessage:
      "পরিবারের সবার পক্ষ থেকে আমাদের শুভ পরিণয় অনুষ্ঠানে আপনার সাদর উপস্থিতি ও আশীর্বাদ কামনা করছি।",
    familyNames: "রহমান পরিবার ও চৌধুরী পরিবার",
    rsvpDetails: "যোগাযোগ ও নিশ্চিতকরণ: ০১৭১২-৩৪৫৬৭৮",
  },
  birthday: {
    brideName: "আরিয়ান আহমেদ",
    groomName: "",
    eventMilestone: "৫ম শুভ জন্মদিন উদযাপন",
    venue: "রেডিসন ব্লু ওয়াটার গার্ডেন",
    city: "ঢাকা",
    invitationMessage:
      "আমাদের প্রিয় সন্তানের আনন্দময় জন্মদিনের সন্ধ্যায় আপনি সবান্ধব আমন্ত্রিত।",
    familyNames: "আহমেদ পরিবার",
    rsvpDetails: "যোগাযোগ: ০১৮১১-২২৩৩৪৪",
  },
  invitation: {
    brideName: "রহমান পরিবার",
    groomName: "",
    eventMilestone: "শুভ রজত জয়ন্তী উৎসব (২৫ বছর)",
    venue: "লে মেরিডিয়ান ঢাকা",
    city: "ঢাকা, বাংলাদেশ",
    invitationMessage:
      "আমাদের পারিবারিক মেলবন্ধন ও আনন্দ উৎসবে আপনার শুভ উপস্থিতি বিনীতভাবে প্রার্থনা করি।",
    familyNames: "আয়েশা ও রাফিদ রহমান",
    rsvpDetails: "যোগাযোগ: ০১৭১১-৯৮৭৬৫৪",
  },
  corporate: {
    brideName: "টেকভিশন অ্যানুয়াল গ্যালা ২০২৭",
    groomName: "",
    eventMilestone: "বার্ষিক সম্মেলন ও এক্সিকিউটিভ ডিনার",
    venue: "শেরাটন গ্র্যান্ড বলরুম",
    city: "ঢাকা",
    invitationMessage:
      "আমাদের বাৎসরিক সাফল্য ও উদ্ভাবনী উদযাপনে আপনার সানন্দ উপস্থিতি আমাদের সম্মানিত করবে।",
    familyNames: "অ্যাপেক্স গ্লোবাল ও অংশীদারবৃন্দ",
    rsvpDetails: "আরএসভিপি: event@apexglobal.com",
  },
  other: {
    brideName: "তানভীর হাসান",
    groomName: "",
    eventMilestone: "গ্র্যাজুয়েশন ও সাফল্য উদযাপন",
    venue: "ওয়েস্টিন ঢাকা",
    city: "ঢাকা",
    invitationMessage:
      "আমাদের এই আনন্দঘন মুহূর্তে আপনাদের সানন্দ উপস্থিতি ও দোয়া একান্তভাবে কামনা করছি।",
    familyNames: "হাসান পরিবার",
    rsvpDetails: "যোগাযোগ: ০১৭১২-০০১১২২",
  },
};

const ENGLISH_DEFAULTS = {
  wedding: {
    brideName: "Ayesha Rahman",
    groomName: "Rafid Chowdhury",
    eventMilestone: "",
    venue: "The Palace Grand Ballroom",
    city: "Dhaka, Bangladesh",
    invitationMessage:
      "Together with our families, we invite you to celebrate our special day with love and blessings.",
    familyNames: "Mr. & Mrs. Rahman and Mr. & Mrs. Chowdhury",
    rsvpDetails: "RSVP by November 1st • wedly.ai/rsvp",
  },
  birthday: {
    brideName: "Ayaan Chowdhury",
    groomName: "",
    eventMilestone: "Turning 5 Years Old!",
    venue: "Radisson Blu Water Garden",
    city: "Dhaka",
    invitationMessage:
      "Come celebrate with games, cake, bouncy castles, and endless fun!",
    familyNames: "The Chowdhury Family",
    rsvpDetails: "RSVP to Sarah at 01711-000000",
  },
  invitation: {
    brideName: "The Rahman Family",
    groomName: "",
    eventMilestone: "25th Silver Wedding Anniversary",
    venue: "Le Méridien Ballroom",
    city: "Dhaka",
    invitationMessage:
      "We warmly welcome you to join our family in celebration, heartfelt conversations, and fine dining.",
    familyNames: "Hosted by Ayesha & Rafid Rahman",
    rsvpDetails: "RSVP by Nov 10",
  },
  corporate: {
    brideName: "TechVision Annual Gala 2027",
    groomName: "",
    eventMilestone: "Executive Banquet & Innovation Summit",
    venue: "Sheraton Grand Ballroom",
    city: "Dhaka",
    invitationMessage:
      "Cordially requests the honour of your company for an evening of networking, dinner, and innovation.",
    familyNames: "Apex Global Holdings & Partners",
    rsvpDetails: "RSVP to gala@techvision.io",
  },
  other: {
    brideName: "Tanvir Hasan",
    groomName: "",
    eventMilestone: "Class of 2027 Graduation Soirée",
    venue: "The Westin",
    city: "Dhaka",
    invitationMessage:
      "Please join us in commemorating this extraordinary milestone and celebrating the exciting road ahead.",
    familyNames: "Proudly hosted by the Hasan Family",
    rsvpDetails: "RSVP to 01712-001122",
  },
};

const PALETTE_OPTIONS = [
  {
    id: "emerald-gold",
    name: "Emerald & Gold",
    primary: "#173D32",
    accent: "#C6A66B",
    cardBg: "#FFFFFF",
    bg: "#FAF8F4",
    desc: "Imperial Forest & Antique Champagne Foil",
  },
  {
    id: "burgundy-champagne",
    name: "Burgundy & Champagne",
    primary: "#5A1827",
    accent: "#D4AF37",
    cardBg: "#FAF7F5",
    bg: "#FAF7F5",
    desc: "Imperial Bordeaux Wine & 24K Gold Foil",
  },
  {
    id: "ivory-sage",
    name: "Ivory & Sage",
    primary: "#2C402E",
    accent: "#B8A375",
    cardBg: "#FAF8F4",
    bg: "#F9F8F5",
    desc: "Cotton Rag Ground & Muted Botanical Sage",
  },
  {
    id: "blush-cream",
    name: "Blush Pink & Cream",
    primary: "#6B3B48",
    accent: "#C6A66B",
    cardBg: "#FCF8F7",
    bg: "#FCF8F7",
    desc: "Pressed Peony Rose & Translucent Cream",
  },
  {
    id: "navy-gold",
    name: "Navy & Gold",
    primary: "#12233C",
    accent: "#CFA758",
    cardBg: "#FFFFFF",
    bg: "#F6F8FB",
    desc: "Midnight Indigo & Starlit Gold Inks",
  },
  {
    id: "terracotta-beige",
    name: "Terracotta & Beige",
    primary: "#8B4731",
    accent: "#C89D66",
    cardBg: "#FFFFFF",
    bg: "#FAF7F4",
    desc: "Warm Mediterranean Clay & Sunlit Linen",
  },
];

const STYLE_OPTIONS = [
  {
    id: "luxury",
    name: "Emerald Royal",
    banglaName: "রয়্যাল এমারেল্ড ও গোল্ড সিল",
    template: "emerald-royal",
    badge: "Imperial Gold",
    desc: "Gilded bevels, baroque corner filigree and hot-stamped royal monograms.",
    category: "royal",
    defaultPalette: "emerald-gold",
  },
  {
    id: "mogul",
    name: "Mogul Heritage",
    banglaName: "মুঘল রাজকীয় ঐতিহ্য (তোরণ খিলান)",
    template: "mogul-heritage",
    badge: "Mughal Arch",
    desc: "Authentic cusped Mughal arches, imperial ruby foil, and intricate jaali lattice fretwork.",
    category: "traditional",
    defaultPalette: "burgundy-champagne",
  },
  {
    id: "celestial",
    name: "Celestial Sapphire",
    banglaName: "নীল অপেরা ও স্বর্ণালী তারা",
    template: "celestial-sapphire",
    badge: "Starlight Gold",
    desc: "Midnight navy blue night-sky with golden constellation dust and crescent poise.",
    category: "modern",
    defaultPalette: "navy-gold",
  },
  {
    id: "traditional",
    name: "Traditional Celebration",
    banglaName: "ঐতিহ্যবাহী শুভ পরিণয় (কলকা)",
    template: "traditional-celebration",
    badge: "Paisley Kolka",
    desc: "Intricate paisley Kolka patterns, golden jali fretwork and ceremonial blessings.",
    category: "traditional",
    defaultPalette: "burgundy-champagne",
  },
  {
    id: "floral",
    name: "Floral & Romantic",
    banglaName: "রোমান্টিক ইউক্যালিপটাস ও পাতা",
    template: "ivory-floral",
    badge: "Botanical Wreath",
    desc: "Hand-painted watercolor wild blossoms with soft botanical border wreaths.",
    category: "floral",
    defaultPalette: "ivory-sage",
  },
  {
    id: "vintage",
    name: "Vintage Botanical",
    banglaName: "ভিন্টেজ অলিভ ও স্বর্ণালী ফ্রেম",
    template: "vintage-botanical",
    badge: "Deckled Linen",
    desc: "Warm deckled linen paper with engraved olive medallion and quiet old-money charm.",
    category: "floral",
    defaultPalette: "ivory-sage",
  },
  {
    id: "glamour",
    name: "Golden Glamour",
    banglaName: "স্বর্ণালী গ্ল্যামার ও আর্ট ডেকো",
    template: "golden-glamour",
    badge: "Art Deco",
    desc: "Opulent 1920s Art Deco fan chevrons, obsidian black and champagne gold foil luxury.",
    category: "modern",
    defaultPalette: "emerald-gold",
  },
  {
    id: "blush",
    name: "Romantic Blush",
    banglaName: "রোমান্টিক ব্লাশ ও ভেলম স্যাশ",
    template: "romantic-blush",
    badge: "Vellum Rose",
    desc: "Tender rose undertones accompanied by vellum sash layering and gold foil script.",
    category: "floral",
    defaultPalette: "blush-cream",
  },
  {
    id: "minimalist",
    name: "Modern Minimal",
    banglaName: "মডার্ন মিনিমাল আর্কিটেকচারাল",
    template: "modern-minimal",
    badge: "High Editorial",
    desc: "Architectural negative space, clean editorial typography, and quiet poise.",
    category: "modern",
    defaultPalette: "terracotta-beige",
  },
];

const CULTURAL_OPTIONS = [
  {
    id: "classic",
    title: "Classic Western & Editorial",
    desc: "Black-tie framing, refined serif typography, and understated regal phrasing.",
  },
  {
    id: "bangladeshi",
    title: "Traditional Bangladeshi (শুভ বিবাহ)",
    desc: "Includes Kolka paisley patterns, Ashirbad blessings, and Bangla typography.",
  },
  {
    id: "islamic",
    title: "Islamic Nikah & Walima",
    desc: "Adorned with Bismillah calligraphy, Quranic blessings, and arch motifs.",
  },
  {
    id: "hindu",
    title: "Hindu Vivah Ceremony",
    desc: "Auspicious Sanskrit blessings, mandap geometry, and sacred celebratory verse.",
  },
];

export default function CreationWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, getIdToken } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPhase, setGenerationPhase] = useState(0);
  const [templateCategory, setTemplateCategory] = useState("all");

  // Form State
  const [formData, setFormData] = useState({
    cardPurpose: "wedding", // 'wedding' | 'birthday' | 'invitation' | 'corporate' | 'other'
    brideName: "Ayesha Rahman",
    groomName: "Rafid Chowdhury",
    eventMilestone: "",
    weddingDate: "2027-11-26",
    weddingTime: "6:00 PM",
    venue: "The Palace Grand Ballroom",
    city: "Dhaka, Bangladesh",
    invitationMessage:
      "Together with our families, we invite you to celebrate our special day with love and blessings.",
    familyNames: "Mr. & Mrs. Rahman and Mr. & Mrs. Chowdhury",
    rsvpDetails: "RSVP by November 1st • wedly.ai/rsvp",
    language: "en", // 'en' | 'bn' | 'bilingual'
    culturalPreference: "classic",
    designStyle: "luxury",
    colorPalette: "emerald-gold",
    decorations: ["floral-corners", "gold-border"],
    orientation: "portrait",
  });

  // Handle URL query parameters
  useEffect(() => {
    const purposeParam = searchParams.get("purpose");
    const styleParam = searchParams.get("style");
    const templateParam = searchParams.get("template");
    const culturalParam = searchParams.get("cultural");
    const presetParam = searchParams.get("preset") || searchParams.get("presetId");

    if (presetParam) {
      const preset = getTemplateById(presetParam);
      if (preset?.design) {
        const c = preset.design.content;
        const matchedStyle = STYLE_OPTIONS.find(
          (s) => s.template === preset.design.template
        );
        const purposeMap = {
          wedding: "wedding",
          holud: "wedding",
          boubhat: "wedding",
          engagement: "wedding",
          birthday: "birthday",
          anniversary: "invitation",
          aqiqah: "invitation",
          khatna: "invitation",
          housewarming: "invitation",
          corporate: "corporate",
        };

        setFormData((prev) => ({
          ...prev,
          cardPurpose: purposeMap[preset.category] || "wedding",
          language: preset.language === "bn" ? "bn" : "en",
          brideName: c.brideName || prev.brideName,
          groomName: c.groomName || "",
          eventMilestone: c.eventMilestone || "",
          weddingDate: c.weddingDate || prev.weddingDate,
          weddingTime: c.weddingTime || prev.weddingTime,
          venue: c.venue || prev.venue,
          city: c.city || prev.city,
          invitationMessage: c.message || prev.invitationMessage,
          familyNames: c.familyNames || prev.familyNames,
          rsvpDetails: c.rsvpDetails || prev.rsvpDetails,
          designStyle: matchedStyle ? matchedStyle.id : prev.designStyle,
          colorPalette: matchedStyle ? matchedStyle.defaultPalette : prev.colorPalette,
        }));
        return;
      }
    }

    if (purposeParam && PURPOSE_OPTIONS.some((p) => p.id === purposeParam)) {
      const match = PURPOSE_OPTIONS.find((p) => p.id === purposeParam);
      setFormData((prev) => ({
        ...prev,
        cardPurpose: purposeParam,
        brideName: match.defaultBride,
        groomName: match.defaultGroom,
        eventMilestone: match.defaultMilestone,
        invitationMessage: match.defaultMessage,
        familyNames: match.defaultFamily,
        colorPalette: match.palette,
        designStyle: match.style,
      }));
    }

    const matchedStyle = STYLE_OPTIONS.find(
      (s) => s.template === templateParam || s.id === styleParam
    );

    setFormData((prev) => ({
      ...prev,
      designStyle: matchedStyle ? matchedStyle.id : styleParam || prev.designStyle,
      culturalPreference: culturalParam || prev.culturalPreference,
      colorPalette: matchedStyle ? matchedStyle.defaultPalette : prev.colorPalette,
    }));
  }, [searchParams]);

  // Handle Rotating Loading State
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setGenerationPhase((p) => (p + 1) % 4);
      }, 1600);
    } else {
      setGenerationPhase(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectPurpose = (purposeId) => {
    const chosen = PURPOSE_OPTIONS.find((p) => p.id === purposeId) || PURPOSE_OPTIONS[0];
    setFormData((prev) => {
      // Check if current fields are defaults so we can switch them smoothly
      const isDefault =
        prev.brideName === "Ayesha Rahman" ||
        prev.brideName === "Ayaan Chowdhury" ||
        prev.brideName === "The Rahman Family" ||
        prev.brideName === "TechVision Annual Gala 2027" ||
        prev.brideName === "Tanvir Hasan";

      return {
        ...prev,
        cardPurpose: purposeId,
        brideName: isDefault ? chosen.defaultBride : prev.brideName,
        groomName: purposeId === "wedding" ? (prev.groomName || chosen.defaultGroom) : "",
        eventMilestone: chosen.defaultMilestone,
        invitationMessage: isDefault ? chosen.defaultMessage : prev.invitationMessage,
        familyNames: isDefault ? chosen.defaultFamily : prev.familyNames,
        colorPalette: isDefault ? chosen.palette : prev.colorPalette,
        designStyle: isDefault ? chosen.style : prev.designStyle,
      };
    });
  };

  const toggleDecoration = (item) => {
    setFormData((prev) => {
      const exists = prev.decorations.includes(item);
      const updated = exists
        ? prev.decorations.filter((d) => d !== item)
        : [...prev.decorations, item];
      return { ...prev, decorations: updated };
    });
  };

  const handleLanguageSelect = (langId) => {
    setFormData((prev) => {
      const currentPurpose = prev.cardPurpose || "wedding";
      const isEnglishMatch =
        prev.brideName === ENGLISH_DEFAULTS[currentPurpose]?.brideName ||
        prev.brideName === "Ayesha Rahman" ||
        prev.brideName === "The Rahman Family" ||
        prev.brideName === "Ayaan Chowdhury" ||
        prev.brideName === "TechVision Annual Gala 2027" ||
        prev.brideName === "Tanvir Hasan" ||
        !prev.brideName;

      const isBanglaMatch =
        prev.brideName === BANGLA_DEFAULTS[currentPurpose]?.brideName ||
        prev.brideName === "আয়েশা রহমান" ||
        prev.brideName === "রহমান পরিবার" ||
        prev.brideName === "আরিয়ান আহমেদ" ||
        prev.brideName === "টেকভিশন অ্যানুয়াল গ্যালা ২০২৭" ||
        prev.brideName === "তানভীর হাসান";

      let updated = { ...prev, language: langId };

      if (langId === "bn" && (isEnglishMatch || !prev.brideName)) {
        const banglaData = BANGLA_DEFAULTS[currentPurpose] || BANGLA_DEFAULTS.wedding;
        updated = {
          ...updated,
          brideName: banglaData.brideName,
          groomName: banglaData.groomName,
          eventMilestone: banglaData.eventMilestone,
          venue: banglaData.venue,
          city: banglaData.city,
          invitationMessage: banglaData.invitationMessage,
          familyNames: banglaData.familyNames,
          rsvpDetails: banglaData.rsvpDetails,
        };
      } else if (langId === "en" && isBanglaMatch) {
        const engData = ENGLISH_DEFAULTS[currentPurpose] || ENGLISH_DEFAULTS.wedding;
        updated = {
          ...updated,
          brideName: engData.brideName,
          groomName: engData.groomName,
          eventMilestone: engData.eventMilestone,
          venue: engData.venue,
          city: engData.city,
          invitationMessage: engData.invitationMessage,
          familyNames: engData.familyNames,
          rsvpDetails: engData.rsvpDetails,
        };
      }
      return updated;
    });
  };

  const toggleBanglaFill = () => {
    if (formData.language === "bn") {
      handleLanguageSelect("en");
    } else {
      handleLanguageSelect("bn");
    }
  };

  // Derive Current Preview Design JSON
  const selectedStyleObj =
    STYLE_OPTIONS.find((s) => s.id === formData.designStyle) || STYLE_OPTIONS[0];
  const selectedPaletteObj =
    PALETTE_OPTIONS.find((p) => p.id === formData.colorPalette) || PALETTE_OPTIONS[0];

  // Dynamic titles and subtitles based on Card Purpose
  const isWedding = formData.cardPurpose === "wedding";
  const isBirthday = formData.cardPurpose === "birthday";
  const isCorporate = formData.cardPurpose === "corporate";
  const isParty = formData.cardPurpose === "invitation";

  let previewTitle = "THE HONOUR OF YOUR PRESENCE";
  if (formData.language === "bn") {
    if (isBirthday) previewTitle = "শুভ জন্মদিন";
    else if (isCorporate) previewTitle = "সম্মানিত আমন্ত্রণ পত্র";
    else if (isParty) previewTitle = "বিশেষ নিমন্ত্রণ পত্র";
    else if (formData.culturalPreference === "islamic") previewTitle = "নিকাহ ও ওয়ালিমা উৎসব";
    else previewTitle = "মাঙ্গলিক শুভ পরিণয়";
  } else {
    if (isBirthday) previewTitle = "YOU'RE INVITED TO CELEBRATE";
    else if (isCorporate) previewTitle = "EXCLUSIVE INVITATION";
    else if (isParty) previewTitle = "CORDIALLY INVITED";
    else if (formData.culturalPreference === "islamic") previewTitle = "Nikah & Walima Ceremony";
    else previewTitle = "THE HONOUR OF YOUR PRESENCE";
  }

  let previewSubtitle = formData.familyNames
    ? `Together with ${formData.familyNames}`
    : formData.eventMilestone
    ? formData.eventMilestone
    : isBirthday
    ? `Celebrating ${formData.brideName}'s Special Day`
    : "Together with their loving families";

  const previewMonogram = formData.groomName
    ? `${formData.brideName?.[0] || "A"}&${formData.groomName?.[0] || "R"}`
    : `${formData.brideName?.[0] || "W"}`;

  const currentPreviewDesign = {
    template: selectedStyleObj.template,
    language: formData.language,
    culturalStyle: formData.culturalPreference,
    orientation: formData.orientation,
    palette: {
      name: selectedPaletteObj.name,
      background: selectedPaletteObj.bg,
      primary: selectedPaletteObj.primary,
      secondary: "#285C49",
      accent: selectedPaletteObj.accent,
      cardBg: selectedPaletteObj.cardBg,
      textPrimary: selectedPaletteObj.primary,
      textMuted: "#77766F",
      borderColor: "#E8E2D8",
    },
    typography: {
      headingFont: formData.language === "bn" ? "Hind Siliguri" : "Playfair Display",
      bodyFont: formData.language === "bn" ? "Hind Siliguri" : "DM Sans",
      bengaliFont: "Hind Siliguri",
      headingSize: "lg",
      textAlign: "center",
      letterSpacing: "wide",
    },
    decorations: {
      hasFloralCorners: formData.decorations.includes("floral-corners"),
      hasGoldBorder: formData.decorations.includes("gold-border"),
      hasWaxSeal: true,
      hasBotanicalBranch: selectedStyleObj.template === "ivory-floral",
      hasTraditionalMotif: selectedStyleObj.template === "traditional-celebration",
      hasInnerFrame: true,
      monogram: previewMonogram,
    },
    content: {
      cardPurpose: formData.cardPurpose,
      title: previewTitle,
      subtitle: previewSubtitle,
      brideName: formData.brideName,
      groomName: formData.groomName || "",
      eventMilestone: formData.eventMilestone || "",
      weddingDate: formData.weddingDate,
      weddingTime: formData.weddingTime,
      venue: formData.venue,
      city: formData.city,
      message: formData.invitationMessage,
      rsvpDetails: formData.rsvpDetails,
      bilingualBrideName: formData.brideName,
      bilingualGroomName: formData.groomName || "",
      bilingualMessage:
        formData.language === "bn" || formData.language === "bilingual"
          ? isBirthday
            ? "আমাদের আনন্দঘন জন্মদিনের এই বিশেষ উৎসবে আপনাদের সপরিবারে আমন্ত্রণ জানাচ্ছি।"
            : isCorporate
            ? "আমাদের বার্ষিক উদযাপনী সম্মেলনে আপনাকে সানন্দে আমন্ত্রণ জানাচ্ছি।"
            : formData.culturalPreference === "bangladeshi"
            ? "আমাদের জীবনের এই আনন্দঘন শুভলগ্নে আপনাদের সপরিবারে আমন্ত্রণ জানাচ্ছি।"
            : ""
          : "",
    },
  };

  // Submit & Generate via API
  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // 1. Call /api/generate-design
      const res = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to generate design");
      }

      const generatedDesign = result.data || currentPreviewDesign;

      // 2. Save invitation to Supabase (or dev store)
      const token = await getIdToken();
      const cardTitle =
        formData.cardPurpose === "wedding"
          ? `${formData.brideName} & ${formData.groomName} Wedding`
          : `${formData.brideName} • ${
              formData.cardPurpose === "birthday"
                ? "Birthday Card"
                : formData.cardPurpose === "corporate"
                ? "Gala Invitation"
                : "Celebration Invitation"
            }`;

      const invitationPayload = {
        title: cardTitle,
        bride_name: formData.brideName,
        groom_name: formData.groomName || "",
        wedding_date: formData.weddingDate,
        venue: formData.venue,
        invitation_message: formData.invitationMessage,
        language: formData.language,
        design_style: formData.designStyle,
        theme: generatedDesign.template,
        color_palette: formData.colorPalette,
        design_json: generatedDesign,
        status: "draft",
      };

      const saveRes = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || "demo-token-guest"}`,
        },
        body: JSON.stringify(invitationPayload),
      });

      const saveResult = await saveRes.json();
      const newId = saveResult?.data?.id || crypto.randomUUID();

      // Cache draft locally for instant, flawless studio loading
      try {
        sessionStorage.setItem(
          `wedly_draft_${newId}`,
          JSON.stringify({ ...invitationPayload, id: newId, design_json: generatedDesign })
        );
      } catch (e) {
        // storage quota fallback
      }

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#173D32", "#C6A66B", "#F1E9DA"],
      });

      toast.success("Card Generated Successfully!", {
        description: "Opening Live Invitation Studio & Editor...",
      });

      // Navigate to Editor
      setTimeout(() => {
        router.push(`/editor/${newId}`);
      }, 1000);
    } catch (err) {
      console.error("Generation error:", err);
      toast.error("Generation encountered an issue", {
        description: err.message || "Using customized atelier specification.",
      });
      // Graceful fallback to editor anyway with local design
      const fallbackId = crypto.randomUUID();
      try {
        sessionStorage.setItem(
          `wedly_draft_${fallbackId}`,
          JSON.stringify({
            title: `${formData.brideName} Card`,
            bride_name: formData.brideName,
            groom_name: formData.groomName || "",
            design_json: currentPreviewDesign,
          })
        );
      } catch (e) {}
      router.push(`/editor/${fallbackId}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const stepsList = [
    { num: 1, title: "Card Purpose" },
    { num: 2, title: "Celebration & Host Details" },
    { num: 3, title: "Language & Cultural Style" },
    { num: 4, title: "Signature Aesthetic" },
    { num: 5, title: "Color Palette & Inks" },
    { num: 6, title: "Ornaments & Finishing" },
    { num: 7, title: "Review & AI Synthesis" },
  ];

  const loadingMessages = [
    "Analyzing your celebration script and love story...",
    "Harmonizing typography, spacing, and cultural nuance...",
    "Gemini AI synthesizing delicate borders & color inks...",
    "Adding final artisanal touches to your atelier proof...",
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-24 pb-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        {/* Stepper Header */}
        <div className="w-full bg-white rounded-xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#FAF8F4]">
            <div>
              <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.2em] block">
                Atelier Generative Suite
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#173D32] mt-1">
                AI Wedding Invitation Creator
              </h1>
            </div>

            <div className="flex items-center gap-2 bg-[#F1E9DA] px-4 py-2 rounded-full self-start sm:self-auto border border-[#E8E2D8]">
              <span className="w-2 h-2 rounded-full bg-[#173D32] animate-pulse" />
              <span className="font-sans text-xs text-[#252923] font-medium">
                Step <span className="font-bold text-[#173D32]">{currentStep}</span> of 7 •{" "}
                <span className="italic">{stepsList[currentStep - 1].title}</span>
              </span>
            </div>
          </div>

          {/* Stepper Buttons (7 Steps) */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {stepsList.map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex flex-col items-center gap-1.5 py-2 transition-all ${
                    isCurrent
                      ? "text-[#173D32]"
                      : isPast
                      ? "text-[#285C49]"
                      : "text-[#77766F] opacity-60"
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#173D32] text-white shadow-md ring-2 ring-[#C6A66B]/50"
                        : isPast
                        ? "bg-[#285C49] text-white"
                        : "bg-[#F1E9DA] text-[#77766F]"
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <span className="hidden md:inline font-sans text-[10px] uppercase font-bold tracking-wider text-center line-clamp-1">
                    {step.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 12-Column Grid: Form (6 Cols) vs. Live Canvas Preview (6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-6 bg-white rounded-xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm flex flex-col justify-between min-h-[560px]">
            {/* STEP 1: Card Purpose */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                    Step 1: Celebration Purpose
                  </span>
                  <h2 className="font-serif text-2xl text-[#173D32]">
                    What type of card do you want to build?
                  </h2>
                  <p className="font-sans text-xs text-[#77766F]">
                    Choose the occasion. Wedly AI will tailor the wording, etiquette, typography, and layout specifically for your event.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {PURPOSE_OPTIONS.map((purpose) => {
                    const isSelected = formData.cardPurpose === purpose.id;
                    const IconComp = purpose.icon;
                    return (
                      <div
                        key={purpose.id}
                        onClick={() => handleSelectPurpose(purpose.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? "bg-[#FAF8F4] border-[#173D32] ring-2 ring-[#C6A66B]/40 shadow-sm"
                            : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4]/70 hover:border-[#C6A66B]/60"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${purpose.iconColor}`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-serif text-base font-semibold text-[#173D32]">
                                {purpose.name}
                              </span>
                              <span className="font-sans text-[11px] text-[#9A7C43] font-medium" style={{ fontFamily: "var(--font-hind-siliguri)" }}>
                                • {purpose.banglaName}
                              </span>
                              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider bg-[#F1E9DA] text-[#173D32] border border-[#E8E2D8]">
                                {purpose.tag}
                              </span>
                            </div>
                            <p className="font-sans text-xs text-[#77766F] leading-relaxed">
                              {purpose.desc}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all ${
                            isSelected
                              ? "bg-[#173D32] border-[#173D32] text-white shadow-sm"
                              : "border-[#E8E2D8] bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3 rounded-lg bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Continue to Event Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Celebration & Host Details (Dynamic) */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                      Step 2: Event Details
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#F1E9DA] text-[10px] font-semibold text-[#173D32] uppercase">
                      {PURPOSE_OPTIONS.find((p) => p.id === formData.cardPurpose)?.name || "Event"}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl text-[#173D32]">
                    {formData.cardPurpose === "wedding"
                      ? "Couple & Ceremony Details"
                      : formData.cardPurpose === "birthday"
                      ? "Birthday Person & Party Details"
                      : formData.cardPurpose === "corporate"
                      ? "Corporate Gala & Banquet Details"
                      : "Celebration & Host Details"}
                  </h2>
                  <p className="font-sans text-xs text-[#77766F]">
                    {formData.cardPurpose === "wedding"
                      ? "Enter the bride and groom names, ceremonial date, and venue."
                      : formData.cardPurpose === "birthday"
                      ? "Enter the celebrant's name, milestone age, date, and venue."
                      : "Enter event names, hosts, celebration date, and location."}
                  </p>
                </div>

                {/* Language / Script Quick Switcher & Demo Fill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 bg-[#FAF8F4] rounded-lg border border-[#E8E2D8]">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs font-semibold text-[#173D32]">
                      কার্ডের ভাষা / Language:
                    </span>
                    <div className="inline-flex rounded border border-[#E8E2D8] bg-white p-0.5 text-xs">
                      <button
                        type="button"
                        onClick={() => handleLanguageSelect("en")}
                        className={`px-3 py-1 rounded font-medium transition-all ${
                          formData.language === "en"
                            ? "bg-[#173D32] text-white shadow-xs"
                            : "text-[#77766F] hover:text-[#173D32]"
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLanguageSelect("bn")}
                        className={`px-3 py-1 rounded font-medium transition-all ${
                          formData.language === "bn"
                            ? "bg-[#173D32] text-white shadow-xs"
                            : "text-[#77766F] hover:text-[#173D32]"
                        }`}
                      >
                        বাংলা (Bangla)
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleBanglaFill}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A7C43] hover:text-[#173D32] transition-colors"
                  >
                    <span>
                      {formData.language === "bn"
                        ? "🇬🇧 ইংরেজি ডেমো লোড করুন"
                        : "🇧🇩 বাংলায় ডেমো তথ্য পূরণ করুন"}
                    </span>
                  </button>
                </div>

                {/* Names Field Group */}
                {formData.cardPurpose === "wedding" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Bride&apos;s Name *
                      </label>
                      <input
                        type="text"
                        value={formData.brideName}
                        onChange={(e) => handleChange("brideName", e.target.value)}
                        placeholder="e.g. Ayesha Rahman"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Groom&apos;s Name *
                      </label>
                      <input
                        type="text"
                        value={formData.groomName}
                        onChange={(e) => handleChange("groomName", e.target.value)}
                        placeholder="e.g. Rafid Chowdhury"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>
                  </div>
                ) : formData.cardPurpose === "birthday" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Birthday Person&apos;s Name *
                      </label>
                      <input
                        type="text"
                        value={formData.brideName}
                        onChange={(e) => handleChange("brideName", e.target.value)}
                        placeholder="e.g. Ayaan Chowdhury"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Turning Age / Milestone
                      </label>
                      <input
                        type="text"
                        value={formData.eventMilestone}
                        onChange={(e) => handleChange("eventMilestone", e.target.value)}
                        placeholder="e.g. Turning 5 Years Old! or Sweet 16"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>
                  </div>
                ) : formData.cardPurpose === "corporate" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Event / Gala Title *
                      </label>
                      <input
                        type="text"
                        value={formData.brideName}
                        onChange={(e) => handleChange("brideName", e.target.value)}
                        placeholder="e.g. TechVision Annual Gala 2027"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Occasion / Theme Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.eventMilestone}
                        onChange={(e) => handleChange("eventMilestone", e.target.value)}
                        placeholder="e.g. Executive Banquet & Innovation Summit"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Host / Honoree Name(s) *
                      </label>
                      <input
                        type="text"
                        value={formData.brideName}
                        onChange={(e) => handleChange("brideName", e.target.value)}
                        placeholder="e.g. The Rahman Family"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-xs font-semibold text-[#173D32]">
                        Celebration Occasion / Milestone
                      </label>
                      <input
                        type="text"
                        value={formData.eventMilestone}
                        onChange={(e) => handleChange("eventMilestone", e.target.value)}
                        placeholder="e.g. 25th Silver Jubilee or Housewarming"
                        className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                      />
                    </div>
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-semibold text-[#173D32]">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      value={formData.weddingDate}
                      onChange={(e) => handleChange("weddingDate", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs font-semibold text-[#173D32]">
                      Event / Gathering Time
                    </label>
                    <input
                      type="text"
                      value={formData.weddingTime}
                      onChange={(e) => handleChange("weddingTime", e.target.value)}
                      placeholder="e.g. 6:00 PM"
                      className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                    />
                  </div>
                </div>

                {/* Venue & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-semibold text-[#173D32]">
                      Venue / Location *
                    </label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => handleChange("venue", e.target.value)}
                      placeholder="e.g. The Palace Ballroom or Lakehouse Garden"
                      className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs font-semibold text-[#173D32]">
                      City / Area
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50"
                    />
                  </div>
                </div>

                {/* Personal Message */}
                <div className="space-y-1">
                  <label className="font-sans text-xs font-semibold text-[#173D32]">
                    Invitation Verse / Special Message
                  </label>
                  <textarea
                    rows={2}
                    value={formData.invitationMessage}
                    onChange={(e) => handleChange("invitationMessage", e.target.value)}
                    placeholder="Enter an invitation verse or warm message..."
                    className="w-full px-3.5 py-2.5 rounded border border-[#E8E2D8] text-sm text-[#252923] focus:outline-none focus:border-[#C6A66B] bg-[#FAF8F4]/50 resize-none"
                  />
                </div>

                {/* Host Names & RSVP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-semibold text-[#173D32]">
                      {formData.cardPurpose === "wedding"
                        ? "Parents / Host Families (Optional)"
                        : "Hosted With Love By (Optional)"}
                    </label>
                    <input
                      type="text"
                      value={formData.familyNames}
                      onChange={(e) => handleChange("familyNames", e.target.value)}
                      placeholder="e.g. Mr. & Mrs. Rahman or Chowdhury Family"
                      className="w-full px-3.5 py-2 rounded border border-[#E8E2D8] text-xs text-[#252923] bg-[#FAF8F4]/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs font-semibold text-[#173D32]">
                      RSVP / Contact Details (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.rsvpDetails}
                      onChange={(e) => handleChange("rsvpDetails", e.target.value)}
                      placeholder="e.g. RSVP by Nov 1st • 01700-000000"
                      className="w-full px-3.5 py-2 rounded border border-[#E8E2D8] text-xs text-[#252923] bg-[#FAF8F4]/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Language & Cultural Style */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                    Step 3: Linguistic Heritage
                  </span>
                  <h2 className="font-serif text-2xl text-[#173D32]">
                    Language & Cultural Nuance
                  </h2>
                  <p className="font-sans text-xs text-[#77766F]">
                    Wedly provides native typography support for Bangla and English.
                  </p>
                </div>

                {/* Language selection pills */}
                <div className="space-y-2">
                  <label className="font-sans text-xs font-semibold text-[#173D32]">
                    Invitation Script Language
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "en", label: "English" },
                      { id: "bn", label: "বাংলা (Bangla)" },
                      { id: "bilingual", label: "Bangla + English" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleLanguageSelect(item.id)}
                        className={`py-3 px-3 rounded text-xs font-semibold transition-all border ${
                          formData.language === item.id
                            ? "bg-[#173D32] text-white border-[#173D32] shadow-sm"
                            : "bg-[#FAF8F4] text-[#252923] border-[#E8E2D8] hover:bg-[#F1E9DA]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cultural traditions */}
                <div className="space-y-2.5">
                  <label className="font-sans text-xs font-semibold text-[#173D32]">
                    Cultural Tradition Archetype
                  </label>
                  <div className="space-y-2">
                    {CULTURAL_OPTIONS.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleChange("culturalPreference", item.id)}
                        className={`p-3.5 rounded border cursor-pointer transition-all flex items-start gap-3 ${
                          formData.culturalPreference === item.id
                            ? "bg-[#F1E9DA]/60 border-[#C6A66B] ring-1 ring-[#C6A66B]"
                            : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                            formData.culturalPreference === item.id
                              ? "border-[#173D32] bg-[#173D32]"
                              : "border-[#77766F]"
                          }`}
                        >
                          {formData.culturalPreference === item.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <span className="font-sans text-xs font-semibold text-[#173D32] block">
                            {item.title}
                          </span>
                          <span className="font-sans text-[11px] text-[#77766F] leading-relaxed">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Design Style */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                    Step 4: Atelier Aesthetics
                  </span>
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl text-[#173D32]">
                      Signature Design Template
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#173D32]/10 text-[#173D32]">
                      ৯টি স্পেশাল ডেমো ডিজাইন
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#77766F]">
                    Choose from our collection of bespoke invitations. Click any card to preview instantly on the canvas.
                  </p>
                </div>

                {/* 108+ Ready Templates Discovery Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#173D32] to-[#20493C] text-white shadow-xs flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
                      <span>Want 108+ ready-to-use templates?</span>
                    </span>
                    <span className="text-[11px] text-[#C6A66B] block">
                      ১০৮টি প্রস্তুতকৃত ডিজাইন দেখুন ও ১-ক্লিকে কাস্টমাইজ করুন
                    </span>
                  </div>
                  <Link
                    href="/templates"
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-[#C6A66B] hover:bg-[#D4B77D] text-[#173D32] font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <span>Browse 108+</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: "all", label: "All Styles (৯টি)" },
                    { id: "traditional", label: "Royal & Heritage" },
                    { id: "modern", label: "Modern & Celestial" },
                    { id: "floral", label: "Floral & Romance" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setTemplateCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        templateCategory === cat.id
                          ? "bg-[#173D32] text-white shadow-xs"
                          : "bg-white text-[#77766F] hover:text-[#173D32] border border-[#E8E2D8]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
                  {STYLE_OPTIONS.filter(
                    (s) =>
                      templateCategory === "all" ||
                      s.category === templateCategory ||
                      (templateCategory === "traditional" && (s.category === "royal" || s.category === "traditional"))
                  ).map((style) => (
                    <div
                      key={style.id}
                      onClick={() => {
                        handleChange("designStyle", style.id);
                        if (style.defaultPalette) {
                          handleChange("colorPalette", style.defaultPalette);
                        }
                      }}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between relative group ${
                        formData.designStyle === style.id
                          ? "bg-[#FAF8F4] border-[#C6A66B] ring-2 ring-[#C6A66B]/50 shadow-md"
                          : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4] hover:border-[#C6A66B]/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#9A7C43]/10 text-[#9A7C43] border border-[#9A7C43]/20">
                            {style.badge}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              formData.designStyle === style.id
                                ? "bg-[#173D32] border-[#173D32] text-white"
                                : "border-[#E8E2D8] group-hover:border-[#C6A66B]"
                            }`}
                          >
                            {formData.designStyle === style.id && <Check className="w-2.5 h-2.5" />}
                          </div>
                        </div>

                        <span className="font-serif text-sm font-semibold text-[#173D32] block">
                          {style.name}
                        </span>
                        {style.banglaName && (
                          <span className="font-sans text-[11px] text-[#9A7C43] font-medium block mt-0.5">
                            {style.banglaName}
                          </span>
                        )}
                        <span className="font-sans text-[11px] text-[#77766F] leading-snug block mt-1">
                          {style.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Color Palette */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                    Step 5: Chromatics & Inks
                  </span>
                  <h2 className="font-serif text-2xl text-[#173D32]">
                    Curated Color Palette
                  </h2>
                  <p className="font-sans text-xs text-[#77766F]">
                    Handcrafted ink and foil combinations calibrated for print and digital screens.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {PALETTE_OPTIONS.map((pal) => (
                    <div
                      key={pal.id}
                      onClick={() => handleChange("colorPalette", pal.id)}
                      className={`p-3.5 rounded border cursor-pointer transition-all flex items-center justify-between ${
                        formData.colorPalette === pal.id
                          ? "bg-[#FAF8F4] border-[#C6A66B] ring-1 ring-[#C6A66B] shadow-sm"
                          : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <span
                            className="w-7 h-7 rounded-full shadow-sm border border-black/10"
                            style={{ backgroundColor: pal.primary }}
                          />
                          <span
                            className="w-7 h-7 rounded-full shadow-sm border border-black/10"
                            style={{ backgroundColor: pal.accent }}
                          />
                        </div>
                        <div>
                          <span className="font-sans text-xs font-semibold text-[#173D32] block">
                            {pal.name}
                          </span>
                          <span className="font-sans text-[11px] text-[#77766F]">
                            {pal.desc}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          formData.colorPalette === pal.id
                            ? "bg-[#173D32] border-[#173D32] text-white"
                            : "border-[#E8E2D8]"
                        }`}
                      >
                        {formData.colorPalette === pal.id && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Ornaments & Finishing */}
            {currentStep === 6 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                    Step 6: Finishing Touches
                  </span>
                  <h2 className="font-serif text-2xl text-[#173D32]">
                    Decorations & Orientation
                  </h2>
                  <p className="font-sans text-xs text-[#77766F]">
                    Toggle delicate foil trims, wax seal monogram, and paper alignment.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="font-sans text-xs font-semibold text-[#173D32]">
                    Orientation
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "portrait", label: "Portrait (Standard 5 × 7″)" },
                      { id: "landscape", label: "Landscape (Horizontal 7 × 5″)" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleChange("orientation", item.id)}
                        className={`py-3 px-3 rounded text-xs font-semibold transition-all border ${
                          formData.orientation === item.id
                            ? "bg-[#173D32] text-white border-[#173D32] shadow-sm"
                            : "bg-[#FAF8F4] text-[#252923] border-[#E8E2D8] hover:bg-[#F1E9DA]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="font-sans text-xs font-semibold text-[#173D32]">
                    Embossed Decorative Elements
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: "floral-corners", label: "Gilded Floral Corner Accents" },
                      { id: "gold-border", label: "Double Gilded Inset Border Frame" },
                      { id: "wax-seal", label: "Custom Wax Seal Monogram Crest" },
                      { id: "botanical-branch", label: "Botanical Olive / Eucalyptus Garland" },
                      { id: "traditional-motif", label: "Traditional Paisley / Arabesque Mandala" },
                    ].map((dec) => {
                      const isChecked = formData.decorations.includes(dec.id);
                      return (
                        <div
                          key={dec.id}
                          onClick={() => toggleDecoration(dec.id)}
                          className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-all ${
                            isChecked
                              ? "bg-[#FAF8F4] border-[#C6A66B]"
                              : "bg-white border-[#E8E2D8] hover:bg-[#FAF8F4]"
                          }`}
                        >
                          <span className="font-sans text-xs font-medium text-[#252923]">
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
                </div>
              </div>
            )}

            {/* STEP 7: Review & Generate */}
            {currentStep === 7 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest">
                    Step 7: AI Synthesis
                  </span>
                  <h2 className="font-serif text-2xl text-[#173D32]">
                    Review & Generate My Card
                  </h2>
                  <p className="font-sans text-xs text-[#77766F]">
                    Gemini AI will now synthesize your answers into a bespoke design specification.
                  </p>
                </div>

                <div className="bg-[#FAF8F4] p-5 rounded-lg border border-[#E8E2D8] space-y-3 font-sans text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#77766F]">Card Purpose:</span>
                    <span className="font-semibold text-[#173D32]">
                      {PURPOSE_OPTIONS.find((p) => p.id === formData.cardPurpose)?.name || "Celebration"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#77766F]">
                      {formData.cardPurpose === "wedding" ? "Couple:" : "Honoree / Event:"}
                    </span>
                    <span className="font-semibold text-[#173D32]">
                      {formData.brideName}
                      {formData.groomName ? ` & ${formData.groomName}` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#77766F]">Date & Venue:</span>
                    <span className="font-medium text-[#252923]">
                      {formData.weddingDate} • {formData.venue}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#E8E2D8]">
                    <span className="text-[#77766F]">Language & Tradition:</span>
                    <span className="font-medium text-[#252923]">
                      {formData.language.toUpperCase()} • {formData.culturalPreference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#77766F]">Palette:</span>
                    <span className="font-medium text-[#252923]">
                      {selectedPaletteObj.name}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full py-4 rounded bg-[#173D32] hover:bg-[#285C49] text-white font-sans text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Sparkles className="w-4 h-4 text-[#C6A66B]" />
                    <span>Generate My Bespoke Card</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stepper Navigation Footer Buttons */}
            <div className="pt-6 border-t border-[#E8E2D8] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider text-[#77766F] hover:text-[#173D32] hover:bg-[#F1E9DA] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 7 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded bg-[#173D32] hover:bg-[#285C49] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Fluid Live Stationery Stage */}
          <div className="lg:col-span-6 bg-white rounded-xl p-6 sm:p-8 border border-[#E8E2D8] shadow-sm flex flex-col items-center justify-center min-h-[560px]">
            <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-[#FAF8F4]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#9A7C43]">
                Live Atelier Proof
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#77766F]">
                Updates in real-time
              </span>
            </div>

            <div className="w-full flex items-center justify-center py-4 overflow-hidden">
              <div className="transform scale-[0.80] sm:scale-[0.95] origin-center">
                <InvitationRenderer design={currentPreviewDesign} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REFINED AI GENERATION MODAL */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-[#FAF8F4] border border-[#E8E2D8] rounded-xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#173D32] flex items-center justify-center text-[#C6A66B] shadow-lg relative">
              <Sparkles className="w-8 h-8 animate-spin text-[#C6A66B]" />
              <div className="absolute inset-0 rounded-full border-2 border-[#C6A66B] animate-ping opacity-25" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#173D32]">
                Gemini Atelier Generating...
              </h3>
              <p className="font-sans text-xs text-[#77766F] min-h-[36px] transition-all">
                {loadingMessages[generationPhase]}
              </p>
            </div>

            <div className="w-full bg-[#E8E2D8] h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-[#173D32] animate-pulse w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
