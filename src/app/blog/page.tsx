import { EntryManager } from "@/util/entry/Entry";
import { EntryLink } from "@/util/entry/components/EntryLink";
import { Hamburger } from "@/util/hamburger/Hamburger";
import { getUpdatedMetadata } from "@/util/metaTagInfo";

export default async function BlogPage() {
  const entryManager = EntryManager.getInstance();
  const entries = entryManager.getEntryList(undefined, "blog");
  const notMonthlyEntries = entries.filter(
    (entry) => !entryManager.isMonthlyEntry(entry.slug),
  );

  return (
    <div className="flex w-full justify-center">
      <div className="contents-base my-2 flex w-[368px] flex-col justify-start gap-x-4 p-4 md:w-[752px] lg:w-[880px]">
        <h2 className="text-2xl lg:text-3xl">記事一覧</h2>
        <hr className="mb-1 w-full border-gray-400" />
        <div className="flex flex-wrap gap-4 p-4">
          {notMonthlyEntries.map((entry) => (
            <EntryLink key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
      <Hamburger />
    </div>
  );
}

export const metadata = getUpdatedMetadata({
  path: "/blog",
  title: "ブログエントリ一覧",
  description: "ブログエントリの一覧ページ",
  keywords: null,
  ogParam: { type: "website" },
});
