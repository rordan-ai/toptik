const ENABLE_CAROUSEL_FLAG = process.env.NEXT_PUBLIC_ENABLE_CAROUSEL;

export function isCarouselEnabled() {
  return ENABLE_CAROUSEL_FLAG !== "false";
}
