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
        className={`h-fit w-fit rounded bg-orange-200 bg-opacity-80 p-2 ${isOpen ? "hidden" : ""}`}
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

      {/* Full-screen Menu Content */}
      <div
        className={`fixed inset-0 z-40 bg-white bg-opacity-95 px-6 py-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-3xl"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
