import React from "react";
import { TraditionalMandala, IslamicArchBorder, CornerFlourish } from "./Decorations";
import { hasBengali, getSafeTextStyle } from "@/lib/typography";

export default function TraditionalCelebration({ design }) {
  const { content, palette, decorations, language, culturalStyle } = design;
  const isBangla = language === "bn";
  const isBilingual = language === "bilingual" || language === "bn";

  const primaryColor = palette?.primary || "#5A1827";
  const secondaryColor = palette?.secondary || "#83283B";
  const accentColor = palette?.accent || "#D4AF37";
  const cardBg = palette?.cardBg || "#FAF7F5";
  const textMuted = palette?.textMuted || "#7A6367";

  const isIslamic = culturalStyle === "islamic";

  const brideName = content?.brideName || "Nusrat Jahan";
  const groomName = content?.groomName || "Tanvir Hasan";

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-9 select-none overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: cardBg,
        boxShadow:
          "0 20px 45px -10px rgba(90, 24, 39, 0.15), inset 0 0 0 2px rgba(212, 175, 55, 0.35)",
      }}
    >
      {/* Decorative Ornate Frame */}
      <div
        className="absolute inset-2.5 sm:inset-3 pointer-events-none"
        style={{
          border: `1px solid ${accentColor}60`,
          boxShadow: `inset 0 0 0 1px ${accentColor}30`,
        }}
      />

      {/* Islamic Arch Border at Top */}
      {isIslamic ? (
        <IslamicArchBorder color={accentColor} className="opacity-70 h-8" />
      ) : (
        <div className="flex justify-center pt-1">
          <TraditionalMandala color={accentColor} size={48} />
        </div>
      )}

      {/* Bismillah / Auspicious Blessing Header */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-1">
        {isIslamic ? (
          <span
            className="text-[13px] sm:text-[14px] font-medium"
            style={{ color: accentColor, fontFamily: "var(--font-noto-serif-bengali), Georgia, serif" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰনِ الرَّحِيمِ
          </span>
        ) : culturalStyle === "hindu" ? (
          <span
            className="text-[12px] sm:text-[13px] font-medium"
            style={{ color: accentColor, fontFamily: "var(--font-noto-serif-bengali), serif" }}
          >
            ॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-6 h-[1px]" style={{ backgroundColor: `${accentColor}70` }} />
            <span
              className="text-[11px] sm:text-[12px] font-semibold"
              style={getSafeTextStyle(
                content?.cardPurpose === "birthday"
                  ? "আনন্দঘন শুভ জন্মদিন"
                  : content?.cardPurpose === "invitation"
                  ? "আন্তরিক শুভ নিমন্ত্রণ"
                  : content?.cardPurpose === "corporate"
                  ? "সম্মানিত আমন্ত্রণ পত্র"
                  : "মাঙ্গলিক শুভ পরিণয় উৎসব",
                {
                  isSerif: true,
                  color: accentColor,
                  tracking: "0.2em",
                  uppercase: true,
                }
              )}
            >
              {content?.cardPurpose === "birthday"
                ? "আনন্দঘন শুভ জন্মদিন"
                : content?.cardPurpose === "invitation"
                ? "আন্তরিক শুভ নিমন্ত্রণ"
                : content?.cardPurpose === "corporate"
                ? "সম্মানিত আমন্ত্রণ পত্র"
                : "মাঙ্গলিক শুভ পরিণয় উৎসব"}
            </span>
            <span className="w-6 h-[1px]" style={{ backgroundColor: `${accentColor}70` }} />
          </div>
        )}

        <h3
          className="text-xs sm:text-sm font-semibold pt-0.5"
          style={getSafeTextStyle(content?.title || (isIslamic ? "Nikah & Walima Ceremony" : "শুভ বিবাহ উৎসব"), {
            isSerif: true,
            color: primaryColor,
            tracking: "0.2em",
            uppercase: true,
          })}
        >
          {content?.title || (isIslamic ? "Nikah & Walima Ceremony" : "শুভ বিবাহ উৎসব")}
        </h3>

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

      {/* NAMES (COUPLE OR CELEBRANT) */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-2">
        {content?.groomName ? (
          <>
            <div className="space-y-1">
              <h1
                className="text-3xl sm:text-4xl md:text-[38px] font-semibold leading-tight"
                style={getSafeTextStyle(brideName, {
                  isSerif: true,
                  color: primaryColor,
                })}
              >
                {brideName}
              </h1>
              {content?.brideParents && (
                <p
                  className="text-[11px] sm:text-[12px]"
                  style={getSafeTextStyle(content.brideParents, {
                    isSerif: false,
                    color: textMuted,
                    italic: !hasBengali(content.brideParents),
                  })}
                >
                  {content.brideParents}
                </p>
              )}
            </div>

            {/* Traditional Mandala or Knot in Center */}
            <div className="my-2 flex items-center justify-center gap-3">
              <span className="w-12 h-[1px]" style={{ backgroundColor: `${accentColor}70` }} />
              <span
                className="text-lg sm:text-xl font-medium"
                style={getSafeTextStyle(hasBengali(brideName) || isBangla ? "ও" : "Weds", {
                  isSerif: true,
                  color: accentColor,
                  italic: !hasBengali(brideName) && !isBangla,
                })}
              >
                {hasBengali(brideName) || isBangla ? "ও" : "Weds"}
              </span>
              <span className="w-12 h-[1px]" style={{ backgroundColor: `${accentColor}70` }} />
            </div>

            <div className="space-y-1">
              <h1
                className="text-3xl sm:text-4xl md:text-[38px] font-semibold leading-tight"
                style={getSafeTextStyle(groomName, {
                  isSerif: true,
                  color: primaryColor,
                })}
              >
                {groomName}
              </h1>
              {content?.groomParents && (
                <p
                  className="text-[11px] sm:text-[12px]"
                  style={getSafeTextStyle(content.groomParents, {
                    isSerif: false,
                    color: textMuted,
                    italic: !hasBengali(content.groomParents),
                  })}
                >
                  {content.groomParents}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-1.5 my-2">
            <h1
              className="text-3xl sm:text-4xl md:text-[38px] font-semibold leading-tight"
              style={getSafeTextStyle(brideName, {
                isSerif: true,
                color: primaryColor,
              })}
            >
              {brideName}
            </h1>
            {content?.eventMilestone && (
              <span
                className="block text-xs sm:text-sm font-semibold"
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
            {content?.brideParents && (
              <p
                className="text-[11px] sm:text-[12px]"
                style={getSafeTextStyle(content.brideParents, {
                  isSerif: false,
                  color: textMuted,
                  italic: !hasBengali(content.brideParents),
                })}
              >
                {content.brideParents}
              </p>
            )}
          </div>
        )}

        {/* Bilingual Bengali Names */}
        {isBilingual && content?.bilingualBrideName && (
          <div
            className="mt-2 text-sm font-semibold"
            style={getSafeTextStyle(content.bilingualBrideName, {
              isSerif: true,
              color: "#5A1827",
            })}
          >
            {content.bilingualBrideName}
            {content?.bilingualGroomName ? ` ও ${content.bilingualGroomName}` : ""}
          </div>
        )}

        <p
          className="mt-3 text-[12px] sm:text-[13px] max-w-xs leading-relaxed text-center"
          style={getSafeTextStyle(
            content?.message ||
              "আমাদের এই আনন্দঘন শুভলগ্নে আপনাদের সানন্দ উপস্থিতি ও প্রাণঢালা আশীর্বাদ একান্তভাবে কামনা করছি।",
            {
              isSerif: false,
              color: textMuted,
            }
          )}
        >
          {content?.message ||
            "আমাদের এই আনন্দঘন শুভলগ্নে আপনাদের সানন্দ উপস্থিতি ও প্রাণঢালা আশীর্বাদ একান্তভাবে কামনা করছি।"}
        </p>

        {content?.bilingualMessage && (
          <p
            className="mt-2 text-[11px] sm:text-[12px] max-w-xs leading-relaxed text-center font-medium"
            style={getSafeTextStyle(content.bilingualMessage, {
              isSerif: false,
              color: primaryColor,
            })}
          >
            {content.bilingualMessage}
          </p>
        )}
      </div>

      {/* CEREMONIAL EVENT DETAILS */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 pt-2 border-t border-[#D4AF37]/30">
        <div className="flex items-center gap-2">
          <span
            className="text-xs sm:text-sm font-semibold"
            style={getSafeTextStyle(content?.weddingDate || "Friday, 12th December 2027", {
              isSerif: false,
              color: primaryColor,
              tracking: hasBengali(content?.weddingDate) ? "0px" : "0.08em",
              uppercase: !hasBengali(content?.weddingDate),
            })}
          >
            {content?.weddingDate || "Friday, 12th December 2027"}
          </span>
          {content?.weddingTime && (
            <>
              <span className="text-xs opacity-50">•</span>
              <span
                className="text-xs sm:text-sm font-medium"
                style={getSafeTextStyle(content.weddingTime, {
                  isSerif: false,
                  color: secondaryColor,
                })}
              >
                {content.weddingTime}
              </span>
            </>
          )}
        </div>

        <div>
          <p
            className="text-sm sm:text-base font-semibold leading-snug"
            style={getSafeTextStyle(content?.venue || "Grand Ball Room, Radisson Blu", {
              isSerif: true,
              color: primaryColor,
            })}
          >
            {content?.venue || "Grand Ball Room, Radisson Blu"}
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

        {content?.rsvpDetails && (
          <p
            className="text-[10px] sm:text-[11px] pt-1"
            style={getSafeTextStyle(content.rsvpDetails, {
              isSerif: false,
              color: textMuted,
            })}
          >
            {content.rsvpDetails}
          </p>
        )}
      </div>
    </div>
  );
}
