import Link from 'next/link';
import {House, ChartColumn, CalendarDays, LayoutList, Sprout} from 'lucide-react';


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

const home = new link(House, "Home", "/");
const stats = new link(ChartColumn, "Stats", "/stats")
const habits = new link(Sprout, "Habits", "habits");
const calendar = new link(CalendarDays, "Calendar", "calendar");
const todo = new link(LayoutList, "Todo", "todo");

const links = [home, stats, habits, calendar, todo];

export default function NavLinks() {
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='m-0 p-4 size-20 flex flex-col items-center hover:bg-gray-100'>
                            <LinkIcon />
                            <p>{link.name}</p>
                        </Link>
                );
            })}
        </>
    );
}
