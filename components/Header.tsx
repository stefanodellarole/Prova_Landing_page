"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import splinterLogo from "figma:asset/64bef5ec469a1db741d3a735f3fa95a4f771f716.png";

export function Header() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
  });

  const navItems = [
    { id: "hero", label: t("header.home") },
    { id: "features", label: t("header.features") },
    { id: "benefits", label: t("header.benefits") },
    { id: "contact", label: t("header.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Scroll spy - detect which section is currently visible
      const sections = [
        "hero",
        "features",
        "benefits",
        "contact",
      ];
      const scrollPosition =
        window.scrollY + window.innerHeight / 3; // Trigger when section is 1/3 visible

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== sections[i]) {
            setActiveSection(sections[i]);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Update slider position when active section changes
  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector(
        `[data-section="${activeSection}"]`,
      ) as HTMLElement;
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        setSliderStyle({
          left: buttonRect.left - navRect.left,
          width: buttonRect.width,
        });
      }
    }
  }, [activeSection, t]); // Include t to update when language changes

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the header height for offset
      const headerHeight = 80; // Height of the fixed header
      const elementPosition = element.offsetTop - headerHeight;

      // For contact section, ensure it shows fully by using different scroll behavior
      if (sectionId === "contact") {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
      setIsMenuOpen(false);
      // Don't manually set activeSection here - let scroll spy handle it
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg shadow-soft" : ""
      }`}
      style={{
        backgroundColor: isScrolled
          ? "hsl(0, 0%, 99%, 0.95)" /* Background with higher opacity for better contrast */
          : "transparent",
        borderBottom: isScrolled
          ? "1px solid hsl(210, 15%, 92%)" /* Border light */
          : "none",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            {/* Logo with shimmer effect */}
            <div
              className="relative"
              style={{
                filter:
                  "brightness(1.05) saturate(1.1) drop-shadow(0 0 8px hsl(158, 65%, 58%, 0.3)) drop-shadow(0 0 16px hsl(158, 65%, 58%, 0.2))",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            >
              <img
                src={splinterLogo}
                alt="Splinter Logo"
                className="w-8 h-8 md:w-10 md:h-10"
                style={{
                  filter: "brightness(1.1) saturate(1.2)",
                }}
              />
            </div>

            {/* Text with shimmer effect */}
            <div
              className="text-2xl font-heading font-semibold relative"
              style={{
                background:
                  "linear-gradient(135deg, hsl(158, 65%, 45%), hsl(158, 65%, 60%), hsl(158, 55%, 50%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.01em",
                textShadow: "0 0 20px hsl(158, 65%, 58%, 0.4)",
                filter:
                  "drop-shadow(0 0 8px hsl(158, 65%, 58%, 0.3))",
                animation: "shimmer 3s ease-in-out infinite",
                backgroundSize: "200% 100%",
              }}
            >
              Splinter
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div
              ref={navRef}
              className="relative flex items-center space-x-6 px-6 py-3 rounded-full"
              style={{
                backgroundColor: isScrolled
                  ? "hsl(0, 0%, 100%, 0.85)"
                  : "hsl(0, 0%, 100%, 0.1)",
                backdropFilter: "blur(12px)",
                boxShadow: isScrolled
                  ? "0 8px 32px hsl(158 25% 15% / 0.08)"
                  : "0 4px 16px hsl(0 0% 0% / 0.04)",
              }}
            >
              {/* Animated slider background */}
              <div
                className="absolute top-3 bottom-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  left: sliderStyle.left,
                  width: sliderStyle.width,
                  backgroundColor: "hsl(158, 65%, 45%)",
                  boxShadow:
                    "0 4px 16px hsl(158, 65%, 45%, 0.3)",
                  transform: "translateX(0)",
                  zIndex: 1,
                }}
              />

              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-section={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative z-10 text-body font-medium transition-all duration-300 px-4 py-2 rounded-full cursor-pointer"
                  style={{
                    color:
                      activeSection === item.id
                        ? "hsl(0, 0%, 100%)" /* White text when active */
                        : "hsl(210, 15%, 20%)" /* Dark text when inactive */,
                    fontSize: "0.875rem",
                    fontWeight:
                      activeSection === item.id ? "600" : "500",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Language selector, Login and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />

            {/* Login Text */}
            <button
              className="font-body font-medium transition-all duration-300 hover:opacity-80 cursor-pointer"
              style={{
                color:
                  "hsl(158, 65%, 45%)" /* Green text from teal palette */,
                fontSize: "0.875rem" /* text-sm equivalent */,
              }}
              onClick={() => {
                // TODO: Implement login functionality
                console.log("Login clicked");
              }}
            >
              Login
            </button>

            <Button
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all duration-300 text-cta-primary cursor-pointer"
              style={{
                backgroundColor: "hsl(158, 65%, 45%)",
                color: "hsl(0 0% 100%)",
                letterSpacing: "-0.005em",
              }}
              onClick={() => scrollToSection("contact")}
            >
              {t("header.startNow")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSelector />

            {/* Mobile Login Text */}
            <button
              className="font-body font-medium transition-all duration-300 hover:opacity-80 cursor-pointer"
              style={{
                color:
                  "hsl(158, 65%, 45%)" /* Green text from teal palette */,
                fontSize: "0.875rem" /* text-sm equivalent */,
              }}
              onClick={() => {
                // TODO: Implement login functionality
                console.log("Login clicked");
              }}
            >
              Login
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{
                color: "hsl(210, 15%, 20%)",
                backgroundColor: isMenuOpen
                  ? "hsl(158, 65%, 45%, 0.1)"
                  : "transparent",
              }}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 shadow-medium border-t backdrop-blur-lg"
            style={{
              backgroundColor:
                "hsl(0, 0%, 99%, 0.95)" /* Background */,
              borderColor: "hsl(210, 15%, 92%)" /* Border */,
            }}
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-body font-medium py-3 px-4 rounded-lg transition-all duration-200"
                  style={{
                    color:
                      activeSection === item.id
                        ? "hsl(158, 65%, 45%)"
                        : "hsl(210, 15%, 20%)",
                    backgroundColor:
                      activeSection === item.id
                        ? "hsl(158, 65%, 45%, 0.1)"
                        : "transparent",
                    fontWeight:
                      activeSection === item.id ? "600" : "500",
                  }}
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="lg"
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300 text-cta-primary cursor-pointer mt-4"
                style={{
                  backgroundColor: "hsl(158, 65%, 45%)",
                  color: "hsl(0 0% 100%)",
                  letterSpacing: "-0.005em",
                }}
                onClick={() => scrollToSection("contact")}
              >
                {t("header.startNow")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}