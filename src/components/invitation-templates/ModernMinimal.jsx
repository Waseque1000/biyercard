"use client";

import React from "react";
import { WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function ModernMinimal({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FAF9F6";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || palette?.textPrimary || (isDark ? "#FFFDF8" : "#171816");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const accentColor = palette?.accent || "#BA9554"; // Architectural Warm Gold
  const textMuted = palette?.textMuted || (isDark ? "#C2C4BD" : "#70726B");

  const brideName = content?.brideName || "Camilla";
  const groomName = content?.groomName || "Julian";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-7 sm:p-9 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 15%, ${accentColor}25 0%, transparent 60%),
            radial-gradient(ellipse at 50% 85%, rgba(0,0,0,0.4) 0%, transparent 60%)
          `
          : `
            radial-gradient(ellipse at 50% 15%, ${accentColor}12 0%, transparent 60%),
            radial-gradient(ellipse at 50% 85%, ${primaryColor}0a 0%, transparent 60%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.35),
          inset 0 0 0 1px ${accentColor}40,
          inset 0 0 45px rgba(0, 0, 0, 0.02)
        `,
      }}
    >
      {/* Precision Architectural Hairline Outer Border */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[1px]"
        style={{
          border: `1px solid ${accentColor}55`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[1px]"
        style={{
          border: `0.5px solid ${accentColor}25`,
        }}
      />

      {/* Crosshair Corner Marks */}
      <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 pointer-events-none">
        <div className="w-full h-[1px] absolute top-0 left-0" style={{ backgroundColor: accentColor }} />
        <div className="h-full w-[1px] absolute top-0 left-0" style={{ backgroundColor: accentColor }} />
      </div>
      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 pointer-events-none">
        <div className="w-full h-[1px] absolute top-0 right-0" style={{ backgroundColor: accentColor }} />
        <div className="h-full w-[1px] absolute top-0 right-0" style={{ backgroundColor: accentColor }} />
      </div>
      <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 pointer-events-none">
        <div className="w-full h-[1px] absolute bottom-0 left-0" style={{ backgroundColor: accentColor }} />
        <div className="h-full w-[1px] absolute bottom-0 left-0" style={{ backgroundColor: accentColor }} />
      </div>
      <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 pointer-events-none">
        <div className="w-full h-[1px] absolute bottom-0 right-0" style={{ backgroundColor: accentColor }} />
        <div className="h-full w-[1px] absolute bottom-0 right-0" style={{ backgroundColor: accentColor }} />
      </div>

      {/* Editorial Hairline Top */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-1 pt-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-4 h-[1px]" style={{ backgroundColor: accentColor }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
          <span className="w-4 h-[1px]" style={{ backgroundColor: accentColor }} />
        </div>

        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "WEDDING INVITATION", {
            isSerif: false,
            color: isDark ? accentColor : textColor,
            tracking: "0.28em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক আমন্ত্রণ" : "WEDDING INVITATION")}
        </span>

        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px] max-w-xs"
            style={getSafeTextStyle(content.subtitle, {
              isSerif: false,
              color: textMuted,
              tracking: hasBengali(content.subtitle) ? "0px" : "0.15em",
              uppercase: !hasBengali(content.subtitle),
            })}
          >
            {content.subtitle}
          </p>
        )}
      </div>

      {/* CENTER NAMES: HIGH-EDITORIAL ASYMMETRIC BALANCE */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-4xl sm:text-5xl md:text-[46px] leading-[1.15] font-light drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 500 : 300,
                uppercase: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>

            <div className="my-2.5 flex items-center justify-center gap-3 w-full max-w-[180px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <span
                className="text-xs sm:text-sm font-semibold"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "AND", {
                  isSerif: false,
                  color: accentColor,
                  tracking: hasBengali(brideName) || isBangla ? "0px" : "0.24em",
                  uppercase: !hasBengali(brideName) && !isBangla,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "AND"}
              </span>
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-[46px] leading-[1.15] font-light drop-shadow-xs"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(groomName) ? 500 : 300,
                uppercase: !hasBengali(groomName),
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-light drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 500 : 300,
                uppercase: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <div
                className="mt-2 text-xs sm:text-sm font-semibold"
                style={getSafeTextStyle(content.eventMilestone, {
                  isSerif: false,
                  color: accentColor,
                  tracking: "0.25em",
                  uppercase: true,
                })}
              >
                {content.eventMilestone}
              </div>
            )}
          </div>
        )}

        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-medium"
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
          className="mt-4 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center px-2"
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

        {isBilingual && content?.bilingualMessage && (
          <p
            className="mt-1.5 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center"
            style={getSafeTextStyle(content.bilingualMessage, {
              isSerif: false,
              color: isDark ? accentColor : primaryColor,
              italic: !hasBengali(content.bilingualMessage),
            })}
          >
            {content.bilingualMessage}
          </p>
        )}
      </div>

      {/* BOTTOM LOGISTICS: CRISP MODERN GRID */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Date & Time Modern Plaque */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-medium shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}25 0%, rgba(255,255,255,0.06) 50%, ${accentColor}25 100%)`
              : `linear-gradient(135deg, ${accentColor}15 0%, ${cardBg} 50%, ${accentColor}15 100%)`,
            border: `1px solid ${accentColor}70`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "15 • 02 • 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.15em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "15 • 02 • 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-50" style={{ color: accentColor }}>|</span>
              <span
                style={getSafeTextStyle(content.weddingTime, {
                  isSerif: false,
                  color: isDark ? accentColor : textColor,
                  tracking: hasBengali(content?.weddingTime) ? "0px" : "0.15em",
                  uppercase: !hasBengali(content?.weddingTime),
                })}
              >
                {content.weddingTime}
              </span>
            </>
          )}
        </div>

        <div className="space-y-0.5 pt-0.5">
          <p
            className="text-base sm:text-lg font-normal drop-shadow-xs"
            style={getSafeTextStyle(content?.venue || "The Glasshouse Pavilion", {
              isSerif: true,
              color: textColor,
            })}
          >
            {content?.venue || "The Glasshouse Pavilion"}
          </p>
          {content?.city && (
            <p
              className="text-[10px] sm:text-[11px] font-medium"
              style={getSafeTextStyle(content.city, {
                isSerif: false,
                color: textMuted,
                tracking: hasBengali(content.city) ? "0px" : "0.18em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {/* Wax Seal */}
        {decorations?.hasWaxSeal && (
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "C"}&${groomName?.[0] || "J"}`
              }
              color={accentColor}
              size={42}
            />
          </div>
        )}

        {content?.rsvpDetails && (
          <p
            className="text-[10px] sm:text-[11px] pt-0.5"
            style={getSafeTextStyle(content.rsvpDetails, {
              isSerif: false,
              color: textMuted,
              tracking: hasBengali(content.rsvpDetails) ? "0px" : "0.15em",
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
