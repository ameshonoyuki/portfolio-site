"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "works", en: "Works", ja: "作品" },
  { id: "motion", en: "Motion", ja: "動く作品" },
  { id: "youtube", en: "YouTube", ja: "MV" },
  { id: "about", en: "About", ja: "私について" },
  { id: "contact", en: "Contact", ja: "連絡" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const bar = useRef<HTMLDivElement>(null);

  // スクロール量 → 上部のバー + ヘッダーの背景
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // いま見ているセクションに下線
  useEffect(() => {
    const els = ["top", ...LINKS.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id === "top" ? "" : e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // メニューを開いている間はスクロールさせない
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled || open ? "border-white/10 bg-bg/70 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" onClick={() => setOpen(false)} className="flex items-baseline gap-3">
            <span className="font-mincho text-lg font-bold tracking-wider">アメショのユキ</span>
            <span className="font-display text-sm italic tracking-[0.25em] text-gold">atelier</span>
          </a>

          <nav className="hidden lg:block" aria-label="メインメニュー">
            <ul className="flex items-center gap-9">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`group relative inline-flex items-baseline gap-2 py-2 text-sm transition-colors ${
                      active === l.id ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <span className="font-display text-base italic tracking-wider">{l.en}</span>
                    <span className="text-[0.65rem] tracking-widest opacity-70">{l.ja}</span>
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gradient-to-r from-violet to-gold transition-transform duration-500 ${
                        active === l.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative h-10 w-10 lg:hidden"
          >
            <span
              className={`absolute left-2.5 right-2.5 h-px bg-ink transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : "top-[14px]"
              }`}
            />
            <span
              className={`absolute left-2.5 right-2.5 h-px bg-ink transition-all duration-300 ${
                open ? "top-1/2 -rotate-45" : "top-[24px]"
              }`}
            />
          </button>
        </div>
        <div
          ref={bar}
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-violet via-teal to-gold"
          style={{ transform: "scaleX(0)" }}
        />
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-9">
          {LINKS.map((l, i) => (
            <li
              key={l.id}
              className={`transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }}
            >
              <a
                href={`#${l.id}`}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="flex flex-col items-center"
              >
                <span className="text-gradient font-display text-5xl italic">{l.en}</span>
                <span className="mt-1 text-xs tracking-[0.3em] text-muted">{l.ja}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
