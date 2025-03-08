import { EntryManager } from "@/util/entry/Entry";
import { redirect } from "next/navigation";

const entryManager = EntryManager.getInstance();

export default async function Page() {
  const monthlyEntries = entryManager
    .getEntryList()
    .filter((entry) => entryManager.isMonthlyEntry(entry.slug));

  // 最新の月記を取得
  const latestEntry = monthlyEntries[0];
  redirect(
    `/monthly/${latestEntry.slug.replace(/^monthly-(\d{4}-\d{2})$/, "$1")}`,
  );
}
