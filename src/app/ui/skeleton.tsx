export function TodoSkeleton() {
    return (
        <div className='bg-gray-100 mt-10 p-2 border-3 border-gray-300 w-full rounded-xl'>
            <ul className='space-y-2 divide-y-2 divide-gray-300 animate-pulse'>
                <li className='flex space-x-20 flex-col h-20'></li>
                <li className='flex space-x-20 flex-col h-20'></li>
                <li className='flex space-x-20 flex-col h-20'></li>
                <li className='flex space-x-20 flex-col h-20'></li>
            </ul>
        </div>
    )
}