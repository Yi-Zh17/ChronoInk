'use client';
import { useState } from "react";
import { endOfWeek, getWeek, startOfWeek } from "date-fns";

export default function CalendarGrid() {

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const date = new Date();
    const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(date, { weekStartsOn: 1 });

    return (
        <div className="h-full">
            <div className="mb-2 h-1/20">
                <h2 className="text-xl font-medium text-center">{`${startOfWeekDate.toLocaleDateString()} - ${endOfWeekDate.toLocaleDateString()} (Week ${getWeek(startOfWeekDate)})`}</h2>
            </div>
            <div className="w-full w-max-[1000px] border-2 border-gray-300 rounded-lg bg-gray-100 h-19/20">
                <div className="flex flex-col h-full border-gray-300 divide-y-1 divide-black/10">
                    {weekdays.map((day) => (
                        <div className="flex h-1/7" key={day}>
                            <div className="flex w-6 border-r-2 border-black/10 justify-center items-center">
                                <p className="[writing-mode:vertical-rl] [text-orientation:upright] font-semibold text-lg">{day}</p>
                            </div>
                            <div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-full">
                </div>
            </div>
        </div>
    )
}
