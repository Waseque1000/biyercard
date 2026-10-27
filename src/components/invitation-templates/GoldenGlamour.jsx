"use client";

import React from "react";
import { ArtDecoFan, OrnamentalDivider, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function GoldenGlamour({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#0D0F14";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FFFDF8" : "#1C1D1F");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const accentColor = palette?.accent || "#E5C158";
  const textMuted = palette?.textMuted || (isDark ? "#B5BDC9" : "#686B72");

  const brideName = content?.brideName || "Vivienne Vance";
  const groomName = content?.groomName || "Dominic Sterling";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 12%, ${accentColor}36 0%, transparent 58%),
            radial-gradient(circle at 50% 50%, ${accentColor}12 0%, transparent 55%),
            radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.65) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 12%, ${accentColor}26 0%, transparent 58%),
            radial-gradient(ellipse at 50% 90%, ${accentColor}16 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.5),
          inset 0 0 0 1px ${accentColor}65,
          inset 0 0 60px ${accentColor}14
        `,
      }}
    >
      {/* Art Deco Geometric Sunburst Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-conic-gradient(from 0deg at 50% 0%, ${accentColor} 0deg 6deg, transparent 6deg 15deg)
          `,
        }}
      />

      {/* Central Art Deco Geometric Octagon Frame Behind Names */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rotate-45 pointer-events-none opacity-15"
        style={{
          border: `1.2px solid ${accentColor}`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 pointer-events-none opacity-15"
        style={{
          border: `1.2px solid ${accentColor}`,
        }}
      />

      {/* Art Deco Triple Stepped Geometric Outer Border */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none"
        style={{
          border: `2px solid ${accentColor}`,
          boxShadow: `0 0 14px ${accentColor}25`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-4.5 pointer-events-none"
        style={{
          border: `1px solid ${accentColor}65`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-5.5 pointer-events-none"
        style={{
          border: `0.75px dashed ${accentColor}70`,
        }}
      />

      {/* Art Deco Stepped Skyscraper Corner Chevrons */}
      <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }} />
      <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }} />
      <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }} />
      <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }} />

      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: accentColor }} />

      {/* TOP HEADER: ART DECO SUNBURST FAN */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <ArtDecoFan color={accentColor} size={46} className="mb-0.5 drop-shadow-xs" />

        <span
          className="text-[10px] sm:text-[11px] font-bold px-2"
          style={getSafeTextStyle(content?.title || "CORDIALLY REQUESTS", {
            isSerif: false,
            color: accentColor,
            tracking: "0.26em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "সম্মানিত সুধী ও শুভাকাঙ্ক্ষী" : "A NIGHT OF TIMELESS GLAMOUR")}
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

      {/* CENTER NAMES: BOLD ART DECO SPLENDOR */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[38px] leading-[1.15] font-medium drop-shadow-sm"
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
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[205px]">
              <span className="h-[1.2px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: accentColor, backgroundColor: `${accentColor}40` }} />
              <span
                className="text-base sm:text-lg font-medium px-1"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                  isSerif: true,
                  color: accentColor,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "&"}
              </span>
              <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: accentColor, backgroundColor: `${accentColor}40` }} />
              <span className="h-[1.2px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[38px] leading-[1.15] font-medium drop-shadow-sm"
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
              className="text-3xl sm:text-4xl md:text-[38px] leading-[1.15] font-medium drop-shadow-sm"
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
                className="mt-2 px-3 py-0.5 text-xs font-semibold border"
                style={{
                  ...getSafeTextStyle(content.eventMilestone, {
                    isSerif: false,
                    color: accentColor,
                    tracking: "0.2em",
                    uppercase: true,
                  }),
                  borderColor: `${accentColor}75`,
                  backgroundColor: `${accentColor}18`,
                }}
              >
                {content.eventMilestone}
              </span>
            )}
          </div>
        )}

        <OrnamentalDivider color={accentColor} className="my-1.5 opacity-85" />

        {/* Message */}
        <p
          className="text-[11px] sm:text-[12px] max-w-[260px] leading-relaxed text-center px-2"
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

      {/* BOTTOM LOGISTICS: ART DECO GEOMETRIC PLAQUE */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        <div
          className="inline-flex items-center px-4 py-1.5 text-[11px] sm:text-[12px] font-semibold shadow-sm"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}30 0%, rgba(255,255,255,0.06) 50%, ${accentColor}30 100%)`
              : `linear-gradient(135deg, ${accentColor}24 0%, ${cardBg} 50%, ${accentColor}24 100%)`,
            border: `1.5px solid ${accentColor}`,
            boxShadow: `0 2px 12px ${accentColor}28`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • November 20, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.12em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • November 20, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2" style={{ color: accentColor }}>◆</span>
              <span
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
          <div className="pt-0.5">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "V"}&${groomName?.[0] || "D"}`
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
