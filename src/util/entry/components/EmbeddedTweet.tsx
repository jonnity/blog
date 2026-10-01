"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

type Prop = { idOrUrl: string };
export const EmbeddedTweet: React.FC<Prop> = ({ idOrUrl }) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = parseTweetId(idOrUrl);

  useEffect(() => {
    // @ts-expect-error
    window.twttr?.widgets.load(ref.current);
  }, [id]);

  return (
    <>
      <div
        className="flex justify-center"
        dangerouslySetInnerHTML={{ __html: generateEmbedHtml(id) }}
        ref={ref}
      />
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </>
  );
};

const TWEET_ID_PATTERN = /^\d+$/u;
// https://x.com/<user>/status/<id> 形式のURL。twitter.comやwww./mobile.付き、
// /i/web/status/<id>、クエリパラメータ付きのものも受け付ける。
const TWEET_URL_PATTERN =
  /^https?:\/\/(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/(?:i\/web|[A-Za-z0-9_]+)\/status(?:es)?\/(\d+)(?:[/?#].*)?$/u;

const parseTweetId = (idOrUrl: string): string => {
  const trimmed = idOrUrl.trim();
  if (TWEET_ID_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const matched = TWEET_URL_PATTERN.exec(trimmed);
  if (matched) {
    return matched[1];
  }

  throw new Error(`Invalid tweet ID or URL: ${idOrUrl}`);
};

const generateEmbedHtml = (id: string): string => {
  return `<blockquote class="twitter-tweet"><a href="https://twitter.com/i/status/${id}"></a></blockquote>`;
};
