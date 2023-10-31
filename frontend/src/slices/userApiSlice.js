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
        logoutApiCall:builder.mutation({
            query:()=>({
              url:`${USER_URL}/logout`,
              method: "POST"
            })
        }),
        registerUser:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/register`,
                method:"POST",
                body:data
            })
        }),
        profile:builder.mutation({
                query:(data)=>({
                url:`${USER_URL}/profile`,
                method:"PUT",
                body:data 
                })
        }),
        getUsers:builder.query({
           query:()=>({
            url:`${USER_URL}/register`,
           }),
           providesTags:['User'],
           keepUnusedDataFor:5
        })

    }),
});

// Exporting a hook named useLoginMutation from userApiSlice
export const { useLoginMutation, useProfileMutation,
     useLogoutApiCallMutation,
      useRegisterUserMutation,
    useGetUsersQuery } = userApiSlice;
