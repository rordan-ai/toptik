"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CarouselGrid } from "@/components/carousel/CarouselGrid";
import { ProductModal } from "@/components/carousel/ProductModal";
import { CarouselItem, CarouselPayload } from "@/lib/carousel/types";
import { fallbackCarouselPayload } from "@/lib/carousel/fallback-data";

export default function CarouselPage() {
  const [payload, setPayload] = useState<CarouselPayload>(fallbackCarouselPayload);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/carousel", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch carousel payload");
        return res.json();
      })
      .then((data) => setPayload(data))
      .catch((error) => {
        console.warn("Using fallback carousel payload", error);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  const activeItems = useMemo(() => payload.items.filter((item) => item.isActive), [payload.items]);

  const onOpenItem = useCallback((item: CarouselItem) => {
    setSelectedItem(item);
    setActiveAngleIndex(0);
  }, []);

  const onCloseModal = useCallback(() => setSelectedItem(null), []);

  const onNextAngle = useCallback(() => {
    if (!selectedItem) return;
    setActiveAngleIndex((current) => (current + 1) % selectedItem.angles.length);
  }, [selectedItem]);

  const onPrevAngle = useCallback(() => {
    if (!selectedItem) return;
    setActiveAngleIndex((current) => (current - 1 + selectedItem.angles.length) % selectedItem.angles.length);
  }, [selectedItem]);

  return (
    <main className="carousel-page">
      <header className="carousel-header">
        <h1>קטלוג TOPTIK</h1>
        <div className="carousel-header-actions">
          <Link className="carousel-back-link" href="/">
            חזרה לדף הבית
          </Link>
          <Link className="carousel-admin-link" href="/admin">
            אדמין
          </Link>
        </div>
      </header>

      {isLoading ? (
        <div className="carousel-loading">טוען מוצרים...</div>
      ) : (
        <CarouselGrid items={activeItems} autoplayMs={payload.settings.autoplayMs} onOpenItem={onOpenItem} />
      )}

      <ProductModal
        item={selectedItem}
        activeAngleIndex={activeAngleIndex}
        onClose={onCloseModal}
        onNextAngle={onNextAngle}
        onPrevAngle={onPrevAngle}
      />
    </main>
  );
}
