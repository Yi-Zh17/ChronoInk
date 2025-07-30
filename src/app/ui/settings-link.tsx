import Link from 'next/link';

import { Settings } from 'lucide-react';

export default function SettingsLink() {
    return (
        <Link
            key="Settings"
            href="settings"
            className='m-0 p-4 size-20 flex flex-col items-center mt-auto hover:bg-gray-100 group border-t-2 border-gray-300'>
                <Settings className='group-hover:animate-[spin_1s]'/>
                <p>Settings</p>
            </Link>
    );
}