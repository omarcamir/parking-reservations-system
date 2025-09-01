import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type user = {
  username: string;
  role: string;
  id: string;
};

type LoginResponse = {
  token?: string;
  status?: string;
  message?: string;
  user?: user;
};

type LoginRequest = {
  username: string;
  password: string;
};

export const Login = createApi({
  reducerPath: "Login",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = Login;
