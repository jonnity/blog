import { z } from "zod";
import type { Components } from "react-markdown";

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
    return (
      <p className="flex flex-col items-center">
        <img src={src} alt={alt} />
        <span>{secondChild.value}</span>
      </p>
    );
  },
};
