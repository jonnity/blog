"use client";
import { useState } from "react";
import burgerIcon from "@/assets/burger-menu.svg";
import Image from "next/image";

type HamburgerProps = {
  children: React.ReactNode;
};

export const Hamburger: React.FC<HamburgerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-2 top-[6px] z-50 md:hidden">
      {/* Hamburger Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-fit w-fit rounded bg-orange-200 bg-opacity-80 p-2"
        aria-label="Toggle menu"
      >
        {/* Hamburger icon bars with animation */}
        <Image
          src={burgerIcon}
          alt="ハンバーガーメニュー"
          height={36}
          width={36}
        />
      </button>

      {/* Menu Content */}
      <div
        className={`absolute right-0 top-12 w-64 rounded bg-white bg-opacity-90 p-4 shadow-lg transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
