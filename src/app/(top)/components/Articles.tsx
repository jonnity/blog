import Link from "next/link";

import { Entry } from "@/domain/Entry";
import { TagListSpan } from "@/components/Tags";
import { DateInfo } from "@/components/DateInfo";

export function Articles() {
  const entries = Entry.getDiplayedEntriesList();

  return entries.map((entry) => {
    return (
      <Link href={`./blog/${entry.slug}`}>
        <article
          className="m-2 border border-solid border-slate-600 p-1"
          key={entry.slug}
        >
          <p className="text-xl font-bold">{entry.metadata.title}</p>
          <p>
            <TagListSpan tags={entry.metadata.tags} />
          </p>
          <p className="text-sm">
            <DateInfo
              createdAt={entry.metadata.createdAt}
              updatedAt={entry.metadata.updatedAt}
            />
          </p>
        </article>
      </Link>
    );
  });
}
