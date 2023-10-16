// Importing USER_URL from a file named "../constant"

import { USER_URL } from "../constant";
import { apiSlice } from "./apiSlices";

// Importing apiSlice from a file named "./apiSlices"


// Creating a userApiSlice using apiSlice.injectEndpoints
const userApiSlice = apiSlice.injectEndpoints({
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
    }),
});

// Exporting a hook named useLoginMutation from userApiSlice
export const { useLoginMutation } = userApiSlice;
