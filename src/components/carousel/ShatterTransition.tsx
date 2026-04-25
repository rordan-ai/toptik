"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { TransitionMode } from "@/lib/carousel/types";

type ShatterTransitionProps = {
  imageUrl: string;
  mode?: TransitionMode;
  onComplete: () => void;
};

type Fragment = {
  id: string;
  row: number;
  col: number;
  rows: number;
  cols: number;
};

function buildFragments(rows: number, cols: number): Fragment[] {
  const fragments: Fragment[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      fragments.push({ id: `f-${row}-${col}`, row, col, rows, cols });
    }
  }
  return fragments;
}

export function ShatterTransition({
  imageUrl,
  mode = "shatter-particle",
  onComplete,
}: ShatterTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const runtimeMode = useMemo(() => {
    if (typeof window === "undefined") return mode;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weakDevice = window.innerWidth < 520 || (navigator.hardwareConcurrency ?? 8) <= 4;
    if (prefersReducedMotion || weakDevice) return "curtain-fade";
    return mode;
  }, [mode]);

  const { rows, cols } = useMemo(() => {
    if (typeof window === "undefined") return { rows: 4, cols: 6 };
    const isMobile = window.innerWidth < 768;
    return isMobile ? { rows: 4, cols: 4 } : { rows: 4, cols: 8 };
  }, []);

  const fragments = useMemo(() => buildFragments(rows, cols), [rows, cols]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (runtimeMode === "curtain-fade") {
      gsap.fromTo(
        overlay,
        { opacity: 1 },
        {
          duration: 0.34,
          opacity: 0,
          ease: "power1.out",
          onComplete,
        },
      );
      return;
    }

    const tiles = gsap.utils.toArray<HTMLElement>(".shatter-fragment", overlay);
    gsap.set(tiles, { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 });

    gsap.to(tiles, {
      duration: 0.58,
      opacity: 0,
      scale: 0.72,
      rotate: () => gsap.utils.random(-26, 26),
      x: () => gsap.utils.random(-220, 220),
      y: () => gsap.utils.random(-180, 180),
      ease: "power3.inOut",
      stagger: { each: 0.012, from: "center" },
      onComplete,
    });
  }, [onComplete, runtimeMode]);

  return (
    <div
      ref={overlayRef}
      className="shatter-overlay"
      style={
        runtimeMode === "curtain-fade"
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
      aria-hidden
    >
      {runtimeMode === "shatter-particle" &&
        fragments.map((fragment) => (
          <div
            key={fragment.id}
            className="shatter-fragment"
            style={{
              left: `${(fragment.col * 100) / fragment.cols}%`,
              top: `${(fragment.row * 100) / fragment.rows}%`,
              width: `${100 / fragment.cols}%`,
              height: `${100 / fragment.rows}%`,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: `${fragment.cols * 100}% ${fragment.rows * 100}%`,
              backgroundPosition: `${(fragment.col * 100) / (fragment.cols - 1 || 1)}% ${(fragment.row * 100) / (fragment.rows - 1 || 1)}%`,
            }}
          />
        ))}
    </div>
  );
}
