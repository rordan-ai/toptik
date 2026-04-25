import { redirect } from "next/navigation";
import CarouselPageClient from "./CarouselPageClient";
import { isCarouselEnabled } from "@/lib/carousel/feature-flag";

export default function CarouselPage() {
  if (!isCarouselEnabled()) {
    redirect("/");
  }

  return <CarouselPageClient />;
}
