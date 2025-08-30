import { ZoneProps } from "@/app/types/ZoneProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const Zones = createApi({
  reducerPath: "Zones",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    
    getZoneById: builder.query<ZoneProps[], { id: string }>({
      query: ({id} ) => `master/zones?gateId=${id}`,
    }),
  }),
});

export const { useGetZoneByIdQuery } = Zones;
