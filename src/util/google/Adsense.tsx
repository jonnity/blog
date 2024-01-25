"use client";
import Script from "next/script";
import { useEffect } from "react";
import { useIsDeployed } from "./useIsDeployed";

declare global {
  var adsbygoogle: unknown[];
}

export const Adsbygoogle = () => {
  const isDeployed = useIsDeployed();
  return isDeployed ? (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7514123900838543"
      crossOrigin="anonymous"
    ></Script>
  ) : (
    <></>
  );
};

export const ResponsiveDisplayAdd = () => {
  const isDeployed = useIsDeployed();
  useEffect(() => {
    try {
      isDeployed && (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      // console.error(error);
    }
  }, []);

  return (
    <div className={`h-full w-full ${isDeployed ? "" : "bg-white"}`}>
      {isDeployed ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7514123900838543"
          data-ad-slot="8144135865"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <span>dev mode</span>
      )}
    </div>
  );
};
