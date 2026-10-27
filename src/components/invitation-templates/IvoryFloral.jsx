"use client";

import React from "react";
import { BotanicalBranch, WaxSeal, CornerFlourish, OrnamentalDivider } from "./Decorations";
import { hasBengali, getSafeTextStyle, isDarkBg } from "@/lib/typography";

export default function IvoryFloral({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const cardBg = palette?.cardBg || "#FAF8F4";
  const isDark = isDarkBg(cardBg);

  const primaryColor = palette?.primary || (isDark ? "#E8F5E9" : "#1C3825");
  const textColor = palette?.textPrimary || (isDark ? "#FFFDF8" : primaryColor);
  const secondaryColor = palette?.secondary || (isDark ? "#86EFAC" : "#3E6B4B");
  const accentColor = palette?.accent || "#B89B5E";
  const textMuted = palette?.textMuted || (isDark ? "#C8D9CB" : "#5A6E5F");

  const brideName = content?.brideName || "Ayesha Khan";
  const groomName = content?.groomName || "Rafid Ahmed";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse at 50% 10%, ${accentColor}32 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, ${secondaryColor}14 0%, transparent 55%),
            radial-gradient(ellipse at 50% 90%, rgba(0,0,0,0.5) 0%, transparent 65%)
          `
          : `
            radial-gradient(ellipse at 50% 10%, ${secondaryColor}18 0%, transparent 58%),
            radial-gradient(circle at 50% 50%, ${accentColor}16 0%, transparent 55%),
            radial-gradient(ellipse at 50% 90%, ${primaryColor}12 0%, transparent 65%)
          `,
        boxShadow: `
          0 28px 65px -15px rgba(0,0,0,0.38),
          inset 0 0 0 1px ${accentColor}55,
          inset 0 0 50px ${accentColor}12
        `,
      }}
    >
      {/* Botanical Archway Inner Sanctuary Frame */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[3px]"
        style={{
          border: `1px solid ${accentColor}55`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-4.5 pointer-events-none rounded-t-[130px] rounded-b-[6px]"
        style={{
          border: `1.5px solid ${accentColor}85`,
          background: isDark
            ? `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 60%)`
            : `linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)`,
          boxShadow: `inset 0 0 22px ${accentColor}15`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-5.5 pointer-events-none rounded-t-[122px] rounded-b-[4px]"
        style={{
          border: `0.75px dashed ${secondaryColor}60`,
        }}
      />

      {/* Corner Botanical Flourishes */}
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

      {/* Top Botanical Garland & Blooming Rose Illustration */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <BotanicalBranch
          color={isDark ? accentColor : secondaryColor}
          accent={accentColor}
          className="mb-1 drop-shadow-xs"
        />
        <span
          className="text-[10px] sm:text-[11px] font-bold px-2"
          style={getSafeTextStyle(content?.title || "WE INVITE YOU TO CELEBRATE", {
            isSerif: false,
            color: isDark ? accentColor : secondaryColor,
            tracking: "0.22em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "আন্তরিক শুভ আমন্ত্রণ" : "WE INVITE YOU TO CELEBRATE")}
        </span>
        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px] max-w-[250px] mt-0.5"
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

            {/* Botanical Leaf Knot Divider */}
            <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[195px]">
              <span className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
              <div
                className="px-2.5 py-0.5 rounded-full flex items-center justify-center border"
                style={{
                  borderColor: accentColor,
                  background: `radial-gradient(circle, ${accentColor}28 0%, transparent 80%)`,
                }}
              >
                <span
                  className="text-sm sm:text-base font-medium leading-none"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "and", {
                    isSerif: true,
                    color: isDark ? accentColor : secondaryColor,
                    italic: !hasBengali(brideName) && !isBangla,
                    fontWeight: 600,
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
                    color: isDark ? accentColor : secondaryColor,
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

        <p
          className="text-[11px] sm:text-[12px] max-w-[260px] leading-relaxed text-center px-2"
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
      </div>

      {/* BOTTOM EVENT LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Date & Time Badge */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold shadow-xs"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${accentColor}28 0%, rgba(255,255,255,0.06) 50%, ${accentColor}28 100%)`
              : `linear-gradient(135deg, ${accentColor}22 0%, #FFFFFF 50%, ${accentColor}22 100%)`,
            border: `1.2px solid ${accentColor}`,
            boxShadow: `0 2px 10px ${accentColor}22`,
            color: isDark ? "#FFFFFF" : textColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday, October 18, 2027", {
              isSerif: false,
              color: isDark ? "#FFFFFF" : textColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday, October 18, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-60" style={{ color: accentColor }}>•</span>
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

        {/* Venue */}
        <div className="space-y-0.5">
          <p
            className="text-base sm:text-[17px] font-semibold leading-snug drop-shadow-xs"
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
          <div className="pt-0.5">
            <WaxSeal
              monogram={
                decorations?.monogram ||
                `${brideName?.[0] || "A"}&${groomName?.[0] || "R"}`
              }
              color={accentColor}
              size={42}
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
