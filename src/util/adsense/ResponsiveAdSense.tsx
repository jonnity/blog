"use client";

import { GoogleAdSense, GoogleAdSenseProps } from "./GoogleAdSense";

export type AdSize =
  | "banner" // 728x90
  | "leaderboard" // 728x90
  | "medium-rectangle" // 300x250
  | "large-rectangle" // 336x280
  | "skyscraper" // 160x600
  | "wide-skyscraper" // 160x600
  | "mobile-banner" // 320x50
  | "large-mobile-banner" // 320x100
  | "square" // 250x250
  | "small-square" // 200x200
  | "responsive"; // Auto responsive

interface ResponsiveAdSenseProps
  extends Omit<GoogleAdSenseProps, "width" | "height" | "adFormat"> {
  size: AdSize;
  customWidth?: number | string;
  customHeight?: number | string;
}

const adSizeMap: Record<
  AdSize,
  { width: number | string; height: number | string; adFormat?: string }
> = {
  banner: { width: 728, height: 90, adFormat: "auto" },
  leaderboard: { width: 728, height: 90, adFormat: "auto" },
  "medium-rectangle": { width: 300, height: 250, adFormat: "rectangle" },
  "large-rectangle": { width: 336, height: 280, adFormat: "rectangle" },
  skyscraper: { width: 160, height: 600, adFormat: "vertical" },
  "wide-skyscraper": { width: 160, height: 600, adFormat: "vertical" },
  "mobile-banner": { width: 320, height: 50, adFormat: "auto" },
  "large-mobile-banner": { width: 320, height: 100, adFormat: "auto" },
  square: { width: 250, height: 250, adFormat: "rectangle" },
  "small-square": { width: 200, height: 200, adFormat: "rectangle" },
  responsive: { width: "auto", height: "auto", adFormat: "auto" },
};

export const ResponsiveAdSense: React.FC<ResponsiveAdSenseProps> = ({
  size,
  customWidth,
  customHeight,
  className = "",
  style = {},
  ...props
}) => {
  const sizeConfig = adSizeMap[size];

  const finalWidth = customWidth || sizeConfig.width;
  const finalHeight = customHeight || sizeConfig.height;

  const responsiveClassName =
    size === "responsive"
      ? `w-full max-w-full h-auto min-h-[50px] sm:min-h-[90px] md:min-h-[250px] ${className}`
      : className;

  return (
    <GoogleAdSense
      {...props}
      width={finalWidth}
      height={finalHeight}
      adFormat={sizeConfig.adFormat as any}
      className={responsiveClassName}
      style={style}
      fullWidthResponsive={size === "responsive"}
    />
  );
};
