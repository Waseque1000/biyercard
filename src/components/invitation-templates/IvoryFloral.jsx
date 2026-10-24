"use client";

import React from "react";
import { BotanicalBranch, WaxSeal, CornerFlourish } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function IvoryFloral({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FAF7F2";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#E8F5E9" : "#243E2C");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#A3E635" : "#4E6B56");
  const accentColor = palette?.accent || "#BFA368";
  const textMuted = palette?.textMuted || (isDark ? "#C8D9CB" : "#6B7D70");

  const brideName = content?.brideName || "Ayesha Khan";
  const groomName = content?.groomName || "Rafid Ahmed";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 12%, ${accentColor}28 0%, transparent 60%),
            radial-gradient(ellipse at 50% 88%, rgba(0,0,0,0.5) 0%, transparent 60%)
          `
          : `
            radial-gradient(ellipse at 50% 12%, ${accentColor}18 0%, transparent 60%),
            radial-gradient(ellipse at 50% 88%, ${primaryColor}10 0%, transparent 60%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.4),
          inset 0 0 0 1px ${accentColor}45,
          inset 0 0 50px ${accentColor}0a
        `,
      }}
    >
      {/* Handcrafted Deckle Edge & Dual Botanical Framing */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[2px]"
        style={{
          border: `1.5px dashed ${accentColor}70`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4.5 pointer-events-none rounded-[1px]"
        style={{
          border: `0.75px solid ${accentColor}35`,
        }}
      />

      {/* Subtle Corner Leaves */}
      <CornerFlourish
        className="absolute top-3.5 left-3.5 pointer-events-none opacity-60"
        color={accentColor}
        size={32}
      />
      <CornerFlourish
        className="absolute top-3.5 right-3.5 pointer-events-none opacity-60 -scale-x-100"
        color={accentColor}
        size={32}
      />
      <CornerFlourish
        className="absolute bottom-3.5 left-3.5 pointer-events-none opacity-60 -scale-y-100"
        color={accentColor}
        size={32}
      />
      <CornerFlourish
        className="absolute bottom-3.5 right-3.5 pointer-events-none opacity-60 -scale-100"
        color={accentColor}
        size={32}
      />

      {/* Top Botanical Branch Illustration */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <BotanicalBranch color={isDark ? accentColor : secondaryColor} className="mb-1 opacity-90 drop-shadow-xs" />
        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "WE INVITE YOU TO CELEBRATE", {
            isSerif: false,
            color: isDark ? accentColor : secondaryColor,
            tracking: "0.24em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "আন্তরিক শুভ আমন্ত্রণ" : "WE INVITE YOU TO CELEBRATE")}
        </span>
        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px] max-w-xs mt-0.5"
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
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
                italic: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>

            {/* Botanical Leaf Knot Divider */}
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[190px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center border"
                style={{
                  borderColor: accentColor,
                  background: `radial-gradient(circle, ${accentColor}25 0%, transparent 80%)`,
                }}
              >
                <span
                  className="text-base sm:text-lg font-light leading-none"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "and", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                    fontWeight: hasBengali(brideName) || isBangla ? 600 : 400,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "and"}
                </span>
              </div>
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal drop-shadow-xs"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: textColor,
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
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
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
                  tracking: "0.22em",
                  uppercase: true,
                })}
              >
                {content.eventMilestone}
              </span>
            )}
          </div>
        )}

        {/* Bilingual Names */}
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
          className="mt-3.5 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center px-2"
          style={getSafeTextStyle(
            content?.message ||
              "With joy in our hearts, we invite you to join us as we begin our new life together.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "With joy in our hearts, we invite you to join us as we begin our new life together."}
        </p>

        {isBilingual && content?.bilingualMessage && (
          <p
            className="mt-1.5 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center font-medium"
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

      {/* BOTTOM EVENT LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Date & Time Badge */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}25 0%, rgba(255,255,255,0.06) 50%, ${accentColor}25 100%)`
              : `linear-gradient(135deg, ${accentColor}18 0%, ${cardBg} 50%, ${accentColor}18 100%)`,
            border: `1px solid ${accentColor}65`,
            boxShadow: `0 2px 8px ${accentColor}20`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday, October 18, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday, October 18, 2027"}
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
            style={getSafeTextStyle(content?.venue || "Rosewood Botanical Gardens", {
              isSerif: true,
              color: textColor,
            })}
          >
            {content?.venue || "Rosewood Botanical Gardens"}
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
          <div className="pt-1">
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
