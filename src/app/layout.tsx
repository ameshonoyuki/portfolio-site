import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-mincho",
  display: "swap",
});
const sans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const TITLE = "アメショのユキのアトリエ | AIアート ポートフォリオ";
const DESC =
  "ゴスロリガール、フラメンコガール、痛車、ファンアート。絵画のように魅せるAIアートを発信する、アメショのユキのポートフォリオサイト。";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-site-new4.vercel.app"),
  title: TITLE,
  description: DESC,
  openGraph: {
    title: "アメショのユキのアトリエ",
    description: DESC,
    type: "website",
    locale: "ja_JP",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "アメショのユキのアトリエ",
    description: DESC,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#08070f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${mincho.variable} ${sans.variable} ${display.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.hero-line,.hero-fade{animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
