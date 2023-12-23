import Link from "next/link";
import Image from "next/image";

const logoImagePath = "/logo_keybourd.svg";

export default function BlogPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mb-4 flex h-16 w-full justify-center bg-orange-200 bg-opacity-80 lg:h-20">
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
      {children}
    </>
  );
}
