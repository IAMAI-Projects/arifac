import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CertificationScrollSection from "@/components/CertificationScrollSection";
import MembershipSection from "@/components/MembershipSection";
import EngagementSection from "@/components/EngagementSection";
import PartnersSection from "@/components/PartnersSection";
import ResourcesSection from "@/components/ResourcesSection";
import QuickGallerySection from "@/components/QuickGallerySection";
import LatestMeetingsSection from "@/components/LatestMeetingsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen font-sans">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      {/* Disclaimer Note */}
      <section className="py-6 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[13px] text-[#1d1d1f]/90 font-bold leading-relaxed max-w-4xl mx-auto">
            <span className="text-[#C2B020] mr-2 inline-block font-black uppercase tracking-[0.1em] text-[10px] bg-[#C2B020]/10 px-2 py-0.5 rounded-sm">Note:</span>
            ARIFAC is an industry-led platform and does not grant approvals, licenses, or compliance certifications.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
