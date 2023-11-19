import { EntryProp } from "@/util/entry/Entry";
import { ReactMarkdown } from "@/util/entry/ReactMarkdown";

export const BlogBody: React.FC<EntryProp> = ({ entry }) => {
  return <ReactMarkdown entry={entry} />;
};
