const TicketCardPlaceholder: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto font-mono animate-pulse">
      {/* Header Placeholder */}
      <div className="text-center mb-4">
        <div className="h-5 w-48 mx-auto bg-green-300 rounded"></div>
      </div>

      {/* Ticket Details Skeleton */}
      <div className="space-y-2 text-sm">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="h-4 w-44 bg-gray-200 rounded" />
      </div>

      {/* Buttons Placeholder */}
      <div className="flex justify-between mt-6">
        <div className="h-10 w-24 bg-green-700 rounded" />
        <div className="h-10 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default TicketCardPlaceholder;
