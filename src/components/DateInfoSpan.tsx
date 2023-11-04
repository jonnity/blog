type Prop = {
  createdAt: Date;
  updatedAt?: Date;
};

export const DateInfo: React.FC<Prop> = (prop) => {
  const { createdAt, updatedAt } = prop;
  if (!updatedAt) {
    return <span>{createdAt.toLocaleDateString()}</span>;
  } else {
    return (
      <span>
        {updatedAt.toLocaleDateString()} ({createdAt.toLocaleDateString()}作成)
      </span>
    );
  }
};
