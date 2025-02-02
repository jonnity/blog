import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Inter } from "next/font/google";

import {
  defaultDescription,
  defaultTitle,
  titleParam,
} from "@/util/metaTagInfo";
import { Consent } from "@/util/zaraz/Consent";
const logoImagePath = "/logo_keyboard.svg";

const inter = Inter({ subsets: ["latin"] });

const url = new URL("https://jonnity.com");
const iconImagePath = "/icon_keyboard.webp";
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
  icons: { icon: { url: iconImagePath } },
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
        <header className="mb-4 flex h-16 w-full justify-center bg-orange-200 bg-opacity-80 lg:h-20">
          <div className="mx-4 flex h-full w-full justify-between lg:mx-0 lg:w-11/12 xl:w-3/4">
            <Link href="/" className="relative block h-full w-fit">
              <Image
                src={logoImagePath}
                alt="アズマオオズアリの頭部とキーボードを模したアイコンとjonnityという文字"
                width={0}
                height={0}
                className="h-full w-auto"
              />
            </Link>
            {/* カテゴリ表示をする前提でスタイリングするために、不可視要素を追加 */}
            <p className="invisible self-end">category: hoge</p>
          </div>
        </header>
        {children}
        <Consent />
      </body>
    </html>
  );
}
