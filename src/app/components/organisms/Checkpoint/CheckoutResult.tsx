import { CheckoutResponse } from "@/app/rtkQuery/services/Tickets";

const CheckoutResult = ({
  checkoutData,
}: {
  checkoutData: CheckoutResponse;
}) => {
  const { ticketId, checkinAt, checkoutAt, durationHours, breakdown, amount, zoneState } = checkoutData;

  // Format the date and time
  const formatDate = (date: string) => new Date(date).toLocaleString();

  return (
    <div className="border rounded-lg p-4 mt-6 shadow bg-green-50">
      <h2 className="text-lg font-semibold mb-2">✅ Checkout Complete</h2>
      <p>
        <strong>Ticket ID:</strong> {ticketId}
      </p>
      <p>
        <strong>Check-in:</strong> {formatDate(checkinAt)}
      </p>
      <p>
        <strong>Checkout:</strong> {formatDate(checkoutAt)}
      </p>
      <p>
        <strong>Duration:</strong> {durationHours.toFixed(4)} hrs
      </p>

      {/* Breakdown Table */}
      <div className="overflow-x-auto">
        <table className="w-full mt-3 border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border text-left">From</th>
              <th className="p-2 border text-left">To</th>
              <th className="p-2 border text-right">Hours</th>
              <th className="p-2 border text-right">Rate</th>
              <th className="p-2 border text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{row.from ? formatDate(row.from) : "—"}</td>
                <td className="p-2 border">{row.to ? formatDate(row.to) : "—"}</td>
                <td className="p-2 border text-right">{row.hours}</td>
                <td className="p-2 border text-right">${row.rate}</td>
                <td className="p-2 border text-right">${row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-bold">Total: ${amount}</p>

      {/* Zone Information */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold">Zone Information</h3>
        <p>
          <strong>Zone:</strong> {zoneState.name} ({zoneState.id})
        </p>
        <p>
          <strong>Category:</strong> {zoneState.categoryId.replace("cat_", "Category ")}
        </p>
        <p>
          <strong>Total Slots:</strong> {zoneState.totalSlots}
        </p>
        <p>
          <strong>Occupied:</strong> {zoneState.occupied}
        </p>
        <p>
          <strong>Available for Visitors:</strong> {zoneState.availableForVisitors}
        </p>
        <p>
          <strong>Available for Subscribers:</strong> {zoneState.availableForSubscribers}
        </p>
        <p>
          <strong>Rate (Normal):</strong> ${zoneState.rateNormal}
        </p>
        <p>
          <strong>Rate (Special):</strong> ${zoneState.rateSpecial}
        </p>
        <p>
          <strong>Status:</strong> {zoneState.open ? "Open" : "Closed"}
        </p>
      </div>
    </div>
  );
};

export default CheckoutResult;
