import Link from "next/link";
import Image from "next/image";

import { EntryProp } from "../Entry";
import { TagListSpan } from "./TagList";
import { DateInfoSpan } from "./DateInfoSpan";

export const EntryLink: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <Link href={`/blog/${entry.slug}`}>
        <article className="h-fit w-36 md:w-40 lg:w-48">
          <div className="relative h-[108px] w-full md:h-[120px] lg:h-36">
            <Image
              src={entry.getThumbnail().url}
              alt={entry.getThumbnail().alt}
              className="object-cover"
              fill
            ></Image>
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
