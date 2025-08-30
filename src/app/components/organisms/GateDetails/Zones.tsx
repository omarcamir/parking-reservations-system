"use client";
import PageTitle from "../../atoms/PageTitle";
import Tabs from "../../molecules/Tabs";
import ZoneCard from "../../molecules/ZoneCard";
import { useState } from "react";
import Placeholders from "../../molecules/Placeholders";
import ZoneCardPlaceholder from "../../Placeholders/ZoneCardPlaceholder";
import ErrorMessage from "../../atoms/ErrorMessage";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetZoneByIdQuery } from "@/app/rtkQuery/services/Zones";

type ZonesProps = {
  gateId?: string;
};

const Zones = ({ gateId }: ZonesProps) => {
  const {
    data: zones,
    isLoading: zonesLoading,
    error,
  } = useGetZoneByIdQuery(gateId ? { id: gateId } : skipToken);

  const [subscriptionId, setSubscriptionId] = useState("");
  const [subscriptionVerified, setSubscriptionVerified] = useState(false);

  const handleVerify = () => {
    if (subscriptionId.trim()) {
      setSubscriptionVerified(true);
    }
  };

  const handleSelectZone = (zoneId: string) => {
    alert(`Zone selected: ${zoneId}`);
  };

  const visitorTab = {
    id: "visitor",
    label: "Visitor",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {zonesLoading ? (
          <Placeholders component={ZoneCardPlaceholder} count={5} />
        ) : (
          zones?.map((zone) => (
            <ZoneCard
              key={zone.id}
              zone={zone}
              userType="visitor"
              onSelect={handleSelectZone}
            />
          ))
        )}
      </div>
    ),
  };

  const subscriberTab = {
    id: "subscriber",
    label: "Subscriber",
    content: (
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
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-accent-color text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Verify
          </button>
          {subscriptionVerified && (
            <span className="text-success-color text-sm font-medium">
              ✅ Verified
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {zonesLoading ? (
            <Placeholders component={ZoneCardPlaceholder} count={5} />
          ) : (
            zones?.map((zone) => (
              <ZoneCard
                key={zone.id}
                zone={zone}
                userType="subscriber"
                subscriptionVerified={subscriptionVerified}
                onSelect={handleSelectZone}
              />
            ))
          )}
        </div>
      </div>
    ),
  };
  if (error) return <ErrorMessage />;
  return (
    <div className="pb-5">
      <PageTitle title="Zones" />
      <Tabs tabs={[visitorTab, subscriberTab]} defaultTabId="visitor" />
    </div>
  );
};

export default Zones;
