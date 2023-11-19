import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { EntryProp } from "./Entry";
import { MarkdownComponents } from "./MarkdownComponents";

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
