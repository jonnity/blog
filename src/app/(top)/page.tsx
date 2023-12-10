import { Articles } from "./components/Articles";
import { SNSLogo } from "@/util/profile/SNSLogo";

export default function Home() {
  return (
    <div className="m-4 flex flex-col justify-center lg:mx-0 lg:flex-row">
      <main className="mb-4 flex w-full rounded border border-gray-300 bg-gray-50 p-4 shadow-xl lg:w-3/5 xl:w-1/2">
        <section className="w-full">
          <h2 className="text-2xl">記事一覧</h2>
          <div className="py-1">
            <Articles />
          </div>
        </section>
      </main>

      <aside className="m-0 w-full place-self-start rounded border border-gray-300 bg-gray-50 p-2 shadow-xl lg:mx-4 lg:w-1/4 xl:w-1/5">
        <div className="flex items-center gap-2">
          <h2 className="pr-1 text-lg">About jonnity</h2>
          <SNSLogo serviceName="github" />
          <SNSLogo serviceName="x" />
          <SNSLogo serviceName="threads" />
        </div>
        <hr className="my-1" />
        <p>個人開発やアリ飼育などをして生きています。ゆゆ式が好きです。</p>
        <p>
          このサイトは、エンジニア的なアウトプットを中心とした雑多な文章を自由に書ける場所として作りました。
        </p>
      </aside>
    </div>
  );
}
