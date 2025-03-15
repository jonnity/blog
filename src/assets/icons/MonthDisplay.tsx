import Image from "next/image";
import CalendarBase from "@/assets/icons/calenderBase.svg";

const MonthDisplay: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const now = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthIndex = now.getMonth();
  const monthAbbreviation = months[monthIndex];

  return (
    <div className={`relative w-[${width}px] h-[${height}px]`}>
      <Image
        src={CalendarBase}
        alt="monthlyページのアイコン"
        width={width}
        height={height}
      />

      <span className="absolute bottom-0 left-0 right-0 top-[10px] m-auto h-fit w-full text-center">
        {monthAbbreviation}
      </span>
    </div>
  );
};

export default MonthDisplay;
