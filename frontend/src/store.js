import { apiSlice } from './slices/apiSlices';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
})

export default store;