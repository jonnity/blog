type WorkLinkProps = {
  thumbnail: { url: string; alt: string };
  title: string;
  description: string;
  slug: string;
  categories: string[];
  link: { url: string; message: string };
};
export const WorkLink: React.FC<WorkLinkProps> = ({
  thumbnail,
  title,
  description,
  slug,
  categories,
  link,
}) => {
  return (
    <a href={`./${slug}`}>
      <div className="flex h-36 w-full gap-4 bg-white bg-opacity-50 p-2">
        <img src={thumbnail.url} alt={thumbnail.alt} className="h-32" />
        <div>
          <h2 className="text-2xl">{title}</h2>
          <div className="indent-4">
            <div className="flex gap-2">
              <span className="text-lg font-bold">ジャンル: </span>
              {categories.map((category) => {
                return (
                  <>
                    <span className="bg-gray-200 indent-0 text-base">
                      {category}
                    </span>
                  </>
                );
              })}
            </div>
            <div className="flex gap-2">
              <span className="text-lg font-bold">概要: </span>
              <span className="indent-0 text-base">{description}</span>
            </div>
            <div>
              <a href={link.url} target="_blank">
                {link.message}
              </a>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
