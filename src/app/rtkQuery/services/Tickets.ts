import { CheckInRequest, CheckInResponse } from "@/app/types/TicketsProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const Tickets = createApi({
  reducerPath: "Tickets",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    
    checkIn: builder.mutation<CheckInResponse, CheckInRequest>({
      query: (body) => ({
        url: `tickets/checkin`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCheckInMutation } = Tickets;
