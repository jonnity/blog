type MonthlySelectorProp = {
  yearMonthList: string[];
  currentYearMonth: string;
};

export const MonthlySelector: React.FC<MonthlySelectorProp> = ({
  yearMonthList,
  currentYearMonth,
}) => {
  return (
    <div className="contents-base mt-2 p-2">
      <h2 className="text-lg">過去の月記</h2>
      <hr className="my-1 w-full border-gray-400" />
      <form
        className="m-4 flex items-center justify-center gap-4"
        action=""
        method="get"
      >
        <select
          name="yearMonth"
          className="rounded border p-2"
          defaultValue={currentYearMonth}
        >
          {yearMonthList.map((yearMonth) => {
            const [year, month] = yearMonth.split("-");
            return (
              <option key={yearMonth} value={yearMonth}>
                {year}年{month}月
              </option>
            );
          })}
        </select>
        <input type="hidden" name="redirect" value="true" />
      </form>
    </div>
  );
};
