// Importing createSlice from Redux Toolkit

import { createSlice } from '@reduxjs/toolkit';

// Checking if there is an existing cart in local storage and using it as initialState, or setting an empty cart if not
const initialState = localStorage.getItem("cart") ?
  JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

// Helper function to round a number to 2 decimal places
const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

// Creating a slice of the Redux store for the cart
const cartSlice = createSlice({
  name: 'cart', // Name of the slice
  initialState, // Initial state of the cart
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // Extracting the item from the action payload
      const existingItem = state.cartItems.find(x =>
        x._id === item._id); // Checking if the item already exists in the cart

      if (existingItem) {
        // If the item already exists in the cart
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      } else {
        // If the item is new to the cart
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      // Determine shipping price (if order is > 5000 naira, it's free; else 1000 naira)
      state.shippingPrice = addDecimal(state.itemsPrice > 5000 ? 0 : 1000);

      // Calculate tax price (15% tax)
      state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
      ).toFixed(2);

      // Store the updated cart in local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// Exporting the action creators (addToCart, removeItem, clearCart) and the reducer
export const { addToCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
