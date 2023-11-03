import Link from "next/link";

import { Entry } from "@/domain/Entriy";

export function Articles() {
  const entryFiles = Entry.getEntriesFileList();
  return entryFiles.map((filename) => {
    const entry = new Entry(filename);
    return entry.isPublic ? (
      <article
        className="relative border border-solid border-slate-600 p-1"
        key={filename}
      >
        <Link
          href={`./blog/${entry.getSlug()}`}
          className="absolute inset-0 z-10"
        ></Link>
        <p className="text-xl">{entry.metadata.title}</p>
        <p>created at {entry.metadata.createdAt.toLocaleDateString()}</p>
        {entry.metadata.tags.length > 0 ? (
          <p>tags: {entry.metadata.tags.join(", ")}</p>
        ) : (
          <p>no tags</p>
        )}
      </article>
    ) : null;
  });
}
