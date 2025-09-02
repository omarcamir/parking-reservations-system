import {
  CheckInRequest,
  CheckInResponse,
  Ticket,
} from "@/app/types/TicketsProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ZoneProps } from "@/app/types/ZoneProps";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Breakdown = {
  from: string;
  to: string;
  hours: number;
  rateMode: string;
  rate: number;
  amount: number;
};
export type CheckoutResponse = {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: number;
  breakdown: Breakdown[];
  amount: number;
  subscriptionId?: string;
  zoneState: ZoneProps;
}


export const Tickets = createApi({
  reducerPath: "Tickets",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Access the Redux store's authentication state to get the access token
      const token = (getState() as RootState).auth.token;

      // Apply Authorization header only for getTicket and checkoutTicket
      if (
        token &&
        (endpoint === "getTicket" || endpoint === "checkoutTicket")
      ) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    checkIn: builder.mutation<CheckInResponse, CheckInRequest>({
      query: (body) => ({
        url: `tickets/checkin`,
        method: "POST",
        body,
      }),
    }),
    getTicket: builder.query<Ticket, string>({
      query: (id) => `/tickets/${encodeURIComponent(id)}`,
    }),
     checkoutTicket: builder.mutation<CheckoutResponse, { ticketId: string; forceConvertToVisitor?: boolean }>({
      query: ({ ticketId, forceConvertToVisitor = false }) => ({
        url: `/tickets/checkout`,
        method: "POST",
        body: { ticketId, forceConvertToVisitor },
      }),
    }),
  }),
});

export const {
  useCheckInMutation,
  useGetTicketQuery,
  useLazyGetTicketQuery,
  useCheckoutTicketMutation,
} = Tickets;
