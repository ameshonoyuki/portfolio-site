import { CHANNEL_URL } from "./data";

export type YT = { id: string; title: string; published: string };

const CHANNEL_ID = CHANNEL_URL.split("/").pop() as string;

// フィードが取れなかったとき用（2026-10 時点の最新）
const FALLBACK: YT[] = [
  { id: "alcnePj1sjA", title: "黒百合 / KUROYURI — アメショのユキ【MV】", published: "2026-10-04" },
  { id: "X0GDnSM28fU", title: "紅蓮 / KOUREN - Hardstyle MV｜侍と花魁、ネオンの花街", published: "2026-09-12" },
  { id: "Xsggomk-jUE", title: "凪紗 - Nagisa - Third MV『守るだけ/ Fate in the Rain』", published: "2025-11-02" },
  { id: "HIy1W5CKjVo", title: "凪紗 - Nagisa - Second MV『Midnight Trick Parade🎃(feat. Nemu)』", published: "2025-10-25" },
  { id: "-0XYhjflVS0", title: "凪紗 - Nagisa - 『Speedster』", published: "2025-10-10" },
];

const decode = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/:jack_o_lantern:/g, "🎃");

/**
 * チャンネルの公開フィード（APIキー不要）から最新の動画を取る。
 * 1時間ごとに自動で更新される。ショートは除く。失敗したら固定のリストを返す。
 */
export async function getLatestVideos(limit = 5): Promise<YT[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const xml = await res.text();

    const videos: YT[] = [];
    const entry = /<entry>([\s\S]*?)<\/entry>/g;
    let m: RegExpExecArray | null;
    while ((m = entry.exec(xml))) {
      const b = m[1];
      const id = /<yt:videoId>([\w-]{11})<\/yt:videoId>/.exec(b)?.[1];
      const title = /<title>([\s\S]*?)<\/title>/.exec(b)?.[1];
      const published = /<published>(\d{4}-\d{2}-\d{2})/.exec(b)?.[1];
      const href = /<link rel="alternate" href="([^"]+)"/.exec(b)?.[1] ?? "";
      if (!id || !title || !published || href.includes("/shorts/")) continue;
      videos.push({ id, title: decode(title).trim(), published });
    }
    return videos.length ? videos.slice(0, limit) : FALLBACK.slice(0, limit);
  } catch {
    return FALLBACK.slice(0, limit);
  }
}
