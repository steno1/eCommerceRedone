// Importing createSlice from Redux Toolkit

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Checking if there is an existing cart in local storage and using it as initialState, or setting an empty cart if not
const initialState = localStorage.getItem("cart") ?
  JSON.parse(localStorage.getItem("cart")) :
   { cartItems: [],
    shippingAddress:{},
    paymentMethod:"PayPal"
  };

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
      return updateCart(state)
    },
    removeFromCart:(state, action)=>{
state.cartItems=state.cartItems.filter((x)=>x._id !==action.payload)

return updateCart(state)
    }
  },
});

// Exporting the action creators (addToCart, removeItem, clearCart) and the reducer
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
