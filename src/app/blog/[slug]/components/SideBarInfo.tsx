import { SNSLogo } from "@/util/profile/SNSLogo";
import { EntryProp } from "@/util/entry/Entry";

export const SideBarInfo: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <Profile />
    </>
  );
};

const Profile: React.FC = () => (
  <div className="contents-base p-2">
    <div className="flex items-center gap-2">
      <h2 className="pr-1 text-lg">About jonnity</h2>
      <SNSLogo serviceName="github" />
      <SNSLogo serviceName="x" />
      <SNSLogo serviceName="threads" />
    </div>
    <hr className="my-1 h-px border-0 bg-gray-400" />
    <div className="p-2">
      <p>個人開発やアリ飼育などをして生きています。ゆゆ式が好きです。</p>
      <p>
        このサイトは、エンジニア的なアウトプットを中心とした雑多な文章を自由に書ける場所として作りました。
      </p>
    </div>
  </div>
);
