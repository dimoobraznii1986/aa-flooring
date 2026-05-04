"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  /** Aspect ratio of the source images, height ÷ width. Default 0.66. */
  aspectRatio?: number;
}

export function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  aspectRatio = 0.66,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      move(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [move]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-black select-none"
      style={{ paddingBottom: `${aspectRatio * 100}%` }}
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        move(e.touches[0].clientX);
      }}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(min-width: 768px) 720px, 100vw"
        className="object-cover"
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-cover"
          style={{ width: `${100 / (position / 100 || 1)}%`, maxWidth: "none" }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white">
          Before
        </span>
      </div>

      <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white">
        After
      </span>

      <div
        className="absolute top-0 bottom-0 z-10 w-px bg-white/90 shadow-[0_0_18px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%` }}
      >
        <button
          type="button"
          aria-label="Drag to compare"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white shadow-md ring-1 ring-black/10"
          onMouseDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
        >
          <span className="text-base">⇆</span>
        </button>
      </div>
    </div>
  );
}
