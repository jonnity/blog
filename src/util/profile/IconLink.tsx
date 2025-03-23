import Link from "next/link";
import Image from "next/image";

export const IconLink: React.FC<{
  href: string;
  icon:
    | { type: "img"; resource: { src: string; alt: string }; size: number }
    | { type: "component"; resource: React.ReactNode };
}> = ({ href, icon }) => {
  switch (icon.type) {
    case "img":
      return (
        <Link href={href}>
          <Image
            src={icon.resource.src}
            alt={icon.resource.alt}
            height={icon.size}
            width={icon.size}
          />
        </Link>
      );
    case "component":
      return <Link href={href}>{icon.resource}</Link>;
  }
};
