import React from "react";
import { CornerFlourish, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function EmeraldRoyal({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#173D32";
  const accentColor = palette?.accent || "#C6A66B";
  const cardBg = palette?.cardBg || "#FFFFFF";
  const textMuted = palette?.textMuted || "#6B756E";

  const brideName = content?.brideName || "Eleanor Vance";
  const groomName = content?.groomName || "Arthur Pendelton";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-7 sm:p-10 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 22px 50px -12px rgba(23, 61, 50, 0.22), 0 0 0 1px rgba(198, 166, 107, 0.35) inset, inset 0 0 45px rgba(198, 166, 107, 0.05)",
      }}
    >
      {/* Outer & Inner Gilded Framing */}
      {decorations?.hasInnerFrame && (
        <>
          <div
            className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[2px]"
            style={{
              border: `1px solid ${accentColor}35`,
            }}
          />
          <div
            className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[2px]"
            style={{
              border: `1.5px solid ${accentColor}65`,
              boxShadow: `inset 0 0 0 1px ${accentColor}20`,
            }}
          />
        </>
      )}

      {/* 4 Corner Flourishes */}
      {decorations?.hasFloralCorners && (
        <>
          <CornerFlourish
            className="absolute top-5 left-5 pointer-events-none opacity-85"
            color={accentColor}
            size={36}
          />
          <CornerFlourish
            className="absolute top-5 right-5 pointer-events-none opacity-85 -scale-x-100"
            color={accentColor}
            size={36}
          />
          <CornerFlourish
            className="absolute bottom-5 left-5 pointer-events-none opacity-85 -scale-y-100"
            color={accentColor}
            size={36}
          />
          <CornerFlourish
            className="absolute bottom-5 right-5 pointer-events-none opacity-85 -scale-100"
            color={accentColor}
            size={36}
          />
        </>
      )}

      {/* TOP HEADER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 space-y-1.5">
        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "THE HONOUR OF YOUR PRESENCE", {
            isSerif: false,
            color: accentColor,
            tracking: "0.22em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ নিমন্ত্রণ" : "THE HONOUR OF YOUR PRESENCE")}
        </span>

        {content?.subtitle && (
          <p
            className="text-[12px] sm:text-[13px]"
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

      {/* EVENT NAMES (COUPLE OR SINGLE CELEBRANT) */}
      <div className="relative z-10 flex flex-col items-center text-center my-3 sm:my-5">
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

            <div className="flex items-center justify-center gap-3 my-1.5 sm:my-2.5 w-full max-w-[200px]">
              <span className="h-[1px] flex-1" style={{ backgroundColor: `${accentColor}50` }} />
              <span
                className="text-xl sm:text-2xl leading-none"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "&", {
                  isSerif: true,
                  color: accentColor,
                  italic: !hasBengali(brideName) && !isBangla,
                  fontWeight: hasBengali(brideName) || isBangla ? 600 : 400,
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

        {/* Bilingual Bengali Names (if bilingual) */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: "#285C49",
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        {/* Invitation Message */}
        <p
          className="mt-3 sm:mt-4 text-[12px] sm:text-[13px] max-w-xs leading-relaxed text-center px-2"
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

      {/* DATE, TIME & VENUE BLOCK */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3">
        {/* Date & Time pill */}
        <div
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium"
          style={{
            backgroundColor: `${primaryColor}08`,
            border: `1px solid ${accentColor}40`,
            color: primaryColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday • June 21, 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday • June 21, 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="mx-2 opacity-40">•</span>
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
            style={getSafeTextStyle(content?.venue || "Villa Balbiano", {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content?.venue || "Villa Balbiano"}
          </p>
          {content?.city && (
            <p
              className="text-[11px] sm:text-[12px]"
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
          <div className="pt-2">
            <WaxSeal
              monogram={
                decorations.monogram ||
                `${content?.brideName?.[0] || "A"}&${content?.groomName?.[0] || "R"}`
              }
              color={accentColor}
              size={48}
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

