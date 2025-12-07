export function TodoSkeleton() {
  return (
    <div className="w-full">
      <div className="bg-gray-100 p-4 border-3 border-gray-400 w-full rounded-xl shadow-inner animate-pulse">
        <div className="space-y-4 min-h-[260px]">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/5 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
                <div className="h-3 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
              </div>
              <div className="h-4 w-28 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <div className="h-9 w-20 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
          <div className="h-9 w-10 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
          <div className="h-9 w-20 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300" />
        </div>
      </div>
    </div>
  );
}
