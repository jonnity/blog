import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { EntryManager } from "@/util/entry/Entry";
import { defaultDescription } from "@/util/metaTagInfo";

import { BlogEntry } from "./components/BlogEntry";
import { SideBarInfo } from "./components/SideBarInfo";

type PageParams = { slug: string };

const entryManager = EntryManager.getInstance();
export async function generateStaticParams(): Promise<PageParams[]> {
  const slugList = entryManager.getEntryList().map(({ slug }) => {
    return { slug: slug };
  });
  return slugList;
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;

  if (entryManager.isMonthlyEntry(slug)) {
    const yearMonth = slug.replace(/^monthly-(\d{4}-\d{2})$/, "$1");
    redirect(`/monthly/${yearMonth}`);
  }

  const entry = entryManager.getEntry(slug);
  return (
    <>
      <div className="m-4 flex flex-col justify-center gap-4 lg:mx-0 lg:flex-row">
        <article className="w-full lg:w-3/5 xl:w-1/2">
          <BlogEntry entry={entry} />
        </article>
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <SideBarInfo entry={entry} />
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
  const entry = entryManager.getEntry((await params).slug);

  const title = entry.metadata.title;
  const description = entry.metadata.description || defaultDescription;
  const openGraph = entry.getOGPMetadata();

  return {
    title,
    description,
    openGraph,
  };
}
