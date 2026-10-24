"use client";

import React from "react";
import { ArtDecoFan, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function GoldenGlamour({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#1C1D1F"; // Sleek Obsidian
  const accentColor = palette?.accent || "#C89D46"; // Art Deco Champagne Gold
  const cardBg = palette?.cardBg || "#FFFFFF"; // Pure Silk Alabaster
  const textMuted = palette?.textMuted || "#707379";

  const brideName = content?.brideName || "Vivienne Vance";
  const groomName = content?.groomName || "Dominic Sterling";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-9 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 24px 60px -15px rgba(28, 29, 31, 0.22), inset 0 0 0 1px rgba(200, 157, 70, 0.35), inset 0 0 40px rgba(200, 157, 70, 0.05)",
      }}
    >
      {/* Art Deco Triple Geometric Outer Border */}
      <div
        className="absolute inset-2.5 sm:inset-3.5 pointer-events-none rounded-[1px]"
        style={{
          border: `1.5px solid ${accentColor}80`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[1px]"
        style={{
          border: `0.75px solid ${accentColor}40`,
        }}
      />

      {/* Art Deco Corner Stepped Accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />

      {/* TOP HEADER: ART DECO FAN MOTIF */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <ArtDecoFan color={accentColor} size={42} className="mb-0.5 opacity-90" />

        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "CORDIALLY REQUESTS", {
            isSerif: false,
            color: accentColor,
            tracking: "0.26em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "সম্মানিত সুধী ও শুভাকাঙ্ক্ষী" : "CORDIALLY REQUESTS THE PLEASURE")}
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

      {/* CENTER NAMES: BOLD ART DECO SPLENDOR */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-tight font-medium"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
                uppercase: !hasBengali(brideName),
                tracking: hasBengali(brideName) ? "0px" : "0.08em",
              })}
            >
              {brideName}
            </h1>

            {/* Stepped Deco Diamond Divider */}
            <div className="flex items-center justify-center gap-2 my-2 w-full max-w-[170px]">
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}70` }} />
              <div className="w-2 h-2 rotate-45 border" style={{ borderColor: accentColor, backgroundColor: `${accentColor}30` }} />
              <span
                className="text-base sm:text-lg font-light px-1"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                  isSerif: true,
                  color: accentColor,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "&"}
              </span>
              <div className="w-2 h-2 rotate-45 border" style={{ borderColor: accentColor, backgroundColor: `${accentColor}30` }} />
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}70` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-tight font-medium"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(groomName) ? 600 : 500,
                uppercase: !hasBengali(groomName),
                tracking: hasBengali(groomName) ? "0px" : "0.08em",
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
                uppercase: !hasBengali(brideName),
                tracking: hasBengali(brideName) ? "0px" : "0.08em",
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
              "To join them for an extraordinary black-tie evening of cocktails, dining, and celebratory vows.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "To join them for an extraordinary black-tie evening of cocktails, dining, and celebratory vows."}
        </p>
      </div>

      {/* BOTTOM LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-medium"
          style={{
            backgroundColor: `${accentColor}12`,
            border: `1px solid ${accentColor}60`,
            color: primaryColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • November 20, 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.12em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • November 20, 2027"}
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
            style={getSafeTextStyle(content?.venue || "The Grand Chrysler Ballroom", {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content?.venue || "The Grand Chrysler Ballroom"}
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
                decorations.monogram ||
                `${brideName?.[0] || "V"}&${groomName?.[0] || "D"}`
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
