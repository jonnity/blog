type WorkLinkProps = {
  thumbnail: { url: string; alt: string };
  title: string;
  description: string;
  slug: string;
  categories: string[];
  createdAt: Date;
  updatedAt?: Date;
};
export const WorkLink: React.FC<WorkLinkProps> = ({
  thumbnail,
  title,
  description,
  slug,
  categories,
  createdAt,
  updatedAt,
}) => {
  return (
    <a href={`./${slug}`}>
      <div className="flex h-fit w-full flex-col gap-2 bg-zinc-50 p-2 md:flex-row md:gap-4">
        <img
          src={thumbnail.url}
          alt={thumbnail.alt}
          className="h-[96px] w-[128px] object-fill md:h-[144px] md:w-[192px] lg:h-[192px] lg:w-[256px]"
        />
        <div>
          <h2 className="text-xl font-bold lg:text-2xl">{title}</h2>
          <p className="text-base md:text-lg lg:text-xl">ジャンル:</p>
          <div className="ml-4 flex flex-wrap gap-2 whitespace-normal break-words">
            {categories.map((category, index) => {
              return (
                <>
                  <span
                    key={index}
                    className={`inline-block whitespace-normal bg-gray-200 text-base lg:text-lg`}
                  >
                    {category}
                  </span>
                </>
              );
            })}
          </div>
          <div className="gap-2">
            <p className="text-base md:text-lg lg:text-xl">概要: </p>
            <div className="ml-4 flex flex-wrap gap-2 whitespace-normal break-words">
              <span className="text-base lg:text-lg">{description}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
