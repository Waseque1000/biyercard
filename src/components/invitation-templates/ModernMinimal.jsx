"use client";

import React from "react";
import { OrnamentalDivider, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function ModernMinimal({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#121316";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || palette?.textPrimary || (isDark ? "#FFFDF8" : "#171816");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const accentColor = palette?.accent || "#E0BE68";
  const textMuted = palette?.textMuted || (isDark ? "#B0B5BD" : "#686A63");

  const brideName = content?.brideName || "Camilla";
  const groomName = content?.groomName || "Julian";

  const monogramText =
    decorations?.monogram ||
    (groomName
      ? `${brideName?.[0] || "C"}&${groomName?.[0] || "J"}`
      : `${brideName?.[0] || "W"}`);

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 10%, ${accentColor}28 0%, transparent 60%),
            radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.5) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 10%, ${accentColor}18 0%, transparent 60%),
            radial-gradient(ellipse at 50% 90%, ${primaryColor}0e 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.4),
          inset 0 0 0 1px ${accentColor}50,
          inset 0 0 45px rgba(0, 0, 0, 0.04)
        `,
      }}
    >
      {/* Precision Architectural Double Arch & Hairline Grid Frame */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none"
        style={{
          border: `1.2px solid ${accentColor}75`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-t-[135px]"
        style={{
          border: `1px solid ${accentColor}45`,
        }}
      />

      {/* Editorial Monogram Crest Badge at Top */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-1.5 pt-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border mb-0.5"
          style={{
            borderColor: accentColor,
            backgroundColor: `${accentColor}15`,
            boxShadow: `0 0 15px ${accentColor}20`,
          }}
        >
          <span
            className="font-serif text-xs font-semibold tracking-tighter"
            style={{ color: accentColor }}
          >
            {monogramText}
          </span>
        </div>

        <span
          className="text-[10px] sm:text-[11px] font-bold px-2"
          style={getSafeTextStyle(content?.title || "WEDDING INVITATION", {
            isSerif: false,
            color: accentColor,
            tracking: "0.26em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক আমন্ত্রণ" : "THE EDITORIAL EDITION")}
        </span>

        {content?.subtitle && (
          <p
            className="text-[10px] sm:text-[11px] max-w-[240px]"
            style={getSafeTextStyle(content.subtitle, {
              isSerif: false,
              color: textMuted,
              tracking: hasBengali(content.subtitle) ? "0px" : "0.12em",
              uppercase: !hasBengali(content.subtitle),
            })}
          >
            {content.subtitle}
          </p>
        )}
      </div>

      {/* CENTER NAMES: VOGUE EDITORIAL TYPOGRAPHY */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.12] font-light drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
                uppercase: !hasBengali(brideName),
                tracking: hasBengali(brideName) ? "0px" : "0.04em",
              })}
            >
              {brideName}
            </h1>

            <div className="my-2 flex items-center justify-center gap-3 w-full max-w-[180px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <span
                className="text-xs sm:text-sm font-semibold italic"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "and", {
                  isSerif: true,
                  color: accentColor,
                  italic: !hasBengali(brideName) && !isBangla,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "and"}
              </span>
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.12] font-light drop-shadow-xs"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(groomName) ? 600 : 400,
                uppercase: !hasBengali(groomName),
                tracking: hasBengali(groomName) ? "0px" : "0.04em",
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.12] font-light drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
                uppercase: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <div
                className="mt-2 px-3 py-0.5 text-xs font-semibold border"
                style={{
                  ...getSafeTextStyle(content.eventMilestone, {
                    isSerif: false,
                    color: accentColor,
                    tracking: "0.22em",
                    uppercase: true,
                  }),
                  borderColor: `${accentColor}65`,
                }}
              >
                {content.eventMilestone}
              </div>
            )}
          </div>
        )}

        <OrnamentalDivider color={accentColor} className="my-2 opacity-75" />

        <p
          className="text-[11px] sm:text-[12px] max-w-[255px] leading-relaxed text-center px-2"
          style={getSafeTextStyle(
            content?.message ||
              "Cordially invite you to celebrate our union as we exchange vows.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "Cordially invite you to celebrate our union as we exchange vows."}
        </p>
      </div>

      {/* BOTTOM LOGISTICS: ARCHITECTURAL EDITORIAL GRID */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        <div
          className="w-full max-w-[265px] grid grid-cols-1 divide-y text-center"
          style={{
            border: `1px solid ${accentColor}75`,
            divideColor: `${accentColor}45`,
            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          }}
        >
          <div className="py-1.5 px-3 flex items-center justify-center gap-2">
            <span
              className="text-[11px] font-semibold"
              style={getSafeTextStyle(content?.weddingDate || "15 • 02 • 2027", {
                isSerif: false,
                color: isDark ? "#FFFFFF" : textColor,
                tracking: hasBengali(content?.weddingDate) ? "0px" : "0.12em",
                uppercase: !hasBengali(content?.weddingDate),
              })}
            >
              {content?.weddingDate || "15 • 02 • 2027"}
            </span>
            {content?.weddingTime && (
              <>
                <span className="opacity-50" style={{ color: accentColor }}>|</span>
                <span
                  className="text-[11px] font-semibold"
                  style={getSafeTextStyle(content.weddingTime, {
                    isSerif: false,
                    color: accentColor,
                    tracking: hasBengali(content?.weddingTime) ? "0px" : "0.1em",
                    uppercase: !hasBengali(content?.weddingTime),
                  })}
                >
                  {content.weddingTime}
                </span>
              </>
            )}
          </div>
          <div className="py-1.5 px-3" style={{ borderTop: `1px solid ${accentColor}45` }}>
            <p
              className="text-sm sm:text-base font-medium leading-tight"
              style={getSafeTextStyle(content?.venue || "The Glasshouse Pavilion", {
                isSerif: true,
                color: textColor,
              })}
            >
              {content?.venue || "The Glasshouse Pavilion"}
            </p>
            {content?.city && (
              <p
                className="text-[9px] sm:text-[10px] font-medium mt-0.5"
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
        </div>

        {/* Wax Seal */}
        {decorations?.hasWaxSeal && (
          <div className="pt-0.5">
            <WaxSeal
              monogram={monogramText}
              color={accentColor}
              size={38}
            />
          </div>
        )}

        {content?.rsvpDetails && (
          <p
            className="text-[10px]"
            style={getSafeTextStyle(content.rsvpDetails, {
              isSerif: false,
              color: textMuted,
              tracking: hasBengali(content.rsvpDetails) ? "0px" : "0.12em",
              uppercase: !hasBengali(content.rsvpDetails),
            })}
          >
            {content.rsvpDetails}
          </p>
        )}
      </div>
    </div>
  );
}
