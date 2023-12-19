import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import type { Components } from "react-markdown";

import { EntryProp } from "./Entry";
import { ImageViewer } from "./ImageViewer";

const srcSchema = z.string();
const altSchema = z.string();
export const MarkdownComponents: Components = {
  em(props) {
    const { node, ...rest } = props;
    return <i style={{ color: "red" }} {...rest} />;
  },
  p: ({ node, ...rest }) => {
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
    return <ImageViewer src={src} alt={alt} caption={secondChild.value} />;
  },
  a(prop) {
    if (prop.node?.children[0].type !== "text") {
      throw new Error(
        `markdownにテキストの指定のないリンクがある: ${prop.href}`,
      );
    }

    const target = /^https?:/.test(prop.href || "") ? "_blant" : "_self";
    const textChild = prop.node?.children[0];

    return (
      <a href={prop.href} target={target}>
        {textChild.value}
      </a>
    );
  },
};

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
      components={MarkdownComponents}
    >
      {entry.body}
    </Markdown>
  );
};
