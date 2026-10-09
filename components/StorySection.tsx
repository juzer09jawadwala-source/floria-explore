"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const isMobile = viewport.width < 640;
  const isTablet = viewport.width >= 640 && viewport.width < 1024;

  const initialWidth = isMobile ? 220 : isTablet ? 260 : 300;
  const initialHeight = isMobile ? 391 : isTablet ? 462 : 533;
  const initialRadius = isMobile ? 20 : 28;

  // Pure Framer Motion useScroll - zero React state updates, runs on GPU compositor!
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring physics interpolation for liquid-smooth 120fps momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.0005,
  });

  // Expanding Central Card Dimensions (0.22 to 0.78)
  const cardWidth = useTransform(smoothProgress, [0.22, 0.78], [initialWidth, viewport.width]);
  const cardHeight = useTransform(smoothProgress, [0.22, 0.78], [initialHeight, viewport.height]);
  const cardRadius = useTransform(smoothProgress, [0.22, 0.78], [initialRadius, 0]);
  const cardBorderOpacity = useTransform(smoothProgress, [0.22, 0.60], [0.15, 0]);
  const cardVignetteOpacity = useTransform(smoothProgress, [0.22, 0.70], [1, 0]);
  const cardInnerScale = useTransform(smoothProgress, [0.22, 0.92], [1.04, 1.12]);

  // Ambient Glow
  const glowOpacity = useTransform(smoothProgress, [0.20, 0.60], [1, 0]);
  const glowScale = useTransform(smoothProgress, [0.20, 0.75], [1, 1.6]);

  // Editorial Text Elements (all 100% visible from 0.00 to 0.22, then staggered departures)
  // 1. Top-Left: Archive 084
  const opTopLeft = useTransform(smoothProgress, [0.24, 0.44], [1, 0]);
  const xTopLeft = useTransform(smoothProgress, [0.24, 0.44], [0, -75]);
  const yTopLeft = useTransform(smoothProgress, [0.24, 0.44], [0, -45]);
  const rotTopLeft = useTransform(smoothProgress, [0.24, 0.44], [-2, -7]);

  // 2. Top-Right: Fragment 17
  const opTopRight = useTransform(smoothProgress, [0.28, 0.48], [1, 0]);
  const xTopRight = useTransform(smoothProgress, [0.28, 0.48], [0, 80]);
  const yTopRight = useTransform(smoothProgress, [0.28, 0.48], [0, -35]);
  const rotTopRight = useTransform(smoothProgress, [0.28, 0.48], [2, 6]);

  // 3. Mid-Left: Habitat Spec
  const opMidLeft = useTransform(smoothProgress, [0.34, 0.54], [1, 0]);
  const xMidLeft = useTransform(smoothProgress, [0.34, 0.54], [0, -95]);
  const yMidLeft = useTransform(smoothProgress, [0.34, 0.54], [0, 15]);
  const rotMidLeft = useTransform(smoothProgress, [0.34, 0.54], [-3, -7]);

  // 4. Mid-Right: Floria Flora
  const opMidRight = useTransform(smoothProgress, [0.38, 0.58], [1, 0]);
  const xMidRight = useTransform(smoothProgress, [0.38, 0.58], [0, 85]);
  const yMidRight = useTransform(smoothProgress, [0.38, 0.58], [0, 25]);
  const rotMidRight = useTransform(smoothProgress, [0.38, 0.58], [3, 7]);

  // 5. Bottom-Left: Metric 02
  const opBottomLeft = useTransform(smoothProgress, [0.44, 0.64], [1, 0]);
  const xBottomLeft = useTransform(smoothProgress, [0.44, 0.64], [0, -60]);
  const yBottomLeft = useTransform(smoothProgress, [0.44, 0.64], [0, 65]);
  const rotBottomLeft = useTransform(smoothProgress, [0.44, 0.64], [2, 5]);

  // 6. Bottom-Right: Discovery Seal
  const opBottomRight = useTransform(smoothProgress, [0.48, 0.68], [1, 0]);
  const xBottomRight = useTransform(smoothProgress, [0.48, 0.68], [0, 70]);
  const yBottomRight = useTransform(smoothProgress, [0.48, 0.68], [0, 55]);
  const rotBottomRight = useTransform(smoothProgress, [0.48, 0.68], [-1, -5]);

  // Scroll Hint
  const opHint = useTransform(smoothProgress, [0.18, 0.28], [1, 0]);
  const yHint = useTransform(smoothProgress, [0.18, 0.28], [0, 30]);

  // Caption (fades in at full expansion)
  const opCaption = useTransform(smoothProgress, [0.78, 0.90, 0.97, 1.0], [0, 1, 1, 0.5]);
  const yCaption = useTransform(smoothProgress, [0.78, 0.90], [25, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[450vh] bg-[#000000] text-white select-none z-30"
    >
      {/* Sticky Fullscreen Pinned Canvas */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#000000] flex items-center justify-center will-change-transform"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
        }}
      >
        {/* Soft Ambient Cinematic Glow */}
        <motion.div
          className="absolute w-[500px] h-[700px] rounded-full pointer-events-none will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(197, 160, 89, 0.09) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)",
            opacity: glowOpacity,
            scale: glowScale,
          }}
        />

        {/* =========================================================================
            EDITORIAL TEXT ELEMENTS: FRAMER MOTION TRANSFORM ACCELERATION
            ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="relative w-full max-w-6xl h-full max-h-[860px] mx-auto px-4 sm:px-8">

            {/* 1. TOP-LEFT: Expedition Coordinates Tag */}
            <motion.div
              style={{
                opacity: opTopLeft,
                x: xTopLeft,
                y: yTopLeft,
                rotate: rotTopLeft,
              }}
              className="absolute top-[8%] sm:top-[11%] left-[4%] sm:left-[8%] md:left-[10%] max-w-[210px] sm:max-w-[240px] will-change-transform"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#C5A059] font-mono font-medium">
                  ARCHIVE // 084
                </span>
              </div>
              <h4 className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase text-[#EDE8DE] leading-snug">
                VALLEY OF MILLBROOK
              </h4>
              <p className="text-[10px] sm:text-[11px] font-mono text-[#8E8A81] tracking-wider mt-1">
                45°14&apos;18&quot;N · 122°43&apos;55&quot;W
              </p>
              <div className="mt-2 h-px w-14 bg-gradient-to-r from-white/30 to-transparent" />
            </motion.div>

            {/* 2. TOP-RIGHT: Poetic Pull-Quote in Cormorant Garamond */}
            <motion.div
              style={{
                opacity: opTopRight,
                x: xTopRight,
                y: yTopRight,
                rotate: rotTopRight,
              }}
              className="absolute top-[7%] sm:top-[10%] right-[4%] sm:right-[7%] md:right-[9%] max-w-[240px] sm:max-w-[300px] text-right will-change-transform"
            >
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#8E8A81] font-mono block mb-1">
                FRAGMENT Nº 17
              </span>
              <p className="font-cormorant text-xl sm:text-2xl md:text-3xl italic font-light text-[#E5E0D5] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                “Where the river whispers to ancient stones.”
              </p>
              <span className="inline-block mt-1.5 text-[10px] sm:text-[11px] text-[#A8A49B] tracking-[0.18em] uppercase">
                FIRST RECORDED AT TWILIGHT
              </span>
            </motion.div>

            {/* 3. MID-LEFT: Architectural & Botanical Dossier */}
            <motion.div
              style={{
                opacity: opMidLeft,
                x: xMidLeft,
                y: yMidLeft,
                rotate: rotMidLeft,
              }}
              className="absolute top-[44%] -translate-y-1/2 left-[2%] sm:left-[5%] md:left-[7%] max-w-[200px] sm:max-w-[230px] hidden sm:block will-change-transform"
            >
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.09] rounded-2xl p-3.5 shadow-xl">
                <span className="text-[9px] tracking-[0.26em] uppercase text-[#A8A49B] block font-mono mb-1">
                  [ HABITAT SPEC ]
                </span>
                <p className="font-cinzel text-xs text-[#EDE8DE] tracking-wider font-light leading-snug">
                  HAND-HEWN CEDAR &amp; SLATE
                </p>
                <p className="text-[10px] text-[#8E8A81] leading-relaxed mt-1.5 font-sans">
                  Crafted along the riverbend. Alpine moss covers every shingle by dawn.
                </p>
                <div className="mt-2 pt-2 border-t border-white/[0.06] flex justify-between items-center text-[9px] font-mono text-[#C5A059]">
                  <span>ALT: 640M</span>
                  <span>MOSS: 98%</span>
                </div>
              </div>
            </motion.div>

            {/* 4. MID-RIGHT: Editorial Emblem / Living Herbarium Stamp */}
            <motion.div
              style={{
                opacity: opMidRight,
                x: xMidRight,
                y: yMidRight,
                rotate: rotMidRight,
              }}
              className="absolute top-[46%] -translate-y-1/2 right-[2%] sm:right-[5%] md:right-[7%] max-w-[210px] sm:max-w-[240px] will-change-transform"
            >
              <div className="relative border border-white/[0.12] rounded-2xl bg-black/60 backdrop-blur-md p-3.5 shadow-2xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-2 h-2 rounded-full border border-[#C5A059] flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C5A059]">
                    FLORIA FLORA
                  </span>
                </div>
                <h5 className="font-cormorant text-base sm:text-lg italic text-[#EDE8DE] leading-snug">
                  Hydrangea &amp; River Blossom
                </h5>
                <p className="text-[10px] text-[#9E9A90] mt-1 leading-normal">
                  Perpetual bloom fed by glacial springs. Gentle fragrance noted in north wind.
                </p>
              </div>
            </motion.div>

            {/* 5. BOTTOM-LEFT: Atmosphere Reading */}
            <motion.div
              style={{
                opacity: opBottomLeft,
                x: xBottomLeft,
                y: yBottomLeft,
                rotate: rotBottomLeft,
              }}
              className="absolute bottom-[9%] sm:bottom-[11%] left-[4%] sm:left-[8%] md:left-[11%] max-w-[220px] sm:max-w-[250px] will-change-transform"
            >
              <span className="text-[9px] tracking-[0.25em] font-mono uppercase text-[#736F67] block mb-1">
                METRIC // LOG 02
              </span>
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.16em] text-[#E0DDD5] uppercase font-light">
                THE SLOW CURRENT
              </p>
              <p className="font-cormorant text-xs sm:text-sm italic text-[#A8A49B] mt-1">
                “Time takes a deeper breath when crossing the wooden bridge.”
              </p>
            </motion.div>

            {/* 6. BOTTOM-RIGHT: Curators Signature Inscription */}
            <motion.div
              style={{
                opacity: opBottomRight,
                x: xBottomRight,
                y: yBottomRight,
                rotate: rotBottomRight,
              }}
              className="absolute bottom-[8%] sm:bottom-[10%] right-[4%] sm:right-[7%] md:right-[10%] max-w-[220px] sm:max-w-[260px] text-right will-change-transform"
            >
              <div className="inline-block text-right">
                <span className="text-[9px] tracking-[0.3em] font-mono uppercase text-[#C5A059] block mb-1">
                  DISCOVERY SEAL
                </span>
                <p className="text-xs sm:text-[13px] text-[#EDE8DE] font-light leading-snug">
                  A sanctuary undisturbed by the modern noise of iron and clockwork.
                </p>
                <p className="font-cormorant text-xs italic text-[#8E8A81] mt-1">
                  — The Living Chronicles Vol. I
                </p>
              </div>
            </motion.div>

            {/* Micro-hint to prompt user scroll */}
            <motion.div
              style={{
                opacity: opHint,
                y: yHint,
              }}
              className="absolute bottom-[2%] inset-x-0 mx-auto w-fit flex flex-col items-center gap-1.5 will-change-transform"
            >
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#8E8A81] font-mono font-medium">
                SCROLL TO IMMERSE
              </span>
              <div className="w-px h-6 bg-gradient-to-b from-[#8E8A81] to-transparent animate-bounce" />
            </motion.div>

          </div>
        </div>

        {/* =========================================================================
            CENTRAL EXPANDING 9:16 IMAGE CONTAINER (FRAMER MOTION ACCELERATED)
            ========================================================================= */}
        <motion.div
          className="relative z-10 flex items-center justify-center overflow-hidden will-change-[width,height,border-radius]"
          style={{
            width: cardWidth,
            height: cardHeight,
            borderRadius: cardRadius,
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.95)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Inner Image: Perfectly centered, composition preserved */}
          <motion.div
            className="relative w-full h-full overflow-hidden will-change-transform"
            style={{
              scale: cardInnerScale,
            }}
          >
            <Image
              src="/village_realm.jpg"
              alt="The Living Sanctuary of Millbrook, Floria"
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-cover object-center pointer-events-none select-none"
            />

            {/* Subtle Vignette in initial framed state */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
                opacity: cardVignetteOpacity,
              }}
            />

            {/* Hairline frame highlight */}
            <motion.div
              className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10"
              style={{
                borderRadius: cardRadius,
                opacity: cardBorderOpacity,
              }}
            />
          </motion.div>
        </motion.div>

        {/* =========================================================================
            FINAL STATE: CINEMATIC EXHIBITION TITLE (FRAMER MOTION FADE-IN)
            ========================================================================= */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 inset-x-0 mx-auto px-6 max-w-4xl text-center pointer-events-none z-30 will-change-transform"
          style={{
            opacity: opCaption,
            y: yCaption,
          }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 mb-3 sm:mb-4 shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#E5E0D5] font-mono">
              FLORIA DIGITAL EXHIBITION · GALLERY Nº 02
            </span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] font-light uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#ECE7DF] to-[#999489] leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            THE SANCTUARY OF MILLBROOK
          </h2>

          <p className="font-cormorant text-base sm:text-xl md:text-2xl font-light italic text-[#E5E0D5] tracking-wide max-w-2xl mx-auto mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Where old stone cottages rest beside blooming blossoms, and time flows as gently as the river.
          </p>

          <div className="flex items-center justify-center gap-6 mt-4 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8E8A81] font-mono">
            <span>REALM // DAYBREAK</span>
            <span>·</span>
            <span>COORDINATES: 45°14&apos;N 122°43&apos;W</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
