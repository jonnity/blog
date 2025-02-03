import Link from "next/link";
import { EntryManager } from "@/util/entry/Entry";
import { EntryLink } from "@/util/entry/components/EntryLink";

type LatestEntriesProps = { numOfEntries: number };
export const LatestEntries: React.FC<LatestEntriesProps> = ({
  numOfEntries,
}) => {
  const entryManager = EntryManager.getInstance();
  const entryList = entryManager.getEntryList().slice(0, numOfEntries);
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {entryList.map((entry) => (
        <EntryLink key={entry.slug} entry={entry} />
      ))}
      <p className="self-center text-3xl font-extrabold">
        <Link href="/blog">...</Link>
      </p>
    </div>
  );
};
