import { Suspense } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";
const srcSchema = z.string();
const altSchema = z.string();

import { EntryProp } from "../Entry";
import { ImageViewer } from "./ImageViewer";
import { SyntaxHighlightedCodeBlock } from "./SyntaxHilightedCodeBlock";
import { IframeYoutubePlayer } from "./IframeYoutubePlayer";

export const ReactMarkdown: React.FC<EntryProp> = ({ entry }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      className={"entry-written-in-md"}
      urlTransform={(url, _key, { tagName }) => {
        if (tagName === "img") {
          return /^https?:/.test(url) ? url : `/entry/${entry.slug}/${url}`;
        }
        return url;
      }}
      components={{
        p({ node, ...rest }) {
          const defaultParagraph = <p>{rest.children}</p>;
          const firstChild = node?.children[0];
          const secondChild = node?.children[1];
          const firstChildIsImage =
            firstChild?.type === "element" && firstChild.tagName === "img";
          const secondChildIsText = secondChild?.type === "text";
          if (
            typeof node?.children?.length !== "number" ||
            node.children.length !== 2 ||
            !firstChildIsImage ||
            !secondChildIsText
          ) {
            return defaultParagraph;
          }

          const src = srcSchema.parse(firstChild.properties.src);
          const alt = altSchema.parse(firstChild.properties.alt);
          return (
            <Suspense>
              <ImageViewer src={src} alt={alt} caption={secondChild.value} />
            </Suspense>
          );
        },
        a(prop) {
          const { node, href, ...rest } = prop;
          if (node?.children.length === 0) {
            throw new Error(`Titleの指定のないリンクがある: ${href}`);
          }
          const target = /^https?:/.test(prop.href || "") ? "_blant" : "_self";
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
      {entry.body}
    </Markdown>
  );
};
