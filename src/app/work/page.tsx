import { WorkManager } from "@/util/work/Work";
import { WorkLink } from "@/util/work/components/WorkLink";
import { getUpdatedMetadata } from "@/util/metaTagInfo";

export async function WorkPage() {
  const workManager = WorkManager.getInstance();
  const workList = workManager.getWorkList();
  return (
    <div className="flex w-full justify-center">
      <div className="contents-base my-2 w-[368px] gap-x-4 p-4 text-gray-900 md:w-[752px] lg:w-[880px]">
        <h2 className="text-2xl">Works</h2>
        <hr className="my-1 w-full border-gray-400" />
        {workList.map((work) => {
          const { url, alt } = work.getThumbnail();
          return (
            <WorkLink
              key={work.slug}
              title={work.metadata.title}
              thumbnail={{ url, alt }}
              description={work.metadata.description}
              slug={work.slug}
              categories={work.metadata.categories}
              createdAt={work.metadata.createdAt}
              updatedAt={work.metadata.updatedAt}
            ></WorkLink>
          );
        })}
      </div>
    </div>
  );
}

export const metadata = getUpdatedMetadata({
  path: "/work",
  title: "作品一覧",
  description: "jonnityの制作物紹介をまとめたページ",
  keywords: null,
  ogParam: { type: "website" },
});
