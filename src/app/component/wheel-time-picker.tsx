import React, { useState } from "react";

const Wheel = ({ values, value, onChange }: { values: string[], value: string, onChange: (val: string) => void }) => {
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const currentIndex = values.indexOf(value);
    if (e.deltaY > 0 && currentIndex < values.length - 1) {
      onChange(values[currentIndex + 1]);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      onChange(values[currentIndex - 1]);
    }
  };

  return (
    <div
      className="relative h-10 w-20 overflow-hidden border-2 border-gray-400 rounded-xl bg-white flex items-center justify-center"
      onWheel={handleWheel}
    >
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
};

export default function DateTimeDialPicker({
  year, setYear,
  month, setMonth,
  day, setDay,
  hour, setHour,
  minute, setMinute,
}: {
  year: string, setYear: (v: string) => void,
  month: string, setMonth: (v: string) => void,
  day: string, setDay: (v: string) => void,
  hour: string, setHour: (v: string) => void,
  minute: string, setMinute: (v: string) => void,
}) {
  const years = Array.from({ length: 201 }, (_, i) => String(new Date().getFullYear() + i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  return (
    <div className="flex gap-2 p-4 justify-center items-center">
      <Wheel values={years} value={year} onChange={setYear} />
      <strong className="scale-y-150">/</strong>
      <Wheel values={months} value={month} onChange={setMonth} />
      <strong className="scale-y-150">/</strong>
      <Wheel values={days} value={day} onChange={setDay} />
      <strong className="scale-y-150">|</strong>
      <Wheel values={hours} value={hour} onChange={setHour} />
      <strong>:</strong>
      <Wheel values={minutes} value={minute} onChange={setMinute} />
    </div>
  );
}
