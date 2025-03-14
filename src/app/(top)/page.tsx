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

const latestMonthly = entryManager.getEntryList(undefined, "monthly")[0];
const monthlyTitle = latestMonthly.slug.replace(
  /^monthly-(\d{4}-\d{2})$/,
  "$1",
);

export default function Home() {
  return (
    <div className="flex w-full justify-center">
      <main className="contents-base m-2 w-[360px] gap-x-4 p-4 md:grid md:w-[720px] md:grid-cols-2 lg:w-[960px]">
        <RouteBlock>
          <div className="flex gap-4">
            <HeadSubject>Profile</HeadSubject>
            <div className="flex items-center gap-2">
              <SNSLogo serviceName="github" />
              <SNSLogo serviceName="x" />
              <SNSLogo serviceName="threads" />
            </div>
          </div>
          <Divider />
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
          <HeadSubject>Monthly ({monthlyTitle})</HeadSubject>
          <Divider />
          <ul>
            {!latestMonthly.metadata.summary ? (
              <li>特になし…</li>
            ) : (
              latestMonthly.metadata.summary.map((item, index) => (
                <li key={index} className="ml-6 list-disc">
                  {item}
                </li>
              ))
            )}
          </ul>
          <div className="entry-base flex w-full justify-end">
            <Link href="/blog">Read more...</Link>
          </div>
        </RouteBlock>
        <RouteBlock>
          <HeadSubject>Work</HeadSubject>
          <Divider />
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
          <Divider />
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
  return <div className="mb-2 h-fit">{children}</div>;
};

const Divider: React.FC = () => <hr className="mb-1 w-full border-gray-400" />;
