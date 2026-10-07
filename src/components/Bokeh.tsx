"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; c: string; ph: number };

const COLORS = ["157,123,255", "95,227,208", "232,201,138", "255,143,199"];

/** ゆっくり昇っていく光の粒。画面外・低モーション設定のときは止める。 */
export default function Bokeh({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let ps: P[] = [];

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const make = (initial: boolean): P => ({
      x: rnd(0, w),
      y: initial ? rnd(0, h) : h + rnd(20, 80),
      r: rnd(6, 34),
      vy: rnd(6, 20),
      vx: rnd(-4, 4),
      a: rnd(0.05, 0.2),
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      ph: rnd(0, 6.28),
    });

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of ps) {
        p.ph += dt * 0.6;
        p.y -= p.vy * dt;
        p.x += p.vx * dt + Math.sin(p.ph) * 0.15;
        if (p.y < -p.r * 2) Object.assign(p, make(false));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(${p.c},${p.a})`);
        g.addColorStop(0.6, `rgba(${p.c},${p.a * 0.45})`);
        g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(14, Math.min(42, Math.round(w / 34)));
      ps = Array.from({ length: n }, () => make(true));
      if (reduce) draw(0);
    };

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (visible) draw(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
