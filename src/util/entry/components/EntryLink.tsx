import Link from "next/link";
import Image from "next/image";

import { EntryProp } from "../Entry";
import { TagListSpan } from "./TagListSpan";
import { DateInfoSpan } from "./DateInfoSpan";

export const EntryLink: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <Link href={`./blog/${entry.slug}`}>
        <article className="h-fit w-60">
          <div className="relative h-36 w-full">
            <Image
              src={entry.getThumbnail().url}
              alt={entry.getThumbnail().alt}
              className="object-cover"
              fill
            ></Image>
          </div>
          <div className="p-2">
            <h3 className="text-xl font-bold">{entry.metadata.title}</h3>
            <DateInfoSpan
              createdAt={entry.metadata.createdAt}
              updatedAt={entry.metadata.updatedAt}
            />
            <p>
              <TagListSpan tags={entry.metadata.tags} />
            </p>
          </div>
        </article>
      </Link>
    </>
  );
};
