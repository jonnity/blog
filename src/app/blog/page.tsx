import Link from "next/link";

import { settableTags } from "@/util/entry/settableTags";
import { EntryManager } from "@/util/entry/Entry";
import { EntryLink } from "@/util/entry/components/EntryLink";

const entryManager = EntryManager.getInstance();
export default function BlogPage() {
  return (
    <div className="flex justify-center">
      <main className="contents-base w-11/12 p-4 lg:w-4/5 xl:w-3/5">
        <h2 className="text-3xl">タグ検索</h2>
        <div className="flex flex-wrap gap-4">
          {settableTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="bg-gray-200 text-xl text-black"
            >
              <span>{tag}</span>
            </Link>
          ))}
        </div>
        <h2 className="text-3xl">記事一覧</h2>
        <div className="flex flex-wrap gap-4 p-4">
          {entryManager.getEntryList().map((entry) => (
            <EntryLink key={entry.slug} entry={entry} />
          ))}
        </div>
      </main>
    </div>
  );
}
