import { PageContainer } from "@/util/layout/PageContainer";
import { EntryManager } from "@/util/entry/Entry";
import { EntryLink } from "@/util/entry/components/EntryLink";
import { getUpdatedMetadata } from "@/util/metaTagInfo";
import { GoogleAdSense } from "@/util/adsense";

export default async function BlogPage() {
  const entryManager = EntryManager.getInstance();
  const entries = entryManager.getEntryList(undefined, "blog");
  const notMonthlyEntries = entries.filter(
    (entry) => !entryManager.isMonthlyEntry(entry.slug),
  );

  return (
    <PageContainer className="flex flex-col justify-start">
      <h2 className="text-2xl lg:text-3xl">記事一覧</h2>
      <hr className="mb-1 w-full border-gray-400" />
      <div className="flex flex-col gap-4 p-3 md:flex-row md:flex-wrap md:gap-6 lg:gap-4">
        {notMonthlyEntries
          .map((entry, index) => [
            <EntryLink key={entry.slug} entry={entry} />,
            /* Insert in-feed ad after every 6 entries */
            (index + 4) % 6 === 0 && (
              <div
                key={`ad-${index}`}
                className="my-4 h-fit w-full md:w-[336px] lg:w-[264px]"
              >
                <GoogleAdSense
                  adClient="ca-pub-7514123900838543"
                  adSlot="9478812847"
                  adFormat="fluid"
                  fullWidthResponsive={false}
                />
              </div>
            ),
          ])
          .flat()
          .filter(Boolean)}
      </div>
    </PageContainer>
  );
}

export const metadata = getUpdatedMetadata({
  path: "/blog",
  title: "ブログエントリ一覧",
  description: "ブログエントリの一覧ページ",
  keywords: null,
  ogParam: { type: "website" },
});
