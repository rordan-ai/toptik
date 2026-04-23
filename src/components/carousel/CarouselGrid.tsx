"use client";

import { useMemo } from "react";
import Image from "next/image";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselItem } from "@/lib/carousel/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CarouselGridProps = {
  items: CarouselItem[];
  autoplayMs: number;
  onOpenItem: (item: CarouselItem) => void;
};

function chunkItems(items: CarouselItem[], size: number) {
  const chunks: CarouselItem[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function CarouselGrid({ items, autoplayMs, onOpenItem }: CarouselGridProps) {
  const pages = useMemo(() => chunkItems(items, 4), [items]);

  return (
    <section className="catalog-carousel" aria-label="קטלוג מוצרים">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, A11y, Autoplay]}
        slidesPerView={1}
        speed={450}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: "עמוד קודם",
          nextSlideMessage: "עמוד הבא",
        }}
        autoplay={{
          delay: autoplayMs,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {pages.map((page, pageIndex) => (
          <SwiperSlide key={`page-${pageIndex}`}>
            <div className="catalog-grid">
              {page.map((item) => (
                <button
                  key={item.id}
                  className="catalog-card"
                  onClick={() => onOpenItem(item)}
                  aria-label={`הצג מוצר ${item.title}`}
                >
                  <div className="catalog-card-image-wrap">
                    <Image
                      src={item.coverImagePath}
                      alt={item.title}
                      fill
                      sizes="(max-width: 767px) 45vw, 22vw"
                      className="catalog-card-image"
                    />
                  </div>
                  <div className="catalog-card-body">
                    <div className="catalog-card-title">{item.title}</div>
                    <div className="catalog-card-cta">הצג</div>
                  </div>
                </button>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
