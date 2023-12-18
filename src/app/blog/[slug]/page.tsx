import type { Metadata } from "next";

import { Entry } from "@/util/entry/Entry";
import { defaultDescription } from "@/util/metadata";
import { SNSLogo } from "@/util/profile/SNSLogo";

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
      <div className="m-4 flex flex-col justify-center lg:mx-0 lg:flex-row">
        <main className="contents-base mb-4 flex w-full p-4  lg:w-3/5 xl:w-1/2">
          <section className="w-full">
            <article>
              <BlogHeader entry={entry} />
              <hr className="my-4 w-full border-gray-400" />
              <BlogBody entry={entry} />
            </article>
          </section>
        </main>
        <aside className="contents-base m-0 w-full place-self-start p-2 lg:mx-4 lg:w-1/4 xl:w-1/5">
          <div className="flex items-center gap-2">
            <h2 className="pr-1 text-lg">About jonnity</h2>
            <SNSLogo serviceName="github" />
            <SNSLogo serviceName="x" />
            <SNSLogo serviceName="threads" />
          </div>
          <hr className="my-1 h-px border-0 bg-gray-500" />
          <div className="p-2">
            <p>個人開発やアリ飼育などをして生きています。ゆゆ式が好きです。</p>
            <p>
              このサイトは、エンジニア的なアウトプットを中心とした雑多な文章を自由に書ける場所として作りました。
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

type MetadataProps = {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { metadata } = Entry.getEntryWithSlug(params.slug);
  const title = metadata.title;
  const description = metadata.description || defaultDescription;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}
