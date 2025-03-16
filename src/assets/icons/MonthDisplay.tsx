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
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute">
        <text
          width={width}
          height={height}
          x={width / 2}
          y={height / 1.8}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={width / 2.8}
        >
          {monthAbbreviation}
        </text>
      </svg>
      <Image
        src={CalendarBase}
        alt="monthlyページのアイコン"
        width={width}
        height={height}
      />
    </div>
  );
};

export default MonthDisplay;
