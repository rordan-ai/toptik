"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShatterTransition } from "@/components/carousel/ShatterTransition";

type HomeToCarouselCtaProps = {
  heroImageUrl: string;
};

export function HomeToCarouselCta({ heroImageUrl }: HomeToCarouselCtaProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <>
      <button
        className="enter-catalog-btn"
        onClick={() => setIsTransitioning(true)}
        aria-label="כניסה לקטלוג"
      >
        כניסה לקטלוג
      </button>

      {isTransitioning && (
        <ShatterTransition
          imageUrl={heroImageUrl}
          onComplete={() => {
            router.push("/carousel");
          }}
        />
      )}
    </>
  );
}
