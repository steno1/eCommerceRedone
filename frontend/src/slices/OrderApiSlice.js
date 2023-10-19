import { ORDERS_URL } from "../constant";
import { apiSlice } from "./apiSlices";

export const ordersApiSlice=apiSlice.injectEndpoints({
endpoints:(builder)=>({
createOrder:builder.mutation({
   query:(orders)=>({
url:ORDERS_URL,
method:"POST",
body:{...orders}
   }) 
})
})

})

export const {useCreateOrderMutation}=ordersApiSlice;
