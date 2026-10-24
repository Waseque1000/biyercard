import { GoogleGenAI } from "@google/genai";
import { DesignSpecificationSchema } from "../schemas/invitationSchema";

function getApiKey() {
  return (process.env.GEMINI_API_KEY || "").trim();
}

export function isGeminiConfigured() {
  const key = getApiKey();
  return Boolean(key && key !== "mock-key" && key.length > 10);
}

const PALETTE_PRESETS = {
  "emerald-gold": {
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
  "burgundy-champagne": {
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
  "ivory-sage": {
    name: "Ivory Linen & Botanical Sage",
    background: "#FAF8F4",
    primary: "#1C3825",
    secondary: "#4E7D5B",
    accent: "#B89F60",
    cardBg: "#F6F8F5",
    textPrimary: "#152F1E",
    textMuted: "#536B5B",
    borderColor: "#D2DDD4",
  },
  "blush-cream": {
    name: "Romantic Rose Blush & Berry",
    background: "#FFF1F2",
    primary: "#881337",
    secondary: "#E11D48",
    accent: "#D97706",
    cardBg: "#FFF1F2",
    textPrimary: "#6B0D28",
    textMuted: "#9F4D63",
    borderColor: "#FECDD3",
  },
  "navy-gold": {
    name: "Royal Walima Sapphire",
    background: "#071326",
    primary: "#FEF3C7",
    secondary: "#60A5FA",
    accent: "#E8C26E",
    cardBg: "#0B1A33",
    textPrimary: "#FFFDF9",
    textMuted: "#B4C8DF",
    borderColor: "#30568B",
  },
  "terracotta-beige": {
    name: "Terracotta Bronze & Spice",
    background: "#3F130A",
    primary: "#FED7AA",
    secondary: "#EA580C",
    accent: "#E29D4E",
    cardBg: "#541D10",
    textPrimary: "#FFFBF7",
    textMuted: "#DFB5A8",
    borderColor: "#B85532",
  },
  "mustard-marigold": {
    name: "Gaye Holud Marigold & Saffron",
    background: "#FFF9E6",
    primary: "#853609",
    secondary: "#D97706",
    accent: "#E09A16",
    cardBg: "#FFF9E6",
    textPrimary: "#702A05",
    textMuted: "#9A501F",
    borderColor: "#E5A93C",
  },
};

/**
 * High-fidelity fallback designer that deterministically builds an exquisite specification
 * when GEMINI_API_KEY is not configured or during offline testing.
 */
function buildAlgorithmicDesign(input) {
  const paletteKey = PALETTE_PRESETS[input.colorPalette]
    ? input.colorPalette
    : "emerald-gold";
  const palette = PALETTE_PRESETS[paletteKey];
  const purpose = input.cardPurpose || "wedding";

  let template = "emerald-royal";
  if (input.designStyle === "minimalist" || input.designStyle === "modern") {
    template = "modern-minimal";
  } else if (
    input.designStyle === "floral" ||
    input.designStyle === "floral-romantic"
  ) {
    template = "ivory-floral";
  } else if (
    input.culturalPreference === "bangladeshi" ||
    input.culturalPreference === "islamic" ||
    input.designStyle === "traditional"
  ) {
    template = "traditional-celebration";
  } else if (
    input.designStyle === "blush" ||
    input.colorPalette === "blush-cream"
  ) {
    template = "romantic-blush";
  }

  // Cultural and Purpose-driven title & subtitle
  let title = "Wedding Celebration";
  let subtitle = "Together with our families";
  let bilingualMessage = "";

  if (purpose === "birthday") {
    title = input.language === "bn" ? "শুভ জন্মদিন" : "YOU'RE INVITED TO CELEBRATE";
    subtitle = input.eventMilestone
      ? `Celebrating ${input.brideName}'s ${input.eventMilestone}`
      : `Celebrating the Birthday of ${input.brideName}`;
    bilingualMessage =
      input.language === "bn" || input.language === "bilingual"
        ? "আমাদের আনন্দঘন জন্মদিনের এই বিশেষ উৎসবে আপনাদের সপরিবারে আমন্ত্রণ জানাচ্ছি।"
        : "";
  } else if (purpose === "invitation") {
    title = input.language === "bn" ? "বিশেষ নিমন্ত্রণ" : "CORDIALLY INVITED";
    subtitle = input.eventMilestone || "A Joyous Celebration with Loved Ones";
    bilingualMessage =
      input.language === "bn" || input.language === "bilingual"
        ? "আমাদের এই আনন্দঘন অনুষ্ঠানে আপনাদের সপরিবারে সস্নেহ উপস্থিতি একান্ত কাম্য।"
        : "";
  } else if (purpose === "corporate") {
    title = input.language === "bn" ? "সম্মানিত আমন্ত্রণ পত্র" : "EXCLUSIVE INVITATION";
    subtitle = input.eventMilestone || "Annual Gala & Executive Networking Gathering";
    bilingualMessage =
      input.language === "bn" || input.language === "bilingual"
        ? "আমাদের বার্ষিক উদযাপনী সম্মেলনে আপনাকে সানন্দে আমন্ত্রণ জানাচ্ছি।"
        : "";
  } else if (purpose === "other") {
    title = input.language === "bn" ? "বিশেষ নিমন্ত্রণ" : "AN INVITATION TO CELEBRATE";
    subtitle = input.eventMilestone || "A Milestone Celebration";
    bilingualMessage =
      input.language === "bn" || input.language === "bilingual"
        ? "আমাদের এই বিশেষ আনন্দঘন মুহূর্তে আপনাদের উপস্থিতি কামনা করছি।"
        : "";
  } else {
    // Wedding
    if (input.language === "bn") {
      if (input.culturalPreference === "islamic") {
        title = "শুভ নিকাহ্ ও ওয়ালীমা অনুষ্ঠান";
        subtitle = "বিসমিল্লাহির রাহমানির রাহিম — পরিবারের সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব";
        bilingualMessage = "আমাদের শুভ বিবাহ অনুষ্ঠানে আপনাদের সপরিবারে আন্তরিক আমন্ত্রণ জানাচ্ছি।";
      } else if (input.culturalPreference === "hindu") {
        title = "মাঙ্গলিক শুভ পরিণয় উৎসব";
        subtitle = "॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥ পরিবারের সান্নিধ্যে শুভ বিবাহ বাসর";
        bilingualMessage = "আমাদের শুভ বিবাহ বাসরলগ্নে আপনাদের সস্নেহ উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।";
      } else {
        title = "মাঙ্গলিক শুভ পরিণয়";
        subtitle = "পারিবারিক সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব";
        bilingualMessage = "আমাদের জীবনের এই আনন্দঘন শুভলগ্নে আপনাদের সস্নেহ উপস্থিতি ও দোয়া একান্ত কাম্য।";
      }
    } else {
      if (input.culturalPreference === "islamic") {
        title = "Nikah & Walima Ceremony";
        subtitle = "In the Name of Allah, the Most Beneficent, the Most Merciful";
        bilingualMessage = "বিসমিল্লাহির রাহমানির রাহিম — আমাদের শুভ বিবাহ অনুষ্ঠানে আপনাদের সপরিবারে আমন্ত্রণ জানাচ্ছি।";
      } else if (input.culturalPreference === "bangladeshi") {
        title = "শুভ পরিণয়";
        subtitle = "পারিবারিক সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব";
        bilingualMessage = "আমাদের জীবনের এই আনন্দঘন শুভলগ্নে আপনাদের সস্নেহ উপস্থিতি ও দোয়া একান্ত কাম্য।";
      } else {
        title = "Wedding Celebration";
        subtitle = "Together with our families";
      }
    }
  }

  const monogram = input.groomName
    ? `${input.brideName?.charAt(0) || "A"}&${input.groomName?.charAt(0) || "R"}`
    : `${input.brideName?.charAt(0) || "W"}`;

  const isBangla = input.language === "bn";

  return {
    template,
    language: input.language || "en",
    culturalStyle: input.culturalPreference || "classic",
    orientation: input.orientation || "portrait",
    palette,
    typography: {
      headingFont: isBangla ? "Hind Siliguri" : "Playfair Display",
      bodyFont: isBangla ? "Hind Siliguri" : "DM Sans",
      bengaliFont: "Hind Siliguri",
      headingSize: "lg",
      textAlign: "center",
      letterSpacing: "wide",
    },
    decorations: {
      hasFloralCorners: input.decorations?.includes("floral-corners") ?? true,
      hasGoldBorder: input.decorations?.includes("gold-border") ?? true,
      hasWaxSeal: true,
      hasBotanicalBranch: template === "ivory-floral",
      hasTraditionalMotif: template === "traditional-celebration",
      hasInnerFrame: true,
      monogram,
    },
    content: {
      cardPurpose: purpose,
      title,
      subtitle: input.familyNames
        ? isBangla
          ? `${input.familyNames}-এর পক্ষ থেকে সাদর আমন্ত্রণ`
          : `Together with ${input.familyNames}`
        : subtitle,
      brideName: input.brideName,
      groomName: input.groomName || "",
      eventMilestone: input.eventMilestone || "",
      brideParents: input.familyNames
        ? isBangla
          ? `কন্যা: ${input.familyNames.split("&")[0] || ""}`
          : `Daughter of ${input.familyNames.split("&")[0] || ""}`
        : "",
      groomParents:
        input.familyNames && input.groomName
          ? isBangla
            ? `পুত্র: ${input.familyNames.split("&")[1] || ""}`
            : `Son of ${input.familyNames.split("&")[1] || ""}`
          : "",
      weddingDate: input.weddingDate,
      weddingTime: input.weddingTime || (isBangla ? "সন্ধ্যা ৬:০০ ঘটিকা" : "6:00 PM in the evening"),
      venue: input.venue,
      city: input.city || "",
      message:
        input.invitationMessage ||
        (isBangla
          ? purpose === "birthday"
            ? "আমাদের প্রিয় সন্তানের আনন্দময় জন্মদিনের সন্ধ্যায় আপনি সবান্ধব আমন্ত্রিত।"
            : purpose === "corporate"
            ? "আমাদের বাৎসরিক সাফল্য ও উদ্ভাবনী উদযাপনে আপনার সানন্দ উপস্থিতি আমাদের সম্মানিত করবে।"
            : "আমাদের জীবনের এই আনন্দঘন শুভলগ্নে আপনাদের সস্নেহ উপস্থিতি ও দোয়া একান্ত কাম্য।"
          : purpose === "birthday"
          ? "Join us for an evening of joyous laughter, delicious cake, and delightful music."
          : purpose === "corporate"
          ? "Cordially requests the honour of your presence at our celebratory annual event."
          : "Request the honour of your presence to celebrate our special day and newly blessed journey."),
      rsvpDetails: input.rsvpDetails || (isBangla ? "যোগাযোগ ও নিশ্চিতকরণ" : "RSVP by card or online"),
      bilingualBrideName: input.brideName,
      bilingualGroomName: input.groomName || "",
      bilingualMessage,
    },
    aiDesignNotes: `Curated bespoke layout for ${purpose} celebration using the ${template} template with ${palette.name} tones.`,
  };
}

export async function generateWeddingDesign(userInput) {
  const configured = isGeminiConfigured();
  const apiKey = getApiKey();
  const purpose = userInput.cardPurpose || "wedding";

  // If no Gemini key, synthesize immediately
  if (!configured) {
    return {
      success: true,
      source: "algorithmic-fallback",
      data: buildAlgorithmicDesign(userInput),
      notice: "Generated using built-in design atelier engine. Configure GEMINI_API_KEY in .env.local to enable live generative AI responses.",
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are Wedly AI, an elite bespoke luxury invitation designer and typographer.
Generate a strictly validated JSON design specification for a card based on the following event & host input:

EVENT PURPOSE: "${purpose}" (e.g. 'wedding', 'birthday', 'invitation', 'corporate', 'other')
EVENT DETAILS:
- Primary Name / Host / Celebrant: "${userInput.brideName}"
- Partner / Groom Name (if wedding): "${userInput.groomName || ""}"
- Milestone / Event Subtitle: "${userInput.eventMilestone || ""}"
- Event Date: "${userInput.weddingDate}"
- Event Time: "${userInput.weddingTime || "6:00 PM"}"
- Venue: "${userInput.venue}"
- City: "${userInput.city || ""}"
- Personal Message: "${userInput.invitationMessage || ""}"
- Host / Family Names: "${userInput.familyNames || ""}"
- RSVP Details: "${userInput.rsvpDetails || ""}"
- Desired Language: "${userInput.language || "en"}" (Options: 'en', 'bn', 'bilingual')
- Cultural Style: "${userInput.culturalPreference || "classic"}" (e.g. 'islamic', 'bangladeshi', 'western', 'royal', 'festive')
- Design Style: "${userInput.designStyle || "luxury"}"
- Preferred Palette: "${userInput.colorPalette || "emerald-gold"}"
- Orientation: "${userInput.orientation || "portrait"}"

CRITICAL RULES:
1. Return ONLY a single JSON object. No markdown wrappers like \`\`\`json or commentary.
2. Adapt the title, subtitle, and message respectfully to the PURPOSE:
   - For 'birthday': create a celebratory title like "YOU'RE INVITED TO CELEBRATE" / "শুভ জন্মদিন", celebrate the individual.
   - For 'invitation' / party: create an elegant invitation header like "CORDIALLY INVITED" / "বিশেষ নিমন্ত্রণ".
   - For 'corporate': create a prestigious, black-tie executive phrasing.
   - For 'wedding': create timeless bridal and ceremonial phrasing.
3. Select the most fitting 'template' from: "emerald-royal", "ivory-floral", "modern-minimal", "traditional-celebration", "romantic-blush", "mogul-heritage", "celestial-sapphire", "vintage-botanical", "golden-glamour".
4. The 'palette' must contain rich hex color strings for: name, background, primary, secondary, accent, cardBg, textPrimary, textMuted, borderColor.
5. LANGUAGE & SCRIPT RULES:
   - If Desired Language is 'bn' (Bangla): ALL card textual content ("content.title", "content.subtitle", "content.message", "content.rsvpDetails") MUST BE WRITTEN IN PURE, ELEGANT, POETIC BENGALI SCRIPT (বাংলা ভাষা).
     * DO NOT use English phrases like "Wedding Celebration", "Together with our families", or "Cordially invited" when language is 'bn'.
     * For Islamic events: title "শুভ নিকাহ্ ও ওয়ালীমা অনুষ্ঠান", subtitle "বিসমিল্লাহির রাহমানির রাহিম — পরিবারের সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব".
     * For Traditional/Bangladeshi wedding: title "মাঙ্গলিক শুভ পরিণয় উৎসব", subtitle "পারিবারিক সান্নিধ্যে আমাদের শুভ বিবাহ উৎসব".
     * For Birthday: title "শুভ জন্মদিন", subtitle "শুভ জন্মদিন উপলক্ষে আনন্দঘন আমন্ত্রণ".
     * Set "typography.headingFont": "Hind Siliguri" and "typography.bodyFont": "Hind Siliguri".
   - If Desired Language is 'bilingual': provide English for primary fields and authentic Bengali in 'content.bilingualBrideName', 'content.bilingualGroomName', and 'content.bilingualMessage'.
6. Do NOT invent dates, venues, or primary names. Preserve all user details faithfully.

JSON STRUCTURE REQUIRED:
{
  "template": "emerald-royal" | "ivory-floral" | "modern-minimal" | "traditional-celebration" | "romantic-blush" | "mogul-heritage" | "celestial-sapphire" | "vintage-botanical" | "golden-glamour",
  "language": "en" | "bn" | "bilingual",
  "culturalStyle": string,
  "orientation": "portrait" | "landscape",
  "palette": {
    "name": string,
    "background": string,
    "primary": string,
    "secondary": string,
    "accent": string,
    "cardBg": string,
    "textPrimary": string,
    "textMuted": string,
    "borderColor": string
  },
  "typography": {
    "headingFont": "Playfair Display" | "Hind Siliguri",
    "bodyFont": "DM Sans" | "Hind Siliguri",
    "bengaliFont": "Hind Siliguri",
    "headingSize": "lg",
    "textAlign": "center",
    "letterSpacing": "wide"
  },
  "decorations": {
    "hasFloralCorners": boolean,
    "hasGoldBorder": boolean,
    "hasWaxSeal": boolean,
    "hasBotanicalBranch": boolean,
    "hasTraditionalMotif": boolean,
    "hasInnerFrame": boolean,
    "monogram": string
  },
  "content": {
    "cardPurpose": "wedding" | "birthday" | "invitation" | "corporate" | "other",
    "title": string,
    "subtitle": string,
    "brideName": string,
    "groomName": string,
    "eventMilestone": string,
    "brideParents": string,
    "groomParents": string,
    "weddingDate": string,
    "weddingTime": string,
    "venue": string,
    "city": string,
    "message": string,
    "rsvpDetails": string,
    "bilingualBrideName": string,
    "bilingualGroomName": string,
    "bilingualMessage": string
  },
  "aiDesignNotes": string
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text || "";
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const parsed = JSON.parse(cleanJson);
    const validated = DesignSpecificationSchema.safeParse(parsed);

    if (validated.success) {
      return {
        success: true,
        source: "gemini-api",
        data: validated.data,
      };
    } else {
      console.warn("Gemini JSON did not pass Zod schema:", validated.error);
      return {
        success: true,
        source: "algorithmic-fallback",
        data: buildAlgorithmicDesign(userInput),
        notice: "Gemini response required schema adjustment; sanitized specification loaded successfully.",
      };
    }
  } catch (error) {
    console.error("Gemini API call failed:", error.message);
    return {
      success: true,
      source: "algorithmic-fallback",
      data: buildAlgorithmicDesign(userInput),
      notice: `Gemini API notice: ${error.message}. Fallback design atelier generated successfully.`,
    };
  }
}

export async function refineWeddingDesign(currentDesign, quickAction) {
  const updated = JSON.parse(JSON.stringify(currentDesign));

  switch (quickAction) {
    case "more-luxurious":
      updated.template = "emerald-royal";
      updated.palette = PALETTE_PRESETS["emerald-gold"];
      updated.decorations.hasGoldBorder = true;
      updated.decorations.hasWaxSeal = true;
      updated.decorations.hasInnerFrame = true;
      updated.aiDesignNotes = "Refined with deep imperial emerald tones, gold foil stamping, and monogram seal.";
      break;

    case "floral-style":
      updated.template = "ivory-floral";
      updated.palette = PALETTE_PRESETS["ivory-sage"];
      updated.decorations.hasFloralCorners = true;
      updated.decorations.hasBotanicalBranch = true;
      updated.aiDesignNotes = "Switched to botanical eucalyptus watercolor wash and deckle-edged styling.";
      break;

    case "more-minimal":
      updated.template = "modern-minimal";
      updated.decorations.hasFloralCorners = false;
      updated.decorations.hasBotanicalBranch = false;
      updated.decorations.hasTraditionalMotif = false;
      updated.decorations.hasInnerFrame = false;
      updated.typography.letterSpacing = "wider";
      updated.aiDesignNotes = "Stripped to editorial minimalism with expansive negative space.";
      break;

    case "traditional":
      updated.template = "traditional-celebration";
      updated.palette = PALETTE_PRESETS["burgundy-champagne"];
      updated.decorations.hasTraditionalMotif = true;
      updated.decorations.hasGoldBorder = true;
      if (updated.language === "en") updated.language = "bilingual";
      updated.aiDesignNotes = "Infused with rich cultural arabesques, paisley motifs, and ceremonial accents.";
      break;

    case "improve-wording":
      updated.content.title = "The Honour of Your Presence";
      updated.content.subtitle = "Together with their loving families";
      updated.content.message =
        "Invite you to share in the joy and blessings of their wedding celebration as two lives become one.";
      updated.aiDesignNotes = "Polished wording for maximum elegance and emotional warmth.";
      break;

    default:
      break;
  }

  return updated;
}
