import { WorkManager } from "@/util/work/Work";
import { WorkLink } from "../../util/work/components/WorkLink";
import { Hamburger } from "@/util/hamburger/Hamburger";

const WorkPage: React.FC = () => {
  const workManager = WorkManager.getInstance();
  const workList = workManager.getWorkList();
  return (
    <div className="flex w-full justify-center">
      <div className="contents-base m-2 w-[360px] gap-x-4 p-4 text-gray-900 md:w-[720px] lg:w-[960px]">
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
      <Hamburger />
    </div>
  );
};

export default WorkPage;
