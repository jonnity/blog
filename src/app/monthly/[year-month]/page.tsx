import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { EntryManager } from "@/util/entry/Entry";
import { defaultDescription } from "@/util/metaTagInfo";
import { BlogEntry } from "../../blog/[slug]/components/BlogEntry";
import { SideBarInfo } from "../../blog/[slug]/components/SideBarInfo";
import { MonthlySelector } from "../components/MonthlySelector";

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
      <div className="m-4 flex flex-col gap-4 justify-self-center md:w-[736px] md:flex-row lg:w-[1000px]">
        <article className="w-full md:w-[440px] lg:w-[664px]">
          <BlogEntry entry={entry} />
        </article>
        <aside className="w-full md:w-[280px] lg:w-[320px]">
          <SideBarInfo entry={entry} />
          <div className="mt-2">
            <MonthlySelector
              yearMonthList={yearMonthList}
              currentYearMonth={yearMonth}
            />
          </div>
        </aside>
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
