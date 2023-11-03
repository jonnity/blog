import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>
        <main className="flex w-full flex-col items-center justify-between  px-4 py-12">
          <header className="w-full">
            <h1 className="text-4xl">jonnity&apos;s site</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
