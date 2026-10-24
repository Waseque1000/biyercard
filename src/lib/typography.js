/**
 * Wedly AI Typography & Bengali Script Calibration Engine
 * 
 * Bengali (বাংলা) is a Brahmic abugida script with complex ligatures (যুক্তাক্ষর)
 * and combining vowel diacritics (কারচিহ্ন/হসন্ত/মাত্রা).
 * 
 * CRITICAL TYPOGRAPHIC RULES:
 * 1. NEVER apply `letter-spacing` (tracking) to Bengali text. Letter-spacing forcefully
 *    breaks apart combining marks (ি, ী, ু, ে, ৈ, ো, ৌ, ্) from base consonants,
 *    resulting in disfigured dotted circle placeholders (◌া, ◌ি) and broken words.
 * 2. NEVER apply `font-style: italic` to Bengali script. It tilts the horizontal headstroke (মাত্রা)
 *    and produces harsh visual distortions.
 * 3. NEVER apply `text-transform: uppercase/lowercase` to Bengali script.
 * 4. Ensure adequate `line-height` so upper matras (ৈ, ৌ, ঁ) and lower rashtras (ু, ূ, ৃ, ্)
 *    are never clipped.
 */

// Regular expression to detect any Bengali Unicode codepoint (U+0980 to U+09FF)
export const BENGALI_REGEX = /[\u0980-\u09FF]/;

/**
 * Checks if a string contains Bengali script characters.
 */
export function hasBengali(text) {
  if (!text) return false;
  return BENGALI_REGEX.test(String(text));
}

/**
 * Checks if any property in an invitation content object contains Bengali text.
 */
export function contentHasBengali(content) {
  if (!content) return false;
  return Object.values(content).some((val) => typeof val === "string" && hasBengali(val));
}

/**
 * Primary Bengali font stacks with high-quality webfont and system fallbacks.
 */
export const BENGALI_FONT_STACK_SANS =
  "var(--font-hind-siliguri), 'Hind Siliguri', 'SolaimanLipi', 'Kalpurush', 'Anek Bangla', 'Segoe UI', -apple-system, sans-serif";

export const BENGALI_FONT_STACK_SERIF =
  "var(--font-noto-serif-bengali), var(--font-hind-siliguri), 'Noto Serif Bengali', 'Tiro Bangla', 'SolaimanLipi', 'Kalpurush', Georgia, serif";

export const ENGLISH_FONT_STACK_SERIF =
  "var(--font-playfair), 'Playfair Display', Didot, 'Bodoni MT', Georgia, serif";

export const ENGLISH_FONT_STACK_SANS =
  "var(--font-dm-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * Generates safe CSS styles for any text string, automatically applying
 * correct fonts and disabling breaking CSS rules (tracking, italic, transform)
 * whenever Bengali text is detected.
 *
 * @param {string} text - The text content to be rendered
 * @param {object} options
 * @param {boolean} options.isSerif - Whether to prefer serif styling
 * @param {boolean} options.italic - Desired italic for English text (automatically suppressed for Bengali)
 * @param {string} options.tracking - Desired Tailwind/CSS tracking for English (e.g., '0.2em', automatically 'normal' for Bengali)
 * @param {string} options.uppercase - Whether English text should be uppercase
 * @param {number|string} options.fontWeight - Custom font weight
 * @returns {object} Inline CSS style object
 */
export function getSafeTextStyle(text, options = {}) {
  const isBn = hasBengali(text);
  const {
    isSerif = false,
    italic = false,
    tracking = undefined,
    uppercase = false,
    fontWeight = undefined,
    color = undefined,
    lineHeight = undefined,
  } = options;

  const style = {};

  // Color
  if (color) {
    style.color = color;
  }

  // Font Family
  if (isBn) {
    style.fontFamily = isSerif ? BENGALI_FONT_STACK_SERIF : BENGALI_FONT_STACK_SANS;
    // Overrule tracking, italic and uppercase to prevent breaking Bengali ligatures
    style.letterSpacing = "0px";
    style.fontStyle = "normal";
    style.textTransform = "none";
    style.lineHeight = lineHeight || "1.35";
    if (fontWeight) {
      style.fontWeight = fontWeight;
    } else {
      style.fontWeight = isSerif ? 600 : 500;
    }
  } else {
    style.fontFamily = isSerif ? ENGLISH_FONT_STACK_SERIF : ENGLISH_FONT_STACK_SANS;
    if (italic) style.fontStyle = "italic";
    if (tracking) style.letterSpacing = tracking;
    if (uppercase) style.textTransform = "uppercase";
    if (fontWeight) style.fontWeight = fontWeight;
    if (lineHeight) style.lineHeight = lineHeight;
  }

  return style;
}

/**
 * Converts English digits (0-9) to Bangla digits (০-৯) for localized dates/phone numbers.
 */
export function toBengaliNumerals(str) {
  if (!str) return "";
  const enToBn = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };
  return String(str).replace(/[0-9]/g, (digit) => enToBn[digit] || digit);
}

/**
 * Checks whether a hex color is dark (returns true if dark, false if light).
 */
export function isDarkBg(hex) {
  if (!hex || typeof hex !== "string") return false;
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 145;
  }
  if (clean.length >= 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 145;
  }
  return false;
}
