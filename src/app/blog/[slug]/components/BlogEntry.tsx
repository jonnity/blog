import { EntryProp } from "@/util/entry/Entry";
import { DateInfoSpan } from "@/util/entry/DateInfoSpan";
import { ReactMarkdown } from "@/util/entry/ReactMarkdown";
import { TagListSpan } from "@/util/entry/TagListSpan";

export const BlogEntry: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <div className="contents-base  p-4">
        <div>
          <h1 className="text-3xl font-bold">{entry.metadata.title}</h1>
          <p>
            <TagListSpan tags={entry.metadata.tags} />
          </p>
          <p>
            <DateInfoSpan
              createdAt={entry.metadata.createdAt}
              updatedAt={entry.metadata.updatedAt}
            />
          </p>
        </div>
        <hr className="my-4 w-full border-gray-400" />
        <ReactMarkdown entry={entry} />
      </div>
    </>
  );
};
