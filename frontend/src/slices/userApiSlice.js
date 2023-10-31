// Importing USER_URL from a file named "../constant"

import { USER_URL } from "../constant";
import { apiSlice } from "./apiSlices";

// Importing apiSlice from a file named "./apiSlices"


// Creating a userApiSlice using apiSlice.injectEndpoints
const userApiSlice = apiSlice.injectEndpoints({
  // global configuration for the api
  refetchOnReconnect: true,

  // Defining endpoints using a builder function
  endpoints: (builder) => ({
    // Creating a 'login' mutation endpoint
    login: builder.mutation({
      query: (data) => ({
        // Defining URL and method for the login request
        url: `${USER_URL}/login`, // concatenating USER_URL with "/login"
        method: "POST",
        body: data, // Sending data in the request body
      }),
    }),

    // Creating a 'logoutApiCall' mutation endpoint
    logoutApiCall: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    // Creating a 'registerUser' mutation endpoint
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    // Creating a 'profile' mutation endpoint
    profile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    // Creating a 'getUsers' query endpoint
    getUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/register`,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),

    // Creating a 'deleteUser' mutation endpoint
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    // Creating a 'getUserDetails' query endpoint
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Creating an 'updateUser' mutation endpoint
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Exporting various hooks from userApiSlice for mutation and query operations
export const {
  useLoginMutation,
  useProfileMutation,
  useLogoutApiCallMutation,
  useRegisterUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = userApiSlice;
