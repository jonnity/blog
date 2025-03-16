import Link from "next/link";
import Image from "next/image";

import { EntryManager } from "@/util/entry/Entry";
import { SNSLogo } from "@/util/profile/SNSLogo";
import { WorkManager } from "@/util/work/Work";
import { Hamburger } from "@/util/hamburger/Hamburger";

import ProfileIcon from "@/assets/icons/profile.svg";
import MonthDisplay from "@/assets/icons/MonthDisplay";
import WorkIcon from "@/assets/icons/work.svg";
import BlogIcon from "@/assets/icons/blog.svg";

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
      <main className="contents-base m-2 grid w-[360px] grid-cols-1 flex-col gap-2 p-4 md:w-[720px] md:grid-cols-2 md:border-t lg:w-[960px]">
        <RouteBlock>
          <div className="flex gap-4">
            <div className="flex h-fit gap-1">
              <Image
                src={ProfileIcon}
                alt="Profileページのアイコン"
                className="h-[26px] w-[26px] p-px md:h-[30px] md:w-[30px] lg:h-[34px] lg:w-[34px]"
              />
              <HeadSubject>Profile</HeadSubject>
            </div>
            <div className="box-border flex items-center gap-2 py-px">
              <SNSLogo serviceName="github" height={24} />
              <SNSLogo serviceName="x" height={24} />
              <SNSLogo serviceName="threads" height={24} />
            </div>
          </div>
          <Divider />
          <div className="ml-2 lg:text-lg">
            <p>
              個人開発やアリ飼育などをしながら、エンジニアとして働いてます。ゆゆ式が好きです。
            </p>
            <p>
              このサイトは、主にエンジニアとしての活動のアプトプットの場として作りました。
            </p>
          </div>
          <MoreLink path="profile" message="Read more..." />
        </RouteBlock>
        <RouteBlock>
          <div className="flex h-fit gap-1">
            <div className="h-[26px] w-[26px] p-px md:h-[30px] md:w-[30px] lg:h-[34px] lg:w-[34px]">
              <MonthDisplay />
            </div>
            <HeadSubject>Monthly ({monthlyTitle})</HeadSubject>
          </div>
          <Divider />
          <ul className="lg:text-lg">
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
          <MoreLink path="monthly" message="Read more..." />
        </RouteBlock>
        <RouteBlock>
          <div className="flex h-fit gap-1">
            <Image
              src={WorkIcon}
              alt="Workページのアイコン"
              className="h-[26px] w-[26px] p-px md:h-[30px] md:w-[30px] lg:h-[34px] lg:w-[34px]"
            />
            <HeadSubject>Work</HeadSubject>
          </div>
          <Divider />
          <div className="flex justify-between">
            {twoWorks.map((work) => {
              return (
                <EntryLink
                  key={work.slug}
                  slug={`/work/${work.slug}`}
                  title={work.metadata.title}
                  thumbnail={work.getThumbnail()}
                />
              );
            })}
          </div>
          <MoreLink path="work" message="See more..." />
        </RouteBlock>
        <RouteBlock>
          <div className="flex h-fit gap-1">
            <Image
              src={BlogIcon}
              alt="Blogページのアイコン"
              className="h-[26px] w-[26px] p-px md:h-[30px] md:w-[30px] lg:h-[34px] lg:w-[34px]"
            />
            <HeadSubject>Blog</HeadSubject>
          </div>
          <Divider />
          <div className="flex justify-between">
            {twoBlogs.map((blog) => {
              return (
                <EntryLink
                  key={blog.slug}
                  slug={`/blog/${blog.slug}`}
                  title={blog.metadata.title}
                  thumbnail={blog.getThumbnail()}
                />
              );
            })}
          </div>
          <MoreLink path="blog" message="See more..." />
        </RouteBlock>
      </main>
      <Hamburger />
    </div>
  );
}

const HeadSubject: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <h3 className="flex items-center gap-4 text-xl md:text-2xl lg:text-3xl">
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
    <a href={`${slug}`}>
      <article className="flex h-fit w-[160px] flex-col items-center lg:w-[224px]">
        <img
          src={thumbnail.url}
          alt={thumbnail.alt}
          className="h-[120px] w-[160px] object-cover lg:h-[168px] lg:w-[224px]"
        />
        <h3 className="text-sm font-bold lg:text-base">{title}</h3>
      </article>
    </a>
  );
};

const RouteBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative mb-2 h-full pb-5">{children}</div>;
};

const Divider: React.FC = () => <hr className="mb-1 w-full border-gray-400" />;

const MoreLink: React.FC<{ path: string; message: string }> = ({
  path,
  message,
}) => (
  <div className="entry-base absolute bottom-0 right-0">
    <Link href={`/${path}`}>{message}</Link>
  </div>
);
