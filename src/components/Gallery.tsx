"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Lightbox, { type LightboxItem } from "./Lightbox";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { GROUPS, WORKS, labels, type Group } from "@/lib/data";

export default function Gallery() {
  const [group, setGroup] = useState<Group>("new");
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(() => WORKS.filter((w) => w.group === group), [group]);
  const items: LightboxItem[] = useMemo(
    () =>
      list.map((w, i) => {
        const l = labels(w, i);
        return { kind: "image", src: w.src, w: w.w, h: w.h, alt: w.alt, caption: l.caption, sub: l.sub };
      }),
    [list],
  );
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="works" className="relative py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[34rem] w-[34rem] rounded-full bg-violet/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          no="01"
          ja="作品紹介"
          en="Works"
          lead="最近の投稿から選んだ作品です。絵画のような一枚を、ゆっくりご覧ください。"
        />

        <Reveal delay={120} className="mb-10 flex flex-wrap gap-2.5">
          {GROUPS.map((g) => {
            const on = group === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroup(g.id)}
                aria-pressed={on}
                className={`rounded-full border px-5 py-2 text-sm tracking-wider transition-all duration-300 ${
                  on
                    ? "border-transparent bg-gradient-to-r from-violet to-[#6f55ff] text-white shadow-[0_8px_30px_-8px_rgba(157,123,255,0.8)]"
                    : "border-white/15 text-muted hover:border-white/40 hover:text-ink"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </Reveal>

        <div key={group} className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {list.map((w, i) => {
            const l = labels(w, i);
            return (
              <button
                key={w.src}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${l.caption || w.alt}を拡大して見る`}
                className="card-in group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-bg2 text-left"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <Image
                  src={w.src}
                  width={w.w}
                  height={w.h}
                  alt={w.alt}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span aria-hidden className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="min-w-0 font-mincho text-base font-bold leading-snug tracking-wider">{l.caption}</span>
                  {l.hover && (
                    <span className="shrink-0 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs tracking-widest backdrop-blur">
                      {l.hover}
                    </span>
                  )}
                </span>
                <span aria-hidden className="absolute right-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full border border-white/30 bg-black/30 opacity-0 backdrop-blur transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                    <path d="M10 4H4v6M14 20h6v-6M4 4l6 6M20 20l-6-6" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />}
    </section>
  );
}
