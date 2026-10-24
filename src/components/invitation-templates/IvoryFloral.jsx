import React from "react";
import { BotanicalBranch, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function IvoryFloral({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#2C402E";
  const secondaryColor = palette?.secondary || "#556B58";
  const accentColor = palette?.accent || "#B8A375";
  const cardBg = palette?.cardBg || "#FAF8F4";
  const textMuted = palette?.textMuted || "#6D7B70";

  const brideName = content?.brideName || "Ayesha Khan";
  const groomName = content?.groomName || "Rafid Ahmed";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-7 sm:p-10 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 22px 50px -12px rgba(44, 64, 46, 0.18), inset 0 0 0 1px rgba(184, 163, 117, 0.35), inset 0 0 45px rgba(184, 163, 117, 0.05)",
      }}
    >
      {/* Deckle Edge simulated border */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[2px]"
        style={{
          border: `1px dashed ${accentColor}60`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[1px]"
        style={{
          border: `0.5px solid ${accentColor}30`,
        }}
      />

      {/* Top Botanical Branch Illustration */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <BotanicalBranch color={secondaryColor} className="mb-2 opacity-85" />
        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "WE INVITE YOU TO CELEBRATE", {
            isSerif: false,
            color: secondaryColor,
            tracking: "0.22em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "আন্তরিক শুভ আমন্ত্রণ" : "WE INVITE YOU TO CELEBRATE")}
        </span>
        {content?.subtitle && (
          <p
            className="text-[12px] sm:text-[13px] mt-1"
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
      <div className="relative z-10 flex flex-col items-center text-center my-3 sm:my-4">
        {groomName ? (
          <>
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-normal"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
                italic: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>

            <span
              className="text-lg sm:text-xl my-1.5"
              style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "and", {
                isSerif: true,
                color: accentColor,
                italic: !hasBengali(brideName) && !isBangla,
                fontWeight: hasBengali(brideName) || isBangla ? 600 : 400,
              })}
            >
              {hasBengali(brideName) || isBangla ? "ও" : "and"}
            </span>

            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-normal"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(groomName) ? 600 : 400,
                italic: !hasBengali(groomName),
              })}
            >
              {groomName}
            </h1>
          </>
        ) : (
          <>
            <h1
              className="text-3xl sm:text-4xl md:text-[40px] leading-tight font-normal"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 600 : 400,
                italic: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <span
                className="mt-1 text-xs sm:text-sm font-semibold"
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
          </>
        )}

        {/* Bilingual Names */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: "#2C402E",
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        <p
          className="mt-4 text-[12px] sm:text-[13px] max-w-xs leading-relaxed text-center"
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
            className="mt-2 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center"
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

      {/* BOTTOM EVENT LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3 pb-1">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px]" style={{ backgroundColor: `${accentColor}60` }} />
          <p
            className="text-xs sm:text-sm font-medium"
            style={getSafeTextStyle(content?.weddingDate || "Saturday, October 18, 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday, October 18, 2027"}
          </p>
          <span className="w-8 h-[1px]" style={{ backgroundColor: `${accentColor}60` }} />
        </div>

        {content?.weddingTime && (
          <p
            className="text-[11px] sm:text-[12px]"
            style={getSafeTextStyle(content.weddingTime, {
              isSerif: false,
              color: textMuted,
              tracking: hasBengali(content.weddingTime) ? "0px" : "0.08em",
              uppercase: !hasBengali(content.weddingTime),
            })}
          >
            {content.weddingTime}
          </p>
        )}

        <div className="pt-0.5">
          <p
            className="text-sm sm:text-base font-medium leading-snug"
            style={getSafeTextStyle(content?.venue || "Rosewood Botanical Gardens", {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content?.venue || "Rosewood Botanical Gardens"}
          </p>
          {content?.city && (
            <p
              className="text-[11px] sm:text-[12px] mt-0.5"
              style={getSafeTextStyle(content.city, {
                isSerif: false,
                color: textMuted,
                tracking: hasBengali(content.city) ? "0px" : "0.12em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {decorations?.hasWaxSeal && (
          <div className="pt-2">
            <WaxSeal
              monogram={
                decorations.monogram ||
                `${brideName?.[0] || "A"}&${groomName?.[0] || "R"}`
              }
              color={accentColor}
              size={46}
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

