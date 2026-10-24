import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StylesGallery() {
  const styles = [
    {
      title: "Luxury Grandeur",
      tag: "Regency Atelier",
      desc: "Lavish gold foil stamping, deep emerald jewel tones, and opulent monograms.",
      styleKey: "luxury",
      bgGradient: "from-[#173D32] to-[#0A1D17]",
      accent: "#C6A66B",
    },
    {
      title: "Minimalist Modern",
      tag: "Architectural",
      desc: "Crisp spacing, editorial letterforms, and sublime unprinted negative space.",
      styleKey: "minimalist",
      bgGradient: "from-[#252923] to-[#121411]",
      accent: "#D8D2C6",
    },
    {
      title: "Romantic Floral",
      tag: "Botanica",
      desc: "Gentle watercolor foliage, wild olive leaves, and organic soft paper textures.",
      styleKey: "floral",
      bgGradient: "from-[#2C402E] to-[#162318]",
      accent: "#B8A375",
    },
    {
      title: "Royal Islamic",
      tag: "Heritage",
      desc: "Sacred geometry, Nikah blessings, and ornate arabesque gilding.",
      styleKey: "islamic",
      bgGradient: "from-[#1A382B] to-[#0D1D16]",
      accent: "#D4AF37",
    },
    {
      title: "South Asian Fusion",
      tag: "Desi Splendor",
      desc: "Intricate paisley, Gaye Holud & Sangeet celebrations, and Bangla script.",
      styleKey: "traditional",
      bgGradient: "from-[#5A1827] to-[#2E0B13]",
      accent: "#F0D9A8",
    },
  ];

  return (
    <section className="w-full bg-[#FAF8F4] px-6 lg:px-12 py-20" id="popular-styles">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.2em] block mb-2">
              Aesthetic Languages
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32]">
              Explore Distinctive Wedding Styles
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#77766F] max-w-md">
            Every love story possesses its own visual cadence. Choose a foundational style engineered for flawless print and digital reception.
          </p>
        </div>

        {/* Styles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {styles.map((style, index) => (
            <Link
              key={index}
              href={`/create?style=${style.styleKey}`}
              className="group relative rounded-lg overflow-hidden h-80 shadow-md p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(160deg, ${style.bgGradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
              }}
            >
              {/* Gold Hairline Top */}
              <div className="flex items-center justify-between">
                <span
                  className="font-sans text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: style.accent }}
                >
                  {style.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#173D32] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-white font-medium">
                  {style.title}
                </h3>
                <p className="font-sans text-xs text-white/80 leading-relaxed line-clamp-2">
                  {style.desc}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#C6A66B] group-hover:underline">
                    Craft in this style →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
