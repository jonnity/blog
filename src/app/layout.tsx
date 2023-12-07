import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import github_logo_black from "@/assets/github-logo-black.svg";
import x_logo_black from "@/assets/x-logo-black.svg";
import threads_logo_black from "@/assets/threads-logo-black.svg";

const inter = Inter({ subsets: ["latin"] });

const title = "jonnity blog";
const description =
  "個人開発の進捗報告や、アリ飼育の様子などを書くブログサイトです";
const url = new URL("https://jonnity.com");
const logoImagePath = "/logo_keybourd.svg";
export const metadata: Metadata = {
  title: `${title} | top`,
  description,

  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["個人開発", "エンジニア", "アリ飼育"],
  creator: "jonnity",
  publisher: "jonnity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: url,
  openGraph: {
    title,
    description,
    url: url.toString(),
    siteName: title,
    locale: "ja_JP",
    type: "profile",
    images: [{ url: logoImagePath }],
  },
  icons: { icon: { url: logoImagePath } },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "jonnity",
    creatorId: "@jonnied_man",
    images: [logoImagePath],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={`${inter.className} bg-orange-50`}>
        <header className="flex h-16 w-full justify-center bg-orange-200 lg:h-20">
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
        <div className="m-4 flex flex-col justify-center lg:mx-0 lg:flex-row">
          {/* <main className="flex w-1/2 flex-col items-center justify-between px-8 py-2 sm:flex-row sm:px-12 sm:py-4 md:px-24"> */}
          <main className="mb-4 flex w-full rounded border border-gray-300 bg-gray-50 p-4 shadow-xl lg:w-3/5 xl:w-1/2">
            {children}
          </main>
          <aside className="m-0 w-full place-self-start rounded border border-gray-300 bg-gray-50 p-2 shadow-xl lg:mx-4 lg:w-1/4 xl:w-1/5">
            <div className="flex items-center gap-2">
              <h2 className="pr-1 text-lg">About jonnity</h2>
              <SNSLogoWithLink
                logo={github_logo_black}
                alt="github logo linked to the user page of @jonnity"
                url="https://github.com/jonnity"
              />
              <SNSLogoWithLink
                logo={x_logo_black}
                alt="X (SNS) logo linked to the user page of @jonnied_man"
                url="https://twitter.com/jonnied_man"
              />
              <SNSLogoWithLink
                logo={threads_logo_black}
                alt="threads logo linked to the user page of @jonnied_man"
                url="https://www.threads.net/@jonnied_man"
              />
            </div>
            <hr className="my-1" />
            <p>個人開発やアリ飼育などをして生きています。ゆゆ式が好きです。</p>
            <p>
              このサイトは、エンジニア的なアウトプットを中心とした雑多な文章を自由に書ける場所として作りました。
            </p>
          </aside>
        </div>
        <footer className="w-full"></footer>
      </body>
    </html>
  );
}

type Prop = {
  logo: StaticImageData;
  alt: string;
  url: string;
};
const SNSLogoWithLink: React.FC<Prop> = ({ logo, alt, url }) => {
  const fixedHeight = 20;
  return (
    <Link href={url} target="_blank">
      <Image
        src={logo}
        alt={alt}
        height={fixedHeight}
        width={logo.width * (fixedHeight / logo.height)}
      ></Image>
    </Link>
  );
};
