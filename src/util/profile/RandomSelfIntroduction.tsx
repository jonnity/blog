"use client";
export const RandomSelfIntroduction: React.FC = () => {
  const introduction = getRandomIntroduction();
  return (
    <>
      <p>個人開発やアリ飼育などをして生きています。ゆゆ式が好きです。</p>
      <p suppressHydrationWarning>{introduction.theme}:</p>
      <p className="pl-4" suppressHydrationWarning>
        {introduction.contents}
      </p>
    </>
  );
};

type Introduction = {
  theme: string;
  contents: string;
};
const getRandomIntroduction: () => Introduction = () => {
  const index = Math.floor(Math.random() * introductionList.length);
  return introductionList[index];
};

const introductionList: Introduction[] = [
  {
    theme: "特技",
    contents: "歯医者にある口内の液体吸い出す機械の音のモノマネ",
  },
  {
    theme: "お気に入りショートカットキー",
    contents:
      "Win + 数字キーで、タスクバーのアプリ切り替え (1はエクスプローラー、2はブラウザ、3はチャットアプリ…って決めてる)",
  },
  {
    theme: "好きな漫画",
    contents: "ゆゆ式",
  },
  {
    theme: "好きなおせち料理",
    contents: "くわいの煮物",
  },
  {
    theme: "お気に入りアイス",
    contents: "おいももなか (丸永製菓)/クーリッシュ練乳味",
  },
  {
    theme: "小さい頃の将来の夢",
    contents: "獣医",
  },
  {
    theme: "得意料理",
    contents: "麻婆豆腐",
  },
  {
    theme: "MTGで好きな色",
    contents: "青 → 緑 → 白 → 黒 → 赤くらいの順かも",
  },
  {
    theme: "よく食べるお菓子",
    contents: "ラムネとかグミとか",
  },
  {
    theme: "好きな犬種",
    contents: "ミニチュアピンシャー",
  },
  {
    theme: "イチオシ飲み物",
    contents:
      "ダイヤモンド ガラナ スイート (布引鉱泉所), Sparkling Berry (有限会社ウィンウィン)",
  },
  {
    theme: "好きなサンリオのキャラクター",
    contents: "かしわんこもち。順位を徐々に上げている",
  },
  {
    theme: "使ってるキーボード",
    contents: "REALFORCE R3 (無線対応してるやつだけど有線で繋いでる)",
  },
  {
    theme: "好きな動物",
    contents: "ヤブイヌ",
  },
  {
    theme: "好きなゆゆ式のキャラソン",
    contents: "選べない。助けてください。強いて言えば『そういうくらいの。』",
  },
  {
    theme: "好きなamazarashiの曲",
    contents: "『冷凍睡眠』『ロストボーイズ』『ムカデ』あたり",
  },
  {
    theme: "好きなカンブリア紀の古生物",
    contents: "オパビニア、カンブロパキコーペ",
  },
];
