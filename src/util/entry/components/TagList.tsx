type Prop = { tags: string[] };

export const TagListSpan: React.FC<Prop> = (prop) => {
  const { tags } = prop;
  if (tags.length === 0) {
    return <span className="bg-gray-200 text-black">no tags</span>;
  }
  const tagSpans = tags.map((tag, index) => {
    // tag検索画面を作るためにLinkを埋める可能性あり
    return (
      <span
        key={index}
        className={`bg-gray-200 text-black ${index !== 0 && "ml-1"}`}
      >
        {tag}
      </span>
    );
  });
  return (
    <div className="flex max-w-full break-before-all gap-x-2">
      <p>{tagSpans}</p>
    </div>
  );
};
