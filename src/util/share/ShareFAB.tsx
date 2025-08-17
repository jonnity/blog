"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import shareIcon from "@/assets/share_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";

export function ShareFAB() {
  const [pageInfo, setPageInfo] = useState<{
    title: string;
    url: string;
  } | null>(null);
  const [isConsentVisible, setIsConsentVisible] = useState(false);

  useEffect(() => {
    setPageInfo({
      title: document.title,
      url: window.location.href,
    });

    // Cookie同意バナーの表示状態を監視
    const checkConsentBanner = () => {
      const banner = document.querySelector("[data-consent-banner]");
      setIsConsentVisible(!!banner);
    };

    // 初期チェック
    checkConsentBanner();

    // MutationObserverでDOM変更を監視
    const observer = new MutationObserver(checkConsentBanner);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!pageInfo) {
    return null;
  }
  // メインコンテンツの幅に基づいて右端の位置を計算
  const getPositionClass = () => {
    // コンテンツ幅: モバイル 368px, タブレット 752px, デスクトップ 880px/960px
    // 画面中央からコンテンツ右端までの距離を計算し、そこからFABを少し内側に配置
    const baseClass = "fixed z-50";
    const bottomClass = isConsentVisible
      ? "bottom-36 md:bottom-24"
      : "bottom-4";

    // 画面中央を基準とした位置計算:
    // 画面中央(50vw) + コンテンツ右端(コンテンツ幅/2) + マージン(16px)から右端までの距離
    // モバイル (< 768px): max(16px, 50vw - 200px) = 50vw - (368px/2 + 16px)
    // タブレット (768px+): max(16px, 50vw - 392px) = 50vw - (752px/2 + 16px)
    // デスクトップ (1024px+): max(16px, 50vw - 456px) = 50vw - (880px/2 + 16px)
    const positionClass =
      "right-12 md:right-[calc(50vw-392px)] lg:right-[calc(50vw-516px)]";

    return `${baseClass} ${bottomClass} ${positionClass}`;
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: pageInfo.title,
          url: pageInfo.url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: シェア機能が利用できない場合はログに記録
      console.log("Native share not available");
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`${getPositionClass()} flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg transition-all duration-200 hover:scale-105`}
      title="シェア"
    >
      <Image
        src={(shareIcon as StaticImageData).src}
        alt="シェア"
        width={24}
        height={24}
        className="h-8 w-8 brightness-0 invert"
      />
    </button>
  );
}
