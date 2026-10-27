"use client";

import React from "react";
import {
  TraditionalMandala,
  IslamicArchBorder,
  KolkaCornerMotif,
  OrnamentalDivider,
  WaxSeal,
} from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function TraditionalCelebration({ design }) {
  const { content, palette, decorations, language, culturalStyle } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual" || language === "bn";

  const cardBg = palette?.cardBg || "#520D17";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FEF3C7" : "#5A1827");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF9" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#F59E0B" : "#83283B");
  const accentColor = palette?.accent || "#E5BF56";
  const textMuted = palette?.textMuted || (isDark ? "#ECCACF" : "#7A6367");

  const isIslamic = culturalStyle === "islamic";
  const isHindu = culturalStyle === "hindu";

  const brideName = content?.brideName || "নুসরাত জাহান";
  const groomName = content?.groomName || "তানভীর হাসান";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 10%, ${accentColor}38 0%, transparent 58%),
            radial-gradient(circle at 50% 50%, ${secondaryColor}16 0%, transparent 60%),
            radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.55) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 10%, ${accentColor}26 0%, transparent 58%),
            radial-gradient(ellipse at 50% 90%, ${primaryColor}15 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.45),
          inset 0 0 0 1px ${accentColor}65,
          inset 0 0 55px ${accentColor}14
        `,
      }}
    >
      {/* Center Giant Alpona Mandala Watermark behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.09]">
        <TraditionalMandala color={accentColor} size={230} />
      </div>

      {/* Decorative Alpona & Kolka Double Frame */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[3px]"
        style={{
          border: `2px solid ${accentColor}90`,
          boxShadow: `inset 0 0 0 2px ${primaryColor}15, 0 0 12px ${accentColor}25`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4.5 pointer-events-none rounded-[2px]"
        style={{
          border: `1px dashed ${accentColor}85`,
        }}
      />

      {/* Bengali Paisley / Kolka Corner Flourishes */}
      <KolkaCornerMotif
        className="absolute top-3 left-3 pointer-events-none drop-shadow-xs"
        color={accentColor}
        size={44}
      />
      <KolkaCornerMotif
        className="absolute top-3 right-3 pointer-events-none drop-shadow-xs -scale-x-100"
        color={accentColor}
        size={44}
      />
      <KolkaCornerMotif
        className="absolute bottom-3 left-3 pointer-events-none drop-shadow-xs -scale-y-100"
        color={accentColor}
        size={44}
      />
      <KolkaCornerMotif
        className="absolute bottom-3 right-3 pointer-events-none drop-shadow-xs -scale-100"
        color={accentColor}
        size={44}
      />

      {/* Islamic Arch Border or Traditional Alpona Lotus Mandala at Top */}
      <div className="relative z-10 flex flex-col items-center text-center pt-0.5">
        {isIslamic ? (
          <IslamicArchBorder color={accentColor} className="opacity-95 h-8 mb-0.5" />
        ) : (
          <div className="flex justify-center mb-1">
            <TraditionalMandala color={accentColor} size={50} className="drop-shadow-xs" />
          </div>
        )}

        {/* Sacred / Auspicious Blessing Header */}
        {isIslamic ? (
          <span
            className="text-[12px] sm:text-[13px] font-semibold tracking-wide drop-shadow-xs"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), Georgia, serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        ) : isHindu ? (
          <span
            className="text-[11px] sm:text-[12px] font-semibold"
            style={{ color: isDark ? accentColor : primaryColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
          </span>
        ) : null}

        <h3
          className="text-xs sm:text-[13px] font-bold pt-0.5 px-2"
          style={getSafeTextStyle(content?.title || (isIslamic ? "নিকাহ ও ওলিমা অনুষ্ঠান" : "শুভ বিবাহ উৎসব"), {
            isSerif: true,
            color: accentColor,
            tracking: "0.18em",
            uppercase: true,
          })}
        >
          {content?.title || (isIslamic ? "নিকাহ ও ওলিমা অনুষ্ঠান" : "শুভ বিবাহ উৎসব")}
        </h3>

        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px] max-w-[260px]"
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
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
        {content?.groomName ? (
          <div className="w-full flex flex-col items-center">
            <div className="space-y-0.5">
              <h1
                className="text-3xl sm:text-4xl md:text-[39px] font-semibold leading-[1.15] drop-shadow-sm"
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

            {/* Traditional Alpona Knot Divider */}
            <div className="my-2 flex items-center justify-center gap-2 w-full max-w-[210px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <div
                className="px-3 py-0.5 rounded-full flex items-center justify-center border shadow-2xs"
                style={{
                  borderColor: accentColor,
                  background: `radial-gradient(circle, ${accentColor}30 0%, transparent 85%)`,
                }}
              >
                <span
                  className="text-sm sm:text-base font-semibold"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "Weds", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "Weds"}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <div className="space-y-0.5">
              <h1
                className="text-3xl sm:text-4xl md:text-[39px] font-semibold leading-[1.15] drop-shadow-sm"
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
          <div className="space-y-1.5 my-1">
            <h1
              className="text-3xl sm:text-4xl md:text-[39px] font-semibold leading-[1.15] drop-shadow-sm"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <span
                className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold border"
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

        <OrnamentalDivider color={accentColor} className="my-1.5 opacity-85" />

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

      {/* CEREMONIAL EVENT DETAILS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Auspicious Date & Time Plaque */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold shadow-sm"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}30 0%, rgba(255,255,255,0.08) 50%, ${accentColor}30 100%)`
              : `linear-gradient(135deg, ${accentColor}28 0%, ${cardBg} 50%, ${accentColor}28 100%)`,
            border: `1.5px solid ${accentColor}`,
            boxShadow: `0 2px 12px ${accentColor}25`,
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
              <span className="mx-2 opacity-75" style={{ color: accentColor }}>•</span>
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
            className="text-base sm:text-[17px] font-semibold leading-snug drop-shadow-xs"
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
          <div className="pt-0.5">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "ন"}&${groomName?.[0] || "ত"}`
              }
              color={accentColor}
              size={42}
            />
          </div>
        )}

        {content?.rsvpDetails && (
          <p
            className="text-[10px] sm:text-[11px]"
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
