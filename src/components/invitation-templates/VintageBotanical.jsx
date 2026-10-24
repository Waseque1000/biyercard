"use client";

import React from "react";
import { OliveWreathMedallion, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function VintageBotanical({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#304033"; // Deep Olive Forest
  const secondaryColor = palette?.secondary || "#5E705F"; // Soft Eucalyptus
  const accentColor = palette?.accent || "#B89B60"; // Warm Antique Gold
  const cardBg = palette?.cardBg || "#FAF7F2"; // Artisanal Deckled Linen
  const textMuted = palette?.textMuted || "#6B7A6C";

  const brideName = content?.brideName || "Genevieve Claire";
  const groomName = content?.groomName || "Alexander Rhodes";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-9 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 24px 60px -15px rgba(48, 64, 51, 0.2), inset 0 0 0 1px rgba(184, 155, 96, 0.35), inset 0 0 45px rgba(184, 155, 96, 0.06)",
      }}
    >
      {/* Handcrafted Deckled Outer Dashed Border */}
      <div
        className="absolute inset-2.5 sm:inset-3.5 pointer-events-none rounded-[3px]"
        style={{
          border: `1.5px dashed ${accentColor}70`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[2px]"
        style={{
          border: `0.75px solid ${secondaryColor}30`,
        }}
      />

      {/* TOP HEADER: OLIVE WREATH MEDALLION */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 space-y-1">
        <OliveWreathMedallion color={secondaryColor} className="mb-1 opacity-90" />

        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "TOGETHER WITH THEIR FAMILIES", {
            isSerif: false,
            color: secondaryColor,
            tracking: "0.22em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "আন্তরিক প্রীতি ও নিমন্ত্রণ" : "TOGETHER WITH THEIR FAMILIES")}
        </span>

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

      {/* CENTER NAMES & BOTANICAL WREATH AMBIENCE */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[41px] leading-tight font-normal"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
                italic: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>

            <div className="flex items-center justify-center gap-3 my-2 w-full max-w-[180px]">
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}60` }} />
              <span
                className="text-lg sm:text-xl font-normal"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "and", {
                  isSerif: true,
                  color: accentColor,
                  italic: !hasBengali(brideName) && !isBangla,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "and"}
              </span>
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}60` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[41px] leading-tight font-normal"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(groomName) ? 600 : 400,
                italic: !hasBengali(groomName),
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[38px] leading-tight font-normal"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
                italic: !hasBengali(brideName),
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

        {/* Bilingual Sub-Names */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        {/* Message */}
        <p
          className="mt-3.5 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center px-2"
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

      {/* BOTTOM LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium"
          style={{
            backgroundColor: `${primaryColor}0a`,
            border: `1px solid ${accentColor}50`,
            color: primaryColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • September 11, 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • September 11, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-40">•</span>
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
            style={getSafeTextStyle(content?.venue || "The Heritage Olive Grove Estate", {
              isSerif: true,
              color: primaryColor,
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
                tracking: hasBengali(content.city) ? "0px" : "0.15em",
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
                decorations.monogram ||
                `${brideName?.[0] || "G"}&${groomName?.[0] || "A"}`
              }
              color={accentColor}
              size={44}
            />
          </div>
        )}

        {/* RSVP */}
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
