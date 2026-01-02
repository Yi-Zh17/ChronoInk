'use client';
import { useState, useRef, useEffect } from "react";
import { addDays, endOfWeek, getWeek, isSameDay, startOfWeek } from "date-fns";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import eventsData from "./events.json";
import { EventCard } from "../component/event-card";

export default function CalendarGrid() {

    type CalendarEvent = {
        id: number;
        date: string;
        start_time: string;
        end_time: string;
        title: string;
        description?: string;
        location?: string;
    };

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [currentWeekStart, setCurrentWeekStart] = useState(
        () => startOfWeek(new Date(), { weekStartsOn: 1 })
    );
    const startOfWeekDate = currentWeekStart;
    const endOfWeekDate = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
    const weekDates = weekdays.map((_, idx) => addDays(currentWeekStart, idx));

    const events: CalendarEvent[] = eventsData as CalendarEvent[];

    const hours = Array.from({ length: 24 }, (_, idx) => idx);
    const hourWidth = 120;
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const formatHourLabel = (hour: number) =>
        `${hour.toString().padStart(2, '0')}:00`;

    const goToPreviousWeek = () => setCurrentWeekStart((prev) => addDays(prev, -7));
    const goToNextWeek = () => setCurrentWeekStart((prev) => addDays(prev, 7));

    // Smart scroll functions
    const scrollToWorkingHours = () => {
        if (scrollContainerRef.current) {
            // Scroll to 6 AM (index 6 * hourWidth)
            scrollContainerRef.current.scrollLeft = 6 * hourWidth;
        }
    };

    const scrollToCurrentTime = () => {
        if (scrollContainerRef.current) {
            const now = new Date();
            const currentHour = now.getHours();
            // Center the current hour in the viewport
            const scrollPosition = Math.max(0, (currentHour - 4) * hourWidth);
            scrollContainerRef.current.scrollLeft = scrollPosition;
        }
    };

    const scrollToMidnight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = 0;
        }
    };

    // Auto-scroll to working hours on mount
    useEffect(() => {
        scrollToWorkingHours();
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="mb-2 h-1/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={goToPreviousWeek}
                        className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        aria-label="Previous week"
                    >
                        <ChevronsLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-medium text-center px-2">
                        {`${startOfWeekDate.toLocaleDateString()} - ${endOfWeekDate.toLocaleDateString()} (Week ${getWeek(startOfWeekDate, { weekStartsOn: 1 })})`}
                    </h2>
                    <button
                        type="button"
                        onClick={goToNextWeek}
                        className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        aria-label="Next week"
                    >
                        <ChevronsRight className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={scrollToMidnight}
                        className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Midnight
                    </button>
                    <button
                        type="button"
                        onClick={scrollToWorkingHours}
                        className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Working Hours
                    </button>
                    <button
                        type="button"
                        onClick={scrollToCurrentTime}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Now
                    </button>
                </div>
            </div>
            <div className="w-full border-2 border-gray-300 rounded-lg bg-white h-19/20 overflow-hidden shadow-sm">
                <div 
                    ref={scrollContainerRef}
                    className="flex flex-col h-full overflow-x-auto overflow-y-hidden scroll-smooth"
                >
                    <div className="min-w-max flex flex-col h-full">
                        {/* Header */}
                        <div className="flex border-b border-gray-200 bg-white">
                            <div className="w-16 border-r border-gray-200" />
                            <div className="flex">
                                {hours.map((hour) => (
                                    <div
                                        key={`header-${hour}`}
                                        className="min-w-[120px] px-3 py-3 border-l border-gray-200 text-center text-sm font-semibold text-gray-700"
                                    >
                                        {formatHourLabel(hour)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Days */}
                        <div className="flex-1 flex flex-col divide-y divide-gray-200">
                            {weekDates.map((dayDate, idx) => {
                                const dayLabel = weekdays[idx];
                                const dayEvents = events.filter((event) =>
                                    isSameDay(new Date(event.date), dayDate)
                                );

                                return (
                                    <div className="flex flex-1 min-h-0" key={dayLabel}>
                                        <div className="w-16 flex border-r border-gray-200 justify-center items-center bg-white">
                                            <p className="font-semibold text-sm">{dayLabel}</p>
                                        </div>
                                        <div className="flex-1">
                                            <div className="relative flex min-w-max h-full">
                                                {hours.map((hour) => (
                                                    <div
                                                        key={`${dayLabel}-${hour}`}
                                                        className="relative min-w-[120px] border-l border-gray-200 bg-gray-50/70 hover:bg-gray-100 transition"
                                                    >
                                                        {/* Grid cell */}
                                                    </div>
                                                ))}
                                                {dayEvents.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        id={event.id.toString()}
                                                        date={new Date(event.date)}
                                                        startTime={event.start_time}
                                                        endTime={event.end_time}
                                                        title={event.title}
                                                        description={event.description ?? ''}
                                                        location={event.location}
                                                        hourWidth={hourWidth}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}