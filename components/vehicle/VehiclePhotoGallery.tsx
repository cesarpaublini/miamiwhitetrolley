"use client";

import { useMemo, useState } from "react";

type VehiclePhotoGalleryProps = {
  name: string;
  images: string[];
};

function GridIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.25" y="1.25" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8.25" y="1.25" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1.25" y="8.25" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8.25" y="8.25" width="4.5" height="4.5" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function VehiclePhotoGallery({ name, images }: VehiclePhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const galleryImages = useMemo(() => {
    const source = images.filter(Boolean);
    if (source.length === 0) {
      return [];
    }

    const normalized = [...source];
    while (normalized.length < 5) {
      normalized.push(source[0]);
    }
    return normalized.slice(0, 5);
  }, [images]);

  if (galleryImages.length === 0) {
    return null;
  }

  const isLightboxOpen = activeIndex !== null;

  return (
    <>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ height: "clamp(300px, 40vw, 500px)" }}
      >
        <div className="grid h-full grid-cols-4 grid-rows-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="group relative col-span-2 row-span-2 overflow-hidden"
            aria-label={`Open photo 1 of ${name}`}
          >
            <img
              src={galleryImages[0]}
              alt={`${name} photo 1`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>

          {galleryImages.slice(1).map((image, index) => (
            <button
              key={`${name}-gallery-${index + 1}`}
              type="button"
              onClick={() => setActiveIndex(index + 1)}
              className="group relative col-span-1 row-span-1 overflow-hidden"
              aria-label={`Open photo ${index + 2} of ${name}`}
            >
              <img
                src={image}
                alt={`${name} photo ${index + 2}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-[#DDDDDD] bg-white px-4 py-2 text-[0.82rem] font-bold text-[#222222] shadow-sm"
        >
          <GridIcon />
          Show all photos
        </button>
      </div>

      {isLightboxOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-sm font-semibold text-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev + galleryImages.length - 1) % galleryImages.length))}
            className="absolute left-4 rounded-full border border-white/30 px-3 py-2 text-sm font-semibold text-white"
            aria-label="Previous photo"
          >
            Prev
          </button>

          <img
            src={galleryImages[activeIndex]}
            alt={`${name} enlarged photo ${activeIndex + 1}`}
            className="max-h-[85vh] w-auto max-w-[92vw] rounded-xl object-contain"
          />

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % galleryImages.length))}
            className="absolute right-4 rounded-full border border-white/30 px-3 py-2 text-sm font-semibold text-white"
            aria-label="Next photo"
          >
            Next
          </button>
        </div>
      ) : null}
    </>
  );
}
