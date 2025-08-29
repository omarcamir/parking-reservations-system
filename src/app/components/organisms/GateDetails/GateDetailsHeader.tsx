"use client";
import { useGateWebSocket } from "@/app/hooks/useWebSocketStatus";
import PageTitle from "../../atoms/PageTitle";
import ConnectionStatusIndicator from "../../atoms/ConnectionStatusIndicator";
import React from "react";
import useUSATime from "@/app/hooks/useUSATime";

type GateDetailsHeaderProps = {
  gateId?: string;
  gateDetails: { id: string; name: string; location: string } | undefined;
};
const GateDetailsHeader = ({ gateId, gateDetails }: GateDetailsHeaderProps) => {
  const { status } = useGateWebSocket(gateId!);
  const currTime = useUSATime();

  return (
    <div className="mb-6">
      <div className="flex items-start gap-2 md:gap-4 flex-wrap">
        <PageTitle
          title={gateDetails?.name ?? "Untitled Gate"}
          subTitle={gateDetails?.location ?? "No location available"}
        />
        <ConnectionStatusIndicator status={status} className="mt-1" />
        <p className="text-sm text-gray-500 mt-2">{currTime}</p>
      </div>
    </div>
  );
};

export default React.memo(GateDetailsHeader);
