import { SubscriptionProps } from "@/app/types/SubscriptionProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const subscriptions = createApi({
  reducerPath: "subscriptions",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getSubscription: builder.query<SubscriptionProps, string>({
      query: (id) => `/subscriptions/${encodeURIComponent(id)}`,
    }),
  }),
});

export const { useGetSubscriptionQuery } = subscriptions;
