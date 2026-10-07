"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Lightbox, { type LightboxItem } from "./Lightbox";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { VIDEOS, pad } from "@/lib/data";

function Card({ i, onOpen }: { i: number; onOpen: () => void }) {
  const v = VIDEOS[i];
  const ref = useRef<HTMLVideoElement>(null);

  // マウスを乗せている間だけ音なしで再生。タップしたら大きく開く。
  const play = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") ref.current?.play().catch(() => {});
  };
  const stop = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={play}
      onPointerLeave={stop}
      aria-label={`モーション作品 ${pad(i + 1)} を再生する`}
      className="group relative block aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-bg2"
    >
      <video
        ref={ref}
        src={v.src}
        poster={v.poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
      />
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <span aria-hidden className="absolute left-5 top-5 font-display text-2xl italic tracking-widest">
        {pad(i + 1)}
      </span>
      <span aria-hidden className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs tracking-widest backdrop-blur">
        {v.dur}
      </span>
      <span aria-hidden className="absolute inset-0 grid place-items-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-white/50 bg-black/30 pl-1 backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/20">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
          </svg>
        </span>
      </span>
      <span aria-hidden className="absolute inset-x-5 bottom-5 flex items-center justify-between text-xs tracking-[0.3em] text-ink/80">
        <span className="font-display text-sm uppercase italic">Motion</span>
        <span>再生する</span>
      </span>
    </button>
  );
}

export default function Motion() {
  const [open, setOpen] = useState<number | null>(null);
  const items: LightboxItem[] = useMemo(
    () =>
      VIDEOS.map((v, i) => ({
        kind: "video",
        src: v.src,
        poster: v.poster,
        alt: v.alt,
        caption: `Motion ${pad(i + 1)}`,
      })),
    [],
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="motion" className="relative overflow-hidden bg-bg2/50 py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-teal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          no="02"
          ja="動く作品"
          en="Motion"
          lead="静止画だけでは収まらない動きを、映像にしました。気になる一本を選んで、再生してみてください。"
        />
        <Reveal
          delay={100}
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {VIDEOS.map((v, i) => (
            <div key={v.id} className={`w-[78vw] shrink-0 snap-center sm:w-auto ${i === 1 ? "sm:mt-12" : ""}`}>
              <Card i={i} onOpen={() => setOpen(i)} />
            </div>
          ))}
        </Reveal>
      </div>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />}
    </section>
  );
}
