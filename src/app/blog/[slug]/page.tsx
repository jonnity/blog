import { Entry } from "@/util/entry/Entry";
import { BlogHeader } from "./BlogHeader";
import { BlogBody } from "./BlogBody";

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
        <BlogHeader entry={entry} />
        <hr className="my-4 w-full border-gray-400" />
        <BlogBody entry={entry} />
      </article>
    </>
  );
}
