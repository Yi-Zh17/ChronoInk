import { CSSProperties } from "react";

export type EventCardProps = {
    id: string;
    date: Date;
    startTime: string; // "HH:mm"
    endTime: string;   // "HH:mm"
    title: string;
    description: string;
    location?: string;
    hourWidth?: number; // width in px for one hour on the grid
};

const parseTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const safeHours = Number.isFinite(hours) ? hours : 0;
    const safeMinutes = Number.isFinite(minutes) ? minutes : 0;
    return safeHours * 60 + safeMinutes;
};

export function EventCard({
    id,
    date,
    startTime,
    endTime,
    title,
    description,
    location,
    hourWidth = 120,
}: EventCardProps) {
    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);
    const durationMinutes = Math.max(endMinutes - startMinutes, 0);

    const leftOffset = (startMinutes / 60) * hourWidth;
    const cardWidth = Math.max((durationMinutes / 60) * hourWidth, hourWidth * 0.25);

    const positioning: CSSProperties = {
        left: `${leftOffset}px`,
        width: `${cardWidth}px`,
    };

    const ariaLabelParts = [
        title,
        description,
        `Starts ${startTime}`,
        `Ends ${endTime}`,
        location ? `Location ${location}` : null,
        `Date ${date.toDateString()}`,
    ].filter(Boolean);

    return (
        <div
            key={id}
            className="absolute top-1 z-10 rounded-lg bg-blue-600 text-white shadow-md px-3 py-2 overflow-hidden"
            style={positioning}
            aria-label={ariaLabelParts.join(". ")}
        >
            <p className="text-sm font-semibold truncate">{title}</p>
            <p className="sr-only">
                {description} {location}
            </p>
        </div>
    );
}
