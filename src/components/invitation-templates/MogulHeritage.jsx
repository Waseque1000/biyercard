"use client";

import React from "react";
import { MughalArchMotif, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function MogulHeritage({ design }) {
  const { content, palette, decorations, language, culturalStyle } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FCFAF6";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#F7EEDB" : "#4A0E17");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#E5C072" : "#7A1C2A");
  const accentColor = palette?.accent || "#D4AF37";
  const textMuted = palette?.textMuted || (isDark ? "#D6C7B8" : "#6D585B");

  const isIslamic = culturalStyle === "islamic";
  const isHindu = culturalStyle === "hindu";

  const brideName = content?.brideName || "নুসরাত জাহান";
  const groomName = content?.groomName || "ফারহান আহমেদ";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 15%, ${accentColor}30 0%, transparent 60%),
            radial-gradient(ellipse at 50% 85%, rgba(0,0,0,0.5) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 15%, ${accentColor}22 0%, transparent 60%),
            radial-gradient(ellipse at 50% 85%, ${primaryColor}14 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.4),
          inset 0 0 0 1px ${accentColor}55,
          inset 0 0 60px ${accentColor}12
        `,
      }}
    >
      {/* Mughal Jaali Lattice Subtle Watermark Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${isDark ? "#FFF" : primaryColor} 1.5px, transparent 1.5px),
            linear-gradient(45deg, transparent 48%, ${isDark ? "#FFF" : primaryColor} 49%, ${isDark ? "#FFF" : primaryColor} 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, ${isDark ? "#FFF" : primaryColor} 49%, ${isDark ? "#FFF" : primaryColor} 51%, transparent 52%)
          `,
          backgroundSize: "24px 24px, 24px 24px, 24px 24px",
        }}
      />

      {/* Mughal Outer & Inner Ornate Borders */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[3px]"
        style={{
          border: `1.5px solid ${accentColor}80`,
          boxShadow: `inset 0 0 0 2px ${primaryColor}15, 0 0 10px ${accentColor}25`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4.5 pointer-events-none rounded-[2px]"
        style={{
          border: `0.75px dashed ${accentColor}85`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-6 pointer-events-none rounded-[1px]"
        style={{
          border: `0.5px solid ${accentColor}35`,
        }}
      />

      {/* Mughal Jaali Corner Insets & L-Brackets */}
      <div
        className="absolute top-3 left-3 w-7 h-7 pointer-events-none border-t-2 border-l-2"
        style={{ borderColor: accentColor }}
      >
        <div className="w-1.5 h-1.5 m-0.5 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>
      <div
        className="absolute top-3 right-3 w-7 h-7 pointer-events-none border-t-2 border-r-2"
        style={{ borderColor: accentColor }}
      >
        <div className="w-1.5 h-1.5 m-0.5 ml-auto rounded-full" style={{ backgroundColor: accentColor }} />
      </div>
      <div
        className="absolute bottom-3 left-3 w-7 h-7 pointer-events-none border-b-2 border-l-2"
        style={{ borderColor: accentColor }}
      >
        <div className="w-1.5 h-1.5 m-0.5 mt-auto rounded-full" style={{ backgroundColor: accentColor }} />
      </div>
      <div
        className="absolute bottom-3 right-3 w-7 h-7 pointer-events-none border-b-2 border-r-2"
        style={{ borderColor: accentColor }}
      >
        <div className="w-1.5 h-1.5 m-0.5 mt-auto ml-auto rounded-full" style={{ backgroundColor: accentColor }} />
      </div>

      {/* TOP HEADER: MUGHAL ARCH & SACRED/BLESSING BANNER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <MughalArchMotif color={accentColor} className="mb-0.5" />

        {isIslamic ? (
          <span
            className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-xs"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰনِ الرَّحِيمِ
          </span>
        ) : isHindu ? (
          <span
            className="text-xs sm:text-sm font-semibold"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
            <span
              className="text-[10px] sm:text-[11px] font-semibold"
              style={getSafeTextStyle(content?.title || "মাঙ্গলিক শুভ পরিণয়", {
                isSerif: true,
                color: isDark ? accentColor : primaryColor,
                tracking: "0.22em",
                uppercase: true,
              })}
            >
              {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ পরিণয়" : "ROYAL WEDDING INVITATION")}
            </span>
            <span className="w-5 h-[1px]" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
          </div>
        )}

        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px]"
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

      {/* CENTER: COUPLE NAMES & ROYAL KNOT */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-medium drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
              })}
            >
              {brideName}
            </h1>

            {/* Royal Gold Filigree Divider */}
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[210px]">
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
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "&"}
                </span>
              </div>
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-medium drop-shadow-xs"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(groomName) ? 600 : 500,
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-medium drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <span
                className="mt-2 text-xs sm:text-sm font-semibold"
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
          </div>
        )}

        {/* Bilingual Bengali Sub-Names (if bilingual) */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: isDark ? accentColor : secondaryColor,
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        {/* Invitation Message */}
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
      </div>

      {/* BOTTOM LOGISTICS: DATE, TIME & VENUE */}
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
            style={getSafeTextStyle(content?.weddingDate || "শুক্রবার • ১২ই ডিসেম্বর ২০২৭", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "শুক্রবার • ১২ই ডিসেম্বর ২০২৭"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-50" style={{ color: accentColor }}>•</span>
              <span
                style={getSafeTextStyle(content.weddingTime, {
                  isSerif: false,
                  color: isDark ? accentColor : textColor,
                })}
              >
                {content.weddingTime}
              </span>
            </>
          )}
        </div>

        {/* Venue */}
        <div className="space-y-0.5 pt-0.5">
          <p
            className="text-base sm:text-lg font-medium leading-snug drop-shadow-xs"
            style={getSafeTextStyle(content?.venue || "গ্র্যান্ড বলরুম, প্যান প্যাসিফিক সোনারগাঁও", {
              isSerif: true,
              color: textColor,
            })}
          >
            {content?.venue || "গ্র্যান্ড বলরুম, প্যান প্যাসিফিক সোনারগাঁও"}
          </p>
          {content?.city && (
            <p
              className="text-[10px] sm:text-[11px] font-medium"
              style={getSafeTextStyle(content.city, {
                isSerif: false,
                color: textMuted,
                tracking: hasBengali(content.city) ? "0px" : "0.16em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {/* Wax Seal / Monogram */}
        {decorations?.hasWaxSeal !== false && (
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "ন"}&${groomName?.[0] || "ফ"}`
              }
              color={accentColor}
              size={44}
            />
          </div>
        )}

        {/* RSVP Details */}
        {content?.rsvpDetails && (
          <p
            className="text-[10px] sm:text-[11px] pt-0.5"
            style={getSafeTextStyle(content.rsvpDetails, {
              isSerif: false,
              color: textMuted,
              italic: !hasBengali(content.rsvpDetails),
            })}
          >
            {content.rsvpDetails}
          </p>
        )}
      </div>
    </div>
  );
}
