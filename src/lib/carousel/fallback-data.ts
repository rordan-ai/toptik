import { CarouselPayload } from "@/lib/carousel/types";

const angleKeys = ["front", "right", "back", "left"] as const;

export const fallbackCarouselPayload: CarouselPayload = {
  items: Array.from({ length: 20 }, (_, index) => {
    const itemId = `fallback-item-${index + 1}`;
    return {
      id: itemId,
      title: `דגם ${index + 1}`,
      description: "קולקציית TOPTIK",
      coverImagePath: "/hero-web-airport.png",
      displayOrder: index + 1,
      isActive: true,
      angles: angleKeys.map((key, angleIndex) => ({
        id: `${itemId}-${key}`,
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
