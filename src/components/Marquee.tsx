const ITEMS = [
  "Gothic Lolita",
  "ゴスロリガール",
  "Flamenco",
  "フラメンコガール",
  "Itasha",
  "痛車",
  "Fan Art",
  "ファンアート",
  "AI Art",
];

function Row() {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {ITEMS.map((t, i) => (
        <li key={t} className="flex items-center">
          <span
            className={`px-8 text-4xl sm:text-5xl ${
              i % 2 === 0 ? "font-display italic text-outline" : "font-mincho font-bold text-ink/85"
            }`}
          >
            {t}
          </span>
          <span className="text-gold/70">✦</span>
        </li>
      ))}
    </ul>
  );
}

/** ヒーローとギャラリーの間を流れる帯。装飾なので読み上げ対象から外す。 */
export default function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-white/10 bg-bg2/60 py-6" role="presentation">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
