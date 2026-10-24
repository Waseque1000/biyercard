"use client";

import React from "react";
import { TraditionalMandala, IslamicArchBorder, CornerFlourish, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function TraditionalCelebration({ design }) {
  const { content, palette, decorations, language, culturalStyle } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual" || language === "bn";

  const cardBg = palette?.cardBg || "#FAF7F3";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FEF3C7" : "#5A1827");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#FACC15" : "#83283B");
  const accentColor = palette?.accent || "#D4AF37";
  const textMuted = palette?.textMuted || (isDark ? "#DFD4C8" : "#7A6367");

  const isIslamic = culturalStyle === "islamic";
  const isHindu = culturalStyle === "hindu";

  const brideName = content?.brideName || "নুসরাত জাহান";
  const groomName = content?.groomName || "তানভীর হাসান";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 12%, ${accentColor}30 0%, transparent 60%),
            radial-gradient(ellipse at 50% 88%, rgba(0,0,0,0.5) 0%, transparent 60%)
          `
          : `
            radial-gradient(ellipse at 50% 12%, ${accentColor}22 0%, transparent 60%),
            radial-gradient(ellipse at 50% 88%, ${primaryColor}14 0%, transparent 60%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.4),
          inset 0 0 0 1px ${accentColor}55,
          inset 0 0 50px ${accentColor}0e
        `,
      }}
    >
      {/* Traditional Rangoli / Mandala Subtle Watermark Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${isDark ? "#FFF" : primaryColor} 1.5px, transparent 1.5px),
            radial-gradient(circle at 0% 0%, ${accentColor} 2px, transparent 2px),
            radial-gradient(circle at 100% 100%, ${accentColor} 2px, transparent 2px)
          `,
          backgroundSize: "28px 28px, 56px 56px, 56px 56px",
        }}
      />

      {/* Decorative Ornate Frame */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[2px]"
        style={{
          border: `1.5px solid ${accentColor}80`,
          boxShadow: `inset 0 0 0 1.5px ${primaryColor}15, 0 0 10px ${accentColor}25`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4.5 pointer-events-none rounded-[2px]"
        style={{
          border: `0.75px dashed ${accentColor}85`,
        }}
      />

      {/* Corner Flourishes */}
      <CornerFlourish
        className="absolute top-3.5 left-3.5 pointer-events-none drop-shadow-xs"
        color={accentColor}
        size={36}
      />
      <CornerFlourish
        className="absolute top-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-x-100"
        color={accentColor}
        size={36}
      />
      <CornerFlourish
        className="absolute bottom-3.5 left-3.5 pointer-events-none drop-shadow-xs -scale-y-100"
        color={accentColor}
        size={36}
      />
      <CornerFlourish
        className="absolute bottom-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-100"
        color={accentColor}
        size={36}
      />

      {/* Islamic Arch Border or Traditional Mandala at Top */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1">
        {isIslamic ? (
          <IslamicArchBorder color={accentColor} className="opacity-95 h-7 mb-1" />
        ) : (
          <div className="flex justify-center mb-1">
            <TraditionalMandala color={accentColor} size={46} className="drop-shadow-xs" />
          </div>
        )}

        {/* Sacred / Auspicious Blessing Header */}
        {isIslamic ? (
          <span
            className="text-[13px] sm:text-[14px] font-semibold tracking-wide drop-shadow-xs"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), Georgia, serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰনِ الرَّحِيمِ
          </span>
        ) : isHindu ? (
          <span
            className="text-[12px] sm:text-[13px] font-semibold"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-6 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
            <span
              className="text-[10px] sm:text-[11px] font-semibold"
              style={getSafeTextStyle(
                content?.cardPurpose === "birthday"
                  ? "আনন্দঘন শুভ জন্মদিন"
                  : content?.cardPurpose === "invitation"
                  ? "আন্তরিক শুভ নিমন্ত্রণ"
                  : content?.cardPurpose === "corporate"
                  ? "সম্মানিত আমন্ত্রণ পত্র"
                  : "মাঙ্গলিক শুভ পরিণয় উৎসব",
                {
                  isSerif: true,
                  color: isDark ? accentColor : primaryColor,
                  tracking: "0.22em",
                  uppercase: true,
                }
              )}
            >
              {content?.cardPurpose === "birthday"
                ? "আনন্দঘন শুভ জন্মদিন"
                : content?.cardPurpose === "invitation"
                ? "আন্তরিক শুভ নিমন্ত্রণ"
                : content?.cardPurpose === "corporate"
                ? "সম্মানিত আমন্ত্রণ পত্র"
                : "মাঙ্গলিক শুভ পরিণয় উৎসব"}
            </span>
            <span className="w-6 h-[1px]" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
          </div>
        )}

        <h3
          className="text-xs sm:text-sm font-semibold pt-0.5"
          style={getSafeTextStyle(content?.title || (isIslamic ? "নিকাহ ও ওলিমা অনুষ্ঠান" : "শুভ বিবাহ উৎসব"), {
            isSerif: true,
            color: accentColor,
            tracking: "0.2em",
            uppercase: true,
          })}
        >
          {content?.title || (isIslamic ? "নিকাহ ও ওলিমা অনুষ্ঠান" : "শুভ বিবাহ উৎসব")}
        </h3>

        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px] max-w-xs"
            style={getSafeTextStyle(content.subtitle, {
              isSerif: true,
              color: textMuted,
              italic: !hasBengali(content.subtitle),
            })}
          >
            {content.subtitle}
          </p>
        )}
      </div>

      {/* NAMES (COUPLE OR CELEBRANT) */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {content?.groomName ? (
          <div className="w-full flex flex-col items-center">
            <div className="space-y-0.5">
              <h1
                className="text-3xl sm:text-4xl md:text-[40px] font-semibold leading-[1.15] drop-shadow-xs"
                style={getSafeTextStyle(brideName, {
                  isSerif: true,
                  color: textColor,
                })}
              >
                {brideName}
              </h1>
              {content?.brideParents && (
                <p
                  className="text-[10px] sm:text-[11px]"
                  style={getSafeTextStyle(content.brideParents, {
                    isSerif: false,
                    color: textMuted,
                    italic: !hasBengali(content.brideParents),
                  })}
                >
                  {content.brideParents}
                </p>
              )}
            </div>

            {/* Traditional Filigree Divider */}
            <div className="my-2 flex items-center justify-center gap-2.5 w-full max-w-[200px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center border"
                style={{
                  borderColor: accentColor,
                  background: `radial-gradient(circle, ${accentColor}25 0%, transparent 80%)`,
                }}
              >
                <span
                  className="text-base sm:text-lg font-medium"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "Weds", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "Weds"}
                </span>
              </div>
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <div className="space-y-0.5">
              <h1
                className="text-3xl sm:text-4xl md:text-[40px] font-semibold leading-[1.15] drop-shadow-xs"
                style={getSafeTextStyle(groomName, {
                  isSerif: true,
                  color: textColor,
                })}
              >
                {groomName}
              </h1>
              {content?.groomParents && (
                <p
                  className="text-[10px] sm:text-[11px]"
                  style={getSafeTextStyle(content.groomParents, {
                    isSerif: false,
                    color: textMuted,
                    italic: !hasBengali(content.groomParents),
                  })}
                >
                  {content.groomParents}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 my-2">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] font-semibold leading-[1.15] drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <span
                className="block text-xs sm:text-sm font-semibold"
                style={getSafeTextStyle(content.eventMilestone, {
                  isSerif: false,
                  color: accentColor,
                  tracking: "0.22em",
                  uppercase: true,
                })}
              >
                {content.eventMilestone}
              </span>
            )}
            {content?.brideParents && (
              <p
                className="text-[10px] sm:text-[11px]"
                style={getSafeTextStyle(content.brideParents, {
                  isSerif: false,
                  color: textMuted,
                  italic: !hasBengali(content.brideParents),
                })}
              >
                {content.brideParents}
              </p>
            )}
          </div>
        )}

        {/* Bilingual Bengali Names */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-semibold"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: isDark ? accentColor : primaryColor,
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        <p
          className="mt-3 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center px-2"
          style={getSafeTextStyle(
            content?.message ||
              "আমাদের এই আনন্দঘন শুভলগ্নে আপনাদের সানন্দ উপস্থিতি ও প্রাণঢালা আশীর্বাদ একান্তভাবে কামনা করছি।",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "আমাদের এই আনন্দঘন শুভলগ্নে আপনাদের সানন্দ উপস্থিতি ও প্রাণঢালা আশীর্বাদ একান্তভাবে কামনা করছি।"}
        </p>

        {content?.bilingualMessage && (
          <p
            className="mt-1.5 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center font-medium"
            style={getSafeTextStyle(content.bilingualMessage, {
              isSerif: false,
              color: isDark ? accentColor : primaryColor,
            })}
          >
            {content.bilingualMessage}
          </p>
        )}
      </div>

      {/* CEREMONIAL EVENT DETAILS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Date & Time Badge */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}25 0%, rgba(255,255,255,0.06) 50%, ${accentColor}25 100%)`
              : `linear-gradient(135deg, ${accentColor}25 0%, ${cardBg} 50%, ${accentColor}25 100%)`,
            border: `1.2px solid ${accentColor}75`,
            boxShadow: `0 2px 10px ${accentColor}25`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "শুক্রবার, ১২ই ডিসেম্বর ২০২৭", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "শুক্রবার, ১২ই ডিসেম্বর ২০২৭"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-50" style={{ color: accentColor }}>•</span>
              <span
                style={getSafeTextStyle(content.weddingTime, {
                  isSerif: false,
                  color: isDark ? accentColor : secondaryColor,
                })}
              >
                {content.weddingTime}
              </span>
            </>
          )}
        </div>

        <div>
          <p
            className="text-base sm:text-lg font-medium leading-snug drop-shadow-xs"
            style={getSafeTextStyle(content?.venue || "গ্র্যান্ড বলরুম, র্যাডিসন ব্লু", {
              isSerif: true,
              color: textColor,
            })}
          >
            {content?.venue || "গ্র্যান্ড বলরুম, র্যাডিসন ব্লু"}
          </p>
          {content?.city && (
            <p
              className="text-[10px] sm:text-[11px] font-medium"
              style={getSafeTextStyle(content.city, {
                isSerif: false,
                color: textMuted,
                tracking: hasBengali(content.city) ? "0px" : "0.15em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {/* Wax Seal Monogram */}
        {decorations?.hasWaxSeal !== false && (
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "ন"}&${groomName?.[0] || "ত"}`
              }
              color={accentColor}
              size={44}
            />
          </div>
        )}

        {content?.rsvpDetails && (
          <p
            className="text-[10px] sm:text-[11px] pt-0.5"
            style={getSafeTextStyle(content.rsvpDetails, {
              isSerif: false,
              color: textMuted,
            })}
          >
            {content.rsvpDetails}
          </p>
        )}
      </div>
    </div>
  );
}
