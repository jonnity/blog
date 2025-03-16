"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";

import burgerIcon from "@/assets/burger-menu.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import MonthDisplay from "@/assets/icons/MonthDisplay";
import WorkIcon from "@/assets/icons/work.svg";
import BlogIcon from "@/assets/icons/blog.svg";
import { IconLink } from "../components/IconLink";
import Link from "next/link";

const iconSize = 35;

type HamburgerProps = {
  children: React.ReactNode;
};

export const Hamburger: React.FC<HamburgerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-4 top-0 z-50 md:hidden">
      {/* Hamburger Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-1 h-fit w-fit rounded bg-orange-300 bg-opacity-80"
        aria-label="Toggle menu"
      >
        {/* Hamburger icon bars with animation */}
        {isOpen ? (
          <Image
            src={burgerIcon}
            alt="ハンバーガーメニュー"
            height={38}
            width={38}
          />
        ) : (
          <span className="h-38 w-[38px] text-4xl">x</span>
        )}
      </button>

      {/* Menu Content */}
      <div
        className={`fixed right-0 mx-auto h-full w-72 bg-white bg-opacity-95 p-4 transition-transform duration-300 ${
          isOpen ? "pointer-events-none translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <nav className="flex flex-col gap-4">
            <LinkWithLabel label={{ href: "/profile", message: "Profile" }}>
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
            </LinkWithLabel>
            <LinkWithLabel label={{ href: "/monthly", message: "Monthly" }}>
              <IconLink
                href="/monthly"
                icon={{
                  type: "component",
                  resource: <MonthDisplay height={iconSize} width={iconSize} />,
                }}
              />
            </LinkWithLabel>
            <LinkWithLabel label={{ href: "/work", message: "Work" }}>
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
            </LinkWithLabel>
            <LinkWithLabel label={{ href: "/blog", message: "Blog" }}>
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
            </LinkWithLabel>
          </nav>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

const LinkWithLabel: React.FC<{
  children: ReactNode;
  label: { href: string; message: string };
}> = ({ children, label }) => (
  <div className="flex items-center">
    {children}
    <Link href={label.href}>
      <span className="p-2 text-2xl">{label.message}</span>
    </Link>
  </div>
);
