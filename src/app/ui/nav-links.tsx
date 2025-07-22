import Link from 'next/link';
import {House, ChartColumn, CalendarDays, LayoutList, Settings, Sprout} from 'lucide-react';


class link {
    icon: typeof House;
    name: string;
    href: string;

    constructor(icon: typeof House, name: string, href: string) {
        this.icon = icon;
        this.name = name;
        this.href = href;
    }
}

let home = new link(House, "Home", "/");
let stats = new link(ChartColumn, "Stats", "/stats")
let habits = new link(Sprout, "Habits", "habits");
let calendar = new link(CalendarDays, "Calendar", "calendar");
let todo = new link(LayoutList, "Todo", "todo");

let settings = new link(Settings, "Settings", "settings")

let links = [home, stats, habits, calendar, todo];

export default function NavLinks() {
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='m-0 p-4 size-20 border border-gray-700 flex flex-col items-center'>
                            <LinkIcon />
                            <p>{link.name}</p>
                        </Link>
                );
            })}
        </>
    );
}
