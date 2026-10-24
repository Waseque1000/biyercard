"use client";

import React from "react";
import { StarlightCluster, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function CelestialSapphire({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#F8EBD4"; // Gilded Starlight
  const accentColor = palette?.accent || "#E5C072"; // Polished Celestial Gold
  const cardBg = palette?.cardBg || "#0C1728"; // Deep Sapphire Midnight
  const textMuted = palette?.textMuted || "#A8BDD4"; // Starlight Mist

  const brideName = content?.brideName || "Zoya Rahman";
  const groomName = content?.groomName || "Aryan Khan";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        backgroundImage: `
          radial-gradient(ellipse at 50% 25%, #1B355A 0%, ${cardBg} 65%, #060B14 100%),
          radial-gradient(circle at 20% 80%, rgba(229, 192, 114, 0.08) 0%, transparent 40%)
        `,
        boxShadow: `
          0 28px 65px -15px rgba(5, 11, 20, 0.7),
          inset 0 0 0 1px ${accentColor}40,
          inset 0 0 70px rgba(0, 0, 0, 0.75)
        `,
      }}
    >
      {/* Delicate Constellation Stardust Background Highlights */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 14%, rgba(229, 192, 114, 0.6) 1px, transparent 1px),
            radial-gradient(circle at 82% 22%, rgba(248, 235, 212, 0.6) 1.2px, transparent 1.2px),
            radial-gradient(circle at 35% 82%, rgba(229, 192, 114, 0.5) 1px, transparent 1px),
            radial-gradient(circle at 74% 78%, rgba(248, 235, 212, 0.6) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(229, 192, 114, 0.3) 0.8px, transparent 0.8px),
            radial-gradient(circle at 88% 60%, rgba(229, 192, 114, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 12% 65%, rgba(248, 235, 212, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px, 90px 90px, 75px 75px, 85px 85px, 60px 60px, 95px 95px, 70px 70px",
        }}
      />

      {/* Gold Leaf Dual Celestial Borders */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-[3px]"
        style={{
          border: `1px solid ${accentColor}40`,
        }}
      />
      <div
        className="absolute inset-3.5 sm:inset-4.5 pointer-events-none rounded-[2px]"
        style={{
          border: `1.5px solid ${accentColor}85`,
          boxShadow: `inset 0 0 25px rgba(229, 192, 114, 0.12), 0 0 10px rgba(229, 192, 114, 0.15)`,
        }}
      />
      <div
        className="absolute inset-5 sm:inset-6 pointer-events-none rounded-[1px]"
        style={{
          border: `0.5px dashed ${accentColor}50`,
        }}
      />

      {/* Glowing Corner Starlight Nodes */}
      <div
        className="absolute top-3 left-3 w-2 h-2 rounded-full pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />
      <div
        className="absolute top-3 right-3 w-2 h-2 rounded-full pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />
      <div
        className="absolute bottom-3 left-3 w-2 h-2 rounded-full pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />
      <div
        className="absolute bottom-3 right-3 w-2 h-2 rounded-full pointer-events-none"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}, 0 0 4px #FFFFFF` }}
      />

      {/* TOP HEADER: STARLIGHT CLUSTER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 space-y-1">
        <StarlightCluster color={accentColor} className="mb-0.5" />

        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "UNDER THE STARS", {
            isSerif: false,
            color: accentColor,
            tracking: "0.26em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "তারাভরা সন্ধ্যার শুভ নিমন্ত্রণ" : "UNDER THE STARS • CELEBRATION")}
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

      {/* CENTER COUPLE / CELEBRANT */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {groomName ? (
          <div className="w-full flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal drop-shadow-md"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
              })}
            >
              {brideName}
            </h1>

            {/* Glowing Golden Ring Divider */}
            <div className="flex items-center justify-center gap-3 my-2 sm:my-2.5 w-full max-w-[200px]">
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
                  boxShadow: `0 0 10px ${accentColor}30`,
                }}
              >
                <span
                  className="text-base sm:text-lg font-light leading-none"
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
              className="text-3xl sm:text-4xl md:text-[42px] leading-[1.15] font-normal drop-shadow-md"
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
              className="text-3xl sm:text-4xl md:text-[40px] leading-[1.15] font-normal drop-shadow-md"
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
                  tracking: "0.22em",
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

        {isBilingual && content?.bilingualMessage && (
          <p
            className="mt-1.5 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center"
            style={getSafeTextStyle(content.bilingualMessage, {
              isSerif: false,
              color: primaryColor,
              italic: !hasBengali(content.bilingualMessage),
            })}
          >
            {content.bilingualMessage}
          </p>
        )}
      </div>

      {/* BOTTOM LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pb-1">
        {/* Date & Time pill */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium shadow-xs"
          style={{
            background: "rgba(229, 192, 114, 0.12)",
            border: `1.2px solid ${accentColor}70`,
            boxShadow: `0 0 14px ${accentColor}25`,
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
        <div className="space-y-0.5 pt-0.5">
          <p
            className="text-base sm:text-lg font-medium leading-snug drop-shadow-xs"
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
          <div className="pt-1">
            <WaxSeal
              monogram={
                decorations?.monogram ||
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
