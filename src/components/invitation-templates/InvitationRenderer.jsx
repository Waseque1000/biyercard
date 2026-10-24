"use client";

import React, { forwardRef } from "react";
import EmeraldRoyal from "./EmeraldRoyal";
import IvoryFloral from "./IvoryFloral";
import ModernMinimal from "./ModernMinimal";
import TraditionalCelebration from "./TraditionalCelebration";
import RomanticBlush from "./RomanticBlush";
import MogulHeritage from "./MogulHeritage";
import CelestialSapphire from "./CelestialSapphire";
import VintageBotanical from "./VintageBotanical";
import GoldenGlamour from "./GoldenGlamour";

const TEMPLATE_COMPONENTS = {
  "emerald-royal": EmeraldRoyal,
  "ivory-floral": IvoryFloral,
  "modern-minimal": ModernMinimal,
  "traditional-celebration": TraditionalCelebration,
  "romantic-blush": RomanticBlush,
  "mogul-heritage": MogulHeritage,
  "celestial-sapphire": CelestialSapphire,
  "vintage-botanical": VintageBotanical,
  "golden-glamour": GoldenGlamour,
};

const InvitationRenderer = forwardRef(function InvitationRenderer(
  { design, className = "", scale = 1, showShadow = true },
  ref
) {
  if (!design) return null;

  const templateKey = design.template || "emerald-royal";
  const Component = TEMPLATE_COMPONENTS[templateKey] || EmeraldRoyal;
  const isLandscape = design.orientation === "landscape";

  // Standard 5x7 inches aspect ratio (350px x 490px in base CSS points, or scalable)
  const baseWidth = isLandscape ? 490 : 350;
  const baseHeight = isLandscape ? 350 : 490;

  return (
    <div
      ref={ref}
      id="wedly-invitation-card"
      className={`relative select-none transition-transform duration-300 origin-center ${className}`}
      style={{
        width: `${baseWidth}px`,
        height: `${baseHeight}px`,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "center center",
        boxShadow: showShadow
          ? "0 24px 60px -15px rgba(23, 61, 50, 0.18), 0 0 0 1px rgba(198, 166, 107, 0.25)"
          : undefined,
      }}
    >
      <Component design={design} />
    </div>
  );
});

export default InvitationRenderer;
