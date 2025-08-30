export default function ZoneCardPlaceholder() {
  return (
    <div className="bg-white border border-border-color rounded-lg shadow p-5 flex flex-col justify-between animate-pulse">
      <div className="mb-3 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>

        <div className="flex justify-between mt-2">
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="h-10 w-full bg-gray-300 rounded-md"></div>
    </div>
  );
}
