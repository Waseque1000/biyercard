"use client";

import React from "react";
import { CornerFlourish, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function EmeraldRoyal({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FAF8F5";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#F5EEDB" : "#173D32");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const accentColor = palette?.accent || "#C6A66B";
  const textMuted = palette?.textMuted || (isDark ? "#CAD7CF" : "#6B756E");

  const brideName = content?.brideName || "Eleanor Vance";
  const groomName = content?.groomName || "Arthur Pendelton";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 12%, ${accentColor}30 0%, transparent 65%),
            radial-gradient(ellipse at 50% 88%, rgba(0,0,0,0.4) 0%, transparent 60%)
          `
          : `
            radial-gradient(ellipse at 50% 12%, ${accentColor}18 0%, transparent 65%),
            radial-gradient(ellipse at 50% 88%, ${primaryColor}12 0%, transparent 60%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.4),
          0 0 0 1px ${accentColor}50 inset,
          inset 0 0 60px ${accentColor}10
        `,
      }}
    >
      {/* Subtle Luxury Linen Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(${isDark ? "#FFF" : primaryColor} 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      />

      {/* Triple Gilded Framing */}
      <div
        className="absolute inset-2 sm:inset-2.5 pointer-events-none rounded-[2px]"
        style={{
          border: `1px solid ${accentColor}45`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4 pointer-events-none rounded-[2px]"
        style={{
          border: `1.5px solid ${accentColor}85`,
          boxShadow: `inset 0 0 12px ${accentColor}20, 0 0 8px ${accentColor}20`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-[22px] pointer-events-none rounded-[1px]"
        style={{
          border: `0.5px dashed ${accentColor}60`,
        }}
      />

      {/* Ornate Corner Flourishes */}
      {decorations?.hasFloralCorners !== false && (
        <>
          <CornerFlourish
            className="absolute top-4 left-4 pointer-events-none drop-shadow-xs"
            color={accentColor}
            size={40}
          />
          <CornerFlourish
            className="absolute top-4 right-4 pointer-events-none drop-shadow-xs -scale-x-100"
            color={accentColor}
            size={40}
          />
          <CornerFlourish
            className="absolute bottom-4 left-4 pointer-events-none drop-shadow-xs -scale-y-100"
            color={accentColor}
            size={40}
          />
          <CornerFlourish
            className="absolute bottom-4 right-4 pointer-events-none drop-shadow-xs -scale-100"
            color={accentColor}
            size={40}
          />
        </>
      )}

      {/* Corner Gem Insets */}
      <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />
      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />
      <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />
      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rotate-45 pointer-events-none" style={{ backgroundColor: accentColor }} />

      {/* TOP HEADER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 sm:pt-3 space-y-1">
        {/* Crown / Crest accent line */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-6 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: accentColor }} />
          <span className="w-6 h-[1px]" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        </div>

        <span
          className="text-[10px] sm:text-[11px] font-semibold tracking-wider"
          style={getSafeTextStyle(content?.title || "THE HONOUR OF YOUR PRESENCE", {
            isSerif: false,
            color: accentColor,
            tracking: "0.26em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ নিমন্ত্রণ" : "THE HONOUR OF YOUR PRESENCE")}
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

      {/* EVENT NAMES: COUPLE OR CELEBRANT */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal tracking-wide drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
              })}
            >
              {brideName}
            </h1>

            {/* Gilded Filigree Knot */}
            <div className="flex items-center justify-center gap-3 my-2 sm:my-3 w-full max-w-[210px]">
              <span
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor})`,
                }}
              />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  border: `1px solid ${accentColor}80`,
                  background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
                }}
              >
                <span
                  className="text-lg sm:text-xl leading-none"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
                    fontWeight: hasBengali(brideName) || isBangla ? 600 : 400,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "&"}
                </span>
              </div>
              <span
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                }}
              />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal tracking-wide drop-shadow-xs"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(groomName) ? 600 : 400,
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal tracking-wide drop-shadow-xs"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: textColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
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

        {/* Bilingual Sub-Names (if bilingual) */}
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

        {/* Invitation Message */}
        <p
          className="mt-3.5 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center px-2"
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

      {/* DATE, TIME & VENUE BLOCK */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Date & Time Gilded Pill */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}25 0%, rgba(255,255,255,0.06) 50%, ${accentColor}25 100%)`
              : `linear-gradient(135deg, ${accentColor}18 0%, ${cardBg} 50%, ${accentColor}18 100%)`,
            border: `1px solid ${accentColor}75`,
            boxShadow: `0 2px 8px ${accentColor}25`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • June 21, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • June 21, 2027"}
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
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "A"}&${groomName?.[0] || "R"}`
              }
              color={accentColor}
              size={46}
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
