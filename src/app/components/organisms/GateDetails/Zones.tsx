"use client";
import PageTitle from "../../atoms/PageTitle";
import Tabs from "../../molecules/Tabs";
import { useState } from "react";

import ErrorMessage from "../../atoms/ErrorMessage";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetZoneByIdQuery } from "@/app/rtkQuery/services/Zones";
import Modal from "../../molecules/Modal";
import { useCheckInMutation } from "@/app/rtkQuery/services/Tickets";
import TicketCard from "../../molecules/TicketCard";
import { Ticket } from "@/app/types/TicketsProps";
import TicketCardPlaceholder from "../../Placeholders/TicketCardPlaceholder";
import VisitorTab from "../../molecules/GateDetails/VisitorTab";
import SubscriberTab from "../../molecules/GateDetails/SubscriberTab";
import ConfirmationModal from "../../molecules/ConfirmationModal";
import ClientLayout from "@/app/Layout/ClientLayout";

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

  const [confirmationData, setConfirmationData] = useState<{
    zoneId: string | null;
    userType: "visitor" | "subscriber" | null;
  }>({ zoneId: null, userType: null });

  const handleVerify = () => {
    if (subscriptionId.trim()) {
      setSubscriptionVerified(true);
    }
  };

  const handleSelectZone = (
    zoneId: string,
    userType: "visitor" | "subscriber"
  ) => {
    setConfirmationData({ zoneId, userType });
  };

  const handleConfirmSelection = async () => {
    const { zoneId, userType } = confirmationData;
    if (!zoneId || !userType) return;

    setIsCheckInModalOpen(true);
    try {
      const result = await checkIn({
        gateId: gateId || "",
        zoneId,
        type: userType,
        subscriptionId:
          userType === "subscriber" && subscriptionVerified
            ? subscriptionId
            : undefined,
      }).unwrap();

      setTicket(result.ticket);
      refetchZones();
    } catch (err) {
      console.error("Check-in failed:", err);
      setTicket(null);
    }
  };

  const tabs = [
    {
      id: "visitor",
      label: "Visitor",
      content: (
        <VisitorTab
          zones={zones || []}
          isLoading={zonesLoading}
          isFetching={zonesFetching}
          onSelectZone={handleSelectZone}
        />
      ),
    },
    {
      id: "subscriber",
      label: "Subscriber",
      content: (
        <SubscriberTab
          {...{
            subscriptionId,
            setSubscriptionId,
            subscriptionVerified,
            setSubscriptionVerified,
            zones: zones || [],
            isLoading: zonesLoading,
            isFetching: zonesFetching,
            onSelectZone: handleSelectZone,
            handleVerify,
          }}
        />
      ),
    },
  ];

  if (error) return <ErrorMessage />;

  return (
    <div className="pb-5">
      <PageTitle title="Zones" />
      <Tabs tabs={tabs} defaultTabId="visitor" />

      <Modal
        isOpen={isCheckInModalOpen}
        onClose={() => {
          setIsCheckInModalOpen(false);
          setSubscriptionVerified(false);
          setSubscriptionId("");
          setTicket(null);
        }}
      >
        <div>
          {checkInLoading ? (
            <TicketCardPlaceholder />
          ) : checkInError ? (
            <ErrorMessage message="Check-in failed. Please try again." />
          ) : ticket ? (
            <TicketCard
              title="Check-in Successful"
              ticket={ticket}
              onClose={() => setIsCheckInModalOpen(false)}
            />
          ) : (
            <p className="text-gray-500 text-center">No ticket available</p>
          )}
        </div>
      </Modal>
      <ConfirmationModal
        isOpen={!!confirmationData.zoneId} // Only show if there's a zone to confirm
        onClose={() => setConfirmationData({ zoneId: null, userType: null })}
        onConfirm={handleConfirmSelection}
        message={`Are you sure you want to select the zone(${confirmationData.zoneId})?`}
      />
    </div>
  );
};

export default Zones;
