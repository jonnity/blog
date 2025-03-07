import { EntryManager } from "@/util/entry/Entry";
import { BlogEntry } from "../blog/[slug]/components/BlogEntry";
import { SideBarInfo } from "../blog/[slug]/components/SideBarInfo";

const entryManager = EntryManager.getInstance();

export default async function Page() {
  const monthlyEntries = entryManager.getEntryList().filter(entry => 
    entryManager.isMonthlyEntry(entry.slug)
  );

  // 最新の月記を取得
  const latestEntry = monthlyEntries[0];
  
  // 他の月記へのリンクを生成
  const monthlyLinks = monthlyEntries.map(entry => {
    const yearMonth = entry.slug.replace(/^monthly-(\d{4}-\d{2})$/, '$1');
    const [year, month] = yearMonth.split('-');
    return {
      yearMonth,
      year,
      month,
      title: entry.metadata.title,
      isLatest: entry === latestEntry
    };
  });

  return (
    <div className="m-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">月記アーカイブ</h1>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {monthlyLinks.map(({ yearMonth, year, month, title, isLatest }) => (
            <a
              key={yearMonth}
              href={isLatest ? undefined : `/monthly/${yearMonth}`}
              className={`p-2 text-center border rounded ${
                isLatest 
                  ? 'bg-gray-100 cursor-default' 
                  : 'hover:bg-gray-50 transition-colors'
              }`}
            >
              <div className="text-sm text-gray-600">{`${year}年${month}月`}</div>
              {isLatest && <span className="text-xs text-blue-600">現在表示中</span>}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 lg:flex-row">
        <article className="w-full lg:w-3/5 xl:w-1/2">
          <BlogEntry entry={latestEntry} />
        </article>
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <SideBarInfo entry={latestEntry} />
        </aside>
      </div>
    </div>
  );
}
