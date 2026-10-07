export const pad = (n: number) => String(n).padStart(2, "0");

export type Group = "new" | "archive";

export const GROUPS: { id: Group; label: string }[] = [
  { id: "new", label: "最新作" },
  { id: "archive", label: "これまでの作品" },
];

export type Work = {
  src: string;
  w: number;
  h: number;
  alt: string;
  group: Group;
  title?: string; // 作品名（Xの投稿に書かれていたもの）
  tag?: string; // ハッシュタグ・カテゴリ
  date?: string; // 投稿日（日本時間）
};

export const workSrc = (n: number) => `/artworks/work-${n}.png`;
const xSrc = (id: string) => `/artworks/x/x-${id}.jpg`;

// ---------------------------------------------------------------
// 最新作（X の投稿から。新しい順。id は投稿ID）
// ---------------------------------------------------------------
const x = (
  id: string,
  w: number,
  h: number,
  date: string,
  alt: string,
  extra: { title?: string; tag?: string } = {},
): Work => ({ src: xSrc(id), w, h, alt, group: "new", date, ...extra });

const NEW_WORKS: Work[] = [
  x("2107025269722956069", 887, 1774, "2026.10.05", "大聖堂のような広間で、剣を手に振り返る少女", {
    title: "誰がために一輪の花は剣を取る",
  }),
  x("2106547094664385004", 1254, 1254, "2026.10.04", "桜と夕景の中、風をまとって舞う赤髪の少女", {
    title: "花の果て、風の先",
  }),
  x("2099695610949685394", 1122, 1402, "2026.09.15", "浮世絵やネオンのコラージュを背に、フーセンガムを膨らませて自撮り棒を向ける和装の少女", {
    title: "RE:WA ― 和を着替える",
    tag: "#AIFUSIONFES",
  }),
  x("2099522875707580508", 1060, 1484, "2026.09.15", "黒振袖に煙管、浮世絵の波とネオンの信号に溶けていく女性", {
    title: "うつろひ / UTSUROI",
    tag: "#AIFUSIONFES",
  }),
  x("2081224812228415630", 1448, 1086, "2026.07.26", "提灯とスピーカーが並ぶ祭の街で、振袖姿で舞う女性", {
    title: "桜華狂騒曲",
  }),
  x("2077656070059901179", 1086, 1448, "2026.07.16", "崩れた街の戦場で、ライフルを構えるゴスロリの少女"),
  x("2075492055938445523", 1086, 1448, "2026.07.10", "弾丸が飛び交う中、ブーツで駆けるゴスロリの少女", {
    tag: "#DynamicActionscene",
  }),
  x("2067394207036395830", 958, 1642, "2026.06.18", "金の甲冑をまとい、二頭の馬が引く戦車に立つ戦士（タロット「戦車」）", {
    title: "7. The Chariot 戦車",
    tag: "#むぎとAIタロットカード",
  }),
  x("2066114616447713306", 1024, 1536, "2026.06.14", "満月の夜、蝶と灯籠に囲まれて立つ金の着物の少女", {
    tag: "#AI月下幻想",
  }),
];

// ---------------------------------------------------------------
// これまでの作品（旧サイトにあったもの）
// ---------------------------------------------------------------
const CATEGORY_LABEL = {
  gothic: "ゴスロリ",
  flamenco: "フラメンコ",
  wa: "和・忍",
  other: "痛車・他",
} as const;

const old = (n: number, w: number, h: number, cat: keyof typeof CATEGORY_LABEL, alt: string): Work => ({
  src: workSrc(n),
  w,
  h,
  alt,
  group: "archive",
  tag: CATEGORY_LABEL[cat],
});

const ARCHIVE_WORKS: Work[] = [
  old(6, 1152, 1536, "wa", "藤の花と蝶に囲まれて刀を携える、着物の少女"),
  old(2, 1024, 1024, "flamenco", "青緑のヴェールをひるがえして舞う踊り子"),
  old(3, 1024, 1024, "other", "アニメの少女を纏った痛車（GT-R）"),
  old(11, 1152, 1536, "wa", "赤い刀を担ぐ、黒装束の忍"),
  old(9, 1024, 1024, "gothic", "雨の中、透明な傘とあじさいに囲まれたゴスロリの少女"),
  old(5, 1024, 1024, "flamenco", "黄金の灯りの中で踊るフラメンコガール"),
  old(7, 1152, 1536, "other", "夜の花畑に立つ、赤髪の少女"),
  old(10, 1024, 1024, "gothic", "ホログラムのパネルに囲まれたサイバーゴスロリの少女"),
  old(1, 1024, 1024, "wa", "疾走する緑衣のくノ一"),
  old(8, 1200, 1200, "wa", "路地に佇む、猫耳の着物の少女"),
];

export const WORKS: Work[] = [...NEW_WORKS, ...ARCHIVE_WORKS];

/** カードやライトボックスに出す文字。caption が主、sub が補足、hover が一覧上の右肩の小さな文字。 */
export function labels(w: Work, indexInGroup: number) {
  if (w.group === "archive") {
    return { caption: `No.${pad(indexInGroup + 1)}`, sub: w.tag ?? "", hover: w.tag ?? "" };
  }
  const parts = [w.title, w.tag, w.date].filter(Boolean) as string[];
  return {
    caption: parts[0] ?? "",
    sub: parts.slice(1).join("　·　"),
    hover: parts.length > 1 ? (w.date ?? "") : "",
  };
}

// ヒーローのスライド（3:4 の窓に収まる絵。1枚目は着物の女性）
export const HERO_SLIDES: { src: string; pos: string; alt: string }[] = [
  { src: workSrc(6), pos: "50% 20%", alt: "藤の花と蝶に囲まれて刀を携える、着物の少女" },
  { src: xSrc("2066114616447713306"), pos: "50% 30%", alt: "満月の夜、蝶と灯籠に囲まれて立つ金の着物の少女" },
  { src: xSrc("2099522875707580508"), pos: "50% 25%", alt: "黒振袖に煙管、浮世絵の波とネオンの信号に溶けていく女性" },
  { src: xSrc("2099695610949685394"), pos: "50% 20%", alt: "浮世絵やネオンのコラージュを背に、フーセンガムを膨らませる和装の少女" },
  { src: xSrc("2067394207036395830"), pos: "50% 30%", alt: "金の甲冑をまとい、二頭の馬が引く戦車に立つ戦士" },
];

export type VideoItem = {
  id: string; // 投稿ID（ファイル名にも使う）
  w: number;
  h: number;
  dur: string;
  date: string;
  alt: string;
  title?: string;
  tag?: string;
  pos?: string; // 一覧のトリミング位置
};

// 動く作品（X の投稿の動画。新しい順）
export const VIDEOS: VideoItem[] = [
  {
    id: "2084918244595679641",
    w: 644,
    h: 960,
    dur: "0:15",
    date: "2026.08.05",
    title: "極彩、宵に舞う",
    alt: "ステンドグラスの広間で、赤い着物の女性が扇を手に舞う",
  },
  {
    id: "2083528190484779144",
    w: 640,
    h: 480,
    dur: "0:10",
    date: "2026.08.01",
    tag: "Grok",
    alt: "浮世絵の壁の前で、黒い着物の女性が腕を広げてひざまずく",
  },
  {
    id: "2058841685430571505",
    w: 448,
    h: 672,
    dur: "0:06",
    date: "2026.05.25",
    title: "蓮光蝶舞",
    alt: "蓮の咲く水辺で、扇を手に舞う着物の女性と蝶",
  },
  {
    id: "2048377968188416454",
    w: 1280,
    h: 720,
    dur: "0:40",
    date: "2026.04.26",
    title: "Bellatrix",
    tag: "Seedance 2.0",
    pos: "64% 50%",
    alt: "霧と炎の街を、銃を手に駆け抜ける女性（アクション映画風のショート動画）",
  },
];

export const videoSrc = (id: string) => `/media/m-${id}.mp4`;
export const videoPoster = (id: string) => `/media/m-${id}.jpg`;

export const CHANNEL_URL = "https://www.youtube.com/channel/UCsLId-xudCR75VP2pBWXHsg";

export const SOCIAL = [
  { name: "X (Twitter)", handle: "@kuroneko0618", href: "https://x.com/kuroneko0618", icon: "x" },
  { name: "Instagram", handle: "@ameshonoyuki", href: "https://www.instagram.com/ameshonoyuki/?hl=ja", icon: "instagram" },
  { name: "Threads", handle: "@ameshonoyuki", href: "https://www.threads.com/@ameshonoyuki", icon: "threads" },
  { name: "YouTube", handle: "アメショのユキチャンネル", href: CHANNEL_URL, icon: "youtube" },
] as const;
