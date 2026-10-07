"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { pad } from "@/lib/data";

type Base = { alt: string; caption?: string; sub?: string };
export type LightboxItem =
  | (Base & { kind: "image"; src: string; w: number; h: number })
  | (Base & { kind: "video"; src: string; poster?: string })
  | (Base & { kind: "youtube"; id: string });

type Props = {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
};

const arrow = "M9 5l7 7-7 7";
const frame = "rounded-xl bg-black shadow-[0_30px_100px_-20px_rgba(0,0,0,1)]";

export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const n = items.length;
  const it = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);

  // キー操作
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // 開いている間はスクロールを止め、閉じたら元のボタンにフォーカスを戻す
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, []);

  if (!it) return null;

  const square = "min(76vh, 92vw)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={it.alt}
      className="lb fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 60 && n > 1 && it.kind !== "youtube") go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
        <span className="font-display text-lg italic tracking-[0.25em] text-muted">
          {pad(index + 1)} <span className="opacity-50">/ {pad(n)}</span>
        </span>
        <button
          ref={closeRef}
          type="button"
          aria-label="閉じる"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-ink transition-colors hover:border-gold hover:text-gold"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <figure
        key={index}
        className="lb-fig flex max-w-[92vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {it.kind === "image" && (
          <Image
            src={it.src}
            width={it.w}
            height={it.h}
            alt={it.alt}
            sizes="min(92vw, 76vh)"
            quality={88}
            priority
            style={{ width: "auto", height: "auto", maxHeight: "76vh", maxWidth: "92vw" }}
            className={`object-contain ${frame}`}
          />
        )}
        {it.kind === "video" && (
          <video
            src={it.src}
            poster={it.poster}
            controls
            autoPlay
            loop
            playsInline
            style={{ width: square, height: square }}
            className={`object-contain ${frame}`}
          />
        )}
        {it.kind === "youtube" && (
          <div className={`aspect-video overflow-hidden ${frame}`} style={{ width: "min(92vw, calc(72vh * 16 / 9))" }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${it.id}?autoplay=1&rel=0&playsinline=1`}
              title={it.alt}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        )}
        {(it.caption || it.sub) && (
          <figcaption className="mt-5 max-w-[92vw] text-center">
            {it.caption && <p className="font-mincho text-lg font-bold tracking-wider text-ink">{it.caption}</p>}
            {it.sub && <p className="mt-1 text-xs tracking-[0.25em] text-muted">{it.sub}</p>}
          </figcaption>
        )}
      </figure>

      {n > 1 && (
        <>
          <button
            type="button"
            aria-label="前へ"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 text-ink backdrop-blur transition-colors hover:border-gold hover:text-gold sm:left-6"
          >
            <svg className="h-5 w-5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={arrow} />
            </svg>
          </button>
          <button
            type="button"
            aria-label="次へ"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 text-ink backdrop-blur transition-colors hover:border-gold hover:text-gold sm:right-6"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={arrow} />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
