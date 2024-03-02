import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/user`,
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (user) => ({
        url: "/create-user",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddUserMutation, useLoginUserMutation } = userApi;
