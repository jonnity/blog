import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import logo_keybourd from "@/assets/logo_keybourd.svg";
import github_logo_black from "@/assets/github-logo-black.svg";
import x_logo_black from "@/assets/x-logo-black.svg";
import threads_logo_black from "@/assets/threads-logo-black.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "jonnity's site",
  description: "Implementing...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={`${inter.className}`}>
        <header className="flex h-16 w-full justify-between bg-gray-50 px-12 py-3 sm:h-20 sm:px-24">
          <Link href="/" className="relative block h-full w-fit">
            <Image
              src={logo_keybourd}
              alt="アズマオオズアリの頭部とキーボードを模したアイコンとjonnityという文字"
              width={0}
              height={0}
              className="h-full w-auto"
            />
          </Link>
          {/* カテゴリ表示をする前提でスタイリングするために、不可視要素を追加 */}
          <p className="invisible self-end">category: hoge</p>
        </header>
        <div className="flex w-full justify-center">
          <main className="m-3 flex w-full max-w-7xl flex-col items-center justify-between px-4 py-2 sm:flex-row sm:px-12 sm:py-4 md:px-24">
            <div className="flex w-full flex-col items-center  sm:w-2/3">
              {children}
            </div>
            <aside className="m-0 w-full place-self-start rounded border border-zinc-800 bg-white p-2 sm:m-4 sm:w-1/3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg">About jonnity: </h2>
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
              <p>
                個人開発やアリ飼育などをして生きています。ゆゆ式が好きです。
              </p>
              <p>
                このサイトは、エンジニア的なアウトプットを中心とした雑多な文章を自由に書ける場所として作りました。
              </p>
            </aside>
          </main>
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
