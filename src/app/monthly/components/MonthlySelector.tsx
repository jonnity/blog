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
    <div className="contents-base mt-2 p-2">
      <h2 className="text-lg">過去の月記</h2>
      <hr className="my-1 w-full border-gray-400" />
      <div className="m-2 flex justify-end gap-2">
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
