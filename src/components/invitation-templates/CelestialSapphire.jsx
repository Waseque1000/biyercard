"use client";

import React from "react";
import { StarlightCluster, OrnamentalDivider, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function CelestialSapphire({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#F8EBD4";
  const accentColor = palette?.accent || "#E5C072";
  const cardBg = palette?.cardBg || "#0A1526";
  const textMuted = palette?.textMuted || "#B0C4DE";

  const brideName = content?.brideName || "Zoya Rahman";
  const groomName = content?.groomName || "Aryan Khan";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-7 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: `
          radial-gradient(ellipse at 50% 18%, #1E3F6E 0%, ${cardBg} 62%, #050A12 100%),
          radial-gradient(circle at 50% 48%, rgba(229, 192, 114, 0.14) 0%, transparent 55%)
        `,
        boxShadow: `
          0 28px 65px -15px rgba(5, 11, 20, 0.75),
          inset 0 0 0 1px ${accentColor}55,
          inset 0 0 70px rgba(0, 0, 0, 0.7)
        `,
      }}
    >
      {/* Luminous Constellation Stardust Field */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 14%, rgba(229, 192, 114, 0.85) 1.2px, transparent 1.2px),
            radial-gradient(circle at 82% 22%, rgba(255, 255, 255, 0.8) 1.4px, transparent 1.4px),
            radial-gradient(circle at 28% 76%, rgba(229, 192, 114, 0.7) 1.1px, transparent 1.1px),
            radial-gradient(circle at 76% 74%, rgba(248, 235, 212, 0.75) 1.2px, transparent 1.2px),
            radial-gradient(circle at 50% 50%, rgba(229, 192, 114, 0.45) 1px, transparent 1px),
            radial-gradient(circle at 88% 55%, rgba(229, 192, 114, 0.6) 1.1px, transparent 1.1px),
            radial-gradient(circle at 14% 58%, rgba(255, 255, 255, 0.6) 1.1px, transparent 1.1px)
          `,
          backgroundSize: "75px 75px, 90px 90px, 70px 70px, 85px 85px, 60px 60px, 95px 95px, 68px 68px",
        }}
      />

      {/* Celestial Observatory Arch Frame */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[3px]"
        style={{
          border: `1px solid ${accentColor}50`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-4.5 pointer-events-none rounded-t-[135px] rounded-b-[3px]"
        style={{
          border: `1.6px solid ${accentColor}90`,
          boxShadow: `inset 0 0 28px rgba(229, 192, 114, 0.16), 0 0 14px rgba(229, 192, 114, 0.2)`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-5.5 pointer-events-none rounded-t-[128px] rounded-b-[2px]"
        style={{
          border: `0.75px dashed ${accentColor}55`,
        }}
      />

      {/* Central Astral Orbit Ring Behind Names */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full pointer-events-none opacity-25"
        style={{
          border: `1px solid ${accentColor}`,
          boxShadow: `0 0 35px ${accentColor}30`,
        }}
      />

      {/* Glowing Corner Starlight Nodes */}
      <div
        className="absolute top-3.5 left-3.5 w-2 h-2 rotate-45 pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />
      <div
        className="absolute top-3.5 right-3.5 w-2 h-2 rotate-45 pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />
      <div
        className="absolute bottom-3.5 left-3.5 w-2 h-2 rotate-45 pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />
      <div
        className="absolute bottom-3.5 right-3.5 w-2 h-2 rotate-45 pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />

      {/* TOP HEADER: HANGING CRESCENT MOON & STARLIGHT CLUSTER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-1.5 space-y-1">
        <StarlightCluster color={accentColor} className="mb-0.5 drop-shadow-sm" />

        <span
          className="text-[10px] sm:text-[11px] font-bold px-2"
          style={getSafeTextStyle(content?.title || "UNDER THE STARS", {
            isSerif: false,
            color: accentColor,
            tracking: "0.24em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "তারাভরা সন্ধ্যার শুভ নিমন্ত্রণ" : "UNDER THE CANOPY OF STARS")}
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

      {/* CENTER COUPLE / CELEBRANT */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-md"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 500,
              })}
            >
              {brideName}
            </h1>

            {/* Glowing Golden Star Ring Divider */}
            <div className="flex items-center justify-center gap-3 my-2 w-full max-w-[205px]">
              <span
                className="h-[1px] flex-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor})`,
                }}
              />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  border: `1.2px solid ${accentColor}`,
                  background: `radial-gradient(circle, ${accentColor}35 0%, transparent 75%)`,
                  boxShadow: `0 0 12px ${accentColor}40`,
                }}
              >
                <span
                  className="text-base sm:text-lg font-medium leading-none"
                  style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                    isSerif: true,
                    color: accentColor,
                    italic: !hasBengali(brideName) && !isBangla,
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
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-md"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(groomName) ? 600 : 500,
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-md"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
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

        {/* Invitation Message */}
        <p
          className="text-[11px] sm:text-[12px] max-w-[260px] leading-relaxed text-center px-2"
          style={getSafeTextStyle(
            content?.message ||
              "Request the joy of your presence under a canopy of stars as we celebrate love and friendship.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "Request the joy of your presence under a canopy of stars as we celebrate love and friendship."}
        </p>
      </div>

      {/* BOTTOM LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Date & Time Astral Capsule */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold shadow-sm"
          style={{
            background: `linear-gradient(135deg, rgba(229, 192, 114, 0.24) 0%, rgba(12, 23, 40, 0.7) 50%, rgba(229, 192, 114, 0.24) 100%)`,
            border: `1.4px solid ${accentColor}`,
            boxShadow: `0 0 18px ${accentColor}30`,
            color: primaryColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • October 23, 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • October 23, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2" style={{ color: accentColor }}>✦</span>
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
            style={getSafeTextStyle(content?.venue || "The Starlight Observatory Pavilion", {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content?.venue || "The Starlight Observatory Pavilion"}
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
                `${brideName?.[0] || "Z"}&${groomName?.[0] || "A"}`
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
