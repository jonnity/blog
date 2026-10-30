type DateInfoSpanProps = {
  createdAt: Date;
  updatedAt?: Date;
};

export const DateInfoSpan: React.FC<DateInfoSpanProps> = (props) => {
  const { createdAt, updatedAt } = props;
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
