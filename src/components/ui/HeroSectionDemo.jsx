import React from 'react';
import { HeroSection } from '@/components/ui/hero-section-2';

export default function HeroSectionDemo() {
  return (
    <div className="w-full min-h-screen">
      <HeroSection
        logo={{
          url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=64&h=64&fit=crop&q=80",
          alt: "Fab.Dev Logo",
          text: "Fab.Dev"
        }}
        slogan="BACKEND SYSTEM ENGINEER"
        title={
          <>
            Hi, I'm <br />
            <span className="text-[#10B981]">Muhammad Fabian Rizky</span>
          </>
        }
        subtitle="A 3rd-semester informatics student at UPN 'Veteran' Jakarta with a strong interest in backend development and system design. Always eager to learn, solve problems, and contribute to real-world projects."
        callToAction={{
          text: "EXPLORE MY WORK",
          href: "#projects",
        }}
        backgroundImage="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=900&auto=format&fit=crop&q=80"
        contactInfo={{
          website: "github.com/Fabverse0",
          phone: "mfabian.rizky@gmail.com",
          address: "Jakarta, Indonesia",
        }}
      />
    </div>
  );
}
