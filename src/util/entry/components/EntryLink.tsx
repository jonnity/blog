import Link from "next/link";
import Image from "next/image";

import { EntryProp } from "../Entry";
import { TagListSpan } from "./TagList";
import { DateInfoSpan } from "./DateInfoSpan";

export const EntryLink: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <Link href={`./blog/${entry.slug}`}>
        <article className="h-fit w-36 lg:w-44">
          <div className="relative h-28 w-full lg:h-32">
            <Image
              src={entry.getThumbnail().url}
              alt={entry.getThumbnail().alt}
              className="object-cover"
              fill
            ></Image>
          </div>
          <div className="p-2">
            <h3 className="text-base font-bold lg:text-xl">
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
