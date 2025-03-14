import { EntryManager } from "@/util/entry/Entry";
import { SNSLogo } from "@/util/profile/SNSLogo";
import { WorkManager } from "@/util/work/Work";
import Link from "next/link";

const workManager = WorkManager.getInstance();
const allWorks = workManager.getWorkList();
const twoWorks = allWorks.slice(0, 2);

const entryManager = EntryManager.getInstance();
const allBlogs = entryManager.getEntryList(undefined, "blog");
const twoBlogs = allBlogs.slice(0, 2);

export default function Home() {
  return (
    <div className="flex w-full justify-center">
      <main className="contents-base m-2 w-[360px] gap-x-4 p-4 md:w-[720px] lg:w-[960px]">
        <RouteBlock>
          <div className="flex gap-4">
            <HeadSubject>Profile</HeadSubject>
            <div className="flex items-center gap-2">
              <SNSLogo serviceName="github" />
              <SNSLogo serviceName="x" />
              <SNSLogo serviceName="threads" />
            </div>
          </div>
          <div className="ml-2">
            <p>
              個人開発やアリ飼育などをしながら、エンジニアとして働いてます。ゆゆ式が好きです。
            </p>
            <p>
              このサイトは、主にエンジニアとしての活動のアプトプットの場として作りました。
            </p>
          </div>
          <div className="entry-base flex w-full justify-end">
            <Link href="/profile">Read more...</Link>
          </div>
        </RouteBlock>
        <RouteBlock>
          <HeadSubject>Work</HeadSubject>
          <div className="flex justify-between">
            {twoWorks.map((work) => {
              return (
                <EntryLink
                  key={work.slug}
                  slug={work.slug}
                  title={work.metadata.title}
                  thumbnail={work.getThumbnail()}
                />
              );
            })}
          </div>
          <div className="entry-base flex w-full justify-end">
            <Link href="/work">See more...</Link>
          </div>
        </RouteBlock>
        <RouteBlock>
          <HeadSubject>Blog</HeadSubject>
          <div className="flex justify-between">
            {twoBlogs.map((blog) => {
              return (
                <EntryLink
                  key={blog.slug}
                  slug={blog.slug}
                  title={blog.metadata.title}
                  thumbnail={blog.getThumbnail()}
                />
              );
            })}
          </div>
          <div className="entry-base flex w-full justify-end">
            <Link href="/blog">See more...</Link>
          </div>
        </RouteBlock>

        {/* <section className="entry-base">
          <h2 className="text-2xl lg:text-3xl">News</h2>
          <p>
          <a href="https://sketch-match.jonnity.com" target="_blank">
          Sketch Match
          </a>
          というお絵かき + 神経衰弱のパーティゲームを作りました。
          ペアになっているお題が各プレイヤーに出され、その絵を使って神経衰弱をするゲームをブラウザで遊べるので↑のリンクからぜひ。
          </p>
        </section>
        <section>
          <div className="entry-base">
            <h2 className="text-2xl lg:text-3xl">Blogs</h2>
          </div>
          <LatestEntries numOfEntries={3} />
        </section>
        <section>
          <div className="entry-base">
            <h2 className="text-2xl lg:text-3xl">Works</h2>
          </div>
        </section> */}
        {/* <section>
          <h2 className="text-2xl lg:text-3xl">記事一覧</h2>
          <div className="flex flex-wrap gap-4 p-4">
            {entryManager.getEntryList().map((entry) => (
              <EntryLink key={entry.slug} entry={entry} />
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
}

const HeadSubject: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h3 className="flex items-center gap-4 text-xl font-bold md:text-2xl">
      {children}
    </h3>
  );
};

const EntryLink: React.FC<{
  slug: string;
  thumbnail: { url: string; alt: string };
  title: string;
}> = ({ slug, thumbnail, title }) => {
  return (
    <a href={`/work/${slug}`}>
      <article className="flex h-fit w-[160px] flex-col items-center">
        <img
          src={thumbnail.url}
          alt={thumbnail.alt}
          className="h-[120px] w-[160px] object-cover"
        />
        <h3 className="text-sm font-bold lg:text-xl">{title}</h3>
      </article>
    </a>
  );
};

const RouteBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="h-fit">{children}</div>;
};
