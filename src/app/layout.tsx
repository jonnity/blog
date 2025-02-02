import "./globals.css";

import path from "path";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import {
  defaultDescription,
  defaultTitle,
  titleParam,
} from "@/util/metaTagInfo";
import { Consent } from "@/util/zaraz/Consent";

const inter = Inter({ subsets: ["latin"] });

const url = new URL("https://jonnity.com");
const logoImagePath = "/icon_keyboard.webp";
export const metadata: Metadata = {
  title: titleParam,
  description: defaultDescription,

  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["個人開発", "エンジニア", "アリ飼育", "ブログ", "ポートフォリオ"],
  creator: "jonnity",
  publisher: "jonnity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: url,
  openGraph: {
    title: titleParam,
    description: defaultDescription,
    url: url.toString(),
    siteName: defaultTitle,
    locale: "ja_JP",
    type: "profile",
    images: [{ url: logoImagePath }],
  },
  robots: { index: true },
  icons: { icon: { url: logoImagePath } },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} landscape:bg-ant-nest_landscape bg-cover bg-fixed bg-repeat-y portrait:bg-ant-nest_portrait`}
      >
        {children}
        <Consent />
      </body>
    </html>
  );
}
