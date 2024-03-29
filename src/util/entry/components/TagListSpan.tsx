type Prop = { tags: string[] };

export const TagListSpan: React.FC<Prop> = (prop) => {
  const { tags } = prop;
  if (tags.length === 0) {
    return <span>no tags</span>;
  }
  const tagSpans = tags.map((tag, index) => {
    // tag検索画面を作るためにLinkを埋める可能性あり
    return (
      <>
        <span key={index} className="bg-gray-200 text-black">
          {tag}
        </span>
        {index === tags.length - 1 ? null : <span> </span>}
      </>
    );
  });
  return tagSpans;
};
