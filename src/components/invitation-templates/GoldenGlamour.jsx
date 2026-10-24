"use client";

import React from "react";
import { ArtDecoFan, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function GoldenGlamour({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FAF8F4";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FFFDF8" : "#1C1D1F");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const accentColor = palette?.accent || "#C89D46"; // Art Deco Champagne Gold
  const textMuted = palette?.textMuted || (isDark ? "#C0C5CE" : "#707379");

  const brideName = content?.brideName || "Vivienne Vance";
  const groomName = content?.groomName || "Dominic Sterling";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 15%, ${accentColor}28 0%, transparent 60%),
            radial-gradient(ellipse at 50% 85%, rgba(0,0,0,0.5) 0%, transparent 60%)
          `
          : `
            radial-gradient(ellipse at 50% 15%, ${accentColor}20 0%, transparent 60%),
            radial-gradient(ellipse at 50% 85%, ${accentColor}12 0%, transparent 60%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.4),
          inset 0 0 0 1px ${accentColor}50,
          inset 0 0 50px ${accentColor}0a
        `,
      }}
    >
      {/* Art Deco Geometric Sunburst Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-conic-gradient(from 0deg at 50% 0%, ${accentColor} 0deg 10deg, transparent 10deg 20deg)
          `,
        }}
      />

      {/* Art Deco Triple Stepped Geometric Outer Border */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[1px]"
        style={{
          border: `1.5px solid ${accentColor}85`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4.5 pointer-events-none rounded-[1px]"
        style={{
          border: `0.75px solid ${accentColor}45`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-6 pointer-events-none rounded-[1px]"
        style={{
          border: `1px dashed ${accentColor}60`,
        }}
      />

      {/* Art Deco Stepped Corner Brackets */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />

      <div className="absolute top-3.5 left-3.5 w-3 h-3 border-t border-l pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute top-3.5 right-3.5 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b border-l pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b border-r pointer-events-none" style={{ borderColor: accentColor }} />

      {/* TOP HEADER: ART DECO FAN MOTIF */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <ArtDecoFan color={accentColor} size={44} className="mb-0.5 opacity-95 drop-shadow-xs" />

        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "CORDIALLY REQUESTS", {
            isSerif: false,
            color: accentColor,
            tracking: "0.28em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "সম্মানিত সুধী ও শুভাকাঙ্ক্ষী" : "CORDIALLY REQUESTS THE PLEASURE")}
        </span>

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

      {/* CENTER NAMES: BOLD ART DECO SPLENDOR */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-medium drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
                uppercase: !hasBengali(brideName),
                tracking: hasBengali(brideName) ? "0px" : "0.08em",
              })}
            >
              {brideName}
            </h1>

            {/* Stepped Deco Diamond Divider */}
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[190px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: accentColor, backgroundColor: `${accentColor}35` }} />
              <span
                className="text-base sm:text-lg font-light px-1"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                  isSerif: true,
                  color: accentColor,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "&"}
              </span>
              <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: accentColor, backgroundColor: `${accentColor}35` }} />
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-medium drop-shadow-xs"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: textColor,
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
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-medium drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
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
              color: isDark ? accentColor : primaryColor,
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
          className="inline-flex items-center px-4 py-1.5 rounded-sm text-[11px] sm:text-[12px] font-medium shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}25 0%, rgba(255,255,255,0.06) 50%, ${accentColor}25 100%)`
              : `linear-gradient(135deg, ${accentColor}20 0%, ${cardBg} 50%, ${accentColor}20 100%)`,
            border: `1px solid ${accentColor}75`,
            boxShadow: `0 2px 10px ${accentColor}20`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • November 20, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.14em",
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
            style={getSafeTextStyle(content?.venue || "The Grand Chrysler Ballroom", {
              isSerif: true,
              color: textColor,
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
        {decorations?.hasWaxSeal !== false && (
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations?.monogram ||
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
