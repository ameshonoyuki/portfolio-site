"use client";

import { useCallback, useMemo, useState } from "react";
import Lightbox, { type LightboxItem } from "./Lightbox";
import Reveal from "./Reveal";
import type { YT } from "@/lib/youtube";

const fmt = (d: string) => d.replaceAll("-", ".");

const Play = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
  </svg>
);

/** 最高画質のサムネイル。無い動画だけ標準画質に落とす。 */
function Thumb({ id, hq = false, className = "" }: { id: string; hq?: boolean; className?: string }) {
  const [fallback, setFallback] = useState(false);
  const file = hq && !fallback ? "maxresdefault" : hq ? "hqdefault" : "mqdefault";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://i.ytimg.com/vi/${id}/${file}.jpg`}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFallback(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

export default function YouTubeList({ videos }: { videos: YT[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const items: LightboxItem[] = useMemo(
    () => videos.map((v) => ({ kind: "youtube", id: v.id, alt: v.title, caption: v.title, sub: fmt(v.published) })),
    [videos],
  );
  const close = useCallback(() => setOpen(null), []);
  const [main, ...rest] = videos;
  if (!main) return null;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
        {/* 最新の1本 */}
        <Reveal delay={100}>
          <button
            type="button"
            onClick={() => setOpen(0)}
            aria-label={`${main.title} を再生する`}
            className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-bg2 text-left"
          >
            <Thumb id={main.id} hq className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]" />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />
            <span aria-hidden className="absolute left-5 top-5 rounded-full border border-gold/60 bg-black/40 px-3 py-1 font-display text-xs uppercase italic tracking-[0.3em] text-gold backdrop-blur">
              Latest
            </span>
            <span aria-hidden className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-white/50 bg-black/30 pl-1 backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/20">
                <Play className="h-7 w-7" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <span className="block font-mincho text-lg font-bold leading-snug tracking-wide sm:text-2xl">{main.title}</span>
              <span className="mt-2 block text-xs tracking-[0.25em] text-ink/70">{fmt(main.published)}</span>
            </span>
          </button>
        </Reveal>

        {/* これまでの動画 */}
        <ul className="flex flex-col gap-3">
          {rest.map((v, i) => (
            <Reveal as="li" key={v.id} delay={160 + i * 80}>
              <button
                type="button"
                onClick={() => setOpen(i + 1)}
                aria-label={`${v.title} を再生する`}
                className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left backdrop-blur transition-colors duration-300 hover:border-gold/50 hover:bg-white/[0.06]"
              >
                <span className="relative block aspect-video w-36 shrink-0 overflow-hidden rounded-xl bg-bg2 sm:w-44">
                  <Thumb id={v.id} className="transition-transform duration-700 group-hover:scale-105" />
                  <span aria-hidden className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Play className="h-6 w-6" />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 text-sm font-medium leading-snug text-ink/90 sm:text-[0.95rem]">{v.title}</span>
                  <span className="mt-2 block text-xs tracking-[0.2em] text-muted">{fmt(v.published)}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />}
    </>
  );
}
