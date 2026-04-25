"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import catalogButton from "../../../images/cataloge_bottun.svg";
import { ShatterTransition } from "@/components/carousel/ShatterTransition";
import { TransitionMode } from "@/lib/carousel/types";

const catalogButtonUrl = typeof catalogButton === "string" ? catalogButton : catalogButton.src;

type HomeToCarouselCtaProps = {
  heroImageUrl: string;
};

export function HomeToCarouselCta({ heroImageUrl }: HomeToCarouselCtaProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMode, setTransitionMode] = useState<TransitionMode>("shatter-particle");

  useEffect(() => {
    let isMounted = true;

    async function loadTransitionMode() {
      try {
        const res = await fetch("/api/carousel", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const apiMode = data?.settings?.transitionMode;
        if (isMounted && (apiMode === "shatter-particle" || apiMode === "curtain-fade")) {
          setTransitionMode(apiMode);
        }
      } catch {
        // keep default transition mode on network error
      }
    }

    void loadTransitionMode();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <button
        className="enter-catalog-btn"
        style={{ backgroundImage: `url(${catalogButtonUrl})` }}
        onClick={() => setIsTransitioning(true)}
        disabled={isTransitioning}
        aria-label="כניסה לגלריה"
      >
        <span className="catalog-svg-btn-text">כניסה לגלריה</span>
      </button>

      {isTransitioning && (
        <ShatterTransition
          imageUrl={heroImageUrl}
          mode={transitionMode}
          onComplete={() => {
            router.push("/carousel");
          }}
        />
      )}
    </>
  );
}
