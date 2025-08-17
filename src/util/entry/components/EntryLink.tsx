import Link from "next/link";
import Image from "next/image";

import { EntryType } from "../Entry";
import { TagListSpan } from "./TagList";
import { DateInfoSpan } from "./DateInfoSpan";

export const EntryLink: React.FC<{ entry: EntryType }> = ({ entry }) => {
  const { url, alt } = entry.getThumbnail();
  return (
    <>
      <Link href={`/blog/${entry.slug}`}>
        <article className="h-fit w-full md:w-[336px] lg:w-[264px]">
          <div className="relative h-[200px] w-full md:h-[180px]">
            <Image src={url} alt={alt} className="object-cover" fill></Image>
          </div>
          <div className="p-2">
            <h3 className="text-base font-bold md:text-lg lg:text-xl">
              {entry.metadata.title}
            </h3>
            <DateInfoSpan
              createdAt={entry.metadata.createdAt}
              updatedAt={entry.metadata.updatedAt}
            />
            <TagListSpan tags={entry.metadata.tags} />
          </div>
        </article>
      </Link>
    </>
  );
};
