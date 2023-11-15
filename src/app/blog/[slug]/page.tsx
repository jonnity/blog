import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Entry } from "@/domain/Entry";
import { TagListSpan } from "@/components/TagListSpan";
import { DateInfoSpan } from "@/components/DateInfoSpan";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  const entries = Entry.getDiplayedEntriesList();
  const staticParams = entries.map((entry) => {
    return { slug: entry.slug };
  });
  return staticParams;
}

export default async function Page({ params }: { params: PageParams }) {
  const { slug } = params;
  const entry = Entry.getEntryWithSlug(slug);

  return (
    <>
      <article>
        <div>
          <h1 className="text-3xl font-bold">{entry.metadata.title}</h1>
          <p>
            <TagListSpan tags={entry.metadata.tags} />
          </p>
          <p>
            <DateInfoSpan
              createdAt={entry.metadata.createdAt}
              updatedAt={entry.metadata.updatedAt}
            />
          </p>
        </div>
        <hr className="my-4 w-full border-gray-400" />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={"entry-written-in-md"}
          urlTransform={(url) =>
            /^https?:/.test(url) ? url : `/entry/${entry.slug}/${url}`
          }
        >
          {entry.body}
        </ReactMarkdown>
      </article>
    </>
  );
}
