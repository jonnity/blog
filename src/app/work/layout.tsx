import { Hamburger } from "@/util/hamburger/Hamburger";
import { EntryManager } from "@/util/entry/Entry";

const entryManager = EntryManager.getInstance();
const latestMonthly = entryManager.getEntryList(undefined, "monthly")[0];
const monthlyTitle = latestMonthly.slug.replace(
  /^monthly-(\d{4}-\d{2})$/,
  "$1",
);
export default function WorkPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Hamburger date={new Date(monthlyTitle)} />
    </>
  );
}
