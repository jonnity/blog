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
import ProfileIcon from "@/assets/icons/profile.svg";
import MonthDisplay from "@/assets/icons/MonthDisplay";
import WorkIcon from "@/assets/icons/work.svg";
import BlogIcon from "@/assets/icons/blog.svg";

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

const iconSize = 45;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} bg-cover bg-fixed bg-repeat-y portrait:bg-ant-nest_portrait landscape:bg-ant-nest_landscape`}
      >
        <header className="sticky top-0 z-50 flex h-12 w-full justify-center bg-orange-200 px-4 md:h-16">
          <div className="flex h-full w-full justify-between">
            <Link href="/" className="relative block h-full w-fit">
              <Image
                src={logoImagePath}
                alt="アズマオオズアリの頭部とキーボードを模したアイコンとjonnityという文字"
                width={0}
                height={0}
                className="h-full w-auto"
              />
            </Link>
            <div className="hidden h-full items-center gap-2 md:flex">
              <IconLink
                href="/profile"
                icon={{
                  type: "img",
                  resource: {
                    src: ProfileIcon,
                    alt: "profileページのアイコン",
                  },
                }}
              />
              <IconLink
                href="/monthly"
                icon={{
                  type: "component",
                  resource: <MonthDisplay height={iconSize} width={iconSize} />,
                }}
              />
              <IconLink
                href="/work"
                icon={{
                  type: "img",
                  resource: {
                    src: WorkIcon,
                    alt: "workページのアイコン",
                  },
                }}
              />
              <IconLink
                href="/blog"
                icon={{
                  type: "img",
                  resource: {
                    src: BlogIcon,
                    alt: "blogページのアイコン",
                  },
                }}
              />
            </div>
          </div>
        </header>
        <div className="relative z-10">{children}</div>
        <Consent />
      </body>
    </html>
  );
}

const IconLink: React.FC<{
  href: string;
  icon:
    | { type: "img"; resource: { src: string; alt: string } }
    | { type: "component"; resource: React.ReactNode };
}> = ({ href, icon }) => {
  switch (icon.type) {
    case "img":
      return (
        <Link href={href}>
          <Image
            src={icon.resource.src}
            alt={icon.resource.alt}
            height={iconSize}
            width={iconSize}
          />
        </Link>
      );
    case "component":
      return <Link href={href}>{icon.resource}</Link>;
  }
};
