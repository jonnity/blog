import { Hamburger } from "@/util/hamburger/Hamburger";
import { SNSLogo } from "@/util/profile/SNSLogo";

const ProfilePage: React.FC = () => {
  const logoHeight = 28;
  return (
    <div className="flex w-full justify-center">
      <div className="contents-base my-2 w-[368px] gap-x-4 p-4 text-gray-900 md:w-[720px] lg:w-[960px]">
        <div className="flex items-center gap-4 text-2xl">
          <h2>About jonnity</h2>
          <div className="flex items-center gap-2">
            <SNSLogo serviceName="github" height={logoHeight} />
            <SNSLogo serviceName="x" height={logoHeight} />
            <SNSLogo serviceName="threads" height={logoHeight} />
          </div>
        </div>
        <hr className="my-1 w-full border-gray-400" />
        <div className="entry-base">
          <p>
            個人開発やアリ飼育などをしながら、エンジニアとして働いてます。ゆゆ式が好きです。
          </p>
          <p>
            仕事ではほとんどコーディングしないので大変。OSSのソースをもっとちゃんと読んだりすれば、なんとかなっていくのかなと思っています。そういうのも含めて、他者との交流なんかもあったほうがいいのかもしれませんね。
          </p>
          <p>ゆゆ式以外だと、↓などが好きです。概ね好きな順に並んでいます。</p>
          <ul>
            <li>ヤブイヌ</li>
            <li>アリ</li>
            <li>お茶</li>
            <li>麻婆豆腐</li>
            <li>犬</li>
            <li>スパイスカレー/ビリヤニ</li>
            <li>漫画</li>
            <li>食べたことのないアイスを食べること</li>
            <li>キャラソン</li>
            <li>飲んだことのない清涼飲料水を飲むこと</li>
            <li>カンブリア紀あたりの古生物</li>
            <li>ゲーム</li>
            <li>パン</li>
            <li>塗ったことのないジャムを塗ること</li>
          </ul>
        </div>
        <h2 className="mt-4 text-2xl">About This Site</h2>
        <hr className="my-1 w-full border-gray-400" />
        <div className="entry-base">
          <p>
            このサイトは、個人開発の進捗をアウトプットしたり、その過程で得られた知見をまとめて共有したりすれば、自他ともにWin-Winかしらという気持ちで作成しました。
            今のところ「自」向けの前者が多めかも知れません。
            できたものをまとめてポートフォリオとしても活用していくつもりです。
            ただ、後者にも力を入れていく所存ですので、「他」の皆様も、何卒よろしくお願いいたします。
          </p>
          <p>
            オモコロとかDPZとかを読むのも好きなので、そういうものも出していきたい気持ちはあります。つまりは「おもしろ文章を書きます」という宣言ですが、果たして…
          </p>
          <p>
            本サイトに関する問い合わせは、本ページ上部に記載しているSNSのリンクから、jonnityまで連絡をお願いします。
          </p>
        </div>
        <h2 className="mt-4 text-2xl">Policies</h2>
        <hr className="my-1 w-full border-gray-400" />
        <h3 className="mb-1 mt-3 text-xl">アクセス解析ツールについて</h3>
        <div className="entry-base">
          <p>
            当サイトでは、Googleアナリティクスを使用しています。Googleアナリティクスはデータの収集のためにCookieを使用します。このデータは匿名で収集されており、個人を特定するものではありません。
            Cookieを無効にすることで収集を拒否することが出来ますので、未設定の場合に下部に表示されるダイアログか、ブラウザ自体の設定をご確認ください。この規約に関しての詳細は
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
            >
              Googleアナリティクスサービス利用規約
            </a>
            や
            <a href="https://policies.google.com/privacy" target="_blank">
              Google社のポリシーと規約
            </a>
            をご覧ください。
          </p>
        </div>
        <h3 className="mb-1 mt-3 text-xl">広告について</h3>
        <div className="entry-base">
          <p>
            当サイトでは、 Google
            AdSenseを使用しています。その中で、ユーザーの興味に応じた商品やサービスの広告を表示するためCookieを使用します。
            これによりユーザーを識別しますが、個人を特定できるものではありません。
            また、このような挙動は、Googleが提供する
            <a
              href="https://myadcenter.google.com/personalizationoff"
              target="_blank"
            >
              広告設定ページ
            </a>
            からカスタマイズ/無効化することが可能です。
          </p>
          <p>
            Cookieを無効にする方法やGoogle AdSenseに関する詳細は
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
            >
              広告 - ポリシーと規約 - Google
            </a>
            をご確認ください。
          </p>
          <p>
            なお、Googleを含む第三者配信事業者によるユーザー識別のためのCookieを無効にする手続きは、
            <a href="https://www.aboutads.info" target="_blank">
              www.aboutads.info
            </a>
            からも行うことができます。
          </p>
        </div>
      </div>
      <Hamburger />
    </div>
  );
};
export default ProfilePage;
