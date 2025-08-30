import { ZoneProps } from "@/app/types/ZoneProps";
import ConnectionStatusIndicator from "../atoms/ConnectionStatusIndicator";

interface ZoneCardProps {
  zone: ZoneProps;
  userType: "visitor" | "subscriber";
  subscriptionVerified?: boolean;
  onSelect?: (zoneId: string) => void;
}

const categoryLabels: Record<string, string> = {
  cat_premium: "Premium",
  cat_standard: "Standard",
  cat_regular: "Regular",
  cat_basic: "Basic",
};

export default function ZoneCard({
  zone,
  userType,
  subscriptionVerified = false,
  onSelect,
}: ZoneCardProps) {
  const {
    id,
    name,
    categoryId,
    totalSlots,
    occupied,
    free,
    reserved,
    availableForVisitors,
    availableForSubscribers,
    rateNormal,
    rateSpecial,
    open,
  } = zone;

  const category = categoryLabels[categoryId] || categoryId;

  const availableSlots =
    userType === "visitor" ? availableForVisitors : availableForSubscribers;

  const isDisabled =
    !open ||
    availableSlots === 0 ||
    (userType === "subscriber" && !subscriptionVerified);

  return (
    <div className="bg-white border border-border-color rounded-lg shadow p-5 flex flex-col justify-between">
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-main-color">
            {name}{" "}
            <span className="text-sm text-secondary-color font-normal">
              ({category})
            </span>
          </h2>

          <ConnectionStatusIndicator status={open ? "OPEN" : "CLOSED"} />
        </div>

        <div className="text-sm text-text-color grid gap-1">
          <p>
            <strong>Occupied:</strong> {occupied} / <strong>Free:</strong>{" "}
            {free} / <strong>Total:</strong> {totalSlots}
          </p>
          <p>
            <strong>Reserved:</strong> {reserved}
          </p>
          <p>
            {userType === "visitor" ? (
              <>
                <strong>Visitor Slots:</strong> {availableForVisitors}
              </>
            ) : (
              <>
                <strong>Subscriber Slots:</strong> {availableForSubscribers}
              </>
            )}
          </p>
        </div>

        <div className="flex justify-between mt-2 text-sm">
          <span>
            <strong>Rate:</strong> ${rateNormal}/hr
          </span>
          <span className="text-accent-color font-semibold">
            Special: ${rateSpecial}/hr
          </span>
        </div>
      </div>

      <button
        onClick={() => onSelect?.(id)}
        disabled={isDisabled}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-main-color hover:bg-secondary-color"
        }`}
      >
        {userType === "visitor" ? "Select Zone" : "Select Zone (Subscription)"}
      </button>
    </div>
  );
}
