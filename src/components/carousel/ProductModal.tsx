"use client";

import { useEffect } from "react";
import Image from "next/image";
import { CarouselItem } from "@/lib/carousel/types";

type ProductModalProps = {
  item: CarouselItem | null;
  activeAngleIndex: number;
  onClose: () => void;
  onNextAngle: () => void;
  onPrevAngle: () => void;
};

export function ProductModal({
  item,
  activeAngleIndex,
  onClose,
  onNextAngle,
  onPrevAngle,
}: ProductModalProps) {
  useEffect(() => {
    if (!item) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNextAngle();
      if (event.key === "ArrowLeft") onPrevAngle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose, onNextAngle, onPrevAngle]);

  if (!item) return null;
  const activeAngle = item.angles[activeAngleIndex] ?? item.angles[0];

  return (
    <div
      className="product-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`תצוגת מוצר ${item.title}`}
      onClick={onClose}
    >
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose} aria-label="סגור">
          ✕
        </button>

        <div className="product-modal-image-wrap">
          <Image
            src={activeAngle?.imagePath || item.coverImagePath}
            alt={`${item.title} - ${activeAngle?.angleKey ?? "view"}`}
            fill
            sizes="(max-width: 767px) 90vw, 70vw"
            className="product-modal-image"
          />
        </div>

        <div className="product-modal-footer">
          <button className="product-modal-arrow" onClick={onPrevAngle} aria-label="תמונה קודמת">
            ←
          </button>
          <div className="product-modal-meta">
            <div className="product-modal-title">{item.title}</div>
            <div className="product-modal-angle">
              {activeAngleIndex + 1} / {item.angles.length}
            </div>
          </div>
          <button className="product-modal-arrow" onClick={onNextAngle} aria-label="תמונה הבאה">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
