"use client";
import { redirect } from "next/navigation";

type MonthlySelectorProp = {
  yearMonthList: string[];
  currentYearMonth: string;
};

export const MonthlySelector: React.FC<MonthlySelectorProp> = ({
  yearMonthList,
  currentYearMonth,
}) => {
  const selectorId = "yearMonthSelector";
  const yearMonthHandler = () => {
    const selector = document.getElementById(selectorId) as HTMLSelectElement;
    redirect(`/monthly/${selector.value}`);
  };
  return (
    <div className="contents-base flex p-2 lg:block">
      <h2 className="p-2 text-lg lg:p-0">過去の月記</h2>
      <hr className="my-1 hidden w-full border-gray-400 lg:block" />
      <div className="m-0 flex justify-end gap-2 lg:m-2">
        <select
          name="yearMonth"
          className="rounded border p-2"
          defaultValue={currentYearMonth}
          id={selectorId}
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
        <button
          className="rounded border bg-gray-200 p-1"
          onClick={yearMonthHandler}
        >
          表示
        </button>
        <input type="hidden" name="redirect" value="true" />
      </div>
    </div>
  );
};
