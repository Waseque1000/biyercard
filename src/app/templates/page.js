import React from "react";
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
        <TemplatesGallery />
      </main>
      <Footer />
    </div>
  );
}
