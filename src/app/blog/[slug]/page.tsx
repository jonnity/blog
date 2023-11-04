import ReactMarkdown from "react-markdown";
import { Entry } from "@/domain/Entry";

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
