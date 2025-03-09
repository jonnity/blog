import { SNSLogo } from "@/util/profile/SNSLogo";
import { LatestEntries } from "@/util/entry/components/LatestEntries";

export default function Home() {
  return (
    <div className="flex w-full justify-center">
      <main className="contents-base my-2 flex w-11/12 flex-col gap-4 p-4 shadow-xl lg:m-8 lg:w-3/5 xl:w-1/2">
        <section className="entry-base">
          <h2 className="flex items-center gap-4 text-2xl lg:text-3xl">
            <span>About Me</span>
            <div className="flex items-center gap-2">
              <SNSLogo serviceName="github" />
              <SNSLogo serviceName="x" />
              <SNSLogo serviceName="threads" />
            </div>
          </h2>
          <p>
            個人開発やアリ飼育などをしながら、エンジニアとして働いてます。ゆゆ式が好きです。
            このサイトは、主にエンジニアとしての活動のアプトプットの場として作りました。オモコロとかDPZとかのおもしろ文章を読むのも好きなので、そういうのも出していきたい気持ちはあります。
          </p>
          <p>
            仕事ではほとんどコーディングしないので大変。OSSのソースとかをちゃんと読めばなんとかなる気はしてきてはいます。
          </p>
          <p>妻とアリ200匹くらい (2025/02現在) と一緒に暮らしています。</p>
        </section>
        <section className="entry-base">
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
        </section>
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
