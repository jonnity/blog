import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <main>{children}</main>
        <footer className="mt-4 w-full"></footer>
      </body>
    </html>
  );
}
