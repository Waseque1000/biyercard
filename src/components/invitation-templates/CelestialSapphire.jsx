"use client";

import React from "react";
import { StarlightCluster, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function CelestialSapphire({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#F5E6CA"; // Gilded Starlight
  const accentColor = palette?.accent || "#D4AF37"; // Polished Gold
  const cardBg = palette?.cardBg || "#0C1829"; // Deep Sapphire Midnight
  const textMuted = palette?.textMuted || "#9BB0C7"; // Starlight Mist

  const brideName = content?.brideName || "Zoya Rahman";
  const groomName = content?.groomName || "Aryan Khan";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-9 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 24px 60px -15px rgba(12, 24, 41, 0.45), inset 0 0 0 1px rgba(212, 175, 55, 0.3), inset 0 0 60px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Delicate Constellation Stardust Background Highlights */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(212, 175, 55, 0.3) 1px, transparent 1px), radial-gradient(circle at 80% 25%, rgba(245, 230, 202, 0.3) 1px, transparent 1px), radial-gradient(circle at 35% 85%, rgba(212, 175, 55, 0.25) 1px, transparent 1px), radial-gradient(circle at 75% 80%, rgba(245, 230, 202, 0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold Leaf Dual Celestial Borders */}
      <div
        className="absolute inset-2.5 sm:inset-3.5 pointer-events-none rounded-[3px]"
        style={{
          border: `1px solid ${accentColor}40`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[2px]"
        style={{
          border: `1.5px solid ${accentColor}75`,
          boxShadow: `inset 0 0 20px rgba(212, 175, 55, 0.08)`,
        }}
      />

      {/* Corner Starlight Flairs */}
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full pointer-events-none" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full pointer-events-none" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
      <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full pointer-events-none" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full pointer-events-none" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />

      {/* TOP HEADER: STARLIGHT CLUSTER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 space-y-1.5">
        <StarlightCluster color={accentColor} className="mb-1" />

        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "UNDER THE STARS", {
            isSerif: false,
            color: accentColor,
            tracking: "0.25em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "তারাভরা সন্ধ্যার শুভ নিমন্ত্রণ" : "UNDER THE STARS • CELEBRATION")}
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

      {/* CENTER COUPLE / CELEBRANT */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-normal"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
              })}
            >
              {brideName}
            </h1>

            {/* Glowing Golden Ring Divider */}
            <div className="flex items-center justify-center gap-3 my-2 w-full max-w-[190px]">
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}50` }} />
              <span
                className="text-lg sm:text-xl font-light"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                  isSerif: true,
                  color: accentColor,
                  italic: !hasBengali(brideName) && !isBangla,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "&"}
              </span>
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}50` }} />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-normal"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(groomName) ? 600 : 400,
              })}
            >
              {groomName}
            </h1>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-tight font-normal"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
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
                  tracking: "0.2em",
                  uppercase: true,
                })}
              >
                {content.eventMilestone}
              </span>
            )}
          </div>
        )}

        {/* Bilingual Bengali Sub-Names (if bilingual) */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: accentColor,
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
        {/* Date & Time pill */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium"
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.12)",
            border: `1px solid ${accentColor}60`,
            color: primaryColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • October 23, 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • October 23, 2027"}
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
                tracking: hasBengali(content.city) ? "0px" : "0.15em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {/* Wax Seal Monogram */}
        {decorations?.hasWaxSeal && (
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations.monogram ||
                `${brideName?.[0] || "Z"}&${groomName?.[0] || "A"}`
              }
              color={accentColor}
              size={44}
            />
          </div>
        )}

        {/* RSVP Details */}
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
