"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BottomBar from "@/components/BottomBar";
import Modal from "@/components/Modal";
import CursorReveal from "@/components/CursorReveal";
import dynamic from "next/dynamic";
import StorySection from "@/components/StorySection";
import DiscoverySection from "@/components/DiscoverySection";
import Footer from "@/components/Footer";

const Character3D = dynamic(() => import("@/components/Character3D"), {
  ssr: false,
});

export default function Home() {
  const [modalType, setModalType] = useState<"explore" | "creatures" | null>(null);
  
  // Asset state: defaults to Base = BG_IMAGE_1, Reveal = BG_IMAGE_2
  const [baseMode, setBaseMode] = useState<"bg1" | "black">("bg1");
  const [revealMode, setRevealMode] = useState<"bg2" | "character">("bg2");

  const revealSrc = revealMode === "bg2" ? "/BG_IMAGE_2.png" : "/character.png";
  const objectFit = revealMode === "bg2" ? "cover" : "contain";

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-white flex flex-col selection:bg-white/20 selection:text-white">
      {/* Hero Section Container */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
        {/* Outer Framed Canvas matching the reference image's composition and rounded frame */}
        <main className="relative w-full max-w-[1440px] min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] rounded-[24px] sm:rounded-[32px] md:rounded-[38px] border border-white/[0.08] bg-[#000000] flex flex-col justify-between overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.95)]">
        
        {/* Base Image Layer: BG_IMAGE_1 (Daytime river) or Pure Black */}
        {baseMode === "bg1" ? (
          <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
            <Image 
              src="/BG_IMAGE_1.png"
              alt="Floria Daytime Realm"
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-cover object-center pointer-events-none"
            />
            {/* Subtle editorial darkening overlay to ensure pristine typography legibility */}
            <div className="absolute inset-0 bg-black/40 backdrop-brightness-[0.85]" />
          </div>
        ) : (
          <div 
            className="absolute inset-0 pointer-events-none editorial-glow z-0" 
            aria-hidden="true" 
          />
        )}
        
        {/* Subtle hairline edge shimmer */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-[24px] sm:rounded-[32px] md:rounded-[38px] ring-1 ring-inset ring-white/[0.04] z-0" 
          aria-hidden="true" 
        />

        {/* 
          Cursor-following reveal layer:
          - Revealed through a soft circular spotlight centered exactly on cursor
          - Reveal radius: 260px
          - Soft feathered/glowing edge
          - Smooth cursor-following movement with slight easing/lerp
          - pointer-events: none on the reveal layer
          - Uses CSS radial-gradient mask via mask-image and -webkit-mask-image
          - Positioned above the hero background, below every text, button, navigation, and UI element
          - Completely hidden when cursor leaves the hero
        */}
        <CursorReveal 
          revealImageSrc={revealSrc}
          radius={260}
          objectFit={objectFit}
        />

        {/* Navigation Bar (z-20) */}
        <Navbar 
          onOpenExplore={() => setModalType("explore")}
          onOpenCreatures={() => setModalType("creatures")}
        />

        {/* Central Hero Section (z-10) */}
        <Hero 
          onExploreClick={() => setModalType("explore")}
          onCreaturesClick={() => setModalType("creatures")}
        />

        {/* 3D Model Centerpiece: grounded flush at the absolute bottom of main, eliminating any gap */}
        <div 
          className="absolute bottom-0 inset-x-0 w-full h-[65%] sm:h-[70%] md:h-[75%] pointer-events-none z-[1000] flex items-end justify-center overflow-visible"
          style={{ zIndex: 1000 }}
        >
          <Character3D />
        </div>

        {/* Bottom Text Area (z-10) with interactive asset mode switcher */}
        <BottomBar 
          baseMode={baseMode}
          revealMode={revealMode}
          onToggleBase={() => setBaseMode(baseMode === "bg1" ? "black" : "bg1")}
          onToggleReveal={() => setRevealMode(revealMode === "bg2" ? "character" : "bg2")}
        />
      </main>
      </section>

      {/* Cinematic Scroll Storytelling Section */}
      <StorySection />

      {/* Interactive Digital Archive / Discovery Section */}
      <DiscoverySection 
        onEnterWorld={() => setModalType("explore")}
        onSelectCreature={() => setModalType("creatures")}
      />

      {/* Art Book Final Page Footer */}
      <Footer 
        onOpenExplore={() => setModalType("explore")}
        onOpenCreatures={() => setModalType("creatures")}
      />

      {/* Interactive Editorial Dossier Modal */}
      <Modal 
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType}
      />
    </div>
  );
}
