"use client";

import React from "react";
import { OliveWreathMedallion, WaxSeal, CornerFlourish, OrnamentalDivider } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function VintageBotanical({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#1C2619";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FEF9C3" : "#2A3B2E");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF6" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#84CC16" : "#556B57");
  const accentColor = palette?.accent || "#D4AF37";
  const textMuted = palette?.textMuted || (isDark ? "#BDCAB4" : "#667868");

  const brideName = content?.brideName || "Genevieve Claire";
  const groomName = content?.groomName || "Alexander Rhodes";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 12%, ${accentColor}30 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, ${secondaryColor}12 0%, transparent 55%),
            radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.55) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 12%, ${accentColor}22 0%, transparent 60%),
            radial-gradient(ellipse at 50% 90%, ${primaryColor}14 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.42),
          inset 0 0 0 1px ${accentColor}55,
          inset 0 0 50px ${accentColor}12
        `,
      }}
    >
      {/* Subtle Laid Linen Paper Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${accentColor}, ${accentColor} 1px, transparent 1px, transparent 6px)`,
        }}
      />

      {/* Handcrafted Deckled Outer & Inner Frame */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[3px]"
        style={{
          border: `1.6px solid ${accentColor}85`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-4.5 pointer-events-none rounded-[2px]"
        style={{
          border: `1px dashed ${accentColor}75`,
          boxShadow: `inset 0 0 20px ${accentColor}15`,
        }}
      />

      {/* Corner Filigree Flourishes */}
      <CornerFlourish
        className="absolute top-3.5 left-3.5 pointer-events-none opacity-80"
        color={accentColor}
        size={38}
      />
      <CornerFlourish
        className="absolute top-3.5 right-3.5 pointer-events-none opacity-80 -scale-x-100"
        color={accentColor}
        size={38}
      />
      <CornerFlourish
        className="absolute bottom-3.5 left-3.5 pointer-events-none opacity-80 -scale-y-100"
        color={accentColor}
        size={38}
      />
      <CornerFlourish
        className="absolute bottom-3.5 right-3.5 pointer-events-none opacity-80 -scale-100"
        color={accentColor}
        size={38}
      />

      {/* TOP HEADER: OLIVE WREATH CAMEO MEDALLION */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <OliveWreathMedallion
          color={isDark ? accentColor : secondaryColor}
          accent={accentColor}
          className="mb-0.5 drop-shadow-xs"
        />

        <span
          className="text-[10px] sm:text-[11px] font-bold px-2"
          style={getSafeTextStyle(content?.title || "TOGETHER WITH THEIR FAMILIES", {
            isSerif: false,
            color: isDark ? accentColor : secondaryColor,
            tracking: "0.22em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "আন্তরিক প্রীতি ও নিমন্ত্রণ" : "TOGETHER WITH THEIR FAMILIES")}
        </span>

        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px] max-w-[250px]"
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

      {/* CENTER NAMES & BOTANICAL WREATH AMBIENCE */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
                italic: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>

            {/* Vintage Olive Cameo Divider */}
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[195px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center border"
                style={{
                  borderColor: accentColor,
                  background: `radial-gradient(circle, ${accentColor}30 0%, transparent 80%)`,
                }}
              >
                <span
                  className="text-sm sm:text-base font-medium leading-none"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "and", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "and"}
                </span>
              </div>
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-xs"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(groomName) ? 600 : 500,
                italic: !hasBengali(groomName),
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
                italic: !hasBengali(brideName),
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

        <OrnamentalDivider color={accentColor} className="my-1.5 opacity-80" />

        {/* Message */}
        <p
          className="text-[11px] sm:text-[12px] max-w-[260px] leading-relaxed text-center px-2"
          style={getSafeTextStyle(
            content?.message ||
              "Warmly invite you to join us in an intimate gathering of love, laughter, and lifelong devotion.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "Warmly invite you to join us in an intimate gathering of love, laughter, and lifelong devotion."}
        </p>
      </div>

      {/* BOTTOM LOGISTICS: OLD-MONEY HORIZONTAL BAND */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        <div
          className="w-full max-w-[260px] py-1.5 px-3 flex items-center justify-center gap-2"
          style={{
            borderTop: `1.2px solid ${accentColor}85`,
            borderBottom: `1.2px solid ${accentColor}85`,
            background: isDark ? `${accentColor}15` : `${accentColor}12`,
          }}
        >
          <span
            className="text-[11px] sm:text-[12px] font-semibold"
            style={getSafeTextStyle(content?.weddingDate || "Saturday • September 11, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • September 11, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-1.5" style={{ color: accentColor }}>•</span>
              <span
                className="text-[11px] sm:text-[12px] font-semibold"
                style={getSafeTextStyle(content.weddingTime, {
                  isSerif: false,
                  color: accentColor,
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
            style={getSafeTextStyle(content?.venue || "The Heritage Olive Grove Estate", {
              isSerif: true,
              color: textColor,
            })}
          >
            {content?.venue || "The Heritage Olive Grove Estate"}
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

        {/* Wax Seal */}
        {decorations?.hasWaxSeal !== false && (
          <div className="pt-0.5">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "G"}&${groomName?.[0] || "A"}`
              }
              color={accentColor}
              size={42}
            />
          </div>
        )}

        {/* RSVP */}
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
