import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import YouTubeList from "./YouTubeList";
import { CHANNEL_URL } from "@/lib/data";
import { getLatestVideos } from "@/lib/youtube";

/** チャンネルの最新動画を自動で並べる（1時間ごとに更新）。 */
export default async function YouTube() {
  const videos = await getLatestVideos(5);

  return (
    <section id="youtube" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#ff4d6d]/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          no="03"
          ja="MV・動画"
          en="YouTube"
          lead="音楽とAIアートを組み合わせたMVを、YouTubeで公開しています。"
        />
        <YouTubeList videos={videos} />
        <Reveal delay={200} className="mt-12 flex justify-center lg:justify-start">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm tracking-widest text-ink/90 backdrop-blur transition-colors duration-300 hover:border-gold/60 hover:text-gold"
          >
            チャンネルを見る
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
