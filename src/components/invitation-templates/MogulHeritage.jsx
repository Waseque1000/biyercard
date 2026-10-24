"use client";

import React from "react";
import { MughalArchMotif, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function MogulHeritage({ design }) {
  const { content, palette, decorations, language, culturalStyle } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#4A0E17";
  const secondaryColor = palette?.secondary || "#7A1C2A";
  const accentColor = palette?.accent || "#D4AF37";
  const cardBg = palette?.cardBg || "#FCFAF7";
  const textMuted = palette?.textMuted || "#6D585B";

  const isIslamic = culturalStyle === "islamic";
  const isHindu = culturalStyle === "hindu";

  const brideName = content?.brideName || "নুসরাত জাহান";
  const groomName = content?.groomName || "ফারহান আহমেদ";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-9 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 24px 60px -15px rgba(74, 14, 23, 0.25), inset 0 0 0 1px rgba(212, 175, 55, 0.4), inset 0 0 50px rgba(212, 175, 55, 0.08)",
      }}
    >
      {/* Outer Mughal Ornate Frame */}
      <div
        className="absolute inset-2.5 sm:inset-3.5 pointer-events-none rounded-[3px]"
        style={{
          border: `1.5px solid ${accentColor}60`,
          boxShadow: `inset 0 0 0 2px ${primaryColor}15, 0 0 10px ${accentColor}20`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[2px]"
        style={{
          border: `0.75px dashed ${accentColor}80`,
        }}
      />

      {/* Mughal Jaali Corner Insets */}
      <div
        className="absolute top-4 left-4 w-6 h-6 pointer-events-none border-t-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute top-4 right-4 w-6 h-6 pointer-events-none border-t-2 border-r-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-4 left-4 w-6 h-6 pointer-events-none border-b-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none border-b-2 border-r-2"
        style={{ borderColor: accentColor }}
      />

      {/* TOP HEADER: MUGHAL ARCH & SACRED/BLESSING BANNER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1 space-y-1">
        <MughalArchMotif color={accentColor} className="mb-1" />

        {isIslamic ? (
          <span
            className="text-xs sm:text-sm font-medium tracking-wide"
            style={{ color: accentColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰনِ الرَّحِيمِ
          </span>
        ) : isHindu ? (
          <span
            className="text-xs sm:text-sm font-medium"
            style={{ color: accentColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-5 h-[1px]" style={{ backgroundColor: `${accentColor}70` }} />
            <span
              className="text-[10px] sm:text-[11px] font-semibold"
              style={getSafeTextStyle(content?.title || "মাঙ্গলিক শুভ পরিণয়", {
                isSerif: true,
                color: accentColor,
                tracking: "0.2em",
                uppercase: true,
              })}
            >
              {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ পরিণয়" : "ROYAL WEDDING INVITATION")}
            </span>
            <span className="w-5 h-[1px]" style={{ backgroundColor: `${accentColor}70` }} />
          </div>
        )}

        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px] mt-0.5"
            style={getSafeTextStyle(content.subtitle, {
              isSerif: true,
              color: textMuted,
              italic: true,
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
              className="text-3xl sm:text-4xl md:text-[40px] leading-tight font-medium"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
              })}
            >
              {brideName}
            </h1>

            {/* Royal Gold Filigree Divider */}
            <div className="flex items-center justify-center gap-3 my-2 w-full max-w-[200px]">
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}70` }} />
              <span
                className="text-lg sm:text-xl font-medium"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                  isSerif: true,
                  color: accentColor,
                  italic: !hasBengali(brideName) && !isBangla,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "&"}
              </span>
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}70` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-tight font-medium"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(groomName) ? 600 : 500,
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[38px] leading-tight font-medium"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
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
                  tracking: "0.2em",
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
              color: secondaryColor,
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
            backgroundColor: `${accentColor}15`,
            border: `1px solid ${accentColor}50`,
            color: primaryColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "শুক্রবার • ১২ই ডিসেম্বর ২০২৭", {
              isSerif: false,
              color: primaryColor,
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
                  color: primaryColor,
                })}
              >
                {content.weddingTime}
              </span>
            </>
          )}
        </div>

        {/* Venue */}
        <div className="space-y-0.5">
          <p
            className="text-base sm:text-lg font-medium leading-snug"
            style={getSafeTextStyle(content?.venue || "গ্র্যান্ড বলরুম, প্যান প্যাসিফিক সোনারগাঁও", {
              isSerif: true,
              color: primaryColor,
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
                tracking: hasBengali(content.city) ? "0px" : "0.15em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {/* Wax Seal / Monogram */}
        {decorations?.hasWaxSeal && (
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations.monogram ||
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
            className="text-[10px] sm:text-[11px] pt-1"
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
