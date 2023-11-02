// Import necessary constants and modules.

import { PRODUCTS_URL, UPLOAD_URL } from '../constant'; // Import the PRODUCTS_URL constant from the 'constant' module.

import { apiSlice } from './apiSlices'; // Import the 'apiSlice' module from 'apiSlices'.

// Define the 'productApiSlice' constant using the result of 'apiSlice.injectEndpoints()'.
export const productApiSlice = apiSlice.injectEndpoints({
  // Global configuration for the API
  refetchOnReconnect: true, // Specifies that data should be refetched when the network connection is reestablished.

  // Define API endpoints using the 'endpoints' function.
  endpoints: (builder) => ({
    // Define an endpoint named 'getProducts'.
    getProducts: builder.query({
      // Define the behavior of the query.
      query: ({keyword,pageNumber}) => ({
        // Specify the URL to fetch data from using the 'PRODUCTS_URL' constant.
        url: PRODUCTS_URL,
        params:{
          keyword,
          pageNumber
        
        }
       
      }),
      providesTags:["Product"],
       // Keep unused data for 60 seconds for potential caching.
       keepUnusedDataFor: 5,
       
       
    }),

    // Define an endpoint named 'getSingleProduct'.
    getSingleProduct: builder.query({
      query: (productId) => ({
        // Specify the URL with the 'productId' parameter appended to 'PRODUCTS_URL'.
        url: `${PRODUCTS_URL}/${productId}`,
       
      }),
       // Keep unused data for 5 seconds.
       keepUnusedDataFor: 5,
    }),

    // Define an endpoint named 'createProduct'.
    createProduct: builder.mutation({
      query: () => ({
        // Specify the URL for creating a product.
        url: PRODUCTS_URL,
        method: "POST", // Use the HTTP POST method for creating a product.
      }),
      // Invalidate data with the 'Product' tag when creating a product.
      invalidatesTags: ['Product'],
    }),
    updateProduct:builder.mutation({
      query: (data)=>({
        url:`${PRODUCTS_URL}/${data.productId}`,
        method:"PUT",
        body:data
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage:builder.mutation({
      query:(data)=>({
        url:UPLOAD_URL,
        method:"POST",
        body:data
      })
    }),
    deleteProduct:builder.mutation({
      query:(productId)=>({
        url:`${PRODUCTS_URL}/${productId}`,
        method:"DELETE",
      
      })
    }),
    createReview:builder.mutation({
      query:(data)=>({
        url:`${PRODUCTS_URL}/${data.productId}/reviews`,
        method:"POST",
        body:data,
       
      }),
      invalidatesTags: ['Product'],
    }),
   
    getTopProducts:builder.query({
      query:()=>({
        url:`${PRODUCTS_URL}/top`
      }),
      keepUnusedDataFor:5
    })
  }),

});

// Export objects and functions for accessing the API.
export const {
  useGetProductsQuery, // Function for querying product data.
  useGetSingleProductQuery, // Function for querying a single product data.
  useCreateProductMutation, // Function for mutating (creating) a product.
useUpdateProductMutation,
useUploadProductImageMutation,
useDeleteProductMutation,
useCreateReviewMutation,
useGetTopProductsQuery
} = productApiSlice;
