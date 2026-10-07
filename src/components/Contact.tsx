import Image from "next/image";
import Reveal from "./Reveal";
import { SOCIAL, workSrc } from "@/lib/data";

function Icon({ name }: { name: (typeof SOCIAL)[number]["icon"] }) {
  if (name === "x")
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r=".7" fill="currentColor" />
      </svg>
    );
  if (name === "youtube")
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.22 22 12 22 12s0-3.22-.4-4.8zM10 15V9l5.2 3L10 15z" />
      </svg>
    );
  return <span className="font-display text-2xl italic leading-none">@</span>;
}

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-28 md:py-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={workSrc(10)} alt="" fill sizes="30vw" quality={40} className="scale-125 object-cover opacity-40 blur-2xl saturate-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="flex items-center justify-center gap-4 font-display text-base italic tracking-[0.3em] text-gold">
            <span>05</span>
            <span className="h-px w-12 bg-gold/50" />
            <span className="font-sans text-xs not-italic tracking-[0.25em] text-muted">お問い合わせ</span>
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-display text-[clamp(3rem,9vw,7rem)] font-medium italic leading-[0.98] tracking-tight">
            <span className="text-gradient">Let&apos;s create</span>
            <br />
            <span className="text-gradient">something together.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-xl leading-[2] text-ink/75">
            新しい機会やコラボレーションを常に歓迎しています。
            <br className="hidden sm:block" />
            お気軽にご連絡ください！
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL.map((s, i) => (
            <Reveal as="li" key={s.name} delay={220 + i * 90}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-9 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-white/[0.07]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
                  <Icon name={s.icon} />
                </span>
                <span className="font-display text-2xl italic tracking-wide">{s.name}</span>
                <span className="text-sm tracking-wider text-muted transition-colors group-hover:text-ink">{s.handle}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
