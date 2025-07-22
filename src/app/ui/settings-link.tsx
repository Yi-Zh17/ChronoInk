import Link from 'next/link';

import { Settings } from 'lucide-react';

export default function SettingsLink() {
    return (
        <Link
            key="Settings"
            href="settings"
            className='m-0 p-4 size-20 border border-gray-700 flex flex-col items-center mt-auto'>
                <Settings />
                <p>Settings</p>
            </Link>
    );
}