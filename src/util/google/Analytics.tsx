"use client";
import Script from "next/script";
import { useIsDeployed } from "./useIsDeployed";

const GA_ID = "G-2Z7BZJHYWR";

export const Gtag = () => {
  const isDeployed = useIsDeployed();
  return isDeployed ? (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script id="define-gtag">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-2Z7BZJHYWR');
      `}</Script>
    </>
  ) : (
    <></>
  );
};
