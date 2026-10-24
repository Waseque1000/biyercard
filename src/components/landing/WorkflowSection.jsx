import React from "react";
import { Edit3, Palette, DownloadCloud } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      num: "I",
      step: "STEP 01",
      title: "Share Your Celebration",
      desc: "Enter your names, ceremonial venue, dates, and poignant love story details. Choose cultural traditions, whether a Tuscan vineyard dinner or an intimate Bengali Gaye Holud.",
      icon: Edit3,
      tag: "Names • Venue • Story Seed",
    },
    {
      num: "II",
      step: "STEP 02",
      title: "Direct the AI Atelier",
      desc: "Select your artistic direction, fine metallic accents, and refined palettes like Emerald & Gold or Ivory & Sage. Gemini generates custom balanced compositions in seconds.",
      icon: Palette,
      tag: "Foil accents • Paper Weight • Fonts",
    },
    {
      num: "III",
      step: "STEP 03",
      title: "Customize, Download & Share",
      desc: "Fine-tune wording and typography in our real-time interactive proof stage. Export 300 DPI print-ready vectors (standard 5x7) or send an interactive digital suite with RSVP.",
      icon: DownloadCloud,
      tag: "Vector PDF • RSVP Suite • Link",
    },
  ];

  return (
    <section className="w-full px-6 lg:px-12 py-20 lg:py-28" id="how-it-works">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.2em] block">
            Ceremonial Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32]">
            The Generative Atelier Process
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#77766F]">
            Transform intimate romantic memories and wedding logistics into tangible art pieces through three serene steps.
          </p>
        </div>

        {/* 3-Step Process Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-[#E8E2D8] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F4] border border-[#E8E2D8] flex items-center justify-center text-[#173D32] font-serif text-xl font-bold mb-6">
                    {item.num}
                  </div>
                  <span className="font-sans text-[10px] font-bold uppercase text-[#9A7C43] tracking-widest block mb-1">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-xl text-[#173D32] mb-3 font-semibold">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-[#77766F] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8E2D8] flex items-center gap-2 text-xs font-medium text-[#285C49]">
                  <IconComponent className="w-4 h-4 text-[#C6A66B]" />
                  <span>{item.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
