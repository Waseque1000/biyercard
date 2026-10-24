import React from "react";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function ModernMinimal({ design }) {
  const { content, palette, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.textPrimary || "#1B1C1A";
  const accentColor = palette?.accent || "#C6A66B";
  const cardBg = palette?.cardBg || "#FFFFFF";
  const textMuted = palette?.textMuted || "#77766F";

  const brideName = content?.brideName || "Camilla";
  const groomName = content?.groomName || "Julian";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-8 sm:p-12 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 25px 50px -12px rgba(27, 28, 26, 0.12), 0 0 0 1px rgba(232, 226, 216, 0.85), inset 0 0 50px rgba(0, 0, 0, 0.015)",
      }}
    >
      {/* Editorial Hairline Top */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        <div className="w-8 h-[2px]" style={{ backgroundColor: accentColor }} />
        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "WEDDING INVITATION", {
            isSerif: false,
            color: primaryColor,
            tracking: "0.25em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক আমন্ত্রণ" : "WEDDING INVITATION")}
        </span>
        {content?.subtitle && (
          <p
            className="text-[11px] sm:text-[12px]"
            style={getSafeTextStyle(content.subtitle, {
              isSerif: false,
              color: textMuted,
              tracking: hasBengali(content.subtitle) ? "0px" : "0.15em",
              uppercase: !hasBengali(content.subtitle),
            })}
          >
            {content.subtitle}
          </p>
        )}
      </div>

      {/* CENTER NAMES: HIGH-EDITORIAL ASYMMETRIC BALANCE */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-6">
        {groomName ? (
          <>
            <h1
              className="text-4xl sm:text-5xl md:text-[46px] leading-tight font-light"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 500 : 300,
                uppercase: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>

            <div className="my-3 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#E8E2D8]" />
              <span
                className="text-sm font-semibold"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "AND", {
                  isSerif: false,
                  color: accentColor,
                  tracking: hasBengali(brideName) || isBangla ? "0px" : "0.2em",
                  uppercase: !hasBengali(brideName) && !isBangla,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "AND"}
              </span>
              <span className="w-12 h-[1px] bg-[#E8E2D8]" />
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-[46px] leading-tight font-light"
              style={getSafeTextStyle(groomName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(groomName) ? 500 : 300,
                uppercase: !hasBengali(groomName),
              })}
            >
              {groomName}
            </h1>
          </>
        ) : (
          <>
            <h1
              className="text-3xl sm:text-4xl md:text-[42px] leading-tight font-light"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
                fontWeight: hasBengali(brideName) ? 500 : 300,
                uppercase: !hasBengali(brideName),
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <div
                className="mt-3 text-xs font-semibold"
                style={getSafeTextStyle(content.eventMilestone, {
                  isSerif: false,
                  color: accentColor,
                  tracking: "0.25em",
                  uppercase: true,
                })}
              >
                {content.eventMilestone}
              </div>
            )}
          </>
        )}

        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-3 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: "#252923",
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        <p
          className="mt-6 text-[12px] sm:text-[13px] max-w-xs leading-relaxed text-center font-light"
          style={getSafeTextStyle(
            content?.message ||
              "Cordially invite you to celebrate our union as we exchange vows.",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "Cordially invite you to celebrate our union as we exchange vows."}
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

      {/* BOTTOM LOGISTICS: CRISP MODERN GRID */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3">
        <div className="w-full flex items-center justify-between border-t border-b border-[#E8E2D8] py-2.5 px-3">
          <span
            className="text-[11px] sm:text-[12px] font-medium"
            style={getSafeTextStyle(content?.weddingDate || "15 • 02 • 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.15em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "15 • 02 • 2027"}
          </span>
          <span className="text-[10px] opacity-40">|</span>
          <span
            className="text-[11px] sm:text-[12px] font-medium"
            style={getSafeTextStyle(content?.weddingTime || "6:00 PM", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingTime) ? "0px" : "0.15em",
              uppercase: !hasBengali(content?.weddingTime),
            })}
          >
            {content?.weddingTime || "6:00 PM"}
          </span>
        </div>

        <div className="pt-1">
          <p
            className="text-sm sm:text-base font-normal"
            style={getSafeTextStyle(content?.venue || "The Glasshouse Pavilion", {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content?.venue || "The Glasshouse Pavilion"}
          </p>
          {content?.city && (
            <p
              className="text-[10px] sm:text-[11px] mt-0.5"
              style={getSafeTextStyle(content.city, {
                isSerif: false,
                color: textMuted,
                tracking: hasBengali(content.city) ? "0px" : "0.18em",
                uppercase: !hasBengali(content.city),
              })}
            >
              {content.city}
            </p>
          )}
        </div>

        {content?.rsvpDetails && (
          <p
            className="text-[10px] opacity-75 pt-1"
            style={getSafeTextStyle(content.rsvpDetails, {
              isSerif: false,
              color: textMuted,
              tracking: hasBengali(content.rsvpDetails) ? "0px" : "0.15em",
              uppercase: !hasBengali(content.rsvpDetails),
            })}
          >
            {content.rsvpDetails}
          </p>
        )}
      </div>
    </div>
  );
}

