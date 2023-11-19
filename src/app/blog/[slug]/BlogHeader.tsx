import { EntryProp } from "@/util/entry/Entry";
import { DateInfoSpan } from "@/util/entry/DateInfoSpan";
import { TagListSpan } from "@/util/entry/TagListSpan";

export const BlogHeader: React.FC<EntryProp> = ({ entry }) => {
  return (
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
  );
};
