import { SNSLogo } from "@/util/profile/SNSLogo";

const ProfilePage: React.FC = () => {
  const logoHeight = 28;
  return (
    <div className="flex w-full justify-center">
      <div className="contents-base m-2 w-[360px] gap-x-4 p-4 md:w-[720px] lg:w-[960px]">
        <div className="flex items-center gap-4 text-2xl">
          <h2>About Me</h2>
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
        </div>
        <h2 className="mt-4 text-2xl">Policies</h2>
        <hr className="my-1 w-full border-gray-400" />
        <h3 className="mt-2 text-xl">Privacy Policy</h3>
        <div className="entry-base">
          <p>
            当サイトでは、Googleアナリティクスを使用しています。Googleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
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
          <p>
            問い合わせは、本ページ上部に記載しているSNSのリンクから、jonnityまで連絡をお願いします。
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
