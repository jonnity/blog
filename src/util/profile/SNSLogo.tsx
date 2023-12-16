import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import github_logo_black from "@/assets/github-logo-black.svg";
import x_logo_black from "@/assets/x-logo-black.svg";
import threads_logo_black from "@/assets/threads-logo-black.svg";

type ServiceName = "github" | "x" | "threads";
type ServiceInfo = {
  logo: StaticImageData;
  alt: string;
  url: URL;
};
const snsInfo: { [key in ServiceName]: ServiceInfo } = {
  github: {
    logo: github_logo_black,
    alt: "github logo linked to the user page of @jonnity",
    url: new URL("https://github.com/jonnity"),
  },
  x: {
    logo: x_logo_black,
    alt: "X (SNS) logo linked to the user page of @jonnied_man",
    url: new URL("https://twitter.com/jonnied_man"),
  },
  threads: {
    logo: threads_logo_black,
    alt: "threads logo linked to the user page of @jonnied_man",
    url: new URL("https://www.threads.net/@jonnied_man"),
  },
};

type Prop = {
  serviceName: ServiceName;
  height?: number;
};
export const SNSLogo: React.FC<Prop> = ({ serviceName, height }) => {
  const { logo, alt, url } = snsInfo[serviceName];
  const fixedHeight = height || 20;
  return (
    <Link href={url.toString()} target="_blank">
      <Image
        src={logo}
        alt={alt}
        height={fixedHeight}
        width={logo.width * (fixedHeight / logo.height)}
      ></Image>
    </Link>
  );
};
