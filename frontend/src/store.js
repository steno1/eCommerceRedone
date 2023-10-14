import { apiSlice } from './slices/apiSlices';
import cartSliceReducer from './slices/cartSlice';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
})

export default store;