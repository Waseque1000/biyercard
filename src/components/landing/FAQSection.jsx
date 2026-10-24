"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does Gemini AI generate my invitation design?",
      a: "Wedly connects securely to Google's Gemini API with your questionnaire answers. Rather than returning raw unformatted web pages or low-res images, Gemini synthesizes a strictly validated design specification (JSON) including typography rules, curated hex palettes, ornamental borders, and tailored phrasing. Our trusted React studio renders it instantly into print-ready stationery.",
    },
    {
      q: "Can I print the invitations with my local print shop?",
      a: "Absolutely. You can export a crisp 300 DPI vector PDF calibrated to the international wedding stationery standard 5×7 inch dimensions. All fonts and ornamental lines are scaled flawlessly for cotton rag, deckle-edge, and metallic foil printing.",
    },
    {
      q: "Does Wedly support Bengali (বাংলা) language and bilingual invitations?",
      a: "Yes! We take pride in authentic cultural representation. Wedly natively embeds high-legibility Bengali typography (Hind Siliguri and Noto Serif) and allows you to create completely Bangla or bilingual English + Bangla suites with traditional Gaye Holud, Walima, and Nikah phrasing.",
    },
    {
      q: "Can I edit details after the AI generates the card?",
      a: "Yes. Our Live Studio Editor gives you full granular control over names, dates, times, addresses, family details, colors, fonts, and decorations. You can also trigger quick AI adjustments like 'Make it more luxurious' or 'Try a botanical style' with one click.",
    },
    {
      q: "How does the public web link and RSVP feature work?",
      a: "When you choose to publish your invitation, Wedly generates a private, unique web link (e.g., /invite/your-id). Guests can view an animated card on mobile or desktop, access Google Maps venue directions, add the celebration to their calendar, and submit RSVP responses.",
    },
    {
      q: "Is my personal data and wedding schedule secure?",
      a: "Yes. We verify all authenticated requests server-side using Firebase ID tokens and enforce strict ownership in Supabase PostgreSQL. Your draft invitations are never accessible to anyone without your authorized login.",
    },
  ];

  return (
    <section className="w-full px-6 lg:px-12 py-20 lg:py-28 bg-[#F1E9DA]/30" id="faq">
      <div className="max-w-4xl mx-auto flex flex-col space-y-12">
        <div className="text-center space-y-3">
          <span className="font-sans text-[11px] font-bold uppercase text-[#9A7C43] tracking-[0.2em] block">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32]">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#77766F]">
            Everything you need to know about crafting your wedding stationery with Wedly AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-[#E8E2D8] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAF8F4] transition-colors"
                >
                  <span className="font-serif text-lg font-medium text-[#173D32]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9A7C43] transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm font-sans text-[#77766F] leading-relaxed border-t border-[#FAF8F4]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
