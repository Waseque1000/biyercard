import React, { Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import CreationWizard from "@/components/wizard/CreationWizard";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Create Your Wedding Invitation — Wedly AI Atelier",
  description:
    "Design your personalized luxury wedding invitation with Gemini AI. Multi-step customization with real-time stationery rendering.",
};

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4]">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center text-[#173D32] font-serif text-lg">
              Loading Wedly Atelier...
            </div>
          }
        >
          <CreationWizard />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
