import type { Metadata } from "next";

import { WorkManager } from "@/util/work/Work";
import { defaultDescription } from "@/util/metaTagInfo";
import { ReactMarkdown } from "@/util/entry/components/ReactMarkdown";

type PageParams = { slug: string };

const workManager = WorkManager.getInstance();
export async function generateStaticParams(): Promise<PageParams[]> {
  const slugList = workManager.getWorkList().map(({ slug }) => {
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
  const work = workManager.getEntry(slug);
  const thumbnail = work.getThumbnail();

  return (
    <>
      <div className="flex w-full justify-center">
        <article className="contents-base my-2 w-[368px] gap-x-4 p-4 text-gray-900 md:w-[752px] lg:w-[880px]">
          <div className="flex items-center gap-2">
            <img
              src={thumbnail.url}
              alt={thumbnail.alt}
              className="h-[72px] w-[96px] object-fill md:h-[96px] md:w-[128px]"
            />
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">
                {work.metadata.title}
              </h1>
              <p>
                <span className="text-base md:text-lg">
                  {work.metadata.createdAt.toLocaleDateString()} 作成
                  {work.metadata.updatedAt
                    ? ` (${work.metadata.updatedAt.toLocaleDateString()} 更新)`
                    : ""}
                </span>
              </p>
            </div>
          </div>
          <hr className="my-4 w-full border-gray-400" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base md:text-lg lg:text-xl">ジャンル:</p>
              <div className="ml-4 flex flex-wrap gap-2 whitespace-normal break-words">
                {work.metadata.categories.map((category, index) => {
                  return (
                    <span
                      key={index}
                      className={`inline-block whitespace-normal bg-gray-200 text-base lg:text-lg`}
                    >
                      {category}
                    </span>
                  );
                })}
              </div>
            </div>
            <a
              href={work.metadata.externalLink.url}
              target="_blank"
              className="m-2 rounded-lg border border-solid border-gray-600 bg-white p-2 font-bold"
            >
              {work.metadata.externalLink.message}
            </a>
          </div>
          <hr className="my-4 w-full border-gray-400" />
          <ReactMarkdown mdBody={work.body} />
        </article>
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
  const entry = workManager.getEntry((await params).slug);

  const title = entry.metadata.title;
  const description = entry.metadata.description || defaultDescription;
  const openGraph = entry.getOGPMetadata();

  return {
    title,
    description,
    openGraph,
  };
}
