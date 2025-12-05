import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { EntryManager } from "@/util/entry/Entry";
import { getUpdatedMetadata } from "@/util/metaTagInfo";
import { Hamburger } from "@/util/hamburger/Hamburger";
import { MarkdownToc } from "@/util/entry/components/MarkdownToc";
import { BlogEntry } from "@/util/entry/components/BlogEntry";
import { SideBarInfo } from "@/util/entry/components/SideBarInfo";

const latestMonthly = EntryManager.getInstance().getEntryList(
  undefined,
  "monthly",
)[0];
const monthlyTitle = latestMonthly.slug.replace(
  /^monthly-(\d{4}-\d{2})$/,
  "$1",
);

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
      <div className="entry-with-side-bar-container">
        <article className="main-contents">
          <BlogEntry entry={entry} />
        </article>
        <aside className="side-bar">
          <SideBarInfo mdBody={entry.body} />
        </aside>
        <Hamburger date={new Date(monthlyTitle)}>
          <hr className="mb-6 mt-1 w-full border-gray-900" />
          <div>
            <h2 className="text-xl font-bold">目次</h2>
            <div className="ml-2">
              <MarkdownToc mdBody={entry.body} />
            </div>
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
  const entry = entryManager.getEntry((await params).slug);

  const title = entry.metadata.title;
  const description = entry.metadata.description || null;
  const keywords = entry.metadata.tags;
  const publishedTime = entry.metadata.createdAt.toISOString();
  const modifiedTime = entry.metadata.updatedAt?.toISOString();
  const { url: thumbnailPath } = entry.getThumbnail();

  return getUpdatedMetadata({
    path: `blog/${entry.slug}`,
    title,
    description,
    keywords,
    ogParam: {
      type: "article",
      publishedTime,
      modifiedTime,
      tags: keywords,
      thumbnailPath,
    },
  });
}
