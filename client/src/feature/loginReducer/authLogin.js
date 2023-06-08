import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/ConstaltsVariables";

// Define a service using a base URL and expected endpoints
export const createDemoApi = createApi({
  reducerPath: "createDemoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["AuthRegister", "AuthLogin"],
  endpoints: (builder) => ({
    authRegister: builder.mutation({
      query: (patch) => ({
        url: "/api/user/register",
        method: "POST",
        body: patch, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      providesTags: ["AuthRegister"],
    }),
    authlogin: builder.mutation({
      query: (patch) => ({
        url: "/api/user/login",
        method: "POST",
        body: patch, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      providesTags: ["AuthLogin"],
    }),
  }),
});
export const { useAuthRegisterMutation, useAuthloginMutation } = createDemoApi;
