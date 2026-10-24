"use client";

import React from "react";
import { CornerFlourish, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function RomanticBlush({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FCF7F6";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FFE4E6" : "#66303E");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#F472B6" : "#945667");
  const accentColor = palette?.accent || "#C99A75"; // Rose Gold / Warm Amber
  const textMuted = palette?.textMuted || (isDark ? "#E8D0D5" : "#80666D");

  const brideName = content?.brideName || "Sophia Grace";
  const groomName = content?.groomName || "Alexander William";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 15%, ${accentColor}28 0%, transparent 65%),
            radial-gradient(ellipse at 50% 85%, rgba(0,0,0,0.5) 0%, transparent 60%)
          `
          : `
            radial-gradient(ellipse at 50% 15%, rgba(245, 215, 220, 0.6) 0%, transparent 65%),
            radial-gradient(ellipse at 50% 85%, ${accentColor}18 0%, transparent 60%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.4),
          inset 0 0 0 1px ${accentColor}45,
          inset 0 0 50px rgba(245, 215, 220, 0.2)
        `,
      }}
    >
      {/* Vellum Ribbon Sash Overlay */}
      <div
        className="absolute top-[44%] left-0 right-0 h-16 pointer-events-none opacity-40"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12) 25%, rgba(255, 255, 255, 0.12) 75%, transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8) 25%, rgba(255, 255, 255, 0.8) 75%, transparent)",
          borderTop: `1px solid ${accentColor}50`,
          borderBottom: `1px solid ${accentColor}50`,
        }}
      />

      {/* Dual Delicate Framing */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[2px]"
        style={{
          border: `1.2px solid ${accentColor}60`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4.5 pointer-events-none rounded-[1px]"
        style={{
          border: `0.75px dashed ${accentColor}45`,
        }}
      />

      {/* Corner Flourishes */}
      {decorations?.hasFloralCorners !== false && (
        <>
          <CornerFlourish
            className="absolute top-3.5 left-3.5 pointer-events-none drop-shadow-xs"
            color={accentColor}
            size={36}
          />
          <CornerFlourish
            className="absolute top-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-x-100"
            color={accentColor}
            size={36}
          />
          <CornerFlourish
            className="absolute bottom-3.5 left-3.5 pointer-events-none drop-shadow-xs -scale-y-100"
            color={accentColor}
            size={36}
          />
          <CornerFlourish
            className="absolute bottom-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-100"
            color={accentColor}
            size={36}
          />
        </>
      )}

      {/* TOP HEADER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 space-y-1">
        {/* Heart / Ribbon top accent */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-5 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="w-5 h-[1px]" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        </div>

        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "TOGETHER WITH THEIR FAMILIES", {
            isSerif: false,
            color: isDark ? accentColor : secondaryColor,
            tracking: "0.24em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ পরিণয়" : "TOGETHER WITH THEIR FAMILIES")}
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

            <div className="my-2 flex items-center justify-center gap-2.5 w-full max-w-[190px]">
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
          <div className="flex flex-col items-center">
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
              "Invite you to celebrate love, laughter, and happily ever after as they tie the knot.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "Invite you to celebrate love, laughter, and happily ever after as they tie the knot."}
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

      {/* EVENT LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}25 0%, rgba(255,255,255,0.06) 50%, ${accentColor}25 100%)`
              : `linear-gradient(135deg, ${accentColor}18 0%, ${cardBg} 50%, ${accentColor}18 100%)`,
            border: `1px solid ${accentColor}60`,
            boxShadow: `0 2px 8px ${accentColor}20`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday, September 25, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday, September 25, 2027"}
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

        <div className="space-y-0.5 pt-0.5">
          <p
            className="text-base sm:text-lg font-medium leading-snug drop-shadow-xs"
            style={getSafeTextStyle(content?.venue || "Meadowood Estate & Vineyard", {
              isSerif: true,
              color: textColor,
            })}
          >
            {content?.venue || "Meadowood Estate & Vineyard"}
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

        {decorations?.hasWaxSeal !== false && (
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "S"}&${groomName?.[0] || "A"}`
              }
              color={accentColor}
              size={44}
            />
          </div>
        )}

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
