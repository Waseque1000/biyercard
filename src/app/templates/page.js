import React, { Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import TemplatesGallery from "@/components/templates/TemplatesGallery";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "108+ Ready Invitation Templates — Wedly AI Atelier",
  description:
    "Explore 108+ handcrafted, authentic Bengali and English wedding, Gaye Holud, Boubhat, birthday, and celebration invitation templates. Instant preview and one-click customization.",
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4]">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-[#FAF8F4] pt-28 text-center text-sm text-[#77766F]">Loading 108+ Celebration Cards...</div>}>
          <TemplatesGallery />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
