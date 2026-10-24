import React from "react";
import { CornerFlourish, WaxSeal } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function RomanticBlush({ design }) {
  const { content, palette, decorations, language } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual";

  const primaryColor = palette?.primary || "#6B3B48";
  const secondaryColor = palette?.secondary || "#9C6272";
  const accentColor = palette?.accent || "#C6A66B";
  const cardBg = palette?.cardBg || "#FCF8F7";
  const textMuted = palette?.textMuted || "#876F76";

  const brideName = content?.brideName || "Sophia Grace";
  const groomName = content?.groomName || "Alexander William";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-7 sm:p-10 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 22px 50px -12px rgba(107, 59, 72, 0.18), inset 0 0 0 1px rgba(198, 166, 107, 0.35), inset 0 0 45px rgba(252, 248, 247, 0.6)",
      }}
    >
      {/* Vellum Sash Overlay (Horizontal soft banner) */}
      <div
        className="absolute top-[42%] left-0 right-0 h-16 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, #FFFFFF 20%, #FFFFFF 80%, transparent)",
          borderTop: `1px solid ${accentColor}40`,
          borderBottom: `1px solid ${accentColor}40`,
        }}
      />

      {/* Outer Delicate Border */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none rounded-[2px]"
        style={{
          border: `1px solid ${accentColor}40`,
        }}
      />
      <div
        className="absolute inset-4 sm:inset-5 pointer-events-none rounded-[1px]"
        style={{
          border: `0.5px solid ${accentColor}25`,
        }}
      />

      {/* Corner Accents */}
      {decorations?.hasFloralCorners && (
        <>
          <CornerFlourish
            className="absolute top-4 left-4 pointer-events-none opacity-70"
            color={accentColor}
            size={34}
          />
          <CornerFlourish
            className="absolute top-4 right-4 pointer-events-none opacity-70 -scale-x-100"
            color={accentColor}
            size={34}
          />
          <CornerFlourish
            className="absolute bottom-4 left-4 pointer-events-none opacity-70 -scale-y-100"
            color={accentColor}
            size={34}
          />
          <CornerFlourish
            className="absolute bottom-4 right-4 pointer-events-none opacity-70 -scale-100"
            color={accentColor}
            size={34}
          />
        </>
      )}

      {/* TOP HEADER */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2 space-y-1">
        <span
          className="text-[10px] sm:text-[11px] font-semibold"
          style={getSafeTextStyle(content?.title || "TOGETHER WITH THEIR FAMILIES", {
            isSerif: false,
            color: secondaryColor,
            tracking: "0.22em",
            uppercase: true,
          })}
        >
          {content?.title || (hasBengali(brideName) ? "মাঙ্গলিক শুভ পরিণয়" : "TOGETHER WITH THEIR FAMILIES")}
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

      {/* NAMES (COUPLE OR CELEBRANT) */}
      <div className="relative z-10 flex flex-col items-center text-center my-3 sm:my-5">
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

            <div className="my-1.5 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px]" style={{ backgroundColor: `${accentColor}50` }} />
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
              <span className="w-8 h-[1px]" style={{ backgroundColor: `${accentColor}50` }} />
            </div>

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
          <div className="flex flex-col items-center">
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

        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-medium"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: "#6B3B48",
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

      {/* EVENT LOGISTICS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-3 pb-1">
        <div
          className="px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium"
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${accentColor}40`,
            color: primaryColor,
          }}
        >
          <span
            style={getSafeTextStyle(content?.weddingDate || "Saturday, September 25, 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.1em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Saturday, September 25, 2027"}
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

        <div>
          <p
            className="text-sm sm:text-base font-medium leading-snug"
            style={getSafeTextStyle(content?.venue || "Meadowood Estate & Vineyard", {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content?.venue || "Meadowood Estate & Vineyard"}
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
                `${brideName?.[0] || "S"}&${groomName?.[0] || "A"}`
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

