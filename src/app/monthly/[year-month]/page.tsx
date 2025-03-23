import type { Metadata } from "next";

import { EntryManager } from "@/util/entry/Entry";
import { defaultDescription } from "@/util/metaTagInfo";
import { Hamburger } from "@/util/hamburger/Hamburger";
import { BlogEntry } from "@/util/entry/components/BlogEntry";
import { SideBarInfo } from "@/util/entry/components/SideBarInfo";
import { MarkdownToc } from "@/util/entry/components/MarkdownToc";
import { MonthlySelector } from "@/util/entry/components/monthly/MonthlySelector";
import { MonthlyParts } from "@/util/entry/components/monthly/MonthlyParts";

type PageParams = { "year-month": string };

const entryManager = EntryManager.getInstance();
const monthlyEntries = entryManager
  .getEntryList()
  .filter((entry) => entryManager.isMonthlyEntry(entry.slug));
const yearMonthList = monthlyEntries.map((entry) => {
  const yearMonth = entry.slug.replace(/^monthly-(\d{4}-\d{2})$/, "$1");
  return yearMonth;
});

export async function generateStaticParams(): Promise<PageParams[]> {
  return yearMonthList.map((yearMonth) => ({
    "year-month": yearMonth,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { "year-month": yearMonth } = await params;
  const slug = `monthly-${yearMonth}`;
  const entry = entryManager.getEntry(slug);

  return (
    <>
      <div className="mt-2 flex w-[368px] flex-col gap-4 justify-self-center md:w-[752px] md:flex-row lg:w-[1000px]">
        <article className="w-full md:w-[448px] lg:w-[664px]">
          <BlogEntry entry={entry} />
        </article>
        <aside className="w-full md:w-[288px] lg:w-[320px]">
          <SideBarInfo mdBody={entry.body} />
          <div className="mt-2 hidden md:block">
            <MonthlySelector
              yearMonthList={yearMonthList}
              currentYearMonth={yearMonth}
            />
          </div>
        </aside>
        <Hamburger>
          <hr className="mb-6 mt-1 w-full border-gray-900" />
          <div>
            <h2 className="text-xl font-bold">目次</h2>
            <div className="ml-2">
              <MarkdownToc mdBody={entry.body} />
            </div>
            <hr className="my-3 border-2 border-dashed border-gray-300" />
            <h2 className="text-xl font-bold">過去の月記</h2>
            <MonthlyParts
              yearMonthList={yearMonthList}
              currentYearMonth={yearMonth}
            />
          </div>
        </Hamburger>
      </div>
    </>
  );
}

type MetadataProps = {
  params: Promise<PageParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { "year-month": yearMonth } = await params;
  const entry = entryManager.getEntry(`monthly-${yearMonth}`);

  const title = entry.metadata.title;
  const description = entry.metadata.description || defaultDescription;
  const openGraph = entry.getOGPMetadata();

  return {
    title,
    description,
    openGraph,
  };
}
