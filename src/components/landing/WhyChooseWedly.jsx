import React from "react";
import { Sparkles, Printer, Globe, Sliders, ShieldCheck, Heart } from "lucide-react";

export default function WhyChooseWedly() {
  const perks = [
    {
      icon: Sparkles,
      title: "Gemini Structured Intelligence",
      desc: "Rather than messy arbitrary HTML, our engine returns a clean, validated JSON specification rendered with flawless typography.",
    },
    {
      icon: Printer,
      title: "300 DPI Print-Ready Export",
      desc: "Download in standard 5×7 inch dimensions with vectors crisp enough for commercial letterpress and foil stamping.",
    },
    {
      icon: Globe,
      title: "Bilingual & Cultural Nuance",
      desc: "Deep native support for Bangla typography alongside English, honoring traditional Bengali and Islamic wedding heritage.",
    },
    {
      icon: Sliders,
      title: "Live Interactive Studio",
      desc: "Instant live editing of names, dates, paletted hues, borders, and wax seals without regenerating from scratch.",
    },
    {
      icon: ShieldCheck,
      title: "Protected Cloud Persistence",
      desc: "Secure Firebase Authentication paired with Supabase PostgreSQL ensuring your celebration proofs remain private.",
    },
    {
      icon: Heart,
      title: "Personalized RSVP Sharing",
      desc: "Generate private or published web links with interactive details, Google Maps venue links, and celebration countdowns.",
    },
  ];

  return (
    <section className="w-full px-6 lg:px-12 py-20 lg:py-28 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.2em] block">
            The Wedly Distinction
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32]">
            Why Discerning Couples Choose Wedly AI
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#77766F]">
            Stationery atelier craftsmanship engineered with the speed and precision of modern artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perks.map((perk, index) => {
            const IconComp = perk.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center text-[#173D32]">
                  <IconComp className="w-5 h-5 text-[#C6A66B]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#173D32]">
                  {perk.title}
                </h3>
                <p className="font-sans text-sm text-[#77766F] leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
