import { useState, useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { GDPRCompliancePage } from "./components/GDPRCompliancePage";

type CurrentPage = "home" | "privacy" | "terms" | "gdpr";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<CurrentPage>("home");

  // You can set your video URL here when you upload it
  // For example: const videoUrl = "/path/to/your/video.mp4";
  const videoUrl: string | undefined = undefined; // Replace with your video URL

  // Scroll to top whenever the page changes
  useEffect(() => {
    // Use setTimeout to ensure the new page is rendered before scrolling
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [currentPage]);

  const handleNavigateToPrivacy = () => {
    setCurrentPage("privacy");
  };

  const handleNavigateToTerms = () => {
    setCurrentPage("terms");
  };

  const handleNavigateToGDPR = () => {
    setCurrentPage("gdpr");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  return (
    <LanguageProvider>
      <div
        className="min-h-screen bg-background text-foreground"
        style={{
          backgroundColor:
            "hsl(0, 0%, 99%)" /* Updated: Background Light from new teal system */,
          color:
            "hsl(210, 15%, 20%)" /* Updated: Foreground Light from new teal system */,
        }}
      >
        {currentPage === "home" ? (
          <>
            <Header />
            <main>
              <HeroSection videoUrl={videoUrl} />
              <FeaturesSection />
              <BenefitsSection />
              <ContactSection />
            </main>
            <Footer
              onNavigateToPrivacy={handleNavigateToPrivacy}
              onNavigateToTerms={handleNavigateToTerms}
              onNavigateToGDPR={handleNavigateToGDPR}
            />
          </>
        ) : currentPage === "privacy" ? (
          /* Privacy Policy Page - No Header or Footer for clean reading experience */
          <main>
            <PrivacyPolicyPage
              onBackToHome={handleBackToHome}
            />
          </main>
        ) : currentPage === "terms" ? (
          /* Terms of Service Page - No Header or Footer for clean reading experience */
          <main>
            <TermsOfServicePage
              onBackToHome={handleBackToHome}
            />
          </main>
        ) : (
          /* GDPR Compliance Page - No Header or Footer for clean reading experience */
          <main>
            <GDPRCompliancePage
              onBackToHome={handleBackToHome}
            />
          </main>
        )}
      </div>
    </LanguageProvider>
  );
}