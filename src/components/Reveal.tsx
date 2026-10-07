"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "li" | "section" | "h2" | "ul";
};

/** 画面に入ったらふわっと出す。初回のみ。 */
export default function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `reveal ${shown ? "is-in" : ""} ${className}`,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}
