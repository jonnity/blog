"use client";

import { useEffect } from "react";

export interface GoogleAdSenseProps {
  adSlot: string;
  adClient: string;
  width?: number | string;
  height?: number | string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid";
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  testMode?: boolean;
  inArticle?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
  adSlot,
  adClient,
  width = "auto",
  height = "auto",
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  style = {},
  testMode = false,
  inArticle = false,
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  const adStyle: React.CSSProperties = {
    display: "block",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    textAlign: inArticle ? "center" : undefined,
    ...style,
  };

  // 開発環境またはテストモードの場合はダミーIDを使用
  const isDevelopment = process.env.NODE_ENV === "development";
  const isTestMode = testMode || isDevelopment;

  const finalAdClient = isTestMode ? "ca-pub-0000000000000000" : adClient;
  const finalAdSlot = isTestMode ? "0000000000" : adSlot;

  const adProps: Record<string, string> = {
    "data-ad-client": finalAdClient,
    "data-ad-slot": finalAdSlot,
    "data-ad-format": adFormat,
    "data-full-width-responsive": fullWidthResponsive.toString(),
  };

  // 記事内広告の場合
  if (inArticle) {
    adProps["data-ad-layout"] = "in-article";
    adProps["data-ad-format"] = "fluid";
  }

  // 固定サイズが指定されている場合は、width/heightを明示的に設定
  if (!fullWidthResponsive && typeof height === 'number' && typeof width !== 'undefined') {
    // data-ad-formatを削除してデフォルトの動作に任せる
    delete adProps["data-ad-format"];
  }

  // テストモードまたは開発環境の場合はテストパラメータを追加
  if (isTestMode) {
    adProps["data-adtest"] = "on";
  }

  return (
    <ins className={`adsbygoogle ${className}`} style={adStyle} {...adProps} />
  );
};
