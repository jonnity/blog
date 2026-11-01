import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownTocProps = { mdBody: string };

export const MarkdownToc: React.FC<MarkdownTocProps> = ({ mdBody }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      allowedElements={["h2", "h3"]}
      components={{
        h2: (node, ..._rest) => {
          if (typeof node?.children === "string")
            return (
              <p className="pl-4 -indent-4 before:content-['・']">
                <Link href={`#${node.children}`}>{node.children}</Link>
              </p>
            );
        },
        h3: (node, ..._rest) => {
          if (typeof node?.children === "string")
            return (
              <p className="pl-6 -indent-3 text-sm before:content-['-_']">
                <Link href={`#${node.children}`}>{node.children}</Link>
              </p>
            );
        },
      }}
    >
      {mdBody}
    </Markdown>
  );
};
