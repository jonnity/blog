type MonthlySelectorProp = {
  monthlyLinks: {
    yearMonth: string;
    year: string;
    month: string;
    title: string;
    isLatest: boolean;
  }[];
};
export const MonthlySelector: React.FC<MonthlySelectorProp> = ({
  monthlyLinks,
}) => {
  return (
    <div className="contents-base mt-2 p-2">
      <h2 className="text-lg">月記一覧</h2>
      <hr className="my-1 w-full border-gray-400" />
      <div className="m-4 grid grid-cols-4 gap-2">
        {monthlyLinks.map(({ yearMonth, year, month, isLatest }) => (
          <a
            key={yearMonth}
            href={isLatest ? undefined : `/monthly/${yearMonth}`}
            className={`rounded border p-2 text-center ${
              isLatest
                ? "cursor-default bg-gray-100"
                : "transition-colors hover:bg-gray-50"
            }`}
          >
            <div className="text-sm text-gray-600">{`${year}年${month}月`}</div>
          </a>
        ))}
      </div>
    </div>
  );
};
