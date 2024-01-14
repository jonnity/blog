type Prop = {
  createdAt: Date;
  updatedAt?: Date;
};

export const DateInfoSpan: React.FC<Prop> = (prop) => {
  const { createdAt, updatedAt } = prop;
  if (!updatedAt) {
    return <span>{createdAt.toLocaleDateString()}</span>;
  } else {
    return (
      <span>
        {updatedAt.toLocaleDateString("ja-JP")} (
        {createdAt.toLocaleDateString("ja-JP")}作成)
      </span>
    );
  }
};
