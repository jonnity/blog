"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

type MonthlyPartsProp = {
  yearMonthList: string[];
  currentYearMonth: string;
};

export const MonthlyParts: React.FC<MonthlyPartsProp> = ({
  yearMonthList,
  currentYearMonth,
}) => {
  const router = useRouter();
  const selectorRef = useRef<HTMLSelectElement>(null);
  const yearMonthHandler = () => {
    if (selectorRef.current) {
      router.push(`/monthly/${selectorRef.current.value}`);
    }
  };
  return (
    <div className="m-0 flex justify-end gap-2">
      <select
        name="yearMonth"
        className="rounded border p-2"
        defaultValue={currentYearMonth}
        ref={selectorRef}
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
  );
};
