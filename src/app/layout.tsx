import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

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
        <header className="max-h-32 w-full bg-slate-200 px-12 py-3">
          <p>todo: title banner</p>
          <h1 className="py-3 text-4xl">
            <Link href="/" className="block w-fit">
              jonnity&apos;s site
            </Link>
          </h1>
        </header>
        <div className="flex w-full justify-center">
          <main className="m-3 flex w-full max-w-7xl flex-col items-center justify-between px-4 py-2 sm:flex-row sm:px-12 sm:py-4 md:px-24">
            <div className="flex w-full flex-col items-center  sm:w-9/12">
              {children}
            </div>
            <aside className="my-4 w-full place-self-start rounded border border-zinc-800 bg-white sm:w-2/12">
              <p className="p-1">Prifile: todo</p>
            </aside>
          </main>
        </div>
        <footer className="w-full"></footer>
      </body>
    </html>
  );
}
