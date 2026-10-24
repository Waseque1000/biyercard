import { z } from "zod";

export const ColorPaletteSchema = z.object({
  name: z.string().default("Custom"),
  background: z.string().default("#FAF8F4"),
  primary: z.string().default("#173D32"),
  secondary: z.string().default("#285C49"),
  accent: z.string().default("#C6A66B"),
  cardBg: z.string().default("#FFFFFF"),
  textPrimary: z.string().default("#252923"),
  textMuted: z.string().default("#77766F"),
  borderColor: z.string().default("#E8E2D8"),
});

export const TypographySchema = z.object({
  headingFont: z.string().default("Playfair Display"),
  bodyFont: z.string().default("DM Sans"),
  bengaliFont: z.string().default("Hind Siliguri"),
  headingSize: z.enum(["sm", "md", "lg", "xl"]).default("lg"),
  textAlign: z.enum(["left", "center", "right"]).default("center"),
  letterSpacing: z.enum(["normal", "wide", "wider"]).default("wide"),
});

export const InvitationContentSchema = z.object({
  cardPurpose: z.enum(["wedding", "birthday", "invitation", "corporate", "other"]).default("wedding"),
  title: z.string().default("Wedding Celebration"),
  subtitle: z.string().default("Together with their families"),
  brideName: z.string().min(1, "Primary name or celebrant is required"),
  groomName: z.string().optional().default(""),
  eventMilestone: z.string().optional().default(""),
  brideParents: z.string().optional().default(""),
  groomParents: z.string().optional().default(""),
  weddingDate: z.string().min(1, "Event date is required"),
  weddingTime: z.string().optional().default("5:00 PM"),
  venue: z.string().min(1, "Venue is required"),
  city: z.string().optional().default(""),
  message: z.string().default("Request the honour of your presence to celebrate our special day."),
  rsvpDetails: z.string().optional().default("RSVP by phone or online"),
  bilingualBrideName: z.string().optional().default(""),
  bilingualGroomName: z.string().optional().default(""),
  bilingualMessage: z.string().optional().default(""),
});

export const DecorationsSchema = z.object({
  hasFloralCorners: z.boolean().default(true),
  hasGoldBorder: z.boolean().default(true),
  hasWaxSeal: z.boolean().default(true),
  hasBotanicalBranch: z.boolean().default(false),
  hasTraditionalMotif: z.boolean().default(false),
  hasInnerFrame: z.boolean().default(true),
  monogram: z.string().default(""),
});

export const DesignSpecificationSchema = z.object({
  template: z.enum([
    "emerald-royal",
    "ivory-floral",
    "modern-minimal",
    "traditional-celebration",
    "romantic-blush",
    "mogul-heritage",
    "celestial-sapphire",
    "vintage-botanical",
    "golden-glamour",
  ]).default("emerald-royal"),
  language: z.enum(["en", "bn", "bilingual"]).default("en"),
  culturalStyle: z.string().default("classic"),
  orientation: z.enum(["portrait", "landscape"]).default("portrait"),
  palette: ColorPaletteSchema,
  typography: TypographySchema,
  decorations: DecorationsSchema,
  content: InvitationContentSchema,
  aiDesignNotes: z.string().optional().default(""),
});

export const WizardFormSchema = z.object({
  cardPurpose: z.enum(["wedding", "birthday", "invitation", "corporate", "other"]).default("wedding"),
  brideName: z.string().min(1, "Name is required"),
  groomName: z.string().optional().default(""),
  eventMilestone: z.string().optional().default(""),
  weddingDate: z.string().min(1, "Date is required"),
  weddingTime: z.string().optional(),
  venue: z.string().min(1, "Venue is required"),
  city: z.string().optional(),
  invitationMessage: z.string().optional(),
  familyNames: z.string().optional(),
  rsvpDetails: z.string().optional(),
  language: z.enum(["en", "bn", "bilingual"]).default("en"),
  culturalPreference: z.string().default("classic"),
  designStyle: z.string().default("luxury"),
  colorPalette: z.string().default("emerald-gold"),
  decorations: z.array(z.string()).default(["floral-corners", "gold-border"]),
  orientation: z.enum(["portrait", "landscape"]).default("portrait"),
});
