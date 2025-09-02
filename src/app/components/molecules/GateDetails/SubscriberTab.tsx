import { ZoneProps } from "@/app/types/ZoneProps";
import Placeholders from "../Placeholders";
import ZoneCardPlaceholder from "../../Placeholders/ZoneCardPlaceholder";
import ZoneCard from "../ZoneCard";
import Button from "../../atoms/Button";
import { useState } from "react";

interface SubscriberTabProps {
  subscriptionId: string;
  setSubscriptionId: (id: string) => void;
  subscriptionVerified: boolean;
  setSubscriptionVerified: (verified: boolean) => void;
  zones: ZoneProps[];
  isLoading: boolean;
  isFetching: boolean;
  onSelectZone: (zoneId: string, userType: "visitor" | "subscriber") => void;
  // handleVerify: () => void;
  isFetchingSubscription: boolean;
}

const SubscriberTab: React.FC<SubscriberTabProps> = ({
  subscriptionId,
  setSubscriptionId,
  subscriptionVerified,
  zones,
  isLoading,
  isFetching,
  onSelectZone,
  isFetchingSubscription,
}) => {
  const [tempSubscriptionId, setTempSubscriptionId] = useState(subscriptionId);
  const [isVerifiedAttempted, setIsVerifiedAttempted] = useState(false);

  const handleVerifyClick = () => {
    setSubscriptionId(tempSubscriptionId);
    setIsVerifiedAttempted(true);
  };

  console.log("subscriptionVerified", subscriptionVerified);
  return (
    <div className="space-y-4">
      <div className="flex items-center flex-wrap gap-2">
        <input
          type="text"
          placeholder="Enter Subscription ID"
          value={tempSubscriptionId} // Bind to the local state
          onChange={(e) => {
            setTempSubscriptionId(e.target.value); // Update local state on input change
          }}
          className="border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main-color w-full md:w-auto"
        />
        <Button
          onClick={() => {
            handleVerifyClick();
          }}
          text="Verify"
          isLoading={isFetchingSubscription}
          className="bg-accent-color text-white hover:bg-green-600 w-full md:w-auto"
        />
        {isVerifiedAttempted &&
          (isFetchingSubscription ? (
            <span className="text-blue-500 text-sm font-medium">
              ⏳ Verifying...
            </span>
          ) : subscriptionVerified ? (
            <span className="text-success-color text-sm font-medium">
              ✅ Verified
            </span>
          ) : (
            <span className="text-red-500 text-sm font-medium">
              ❌ Not Verified
            </span>
          ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading || isFetching ? (
          <Placeholders component={ZoneCardPlaceholder} count={5} />
        ) : (
          zones?.map((zone) => (
            <ZoneCard
              key={zone.id}
              zone={zone}
              userType="subscriber"
              subscriptionVerified={subscriptionVerified}
              onSelect={onSelectZone}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SubscriberTab;
