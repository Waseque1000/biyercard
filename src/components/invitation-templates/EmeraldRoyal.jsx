"use client";

import React from "react";
import { CornerFlourish, RoyalCrownCrest, OrnamentalDivider, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function EmeraldRoyal({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#09261C";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#F5EEDB" : "#173D32");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const accentColor = palette?.accent || "#E0BE68";
  const textMuted = palette?.textMuted || (isDark ? "#CBD8CE" : "#5C6860");

  const brideName = content?.brideName || "Eleanor Vance";
  const groomName = content?.groomName || "Arthur Pendelton";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 10%, ${accentColor}38 0%, transparent 58%),
            radial-gradient(circle at 50% 48%, ${accentColor}16 0%, transparent 55%),
            radial-gradient(ellipse at 50% 92%, rgba(0,0,0,0.55) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 10%, ${accentColor}28 0%, transparent 58%),
            radial-gradient(circle at 50% 48%, ${accentColor}12 0%, transparent 55%),
            radial-gradient(ellipse at 50% 92%, ${primaryColor}14 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.45),
          0 0 0 1px ${accentColor}65 inset,
          inset 0 0 65px ${accentColor}16
        `,
      }}
    >
      {/* Subtle Silk Damask / Royal Filigree Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: `
            radial-gradient(${accentColor} 1px, transparent 1px),
            radial-gradient(${accentColor} 0.75px, transparent 0.75px)
          `,
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0, 9px 9px",
        }}
      />

      {/* Central Royal Medallion Halo behind Names */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none opacity-20"
        style={{
          border: `1px solid ${accentColor}`,
          background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
          boxShadow: `0 0 40px ${accentColor}25`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none opacity-15"
        style={{
          border: `1px dashed ${accentColor}`,
        }}
      />

      {/* Triple Gilded Palace Framing */}
      <div
        className="absolute inset-2 sm:inset-2.5 pointer-events-none rounded-[3px]"
        style={{
          border: `1px solid ${accentColor}55`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4 pointer-events-none rounded-[2px]"
        style={{
          border: `1.8px solid ${accentColor}95`,
          boxShadow: `inset 0 0 18px ${accentColor}25, 0 0 12px ${accentColor}22`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-[21px] pointer-events-none rounded-[1px]"
        style={{
          border: `0.75px dashed ${accentColor}65`,
        }}
      />

      {/* Ornate Corner Flourishes */}
      {decorations?.hasFloralCorners !== false && (
        <>
          <CornerFlourish
            className="absolute top-3.5 left-3.5 pointer-events-none drop-shadow-xs"
            color={accentColor}
            size={46}
          />
          <CornerFlourish
            className="absolute top-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-x-100"
            color={accentColor}
            size={46}
          />
          <CornerFlourish
            className="absolute bottom-3.5 left-3.5 pointer-events-none drop-shadow-xs -scale-y-100"
            color={accentColor}
            size={46}
          />
          <CornerFlourish
            className="absolute bottom-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-100"
            color={accentColor}
            size={46}
          />
        </>
      )}

      {/* Corner Diamond Studs */}
      <div className="absolute top-2.5 left-2.5 w-2 h-2 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />

      {/* TOP HEADER WITH IMPERIAL CROWN CREST */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <RoyalCrownCrest color={accentColor} className="mb-0.5 drop-shadow-xs" />

        <span
          className="text-[10px] sm:text-[11px] font-bold tracking-wider px-2"
          style={getSafeTextStyle(content?.title || "THE HONOUR OF YOUR PRESENCE", {
            isSerif: false,
            color: accentColor,
            tracking: "0.24em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ নিমন্ত্রণ" : "THE HONOUR OF YOUR PRESENCE")}
        </span>

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

      {/* EVENT NAMES: COUPLE OR CELEBRANT */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-1.5">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal tracking-wide drop-shadow-sm"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
              })}
            >
              {brideName}
            </h1>

            {/* Gilded Filigree Knot */}
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[215px]">
              <span
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor})`,
                }}
              />
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shadow-xs"
                style={{
                  border: `1.2px solid ${accentColor}`,
                  background: `radial-gradient(circle, ${accentColor}35 0%, transparent 75%)`,
                }}
              >
                <span
                  className="text-base sm:text-lg leading-none"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                    fontWeight: 600,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "&"}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
              <span
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                }}
              />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal tracking-wide drop-shadow-sm"
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
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal tracking-wide drop-shadow-sm"
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
                  borderColor: `${accentColor}60`,
                  backgroundColor: `${accentColor}15`,
                }}
              >
                {content.eventMilestone}
              </span>
            )}
          </div>
        )}

        {/* Bilingual Sub-Names */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-1.5 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: isDark ? accentColor : primaryColor,
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        <OrnamentalDivider color={accentColor} className="my-2 opacity-80" />

        {/* Invitation Message */}
        <p
          className="text-[11px] sm:text-[12px] max-w-[265px] leading-relaxed text-center px-2"
          style={getSafeTextStyle(
            content?.message ||
              "Invite you to celebrate their union amidst the waters and olive terraces.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "Invite you to celebrate their union amidst the waters and olive terraces."}
        </p>
      </div>

      {/* DATE, TIME & VENUE ROYAL PLAQUE */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Structured Royal Date & Time Plaque */}
        <div
          className="w-full max-w-[265px] px-4 py-2 rounded-[4px] flex items-center justify-center gap-2.5 shadow-sm"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}28 0%, rgba(255,255,255,0.05) 50%, ${accentColor}28 100%)`
              : `linear-gradient(135deg, ${accentColor}22 0%, ${cardBg} 50%, ${accentColor}22 100%)`,
            borderTop: `1.5px solid ${accentColor}`,
            borderBottom: `1.5px solid ${accentColor}`,
            borderLeft: `1px solid ${accentColor}50`,
            borderRight: `1px solid ${accentColor}50`,
            boxShadow: `0 4px 14px rgba(0,0,0,0.18)`,
          }}
        >
          <span
            className="text-[11px] sm:text-[12px] font-semibold"
            style={getSafeTextStyle(content?.weddingDate || "Saturday • June 21, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • June 21, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: accentColor }} />
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
        <div className="space-y-0.5 pt-0.5">
          <p
            className="text-base sm:text-[17px] font-semibold leading-snug drop-shadow-xs"
            style={getSafeTextStyle(content?.venue || "Villa Balbiano", {
              isSerif: true,
              color: textColor,
            })}
          >
            {content?.venue || "Villa Balbiano"}
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

        {/* Wax Seal Monogram */}
        {decorations?.hasWaxSeal !== false && (
          <div className="pt-0.5">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "A"}&${groomName?.[0] || "R"}`
              }
              color={accentColor}
              size={44}
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
