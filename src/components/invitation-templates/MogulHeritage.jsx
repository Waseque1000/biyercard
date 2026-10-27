"use client";

import React from "react";
import { MughalArchMotif, OrnamentalDivider, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function MogulHeritage({ design }) {
  const { content, palette, decorations, language, culturalStyle } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#420B13";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FDE68A" : "#4A0E17");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF5" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#F59E0B" : "#7A1C2A");
  const accentColor = palette?.accent || "#E5C158";
  const textMuted = palette?.textMuted || (isDark ? "#E2D3BE" : "#6D585B");

  const isIslamic = culturalStyle === "islamic";
  const isHindu = culturalStyle === "hindu";

  const brideName = content?.brideName || "নুসরাত জাহান";
  const groomName = content?.groomName || "ফারহান আহমেদ";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 14%, ${accentColor}38 0%, transparent 62%),
            radial-gradient(circle at 50% 50%, ${secondaryColor}18 0%, transparent 55%),
            radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.6) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 14%, ${accentColor}26 0%, transparent 62%),
            radial-gradient(ellipse at 50% 90%, ${primaryColor}16 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.45),
          inset 0 0 0 1px ${accentColor}65,
          inset 0 0 65px ${accentColor}16
        `,
      }}
    >
      {/* Mughal Jaali Lattice Geometric Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${accentColor} 1.5px, transparent 1.5px),
            linear-gradient(45deg, transparent 47%, ${accentColor} 48%, ${accentColor} 52%, transparent 53%),
            linear-gradient(-45deg, transparent 47%, ${accentColor} 48%, ${accentColor} 52%, transparent 53%)
          `,
          backgroundSize: "26px 26px",
        }}
      />

      {/* Full-Height Mughal Shahi Jharokha Arch Sanctuary Frame */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[3px]"
        style={{
          border: `1.8px solid ${accentColor}90`,
          boxShadow: `inset 0 0 0 2px ${primaryColor}15, 0 0 14px ${accentColor}25`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-4.5 pointer-events-none rounded-t-[90px] rounded-b-[4px]"
        style={{
          border: `1px solid ${accentColor}75`,
          background: isDark
            ? `linear-gradient(180deg, ${accentColor}12 0%, transparent 35%, rgba(0,0,0,0.2) 100%)`
            : `linear-gradient(180deg, ${accentColor}10 0%, transparent 40%)`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-5.5 pointer-events-none rounded-t-[84px] rounded-b-[2px]"
        style={{
          border: `0.75px dashed ${accentColor}65`,
        }}
      />

      {/* Ornate Spandrel Medallions in Top Left & Right Corners */}
      <div
        className="absolute top-4 left-4 w-5 h-5 rounded-full border flex items-center justify-center pointer-events-none"
        style={{ borderColor: accentColor, backgroundColor: `${accentColor}25` }}
      >
        <div className="w-2 h-2 rotate-45" style={{ backgroundColor: accentColor }} />
      </div>
      <div
        className="absolute top-4 right-4 w-5 h-5 rounded-full border flex items-center justify-center pointer-events-none"
        style={{ borderColor: accentColor, backgroundColor: `${accentColor}25` }}
      >
        <div className="w-2 h-2 rotate-45" style={{ backgroundColor: accentColor }} />
      </div>

      {/* Bottom Corner L-Brackets */}
      <div
        className="absolute bottom-3.5 left-3.5 w-6 h-6 pointer-events-none border-b-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-3.5 right-3.5 w-6 h-6 pointer-events-none border-b-2 border-r-2"
        style={{ borderColor: accentColor }}
      />

      {/* TOP HEADER: MUGHAL DARBAR ARCH & SACRED BLESSING */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1 space-y-0.5">
        <MughalArchMotif color={accentColor} className="mb-0.5 drop-shadow-xs" />

        {isIslamic ? (
          <span
            className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-xs"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        ) : isHindu ? (
          <span
            className="text-xs sm:text-sm font-semibold"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
          </span>
        ) : (
          <span
            className="text-[10px] sm:text-[11px] font-bold px-2"
            style={getSafeTextStyle(content?.title || "মাঙ্গলিক শুভ পরিণয়", {
              isSerif: true,
              color: isDark ? accentColor : primaryColor,
              tracking: "0.2em",
              uppercase: true,
            })}
          >
            {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ পরিণয়" : "ROYAL SHAHI INVITATION")}
          </span>
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

      {/* CENTER: COUPLE NAMES & SHAHI KNOT */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-semibold drop-shadow-sm"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
              })}
            >
              {brideName}
            </h1>

            {/* Shahi Royal Medallion Divider */}
            <div className="flex items-center justify-center gap-2 my-2 w-full max-w-[210px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
              <div
                className="px-3 py-0.5 rounded-full border flex items-center justify-center shadow-2xs"
                style={{
                  borderColor: accentColor,
                  background: `radial-gradient(circle, ${accentColor}30 0%, transparent 85%)`,
                }}
              >
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "&"}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-semibold drop-shadow-sm"
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
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-semibold drop-shadow-sm"
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
                className="mt-2 px-3 py-0.5 rounded-full text-xs font-semibold border"
                style={{
                  ...getSafeTextStyle(content.eventMilestone, {
                    isSerif: false,
                    color: accentColor,
                    tracking: "0.2em",
                    uppercase: true,
                  }),
                  borderColor: `${accentColor}65`,
                  backgroundColor: `${accentColor}15`,
                }}
              >
                {content.eventMilestone}
              </span>
            )}
          </div>
        )}

        {/* Bilingual Bengali Sub-Names */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-1.5 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: isDark ? accentColor : secondaryColor,
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        <OrnamentalDivider color={accentColor} className="my-1.5 opacity-85" />

        {/* Invitation Message */}
        <p
          className="text-[11px] sm:text-[12px] max-w-[260px] leading-relaxed text-center px-2"
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

      {/* BOTTOM LOGISTICS: SHAHI FARMAN DATE BANNER & VENUE */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Shahi Scroll Date & Time Badge */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold shadow-sm"
          style={{
            background: isDark
              ? `linear-gradient(90deg, ${accentColor}30 0%, ${accentColor}15 50%, ${accentColor}30 100%)`
              : `linear-gradient(90deg, ${accentColor}28 0%, ${cardBg} 50%, ${accentColor}28 100%)`,
            border: `1.5px solid ${accentColor}`,
            boxShadow: `0 2px 12px ${accentColor}30`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "শুক্রবার • ১২ই ডিসেম্বর ২০২৭", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "শুক্রবার • ১২ই ডিসেম্বর ২০২৭"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-75" style={{ color: accentColor }}>❖</span>
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
        <div className="space-y-0.5">
          <p
            className="text-base sm:text-[17px] font-semibold leading-snug drop-shadow-xs"
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
                tracking: hasBengali(content.city) ? "0px" : "0.15em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {/* Wax Seal / Monogram */}
        {decorations?.hasWaxSeal !== false && (
          <div className="pt-0.5">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "ন"}&${groomName?.[0] || "ফ"}`
              }
              color={accentColor}
              size={42}
            />
          </div>
        )}

        {/* RSVP Details */}
        {content?.rsvpDetails && (
          <p
            className="text-[10px] sm:text-[11px]"
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
