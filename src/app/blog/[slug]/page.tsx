import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Entry } from "@/util/entry/Entry";
import { TagListSpan } from "@/util/entry/TagListSpan";
import { DateInfoSpan } from "@/util/entry/DateInfoSpan";
import { MarkdownComponents } from "../../../util/entry/MarkdownComponents";

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
          urlTransform={(url, _key, { tagName }) => {
            if (tagName === "img") {
              return /^https?:/.test(url) ? url : `/entry/${entry.slug}/${url}`;
            }
            return url;
          }}
          components={MarkdownComponents}
        >
          {entry.body}
        </ReactMarkdown>
      </article>
    </>
  );
}
