import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { id: "message", label: "Message", icon: "💌" },
    { id: "profile", label: "Profile", icon: "👫" },
    { id: "countdown", label: "Countdown", icon: "⏰" },
    { id: "events", label: "Events", icon: "🗓️" },
    { id: "rsvp", label: "RSVP", icon: "✍️" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-serif font-semibold text-gray-800">
            Rei & Yoko
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-rose-600"
                    : "text-gray-600 hover:text-rose-500"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-rose-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-rose-50 text-rose-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
