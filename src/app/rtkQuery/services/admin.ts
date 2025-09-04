import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  AuditLogProps,
  CategoryProps,
  EmployeeProps,
  ParkingReportProps,
  RushHourProps,
  UserPostRequestProps,
  VacationProps,
} from "@/app/types/AdminProps";
import { ZoneProps } from "@/app/types/ZoneProps";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const Admin = createApi({
  reducerPath: "Admin",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Access the Redux store's authentication state to get the access token
      const token = (getState() as RootState).auth.token;

      // Apply Authorization header only if the token exists
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Employees",
    "ParkingReport",
    "Zones",
    "Categories",
    "RushHours",
    "Vacations",
    "AuditLog",
  ],
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeProps[], void>({
      query: () => `/admin/users`,
      providesTags: ["Employees"],
    }),
    addEmployee: builder.mutation<EmployeeProps, Partial<UserPostRequestProps>>({
      query: (body) => ({
        url: `/admin/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),

    // Parking Report
    getParkingReport: builder.query<ParkingReportProps[], void>({
      query: () => `/admin/reports/parking-state`,
      providesTags: ["ParkingReport"],
    }),

    // Zones
    getZones: builder.query<ZoneProps[], void>({
      query: () => `/admin/zones`,
      providesTags: ["Zones"],
    }),
    toggleZone: builder.mutation<void, { id: string; isOpen: boolean }>({
      query: ({ id, isOpen }) => ({
        url: `/admin/zones/${id}/open`,
        method: "PUT",
        body: { isOpen },
      }),
      invalidatesTags: ["Zones"],
    }),

    // Categories
    getCategories: builder.query<CategoryProps[], void>({
      query: () => `/admin/categories`,
      providesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<
      void,
      { id: string; data: Partial<CategoryProps> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Rush Hours
    getRushHours: builder.query<RushHourProps[], void>({
      query: () => `/admin/rush-hours`,
      providesTags: ["RushHours"],
    }),
    addRushHour: builder.mutation<RushHourProps, Partial<RushHourProps>>({
      query: (body) => ({
        url: `/admin/rush-hours`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["RushHours"],
    }),

    // Vacations
    getVacations: builder.query<VacationProps[], void>({
      query: () => `/admin/vacations`,
      providesTags: ["Vacations"],
    }),
    addVacation: builder.mutation<VacationProps, Partial<VacationProps>>({
      query: (body) => ({
        url: `/admin/vacations`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vacations"],
    }),

    // Audit Log
    getAuditLog: builder.query<AuditLogProps[], void>({
      query: () => `/admin/audit-log`,
      providesTags: ["AuditLog"],
    }),
  }),
});

// Export hooks to use the query in components
export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useGetParkingReportQuery,
  useGetZonesQuery,
  useToggleZoneMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useGetRushHoursQuery,
  useAddRushHourMutation,
  useGetVacationsQuery,
  useAddVacationMutation,
  useGetAuditLogQuery,
} = Admin;
