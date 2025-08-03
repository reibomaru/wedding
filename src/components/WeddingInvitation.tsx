import React from "react";
import { Navigation } from "./Navigation";
import { ImageSlideshow } from "./ImageSlideshow";
import { MessageSection } from "./MessageSection";
import { ProfileSection } from "./ProfileSection";
import { Countdown } from "./Countdown";
import { EventsSection } from "./EventsSection";
import { RSVPSection } from "./RSVPSection";

export const WeddingInvitation: React.FC = () => {
  // 結婚式の日時 (2025年10月4日 11:30)
  const weddingDate = new Date("2025-10-04T11:30:00");

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section - Image Slideshow */}
      <ImageSlideshow />

      {/* Main Sections */}
      <MessageSection />

      {/* Profile以下のセクション - グレー背景 */}
      <div className="bg-gray-50">
        <ProfileSection />
        <Countdown targetDate={weddingDate} />
        <EventsSection />
        <RSVPSection />
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="section-container text-center">
          <p className="text-gray-600 text-sm">© 2025 Rei & Yoko Wedding</p>
        </div>
      </footer>
    </div>
  );
};
