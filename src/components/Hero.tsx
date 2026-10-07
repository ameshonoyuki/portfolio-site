"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Bokeh from "./Bokeh";
import { HERO_SLIDES, pad } from "@/lib/data";

const INTERVAL = 6000;
const CHIPS = ["ゴスロリガール", "フラメンコガール", "痛車", "etc."];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const tilt = useRef<HTMLDivElement>(null);
  const N = HERO_SLIDES.length;

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // 自動送り（ホバー中・低モーション設定では止める）
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % N), INTERVAL);
    return () => clearTimeout(t);
  }, [idx, paused, reduce, N]);

  // マウスに合わせて窓を少し傾ける
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !tilt.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    tilt.current.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
  };
  const onLeave = () => {
    if (tilt.current) tilt.current.style.transform = "";
  };

  return (
    <section
      id="top"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* 背景：いま映っている絵を大きくぼかして、空気の色にする */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {HERO_SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            sizes="25vw"
            quality={40}
            className={`scale-125 object-cover blur-2xl saturate-150 transition-opacity duration-[1800ms] ${
              i === idx ? "opacity-60" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/70 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(8,7,15,0.0),rgba(8,7,15,0.75)_70%)]" />
      </div>
      <Bokeh className="-z-10" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-10 lg:pt-24">
        {/* 文字 */}
        <div className="order-2 lg:order-1">
          <p
            className="hero-fade flex items-center gap-4 font-display text-sm uppercase italic tracking-[0.4em] text-gold sm:text-base"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-px w-10 bg-gold/60" />
            AI Art Atelier
          </p>

          <h1 className="mt-6 font-mincho text-[clamp(2.5rem,5.8vw,5.2rem)] font-extrabold leading-[1.1] tracking-[0.02em]">
            <span className="block overflow-hidden py-[0.06em]">
              <span className="hero-line" style={{ animationDelay: "0.15s" }}>
                アメショの
              </span>
            </span>
            <span className="block overflow-hidden py-[0.06em]">
              <span className="hero-line" style={{ animationDelay: "0.3s" }}>
                <span className="text-shimmer">ユキ</span>のアトリエ
              </span>
            </span>
          </h1>

          <p
            className="hero-fade mt-8 max-w-xl text-[0.95rem] leading-[2] text-ink/80 [text-wrap:balance] sm:text-base"
            style={{ animationDelay: "0.55s" }}
          >
            <span className="inline-block">思わず見てしまうような魅せる絵画のようなAIアートや</span>
            <span className="inline-block">各種ファンアートを発信。</span>
          </p>

          <ul className="hero-fade mt-6 flex flex-wrap gap-2" style={{ animationDelay: "0.7s" }}>
            {CHIPS.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs tracking-wider text-ink/85 backdrop-blur"
              >
                {c}
              </li>
            ))}
          </ul>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.85s" }}>
            <a
              href="#works"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-violet to-[#6f55ff] px-8 py-4 text-sm font-medium tracking-widest text-white shadow-[0_10px_40px_-10px_rgba(157,123,255,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10">作品を見る</span>
              <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/20 px-8 py-4 text-sm tracking-widest text-ink/90 backdrop-blur transition-colors duration-300 hover:border-gold/60 hover:text-gold"
            >
              About
            </a>
          </div>
        </div>

        {/* アーチ窓のスライドショー */}
        <div className="order-1 lg:order-2" style={{ perspective: "1400px" }}>
          <div
            className="relative mx-auto w-[min(62vw,24rem)] lg:w-full lg:max-w-[28rem]"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div
              ref={tilt}
              className="relative aspect-[3/4] transition-transform duration-500 ease-out [transform-style:preserve-3d]"
            >
              <div
                aria-hidden
                className="absolute -inset-8 rounded-t-full bg-gradient-to-br from-violet/45 via-transparent to-teal/30 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-b-3xl rounded-t-full border border-gold/45"
              />
              <div className="absolute inset-0 overflow-hidden rounded-b-3xl rounded-t-full bg-bg2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/20">
                {HERO_SLIDES.map((s, i) => (
                  <Image
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width:1024px) 28rem, 62vw"
                    style={{ objectPosition: s.pos }}
                    className={`object-cover transition-[opacity,transform] duration-[1600ms,8000ms] ease-out ${
                      i === idx ? "scale-[1.07] opacity-100" : "scale-100 opacity-0"
                    }`}
                  />
                ))}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* 送りバー */}
            <div className="mt-8 flex items-center gap-3 px-1">
              <span className="w-16 whitespace-nowrap font-display text-sm italic tracking-widest text-gold">
                {pad(idx + 1)}
                <span className="text-muted"> / {pad(N)}</span>
              </span>
              <div className="flex flex-1 gap-2">
                {HERO_SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-label={`${i + 1}枚目を表示`}
                    aria-current={i === idx}
                    className="group relative h-5 flex-1"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/20 transition-colors group-hover:bg-white/40" />
                    <span
                      className={`absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 origin-left bg-gradient-to-r from-violet to-gold ${
                        i === idx ? (reduce ? "scale-x-100" : "bar-run") : "scale-x-0"
                      }`}
                      style={
                        i === idx
                          ? ({ "--dur": `${INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" } as React.CSSProperties)
                          : undefined
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL */}
      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="font-display text-[0.7rem] uppercase italic tracking-[0.5em] text-muted">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/10">
          <span className="scroll-line absolute inset-0 bg-gold" />
        </span>
      </div>
    </section>
  );
}
