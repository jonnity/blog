import { PageContainer } from "@/util/layout/PageContainer";
import { WorkManager } from "@/util/work/Work";
import { WorkLink } from "@/util/work/components/WorkLink";
import { getUpdatedMetadata } from "@/util/metaTagInfo";

export default function WorkPage() {
  const workManager = WorkManager.getInstance();
  const workList = workManager.getWorkList();
  return (
    <PageContainer className="text-gray-900">
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
    </PageContainer>
  );
}

export const metadata = getUpdatedMetadata({
  path: "/work",
  title: "作品一覧",
  description: "jonnityの制作物紹介をまとめたページ",
  keywords: null,
  ogParam: { type: "website" },
});
