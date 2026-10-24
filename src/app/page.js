import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedSuites from "@/components/landing/FeaturedSuites";
import WorkflowSection from "@/components/landing/WorkflowSection";
import StylesGallery from "@/components/landing/StylesGallery";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import WhyChooseWedly from "@/components/landing/WhyChooseWedly";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4]">
      <Navbar />
      <main className="flex-1 pt-20">
        <HeroSection />
        <FeaturedSuites />
        <WorkflowSection />
        <StylesGallery />
        <BeforeAfterSection />
        <WhyChooseWedly />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
