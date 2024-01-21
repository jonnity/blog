type Prop = {
  createdAt: Date;
  updatedAt?: Date;
};

export const DateInfoSpan: React.FC<Prop> = (prop) => {
  const { createdAt, updatedAt } = prop;
  if (!updatedAt) {
    return <span>{getDateString(createdAt)}</span>;
  } else {
    return (
      <span>
        {getDateString(updatedAt)} ({getDateString(createdAt)}作成)
      </span>
    );
  }
};

function getDateString(date: Date) {
  return date.toLocaleDateString("ja-JP");
}
