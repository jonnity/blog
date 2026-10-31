export type PageContainerProps = {
  children: React.ReactNode;
  as?: "div" | "article" | "main";
  className?: string;
  afterContent?: React.ReactNode;
};

const baseClassName =
  "contents-base my-2 w-[368px] gap-x-4 p-4 md:w-[752px] lg:w-[880px]";

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  as: Component = "div",
  className = "",
  afterContent,
}) => {
  const innerClassName = [baseClassName, ...className.split(/\s+/)]
    .filter(Boolean)
    .join(" ");

  const content = <Component className={innerClassName}>{children}</Component>;

  if (afterContent === undefined) {
    return <div className="flex w-full justify-center">{content}</div>;
  }

  return (
    <div className="flex w-full justify-center">
      {content}
      {afterContent}
    </div>
  );
};
