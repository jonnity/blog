import React, { Suspense } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { z } from "zod";
const srcSchema = z.string();
const altSchema = z.string();

import { ImageViewer } from "./ImageViewer";
import { SyntaxHighlightedCodeBlock } from "./SyntaxHighlightedCodeBlock";
import { IframeYoutubePlayer } from "./IframeYoutubePlayer";
import { EmbeddedTweet } from "./EmbeddedTweet";
import { GoogleAdSense } from "@/util/adsense";
type ReactMarkdownProps = { mdBody: string };

export const ReactMarkdown: React.FC<ReactMarkdownProps> = ({ mdBody }) => {
  return (
    <div className="entry-base">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        urlTransform={(url, _key, { tagName }) => {
          if (tagName === "img") {
            return /^https?:/.test(url) ? url : `/entry/${url}`;
          }
          return url;
        }}
        components={{
          p({ node, children }) {
            const defaultParagraph = <p>{children}</p>;
            const firstChild = node?.children[0];
            const firstChildIsImage =
              firstChild?.type === "element" && firstChild.tagName === "img";

            if (
              typeof node?.children?.length !== "number" ||
              node.children.length < 2 ||
              !firstChildIsImage
            ) {
              return defaultParagraph;
            }

            const src = srcSchema.parse(firstChild.properties.src);
            const alt = altSchema.parse(firstChild.properties.alt);

            // Get the caption content - all children except the first image
            // This preserves any formatting, links, or inline code in the caption
            const captionContent = React.Children.toArray(children).slice(1);

            return (
              <Suspense>
                <ImageViewer src={src} alt={alt} caption={captionContent} />
              </Suspense>
            );
          },
          a(prop) {
            const { node, href, ...rest } = prop;
            if (node?.children.length === 0) {
              throw new Error(`Titleの指定のないリンクがある: ${href}`);
            }
            const target = /^https?:/.test(prop.href || "")
              ? "_blank"
              : "_self";
            return <a href={href} target={target} {...rest} />;
          },
          pre({ node, children, ...rest }) {
            const codeNode = node?.children[0];
            const hasCodeChildOnly =
              node?.children.length === 1 &&
              codeNode?.type === "element" &&
              codeNode?.tagName === "code";
            if (!hasCodeChildOnly) {
              return <pre {...rest}>{children}</pre>;
            }

            const code =
              codeNode.children[0].type === "text"
                ? codeNode.children[0].value
                : "";

            const codeClassName = Array.isArray(codeNode.properties.className)
              ? codeNode.properties.className[0].toString()
              : "";
            const [languageInfo, filename] = codeClassName.split(":");
            const language = languageInfo.replace("language-", "");
            if (language === "youtube") {
              return <IframeYoutubePlayer videoId={code} />;
            }
            if (language === "twitter") {
              return <EmbeddedTweet id={code.trim()} />;
            }
            if (language === "adsense") {
              return (
                <div className="my-3">
                  <GoogleAdSense
                    adClient="ca-pub-7514123900838543"
                    adSlot="8119491494"
                    inArticle={true}
                  />
                </div>
              );
            }
            return (
              <SyntaxHighlightedCodeBlock
                code={code.replace(/\n$/, "")}
                language={language}
                filename={filename}
              />
            );
          },
          h2(node) {
            const id = `${node.children}`;
            return !node?.children ? <></> : <h2 id={id}>{node.children}</h2>;
          },
          h3(node) {
            const id = `${node.children}`;
            return !node?.children ? <></> : <h3 id={id}>{node.children}</h3>;
          },
          h4(node) {
            const id = `${node.children}`;
            return !node?.children ? <></> : <h4 id={id}>{node.children}</h4>;
          },
          h5(node) {
            const id = `${node.children}`;
            return !node?.children ? <></> : <h5 id={id}>{node.children}</h5>;
          },
          h6(node) {
            const id = `${node.children}`;
            return !node?.children ? <></> : <h6 id={id}>{node.children}</h6>;
          },
        }}
      >
        {mdBody}
      </Markdown>
    </div>
  );
};
