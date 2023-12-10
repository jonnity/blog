import Image, { StaticImageData } from "next/image";

import { Articles } from "./components/Articles";
import github_logo_black from "@/assets/github-logo-black.svg";
import x_logo_black from "@/assets/x-logo-black.svg";
import threads_logo_black from "@/assets/threads-logo-black.svg";
import Link from "next/link";

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
          <SNSLogoWithLink
            logo={github_logo_black}
            alt="github logo linked to the user page of @jonnity"
            url="https://github.com/jonnity"
          />
          <SNSLogoWithLink
            logo={x_logo_black}
            alt="X (SNS) logo linked to the user page of @jonnied_man"
            url="https://twitter.com/jonnied_man"
          />
          <SNSLogoWithLink
            logo={threads_logo_black}
            alt="threads logo linked to the user page of @jonnied_man"
            url="https://www.threads.net/@jonnied_man"
          />
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

type Prop = {
  logo: StaticImageData;
  alt: string;
  url: string;
};
const SNSLogoWithLink: React.FC<Prop> = ({ logo, alt, url }) => {
  const fixedHeight = 20;
  return (
    <Link href={url} target="_blank">
      <Image
        src={logo}
        alt={alt}
        height={fixedHeight}
        width={logo.width * (fixedHeight / logo.height)}
      ></Image>
    </Link>
  );
};
