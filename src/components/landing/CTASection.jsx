import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="w-full px-6 lg:px-12 py-20 lg:py-28 bg-[#173D32] text-white relative overflow-hidden">
      {/* Subtle gold decorative flourish background */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#C6A66B]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-[#285C49]/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#285C49] px-4 py-1.5 rounded-full border border-[#C6A66B]/30 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A66B]" />
          <span className="font-sans text-[11px] font-bold uppercase text-[#F1E9DA] tracking-[0.16em]">
            Bespoke Generative Atelier
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-tight max-w-2xl">
          Begin Your Forever with an Invitation Crafted to Perfection.
        </h2>

        <p className="font-sans text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
          Answer a few thoughtful questions and watch Gemini AI weave your names, dates, and love story into a work of art.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/create"
            className="group inline-flex items-center gap-3 bg-[#C6A66B] text-[#173D32] font-sans text-xs uppercase tracking-wider font-bold px-8 py-4 rounded shadow-lg hover:bg-[#d8bb7f] transition-all hover:-translate-y-0.5"
          >
            <span>Create Your Free Invitation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center bg-transparent text-white font-sans text-xs uppercase tracking-wider font-semibold px-7 py-4 rounded border border-white/30 hover:bg-white/10 transition-all"
          >
            Access Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
