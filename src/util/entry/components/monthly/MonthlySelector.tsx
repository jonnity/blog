import { MonthlyParts } from "./MonthlyParts";

type MonthlySelectorProps = {
  yearMonthList: string[];
  currentYearMonth: string;
};

export const MonthlySelector: React.FC<MonthlySelectorProps> = ({
  yearMonthList,
  currentYearMonth,
}) => {
  return (
    <div className="contents-base flex flex-col p-2">
      <h2 className="p-2 text-lg">過去の月記</h2>
      <hr className="my-1 w-full border-gray-400" />
      <MonthlyParts
        yearMonthList={yearMonthList}
        currentYearMonth={currentYearMonth}
      />
    </div>
  );
};
