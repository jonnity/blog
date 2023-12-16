import Link from "next/link";

import { Articles } from "./components/Articles";
import { SNSLogo } from "@/util/profile/SNSLogo";

export default function Home() {
  return (
    <div className="flex w-full justify-center">
      <main className="my-2 flex w-11/12 flex-col gap-4 rounded bg-white bg-opacity-80 p-4 shadow-xl backdrop-blur-lg lg:m-8 lg:w-3/5 xl:w-1/2">
        <section>
          <h2 className="flex items-center gap-4 text-2xl">
            <span>About</span>
            <img
              src="/logo_keybourd.svg"
              alt="jonnity (with logo)"
              className="h-10"
            />
            <div className="flex items-center gap-2">
              <SNSLogo serviceName="github" />
              <SNSLogo serviceName="x" />
              <SNSLogo serviceName="threads" />
            </div>
          </h2>
          <div className="p-4">
            <p>
              個人開発やアリ飼育など、趣味のアウトプットの場としてこのサイトを作りました。ゆゆ式が好きです。
            </p>
            <p>
              エンジニアとして働いてますが、仕事ではほとんどコーディングしてません。
              なので、個人開発は基本的に雰囲気でやってます。助けてください。
            </p>
            <p>
              ポケモンカード公式のデッキ作成ツールのデッキコードを管理できるツール
              (
              <Link
                href="https://pokeca-deck-manager.com"
                className="font-semibold text-blue-600"
                target="_blank"
              >
                ポケカデッキマネージャー
              </Link>
              )
              を作ったりしてましたが、ポケモンカードが全然買えなくなったことで、カード自体をやらなくなりました。
            </p>
            <p>
              アリは、クロオオアリ、アシナガアリ、アズマオオズアリにヒメオオズアリを飼育してます。
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl">記事一覧</h2>
          <div className="p-4">
            <Articles />
          </div>
        </section>
      </main>
    </div>
  );
}
