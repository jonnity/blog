const isDev = process.env.NODE_ENV === "development";
export const dynamic = isDev ? "auto" : "force-static";
export const dynamicParams = isDev ? true : false;

import ReactMarkdown from "react-markdown";
import { Entry } from "@/domain/Entriy";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  const entryFiles = Entry.getEntriesFileList();
  const staticParams = entryFiles
    .map((filename) => {
      const entry = new Entry(filename);
      return entry.isPublic ? { slug: entry.getSlug() } : null;
    })
    .filter((params): params is PageParams => {
      return !!params?.slug;
    });
  return staticParams;
}

export default async function Page({ params }: { params: PageParams }) {
  const { slug } = params;
  const entry = new Entry(`${slug}.md`);

  return (
    <>
      <h1>{entry.metadata.title}</h1>
      <p>created at {entry.metadata.createdAt.toDateString()}</p>
      {entry.metadata.updatedAt ? (
        <p>(updated at {entry.metadata.updatedAt.toDateString()})</p>
      ) : null}
      <p>tags: {entry.metadata.tags.join(", ")}</p>
      <ReactMarkdown>{entry.body}</ReactMarkdown>
    </>
  );
}
