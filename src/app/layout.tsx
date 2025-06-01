import "./globals.css";

import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

import { defaultMetadata } from "@/util/metaTagInfo";
import { Consent } from "@/util/zaraz/Consent";
import { IconLink } from "@/util/profile/IconLink";
import ProfileIcon from "@/assets/icons/profile.svg";
import MonthDisplay from "@/assets/icons/MonthDisplay";
import WorkIcon from "@/assets/icons/work.svg";
import BlogIcon from "@/assets/icons/blog.svg";

const logoImagePath = "/logo_keyboard.svg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = defaultMetadata;

const iconSize = 45;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} bg-cover bg-fixed bg-repeat-y portrait:bg-[url(/bg-ant-nest_portrait.webp)] landscape:bg-[url(/bg-ant-nest_landscape.webp)]`}
      >
        <header className="sticky top-0 z-30 flex h-12 w-full justify-center bg-orange-200 px-4 md:h-16">
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
                  size: iconSize,
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
                  size: iconSize,
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
                  size: iconSize,
                }}
              />
            </div>
          </div>
        </header>
        {children}
        <footer className="flex place-content-center">
          <div className="flex w-fit flex-col items-center self-center rounded-lg bg-gray-100 bg-opacity-75 px-2 text-sm text-gray-800">
            <a href="/profile" className="hover:underline">
              Privacy Policy
            </a>
            <p>© jonnity 2023 - {new Date().getFullYear()}</p>
          </div>
        </footer>
        <Consent />
      </body>
    </html>
  );
}
