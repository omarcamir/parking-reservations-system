import { GateProps } from "@/app/types/GateProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const Gates = createApi({
  reducerPath: "Gates",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getPublicGates: builder.query<GateProps[], void>({
      query: () => `master/gates`,
    }),
  }),
});

export const { useGetPublicGatesQuery } = Gates;
