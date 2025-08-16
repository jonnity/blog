import { SNSLogo } from "@/util/profile/SNSLogo";
import { MarkdownToc } from "@/util/entry/components/MarkdownToc";
import { RandomSelfIntroduction } from "@/util/profile/RandomSelfIntroduction";
import { GoogleAdSense } from "@/util/adsense";

export const SideBarInfo: React.FC<{ mdBody: string }> = ({ mdBody }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Profile />
        <EntryTOC mdBody={mdBody} />
        <SideBarAd />
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
      <SNSLogo serviceName="mixi2" />
      <SNSLogo serviceName="threads" />
    </div>
    <SideBarDivider />
    <div className="p-2">
      <RandomSelfIntroduction />
    </div>
  </div>
);

const EntryTOC: React.FC<{ mdBody: string }> = ({ mdBody }) => {
  return (
    <>
      <div className="contents-base hidden p-2 md:block">
        <h2 className="pr-1 text-lg">目次</h2>
        <SideBarDivider />
        <div className="p-2">
          <MarkdownToc mdBody={mdBody} />
        </div>
      </div>
    </>
  );
};

const SideBarAd = () => (
  <div className="hidden md:block">
    <div className="w-full">
      <GoogleAdSense adClient="ca-pub-7514123900838543" adSlot="8144135865" />
    </div>
  </div>
);

const SideBarDivider = () => {
  return <hr className="my-1 w-full border-gray-400" />;
};
