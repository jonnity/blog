import Link from "next/link";
import Image from "next/image";

import { SNSLogo } from "@/util/profile/SNSLogo";
const logoImagePath = "/logo_keybourd.svg";

export default function BlogPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mb-4 flex h-16 w-full justify-center bg-orange-200 lg:h-20">
        <div className="mx-4 flex h-full w-full justify-between lg:mx-0 lg:w-11/12 xl:w-3/4">
          <Link href="/" className="relative block h-full w-fit">
            <Image
              src={logoImagePath}
              alt="アズマオオズアリの頭部とキーボードを模したアイコンとjonnityという文字"
              width={0}
              height={0}
              className="h-full w-auto"
            />
          </Link>
          {/* カテゴリ表示をする前提でスタイリングするために、不可視要素を追加 */}
          <p className="invisible self-end">category: hoge</p>
        </div>
      </header>
      <div className="m-4 flex flex-col justify-center lg:mx-0 lg:flex-row">
        <main className="contents-base mb-4 flex w-full p-4  lg:w-3/5 xl:w-1/2">
          <section className="w-full">{children}</section>
        </main>

        <aside className="contents-base m-0 w-full place-self-start p-2 lg:mx-4 lg:w-1/4 xl:w-1/5">
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
    </>
  );
}
