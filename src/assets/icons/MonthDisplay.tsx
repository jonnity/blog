import Image from "next/image";
import CalendarBase from "@/assets/icons/calenderBase.svg";
import { CSSProperties } from "react";

interface MonthDisplayProps {
  width?: number;
  height?: number;
  className?: string;
}

const MonthDisplay: React.FC<MonthDisplayProps> = ({
  width,
  height,
  className = "",
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

  // Set container style based on whether width/height are provided
  const containerStyle: CSSProperties = {};
  if (width !== undefined) containerStyle.width = `${width}px`;
  if (height !== undefined) containerStyle.height = `${height}px`;

  // Original SVG viewBox
  const viewBox = "0 0 267 267";

  return (
    <div className={`relative ${className}`} style={containerStyle}>
      {/* Calendar base image */}
      <Image
        src={CalendarBase}
        alt="monthlyページのアイコン"
        className="h-full w-full"
        width={267}
        height={267}
        style={{ objectFit: "contain" }}
      />

      {/* Month text overlay using SVG for better scaling */}
      <svg
        viewBox={viewBox}
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          x="133.5"
          y="165"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="95"
          fontWeight="500"
        >
          {monthAbbreviation}
        </text>
      </svg>
    </div>
  );
};

export default MonthDisplay;
