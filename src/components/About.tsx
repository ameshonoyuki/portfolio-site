import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { workSrc } from "@/lib/data";

const ExternalIcon = () => (
  <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

const cardBase =
  "group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-colors duration-300";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading no="04" ja="私について" en="About" />

        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* 2枚重ねの絵 */}
          <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl ring-1 ring-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <Image
                src="/artworks/x/x-2082209484949090572.jpg"
                alt="月夜の庭で水面に触れる猫耳の少女。水面に和歌が光っている"
                fill
                sizes="(min-width:1024px) 28rem, 90vw"
                className="object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
            </div>
            <div aria-hidden className="absolute -inset-3 -z-10 translate-x-3 translate-y-3 rounded-t-full rounded-b-3xl border border-gold/40" />
            <div className="absolute -bottom-8 -right-4 w-40 rotate-3 overflow-hidden rounded-2xl border-2 border-gold/60 shadow-2xl sm:-right-10 sm:w-48">
              <Image
                src={workSrc(9)}
                alt="雨の中、透明な傘とあじさいに囲まれたゴスロリの少女"
                width={1024}
                height={1024}
                sizes="12rem"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          {/* 文章 */}
          <div>
            <Reveal delay={60}>
              <p className="font-mincho text-[clamp(1.35rem,2.6vw,2rem)] font-bold leading-[1.7]">
                こんにちは、<span className="text-gradient">アメショのユキ</span>です。
                <br />
                美しく魅せるAIアートを目指し、日々技術を磨いています。
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 leading-[2] text-ink/75">
                TMAやCNPのファンアートを通じて、コミュニティーの皆さんに楽しんでもらえる作品を目指しています。
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4">
              <Reveal as="li" delay={200}>
                <div className={`${cardBase} hover:border-violet/50`}>
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet/30 to-teal/20 text-violet">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="9" y="3" width="6" height="11" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl italic tracking-wide">Today&apos;s TMA Radio</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      TMA幹部クロエとして、X（Twitter）Spacesの公式ラジオで火曜ホストを務めています。
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal as="li" delay={280}>
                <a
                  href="https://stand.fm/channels/65cf85580a4a74f98f461b16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardBase} hover:border-gold/60`}
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={workSrc(4)} alt="" fill sizes="4rem" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl italic tracking-wide">
                      Stand.fm <span className="font-mincho text-base not-italic">｜クロエのおしゃべり場</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      <span className="font-display text-lg italic text-gold">450+</span> エピソードを毎日配信しているポッドキャスト。
                    </p>
                  </div>
                  <span className="text-muted transition-colors group-hover:text-gold">
                    <ExternalIcon />
                  </span>
                </a>
              </Reveal>

              <Reveal as="li" delay={360}>
                <a
                  href="https://opensea.io/collection/bailarina-5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardBase} hover:border-teal/60`}
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={workSrc(5)} alt="" fill sizes="4rem" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl italic tracking-wide">OpenSea</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      NFTコレクター（TOL-Pass &amp; CNPホルダー）。コレクションはこちら。
                    </p>
                  </div>
                  <span className="text-muted transition-colors group-hover:text-teal">
                    <ExternalIcon />
                  </span>
                </a>
              </Reveal>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
