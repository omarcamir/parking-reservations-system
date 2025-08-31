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
import Modal from "../../molecules/Modal";
import { useCheckInMutation } from "@/app/rtkQuery/services/Tickets";
import TicketCard from "../../molecules/TicketCard";
import { Ticket } from "@/app/types/TicketsProps";
import TicketCardPlaceholder from "../../Placeholders/TicketCardPlaceholder";

type ZonesProps = {
  gateId?: string;
};

const Zones = ({ gateId }: ZonesProps) => {
  const [checkIn, { isLoading: checkInLoading, error: checkInError }] =
    useCheckInMutation();
  const {
    data: zones,
    isLoading: zonesLoading,
    error,
    refetch: refetchZones,
    isFetching: zonesFetching,
  } = useGetZoneByIdQuery(gateId ? { id: gateId } : skipToken);

  const [subscriptionId, setSubscriptionId] = useState("");
  const [subscriptionVerified, setSubscriptionVerified] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);

  const handleVerify = () => {
    if (subscriptionId.trim()) {
      setSubscriptionVerified(true);
    }
  };

  const handleSelectZone = (
    zoneId: string,
    userType: "visitor" | "subscriber"
  ) => {
    setIsCheckInModalOpen(true); // Open modal right away
    handleCheckIn(zoneId, userType);
  };

  const handleCheckIn = async (
    zoneId: string,
    userType: "visitor" | "subscriber"
  ) => {
    try {
      const result = await checkIn({
        gateId: gateId || "",
        zoneId,
        type: userType,
        subscriptionId: userType === "subscriber" ? subscriptionId : undefined,
      }).unwrap();

      console.log("Check-in successful:", result);
      setTicket(result.ticket);
      refetchZones();
    } catch (err) {
      console.error("Check-in failed:", err);
      setTicket(null);
    }
  };

  const visitorTab = {
    id: "visitor",
    label: "Visitor",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {zonesLoading || zonesFetching ? (
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
            className="px-4 py-2 bg-accent-color text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer"
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
          {zonesLoading || zonesFetching ? (
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
      <Modal
        isOpen={isCheckInModalOpen}
        onClose={() => {
          setIsCheckInModalOpen(false);
          setSubscriptionVerified(false);
          setSubscriptionId("");
          setTicket(null);
        }}
      >
        <div className="">
          <div className="">
            {checkInLoading ? (
              <TicketCardPlaceholder />
            ) : checkInError ? (
              <ErrorMessage message={"Check-in failed. Please try again."} />
            ) : (
              <TicketCard
                ticket={ticket!}
                onClose={() => setIsCheckInModalOpen(false)}
              />
            )}
            {}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Zones;
