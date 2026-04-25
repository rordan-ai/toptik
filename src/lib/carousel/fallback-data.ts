import { CarouselPayload } from "@/lib/carousel/types";

const angleKeys = ["front", "right", "back", "left"] as const;

function fallbackUuid(seed: number) {
  return `00000000-0000-4000-8000-${seed.toString(16).padStart(12, "0")}`;
}

export const fallbackCarouselPayload: CarouselPayload = {
  items: Array.from({ length: 20 }, (_, index) => {
    const itemNumber = index + 1;
    const itemId = fallbackUuid(itemNumber);
    return {
      id: itemId,
      title: `דגם ${itemNumber}`,
      description: "קולקציית TOPTIK",
      catalogNumber: null,
      sourceUrl: null,
      coverImagePath: "/hero-web-airport.png",
      displayOrder: itemNumber,
      isActive: true,
      angles: angleKeys.map((key, angleIndex) => ({
        id: fallbackUuid(itemNumber * 100 + angleIndex + 1),
        itemId,
        angleKey: key,
        imagePath: "/hero-web-airport.png",
        angleOrder: angleIndex + 1,
      })),
    };
  }),
  settings: {
    autoplayMs: 3500,
    transitionMode: "shatter-particle",
  },
};
