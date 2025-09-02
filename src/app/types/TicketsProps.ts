import { ZoneProps } from "./ZoneProps";

export type CheckInRequest = {
  gateId: string;
  zoneId: string;
  type: "visitor" | "subscriber";
  subscriptionId?: string;
};

export type CheckInResponse = {
  ticket: {
    id: string;
    type: string;
    zoneId: string;
    gateId: string;
    checkinAt: string;
  };
  zoneState: ZoneProps;
};

export type Ticket = {
  id: string;
  type: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
  subscriptionId?: string;
};
