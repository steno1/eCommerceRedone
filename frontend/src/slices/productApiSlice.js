import { PRODUCTS_URL } from '../constant';
import { apiSlice } from './apiSlices';

// This line defines a constant `productApiSlice` and assigns it the result of calling `apiSlice.injectEndpoints()`.
export const productApiSlice = apiSlice.injectEndpoints({
    // global configuration for the api
    refetchOnReconnect: true,

  // This object contains a property named `endpoints`, which is a function that takes a `builder` as a parameter.
  endpoints: (builder) => ({

    // This is defining an endpoint named `getProducts`.
    getProducts: builder.query({

      // This function defines the behavior of the query.
      query: () => ({

        // This specifies the URL to fetch data from. It uses the `PRODUCTS_URL` constant imported earlier.
        url: PRODUCTS_URL,

        // This option specifies that unused data should be kept for 60 seconds, likely for caching purposes.
        keepUnusedDataFor: 60
      })
    }),
    getSingleProduct:builder.query({
      query:(productId)=>({
        url:`${PRODUCTS_URL}/${productId}`,
        keepUnusedDataFor:5
      })
    })
  }),
});

// This line exports an object with a property named `useGetProductsQuery`.
export const { useGetProductsQuery, useGetSingleProductQuery } = productApiSlice;
