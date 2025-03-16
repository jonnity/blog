"use client";
import { ReactNode, useState } from "react";

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
        className="m-1 h-fit w-fit rounded bg-orange-300 bg-opacity-80 p-2"
        aria-label="Toggle menu"
      >
        {/* Hamburger icon with animated transformation */}
        <div className="relative h-[24px] w-[24px]">
          <span
            className={`absolute left-0 h-[3px] w-full bg-gray-900 transition-all duration-300 ${
              isOpen ? "top-[10px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-[10px] h-[3px] w-full bg-gray-900 transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-[3px] w-full bg-gray-900 transition-all duration-300 ${
              isOpen ? "top-[10px] -rotate-45" : "top-[20px]"
            }`}
          />
        </div>
      </button>

      {/* Menu Content */}
      <div
        className={`fixed right-0 mx-auto h-full w-72 bg-white bg-opacity-95 p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
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
