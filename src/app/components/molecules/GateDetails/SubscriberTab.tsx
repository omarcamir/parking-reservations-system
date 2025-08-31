import { ZoneProps } from "@/app/types/ZoneProps";
import Placeholders from "../Placeholders";
import ZoneCardPlaceholder from "../../Placeholders/ZoneCardPlaceholder";
import ZoneCard from "../ZoneCard";
import Button from "../../atoms/Button";

interface SubscriberTabProps {
  subscriptionId: string;
  setSubscriptionId: (id: string) => void;
  subscriptionVerified: boolean;
  setSubscriptionVerified: (verified: boolean) => void;
  zones: ZoneProps[];
  isLoading: boolean;
  isFetching: boolean;
  onSelectZone: (zoneId: string, userType: "visitor" | "subscriber") => void;
  handleVerify: () => void;
}

const SubscriberTab: React.FC<SubscriberTabProps> = ({
  subscriptionId,
  setSubscriptionId,
  subscriptionVerified,
  setSubscriptionVerified,
  zones,
  isLoading,
  isFetching,
  onSelectZone,
  handleVerify,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter Subscription ID"
          value={subscriptionId}
          onChange={(e) => {
            setSubscriptionId(e.target.value);
            setSubscriptionVerified(false);
          }}
          className="border border-border-color rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-main-color"
        />
        <Button
          onClick={handleVerify}
          text="Verify"
          className="bg-accent-color text-white hover:bg-green-600"
        />
        {subscriptionVerified && (
          <span className="text-success-color text-sm font-medium">
            ✅ Verified
          </span>
        )}
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
