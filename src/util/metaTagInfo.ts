import { Metadata } from "next";

const defaultTitle = {
  default: "jonnity's blog / portfolio",
  template: `%s | jonnity`,
};
const defaultDescription =
  "個人開発の進捗報告や、アリ飼育の様子などを書くブログサイトです";
const defaultKeywords = [
  "個人開発",
  "エンジニア",
  "アリ飼育",
  "ブログ",
  "ポートフォリオ",
];
const name = "jonnity";

const baseUrl = new URL("https://jonnity.com");
const logoImagePath = "/logo_keyboard.svg";
const iconImagePath = "/icon_keyboard.webp";

export const defaultMetadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  abstract: defaultDescription,
  keywords: defaultKeywords,
  creator: name,
  publisher: name,

  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: baseUrl,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: baseUrl,
    siteName: defaultTitle.default,
    locale: "ja_JP",
    type: "profile",
    images: [{ url: logoImagePath }],
  },
  robots: { index: true },
  icons: { icon: { url: iconImagePath } },
};

type EditableMetadata = Required<
  Pick<Metadata, "title" | "description" | "keywords">
> & {
  path: string;
  ogParam:
    | { type: "profile" }
    | {
        type: "article";
        publishedTime: string;
        modifiedTime?: string;
        tags: string[];
      };
};

export const getUpdatedMetadata: (metadata: EditableMetadata) => Metadata = (
  metadata,
) => {
  metadata.title;
  const keywords = !metadata.keywords
    ? defaultKeywords
    : typeof metadata.keywords == "string"
      ? [...defaultKeywords, metadata.keywords]
      : [...defaultKeywords, ...metadata.keywords];
  const url = metadata.path ? new URL(metadata.path, baseUrl) : baseUrl;

  const commonOgParam = {
    title: metadata.title || { absolute: defaultTitle.default },
    description: metadata.description || defaultDescription,
    url,
    siteName: defaultTitle.default,
    locale: "ja_JP",
    images: [{ url: logoImagePath }],
  };
  const openGraph =
    metadata.ogParam.type == "profile"
      ? {
          type: metadata.ogParam.type,
          username: "jonnity",
          ...commonOgParam,
        }
      : {
          type: metadata.ogParam.type,
          publishedTime: metadata.ogParam.publishedTime,
          modifiedTime: metadata.ogParam.modifiedTime,
          tags: metadata.ogParam.tags,
          authors: "jonnity",
          ...commonOgParam,
        };

  return {
    title: metadata.title || { absolute: defaultTitle.default },
    description: metadata.description || defaultDescription,
    keywords,

    metadataBase: baseUrl,
    openGraph,
  };
};
