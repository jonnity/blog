import Link from "next/link";
import Image from "next/image";

import { EntryProp } from "../Entry";
import { TagListSpan } from "./TagListSpan";
import { DateInfoSpan } from "./DateInfoSpan";

export const EntryLink: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <Link href={`./blog/${entry.slug}`}>
        <article className="w-52 border border-solid border-slate-600">
          <div className="relative h-36 w-full">
            <Image
              src={entry.getThumbnail().url}
              alt={entry.getThumbnail().alt}
              className="object-cover"
              fill
            ></Image>
          </div>

          <p className="text-xl font-bold">{entry.metadata.title}</p>
          <DateInfoSpan
            createdAt={entry.metadata.createdAt}
            updatedAt={entry.metadata.updatedAt}
          />
          <p>
            <TagListSpan tags={entry.metadata.tags} />
          </p>
          <p className="text-sm"></p>
        </article>
      </Link>
    </>
  );
};
