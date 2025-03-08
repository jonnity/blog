import { EntryManager } from "@/util/entry/Entry";
import { BlogEntry } from "../blog/[slug]/components/BlogEntry";
import { SideBarInfo } from "../blog/[slug]/components/SideBarInfo";
import { MonthlySelector } from "./components/MonthlySelector";

const entryManager = EntryManager.getInstance();

export default async function Page() {
  const monthlyEntries = entryManager
    .getEntryList()
    .filter((entry) => entryManager.isMonthlyEntry(entry.slug));

  // 最新の月記を取得
  const latestEntry = monthlyEntries[0];

  // 他の月記へのリンクを生成
  const yearMonthList = monthlyEntries.map((entry) => {
    const yearMonth = entry.slug.replace(/^monthly-(\d{4}-\d{2})$/, "$1");
    return yearMonth;
  });

  return (
    <div className="m-4">
      <div className="flex flex-col justify-center gap-4 lg:flex-row">
        <article className="w-full lg:w-3/5 xl:w-1/2">
          <BlogEntry entry={latestEntry} />
        </article>
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <SideBarInfo entry={latestEntry} />
          <MonthlySelector
            yearMonthList={yearMonthList}
            currentYearMonth={yearMonthList[0]}
          />
        </aside>
      </div>
    </div>
  );
}
