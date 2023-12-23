import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { EntryProp } from "./Entry";

export const MarkdownToc: React.FC<EntryProp> = ({ entry }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      allowedElements={["h2"]}
      components={{
        h2: (node, ..._rest) => {
          if (typeof node?.children === "string")
            return (
              <p className="pl-4 -indent-4 before:content-['・']">
                <Link href={`#${node.children}`}>{node.children}</Link>
              </p>
            );
        },
      }}
    >
      {entry.body}
    </Markdown>
  );
};
