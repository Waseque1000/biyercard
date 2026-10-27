import React from "react";

export function CornerFlourish({ className = "", color = "#C6A66B", size = 52 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer royal corner bracket */}
      <path
        d="M3 22V6C3 4.34315 4.34315 3 6 3H22"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Primary baroque acanthus scroll */}
      <path
        d="M5 5C14 5 25 9 32 18C35 22 36 29 31 35C26 40 19 39 15 35C11 31 12 24 17 19C21 15 28 15 30 20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 5C5 14 9 25 18 32C22 35 29 36 35 31C40 26 39 19 35 15C31 11 24 12 19 17C15 21 15 28 20 30"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Secondary sweeping tendrils */}
      <path
        d="M6 14C14 14 20 10 26 4C32 4 38 6 44 4"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M14 6C14 14 10 20 4 26C4 32 6 38 4 44"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Petal & leaf flourishes */}
      <path
        d="M7 7C13 9 17 13 19 19C13 17 9 13 7 7Z"
        fill={color}
        fillOpacity="0.45"
      />
      <path
        d="M24 9C28 7 33 8 36 12C31 13 27 12 24 9Z"
        fill={color}
        fillOpacity="0.55"
      />
      <path
        d="M9 24C7 28 8 33 12 36C13 31 12 27 9 24Z"
        fill={color}
        fillOpacity="0.55"
      />
      {/* Jewel studs */}
      <circle cx="5" cy="5" r="3" fill={color} />
      <circle cx="5" cy="5" r="1.4" fill="#FFFFFF" opacity="0.5" />
      <circle cx="23" cy="23" r="2" fill={color} opacity="0.8" />
      <circle cx="38" cy="8" r="1.3" fill={color} opacity="0.65" />
      <circle cx="8" cy="38" r="1.3" fill={color} opacity="0.65" />
      <circle cx="14" cy="14" r="1.2" fill={color} opacity="0.7" />
    </svg>
  );
}

export function RoyalCrownCrest({ color = "#C6A66B", className = "" }) {
  return (
    <svg
      viewBox="0 0 180 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-36 sm:w-44 h-auto ${className}`}
    >
      {/* Left & right filigree wings */}
      <path
        d="M10 34C28 34 38 26 52 26C62 26 68 32 76 32"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M170 34C152 34 142 26 128 26C118 26 112 32 104 32"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M24 38C38 38 46 31 58 31"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M156 38C142 38 134 31 122 31"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Central crown silhouette */}
      <path
        d="M72 30L66 16L78 22L90 8L102 22L114 16L108 30H72Z"
        fill={color}
        fillOpacity="0.22"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Crown base band */}
      <rect x="72" y="31" width="36" height="4" rx="2" fill={color} />
      {/* Crown jewels */}
      <circle cx="90" cy="6" r="2.5" fill={color} />
      <circle cx="90" cy="6" r="1.2" fill="#FFFFFF" opacity="0.6" />
      <circle cx="65" cy="14" r="1.8" fill={color} />
      <circle cx="115" cy="14" r="1.8" fill={color} />
      <circle cx="78" cy="19" r="1.3" fill={color} opacity="0.8" />
      <circle cx="102" cy="19" r="1.3" fill={color} opacity="0.8" />
      {/* Center diamond drop */}
      <path d="M90 37L93 41L90 45L87 41L90 37Z" fill={color} opacity="0.85" />
      {/* Side pearls */}
      <circle cx="44" cy="29" r="1.5" fill={color} opacity="0.7" />
      <circle cx="136" cy="29" r="1.5" fill={color} opacity="0.7" />
      <circle cx="18" cy="34" r="1.2" fill={color} opacity="0.5" />
      <circle cx="162" cy="34" r="1.2" fill={color} opacity="0.5" />
    </svg>
  );
}

export function WaxSeal({ monogram = "W", color = "#C6A66B", size = 50, className = "" }) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(from 25deg, #F7E5B8, ${color}, #856224, ${color}, #F7E5B8, ${color}, #7C5A1E, #F7E5B8)`,
        boxShadow: `0 8px 22px rgba(0, 0, 0, 0.32), 0 2px 6px rgba(0,0,0,0.22), inset 0 2px 4px rgba(255, 255, 255, 0.65), inset 0 -2px 5px rgba(0,0,0,0.28)`,
      }}
    >
      {/* Serrated / fluted outer coin edge */}
      <div
        className="absolute inset-[1.5px] rounded-full pointer-events-none"
        style={{
          background: `repeating-conic-gradient(from 0deg, transparent 0deg 6deg, rgba(255,255,255,0.18) 6deg 9deg)`,
          border: "1px dashed rgba(255,255,255,0.35)",
        }}
      />
      {/* Inner embossed sanctuary */}
      <div
        className="w-[76%] h-[76%] rounded-full flex items-center justify-center relative"
        style={{
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.32), rgba(0,0,0,0.12) 70%)`,
          border: `1.5px solid rgba(255,255,255,0.45)`,
          boxShadow: "inset 0 3px 6px rgba(0,0,0,0.38), inset 0 -1px 3px rgba(255,255,255,0.3)",
        }}
      >
        <span
          className="font-serif italic text-white font-bold leading-none tracking-tighter"
          style={{
            fontSize: size * 0.31,
            textShadow: "0 1px 3px rgba(0,0,0,0.55), 0 0 8px rgba(255,255,255,0.25)",
          }}
        >
          {monogram}
        </span>
      </div>
    </div>
  );
}

export function BotanicalBranch({ color = "#285C49", accent = "#C6A66B", className = "" }) {
  return (
    <svg
      width="200"
      height="46"
      viewBox="0 0 200 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sweeping organic branches */}
      <path
        d="M12 28C42 22 68 23 100 23C132 23 158 22 188 28"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M32 25C50 16 74 18 100 23C126 18 150 16 168 25"
        stroke={accent}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Left eucalyptus & olive foliage */}
      <path d="M26 26C28 16 39 14 44 22C37 24 32 27 26 26Z" fill={color} fillOpacity="0.75" />
      <path d="M32 26C30 34 40 37 45 29C39 27 35 24 32 26Z" fill={color} fillOpacity="0.55" />
      <path d="M52 23C55 12 66 11 71 20C63 22 58 25 52 23Z" fill={color} fillOpacity="0.85" />
      <path d="M58 24C56 33 66 35 71 26C65 25 60 22 58 24Z" fill={color} fillOpacity="0.65" />
      <path d="M76 22C79 12 88 12 92 20C85 21 81 23 76 22Z" fill={color} fillOpacity="0.9" />
      {/* Right mirrored foliage */}
      <path d="M174 26C172 16 161 14 156 22C163 24 168 27 174 26Z" fill={color} fillOpacity="0.75" />
      <path d="M168 26C170 34 160 37 155 29C161 27 165 24 168 26Z" fill={color} fillOpacity="0.55" />
      <path d="M148 23C145 12 134 11 129 20C137 22 142 25 148 23Z" fill={color} fillOpacity="0.85" />
      <path d="M142 24C144 33 134 35 129 26C135 25 140 22 142 24Z" fill={color} fillOpacity="0.65" />
      <path d="M124 22C121 12 112 12 108 20C115 21 119 23 124 22Z" fill={color} fillOpacity="0.9" />
      {/* Central blooming rose / camellia */}
      <circle cx="100" cy="22" r="8" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.2" />
      <circle cx="100" cy="22" r="5" fill={accent} fillOpacity="0.5" />
      <circle cx="100" cy="22" r="2.2" fill="#FFFFFF" opacity="0.85" />
      {/* Golden berry buds */}
      <circle cx="48" cy="15" r="2" fill={accent} opacity="0.85" />
      <circle cx="152" cy="15" r="2" fill={accent} opacity="0.85" />
      <circle cx="72" cy="31" r="1.6" fill={accent} opacity="0.75" />
      <circle cx="128" cy="31" r="1.6" fill={accent} opacity="0.75" />
      <circle cx="20" cy="23" r="1.4" fill={accent} opacity="0.6" />
      <circle cx="180" cy="23" r="1.4" fill={accent} opacity="0.6" />
    </svg>
  );
}

export function TraditionalMandala({ color = "#C6A66B", size = 60, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer beaded alpona circle */}
      <circle cx="44" cy="44" r="41" stroke={color} strokeWidth="0.8" strokeDasharray="1.5 3" />
      <circle cx="44" cy="44" r="37" stroke={color} strokeWidth="1.2" />
      <circle cx="44" cy="44" r="29" stroke={color} strokeWidth="0.9" strokeOpacity="0.7" />
      <circle cx="44" cy="44" r="20" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.08" />
      {/* 12 Ornate Lotus Petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 44 44)`}>
          <path
            d="M44 7C48 18 48 26 44 30C40 26 40 18 44 7Z"
            fill={color}
            fillOpacity="0.4"
            stroke={color}
            strokeWidth="0.7"
          />
          <path
            d="M44 15C46 21 46 26 44 28C42 26 42 21 44 15Z"
            fill={color}
            fillOpacity="0.65"
          />
          <circle cx="44" cy="5" r="1.1" fill={color} />
        </g>
      ))}
      {/* Inner 8-petal sanctuary */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={`in-${angle}`} transform={`rotate(${angle} 44 44)`}>
          <path
            d="M44 25C46.5 31 46.5 36 44 39C41.5 36 41.5 31 44 25Z"
            fill={color}
            fillOpacity="0.75"
          />
        </g>
      ))}
      {/* Center bindu */}
      <circle cx="44" cy="44" r="6" fill={color} />
      <circle cx="44" cy="44" r="2.5" fill="#FFFFFF" opacity="0.65" />
    </svg>
  );
}

export function KolkaCornerMotif({ color = "#D4AF37", size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bengali Paisley / Kolka droplet in corner */}
      <path
        d="M6 6C22 6 36 14 40 28C43 38 37 46 28 46C19 46 14 39 17 31C19 25 26 24 30 28"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill={color}
        fillOpacity="0.12"
      />
      <path
        d="M10 10C22 11 32 17 35 28C37 35 33 41 27 41C21 41 18 36 20 31"
        stroke={color}
        strokeWidth="0.9"
        strokeDasharray="2 2"
      />
      {/* Outer alpona scallops */}
      <path d="M4 22C4 12 12 4 22 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="8" r="2.5" fill={color} />
      <circle cx="26" cy="33" r="2.2" fill={color} opacity="0.85" />
      <circle cx="45" cy="18" r="1.5" fill={color} opacity="0.7" />
      <circle cx="18" cy="45" r="1.5" fill={color} opacity="0.7" />
      <circle cx="45" cy="28" r="1.3" fill={color} opacity="0.6" />
      <circle cx="28" cy="45" r="1.3" fill={color} opacity="0.6" />
      <circle cx="42" cy="40" r="1.5" fill={color} opacity="0.75" />
    </svg>
  );
}

export function IslamicArchBorder({ color = "#C6A66B", className = "" }) {
  return (
    <svg
      viewBox="0 0 400 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 66 C95 66 145 18 200 7 C255 18 305 66 400 66"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M0 71 C100 71 148 24 200 13 C252 24 300 71 400 71"
        stroke={color}
        strokeWidth="0.9"
        strokeDasharray="3 3"
      />
      <path
        d="M24 64 C105 64 152 25 200 17 C248 25 295 64 376 64"
        stroke={color}
        strokeWidth="0.6"
        opacity="0.65"
      />
      {/* Hanging central lantern from arch apex */}
      <line x1="200" y1="13" x2="200" y2="28" stroke={color} strokeWidth="1" />
      <path d="M195 28L200 23L205 28L203 38H197L195 28Z" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="1" />
      <circle cx="200" cy="6" r="3.5" fill={color} />
      <circle cx="115" cy="44" r="2" fill={color} opacity="0.6" />
      <circle cx="285" cy="44" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

export function MughalArchMotif({ color = "#D4AF37", className = "" }) {
  return (
    <svg
      viewBox="0 0 280 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-52 sm:w-60 h-auto ${className}`}
    >
      {/* Multi-foil Shahi Darbar cusped arch */}
      <path
        d="M8 74 C24 74 32 60 46 56 C56 53 64 38 78 32 C90 27 98 15 114 12 C124 10 132 4 140 2 C148 4 156 10 166 12 C182 15 190 27 202 32 C216 38 224 53 234 56 C248 60 256 74 272 74"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Shaded inner arch spandrel */}
      <path
        d="M16 78 C30 78 38 65 52 61 C62 58 70 44 84 38 C96 33 104 22 118 18 C128 16 134 10 140 8 C146 10 152 16 162 18 C176 22 184 33 196 38 C210 44 218 58 228 61 C242 65 250 78 264 78"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2.5 2.5"
      />
      {/* Hanging Shahi Jhumka / Lanterns on left & right cusps */}
      <line x1="78" y1="32" x2="78" y2="50" stroke={color} strokeWidth="0.9" />
      <path d="M74 50L78 46L82 50L80 57H76L74 50Z" fill={color} fillOpacity="0.6" />
      <circle cx="78" cy="60" r="1.4" fill={color} />

      <line x1="202" y1="32" x2="202" y2="50" stroke={color} strokeWidth="0.9" />
      <path d="M198 50L202 46L206 50L204 57H200L198 50Z" fill={color} fillOpacity="0.6" />
      <circle cx="202" cy="60" r="1.4" fill={color} />

      {/* Center Kalash / Royal Finial */}
      <circle cx="140" cy="18" r="4.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <circle cx="140" cy="18" r="2" fill={color} />
      <path d="M140 22V30" stroke={color} strokeWidth="1" />
      <path d="M137 28L140 33L143 28" fill={color} />

      {/* Spandrel lotus rosettes */}
      <circle cx="42" cy="30" r="5" stroke={color} strokeWidth="0.9" fill={color} fillOpacity="0.15" />
      <circle cx="42" cy="30" r="2" fill={color} />
      <circle cx="238" cy="30" r="5" stroke={color} strokeWidth="0.9" fill={color} fillOpacity="0.15" />
      <circle cx="238" cy="30" r="2" fill={color} />
    </svg>
  );
}

export function StarlightCluster({ color = "#C6A66B", className = "" }) {
  return (
    <svg
      viewBox="0 0 180 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-40 sm:w-48 h-auto ${className}`}
    >
      {/* Hanging star threads */}
      <line x1="45" y1="0" x2="45" y2="20" stroke={color} strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.7" />
      <line x1="90" y1="0" x2="90" y2="12" stroke={color} strokeWidth="0.8" opacity="0.8" />
      <line x1="135" y1="0" x2="135" y2="20" stroke={color} strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.7" />

      {/* Golden Crescent Moon cradling central star */}
      <path
        d="M98 16C91 18 87 25 89 33C91 40 98 44 105 42C98 47 88 45 83 38C78 31 80 20 88 15C91 13 95 14 98 16Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* Central 4-point Polaris Star */}
      <path
        d="M98 14 C98 22 92 26 84 26 C92 26 98 30 98 38 C98 30 104 26 112 26 C104 26 98 22 98 14 Z"
        fill={color}
      />
      <circle cx="98" cy="26" r="2.2" fill="#FFFFFF" opacity="0.9" />

      {/* Left & Right Hanging Stars */}
      <path
        d="M45 18 C45 24 40 27 34 27 C40 27 45 30 45 36 C45 30 50 27 56 27 C50 27 45 24 45 18 Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="45" cy="27" r="1.3" fill="#FFFFFF" opacity="0.7" />

      <path
        d="M135 18 C135 24 130 27 124 27 C130 27 135 30 135 36 C135 30 140 27 146 27 C140 27 135 24 135 18 Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="135" cy="27" r="1.3" fill="#FFFFFF" opacity="0.7" />

      {/* Constellation lines & stardust */}
      <path d="M16 32 L34 27 M146 27 L164 32" stroke={color} strokeWidth="0.6" opacity="0.45" />
      <circle cx="16" cy="32" r="1.5" fill={color} opacity="0.75" />
      <circle cx="164" cy="32" r="1.5" fill={color} opacity="0.75" />
      <circle cx="66" cy="18" r="1.1" fill={color} opacity="0.6" />
      <circle cx="116" cy="18" r="1.1" fill={color} opacity="0.6" />
      <circle cx="68" cy="38" r="1" fill={color} opacity="0.5" />
      <circle cx="118" cy="38" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

export function OliveWreathMedallion({ color = "#7A8471", accent = "#BA9B58", className = "" }) {
  return (
    <svg
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-44 sm:w-52 h-auto ${className}`}
    >
      {/* Left laurel branch */}
      <path
        d="M84 26 C64 24 42 26 14 33"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M72 24 C69 14 58 15 55 23 C61 25 67 27 72 24Z" fill={color} opacity="0.88" />
      <path d="M56 25 C54 34 42 34 40 25 C45 24 52 23 56 25Z" fill={color} opacity="0.78" />
      <path d="M40 27 C37 18 26 19 24 27 C29 28 36 29 40 27Z" fill={color} opacity="0.85" />
      <path d="M26 30 C24 37 15 37 13 30 C17 29 22 28 26 30Z" fill={color} opacity="0.65" />

      {/* Right laurel branch */}
      <path
        d="M116 26 C136 24 158 26 186 33"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M128 24 C131 14 142 15 145 23 C139 25 133 27 128 24Z" fill={color} opacity="0.88" />
      <path d="M144 25 C146 34 158 34 160 25 C155 24 148 23 144 25Z" fill={color} opacity="0.78" />
      <path d="M160 27 C163 18 174 19 176 27 C171 28 164 29 160 27Z" fill={color} opacity="0.85" />
      <path d="M174 30 C176 37 185 37 187 30 C183 29 178 28 174 30Z" fill={color} opacity="0.65" />

      {/* Golden olive drupes */}
      <circle cx="48" cy="20" r="2.2" fill={accent} opacity="0.85" />
      <circle cx="152" cy="20" r="2.2" fill={accent} opacity="0.85" />
      <circle cx="32" cy="24" r="1.8" fill={accent} opacity="0.7" />
      <circle cx="168" cy="24" r="1.8" fill={accent} opacity="0.7" />

      {/* Central antique cameo medallion */}
      <circle cx="100" cy="25" r="11" stroke={accent} strokeWidth="1.4" fill={accent} fillOpacity="0.12" />
      <circle cx="100" cy="25" r="8" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M100 18L103 25L100 32L97 25L100 18Z" fill={accent} opacity="0.85" />
      <circle cx="100" cy="25" r="2" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

export function ArtDecoFan({ color = "#C6A66B", size = 56, className = "" }) {
  return (
    <svg
      width={size * 2.2}
      height={size}
      viewBox="0 0 140 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sunburst geometric rays */}
      <path d="M70 52 L70 6" stroke={color} strokeWidth="1.5" />
      <path d="M70 52 L48 10" stroke={color} strokeWidth="1.1" />
      <path d="M70 52 L92 10" stroke={color} strokeWidth="1.1" />
      <path d="M70 52 L28 18" stroke={color} strokeWidth="1" />
      <path d="M70 52 L112 18" stroke={color} strokeWidth="1" />
      <path d="M70 52 L12 30" stroke={color} strokeWidth="0.9" />
      <path d="M70 52 L128 30" stroke={color} strokeWidth="0.9" />
      <path d="M70 52 L58 14" stroke={color} strokeWidth="0.6" opacity="0.7" />
      <path d="M70 52 L82 14" stroke={color} strokeWidth="0.6" opacity="0.7" />
      <path d="M70 52 L38 20" stroke={color} strokeWidth="0.6" opacity="0.7" />
      <path d="M70 52 L102 20" stroke={color} strokeWidth="0.6" opacity="0.7" />

      {/* Stepped Art Deco arches */}
      <path d="M22 36 C40 16 100 16 118 36" stroke={color} strokeWidth="1.4" />
      <path d="M34 42 C48 26 92 26 106 42" stroke={color} strokeWidth="1" />
      <path d="M46 47 C56 36 84 36 94 47" stroke={color} strokeWidth="0.8" fill={color} fillOpacity="0.18" />

      {/* Central Gatsby diamond */}
      <path d="M70 2L74 8L70 14L66 8L70 2Z" fill={color} />
      <circle cx="70" cy="52" r="3.5" fill={color} />
      <line x1="6" y1="52" x2="134" y2="52" stroke={color} strokeWidth="1.2" />
      <path d="M6 52L12 48V56L6 52Z" fill={color} />
      <path d="M134 52L128 48V56L134 52Z" fill={color} />
    </svg>
  );
}

export function OrnamentalDivider({ color = "#C6A66B", className = "" }) {
  return (
    <svg
      viewBox="0 0 220 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-40 sm:w-48 h-auto ${className}`}
    >
      <line x1="4" y1="10" x2="88" y2="10" stroke={color} strokeWidth="0.9" strokeOpacity="0.65" />
      <line x1="132" y1="10" x2="216" y2="10" stroke={color} strokeWidth="0.9" strokeOpacity="0.65" />
      <path d="M96 10L102 5L108 10L102 15L96 10Z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="0.9" />
      <path d="M112 10L118 5L124 10L118 15L112 10Z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="0.9" />
      <path d="M105 10L110 3L115 10L110 17L105 10Z" fill={color} />
      <circle cx="88" cy="10" r="1.5" fill={color} />
      <circle cx="132" cy="10" r="1.5" fill={color} />
    </svg>
  );
}
