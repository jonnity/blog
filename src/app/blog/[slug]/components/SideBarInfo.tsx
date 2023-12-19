import { SNSLogo } from "@/util/profile/SNSLogo";
import { EntryProp } from "@/util/entry/Entry";
import { MarkdownToc } from "@/util/entry/MarkdownToc";

export const SideBarInfo: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Profile />
        <EntryTOC entry={entry} />
      </div>
    </>
  );
};

const Profile = () => (
  <div className="contents-base p-2">
    <div className="flex items-center gap-2">
      <h2 className="text-lg">About jonnity</h2>
      <SNSLogo serviceName="github" />
      <SNSLogo serviceName="x" />
      <SNSLogo serviceName="threads" />
    </div>
    <SideBarDivider />
    <div className="p-2">
      <p>個人開発やアリ飼育などをして生きています。ゆゆ式が好きです。</p>
      <p>
        このサイトは、エンジニア的なアウトプットを中心とした雑多な文章を自由に書ける場所として作りました。
      </p>
    </div>
  </div>
);

const EntryTOC: React.FC<EntryProp> = ({ entry }) => {
  return (
    <>
      <div className="contents-base hidden p-2 lg:block">
        <h2 className="pr-1 text-lg">目次</h2>
        <SideBarDivider />
        <div>
          <MarkdownToc entry={entry} />
        </div>
      </div>
    </>
  );
};

const SideBarDivider = () => {
  return <hr className="my-1 w-full border-gray-400" />;
};
