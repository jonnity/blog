export type GridPageContainerProps = {
  children: React.ReactNode;
  as?: "div" | "article" | "main";
  className?: string;
  afterContent?: React.ReactNode;
};

const baseClassName =
  "contents-base my-2 grid w-[368px] grid-cols-1 flex-col gap-2 p-4 md:w-[752px] md:grid-cols-2 md:border-t lg:w-[960px]";

export const GridPageContainer: React.FC<GridPageContainerProps> = ({
  children,
  as: Component = "main",
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
