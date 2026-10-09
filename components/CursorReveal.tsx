"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

interface CursorRevealProps {
  revealImageSrc?: string;
  radius?: number;
  objectFit?: "cover" | "contain";
}

export default function CursorReveal({
  revealImageSrc = "/BG_IMAGE_2.png",
  radius = 260,
  objectFit = "cover",
}: CursorRevealProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  // Position and opacity references for 60fps / 120fps smooth lerp without React re-renders
  const stateRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    currentOpacity: 0,
    targetOpacity: 0,
    isInitialized: false,
  });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const parent = layerRef.current?.parentElement;
    if (!parent) return;

    const animate = () => {
      const state = stateRef.current;
      const easing = 0.18; // Smooth lerp easing factor

      // Interpolate towards target cursor coordinates
      state.currentX += (state.targetX - state.currentX) * easing;
      state.currentY += (state.targetY - state.currentY) * easing;
      state.currentOpacity += (state.targetOpacity - state.currentOpacity) * 0.15;

      const x = Math.round(state.currentX * 10) / 10;
      const y = Math.round(state.currentY * 10) / 10;
      const opacity = Math.max(0, Math.min(1, state.currentOpacity));

      if (maskRef.current && haloRef.current) {
        if (opacity > 0.003) {
          const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 140px, rgba(0,0,0,0.65) 200px, rgba(0,0,0,0.2) 240px, rgba(0,0,0,0) ${radius}px)`;
          maskRef.current.style.opacity = opacity.toFixed(3);
          maskRef.current.style.webkitMaskImage = mask;
          maskRef.current.style.maskImage = mask;

          const halo = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(255,248,230,0.09) 0%, rgba(255,240,210,0.05) 150px, rgba(255,230,190,0.08) 220px, transparent ${radius}px)`;
          haloRef.current.style.opacity = opacity.toFixed(3);
          haloRef.current.style.background = halo;
        } else {
          maskRef.current.style.opacity = "0";
          haloRef.current.style.opacity = "0";
        }
      }

      if (state.targetOpacity > 0 || opacity > 0.003) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const state = stateRef.current;
      state.targetX = x;
      state.targetY = y;
      state.targetOpacity = 1;

      if (!state.isInitialized) {
        state.isInitialized = true;
        state.currentX = x;
        state.currentY = y;
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const handlePointerLeave = () => {
      const state = stateRef.current;
      state.targetOpacity = 0;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    parent.addEventListener("pointermove", handlePointerMove, { passive: true });
    parent.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      parent.removeEventListener("pointermove", handlePointerMove);
      parent.removeEventListener("pointerleave", handlePointerLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [radius]);

  return (
    <div
      ref={layerRef}
      className="absolute inset-0 w-full h-full z-[2] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={maskRef}
        className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center will-change-[mask-image,opacity]"
        style={{ opacity: 0 }}
      >
        <Image
          src={revealImageSrc}
          alt="Reveal spotlight"
          fill
          unoptimized
          sizes="100vw"
          priority
          className={`w-full h-full ${objectFit === "cover" ? "object-cover" : "object-contain"} object-center pointer-events-none select-none`}
        />
      </div>

      {/* Soft feathered glowing edge overlay centered on cursor */}
      <div
        ref={haloRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-[background,opacity]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
