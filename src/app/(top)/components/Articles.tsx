import Link from "next/link";

import { Entry } from "@/util/entry/Entry";
import { TagListSpan } from "@/util/entry/components/TagListSpan";
import { DateInfoSpan } from "@/util/entry/components/DateInfoSpan";

export function Articles() {
  const entries = Entry.getDiplayedEntriesList();

  return entries.map((entry) => {
    return (
      <Link key={entry.slug} href={`./blog/${entry.slug}`}>
        <article className="border border-solid border-slate-600 p-1">
          <p className="text-xl font-bold">{entry.metadata.title}</p>
          <p>
            <TagListSpan tags={entry.metadata.tags} />
          </p>
          <p className="text-sm">
            <DateInfoSpan
              createdAt={entry.metadata.createdAt}
              updatedAt={entry.metadata.updatedAt}
            />
          </p>
        </article>
      </Link>
    );
  });
}
