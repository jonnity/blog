import { EntryManager } from "@/util/entry/Entry";
import { getUpdatedMetadata } from "@/util/metaTagInfo";
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

export const metadata = getUpdatedMetadata({
  path: "/monthly",
  title: "月記ページ",
  description: "月記のトップページ (最新の月記へリダイレクトします)",
  keywords: null,
  ogParam: { type: "website" },
});
