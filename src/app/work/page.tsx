import { WorkLink } from "./components/WorkLink";

const WorkPage: React.FC = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="contents-base m-2 w-[360px] gap-x-4 p-4 text-gray-900 md:w-[720px] lg:w-[960px]">
        <h2 className="text-2xl">Works</h2>
        <hr className="my-1 w-full border-gray-400" />
        <WorkLink
          title="Sketch Match"
          thumbnail={{
            url: "/entry/sketch-match-introduce/thumbnail.webp",
            alt: "alt",
          }}
          description="お絵かき + 神経衰弱！同じテーマでそれぞれ絵を描いて、その絵だけを見て神経衰弱をする"
          slug="sketch-match"
          categories={["ゲーム", "複数人プレイ", "ブラウザで遊べる"]}
          link={{
            url: "https://sketch-match.jonnity.com",
            message: "今すぐプレイ",
          }}
        />
      </div>
    </div>
  );
};

export default WorkPage;
