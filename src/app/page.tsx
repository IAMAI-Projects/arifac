import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CertificationScrollSection from "@/components/CertificationScrollSection";
import MembershipSection from "@/components/MembershipSection";
import EngagementSection from "@/components/EngagementSection";
import PartnersSection from "@/components/PartnersSection";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />

      <div className="relative z-10 bg-background">
        <AboutSection />
        <CertificationScrollSection />
        <MembershipSection />
        <EngagementSection />
        <PartnersSection />
        <ResourcesSection />
      </div>

      <Footer />
    </main>
  );
}
