type ConnectionStatus = "OPEN" | "CONNECTING" | "CLOSING" | "CLOSED";

type Props = {
  status: ConnectionStatus;
  className?: string;
};

const statusColorMap: Record<ConnectionStatus, string> = {
  OPEN: "bg-green-500",
  CONNECTING: "bg-gray-400",
  CLOSING: "bg-yellow-500",
  CLOSED: "bg-red-500",
};

const ConnectionStatusIndicator = ({ status , className }: Props) => {
  const colorClass = statusColorMap[status] ?? "bg-gray-400";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`h-3 w-3 rounded-full ${colorClass}`} />
      <span className="text-md capitalize">{status.toLowerCase()}</span>
    </div>
  );
};

export default ConnectionStatusIndicator;
