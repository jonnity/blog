import Link from "next/link";

import { Entry } from "@/domain/Entry";

export function Articles() {
  const entries = Entry.getDiplayedEntriesList();

  return entries.map((entry) => (
    <Link href={`./blog/${entry.slug}`}>
      <article
        className="relative border border-solid border-slate-600 p-1"
        key={entry.slug}
      >
        <p className="text-xl">{entry.metadata.title}</p>
        <p>created at {entry.metadata.createdAt.toLocaleDateString()}</p>
        <p>
          {entry.metadata.tags.length > 0
            ? `tags: ${entry.metadata.tags.join(", ")}`
            : "no tags"}
        </p>
      </article>
    </Link>
  ));
}
