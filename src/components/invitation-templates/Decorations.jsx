import React from "react";

export function CornerFlourish({ className = "", color = "#C6A66B", size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Primary ornate scroll */}
      <path
        d="M4 4C12 4 22 8 28 16C30 20 32 26 28 32C24 38 18 38 14 34C10 30 10 24 14 18C18 12 24 10 30 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Mirror scroll */}
      <path
        d="M4 4C4 12 8 22 16 28C20 30 26 32 32 28C38 24 38 18 34 14C30 10 24 10 18 14C12 18 10 24 14 30"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Inner filigree details */}
      <path
        d="M6 6C10 6 16 10 18 14"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M6 6C6 10 10 16 14 18"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Accent beads */}
      <circle cx="4" cy="4" r="2.5" fill={color} />
      <circle cx="4" cy="4" r="1.5" fill="white" opacity="0.3" />
      {/* Tiny leaf accents */}
      <ellipse cx="20" cy="10" rx="2.5" ry="1" transform="rotate(-30 20 10)" fill={color} opacity="0.4" />
      <ellipse cx="10" cy="20" rx="2.5" ry="1" transform="rotate(60 10 20)" fill={color} opacity="0.4" />
      {/* Dotted trail */}
      <circle cx="12" cy="8" r="0.8" fill={color} opacity="0.5" />
      <circle cx="8" cy="12" r="0.8" fill={color} opacity="0.5" />
      <circle cx="16" cy="12" r="0.6" fill={color} opacity="0.35" />
      <circle cx="12" cy="16" r="0.6" fill={color} opacity="0.35" />
    </svg>
  );
}

export function WaxSeal({ monogram = "W", color = "#C6A66B", size = 52, className = "" }) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(from 0deg, #F0D9A8, ${color}, #8A682B, ${color}, #F0D9A8)`,
        boxShadow: `0 6px 20px rgba(138, 104, 43, 0.45), 0 2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0,0,0,0.15)`,
      }}
    >
      {/* Serrated / notched outer ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `repeating-conic-gradient(from 0deg, transparent 0deg 8deg, rgba(255,255,255,0.1) 8deg 10deg)`,
        }}
      />
      {/* Inner embossed circle */}
      <div
        className="w-[78%] h-[78%] rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.25), transparent 60%)`,
          border: `1.5px solid rgba(255,255,255,0.3)`,
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.35), inset 0 -1px 3px rgba(255,255,255,0.2)",
        }}
      >
        <span
          className="font-serif italic text-white font-bold leading-none"
          style={{
            fontSize: size * 0.32,
            textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.15)",
          }}
        >
          {monogram}
        </span>
      </div>
    </div>
  );
}

export function BotanicalBranch({ color = "#285C49", className = "" }) {
  return (
    <svg
      width="160"
      height="36"
      viewBox="0 0 160 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main vine stem */}
      <path
        d="M8 18C30 17 50 18 80 18C110 18 130 17 152 18"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Left leaves - pair 1 */}
      <path d="M25 18C27 11 36 10 40 16C34 17 30 20 25 18Z" fill={color} fillOpacity="0.8" />
      <path d="M28 18C26 24 34 26 38 20C33 19 30 16 28 18Z" fill={color} fillOpacity="0.65" />
      {/* Left leaves - pair 2 */}
      <path d="M48 18C50 12 58 11 62 17C56 18 52 20 48 18Z" fill={color} fillOpacity="0.75" />
      <path d="M52 18C50 24 58 25 62 19C57 18 53 16 52 18Z" fill={color} fillOpacity="0.6" />
      {/* Center feature leaf */}
      <path d="M72 18C74 9 84 9 86 17C82 18 76 20 72 18Z" fill={color} fillOpacity="0.9" />
      <path d="M74 18C76 26 84 26 86 19C82 18 78 16 74 18Z" fill={color} fillOpacity="0.7" />
      {/* Right leaves - pair 1 */}
      <path d="M98 18C100 12 108 11 112 17C106 18 102 20 98 18Z" fill={color} fillOpacity="0.75" />
      <path d="M102 18C100 24 108 25 112 19C107 18 103 16 102 18Z" fill={color} fillOpacity="0.6" />
      {/* Right leaves - pair 2 */}
      <path d="M120 18C122 11 130 10 134 16C128 17 124 20 120 18Z" fill={color} fillOpacity="0.8" />
      <path d="M124 18C122 24 130 26 134 20C129 19 126 16 124 18Z" fill={color} fillOpacity="0.65" />
      {/* Berry accents */}
      <circle cx="80" cy="18" r="3" fill="#C6A66B" opacity="0.85" />
      <circle cx="80" cy="18" r="1.5" fill="white" opacity="0.25" />
      <circle cx="44" cy="14" r="1.5" fill={color} opacity="0.5" />
      <circle cx="116" cy="14" r="1.5" fill={color} opacity="0.5" />
      {/* Tiny veins */}
      <path d="M30 15L35 17" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <path d="M55 14L59 17" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <path d="M105 14L109 17" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <path d="M125 15L130 17" stroke={color} strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

export function TraditionalMandala({ color = "#C6A66B", size = 64, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring with dash pattern */}
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="0.5" strokeDasharray="1 2.5" />
      <circle cx="40" cy="40" r="35" stroke={color} strokeWidth="0.75" />
      {/* Mid ring */}
      <circle cx="40" cy="40" r="28" stroke={color} strokeWidth="1" />
      <circle cx="40" cy="40" r="25" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
      {/* Inner ring */}
      <circle cx="40" cy="40" r="18" stroke={color} strokeWidth="0.75" />
      {/* Core */}
      <circle cx="40" cy="40" r="5" fill={color} />
      <circle cx="40" cy="40" r="3" fill="white" opacity="0.15" />
      {/* 12 Petals (lotus pattern) */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 40 40)`}>
          <path
            d="M40 8 C43 20 43 26 40 28 C37 26 37 20 40 8 Z"
            fill={color}
            fillOpacity="0.45"
          />
          <path
            d="M40 16 C41 22 41 25 40 27 C39 25 39 22 40 16 Z"
            fill={color}
            fillOpacity="0.25"
          />
        </g>
      ))}
      {/* 8 diamond accents between petals */}
      {[15, 75, 135, 195, 255, 315].map((angle) => (
        <circle
          key={`d-${angle}`}
          cx="40"
          cy="12"
          r="1"
          fill={color}
          opacity="0.6"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
    </svg>
  );
}

export function IslamicArchBorder({ color = "#C6A66B", className = "" }) {
  return (
    <svg
      viewBox="0 0 400 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full ${className}`}
      preserveAspectRatio="none"
    >
      {/* Main arch */}
      <path
        d="M0 60 C100 60 145 15 200 6 C255 15 300 60 400 60"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Shadow arch */}
      <path
        d="M0 64 C105 64 148 20 200 11 C252 20 295 64 400 64"
        stroke={color}
        strokeWidth="0.6"
        strokeDasharray="3 3"
      />
      {/* Inner arch */}
      <path
        d="M30 58 C110 58 152 22 200 14 C248 22 290 58 370 58"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.5"
      />
      {/* Finial */}
      <circle cx="200" cy="5" r="3.5" fill={color} />
      <circle cx="200" cy="5" r="2" fill="white" opacity="0.2" />
      <path d="M200 1.5 V0" stroke={color} strokeWidth="1.5" />
      {/* Side accents */}
      <circle cx="120" cy="42" r="1.5" fill={color} opacity="0.5" />
      <circle cx="280" cy="42" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

export function MughalArchMotif({ color = "#D4AF37", className = "" }) {
  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-44 sm:w-52 h-auto ${className}`}
    >
      {/* Main cusped multi-foil arch with more detail */}
      <path
        d="M10 65 C25 65 35 52 48 48 C58 44 68 30 80 22 C90 15 105 8 120 4 C135 8 150 15 160 22 C172 30 182 44 192 48 C205 52 215 65 230 65"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Inner cusped echo */}
      <path
        d="M20 70 C32 70 42 58 55 54 C65 50 75 38 87 30 C97 23 108 14 120 10 C132 14 143 23 153 30 C165 38 175 50 185 54 C198 58 208 70 220 70"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 2.5"
      />
      {/* Delicate outer echo */}
      <path
        d="M5 68 C20 68 32 56 44 50 C55 45 65 32 78 24 C88 17 102 10 120 6 C138 10 152 17 162 24 C175 32 185 45 196 50 C208 56 220 68 235 68"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.4"
      />
      {/* Finial / Kalash with crescent */}
      <circle cx="120" cy="4" r="3" fill={color} />
      <circle cx="120" cy="4" r="1.5" fill="white" opacity="0.2" />
      <path d="M120 1 V-2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      {/* Drop ornaments along the cusps */}
      <circle cx="48" cy="52" r="2" fill={color} opacity="0.7" />
      <circle cx="192" cy="52" r="2" fill={color} opacity="0.7" />
      <circle cx="80" cy="26" r="1.5" fill={color} opacity="0.5" />
      <circle cx="160" cy="26" r="1.5" fill={color} opacity="0.5" />
      {/* Jaali lattice pattern in the arch */}
      <path d="M100 20 L110 30 L120 20 L130 30 L140 20" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M105 24 L115 14 L125 24 L135 14" stroke={color} strokeWidth="0.4" opacity="0.2" />
    </svg>
  );
}

export function StarlightCluster({ color = "#C6A66B", className = "" }) {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-32 sm:w-36 h-auto ${className}`}
    >
      {/* Central 4-point starburst (larger, more dramatic) */}
      <path
        d="M70 2 C70 14 58 20 46 20 C58 20 70 26 70 38 C70 26 82 20 94 20 C82 20 70 14 70 2 Z"
        fill={color}
      />
      {/* Bright white center glow */}
      <circle cx="70" cy="20" r="2.5" fill="#FFFFFF" opacity="0.8" />
      <circle cx="70" cy="20" r="5" fill="#FFFFFF" opacity="0.1" />
      {/* Left secondary star */}
      <path
        d="M28 12 C28 17 23 20 18 20 C23 20 28 23 28 28 C28 23 33 20 38 20 C33 20 28 17 28 12 Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="28" cy="20" r="1" fill="#FFFFFF" opacity="0.5" />
      {/* Right secondary star */}
      <path
        d="M112 12 C112 17 107 20 102 20 C107 20 112 23 112 28 C112 23 117 20 122 20 C117 20 112 17 112 12 Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="112" cy="20" r="1" fill="#FFFFFF" opacity="0.5" />
      {/* Tiny stardust constellation */}
      <circle cx="8" cy="20" r="1.2" fill={color} opacity="0.7" />
      <circle cx="15" cy="12" r="0.8" fill={color} opacity="0.45" />
      <circle cx="50" cy="10" r="0.9" fill={color} opacity="0.5" />
      <circle cx="55" cy="30" r="0.7" fill={color} opacity="0.4" />
      <circle cx="85" cy="10" r="0.7" fill={color} opacity="0.4" />
      <circle cx="90" cy="30" r="0.9" fill={color} opacity="0.5" />
      <circle cx="125" cy="12" r="0.8" fill={color} opacity="0.45" />
      <circle cx="132" cy="20" r="1.2" fill={color} opacity="0.7" />
      {/* Radial glow lines from center */}
      <path d="M70 10 L70 6" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M70 34 L70 30" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M58 20 L54 20" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <path d="M86 20 L82 20" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function OliveWreathMedallion({ color = "#7A8471", className = "" }) {
  return (
    <svg
      viewBox="0 0 180 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-40 sm:w-48 h-auto ${className}`}
    >
      {/* Left branch stem */}
      <path
        d="M78 22 C60 20 40 22 15 28"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Left leaves */}
      <path d="M65 20 C62 12 52 13 50 20 C55 21 61 23 65 20Z" fill={color} opacity="0.85" />
      <path d="M50 21 C48 28 38 28 36 21 C40 20 47 19 50 21Z" fill={color} opacity="0.8" />
      <path d="M35 23 C33 16 24 17 22 23 C26 24 32 25 35 23Z" fill={color} opacity="0.85" />
      <path d="M57 21 C55 26 48 26 46 22 C49 21 54 20 57 21Z" fill={color} opacity="0.55" />

      {/* Right branch stem */}
      <path
        d="M102 22 C120 20 140 22 165 28"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Right leaves */}
      <path d="M115 20 C118 12 128 13 130 20 C125 21 119 23 115 20Z" fill={color} opacity="0.85" />
      <path d="M130 21 C132 28 142 28 144 21 C140 20 133 19 130 21Z" fill={color} opacity="0.8" />
      <path d="M145 23 C147 16 156 17 158 23 C154 24 148 25 145 23Z" fill={color} opacity="0.85" />
      <path d="M123 21 C125 26 132 26 134 22 C131 21 126 20 123 21Z" fill={color} opacity="0.55" />

      {/* Olive berries */}
      <circle cx="42" cy="18" r="2" fill={color} opacity="0.6" />
      <circle cx="138" cy="18" r="2" fill={color} opacity="0.6" />
      <circle cx="27" cy="22" r="1.5" fill={color} opacity="0.4" />
      <circle cx="153" cy="22" r="1.5" fill={color} opacity="0.4" />

      {/* Center ornamental seal */}
      <circle cx="90" cy="22" r="7" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="90" cy="22" r="4.5" stroke={color} strokeWidth="0.6" fill="none" />
      <circle cx="90" cy="22" r="2" fill={color} />
    </svg>
  );
}

export function ArtDecoFan({ color = "#C6A66B", size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Radial fan rays */}
      <path d="M30 8 L30 52" stroke={color} strokeWidth="1" />
      <path d="M30 8 L10 48" stroke={color} strokeWidth="0.8" />
      <path d="M30 8 L50 48" stroke={color} strokeWidth="0.8" />
      <path d="M30 8 L16 52" stroke={color} strokeWidth="0.5" />
      <path d="M30 8 L44 52" stroke={color} strokeWidth="0.5" />
      <path d="M30 8 L4 44" stroke={color} strokeWidth="0.6" />
      <path d="M30 8 L56 44" stroke={color} strokeWidth="0.6" />
      {/* Fan arc tiers */}
      <path d="M8 42 C18 50 42 50 52 42" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 36 C20 42 40 42 48 36" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M16 30 C22 34 38 34 44 30" stroke={color} strokeWidth="0.5" strokeLinecap="round" />
      {/* Top finial gem */}
      <circle cx="30" cy="8" r="3.5" fill={color} />
      <circle cx="30" cy="8" r="2" fill="white" opacity="0.2" />
      {/* Bottom accent beads */}
      <circle cx="12" cy="44" r="1.2" fill={color} opacity="0.6" />
      <circle cx="48" cy="44" r="1.2" fill={color} opacity="0.6" />
      <circle cx="30" cy="50" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}
