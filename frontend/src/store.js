import { apiSlice } from './slices/apiSlices';
import authSliceReducer from './slices/authSlice';
import cartSliceReducer from './slices/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth:authSliceReducer

   
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
})
// enable listener behavior for the store
setupListeners(store.dispatch)

export default store;