import { SNSLogo } from "@/util/profile/SNSLogo";
import { EntryManager } from "@/util/entry/Entry";
import { EntryLink } from "@/util/entry/components/EntryLink";

export default function Home() {
  const entryManager = EntryManager.getInstance();
  return (
    <div className="flex w-full justify-center">
      <main className="contents-base my-2 flex w-11/12 flex-col gap-4 p-4 shadow-xl backdrop-blur-lg lg:m-8 lg:w-3/5 xl:w-1/2">
        <section>
          <h2 className="flex items-center gap-4 text-2xl lg:text-3xl">
            <span>About</span>
            <img
              src="/logo_keyboard.svg"
              alt="jonnity (with logo)"
              className="h-10 lg:h-14"
            />
            <div className="flex items-center gap-2">
              <SNSLogo serviceName="github" />
              <SNSLogo serviceName="x" />
              <SNSLogo serviceName="threads" />
            </div>
          </h2>
          <div className="entry-written-in-md p-4">
            <p>
              個人開発やアリ飼育などをしながら、エンジニアとして働いてます。ゆゆ式が好きです。
            </p>
            <p>
              仕事ではほとんどコーディングしないので、個人開発は基本的に雰囲気でやってます。OSSのソースとかをちゃんと読めばなんとかなる。
            </p>
            <p>
              <a href="https://sketch-match.jonnity.com" target="_blank">
                Sketch Match
              </a>
              というお絵かき + 神経衰弱のパーティゲームを作りました。
            </p>
            <p>アリは、アズマオオズアリ、アシナガアリあたりが特に好きです。</p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl lg:text-3xl">記事一覧</h2>
          <div className="flex flex-wrap gap-4 p-4">
            {entryManager.getEntryList().map((entry) => (
              <EntryLink key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
