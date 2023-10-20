import { ORDERS_URL } from "../constant";
import { apiSlice } from "./apiSlices";

export const ordersApiSlice=apiSlice.injectEndpoints({
   refetchOnReconnect: true,
endpoints:(builder)=>({
     // global configuration for the api
  refetchOnReconnect: true,
  
createOrder:builder.mutation({
   query:(order)=>({
url:ORDERS_URL,
method:"POST",
body:{...order}
   }) 
}),
getOrderDetails:builder.query({
   query:(orderId)=>({
      url:`${ORDERS_URL}/${orderId}`
   }),
   keepUnusedDataFor:5
})
})

})

export const {useCreateOrderMutation,
   useGetOrderDetailsQuery}=ordersApiSlice;
