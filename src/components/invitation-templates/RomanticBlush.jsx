"use client";

import React from "react";
import { CornerFlourish, BotanicalBranch, OrnamentalDivider, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function RomanticBlush({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FFF1F2";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#FFE4E6" : "#7A1230");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#F472B6" : "#BE185D");
  const accentColor = palette?.accent || "#D97706";
  const textMuted = palette?.textMuted || (isDark ? "#E8D0D5" : "#8E455B");

  const brideName = content?.brideName || "Sophia Grace";
  const groomName = content?.groomName || "Alexander William";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 14%, ${secondaryColor}35 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, ${accentColor}16 0%, transparent 55%),
            radial-gradient(ellipse at 50% 88%, rgba(0,0,0,0.55) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 12%, rgba(251, 207, 232, 0.75) 0%, transparent 60%),
            radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.85) 0%, transparent 58%),
            radial-gradient(ellipse at 50% 90%, rgba(244, 114, 182, 0.22) 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.38),
          inset 0 0 0 1px ${accentColor}55,
          inset 0 0 55px rgba(244, 114, 182, 0.18)
        `,
      }}
    >
      {/* Translucent Silk Vellum Sash Across Center */}
      <div
        className="absolute top-[36%] left-0 right-0 h-28 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08) 20%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.08) 80%, transparent)"
            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65) 20%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.65) 80%, transparent)",
          borderTop: `1px solid ${accentColor}45`,
          borderBottom: `1px solid ${accentColor}45`,
        }}
      />

      {/* Interlocking Golden Floral Hoop Rings Behind Couple Names */}
      <div
        className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none opacity-35"
        style={{
          border: `1.5px solid ${accentColor}`,
          boxShadow: `inset 0 0 20px ${accentColor}20`,
        }}
      />
      <div
        className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full pointer-events-none opacity-25 rotate-6"
        style={{
          border: `1px dashed ${secondaryColor}`,
        }}
      />

      {/* Dual Delicate Rose-Gold Framing */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[4px]"
        style={{
          border: `1.5px solid ${accentColor}80`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-4.5 pointer-events-none rounded-[2px]"
        style={{
          border: `0.85px dashed ${secondaryColor}60`,
        }}
      />

      {/* Corner Flourishes */}
      {decorations?.hasFloralCorners !== false && (
        <>
          <CornerFlourish
            className="absolute top-3.5 left-3.5 pointer-events-none drop-shadow-xs"
            color={accentColor}
            size={42}
          />
          <CornerFlourish
            className="absolute top-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-x-100"
            color={accentColor}
            size={42}
          />
          <CornerFlourish
            className="absolute bottom-3.5 left-3.5 pointer-events-none drop-shadow-xs -scale-y-100"
            color={accentColor}
            size={42}
          />
          <CornerFlourish
            className="absolute bottom-3.5 right-3.5 pointer-events-none drop-shadow-xs -scale-100"
            color={accentColor}
            size={42}
          />
        </>
      )}

      {/* TOP HEADER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <BotanicalBranch
          color={secondaryColor}
          accent={accentColor}
          className="mb-0.5 w-40 h-auto opacity-90"
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
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ পরিণয়" : "TOGETHER WITH THEIR FAMILIES")}
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

      {/* NAMES (COUPLE OR CELEBRANT) */}
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

            <div className="my-2 flex items-center justify-center gap-2.5 w-full max-w-[195px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center border shadow-2xs"
                style={{
                  borderColor: accentColor,
                  background: `radial-gradient(circle, ${secondaryColor}25 0%, transparent 80%)`,
                }}
              >
                <span
                  className="text-base sm:text-lg font-medium leading-none"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                    isSerif: true,
                    color: isDark ? accentColor : secondaryColor,
                    italic: !hasBengali(brideName) && !isBangla,
                    fontWeight: 600,
                  })}
                >
                  {hasBengali(brideName) || isBangla ? "ও" : "&"}
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
          <div className="flex flex-col items-center">
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
                    color: isDark ? accentColor : secondaryColor,
                    tracking: "0.2em",
                    uppercase: true,
                  }),
                  borderColor: `${accentColor}65`,
                  backgroundColor: `${secondaryColor}15`,
                }}
              >
                {content.eventMilestone}
              </span>
            )}
          </div>
        )}

        <OrnamentalDivider color={accentColor} className="my-1.5 opacity-80" />

        <p
          className="text-[11px] sm:text-[12px] max-w-[260px] leading-relaxed text-center px-2"
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
      </div>

      {/* EVENT LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}28 0%, rgba(255,255,255,0.06) 50%, ${accentColor}28 100%)`
              : `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${cardBg} 50%, rgba(255,255,255,0.9) 100%)`,
            border: `1.2px solid ${accentColor}`,
            boxShadow: `0 2px 10px ${secondaryColor}22`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday, September 25, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday, September 25, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-70" style={{ color: secondaryColor }}>♥</span>
              <span
                style={getSafeTextStyle(content.weddingTime, {
                  isSerif: false,
                  color: isDark ? accentColor : secondaryColor,
                })}
              >
                {content.weddingTime}
              </span>
            </>
          )}
        </div>

        <div className="space-y-0.5">
          <p
            className="text-base sm:text-[17px] font-semibold leading-snug drop-shadow-xs"
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
          <div className="pt-0.5">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "S"}&${groomName?.[0] || "A"}`
              }
              color={accentColor}
              size={42}
            />
          </div>
        )}

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
